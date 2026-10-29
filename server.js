// server.js - Local development server with upload & image rescue support
// Run with: node server.js
// Open: http://localhost:3000/backup-images.html or http://localhost:3000/admin.html

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const ROOT_DIR = __dirname;
const UPLOAD_DIR = path.join(ROOT_DIR, 'images', 'uploads');

// Ensure images/uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Helper: download image from remote URL (following redirects)
function downloadRemoteImage(remoteUrl, targetPath, callback) {
    const parsed = url.parse(remoteUrl);
    const client = parsed.protocol === 'http:' ? http : https;

    const req = client.get(remoteUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': ''
        }
    }, (res) => {
        // Handle HTTP redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            let redirectUrl = res.headers.location;
            if (!redirectUrl.startsWith('http')) {
                redirectUrl = url.resolve(remoteUrl, redirectUrl);
            }
            return downloadRemoteImage(redirectUrl, targetPath, callback);
        }

        if (res.statusCode !== 200) {
            return callback(new Error(`Remote returned HTTP ${res.statusCode}`));
        }

        const fileStream = fs.createWriteStream(targetPath);
        res.pipe(fileStream);

        fileStream.on('finish', () => {
            fileStream.close(() => callback(null));
        });

        fileStream.on('error', (err) => {
            fs.unlink(targetPath, () => {});
            callback(err);
        });
    });

    req.on('error', (err) => callback(err));
    req.setTimeout(20000, () => {
        req.destroy();
        callback(new Error('Request timed out'));
    });
}

const server = http.createServer((req, res) => {
    // CORS headers for all local requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // -------------------------------------------------------------------------
    // Handle /upload.php endpoint locally
    // -------------------------------------------------------------------------
    if (pathname === '/upload.php' || pathname === 'upload.php') {
        let bodyChunks = [];
        req.on('data', chunk => bodyChunks.push(chunk));
        req.on('end', () => {
            const buffer = Buffer.concat(bodyChunks);
            const contentType = req.headers['content-type'] || '';

            // 1. Check for fetch_url (Remote image rescue mode)
            let fetchUrl = parsedUrl.query.fetch_url || '';
            let customName = parsedUrl.query.name || '';

            if (contentType.includes('multipart/form-data')) {
                const bodyStr = buffer.toString('binary');
                const matchFetch = bodyStr.match(/name="fetch_url"[\r\n]+([^\r\n]+)/);
                if (matchFetch && matchFetch[1]) fetchUrl = matchFetch[1].trim();

                const matchName = bodyStr.match(/name="name"[\r\n]+([^\r\n]+)/);
                if (matchName && matchName[1]) customName = matchName[1].trim();
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                const params = new URLSearchParams(buffer.toString('utf-8'));
                if (params.get('fetch_url')) fetchUrl = params.get('fetch_url');
                if (params.get('name')) customName = params.get('name');
            }

            if (fetchUrl) {
                const safeName = (customName || 'rescued').replace(/[^a-zA-Z0-9_\-]/g, '_');
                const ext = path.extname(url.parse(fetchUrl).pathname) || '.jpg';
                const filename = `${safeName}_${Date.now()}${ext.includes('.') ? ext : '.jpg'}`;
                const targetPath = path.join(UPLOAD_DIR, filename);

                downloadRemoteImage(fetchUrl, targetPath, (err) => {
                    res.writeHead(err ? 500 : 200, { 'Content-Type': 'application/json' });
                    if (err) {
                        res.end(JSON.stringify({ success: false, error: err.message, url: fetchUrl }));
                    } else {
                        res.end(JSON.stringify({
                            success: true,
                            url: `images/uploads/${filename}`,
                            filename: filename,
                            original_url: fetchUrl
                        }));
                    }
                });
                return;
            }

            // 2. Direct file upload multipart parsing
            if (contentType.includes('multipart/form-data')) {
                const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
                if (!boundaryMatch) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Invalid multipart boundary' }));
                    return;
                }
                const boundary = boundaryMatch[1] || boundaryMatch[2];
                const parts = buffer.toString('binary').split('--' + boundary);

                let fileData = null;
                let originalFilename = 'upload.jpg';

                for (let part of parts) {
                    if (part.includes('filename="')) {
                        const filenameMatch = part.match(/filename="([^"]+)"/);
                        if (filenameMatch) originalFilename = filenameMatch[1];

                        const headerEndIndex = part.indexOf('\r\n\r\n');
                        if (headerEndIndex !== -1) {
                            let fileContent = part.substring(headerEndIndex + 4);
                            if (fileContent.endsWith('\r\n')) {
                                fileContent = fileContent.slice(0, -2);
                            }
                            fileData = Buffer.from(fileContent, 'binary');
                        }
                    }
                }

                if (fileData) {
                    const ext = path.extname(originalFilename) || '.jpg';
                    const base = path.basename(originalFilename, ext).replace(/[^a-zA-Z0-9_\-]/g, '_');
                    const filename = `${base}_${Date.now()}${ext}`;
                    const targetPath = path.join(UPLOAD_DIR, filename);

                    fs.writeFileSync(targetPath, fileData);

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        url: `images/uploads/${filename}`,
                        filename: filename
                    }));
                    return;
                }
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'active', message: 'Local upload endpoint is ready' }));
        });
        return;
    }

    // -------------------------------------------------------------------------
    // Serve static files
    // -------------------------------------------------------------------------
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(ROOT_DIR, pathname);

    // Security check: ensure file path is inside ROOT_DIR
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(` The Italian Pantry - Local Development Server Running`);
    console.log(`======================================================`);
    console.log(` > Website:       http://localhost:${PORT}/index.html`);
    console.log(` > Admin Panel:   http://localhost:${PORT}/admin.html`);
    console.log(` > Image Rescue:  http://localhost:${PORT}/backup-images.html`);
    console.log(` > Uploads:       ${UPLOAD_DIR}`);
    console.log(`======================================================\n`);
});
