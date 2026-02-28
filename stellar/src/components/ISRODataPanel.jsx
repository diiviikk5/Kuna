/**
 * ISRO Data Panel - Technical Version for Satellite Operations
 * High-density data monitoring with Dark Industry theme
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    SignalIcon,
    ArrowUpIcon,
    ArrowRightIcon,
    ArrowTopRightOnSquareIcon,
    ClockIcon,
    BoltIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { loadISROData } from '../services/isroDataLoader';

const ISRODataPanel = ({ orbitType = 'GEO' }) => {
    const [activeTab, setActiveTab] = useState('telemetry');
    const [allData, setAllData] = useState([]);
    const [isroData, setIsroData] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const streamRef = useRef(null);

    // Initial data load
    useEffect(() => {
        const load = async () => {
            const data = await loadISROData(orbitType, 'Train');
            setAllData(data);
            setIsroData(data.slice(0, 50));
        };
        load();
    }, [orbitType]);

    // Handle streaming logic
    const onToggleStreaming = () => {
        if (isStreaming) {
            clearInterval(streamRef.current);
            setIsStreaming(false);
        } else {
            setIsStreaming(true);
            let index = 50;
            streamRef.current = setInterval(() => {
                setIsroData(prev => {
                    const nextPoint = allData[index % allData.length];
                    index++;
                    return [nextPoint, ...prev.slice(0, 49)];
                });
            }, 1000);
        }
    };

    useEffect(() => {
        return () => clearInterval(streamRef.current);
    }, []);

    // Selection of stats based on current data
    const currentPoint = isroData[0] || {};
    const stats = [
        { label: 'RADIAL_ERR', val: `${(currentPoint.radial || 0.042).toFixed(3)}m`, status: 'OK', icon: ArrowUpIcon },
        { label: 'ALONG_ERR', val: `${(currentPoint.along || 0.156).toFixed(3)}m`, status: 'OK', icon: ArrowRightIcon },
        { label: 'CROSS_ERR', val: `${(currentPoint.cross || 0.089).toFixed(3)}m`, status: 'OK', icon: ArrowTopRightOnSquareIcon },
        { label: 'CLOCK_BIAS', val: `${(currentPoint.clockMeters || 12.4).toFixed(1)}ns`, status: currentPoint.clockMeters > 20 ? 'WARN' : 'OK', icon: ClockIcon }
    ];

    return (
        <div className="neo-panel bg-[#0f172a]/80 overflow-hidden min-h-[600px] flex flex-col">
            {/* Panel Header */}
            <div className="bg-slate-800 border-b border-white/[0.06] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#020617] border border-indigo-500/30/50 flex items-center justify-center rotate-45 shadow-lg shadow-indigo-500/10">
                        <SignalIcon className="w-8 h-8 text-indigo-400 -rotate-45" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white tracking-wider uppercase italic leading-none">
                            ISRO_DATA_GATEWAY // G-24_MAIN
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isStreaming ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-500'}`} />
                            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                                {isStreaming ? 'L-BAND_LINK_ESTABLISHED' : 'LINK_OFFLINE // STANDBY'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="neo-btn px-4 py-2 text-[11px]" onClick={() => console.log('Exfil')}>EXFIL_REPORTS</button>
                    <button
                        className={`neo-btn px-4 py-2 text-[11px] ${isStreaming ? 'bg-emerald-600 text-black border-emerald-700' : 'bg-indigo-500 text-black border-amber-700'}`}
                        onClick={onToggleStreaming}
                    >
                        {isStreaming ? 'DISCONNECT_FEED' : 'INIT_UPLINK'}
                    </button>
                </div>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="flex border-b border-white/[0.06] bg-slate-950/30">
                {['telemetry', 'trajectory', 'residuals', 'logs'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-4 font-semibold text-[11px] uppercase tracking-wider transition-all border-r-2 border-slate-700 ${activeTab === tab
                            ? 'bg-indigo-500 text-black shadow-[4px_0px_0px_#000]'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`}
                    >
                        {tab}_RAW
                    </button>
                ))}
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((s, i) => (
                        <div key={i} className="neo-stat-card bg-[#020617] border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <s.icon className={`w-4 h-4 ${s.status === 'WARN' ? 'text-indigo-400' : 'text-slate-400'}`} />
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 border ${s.status === 'WARN' ? 'border-indigo-500/30 text-indigo-400' : 'border-emerald-500 text-emerald-500'
                                    }`}>{s.status}</span>
                            </div>
                            <div className="text-3xl font-semibold text-slate-100 italic">{s.val}</div>
                            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mt-1 tracking-wider leading-none">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Data Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Live Stream / Table Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="neo-panel p-4 bg-[#020617] border-slate-800 font-mono shadow-none h-[350px] flex flex-col">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider italic flex items-center gap-2">
                                    <BoltIcon className="w-3 h-3 text-indigo-400" /> RAW_TELEMETRY_STREAM
                                </span>
                                <span className="text-[10px] text-slate-500 font-bold tracking-wider">MONITOR_ACTIVE</span>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                                {isroData.length > 0 ? (
                                    isroData.map((row, i) => (
                                        <div key={i} className="flex gap-6 text-[11px] border-b border-slate-900 py-1.5 hover:bg-[#0f172a]/80 transition-colors font-mono">
                                            <span className="text-slate-500 font-bold">{row.utc_time || (row.timestamp ? new Date(row.timestamp).toLocaleTimeString() : '00:00:00')}</span>
                                            <span className="text-amber-500/90 font-bold">RAD: {parseFloat(row.radial || 0).toFixed(3)}</span>
                                            <span className="text-emerald-500/90 font-bold">ALN: {parseFloat(row.along || 0).toFixed(3)}</span>
                                            <span className="text-slate-400 hidden md:inline font-bold">ST_VEC_ACK_{i}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-600">
                                        <div className="w-12 h-12 border border-white/[0.06] flex items-center justify-center mb-4">
                                            <ArrowRightIcon className="w-6 h-6 animate-pulse" />
                                        </div>
                                        <span className="text-[11px] font-black tracking-wider uppercase">Awaiting Link Initialization...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-amber-900/20 border-2 border-amber-900/50 p-6 flex items-center gap-6">
                            <div className="w-12 h-12 bg-indigo-400 flex items-center justify-center text-black shadow-lg shadow-indigo-500/10">
                                <ExclamationTriangleIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">ANOMALY_DETECTOR_ACTIVE</h4>
                                <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-tight">Scanning residuals for transient orbit perturbations...</p>
                            </div>
                        </div>
                    </div>

                    {/* Operational Limits */}
                    <div className="space-y-6">
                        <div className="neo-panel bg-[#020617] border-slate-800 p-6 shadow-none">
                            <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-8 border-b border-white/[0.06] pb-2">OPERATIONAL_BOUNDS</h4>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-2 tracking-wider">
                                        <span>ORBIT_STABILITY</span>
                                        <span className="text-emerald-500 font-bold">99.42%</span>
                                    </div>
                                    <div className="h-2 border border-slate-800 bg-[#0f172a]/80">
                                        <div className="h-full bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.3)]" style={{ width: '99.4%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-2 tracking-wider">
                                        <span>FUEL_RESERVE</span>
                                        <span className="text-amber-500 font-bold">42.1kg</span>
                                    </div>
                                    <div className="h-2 border border-slate-800 bg-[#0f172a]/80">
                                        <div className="h-full shadow-[0_0_12px_rgba(245,158,11,0.3)] bg-indigo-500" style={{ width: '42.1%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 mb-2 tracking-wider">
                                        <span>THERMAL_LOAD</span>
                                        <span className="text-slate-200 font-bold">21.8°C</span>
                                    </div>
                                    <div className="h-2 border border-slate-800 bg-[#0f172a]/80">
                                        <div className="h-full bg-slate-500" style={{ width: '21.8%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="neo-panel bg-[#020617] border-slate-800 p-6 shadow-none">
                            <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-8 border-b border-white/[0.06] pb-2">CMD_QUEUE</h4>
                            <div className="space-y-4">
                                {[
                                    { id: 'TX-402', msg: 'ORBIT_CORRECTION_X', time: '14:23', state: 'SUCCESS' },
                                    { id: 'TX-403', msg: 'SENSOR_CAL_INIT', time: '14:24', state: 'PENDING' },
                                    { id: 'TX-404', msg: 'DATA_DUMP_SYNC', time: '--:--', state: 'QUEUED' }
                                ].map((cmd, i) => (
                                    <div key={i} className="flex justify-between items-center text-[11px] font-semibold border-l-4 border-slate-800 pl-4 py-2 hover:border-indigo-500/30 hover:bg-[#0f172a]/80 transition-all">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 tracking-tighter italic text-[10px]">{cmd.id}</span>
                                            <span className="text-slate-300 uppercase tracking-wider leading-none mt-1">{cmd.msg}</span>
                                        </div>
                                        <span className={`px-2 py-0.5 border-2 ${cmd.state === 'SUCCESS' ? 'border-emerald-500 text-emerald-500' :
                                            cmd.state === 'PENDING' ? 'border-indigo-500/30 text-indigo-400' : 'border-slate-700 text-slate-500'
                                            } text-[9px] font-bold`}>{cmd.state}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ISRODataPanel;
