/**
 * Developer SDK & Live API Console
 * Real endpoints + keyboard shortcuts + OpenClaw integration
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CodeBracketIcon,
    CommandLineIcon,
    KeyIcon,
    RocketLaunchIcon,
    BoltIcon,
    CpuChipIcon,
    ServerIcon,
    SparklesIcon,
    PlayIcon,
    ClipboardDocumentIcon,
    CheckIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Header } from '../components';

// Auto-detect API: local Express server or Vercel serverless
const IS_LOCAL = window.location.hostname === 'localhost';
const API_BASE = IS_LOCAL ? 'http://localhost:3000/api/v1' : '/api/v1';
const DEMO_KEY = 'stellar-demo-key-2025';

// ─── Endpoint Definitions ──────────────────────────────────────────

const endpoints = [
    {
        id: 'health',
        method: 'GET',
        path: '/health',
        label: 'Health Check',
        shortcut: 'H',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500',
        auth: false,
        body: null,
        description: 'Check system status and service availability'
    },
    {
        id: 'satellites',
        method: 'GET',
        path: '/satellites',
        label: 'List Satellites',
        shortcut: 'S',
        color: 'text-blue-400',
        bg: 'bg-blue-500',
        auth: true,
        body: null,
        description: 'List all available ISRO satellites with data'
    },
    {
        id: 'forecast',
        method: 'POST',
        path: '/forecast',
        label: 'GNSS Forecast',
        shortcut: 'F',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500',
        auth: true,
        body: { satellite: 'gsat-14', horizon: '6h', steps: 6 },
        description: 'Predict satellite position errors for next N hours'
    },
    {
        id: 'train',
        method: 'POST',
        path: '/train',
        label: 'Train Model',
        shortcut: 'T',
        color: 'text-amber-400',
        bg: 'bg-amber-500',
        auth: true,
        body: { dataset: 'MEO_Train2', epochs: 50, batch_size: 32, learning_rate: 0.001 },
        description: 'Trigger ML training pipeline on satellite data'
    },
    {
        id: 'flood',
        method: 'POST',
        path: '/flood-risk',
        label: 'Flood Risk',
        shortcut: 'R',
        color: 'text-rose-400',
        bg: 'bg-rose-500',
        auth: true,
        body: { latitude: 10.0, longitude: 76.3, region: 'Kerala' },
        description: 'Assess flood risk for a geographic region'
    },
    {
        id: 'data',
        method: 'GET',
        path: '/summary',
        label: 'Data Summary',
        shortcut: 'D',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500',
        auth: true,
        body: null,
        description: 'Statistical summary of all loaded datasets'
    },
    {
        id: 'webhook',
        method: 'POST',
        path: '/webhook',
        label: 'WhatsApp Hook',
        shortcut: 'W',
        color: 'text-green-400',
        bg: 'bg-green-500',
        auth: true,
        body: { from: '+91-9876543210', message: 'train model on MEO data' },
        description: 'Simulate WhatsApp message → agent action'
    }
];

// ─── Component ─────────────────────────────────────────────────────

const DeveloperSDK = () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [latency, setLatency] = useState(null);
    const [history, setHistory] = useState([]);
    const [copied, setCopied] = useState(false);
    const [serverOnline, setServerOnline] = useState(null);
    const responseRef = useRef(null);

    // Check server status
    useEffect(() => {
        fetch(`${API_BASE}/health`)
            .then(r => r.ok ? setServerOnline(true) : setServerOnline(false))
            .catch(() => setServerOnline(false));
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            // Only trigger with Alt key held
            if (!e.altKey) return;
            const key = e.key.toUpperCase();
            const ep = endpoints.find(ep => ep.shortcut === key);
            if (ep) {
                e.preventDefault();
                setSelectedEndpoint(ep);
                executeRequest(ep);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const executeRequest = useCallback(async (ep = selectedEndpoint) => {
        setIsLoading(true);
        setResponse(null);
        setLatency(null);

        const start = performance.now();

        try {
            const options = {
                method: ep.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(ep.auth ? { 'X-API-Key': DEMO_KEY } : {})
                },
                ...(ep.body ? { body: JSON.stringify(ep.body) } : {})
            };

            const res = await fetch(`${API_BASE}${ep.path}`, options);
            const data = await res.json();
            const elapsed = Math.round(performance.now() - start);

            setResponse({ status: res.status, data });
            setLatency(elapsed);
            setHistory(prev => [
                { endpoint: ep, status: res.status, latency: elapsed, time: new Date().toLocaleTimeString() },
                ...prev.slice(0, 19)
            ]);
        } catch (err) {
            setResponse({ status: 0, data: { error: 'Connection failed', message: 'Start the API server: node server/index.js' } });
            setLatency(null);
        }

        setIsLoading(false);
        setTimeout(() => responseRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, [selectedEndpoint]);

    const copyResponse = () => {
        if (response) {
            navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getMethodBadge = (method) => {
        const colors = { GET: 'text-emerald-400 bg-emerald-500/10', POST: 'text-amber-400 bg-amber-500/10' };
        return (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${colors[method] || 'text-slate-400 bg-slate-500/10'}`}>
                {method}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#020617]">
            <Header title="Developer SDK" subtitle="Live API Console & OpenClaw Integration" />

            <div className="p-6 max-w-[1400px] mx-auto">
                {/* Server Status + Shortcut Hint */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${serverOnline ? 'bg-emerald-400 animate-pulse' : serverOnline === false ? 'bg-rose-400' : 'bg-slate-600'}`} />
                            <span className="text-[11px] font-medium text-slate-400">
                                API Server: {serverOnline ? 'Online' : serverOnline === false ? 'Offline' : 'Checking...'}
                            </span>
                        </div>
                        <span className="text-[11px] text-slate-600">
                            Base: <code className="text-indigo-400/70">{API_BASE}</code>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <kbd className="px-1.5 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-[10px] font-mono">Alt</kbd>
                        <span>+</span>
                        <kbd className="px-1.5 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-[10px] font-mono">Key</kbd>
                        <span className="ml-1">to fire endpoints</span>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left: Endpoint List */}
                    <div className="col-span-3 space-y-2">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
                            Endpoints
                        </div>
                        {endpoints.map(ep => (
                            <button
                                key={ep.id}
                                onClick={() => setSelectedEndpoint(ep)}
                                className={`w-full text-left p-3 rounded-xl border transition-all group ${selectedEndpoint.id === ep.id
                                    ? 'bg-white/[0.04] border-indigo-500/20'
                                    : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        {getMethodBadge(ep.method)}
                                        <span className="text-[12px] font-semibold text-white">{ep.label}</span>
                                    </div>
                                    <kbd className="px-1.5 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Alt+{ep.shortcut}
                                    </kbd>
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">{ep.path}</div>
                            </button>
                        ))}

                        {/* Request History */}
                        {history.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-white/[0.04]">
                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
                                    History
                                </div>
                                <div className="space-y-1 max-h-48 overflow-y-auto">
                                    {history.map((h, i) => (
                                        <div key={i} className="flex items-center justify-between px-2 py-1.5 text-[10px] rounded-lg hover:bg-white/[0.02]">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${h.status < 300 ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                                <span className="text-slate-400">{h.endpoint.label}</span>
                                            </div>
                                            <span className="text-slate-600 font-mono">{h.latency}ms</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Center: Request/Response */}
                    <div className="col-span-6 space-y-4">
                        {/* Request Panel */}
                        <div className="bg-[#0f172a]/80 border border-white/[0.06] rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
                                <div className="flex items-center gap-3">
                                    <CommandLineIcon className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-semibold text-white">Request</span>
                                </div>
                                <button
                                    onClick={() => executeRequest()}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/20 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                                >
                                    {isLoading ? <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" /> : <PlayIcon className="w-3.5 h-3.5" />}
                                    {isLoading ? 'Sending...' : 'Execute'}
                                </button>
                            </div>

                            <div className="p-4 space-y-3">
                                {/* URL Bar */}
                                <div className="flex items-center gap-2 bg-[#020617] border border-white/[0.04] rounded-lg p-2.5">
                                    {getMethodBadge(selectedEndpoint.method)}
                                    <code className="text-[12px] text-slate-300 font-mono flex-1">
                                        {API_BASE}{selectedEndpoint.path}
                                    </code>
                                    {selectedEndpoint.auth && (
                                        <span className="flex items-center gap-1 text-[9px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                                            <KeyIcon className="w-3 h-3" /> Auth
                                        </span>
                                    )}
                                </div>

                                {/* Headers */}
                                <div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">Headers</div>
                                    <div className="bg-[#020617] border border-white/[0.04] rounded-lg p-3 font-mono text-[11px] space-y-1">
                                        <div><span className="text-indigo-400">Content-Type</span>: <span className="text-slate-300">application/json</span></div>
                                        {selectedEndpoint.auth && (
                                            <div><span className="text-amber-400">X-API-Key</span>: <span className="text-slate-400">{DEMO_KEY}</span></div>
                                        )}
                                    </div>
                                </div>

                                {/* Body */}
                                {selectedEndpoint.body && (
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">Body</div>
                                        <pre className="bg-[#020617] border border-white/[0.04] rounded-lg p-3 font-mono text-[11px] text-slate-300 overflow-x-auto">
                                            {JSON.stringify(selectedEndpoint.body, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Response Panel */}
                        <div ref={responseRef} className="bg-[#0f172a]/80 border border-white/[0.06] rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
                                <div className="flex items-center gap-3">
                                    <ServerIcon className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm font-semibold text-white">Response</span>
                                    {response && (
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${response.status < 300 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                                            }`}>
                                            {response.status}
                                        </span>
                                    )}
                                    {latency !== null && (
                                        <span className="text-[10px] text-slate-500 font-mono">{latency}ms</span>
                                    )}
                                </div>
                                {response && (
                                    <button onClick={copyResponse} className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors">
                                        {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <ClipboardDocumentIcon className="w-3.5 h-3.5" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                )}
                            </div>

                            <div className="p-4">
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <ArrowPathIcon className="w-6 h-6 text-indigo-400 animate-spin" />
                                    </div>
                                ) : response ? (
                                    <pre className="bg-[#020617] border border-white/[0.04] rounded-lg p-4 font-mono text-[11px] text-slate-300 overflow-auto max-h-[400px] leading-relaxed">
                                        {JSON.stringify(response.data, null, 2)}
                                    </pre>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-slate-600">
                                        <BoltIcon className="w-8 h-8 mb-3" />
                                        <span className="text-sm font-medium">Hit Execute or press <kbd className="px-1.5 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded text-[10px] font-mono">Alt+{selectedEndpoint.shortcut}</kbd></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Code */}
                    <div className="col-span-3 space-y-4">
                        {/* Endpoint Info */}
                        <div className="bg-[#0f172a]/60 border border-white/[0.06] rounded-2xl p-5">
                            <div className={`w-10 h-10 ${selectedEndpoint.bg}/10 rounded-xl flex items-center justify-center mb-3`}>
                                <BoltIcon className={`w-5 h-5 ${selectedEndpoint.color}`} />
                            </div>
                            <h3 className="text-sm font-semibold text-white mb-1">{selectedEndpoint.label}</h3>
                            <p className="text-[12px] text-slate-400 leading-relaxed">{selectedEndpoint.description}</p>
                        </div>

                        {/* cURL Example */}
                        <div className="bg-[#020617] border border-white/[0.06] rounded-2xl p-4 overflow-hidden">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] text-slate-600 ml-2 font-mono">cURL</span>
                            </div>
                            <pre className="text-[10px] font-mono text-slate-400 leading-relaxed whitespace-pre-wrap break-all">
                                {`curl ${selectedEndpoint.method === 'GET' ? '' : `-X ${selectedEndpoint.method} `}\\
  ${API_BASE}${selectedEndpoint.path} \\${selectedEndpoint.auth ? `\n  -H "X-API-Key: ${DEMO_KEY}" \\` : ''
                                    }${selectedEndpoint.body ? `\n  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(selectedEndpoint.body)}'` : ''
                                    }`}
                            </pre>
                        </div>

                        {/* OpenClaw Example */}
                        <div className="bg-[#020617] border border-white/[0.06] rounded-2xl p-4 overflow-hidden">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] text-slate-600 ml-2 font-mono">agent.yaml</span>
                            </div>
                            <pre className="text-[10px] font-mono leading-relaxed text-slate-400">
                                {`name: "${selectedEndpoint.label} Agent"
skills:
  - stellar-geo-ai
triggers:
  - whatsapp: "${selectedEndpoint.label.toLowerCase()}"
  - keybind: "Alt+${selectedEndpoint.shortcut}"
instructions: |
  Call ${API_BASE}${selectedEndpoint.path}
  Parse response and format for user`}
                            </pre>
                        </div>

                        {/* Keyboard Shortcuts Quick Ref */}
                        <div className="bg-[#0f172a]/60 border border-white/[0.06] rounded-2xl p-5">
                            <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Keyboard Shortcuts
                            </h3>
                            <div className="space-y-2">
                                {endpoints.map(ep => (
                                    <div key={ep.id} className="flex items-center justify-between">
                                        <span className="text-[11px] text-slate-400">{ep.label}</span>
                                        <kbd className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded text-[9px] font-mono text-slate-500">
                                            Alt+{ep.shortcut}
                                        </kbd>
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

export default DeveloperSDK;
