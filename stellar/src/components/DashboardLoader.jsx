import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingMessages = [
    { text: 'Initializing AI Engine...', icon: '🧠' },
    { text: 'Loading TensorFlow.js Models...', icon: '⚡' },
    { text: 'Connecting to Satellite Network...', icon: '📡' },
    { text: 'Calibrating Prediction Systems...', icon: '🎯' },
    { text: 'Preparing Mission Control...', icon: '🚀' },
];

const DashboardLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // FAST Progressive loading
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 20; // 10x faster progress
            });
        }, 100);

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % loadingMessages.length);
        }, 500); // Cycle faster

        return () => clearInterval(messageInterval);
    }, []);

    useEffect(() => {
        if (progress >= 100 && !isComplete) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [progress, isComplete, onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-yellow-400 p-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="relative z-10 flex flex-col items-center gap-8 bg-white border-8 border-black p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                        {/* Logo/Title */}
                        <div className="text-center">
                            <h1 className="text-7xl font-black tracking-tighter uppercase italic">
                                STELLAR
                                <span className="text-amber-500">-v1k</span>
                            </h1>
                            <p className="text-black font-mono font-bold mt-4 border-2 border-black inline-block px-4 py-2 bg-white">
                                MISSION_START // STATUS: INITIALIZING
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full max-w-md">
                            <div className="h-10 border-4 border-black bg-white overflow-hidden p-1">
                                <motion.div
                                    className="h-full bg-black"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 font-mono font-bold text-black uppercase">
                                <span>{loadingMessages[messageIndex].text}</span>
                                <span>{progress}%</span>
                            </div>
                        </div>

                        <div className="text-sm font-mono font-medium text-black max-w-sm text-center">
                            NEO-BRUTALIST ANALYTICS ENGINE // VERSION 1.0.0-PRO-ISRO
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DashboardLoader;
