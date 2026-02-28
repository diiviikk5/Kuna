import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    Legend
} from 'recharts';

const ModelEvaluation = ({ evaluationResults, onExport }) => {
    const [selectedFeature, setSelectedFeature] = useState('radial');
    const [viewMode, setViewMode] = useState('timeSeries');

    if (!evaluationResults) {
        return (
            <div className="neo-panel bg-[#0f172a]/80 border border-white/[0.06] p-12 flex flex-col items-center justify-center">
                <DocumentTextIcon className="w-16 h-16 text-slate-600 mb-4" />
                <p className="text-sm font-mono text-slate-500 uppercase tracking-wider">
                    No evaluation data available
                </p>
            </div>
        );
    }

    const { predictions, metrics, featureRMSE, mae, r2, mape } = evaluationResults;

    const features = ['radial', 'along', 'cross', 'clock'];

    const timeSeriesData = predictions.slice(0, 100).map(p => ({
        timestamp: new Date(p.timestamp).toLocaleTimeString(),
        actual: p.actual[selectedFeature],
        predicted: p.predicted[selectedFeature]
    }));

    const scatterData = predictions.slice(0, 200).map(p => ({
        actual: p.actual[selectedFeature],
        predicted: p.predicted[selectedFeature]
    }));

    const residualsData = predictions.slice(0, 100).map((p, i) => ({
        index: i,
        residual: p.errors[selectedFeature]
    }));

    const MetricCard = ({ label, value, icon: Icon, color = 'text-white', unit = '' }) => (
        <div className="neo-panel bg-[#020617] border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
            </div>
            <div className={`text-2xl font-semibold ${color}`}>
                {typeof value === 'number' ? value.toFixed(4) : value}
                <span className="text-sm ml-1">{unit}</span>
            </div>
        </div>
    );

    const getFeatureColor = (feature) => {
        const colors = {
            radial: 'text-amber-400 border-indigo-500/30',
            along: 'text-emerald-400 border-emerald-500',
            cross: 'text-blue-400 border-blue-500',
            clock: 'text-rose-400 border-rose-500'
        };
        return colors[feature];
    };

    return (
        <div className="space-y-6">
            {/* Overall Metrics */}
            <div className="neo-panel bg-[#0f172a]/80 border border-white/[0.06] p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                    <ChartBarIcon className="w-5 h-5 text-indigo-400" />
                    OVERALL_MODEL_PERFORMANCE
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <MetricCard
                        label="RMSE"
                        value={metrics?.overall?.rmse || rmse}
                        icon={ArrowTrendingUpIcon}
                        color="text-emerald-400"
                    />
                    <MetricCard
                        label="MAE"
                        value={metrics?.overall?.mae || mae}
                        icon={ChartBarIcon}
                        color="text-blue-400"
                    />
                    <MetricCard
                        label="R² SCORE"
                        value={metrics?.overall?.r2 || r2}
                        icon={ArrowTrendingUpIcon}
                        color="text-amber-400"
                    />
                    <MetricCard
                        label="MAPE"
                        value={mape}
                        icon={ArrowTrendingDownIcon}
                        color="text-rose-400"
                        unit="%"
                    />
                </div>
            </div>

            {/* Feature Selection & View Mode */}
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                        SELECT_FEATURE
                    </label>
                    <select
                        value={selectedFeature}
                        onChange={(e) => setSelectedFeature(e.target.value)}
                        className="w-full px-4 py-3 bg-[#020617] border border-white/[0.06] text-white font-mono text-sm font-bold uppercase tracking-wider focus:border-indigo-500/30 focus:outline-none"
                    >
                        {features.map(f => (
                            <option key={f} value={f}>{f.toUpperCase()}_ERROR</option>
                        ))}
                    </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                        VIEW_MODE
                    </label>
                    <select
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                        className="w-full px-4 py-3 bg-[#020617] border border-white/[0.06] text-white font-mono text-sm font-bold uppercase tracking-wider focus:border-indigo-500/30 focus:outline-none"
                    >
                        <option value="timeSeries">TIME_SERIES</option>
                        <option value="scatter">SCATTER_PLOT</option>
                        <option value="residuals">RESIDUALS</option>
                    </select>
                </div>
            </div>

            {/* Per-Feature RMSE */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map(feature => (
                    <motion.div
                        key={feature}
                        className={`neo-panel bg-[#020617] border-2 p-4 cursor-pointer hover:shadow-lg shadow-indigo-500/10 transition-all ${
                            selectedFeature === feature ? 'shadow-lg shadow-indigo-500/10' : ''
                        } ${getFeatureColor(feature)}`}
                        onClick={() => setSelectedFeature(feature)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            {feature}
                        </div>
                        <div className="text-2xl font-semibold text-white italic">
                            {featureRMSE[feature]?.toFixed(4)}
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                            RMSE
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts */}
            <div className="neo-panel bg-[#0f172a]/80 border border-white/[0.06] p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-3">
                        <ChartBarIcon className="w-5 h-5 text-indigo-400" />
                        {selectedFeature.toUpperCase()}_ERROR_ANALYSIS
                    </h3>
                    {onExport && (
                        <button
                            onClick={() => onExport(evaluationResults)}
                            className="px-4 py-2 bg-indigo-500 text-black font-semibold text-[10px] uppercase tracking-wider border border-indigo-500/30 hover:bg-indigo-400 hover:shadow-lg shadow-indigo-500/10 transition-all"
                        >
                            EXPORT_DATA
                        </button>
                    )}
                </div>

                <div className="bg-slate-950/50 p-4 border border-slate-800">
                    {viewMode === 'timeSeries' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={timeSeriesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis
                                    dataKey="timestamp"
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
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: 20 }}
                                    formatter={(value) => <span className="text-slate-300 text-[11px] font-bold font-mono tracking-wider">{value}</span>}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Actual"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="predicted"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Predicted"
                                    strokeDasharray="5 5"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}

                    {viewMode === 'scatter' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis
                                    type="number"
                                    dataKey="actual"
                                    stroke="#94a3b8"
                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' }}
                                    label={{ value: 'Actual', position: 'insideBottom', offset: -5, style: { fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' } }}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="predicted"
                                    stroke="#94a3b8"
                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' }}
                                    label={{ value: 'Predicted', angle: -90, position: 'insideLeft', offset: -5, style: { fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' } }}
                                />
                                <Tooltip
                                    cursor={{ strokeDasharray: '3 3' }}
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '2px solid #334155',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Legend />
                                <Scatter name="Predictions" data={scatterData} fill="#f59e0b" />
                                <Line
                                    type="monotone"
                                    dataKey="x"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Perfect Fit"
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    )}

                    {viewMode === 'residuals' && (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={residualsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis
                                    dataKey="index"
                                    stroke="#94a3b8"
                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' }}
                                    label={{ value: 'Sample Index', position: 'insideBottom', offset: -5, style: { fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' } }}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' }}
                                    label={{ value: 'Residual', angle: -90, position: 'insideLeft', offset: -5, style: { fill: '#94a3b8', fontSize: 11, fontWeight: 800, fontFamily: 'monospace' } }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '2px solid #334155',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="residual"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    dot={{ r: 2 }}
                                    name="Residual"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* R² Quality Indicator */}
            <div className={`neo-panel bg-[#020617] border-2 p-6 flex items-center gap-6 ${
                r2 > 0.9 ? 'border-emerald-500' : r2 > 0.7 ? 'border-indigo-500/30' : 'border-rose-500'
            }`}>
                <div className={`w-16 h-16 flex items-center justify-center ${
                    r2 > 0.9 ? 'bg-emerald-600' : r2 > 0.7 ? 'bg-indigo-500' : 'bg-rose-600'
                }`}>
                    {r2 > 0.7 ? (
                        <CheckCircleIcon className="w-10 h-10 text-black" />
                    ) : (
                        <XCircleIcon className="w-10 h-10 text-black" />
                    )}
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
                        MODEL_R²_QUALITY
                    </h4>
                    <p className="text-[11px] font-bold text-slate-300">
                        {r2 > 0.9 ? 'EXCELLENT' : r2 > 0.7 ? 'GOOD' : 'POOR'} FIT
                        {' '} (R² = {r2.toFixed(4)})
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModelEvaluation;
