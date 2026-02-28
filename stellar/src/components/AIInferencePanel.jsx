import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CpuChipIcon,
    BoltIcon,
    ChartBarIcon,
    PlayIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '../store/appStore';
import { initializeAI, generateForecast, getAIStatus } from '../services/aiService';
import { generateHistoricalData } from '../services/liveDataService';

const AIInferencePanel = ({ satellite, onForecastComplete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [forecast, setForecast] = useState(null);
    const [aiStatus, setAiStatus] = useState(null);
    const [error, setError] = useState(null);

    const setActiveForecast = useAppStore(state => state.setActiveForecast);
    const addNotification = useAppStore(state => state.addNotification);

    useEffect(() => {
        const init = async () => {
            try {
                await initializeAI();
                setAiStatus(getAIStatus());
            } catch (err) {
                console.error('AI initialization failed:', err);
            }
        };
        init();
    }, []);

    const runInference = async () => {
        if (!satellite) return;

        setIsLoading(true);
        setError(null);

        try {
            const historicalData = generateHistoricalData(satellite.id, 7, 15);
            const result = await generateForecast(historicalData, satellite.id);

            setForecast(result);
            setActiveForecast(result);

            addNotification({
                type: 'success',
                title: 'AI_FORECAST_COMPLETE',
                message: `Generated predictions for ${satellite.id} in ${result.inferenceTimeMs.toFixed(0)}ms`
            });

            if (onForecastComplete) onForecastComplete(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="neo-panel bg-[#0f172a]/80 border border-white/[0.06] p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center justify-between mb-8 border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#020617] border border-indigo-500/30/50 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                        <CpuChipIcon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider leading-none">AI_INFERENCE_ENGINE</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div className={`w-2 h-2 rounded-full ${aiStatus?.isReady ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-400'}`} />
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">
                                {aiStatus?.isReady ? `MODEL_READY // ${aiStatus.tfBackend}` : 'INITIALIZING_CORE...'}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={runInference}
                    disabled={!satellite || isLoading}
                    className={`
                        flex items-center gap-3 px-6 py-4 font-semibold text-xs uppercase tracking-wider border-2 transition-all
                        ${!satellite || isLoading
                            ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-indigo-500 border-indigo-500/30 text-black hover:bg-indigo-400 hover:shadow-lg shadow-indigo-500/10'}
                    `}
                >
                    {isLoading ? (
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                    ) : (
                        <BoltIcon className="w-4 h-4" />
                    )}
                    {isLoading ? 'RUNNING_INFERENCE...' : 'RUN_AI_FORECAST'}
                </button>
            </div>

            {forecast ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'Latency', val: `${forecast.inferenceTimeMs.toFixed(1)}ms`, color: 'text-emerald-500' },
                            { label: 'Confidence', val: `${forecast.modelConfidence}%`, color: 'text-indigo-400' },
                            { label: 'Horizons', val: forecast.forecasts.length, color: 'text-white' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#020617] border border-slate-800 p-4 font-mono">
                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                                <div className={`text-xl font-bold ${stat.color}`}>{stat.val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {forecast.forecasts.map((pred, i) => (
                            <div
                                key={i}
                                className={`p-4 border-2 font-mono transition-all ${pred.riskLevel === 'HIGH' ? 'bg-rose-900/10 border-rose-900/50' :
                                        pred.riskLevel === 'MEDIUM' ? 'bg-amber-900/10 border-amber-900/50' :
                                            'bg-slate-950/50 border-slate-800'
                                    }`}
                            >
                                <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase italic">+{pred.horizonLabel}</div>
                                <div className="text-2xl font-bold text-white italic leading-none">{pred.mean.toFixed(3)}<span className="text-[10px] ml-1 text-slate-500 not-italic">ns</span></div>
                                <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Risk</span>
                                    <span className={`text-[9px] font-bold uppercase ${pred.riskLevel === 'HIGH' ? 'text-rose-500' :
                                            pred.riskLevel === 'MEDIUM' ? 'text-indigo-400' :
                                                'text-emerald-500'
                                        }`}>{pred.riskLevel}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-20 flex flex-col items-center justify-center opacity-30">
                    <CpuChipIcon className="w-16 h-16 text-slate-600 mb-4" />
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider italic">Awaiting Payload for Inference...</span>
                </div>
            )}
        </motion.div>
    );
};

export default AIInferencePanel;
