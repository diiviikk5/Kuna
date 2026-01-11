import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CpuChipIcon,
    ChartBarIcon,
    ArrowPathIcon,
    PlayIcon,
    XMarkIcon,
    BeakerIcon,
    StopIcon,
    ClockIcon,
    BoltIcon
} from '@heroicons/react/24/outline';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { trainWithConfig, getAIStatus } from '../services/aiService';

const TrainingDashboard = ({ data, config, onTrainingComplete }) => {
    const [isTraining, setIsTraining] = useState(false);
    const [history, setHistory] = useState({ epoch: [], trainLoss: [], valLoss: [], trainRMSE: [], valRMSE: [] });
    const [logs, setLogs] = useState([]);
    const [currentEpoch, setCurrentEpoch] = useState(0);
    const [progress, setProgress] = useState(0);
    const [trainingTime, setTrainingTime] = useState(0);
    const [shouldStop, setShouldStop] = useState(false);
    const logsEndRef = useRef(null);

    const {
        epochs = 50,
        batchSize = 32,
        learningRate = 0.001,
        validationSplit = 0.2
    } = config;

    useEffect(() => {
        let timer;
        if (isTraining) {
            timer = setInterval(() => {
                setTrainingTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isTraining]);

    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatMetric = (value) => {
        if (value === null || value === undefined) return '-';
        return value < 0.001 ? value.toExponential(4) : value.toFixed(6);
    };

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { timestamp, message, type }]);
    };

    const startTraining = async () => {
        if (isTraining) return;

        setIsTraining(true);
        setHistory({ epoch: [], trainLoss: [], valLoss: [], trainRMSE: [], valRMSE: [] });
        setLogs([]);
        setCurrentEpoch(0);
        setProgress(0);
        setTrainingTime(0);
        setShouldStop(false);

        addLog('Initializing training session...', 'info');
        addLog(`Dataset: ${data.length} samples | Epochs: ${epochs} | Batch: ${batchSize} | LR: ${learningRate}`, 'config');

        try {
            const result = await trainWithConfig(data, config, {
                onEpochEnd: (epoch, logs, metrics) => {
                    setHistory(prev => ({
                        epoch: [...prev.epoch, epoch],
                        trainLoss: [...prev.trainLoss, logs.loss],
                        valLoss: [...prev.valLoss, logs.val_loss],
                        trainRMSE: [...prev.trainRMSE, metrics.trainRMSE],
                        valRMSE: [...prev.valRMSE, metrics.valRMSE]
                    }));
                    setCurrentEpoch(epoch);
                    setProgress((epoch / epochs) * 100);

                    addLog(`Epoch ${epoch}/${epochs} - Loss: ${logs.loss.toFixed(6)}${logs.val_loss ? ` | Val Loss: ${logs.val_loss.toFixed(6)}` : ''}`, 'epoch');

                    if (shouldStop) {
                        throw new Error('Training stopped by user');
                    }
                },
                onProgress: (progressData) => {
                    setProgress(progressData.progress);
                },
                onComplete: (metrics, fullHistory) => {
                    addLog('Training completed successfully!', 'success');
                    addLog(`Best Training Loss: ${metrics.bestTrainLoss.toFixed(6)}`, 'info');
                    addLog(`Best Validation Loss: ${metrics.bestValLoss?.toFixed(6) || 'N/A'}`, 'info');
                    addLog(`Training Duration: ${metrics.trainingDurationFormatted}`, 'info');

                    if (onTrainingComplete) {
                        onTrainingComplete({
                            success: true,
                            history: fullHistory,
                            metrics,
                            normalizationParams: result.normalizationParams
                        });
                    }
                }
            });

            setIsTraining(false);

        } catch (error) {
            addLog(`Training error: ${error.message}`, 'error');
            setIsTraining(false);

            if (onTrainingComplete) {
                onTrainingComplete({
                    success: false,
                    error: error.message
                });
            }
        }
    };

    const stopTraining = () => {
        setShouldStop(true);
        addLog('Stopping training...', 'warning');
    };

    const clearLogs = () => {
        setLogs([]);
        addLog('Logs cleared', 'info');
    };

    const getLogColor = (type) => {
        switch (type) {
            case 'error': return 'text-rose-400';
            case 'warning': return 'text-amber-400';
            case 'success': return 'text-emerald-400';
            case 'epoch': return 'text-blue-400';
            case 'config': return 'text-slate-400';
            default: return 'text-slate-300';
        }
    };

    const chartData = history.epoch.map((epoch, i) => ({
        epoch,
        trainLoss: history.trainLoss[i],
        valLoss: history.valLoss[i] || null,
        trainRMSE: history.trainRMSE[i],
        valRMSE: history.valRMSE[i] || null
    }));

    return (
        <div className="space-y-6">
            {/* Control Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1 neo-panel bg-slate-900 border-2 border-slate-700 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                            <CpuChipIcon className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-xs font-mono font-black text-white uppercase tracking-widest">TRAINING_CORE</h3>
                            <p className="text-[10px] font-mono text-slate-500">{isTraining ? 'ACTIVE' : 'IDLE'}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-[10px] font-mono font-black text-slate-400 uppercase">Epochs</span>
                            <span className="text-[10px] font-mono font-black text-white">{currentEpoch}/{epochs}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-[10px] font-mono font-black text-slate-400 uppercase">Batch</span>
                            <span className="text-[10px] font-mono font-black text-white">{batchSize}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-[10px] font-mono font-black text-slate-400 uppercase">LR</span>
                            <span className="text-[10px] font-mono font-black text-white">{learningRate}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-[10px] font-mono font-black text-slate-400 uppercase">Val_Split</span>
                            <span className="text-[10px] font-mono font-black text-white">{(validationSplit * 100).toFixed(0)}%</span>
                        </div>
                    </div>

                    {!isTraining ? (
                        <button
                            onClick={startTraining}
                            className="w-full py-4 bg-amber-600 text-black font-mono font-black text-xs uppercase tracking-[0.2em] border-2 border-amber-500 hover:bg-amber-500 hover:shadow-[4px_4px_0px_#000] transition-all flex items-center justify-center gap-2"
                        >
                            <PlayIcon className="w-4 h-4" />
                            INITIATE_TRAINING
                        </button>
                    ) : (
                        <button
                            onClick={stopTraining}
                            className="w-full py-4 bg-rose-600 text-white font-mono font-black text-xs uppercase tracking-[0.2em] border-2 border-rose-500 hover:bg-rose-500 transition-all flex items-center justify-center gap-2"
                        >
                            <StopIcon className="w-4 h-4" />
                            HALT_EXECUTION
                        </button>
                    )}
                </div>

                {/* Metrics Cards */}
                <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="neo-panel bg-slate-950 border-slate-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <ClockIcon className="w-4 h-4 text-blue-400" />
                            <span className="text-[9px] font-mono font-black text-slate-500 uppercase">ELAPSED</span>
                        </div>
                        <div className="text-2xl font-mono font-black text-white">
                            {formatTime(trainingTime)}
                        </div>
                    </div>
                    <div className="neo-panel bg-slate-950 border-slate-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <ChartBarIcon className="w-4 h-4 text-emerald-400" />
                            <span className="text-[9px] font-mono font-black text-slate-500 uppercase">TRAIN_LOSS</span>
                        </div>
                        <div className="text-2xl font-mono font-black text-emerald-400">
                            {history.trainLoss.length > 0 ? formatMetric(history.trainLoss[history.trainLoss.length - 1]) : '-'}
                        </div>
                    </div>
                    <div className="neo-panel bg-slate-950 border-slate-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <ChartBarIcon className="w-4 h-4 text-amber-400" />
                            <span className="text-[9px] font-mono font-black text-slate-500 uppercase">VAL_LOSS</span>
                        </div>
                        <div className="text-2xl font-mono font-black text-amber-400">
                            {history.valLoss.length > 0 ? formatMetric(history.valLoss[history.valLoss.length - 1]) : '-'}
                        </div>
                    </div>
                    <div className="neo-panel bg-slate-950 border-slate-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <BoltIcon className="w-4 h-4 text-rose-400" />
                            <span className="text-[9px] font-mono font-black text-slate-500 uppercase">PROGRESS</span>
                        </div>
                        <div className="text-2xl font-mono font-black text-rose-400">
                            {progress.toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Loss Chart */}
            <div className="neo-panel bg-slate-900 border-2 border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-mono font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <ChartBarIcon className="w-5 h-5 text-amber-500" />
                        LOSS_CONVERGENCE_METRICS
                    </h3>
                    {isTraining && (
                        <div className="flex items-center gap-2">
                            <ArrowPathIcon className="w-4 h-4 text-emerald-500 animate-spin" />
                            <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Training Active</span>
                        </div>
                    )}
                </div>

                <div className="bg-slate-950/50 p-4 border border-slate-800">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis
                                dataKey="epoch"
                                stroke="#94a3b8"
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' }}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '2px solid #334155',
                                    borderRadius: '4px'
                                }}
                                labelStyle={{ fontSize: 11, fontWeight: 800, fontFamily: 'monospace', color: '#94a3b8' }}
                                itemStyle={{ fontSize: 11, fontWeight: 800, fontFamily: 'monospace' }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: 20 }}
                                formatter={(value) => <span className="text-slate-300 text-[11px] font-black font-mono tracking-[0.2em]">{value}</span>}
                            />
                            <Line
                                type="monotone"
                                dataKey="trainLoss"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                                name="Train Loss"
                            />
                            <Line
                                type="monotone"
                                dataKey="valLoss"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={false}
                                name="Val Loss"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Progress Bar */}
            {isTraining && (
                <div className="neo-panel bg-slate-900 border-2 border-slate-700 p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono font-black text-slate-400 uppercase">Training Progress</span>
                        <span className="text-[10px] font-mono font-black text-emerald-500">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-slate-950 border border-slate-700 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-[9px] font-mono text-slate-500">Epoch 1</span>
                        <span className="text-[9px] font-mono text-slate-500">Epoch {Math.round(epochs / 2)}</span>
                        <span className="text-[9px] font-mono text-slate-500">Epoch {epochs}</span>
                    </div>
                </div>
            )}

            {/* Training Logs */}
            <div className="neo-panel bg-slate-900 border-2 border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-mono font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <BeakerIcon className="w-5 h-5 text-amber-500" />
                        SYSTEM_LOGS
                    </h3>
                    <button
                        onClick={clearLogs}
                        className="px-3 py-1 bg-slate-950 border border-slate-700 text-[10px] font-mono font-black text-slate-400 uppercase hover:bg-slate-800 transition-colors"
                    >
                        CLEAR
                    </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 h-64 overflow-y-auto custom-scrollbar p-4 font-mono">
                    <AnimatePresence>
                        {logs.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex items-center justify-center text-slate-700"
                            >
                                <span className="text-[11px] font-black uppercase tracking-widest">Awaiting training initialization...</span>
                            </motion.div>
                        ) : (
                            logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`text-[11px] py-1 ${getLogColor(log.type)}`}
                                >
                                    <span className="text-slate-600 mr-2">[{log.timestamp}]</span>
                                    <span className={log.type === 'epoch' ? 'font-black' : ''}>{log.message}</span>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                    <div ref={logsEndRef} />
                </div>
            </div>
        </div>
    );
};

export default TrainingDashboard;
