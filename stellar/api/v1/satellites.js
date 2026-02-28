import { cors, auth, loadCSV } from '../_utils.js';

export default function handler(req, res) {
    if (cors(req, res)) return;
    if (!auth(req, res)) return;

    const meoData = loadCSV('DATA_MEO_Train2.csv');
    const geoData = loadCSV('DATA_GEO_Train.csv');

    res.json({
        satellites: [
            { id: 'gsat-14', name: 'GSAT-14', orbit: 'MEO', agency: 'ISRO', status: 'active', data_points: meoData.length },
            { id: 'gsat-30', name: 'GSAT-30', orbit: 'GEO', agency: 'ISRO', status: 'active', data_points: geoData.length },
            { id: 'navic-1a', name: 'NavIC-1A (IRNSS-1A)', orbit: 'GEO', agency: 'ISRO', status: 'active', data_points: 0 },
        ],
        total: 3,
        timestamp: new Date().toISOString()
    });
}
