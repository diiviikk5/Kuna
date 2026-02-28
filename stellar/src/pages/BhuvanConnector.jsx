/**
 * Bhuvan & VEDAS Data Connector
 * Import satellite data directly from ISRO's portals
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CloudArrowDownIcon,
    MapIcon,
    GlobeAsiaAustraliaIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    CubeIcon,
    SunIcon,
    CloudIcon,
    SparklesIcon,
    ChevronRightIcon,
    DocumentArrowDownIcon,
    BoltIcon
} from '@heroicons/react/24/outline';

const dataSources = [
    {
        id: 'bhuvan',
        name: 'BHUVAN',
        subtitle: 'ISRO Geo-Portal',
        description: 'High-res satellite imagery, DEMs, land use maps',
        icon: GlobeAsiaAustraliaIcon,
        color: 'from-orange-500 to-red-600',
        activeColor: 'bg-orange-500/10 border-orange-500/30',
        datasets: ['Cartosat-3', 'ResourceSat-2A', 'RISAT-1A', 'EOS-04'],
        status: 'connected'
    },
    {
        id: 'vedas',
        name: 'VEDAS',
        subtitle: 'Climate & Disaster',
        description: 'Vegetation indices, drought monitoring, ocean data',
        icon: SunIcon,
        color: 'from-emerald-500 to-teal-600',
        activeColor: 'bg-emerald-500/10 border-emerald-500/30',
        datasets: ['NDVI', 'LST', 'Soil Moisture', 'Evapotranspiration'],
        status: 'connected'
    },
    {
        id: 'mosdac',
        name: 'MOSDAC',
        subtitle: 'Weather Satellite',
        description: 'INSAT-3D/3DR real-time weather imagery',
        icon: CloudIcon,
        color: 'from-blue-500 to-indigo-600',
        activeColor: 'bg-blue-500/10 border-blue-500/30',
        datasets: ['INSAT-3D VIS', 'INSAT-3DR TIR', 'INSAT-3D WV'],
        status: 'connected'
    },
    {
        id: 'soi',
        name: 'SOI TOPO',
        subtitle: 'Survey of India',
        description: 'Official topographic maps & boundaries',
        icon: MapIcon,
        color: 'from-purple-500 to-pink-600',
        activeColor: 'bg-purple-500/10 border-purple-500/30',
        datasets: ['1:50K Topo', '1:25K Topo', 'Admin Boundaries'],
        status: 'pending'
    }
];

const indiaRegions = [
    { id: 'punjab', name: 'Punjab', coords: '30.9°N, 75.8°E', crops: 'Wheat, Rice' },
    { id: 'maharashtra', name: 'Maharashtra', coords: '19.6°N, 75.3°E', crops: 'Sugarcane, Cotton' },
    { id: 'kerala', name: 'Kerala', coords: '10.8°N, 76.2°E', crops: 'Coconut, Rubber' },
    { id: 'uttarakhand', name: 'Uttarakhand', coords: '30.0°N, 79.0°E', crops: 'Himalayan Terrain' },
    { id: 'rajasthan', name: 'Rajasthan', coords: '27.0°N, 74.2°E', crops: 'Arid Analysis' },
    { id: 'bengal', name: 'West Bengal', coords: '22.9°N, 87.8°E', crops: 'Rice, Jute' },
];

const BhuvanConnector = () => {
    const [selectedSource, setSelectedSource] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDatasets, setSelectedDatasets] = useState([]);
    const [importing, setImporting] = useState(false);
    const [importProgress, setImportProgress] = useState(0);
    const [importComplete, setImportComplete] = useState(false);

    const handleImport = () => {
        setImporting(true);
        setImportProgress(0);

        const interval = setInterval(() => {
            setImportProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setImporting(false);
                    setImportComplete(true);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);
    };

    const toggleDataset = (dataset) => {
        setSelectedDatasets(prev =>
            prev.includes(dataset)
                ? prev.filter(d => d !== dataset)
                : [...prev, dataset]
        );
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-200 p-8 pb-20 font-sans">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center gap-5 mb-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center rounded-2xl shadow-lg shadow-orange-500/20">
                        <CloudArrowDownIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
                            Data Connectors
                        </h1>
                        <p className="text-slate-400 font-medium text-sm">
                            Import directly from ISRO's Bhuvan, VEDAS & MOSDAC portals
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Data Sources */}
                <div className="md:col-span-4 space-y-4">
                    <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-4">
                        // Select Data Source
                    </h2>

                    {dataSources.map((source, index) => (
                        <motion.button
                            key={source.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => {
                                setSelectedSource(source);
                                setImportComplete(false);
                            }}
                            className={`
                                w-full text-left p-5 border rounded-2xl transition-all
                                ${selectedSource?.id === source.id
                                    ? source.activeColor + ' shadow-lg hover:-translate-y-1'
                                    : 'bg-[#0f172a]/80 backdrop-blur-xl border-white/5 hover:bg-white/5 hover:border-white/10 shadow-md'
                                }
                            `}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`
                                    w-12 h-12 flex items-center justify-center rounded-xl border
                                    ${selectedSource?.id === source.id ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}
                                `}>
                                    <source.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg text-white">{source.name}</h3>
                                        <div className={`
                                            w-2.5 h-2.5 rounded-full shadow-sm
                                            ${source.status === 'connected' ? 'bg-emerald-400 shadow-emerald-500/50' : 'bg-amber-400 shadow-amber-500/50'}
                                        `} />
                                    </div>
                                    <p className="text-xs font-semibold text-slate-400">{source.subtitle}</p>
                                    <p className="text-sm font-medium text-slate-500 mt-2 leading-snug">{source.description}</p>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Region Selector */}
                <div className="md:col-span-4 space-y-4">
                    <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-4">
                        // Select Region
                    </h2>

                    {/* India Map Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative h-56 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden mb-6"
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <GlobeAsiaAustraliaIcon className="w-32 h-32 text-indigo-400" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                            <span className="text-xs font-semibold tracking-wider text-slate-300">भारत // INDIA</span>
                            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">Live View</span>
                        </div>

                        {/* Interactive Dots */}
                        {indiaRegions.map((region, i) => (
                            <motion.button
                                key={region.id}
                                className={`absolute w-3.5 h-3.5 rounded-full border-2 transition-all shadow-md ${selectedRegion?.id === region.id
                                    ? 'bg-amber-400 border-white scale-125 shadow-amber-500/50'
                                    : 'bg-emerald-400 border-white/20 hover:scale-110 shadow-emerald-500/30'
                                    }`}
                                style={{
                                    top: `${20 + (i % 3) * 25}%`,
                                    left: `${25 + (i % 2) * 30 + (i * 7)}%`
                                }}
                                onClick={() => setSelectedRegion(region)}
                                whileHover={{ scale: 1.3 }}
                            />
                        ))}
                    </motion.div>

                    {/* Region Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        {indiaRegions.map((region) => (
                            <motion.button
                                key={region.id}
                                onClick={() => setSelectedRegion(region)}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    p-4 rounded-xl border transition-all text-left
                                    ${selectedRegion?.id === region.id
                                        ? 'bg-indigo-400/10 border-amber-500/30 shadow-md shadow-amber-500/5'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                    }
                                `}
                            >
                                <div className={`font-bold text-sm ${selectedRegion?.id === region.id ? 'text-amber-400' : 'text-slate-200'}`}>{region.name}</div>
                                <div className="text-xs font-medium text-slate-500 mt-1">{region.coords}</div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Dataset Selection & Import */}
                <div className="md:col-span-4 space-y-4">
                    <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-4">
                        // Configure Import
                    </h2>

                    <AnimatePresence mode="wait">
                        {selectedSource ? (
                            <motion.div
                                key="config"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {/* Dataset Selection */}
                                <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                        Available Datasets
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedSource.datasets.map((dataset) => (
                                            <button
                                                key={dataset}
                                                onClick={() => toggleDataset(dataset)}
                                                className={`
                                                    w-full flex items-center gap-4 p-3 rounded-xl border transition-all
                                                    ${selectedDatasets.includes(dataset)
                                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'
                                                    }
                                                `}
                                            >
                                                <div className={`p-1.5 rounded-lg ${selectedDatasets.includes(dataset) ? 'bg-emerald-500/20' : 'bg-white/10'}`}>
                                                    <CubeIcon className="w-4 h-4" />
                                                </div>
                                                <span className="font-semibold text-sm">{dataset}</span>
                                                {selectedDatasets.includes(dataset) && (
                                                    <CheckCircleIcon className="w-5 h-5 ml-auto text-emerald-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center">
                                        <SparklesIcon className="w-5 h-5 mb-2 text-indigo-400" />
                                        <span className="text-xs font-bold text-slate-300">Auto-Crop</span>
                                    </button>
                                    <button className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors flex flex-col items-center justify-center">
                                        <ArrowPathIcon className="w-5 h-5 mb-2 text-blue-400" />
                                        <span className="text-xs font-bold text-slate-300">Cloud Mask</span>
                                    </button>
                                </div>

                                {/* Import Button */}
                                <div className="relative">
                                    {importing && (
                                        <div className="absolute inset-0 bg-white/5 rounded-2xl overflow-hidden border border-white/10 z-0">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-orange-500/20 to-amber-500/40"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${importProgress}%` }}
                                            />
                                        </div>
                                    )}
                                    <motion.button
                                        onClick={handleImport}
                                        disabled={!selectedRegion || selectedDatasets.length === 0 || importing}
                                        className={`
                                            relative z-10 w-full py-4 rounded-full font-bold uppercase tracking-wider transition-all shadow-lg text-sm
                                            ${!selectedRegion || selectedDatasets.length === 0
                                                ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5 shadow-none'
                                                : importing
                                                    ? 'bg-transparent text-amber-400 border border-amber-500/30'
                                                    : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/20 active:scale-[0.98]'
                                            }
                                        `}
                                    >
                                        {importing ? (
                                            <span className="flex items-center justify-center gap-3">
                                                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                                Importing... {Math.round(importProgress)}%
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-3">
                                                <BoltIcon className="w-5 h-5" />
                                                Fetch from {selectedSource.name}
                                            </span>
                                        )}
                                    </motion.button>
                                </div>

                                {/* Success State */}
                                {importComplete && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl shadow-lg backdrop-blur-md"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-emerald-500/20 rounded-full">
                                                <CheckCircleIcon className="w-8 h-8 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-emerald-400 text-lg">Import Complete</div>
                                                <div className="text-sm font-medium text-slate-300 mt-1">
                                                    {selectedDatasets.length} datasets • {selectedRegion?.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                            <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors">
                                                <SparklesIcon className="w-4 h-4" />
                                                Train Model
                                            </button>
                                            <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors">
                                                <DocumentArrowDownIcon className="w-4 h-4" />
                                                Export Data
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/20 bg-white/5 rounded-2xl"
                            >
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <MapIcon className="w-8 h-8 text-slate-500" />
                                </div>
                                <p className="text-slate-400 font-medium text-sm">
                                    Select a data source to begin import
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Connected Sources', value: '3/4', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                    { label: 'Available Datasets', value: '14', color: 'text-amber-400', bg: 'bg-indigo-400/10 border-amber-500/20' },
                    { label: 'Data Cached', value: '2.3 GB', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
                    { label: 'Last Sync', value: '2 min ago', color: 'text-slate-300', bg: 'bg-white/5 border-white/10' },
                ].map((stat) => (
                    <div key={stat.label} className={`p-5 rounded-2xl border backdrop-blur-md ${stat.bg}`}>
                        <div className={`text-3xl font-bold tracking-tight mb-1 ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default BhuvanConnector;
