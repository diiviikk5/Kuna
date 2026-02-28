/**
 * Shared utilities for Vercel serverless API routes
 */
import fs from 'fs';
import path from 'path';

// ─── CORS Helper ───────────────────────────────────────────────────

export function cors(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    return false;
}

// ─── Auth Helper ───────────────────────────────────────────────────

const API_KEYS = new Set([
    'stellar-demo-key-2025',
    process.env.STELLAR_API_KEY || 'sk-stellar-hackathon'
]);

export function auth(req, res) {
    const key = req.headers['x-api-key'] || req.query?.api_key;
    if (!key || !API_KEYS.has(key)) {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Missing or invalid API key. Set X-API-Key header.',
            demo_key: 'stellar-demo-key-2025'
        });
        return false;
    }
    return true;
}

// ─── CSV Loader ────────────────────────────────────────────────────

export function loadCSV(filename) {
    // Try multiple paths (local dev vs Vercel deployment)
    const paths = [
        path.join(process.cwd(), 'data', filename),
        path.join(process.cwd(), 'public', 'data', filename),
    ];

    for (const filepath of paths) {
        if (fs.existsSync(filepath)) {
            const text = fs.readFileSync(filepath, 'utf-8');
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',').map(h =>
                h.trim().toLowerCase().replace(/\s*\([^)]*\)/g, '').replace(/\r/g, '')
            );
            return lines.slice(1).map(line => {
                const vals = line.replace(/\r/g, '').split(',');
                const row = {};
                headers.forEach((h, i) => {
                    row[h] = isNaN(vals[i]) ? vals[i]?.trim() : parseFloat(vals[i]);
                });
                return row;
            });
        }
    }
    return [];
}

// ─── Stats Helper ──────────────────────────────────────────────────

export function computeStats(data, key) {
    const vals = data.map(d => d[key]).filter(v => !isNaN(v));
    if (vals.length === 0) return null;
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    const std = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
    return {
        mean: parseFloat(mean.toFixed(6)),
        std: parseFloat(std.toFixed(6)),
        min: Math.min(...vals),
        max: Math.max(...vals),
        count: vals.length
    };
}
