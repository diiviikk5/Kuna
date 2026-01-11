/**
 * Maneuver Recommendation Component
 * Provides actionable station-keeping recommendations based on predicted errors
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RocketLaunchIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    BoltIcon
} from '@heroicons/react/24/outline';

const ManeuverRecommendation = ({ prediction, satellite, threshold = 5.0 }) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const [executed, setExecuted] = useState(false);
    const [countdown, setCountdown] = useState(null);

    // Calculate maneuver parameters
    const calculateManeuver = () => {
        if (!prediction) return null;

        // Simplified ΔV calculation based on error magnitude
        const positionError = Math.sqrt(
            Math.pow(prediction.radial || 0, 2) +
            Math.pow(prediction.along || 0, 2) +
            Math.pow(prediction.cross || 0, 2)
        );

        const clockError = Math.abs(prediction.clock || prediction.clockMeters || 0);
        const isThresholdExceeded = positionError > threshold || clockError > 3;

        // Estimate ΔV needed (simplified model)
        // In reality, this would use orbital mechanics
        const deltaV = positionError * 0.001; // m/s per meter of error
        const burnDuration = deltaV * 10; // seconds
        const fuelMass = deltaV * 0.5; // kg (simplified)

        return {
            positionError,
            clockError,
            isThresholdExceeded,
            deltaV: deltaV.toFixed(4),
            burnDuration: burnDuration.toFixed(1),
            fuelMass: fuelMass.toFixed(2),
            urgency: positionError > threshold * 2 ? 'CRITICAL' : positionError > threshold ? 'WARNING' : 'NOMINAL'
        };
    };

    const maneuver = calculateManeuver();

    const handleExecute = () => {
        setIsExecuting(true);
        setCountdown(3);

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsExecuting(false);
                    setExecuted(true);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleReset = () => {
        setExecuted(false);
        setIsExecuting(false);
        setCountdown(null);
    };

    if (!prediction || !maneuver) {
        return (
            <div className="neo-panel p-4 opacity-50">
                <div className="flex items-center gap-3 text-slate-500">
                    <RocketLaunchIcon className="w-5 h-5" />
                    <span className="font-mono text-sm">Awaiting prediction data...</span>
                </div>
            </div>
        );
    }

    const urgencyColors = {
        CRITICAL: 'bg-red-500 text-white',
        WARNING: 'bg-amber-500 text-black',
        NOMINAL: 'bg-emerald-400 text-black'
    };

    return (
        <motion.div
            className="bg-white border-4 border-black shadow-[8px_8px_0px_#000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b-4 border-black ${urgencyColors[maneuver.urgency]}`}>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-black text-white flex items-center justify-center border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                        <RocketLaunchIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-black text-2xl uppercase tracking-tighter italic">MANEUVER_ADVISORY</h3>
                        <p className="text-sm font-mono font-black opacity-80 uppercase">
                            {satellite?.name || 'SATELLITE'} // STATION_KEEPING
                        </p>
                    </div>
                </div>

                <div className="bg-black text-white px-4 py-2 font-black text-xl italic border-4 border-white">
                    {maneuver.urgency}
                </div>
            </div>

            {/* Error Summary */}
            <div className="p-6 grid grid-cols-2 gap-6 bg-slate-50 border-b-4 border-black">
                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
                    <div className="text-xs font-black font-mono text-slate-500 uppercase mb-2">POSITION_ERROR_RMS</div>
                    <div className={`text-4xl font-black font-mono ${maneuver.positionError > threshold ? 'text-red-500' : 'text-black'}`}>
                        {maneuver.positionError.toFixed(3)}<span className="text-lg ml-1">m</span>
                    </div>
                    <div className="text-[10px] font-black font-mono mt-2 pt-2 border-t-2 border-black uppercase text-slate-500">
                        THRESHOLD: {threshold.toFixed(2)}m
                    </div>
                </div>

                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
                    <div className="text-xs font-black font-mono text-slate-500 uppercase mb-2">CLOCK_OFFSET_DRIFT</div>
                    <div className={`text-4xl font-black font-mono ${maneuver.clockError > 3 ? 'text-amber-500' : 'text-black'}`}>
                        {maneuver.clockError.toFixed(3)}<span className="text-lg ml-1">m</span>
                    </div>
                    <div className="text-[10px] font-black font-mono mt-2 pt-2 border-t-2 border-black uppercase text-slate-500">
                        THRESHOLD: 3.00m
                    </div>
                </div>
            </div>

            {/* Maneuver Parameters */}
            {maneuver.isThresholdExceeded && (
                <div className="p-6 bg-slate-900 text-white">
                    <div className="text-sm font-black font-mono text-yellow-400 uppercase mb-6 flex items-center gap-2">
                        <BoltIcon className="w-5 h-5" /> RECOM_CORRECTION_VECTORS
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-left border-l-4 border-white pl-8">
                        <div>
                            <div className="text-xs font-black text-slate-400 uppercase mb-1">DELTA_V</div>
                            <div className="text-3xl font-black text-white font-mono">{maneuver.deltaV}<span className="text-sm ml-1">m/s</span></div>
                        </div>
                        <div>
                            <div className="text-xs font-black text-slate-400 uppercase mb-1">BURN_TIME</div>
                            <div className="text-3xl font-black text-white font-mono">{maneuver.burnDuration}<span className="text-sm ml-1">sec</span></div>
                        </div>
                        <div>
                            <div className="text-xs font-black text-slate-400 uppercase mb-1">FUEL_REQ</div>
                            <div className="text-3xl font-black text-white font-mono">{maneuver.fuelMass}<span className="text-sm ml-1">kg</span></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Button */}
            <div className="p-6 bg-white">
                <AnimatePresence mode="wait">
                    {executed ? (
                        <motion.div
                            key="executed"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="flex items-center justify-between p-6 bg-emerald-400 border-4 border-black shadow-[6px_6px_0px_#000]"
                        >
                            <div className="flex items-center gap-4">
                                <CheckCircleIcon className="w-10 h-10 text-black" />
                                <span className="text-2xl font-black italic uppercase italic">MANEUVER_SYNC_SUCCESS</span>
                            </div>
                            <button
                                onClick={handleReset}
                                className="bg-black text-white px-6 py-2 font-black uppercase italic border-2 border-white hover:bg-white hover:text-black transition-all"
                            >
                                RESET_CMD
                            </button>
                        </motion.div>
                    ) : isExecuting ? (
                        <motion.div
                            key="executing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center p-8 bg-red-500 text-white border-4 border-black shadow-[8px_8px_0px_#000]"
                        >
                            <div className="text-sm font-black font-mono mb-4 animate-pulse">UPLINKING_FIRE_COMMANDS...</div>
                            <span className="font-black text-7xl italic leading-none">
                                T-{countdown}
                            </span>
                        </motion.div>
                    ) : maneuver.isThresholdExceeded ? (
                        <motion.button
                            key="execute"
                            onClick={handleExecute}
                            className="w-full py-6 bg-black text-white text-3xl font-black uppercase italic tracking-widest border-4 border-black shadow-[12px_12px_0px_#f59e0b] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
                        >
                            EXECUTE_MANEUVER_CHAIN
                        </motion.button>
                    ) : (
                        <motion.div
                            key="nominal"
                            className="flex items-center justify-center p-6 bg-emerald-100 border-4 border-emerald-400 text-emerald-800 font-black uppercase italic text-xl"
                        >
                            <CheckCircleIcon className="w-8 h-8 mr-3" />
                            ORBIT_PARAMETERS_NOMINAL
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ManeuverRecommendation;
