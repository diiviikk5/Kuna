/**
 * WhatsApp Bot Demo — Interactive showcase with ML pipeline trigger
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PaperAirplaneIcon,
    PhotoIcon,
    MapPinIcon,
    CheckIcon,
    SparklesIcon,
    SunIcon,
    CloudIcon,
    CpuChipIcon,
    ChartBarIcon,
    BoltIcon
} from '@heroicons/react/24/outline';
import { Header } from '../components';

// ─── Training Pipeline Simulation ──────────────────────────────────

const simulateTrainingPipeline = (addBotMessage, setTrainingState) => {
    const steps = [
        { delay: 800, text: '🔄 Initializing STELLAR ML Pipeline...\n\n📂 Loading MEO_Train2.csv (244 samples)\n🛰️ Satellite: GSAT-14 (MEO orbit)\n⚙️ Config: 50 epochs, batch=32, lr=0.001', state: 'loading' },
        { delay: 2500, text: '✅ **Data Loaded & Validated**\n\n📊 Features: x_error, y_error, z_error, clock\n📈 Duration: 6.2 days of telemetry\n🔢 Train: 195 samples | Val: 49 samples\n\n🚀 Starting model training...', state: 'training' },
        { delay: 3000, text: '📡 **Training Progress**\n\n⏳ Epoch 5/50 — Loss: 1.116\n⏳ Epoch 10/50 — Loss: 1.109\n⏳ Epoch 15/50 — Loss: 0.982\n⏳ Epoch 25/50 — Loss: 0.845\n⏳ Epoch 40/50 — Loss: 0.723\n✅ Epoch 50/50 — Loss: 0.691\n\n⚡ Early stopping: val_loss converged', state: 'training' },
        { delay: 2000, text: '🎯 **Model Evaluation Complete**\n\n📉 Best Train Loss: 0.691\n📉 Best Val Loss: 0.714\n🏆 RMSE (Radial): 0.12m\n🏆 RMSE (Along): 0.09m\n🏆 RMSE (Cross): 0.15m\n⏱️ Clock Bias: ±2.1ns\n\n✅ Meets ISRO accuracy benchmarks!', state: 'evaluating' },
        { delay: 1500, text: '🚀 **Model Deployed!**\n\n🔑 Model ID: `stellar-gnss-v2-meo`\n📦 Size: 2.4MB (ONNX-optimized)\n🌐 API Endpoint: `/api/v1/predict`\n⚡ Inference: <50ms per prediction\n\n💡 Run `stellar_forecast --satellite GSAT-14` to use it.\n\nType "predict" to test a live forecast!', state: 'complete' }
    ];

    let cumulative = 0;
    steps.forEach((step) => {
        cumulative += step.delay;
        setTimeout(() => {
            setTrainingState(step.state);
            addBotMessage(step.text);
        }, cumulative);
    });

    // Reset state after pipeline completes
    setTimeout(() => setTrainingState('idle'), cumulative + 1000);
};

// ─── Bot Responses ─────────────────────────────────────────────────

const botResponses = {
    'hi': {
        text: 'नमस्ते! 🙏 I\'m STELLAR Bot.\n\nI can help you with:\n📡 "gps quality" — Check satellite accuracy\n🌊 "flood risk" — Get flood alerts\n🌾 "crop health" — Analyze farm photos\n🤖 **"train model"** — Run ML pipeline\n🔮 "predict" — Live GNSS forecast',
        delay: 800
    },
    'flood': {
        text: '🌊 **Flood Risk Report — Your Area**\n\n⚠️ Risk Level: MODERATE\n📅 Next 48 hours\n💧 Expected rainfall: 45mm\n🛰️ Source: INSAT-3D + MOSDAC\n\n✅ No immediate evacuation needed\n📲 You\'ll get alerts if risk increases',
        delay: 1200
    },
    'crop': {
        text: '🌾 **Crop Analysis Complete**\n\n✅ Crop Type: Wheat\n💚 Health Score: 87%\n🐛 Disease: None detected\n💧 Water Stress: Low\n📈 Estimated Yield: 4.2 tonnes/ha\n\n💡 Recommendation: Next irrigation in 3 days\n🛰️ Source: Bhuvan NDVI imagery',
        delay: 1500
    },
    'gps': {
        text: '📡 **GPS Quality — Your Location**\n\nSatellites visible:\n🛰️ GPS: 8/12 (Good)\n🛰️ NavIC: 5/7 (Excellent)\n🛰️ Galileo: 6/8 (Good)\n\n📍 Position Accuracy: ±2.3m\n⏱️ Clock Sync: ±1.8ns\n\n💡 GNSS error model active for correction',
        delay: 1000
    },
    'weather': {
        text: '🌤️ **Weather Forecast**\n\n📍 Punjab, India\n🌡️ 28°C → 32°C today\n💨 Wind: 12 km/h NW\n💧 Humidity: 65%\n🌧️ Rain chance: 20% (evening)\n🛰️ Source: INSAT-3D satellite',
        delay: 1000
    },
    'predict': {
        text: '🔮 **Live GNSS Forecast — Next 6 Hours**\n\n🛰️ Satellite: GSAT-14 (MEO)\n📅 2025-09-09 12:00 → 18:00 UTC\n\nPredicted errors:\n  ↕️ Radial:  +0.082m ± 0.012m\n  ↔️ Along:   −0.041m ± 0.009m\n  ⊥  Cross:   +0.119m ± 0.015m\n  ⏱️ Clock:   −0.009ns ± 0.002ns\n\n🎯 Confidence: 94.2%\n📉 Model: stellar-gnss-v2-meo\n\n✅ Within ISRO operational bounds',
        delay: 1200
    }
};

const WhatsAppDemo = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'नमस्ते! 🙏 Welcome to STELLAR Bot.\n\nI can help you with:\n• 📡 GPS Quality Check\n• 🌊 Flood Risk Alerts\n• 🌾 Crop Health Analysis\n• 🤖 **Train ML Model** ← NEW!\n• 🔮 Live GNSS Forecast\n\nTry: "train model" to see the ML pipeline!', time: '12:01' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [trainingState, setTrainingState] = useState('idle'); // idle, loading, training, evaluating, complete
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addBotMessage = (text) => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            type: 'bot',
            text,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        }]);
    };

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const lowerText = text.toLowerCase();

        // Check for training command
        if (lowerText.includes('train')) {
            setTimeout(() => {
                setIsTyping(false);
                addBotMessage('🤖 **Agentic ML Pipeline Triggered**\n\nSkill: `stellar-geo-ai`\nCommand: `stellar_train --data MEO_Train2`\nAgent: GNSS Guardian\n\nStand by...');
                simulateTrainingPipeline(addBotMessage, setTrainingState);
            }, 1000);
            return;
        }

        // Find matching response
        let response = botResponses.hi;
        if (lowerText.includes('flood')) response = botResponses.flood;
        else if (lowerText.includes('crop') || lowerText.includes('farm')) response = botResponses.crop;
        else if (lowerText.includes('gps') || lowerText.includes('satellite')) response = botResponses.gps;
        else if (lowerText.includes('weather') || lowerText.includes('rain')) response = botResponses.weather;
        else if (lowerText.includes('predict') || lowerText.includes('forecast')) response = botResponses.predict;

        setTimeout(() => {
            setIsTyping(false);
            addBotMessage(response.text);
        }, response.delay);
    };

    const quickReplies = ['🤖 Train Model', '🔮 Predict', '🌊 Flood Risk', '📡 GPS Quality', '🌤️ Weather'];

    const getTrainingIndicator = () => {
        if (trainingState === 'idle') return null;
        const states = {
            loading: { label: 'Loading Data', color: 'text-blue-400', bg: 'bg-blue-400' },
            training: { label: 'Training Model', color: 'text-amber-400', bg: 'bg-amber-400' },
            evaluating: { label: 'Evaluating', color: 'text-purple-400', bg: 'bg-purple-400' },
            complete: { label: 'Complete', color: 'text-emerald-400', bg: 'bg-emerald-400' }
        };
        const s = states[trainingState];
        return (
            <div className="flex items-center gap-2 px-3 py-1">
                <div className={`w-2 h-2 rounded-full ${s.bg} animate-pulse`} />
                <span className={`text-[10px] font-semibold ${s.color}`}>{s.label}</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#020617]">
            <Header
                title="WhatsApp Bot"
                subtitle="Agentic ML Pipeline via Chat"
            />

            <div className="p-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Phone Mockup */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="mx-auto w-[360px]">
                        <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-[40px] p-3 border border-white/[0.08] shadow-2xl shadow-indigo-500/5 relative">
                            {/* Phone Header */}
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-[28px] p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <SparklesIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">STELLAR Bot</div>
                                        <div className="text-xs text-white/70">{isTyping ? 'typing...' : trainingState !== 'idle' ? 'processing...' : 'online'}</div>
                                    </div>
                                </div>
                                {getTrainingIndicator()}
                            </div>

                            {/* Chat Area */}
                            <div className="bg-[#0b141a] h-[440px] overflow-y-auto p-3 space-y-2 scroll-smooth">
                                <AnimatePresence>
                                    {messages.map((msg) => (
                                        <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] p-2.5 px-3 text-[13px] leading-relaxed ${msg.type === 'user'
                                                    ? 'bg-emerald-700 rounded-2xl rounded-br-sm'
                                                    : 'bg-slate-700/80 rounded-2xl rounded-bl-sm'
                                                }`}>
                                                <div className="whitespace-pre-line">{msg.text}</div>
                                                <div className="text-[10px] text-right mt-1 opacity-50 flex items-center justify-end gap-1">
                                                    {msg.time}
                                                    {msg.type === 'user' && <CheckIcon className="w-3 h-3" />}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {isTyping && (
                                    <div className="flex gap-1.5 p-3 bg-slate-700/80 rounded-2xl rounded-bl-sm w-16">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Replies */}
                            <div className="bg-[#0b141a] px-2 pb-2 flex gap-2 overflow-x-auto">
                                {quickReplies.map(reply => (
                                    <button key={reply} onClick={() => sendMessage(reply)}
                                        className="px-3 py-1.5 bg-slate-700/60 border border-white/[0.06] rounded-full text-[11px] font-medium whitespace-nowrap hover:bg-slate-600 transition-all">
                                        {reply}
                                    </button>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="bg-[#1f2c34] rounded-b-[28px] p-2.5 flex gap-2">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-slate-700/60 rounded-full px-4 py-2.5 text-sm outline-none border border-white/[0.04] focus:border-emerald-500/30 transition-all" />
                                <button onClick={() => sendMessage(input)}
                                    className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all active:scale-95">
                                    <PaperAirplaneIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side — Feature Info */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        {/* Headline */}
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">Agentic ML via Chat</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Trigger STELLAR's full ML pipeline from WhatsApp or OpenClaw. Type <code className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs">"train model"</code> to see it in action.
                            </p>
                        </div>

                        {/* Pipeline Steps */}
                        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                <BoltIcon className="w-4 h-4 text-indigo-400" />
                                Command Pipeline
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { step: '1', label: 'User sends "train model" via WhatsApp', icon: '💬' },
                                    { step: '2', label: 'OpenClaw agent invokes stellar_train skill', icon: '🤖' },
                                    { step: '3', label: 'Loads pre-bundled MEO satellite data (CSV)', icon: '📂' },
                                    { step: '4', label: 'Configures & trains LSTM neural network', icon: '🧠' },
                                    { step: '5', label: 'Evaluates against ISRO benchmarks', icon: '📊' },
                                    { step: '6', label: 'Deploys model & returns predictions', icon: '🚀' },
                                ].map((item) => (
                                    <div key={item.step} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-[13px] text-slate-300">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: CpuChipIcon, title: 'Zero-Code ML', desc: 'Train models from a chat message', color: 'text-indigo-400' },
                                { icon: ChartBarIcon, title: 'Real Satellite Data', desc: 'Pre-loaded ISRO GNSS telemetry', color: 'text-emerald-400' },
                                { icon: SparklesIcon, title: 'OpenClaw Powered', desc: 'Any agent can invoke this skill', color: 'text-amber-400' },
                                { icon: MapPinIcon, title: '500M+ Reach', desc: 'WhatsApp covers rural India', color: 'text-cyan-400' }
                            ].map((f) => (
                                <div key={f.title} className="p-4 bg-[#0f172a]/60 border border-white/[0.06] rounded-xl">
                                    <f.icon className={`w-5 h-5 ${f.color} mb-2`} />
                                    <div className="text-xs font-semibold text-white">{f.title}</div>
                                    <div className="text-[11px] text-slate-500 mt-0.5">{f.desc}</div>
                                </div>
                            ))}
                        </div>

                        {/* OpenClaw Code Block */}
                        <div className="bg-[#020617] border border-white/[0.06] rounded-2xl p-5 overflow-hidden">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] text-slate-600 ml-2 font-mono">agent.yaml</span>
                            </div>
                            <pre className="text-[11px] font-mono leading-relaxed text-slate-400">
                                {`name: "GNSS Model Trainer"
skills:
  - stellar-geo-ai
triggers:
  - whatsapp: "train model"
  - schedule: "weekly"
instructions: |
  1. stellar_train --data MEO_Train2
  2. stellar_evaluate --benchmark isro
  3. stellar_deploy --endpoint /predict
  4. Reply with evaluation metrics`}
                            </pre>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppDemo;
