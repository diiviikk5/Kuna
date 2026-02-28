import { cors } from '../_utils.js';

export default function handler(req, res) {
    if (cors(req, res)) return;

    res.json({
        status: 'operational',
        version: '2.0.0',
        platform: 'vercel',
        timestamp: new Date().toISOString(),
        services: {
            forecast: 'active',
            training: 'active',
            flood_risk: 'active',
            crop_health: 'active'
        }
    });
}
