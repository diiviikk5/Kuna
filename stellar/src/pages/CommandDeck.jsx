import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RocketLaunchIcon,
    SignalIcon,
    ClockIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    PlayIcon,
    ArrowRightIcon,
    CpuChipIcon,
    BoltIcon,
    CheckCircleIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Header, KPICard, EvidenceStrip, LoadingSpinner, StatusBadge, DashboardLoader } from '../components';
import { satellites, generateKPIMetrics, modelComparison } from '../data/mockData';
import { initializeAI, generateForecast, getAIStatus } from '../services/aiService';
import { generateHistoricalData } from '../services/liveDataService';
import { useAppStore } from '../store/appStore';

// Lazy load heavy components to improve initial load
// Lazy load heavy components to improve initial load
const ISRODataPanel = lazy(() => import('../components/ISRODataPanel'));
const ManeuverRecommendation = lazy(() => import('../components/ManeuverRecommendation'));

const CommandDeck = () => {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [runComplete, setRunComplete] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [aiReady, setAiReady] = useState(false);
    const [forecastResults, setForecastResults] = useState(null);
    const [inferenceTime, setInferenceTime] = useState(null);

    // Only show loader on first visit this session
    const [isLoading, setIsLoading] = useState(() => {
        return !sessionStorage.getItem('stellar_dashboard_loaded');
    });
    const [showHeavyComponents, setShowHeavyComponents] = useState(() => {
        return sessionStorage.getItem('stellar_dashboard_loaded') === 'true';
    });

    const addNotification = useAppStore(state => state.addNotification);

    // Initialize AI on mount (during loading screen)
    useEffect(() => {
        const init = async () => {
            try {
                await initializeAI();
                setAiReady(true);
                const status = getAIStatus();
                console.log('AI Status:', status);
            } catch (err) {
                console.error('AI init error:', err);
            }
        };
        init();

        setMetrics(generateKPIMetrics());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Delay heavy component loading after main UI is ready
    useEffect(() => {
        if (!isLoading) {
            // Load additional components immediately
            setShowHeavyComponents(true);
        }
    }, [isLoading]);

    // Handle loading complete
    const handleLoadingComplete = useCallback(() => {
        sessionStorage.setItem('stellar_dashboard_loaded', 'true');
        setIsLoading(false);
    }, []);

    // Real AI-powered forecast
    const handleRunForecast = useCallback(async () => {
        setIsRunning(true);
        setRunComplete(false);
        setForecastResults(null);

        const startTime = performance.now();

        try {
            // Run AI forecasts for all satellites
            const results = await Promise.all(
                satellites.slice(0, 6).map(async (sat) => {
                    const data = generateHistoricalData(sat.id, 7, 15);
                    const forecast = await generateForecast(data, sat.id);
                    return { satellite: sat, forecast };
                })
            );

            const totalTime = performance.now() - startTime;
            setInferenceTime(totalTime);
            setForecastResults(results);
            setMetrics(generateKPIMetrics());

            addNotification({
                type: 'success',
                title: '🚀 AI Forecast Complete',
                message: `Generated predictions for ${results.length} satellites in ${totalTime.toFixed(0)}ms`
            });

        } catch (err) {
            console.error('Forecast error:', err);
            addNotification({
                type: 'error',
                title: 'Forecast Failed',
                message: err.message
            });
        } finally {
            setIsRunning(false);
            setRunComplete(true);
        }
    }, [addNotification]);

    const formatLastUpdate = () => {
        return currentTime.toLocaleTimeString();
    };

    // Show loading screen
    if (isLoading) {
        return <DashboardLoader onComplete={handleLoadingComplete} />;
    }

    if (!metrics) return null;

    return (
        <div className="min-h-screen">
            <Header
                title="Command Deck"
                subtitle="GNSS Error Forecasting Mission Control"
            />

            <div className="p-8 space-y-12 min-h-screen">
                {/* AI System Status Banner */}
                <motion.div
                    className="neo-panel bg-slate-900 border-2 border-slate-700 p-4 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex items-center gap-6">
                        <div className="bg-slate-950 border-2 border-amber-500/50 text-amber-500 px-4 py-2 font-mono font-black text-sm tracking-widest shadow-[4px_4px_0px_#000]">
                            SYSTEM_STATUS: {aiReady ? 'OPERATIONAL' : 'INITIALIZING'}
                        </div>
                        <div className="font-mono text-slate-300 font-bold uppercase tracking-[0.2em] hidden md:block text-[11px] italic">
                            INTEGRATED_ML_FORECASTING_ENGINE // CORE_V1.0.4
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border-l-2 border-slate-800 pl-6">
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${aiReady ? 'bg-emerald-500 animate-pulse outline outline-4 outline-emerald-500/20' : 'bg-slate-600'}`} />
                                <span className="font-mono font-black text-slate-100 text-sm tracking-wider">{currentTime.toLocaleTimeString('en-US', { hour12: false })}_UTC</span>
                            </div>
                            <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">MISSION_TIME_SYNC</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto space-y-10">
                    <section>
                        <div className="flex items-center gap-6 mb-8">
                            <h2 className="text-2xl font-mono font-black uppercase tracking-[0.3em] text-white">
                                <span className="text-amber-500 mr-2">&gt;&gt;</span> ISRO_UPLINK_LIVE
                            </h2>
                            <div className="flex-1 h-[2px] bg-slate-800" />
                        </div>

                        {showHeavyComponents && (
                            <Suspense fallback={
                                <div className="neo-panel bg-slate-950 p-20 flex flex-col items-center justify-center gap-4">
                                    <div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 animate-spin" />
                                    <span className="font-mono font-black uppercase tracking-widest text-slate-400 text-xs">Linking to Sat_Com_Net...</span>
                                </div>
                            }>
                                <div className="shadow-2xl">
                                    <ISRODataPanel orbitType="GEO" />
                                </div>
                            </Suspense>
                        )}
                    </section>

                    {/* Mission Evidence & Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="neo-panel bg-slate-900 p-8 border-slate-700">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs font-mono font-black uppercase tracking-widest text-slate-300 border-l-4 border-amber-500 pl-4">Model_Confidence_Index</h3>
                                <ChartBarIcon className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="text-7xl font-mono font-black text-white italic">94.8<span className="text-2xl ml-1 text-slate-400">%</span></div>
                            <div className="mt-6 font-mono text-[11px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
                                Current prediction reliability based on 7-day look-back temporal validation.
                            </div>
                        </div>

                        <div className="neo-panel bg-slate-950 p-8 border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs font-mono font-black uppercase tracking-widest text-slate-400 border-l-4 border-slate-700 pl-4">Maneuver_Efficiency_Gain</h3>
                                <RocketLaunchIcon className="w-5 h-5 text-slate-700" />
                            </div>
                            <div className="text-7xl font-mono font-black text-amber-500 italic">-12.4<span className="text-2xl ml-1 text-slate-400">%</span></div>
                            <div className="mt-6 font-mono text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                Projected ΔV fuel consumption reduction using proactive GNSS residual correction.
                            </div>
                        </div>

                        <div className="neo-panel bg-slate-900 border-2 border-amber-500/20 p-8 flex flex-col justify-between group hover:border-amber-500 transition-all">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xs font-mono font-black uppercase tracking-widest text-amber-500 italic">SYSTEM_EXECUTOR_NODE</h3>
                                    <BoltIcon className="w-6 h-6 text-amber-500" />
                                </div>
                                <p className="text-[11px] font-mono font-bold text-slate-300 uppercase leading-relaxed mb-6">
                                    Trigger global fleet inference. Executing this will update all satellite state vectors using the STELLAR-v1k ML core.
                                </p>
                            </div>

                            <button
                                onClick={handleRunForecast}
                                disabled={isRunning || !aiReady}
                                className={`
                                    w-full py-5 font-mono font-black text-xs uppercase tracking-[0.2em] transition-all
                                    flex items-center justify-center gap-3 border-2
                                    ${isRunning
                                        ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-amber-600 border-amber-500 text-black hover:bg-amber-500 hover:shadow-[8px_8px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none'
                                    }
                                `}
                            >
                                {isRunning ? (
                                    <>
                                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                        INFERENCE_RUNNING...
                                    </>
                                ) : (
                                    <>
                                        <PlayIcon className="w-5 h-5" />
                                        EXECUTE_MISSION_FORECAST
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Global Evidence Strip */}
                <div className="neo-panel bg-slate-950 border-slate-800 p-2 opacity-80 hover:opacity-100 transition-opacity">
                    <EvidenceStrip
                        validationWindow="EPOCH_7 → EPOCH_8"
                        baselineRMSE="0.428 ns"
                        stellarRMSE="0.182 ns"
                        improvement="57.41%"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommandDeck;
