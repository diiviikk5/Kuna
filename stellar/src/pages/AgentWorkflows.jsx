/**
 * STELLAR Agent Workflows — Autonomous AI Agents Marketplace
 * 
 * Replaces the static model marketplace with live autonomous agents
 * that use Openclaw skills to monitor, predict, and act autonomously.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BoltIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    SignalIcon,
    FireIcon,
    GlobeAsiaAustraliaIcon,
    CloudIcon,
    SunIcon,
    TruckIcon,
    PlayIcon,
    StopIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    CommandLineIcon,
    ChatBubbleLeftRightIcon,
    CubeTransparentIcon,
    SparklesIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

// ─── Agent Definitions (Real use-cases) ────────────────────────────

const agents = [
    {
        id: 'flood-monitor',
        name: 'NDRF Flood Responder',
        category: 'Disaster',
        icon: CloudIcon,
        description: 'Monitors all major Indian rivers via ISRO MOSDAC + INSAT-3D every 6 hours. Auto-dispatches WhatsApp alerts to NDRF district officers when risk exceeds threshold.',
        schedule: 'Every 6 hours',
        tools: ['stellar_flood_risk', 'stellar_disaster_alert'],
        regions: ['Kerala', 'Assam', 'Bihar', 'Uttarakhand', 'West Bengal'],
        status: 'active',
        uptime: '99.7%',
        alertsSent: 2847,
        lastRun: '12 min ago',
        gradient: 'from-blue-500 to-cyan-600',
        pricing: '₹45,000/mo',
        tier: 'ENTERPRISE'
    },
    {
        id: 'crop-sentinel',
        name: 'Crop Sentinel',
        category: 'Agriculture',
        icon: SunIcon,
        description: 'Daily sweep of 50,000+ farm plots across Punjab & Haryana using ResourceSat-2A NDVI. Sends personalized crop health reports to farmers via WhatsApp in Hindi/Punjabi.',
        schedule: 'Daily at 8:00 AM',
        tools: ['stellar_crop_health', 'stellar_disaster_alert'],
        regions: ['Punjab', 'Haryana', 'Madhya Pradesh'],
        status: 'active',
        uptime: '99.2%',
        alertsSent: 14200,
        lastRun: '3 hours ago',
        gradient: 'from-emerald-500 to-green-600',
        pricing: '₹28,000/mo',
        tier: 'PRO'
    },
    {
        id: 'gnss-guardian',
        name: 'GNSS Guardian',
        category: 'Navigation',
        icon: SignalIcon,
        description: 'Continuous 15-minute GNSS error forecasting for all NavIC + GPS satellites. Feeds corrected positions to ISRO IRNSS ground station for broadcast integrity monitoring.',
        schedule: 'Every 15 minutes',
        tools: ['stellar_forecast'],
        regions: ['National — All Constellations'],
        status: 'active',
        uptime: '99.9%',
        alertsSent: 156,
        lastRun: '2 min ago',
        gradient: 'from-amber-500 to-orange-600',
        pricing: '₹65,000/mo',
        tier: 'ENTERPRISE'
    },
    {
        id: 'rail-monitor',
        name: 'Rail Corridor Monitor',
        category: 'Infrastructure',
        icon: TruckIcon,
        description: 'Weekly satellite sweep of 68,000km Indian Railways corridors. Detects encroachment, vegetation overgrowth, track misalignment. Auto-generates CRIS maintenance tickets.',
        schedule: 'Weekly (Monday 6 AM)',
        tools: ['stellar_crop_health', 'stellar_disaster_alert'],
        regions: ['National — All Zones'],
        status: 'paused',
        uptime: '97.8%',
        alertsSent: 423,
        lastRun: '5 days ago',
        gradient: 'from-slate-500 to-zinc-600',
        pricing: '₹1,20,000/mo',
        tier: 'ENTERPRISE'
    },
    {
        id: 'stubble-hawk',
        name: 'Stubble Burn Hawk',
        category: 'Environment',
        icon: FireIcon,
        description: 'Real-time thermal satellite monitoring for crop burning events in Punjab/Haryana. Alerts pollution control board within 15 minutes of detection.',
        schedule: 'Every 30 minutes (Oct–Nov)',
        tools: ['stellar_crop_health', 'stellar_disaster_alert'],
        regions: ['Punjab', 'Haryana', 'Delhi NCR'],
        status: 'active',
        uptime: '98.4%',
        alertsSent: 3891,
        lastRun: '28 min ago',
        gradient: 'from-red-500 to-orange-600',
        pricing: '₹35,000/mo',
        tier: 'PRO'
    },
    {
        id: 'landslide-watch',
        name: 'Himalayan Landslide Watch',
        category: 'Disaster',
        icon: GlobeAsiaAustraliaIcon,
        description: 'Monitors DEM changes and rainfall patterns across Himalayan belt. Triggers evacuation warnings 48hrs ahead of predicted landslide events.',
        schedule: 'Every 3 hours',
        tools: ['stellar_flood_risk', 'stellar_disaster_alert'],
        regions: ['Uttarakhand', 'Himachal Pradesh', 'Sikkim'],
        status: 'active',
        uptime: '99.1%',
        alertsSent: 892,
        lastRun: '1 hour ago',
        gradient: 'from-purple-500 to-violet-600',
        pricing: '₹52,000/mo',
        tier: 'ENTERPRISE'
    }
];

// ─── Agent Terminal Simulator ──────────────────────────────────────

const terminalLines = [
    { type: 'system', text: '[STELLAR-AGENT] Initializing flood_monitor agent...' },
    { type: 'info', text: '  → Loading skill: stellar-geo-ai v1.0.0' },
    { type: 'info', text: '  → Authenticating with API key: sk-****-7f3a' },
    { type: 'success', text: '  ✓ Connected to STELLAR API (latency: 23ms)' },
    { type: 'system', text: '[TOOL_CALL] stellar_flood_risk({region: "Kerala", hours_ahead: 48})' },
    { type: 'think', text: '  🧠 Reasoning: Querying MOSDAC for INSAT-3D precipitation data...' },
    { type: 'think', text: '  🧠 Reasoning: Cross-referencing with historical flood patterns (20yr dataset)...' },
    { type: 'think', text: '  🧠 Reasoning: Analyzing soil moisture from VEDAS portal...' },
    { type: 'data', text: '  📊 Result: risk_level=HIGH, confidence=0.89, rainfall=78mm/48h' },
    { type: 'warning', text: '  ⚠️  Risk threshold exceeded (>0.75). Triggering alert protocol.' },
    { type: 'system', text: '[TOOL_CALL] stellar_disaster_alert({severity: "warning", region: "Kerala", channels: ["whatsapp"]})' },
    { type: 'think', text: '  🧠 Composing alert message in Malayalam + English...' },
    { type: 'success', text: '  ✓ WhatsApp alert dispatched to 34 NDRF officers in 3 districts' },
    { type: 'success', text: '  ✓ Webhook fired to Kerala State Disaster Management Authority' },
    { type: 'info', text: '  → Next scheduled run: 6 hours from now' },
    { type: 'system', text: '[AGENT] Cycle complete. Sleeping...' }
];

const AgentTerminal = () => {
    const [visibleLines, setVisibleLines] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const termRef = useRef(null);

    const runSimulation = () => {
        setIsRunning(true);
        setVisibleLines([]);
        let i = 0;
        const interval = setInterval(() => {
            if (i >= terminalLines.length) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }
            const currentLine = terminalLines[i];
            setVisibleLines(prev => [...prev, currentLine]);
            i++;
        }, 600);
    };

    useEffect(() => {
        if (termRef.current) {
            termRef.current.scrollTop = termRef.current.scrollHeight;
        }
    }, [visibleLines]);

    const getLineColor = (type) => {
        switch (type) {
            case 'system': return 'text-cyan-400';
            case 'info': return 'text-slate-400';
            case 'success': return 'text-emerald-400';
            case 'warning': return 'text-amber-400';
            case 'think': return 'text-purple-400';
            case 'data': return 'text-blue-400';
            default: return 'text-slate-300';
        }
    };

    return (
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-800 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-slate-600/50 hover:bg-red-500 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-slate-600/50 hover:bg-indigo-400 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-slate-700/50 border border-slate-600/50 hover:bg-emerald-500 transition-colors" />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse"></span>
                        stellar_agent_runtime ~ live
                    </span>
                </div>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={runSimulation}
                    disabled={isRunning}
                    className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full flex items-center gap-2 transition-all shadow-lg ${isRunning
                        ? 'bg-indigo-400/10 text-indigo-400 border border-amber-500/20'
                        : 'bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-indigo-500/25 border border-indigo-400/50'
                        }`}
                >
                    {isRunning ? (
                        <><ArrowPathIcon className="w-3.5 h-3.5 animate-spin" /> RUNNING...</>
                    ) : (
                        <><PlayIcon className="w-3.5 h-3.5" /> RUN AGENT</>
                    )}
                </motion.button>
            </div>

            {/* Terminal Body */}
            <div
                ref={termRef}
                className="h-[300px] overflow-y-auto p-4 font-mono text-xs leading-relaxed"
            >
                {visibleLines.length === 0 && (
                    <div className="text-slate-600 flex items-center gap-2">
                        <span className="text-indigo-500">❯</span>
                        Click "RUN AGENT" to execute the simulation...
                    </div>
                )}
                <AnimatePresence>
                    {visibleLines.map((line, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex gap-3 mb-1.5 ${getLineColor(line.type)} ${line.type === 'think' ? 'opacity-80 italic' : ''}`}
                        >
                            <span className="text-slate-700 select-none">~</span>
                            <span>{line.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isRunning && (
                    <motion.div
                        className="w-2 h-4 bg-indigo-500 ml-4 mt-2"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                )}
            </div>
        </div>
    );
};

// ─── Main Page ─────────────────────────────────────────────────────

const categories = ['All', 'Disaster', 'Agriculture', 'Navigation', 'Infrastructure', 'Environment'];

const AgentWorkflows = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedAgent, setExpandedAgent] = useState(null);

    const filteredAgents = selectedCategory === 'All'
        ? agents
        : agents.filter(a => a.category === selectedCategory);

    const activeCount = agents.filter(a => a.status === 'active').length;
    const totalAlerts = agents.reduce((sum, a) => sum + a.alertsSent, 0);

    return (
        <div className="min-h-screen bg-[#030712] text-slate-200 p-8 pb-20 font-sans">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <CpuChipIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
                                Agentic Workflows
                            </h1>
                            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                <SparklesIcon className="w-4 h-4 text-indigo-400" />
                                Autonomous AI agents • Powered by Openclaw + STELLAR
                            </p>
                        </div>
                    </div>

                    {/* Live Stats */}
                    <div className="flex gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Agents Active</div>
                            <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                                {activeCount}<span className="text-sm font-medium text-slate-500">/{agents.length}</span>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Alerts Dispatched</div>
                            <div className="text-2xl font-bold text-white">{totalAlerts.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Live Agent Terminal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
            >
                <div className="flex items-center gap-3 mb-4 mt-6">
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <CommandLineIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white tracking-tight">
                        Live Agent Terminal
                    </h2>
                    <span className="text-sm text-slate-500 font-medium bg-slate-800/50 px-3 py-1 rounded-full ml-2 border border-slate-700">
                        Watch an agent reason and act autonomously
                    </span>
                </div>
                <AgentTerminal />
            </motion.div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 mb-8 overflow-x-auto pb-2"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`
                            px-5 py-2.5 font-medium text-sm whitespace-nowrap transition-all rounded-full border
                            ${selectedCategory === cat
                                ? 'bg-white text-slate-900 border-transparent shadow-md'
                                : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-800'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent, index) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col"
                    >
                        {/* Agent Header */}
                        <div className={`p-6 border-b border-white/5 bg-gradient-to-br ${agent.gradient} relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm mix-blend-overlay"></div>
                            <div className="relative flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                                        <agent.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white mb-0.5">{agent.name}</h3>
                                        <p className="text-xs font-semibold text-slate-300 tracking-wider uppercase">{agent.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                                    <div className={`w-2 h-2 rounded-full ${agent.status === 'active'
                                        ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                                        : 'bg-white/40'
                                        }`} />
                                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                                        {agent.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                                {agent.description}
                            </p>

                            {/* Schedule & Tools */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-3 py-1 bg-indigo-400/10 border border-amber-500/20 rounded-full text-xs font-medium text-amber-400 flex items-center gap-1.5">
                                    <ClockIcon className="w-3.5 h-3.5" /> {agent.schedule}
                                </span>
                                {agent.tools.map(tool => (
                                    <span key={tool} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-medium text-indigo-400">
                                        {tool}
                                    </span>
                                ))}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-6 mt-auto">
                                <div className="p-3 bg-slate-800/50 rounded-2xl border border-white/5">
                                    <div className="text-lg font-bold text-emerald-400 mb-1">{agent.uptime}</div>
                                    <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">Uptime</div>
                                </div>
                                <div className="p-3 bg-slate-800/50 rounded-2xl border border-white/5">
                                    <div className="text-lg font-bold text-amber-400 mb-1">{agent.alertsSent.toLocaleString()}</div>
                                    <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">Alerts Sent</div>
                                </div>
                                <div className="p-3 bg-slate-800/50 rounded-2xl border border-white/5">
                                    <div className="text-sm font-bold text-white mb-1 mt-1">{agent.lastRun}</div>
                                    <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">Last Run</div>
                                </div>
                            </div>

                            {/* Regions */}
                            <div className="text-xs font-medium text-slate-500 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                                <GlobeAsiaAustraliaIcon className="w-4 h-4 text-slate-400" />
                                <span className="truncate">{agent.regions.join(' • ')}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-slate-900/40 flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold text-white">{agent.pricing}</span>
                                <span className={`ml-3 px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider ${agent.tier === 'ENTERPRISE'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'bg-indigo-400/20 text-amber-400 border border-amber-500/30'
                                    }`}>
                                    {agent.tier}
                                </span>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 font-semibold text-sm rounded-full flex items-center gap-2 transition-all ${agent.status === 'active'
                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {agent.status === 'active' ? (
                                    <><CheckCircleIcon className="w-4 h-4" /> RUNNING</>
                                ) : (
                                    <><PlayIcon className="w-4 h-4" /> DEPLOY</>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Model CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {/* Build Your Own Agent */}
                <div className="col-span-2 p-10 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute -inset-24 bg-indigo-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative z-10">
                        <SparklesIcon className="w-10 h-10 text-indigo-400 mb-6 drop-shadow-md" />
                        <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">Build Custom Agents</h2>
                        <p className="text-slate-300 mb-6 text-base font-medium max-w-xl">
                            Provide your agents with STELLAR's GNSS capabilities. Deploy them on any platform to process satellite telemetry autonomously.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <code className="block bg-black/40 border border-white/10 rounded-xl px-5 py-3 font-mono text-sm text-cyan-400 w-full sm:w-auto shadow-inner">
                                openclaw install stellar-geo-ai
                            </code>
                            <button className="w-full sm:w-auto px-6 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 hover:shadow-lg hover:shadow-white/20 transition-all flex items-center justify-center gap-2">
                                View Documentation <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Revenue Split */}
                <div className="p-8 bg-[#0f172a]/80 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 blur-3xl rounded-full"></div>
                    <h3 className="text-sm font-bold tracking-wider text-indigo-400 uppercase mb-6 bg-indigo-400/10 self-start px-3 py-1 rounded-lg border border-amber-500/20">Revenue Model</h3>
                    <div className="space-y-4 text-base relative z-10">
                        <div className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-slate-400 font-medium">API SaaS</span>
                            <span className="font-bold text-emerald-400">Pay-per-use</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-slate-400 font-medium">Agent Hosting</span>
                            <span className="font-bold text-amber-400">₹28K–₹1.2L/mo</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-slate-400 font-medium">Marketplace Fee</span>
                            <span className="font-bold text-indigo-400">30% split</span>
                        </div>
                        <div className="flex justify-between pt-3">
                            <span className="text-slate-300 font-semibold">Geo-AI TAM</span>
                            <span className="font-bold text-white text-lg drop-shadow-md">$2.1B+</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AgentWorkflows;
