<?php
/**
 * The Italian Pantry - Image Upload & Remote Fetch Endpoint
 * Saves images to the images/uploads/ folder on the server.
 */

// Allow CORS for admin panel requests
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadDir = __DIR__ . '/images/uploads/';

// Ensure upload directory exists
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to create upload directory']);
        exit;
    }
}

$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

// Helper to sanitize filename
function sanitizeFilename($filename) {
    $filename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $filename);
    $filename = preg_replace('/_+/', '_', $filename);
    return trim($filename, '_');
}

// --------------------------------------------------------------------------
// Mode 1: Fetch remote image from URL (e.g. rescue images from imgbb)
// --------------------------------------------------------------------------
$fetchUrl = isset($_POST['fetch_url']) ? trim($_POST['fetch_url']) : (isset($_GET['fetch_url']) ? trim($_GET['fetch_url']) : '');

if (!empty($fetchUrl)) {
    // Validate URL scheme
    if (!filter_var($fetchUrl, FILTER_VALIDATE_URL) || (!preg_match('/^https?:\/\//i', $fetchUrl))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid URL']);
        exit;
    }

    // Determine custom filename or generate one
    $suggestedName = isset($_POST['name']) ? trim($_POST['name']) : '';
    if (empty($suggestedName)) {
        $pathParts = pathinfo(parse_url($fetchUrl, PHP_URL_PATH));
        $suggestedName = !empty($pathParts['filename']) ? $pathParts['filename'] : 'rescued';
    }
    $suggestedName = sanitizeFilename($suggestedName);

    // Fetch image data using cURL without referer to avoid hotlink blocks
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $fetchUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_REFERER, ''); // Blank referer to bypass hotlink protection
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $imageData = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);

    if ($httpCode !== 200 || empty($imageData)) {
        http_response_code(502);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to download image from remote URL (HTTP ' . $httpCode . ')',
            'url' => $fetchUrl
        ]);
        exit;
    }

    // Detect extension from content-type or image inspection
    $ext = 'jpg';
    if (strpos($contentType, 'png') !== false) {
        $ext = 'png';
    } elseif (strpos($contentType, 'webp') !== false) {
        $ext = 'webp';
    } elseif (strpos($contentType, 'gif') !== false) {
        $ext = 'gif';
    }

    $finalName = $suggestedName . '_' . time() . '.' . $ext;
    $targetPath = $uploadDir . $finalName;

    if (file_put_contents($targetPath, $imageData) === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save downloaded image to disk']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'url' => 'images/uploads/' . $finalName,
        'filename' => $finalName,
        'original_url' => $fetchUrl,
        'size' => strlen($imageData)
    ]);
    exit;
}

// --------------------------------------------------------------------------
// Mode 2: Direct file upload via multipart/form-data
// --------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        $errCode = isset($_FILES['image']) ? $_FILES['image']['error'] : 'no_file';
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No image uploaded or upload error occurred (code: ' . $errCode . ')']);
        exit;
    }

    $file = $_FILES['image'];
    $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
    $originalExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($originalExt, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'File extension not allowed. Use JPG, PNG, WEBP, or GIF.']);
        exit;
    }

    // Verify it is a valid image
    $check = @getimagesize($file['tmp_name']);
    if ($check === false) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Uploaded file is not a valid image.']);
        exit;
    }

    // Prefer custom name if provided (e.g. food name)
    $namePrefix = !empty($_POST['name']) ? sanitizeFilename($_POST['name']) : sanitizeFilename($originalName);
    if (empty($namePrefix)) {
        $namePrefix = 'img';
    }

    $uniqueName = $namePrefix . '_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $originalExt;
    $targetPath = $uploadDir . $uniqueName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode([
            'success' => true,
            'url' => 'images/uploads/' . $uniqueName,
            'filename' => $uniqueName,
            'size' => $file['size']
        ]);
        exit;
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file. Check directory permissions.']);
        exit;
    }
}

// If accessed with GET without fetch_url
echo json_encode([
    'status' => 'active',
    'endpoint' => 'upload.php',
    'message' => 'The Italian Pantry upload endpoint is running.'
]);
