// storage.js - Cloud storage via JSONBin.io with localStorage fallback
// SETUP: Go to https://jsonbin.io → create free account → copy your API key (Master Key)
//        Then paste them below.

var PANTRY_STORAGE = (function() {
    // ====== PASTE YOUR JSONBIN.IO CREDENTIALS HERE ======
    var API_KEY = '$2a$10$Crsn.5xz.X4d40jWj2gao.kZjkU7aQ.Stwc0tdWNJHTu5UfJ2WMsa';   // e.g. '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    var BIN_ID = '';    // e.g. 'abc1234567890'
    // ====================================================

    var API_BASE = 'https://api.jsonbin.io/v3';
    var LOCAL_KEY = 'italianPantryData';
    var BIN_ID_KEY = 'pantryBinId';

    function getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY,
            'X-Bin-Versioning': false
        };
    }

    function getBinId() {
        if (BIN_ID) return BIN_ID;
        return localStorage.getItem(BIN_ID_KEY) || '';
    }

    function isConfigured() {
        return API_KEY.length > 10;
    }

    // Strip base64 data URLs from data before cloud sync (too large for JSONBin)
    // Only syncs text fields and http/https URLs
    function cleanForCloud(data) {
        var clean = JSON.parse(JSON.stringify(data));
        function cleanValue(obj) {
            if (!obj || typeof obj !== 'object') return;
            for (var key in obj) {
                if (typeof obj[key] === 'string' && obj[key].length > 500) {
                    if (obj[key].indexOf('data:') === 0) {
                        obj[key] = ''; // replace with empty, keep structure
                    }
                } else if (typeof obj[key] === 'object') {
                    cleanValue(obj[key]);
                }
            }
        }
        cleanValue(clean);
        return clean;
    }

    // Create a new bin and store its ID
    function createBin(data) {
        if (!isConfigured()) return Promise.reject('No API key');
        console.log('[PANTRY] Creating new cloud bin...');
        return fetch(API_BASE + '/bins', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(cleanForCloud(data))
        })
        .then(function(res) {
            console.log('[PANTRY] Create bin response:', res.status);
            if (!res.ok) throw new Error('Create failed: ' + res.status);
            return res.json();
        })
        .then(function(json) {
            console.log('[PANTRY] Create bin result:', json);
            var id = json.id || (json.record && json.record._id);
            if (!id) throw new Error('No ID in response');
            localStorage.setItem(BIN_ID_KEY, id);
            BIN_ID = id;
            console.log('[PANTRY] Bin created! ID:', id);
            return data;
        });
    }

    // Fetch data from cloud
    function fetchFromCloud() {
        if (!isConfigured()) return Promise.reject('No API key');
        var binId = getBinId();
        if (!binId) return Promise.reject('No bin ID');

        return fetch(API_BASE + '/b/' + binId + '/latest', {
            headers: getHeaders()
        })
        .then(function(res) {
            if (!res.ok) throw new Error('Bin not found');
            return res.json();
        })
        .then(function(json) {
            return json.record;
        });
    }

    // Save data to cloud
    function saveToCloud(data) {
        if (!isConfigured()) return Promise.reject('No API key');
        var binId = getBinId();

        // If no bin yet, create one
        if (!binId) return createBin(data);

        return fetch(API_BASE + '/b/' + binId, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(cleanForCloud(data))
        })
        .then(function(res) {
            if (!res.ok) throw new Error('Save failed');
            return res.json();
        })
        .then(function() { return data; });
    }

    // Save locally as cache
    function saveLocal(data) {
        try {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
        } catch (e) { /* quota exceeded, ignore */ }
    }

    function getLocal() {
        try {
            var raw = localStorage.getItem(LOCAL_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    // Public API
    return {
        // Load data: try cloud first, fall back to local cache
        load: function(defaultData) {
            return fetchFromCloud()
                .then(function(data) {
                    saveLocal(data); // update cache
                    return data;
                })
                .catch(function() {
                    // Cloud unavailable, use local cache
                    var local = getLocal();
                    return local || defaultData;
                });
        },

        // Save data: save to both cloud and local
        save: function(data) {
            saveLocal(data); // always save locally first (fast)
            return saveToCloud(data)
                .then(function(result) {
                    console.log('[PANTRY] Cloud save successful');
                    return result;
                })
                .catch(function(e) {
                    // Cloud save failed, but local is saved
                    console.warn('[PANTRY] Cloud save failed:', e.message || e);
                    return data;
                });
        },

        // Force save locally only (e.g. when quota warning)
        saveLocalOnly: function(data) {
            saveLocal(data);
        },

        isConfigured: isConfigured
    };
})();
