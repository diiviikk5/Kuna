import { cors, auth, loadCSV, computeStats } from '../_utils.js';

export default function handler(req, res) {
    if (cors(req, res)) return;
    if (!auth(req, res)) return;

    const meoData = loadCSV('DATA_MEO_Train2.csv');
    const geoData = loadCSV('DATA_GEO_Train.csv');

    res.json({
        datasets: {
            meo_train2: {
                samples: meoData.length,
                features: {
                    x_error: computeStats(meoData, 'x_error'),
                    y_error: computeStats(meoData, 'y_error'),
                    z_error: computeStats(meoData, 'z_error'),
                    satclockerror: computeStats(meoData, 'satclockerror')
                }
            },
            geo_train: {
                samples: geoData.length,
                features: {
                    x_error: computeStats(geoData, 'x_error'),
                    y_error: computeStats(geoData, 'y_error'),
                    z_error: computeStats(geoData, 'z_error'),
                    satclockerror: computeStats(geoData, 'satclockerror')
                }
            }
        },
        timestamp: new Date().toISOString()
    });
}
