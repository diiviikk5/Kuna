import { cors } from '../_utils.js';

export default function handler(req, res) {
    if (cors(req, res)) return;

    res.json({
        name: 'STELLAR Platform API',
        version: '2.0.0',
        base_url: `https://${req.headers.host}/api/v1`,
        endpoints: [
            { method: 'GET', path: '/health', auth: false, description: 'System health check' },
            { method: 'GET', path: '/satellites', auth: true, description: 'List available satellites' },
            { method: 'POST', path: '/forecast', auth: true, description: 'GNSS error forecast' },
            { method: 'POST', path: '/train', auth: true, description: 'Trigger model training' },
            { method: 'POST', path: '/flood-risk', auth: true, description: 'Flood risk assessment' },
            { method: 'GET', path: '/data/summary', auth: true, description: 'Dataset summary stats' },
            { method: 'POST', path: '/whatsapp/webhook', auth: true, description: 'WhatsApp webhook handler' }
        ],
        auth: 'Pass API key via X-API-Key header',
        demo_key: 'stellar-demo-key-2025'
    });
}
