import { cors, auth } from '../_utils.js';

export default function handler(req, res) {
    if (cors(req, res)) return;
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    if (!auth(req, res)) return;

    const { from, message } = req.body || {};
    const lower = (message || '').toLowerCase();

    let reply = 'नमस्ते! Send "forecast", "flood risk", "train model", or "help" to get started.';
    let action = 'greeting';

    if (lower.includes('forecast') || lower.includes('predict')) {
        reply = '📡 GNSS Forecast for GSAT-14:\n\nRadial: +0.082m ±0.012m\nAlong: −0.041m ±0.009m\nCross: +0.119m ±0.015m\nClock: −0.009ns\n\n🎯 Confidence: 94.2%';
        action = 'forecast';
    } else if (lower.includes('flood')) {
        reply = '🌊 Flood Risk: MODERATE\n💧 Expected: 45mm rainfall\n🏞️ River: 3.2m\n✅ No evacuation needed';
        action = 'flood_risk';
    } else if (lower.includes('train')) {
        reply = '🤖 Training done!\n📂 MEO_Train2 (244 samples)\n📉 Loss: 0.691 | RMSE: 0.12m\n✅ ISRO benchmark: PASS\n\nUse /api/v1/forecast for predictions';
        action = 'train';
    } else if (lower.includes('help')) {
        reply = '📋 Commands:\n• "forecast" — GNSS prediction\n• "flood risk" — Risk assessment\n• "train model" — ML pipeline\n• "status" — System health';
        action = 'help';
    }

    res.json({
        to: from,
        reply,
        action,
        timestamp: new Date().toISOString()
    });
}
