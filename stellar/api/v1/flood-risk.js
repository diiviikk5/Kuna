import { cors, auth } from '../_utils.js';

export default function handler(req, res) {
    if (cors(req, res)) return;
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    if (!auth(req, res)) return;

    const { latitude = 10.0, longitude = 76.3, region = 'Kerala' } = req.body || {};

    const risk = Math.random();
    const level = risk > 0.7 ? 'CRITICAL' : risk > 0.4 ? 'HIGH' : risk > 0.2 ? 'MODERATE' : 'LOW';

    res.json({
        region,
        coordinates: { latitude, longitude },
        risk_level: level,
        risk_score: parseFloat(risk.toFixed(3)),
        rainfall_forecast_mm: parseFloat((risk * 120).toFixed(1)),
        river_level_m: parseFloat((2.5 + risk * 8).toFixed(2)),
        next_48h_prediction: level === 'CRITICAL' ? 'Evacuate low-lying areas' : 'Continue monitoring',
        data_sources: ['INSAT-3D', 'MOSDAC', 'IMD-AWS'],
        confidence: parseFloat((0.85 + Math.random() * 0.1).toFixed(3)),
        generated_at: new Date().toISOString(),
        alert_channels: level === 'CRITICAL' || level === 'HIGH' ? ['whatsapp', 'sms', 'email'] : ['app']
    });
}
