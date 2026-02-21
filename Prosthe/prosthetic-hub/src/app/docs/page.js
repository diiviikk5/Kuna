"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Book, Terminal, Cpu, MessageSquare, Zap, Shield, Code2,
    ChevronRight, Copy, Check, ArrowUpRight, Search, Menu, X,
    Layers, Settings, Globe, Database, Heart
} from "lucide-react";

/* ── Sidebar sections ── */
const SECTIONS = [
    {
        id: "getting-started", label: "Getting Started", icon: Book, children: [
            { id: "overview", label: "Overview" },
            { id: "requirements", label: "Requirements" },
            { id: "quickstart", label: "Quick Start" },
        ]
    },
    {
        id: "installation", label: "Installation", icon: Terminal, children: [
            { id: "openclaw-setup", label: "OpenClaw Setup" },
            { id: "whatsapp-bridge", label: "WhatsApp Bridge" },
            { id: "hub-dashboard", label: "Hub Dashboard" },
        ]
    },
    {
        id: "architecture", label: "Architecture", icon: Cpu, children: [
            { id: "system-design", label: "System Design" },
            { id: "agent-swarm", label: "Agent Swarm" },
            { id: "skill-system", label: "Skill System" },
        ]
    },
    {
        id: "integrations-doc", label: "Integrations", icon: Layers, children: [
            { id: "swasthya-gold", label: "Swasthya-Gold" },
            { id: "custom-apps", label: "Custom Apps" },
        ]
    },
    {
        id: "api-reference", label: "API Reference", icon: Code2, children: [
            { id: "rest-api", label: "REST API" },
            { id: "websocket", label: "WebSocket" },
        ]
    },
    {
        id: "configuration", label: "Configuration", icon: Settings, children: [
            { id: "env-vars", label: "Environment Vars" },
            { id: "agent-config", label: "Agent Config" },
        ]
    },
    {
        id: "troubleshooting", label: "Troubleshooting", icon: Shield, children: [
            { id: "common-issues", label: "Common Issues" },
            { id: "faq", label: "FAQ" },
        ]
    },
];

/* ── Code block component ── */
function CodeBlock({ code, lang = "bash", title }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="my-4 rounded-lg border border-white/[0.06] overflow-hidden bg-[rgba(5,5,8,0.8)]">
            {title && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                    <span className="text-xs font-['JetBrains_Mono'] text-white/30">{title}</span>
                    <button onClick={copy} className="text-white/25 hover:text-white/50 transition-colors" aria-label="Copy">
                        {copied ? <Check className="w-3.5 h-3.5 text-[#c0ff4d]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm font-['JetBrains_Mono'] text-white/70 leading-relaxed whitespace-pre">
                <code>{code}</code>
            </pre>
        </div>
    );
}

/* ── Callout component ── */
function Callout({ type = "info", children }) {
    const styles = {
        info: "border-blue-500/20 bg-blue-500/[0.04]",
        warning: "border-amber-500/20 bg-amber-500/[0.04]",
        success: "border-[#c0ff4d]/20 bg-[#c0ff4d]/[0.04]",
    };
    const labels = { info: "ℹ️ Note", warning: "⚠️ Warning", success: "✅ Tip" };
    return (
        <div className={`my-4 rounded-lg border p-4 ${styles[type]}`}>
            <p className="text-xs font-semibold text-white/50 mb-1">{labels[type]}</p>
            <div className="text-sm text-white/40 leading-relaxed">{children}</div>
        </div>
    );
}

/* ── Step component ── */
function Step({ num, title, children }) {
    return (
        <div className="flex gap-4 mb-6">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                <span className="text-xs font-['JetBrains_Mono'] text-white/40">{num}</span>
            </div>
            <div className="flex-1 pt-0.5">
                <h4 className="text-sm font-medium text-white mb-2">{title}</h4>
                <div className="text-sm text-white/40 leading-relaxed">{children}</div>
            </div>
        </div>
    );
}

/* ── Main Docs Page ── */
export default function DocsPage() {
    const [active, setActive] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Close sidebar on navigation (mobile)
    const navigate = (id) => { setActive(id); setSidebarOpen(false); };

    // Filter sections by search
    const filtered = SECTIONS.map(s => ({
        ...s,
        children: s.children.filter(c => c.label.toLowerCase().includes(search.toLowerCase()))
    })).filter(s => s.children.length > 0);

    return (
        <div className="content-layer pt-16 min-h-screen bg-[#050508]">
            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-20 left-4 z-40 p-2 rounded-lg bg-[rgba(5,5,8,0.8)] border border-white/[0.08] text-white/50"
                aria-label="Toggle docs sidebar"
            >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <div className="flex max-w-7xl mx-auto">
                {/* ── Sidebar ── */}
                <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 border-r border-white/[0.06] bg-[rgba(5,5,8,0.95)] lg:bg-transparent overflow-y-auto z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                    <div className="p-5">
                        {/* Doc title */}
                        <div className="flex items-center gap-2 mb-6">
                            <Book className="w-4 h-4 text-white/30" />
                            <span className="text-sm font-medium text-white">Documentation</span>
                            <span className="ml-auto text-[10px] font-['JetBrains_Mono'] text-white/20 px-1.5 py-0.5 rounded border border-white/[0.06]">v1.0</span>
                        </div>

                        {/* Search */}
                        <div className="relative mb-5">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                            <input
                                type="text"
                                placeholder="Search docs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs bg-white/[0.03] border border-white/[0.06] rounded-lg text-white/60 placeholder-white/20 outline-none focus:border-white/[0.12] transition-colors"
                            />
                        </div>

                        {/* Nav sections */}
                        <nav className="space-y-5">
                            {filtered.map((section) => (
                                <div key={section.id}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <section.icon className="w-3.5 h-3.5 text-white/40" />
                                        <span className="text-xs font-medium text-white/60 uppercase tracking-wider">{section.label}</span>
                                    </div>
                                    <div className="space-y-0.5 ml-5">
                                        {section.children.map((child) => (
                                            <button
                                                key={child.id}
                                                onClick={() => navigate(child.id)}
                                                className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${active === child.id ? "text-white bg-white/[0.08]" : "text-white/55 hover:text-white/80 hover:bg-white/[0.04]"}`}
                                            >
                                                {child.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* ── Main Content ── */}
                <main className="flex-1 min-w-0 px-6 lg:px-12 py-10 lg:py-12">
                    <div className="max-w-3xl">

                        {/* OVERVIEW */}
                        {active === "overview" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Getting Started</p>
                                <h1 className="text-3xl md:text-4xl font-light text-white mb-4">What is Prosthetic?</h1>
                                <p className="text-base text-white/45 leading-relaxed mb-6">
                                    Prosthetic is a <strong className="text-white/70">local-first AI orchestration system</strong> that bridges the gap between you and autonomous AI agents. It runs entirely on your machine via <strong className="text-white/70">OpenClaw</strong>, communicates through WhatsApp, and executes real-world tasks — scheduling, invoicing, health tracking, code debugging — while you sleep.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-xl overflow-hidden mb-8">
                                    {[
                                        { icon: Shield, title: "100% Local", desc: "No cloud. No data leaves your machine." },
                                        { icon: MessageSquare, title: "WhatsApp Native", desc: "Voice notes, Hinglish, messy text." },
                                        { icon: Zap, title: "Autonomous", desc: "Agents think + execute without prompting." },
                                    ].map((f) => (
                                        <div key={f.title} className="bg-[rgba(5,5,8,0.5)] p-5">
                                            <f.icon className="w-4 h-4 text-white/20 mb-3" />
                                            <h3 className="text-sm font-medium text-white mb-1">{f.title}</h3>
                                            <p className="text-xs text-white/30">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <h2 className="text-xl font-medium text-white mb-3">How it works</h2>
                                <p className="text-sm text-white/40 leading-relaxed mb-4">
                                    The system has three layers that work together:
                                </p>
                                <div className="space-y-3 mb-6">
                                    {[
                                        ["WhatsApp Bridge", "Connects your WhatsApp via Baileys. You message the AI, it reads voice/text."],
                                        ["OpenClaw Daemon", "Local runtime that processes messages, routes to the right agent/skill, and executes."],
                                        ["Prosthetic Hub", "This Next.js dashboard — monitors sessions, agents, and connected apps in real time."],
                                    ].map(([t, d]) => (
                                        <div key={t} className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                            <ChevronRight className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className="text-sm font-medium text-white">{t}</span>
                                                <p className="text-xs text-white/35 mt-0.5">{d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        )}

                        {/* REQUIREMENTS */}
                        {active === "requirements" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Getting Started</p>
                                <h1 className="text-3xl font-light text-white mb-4">Requirements</h1>
                                <p className="text-sm text-white/40 mb-6">Before setting up Prosthetic, ensure your system meets these requirements:</p>
                                <h3 className="text-base font-medium text-white mb-3">System Requirements</h3>
                                <div className="rounded-lg border border-white/[0.06] overflow-hidden mb-6">
                                    <table className="w-full text-sm">
                                        <thead><tr className="bg-white/[0.03]">
                                            <th className="text-left px-4 py-2 text-xs font-medium text-white/40 border-b border-white/[0.06]">Component</th>
                                            <th className="text-left px-4 py-2 text-xs font-medium text-white/40 border-b border-white/[0.06]">Minimum</th>
                                            <th className="text-left px-4 py-2 text-xs font-medium text-white/40 border-b border-white/[0.06]">Recommended</th>
                                        </tr></thead>
                                        <tbody className="text-white/50">
                                            {[
                                                ["OS", "Windows 10 / macOS 12 / Ubuntu 20.04", "Windows 11 / macOS 14 / Ubuntu 22.04"],
                                                ["RAM", "8 GB", "16 GB+"],
                                                ["Storage", "2 GB free", "10 GB+ SSD"],
                                                ["Node.js", "v18.0+", "v20 LTS"],
                                                ["Python", "3.10+", "3.12+"],
                                            ].map(([c, min, rec]) => (
                                                <tr key={c} className="border-b border-white/[0.04]">
                                                    <td className="px-4 py-2.5 font-medium text-white/60">{c}</td>
                                                    <td className="px-4 py-2.5">{min}</td>
                                                    <td className="px-4 py-2.5">{rec}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <h3 className="text-base font-medium text-white mb-3">Required Services</h3>
                                <ul className="space-y-2 mb-6">
                                    {[
                                        "WhatsApp account (for the AI bridge)",
                                        "Git (for cloning repositories)",
                                        "npm or yarn (package management)",
                                        "Python pip (for OpenClaw dependencies)",
                                    ].map(s => (
                                        <li key={s} className="flex items-center gap-2 text-sm text-white/40">
                                            <Check className="w-3.5 h-3.5 text-[#c0ff4d]/50 flex-shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                                <Callout type="info">GPU acceleration is optional but recommended for running local LLMs. Prosthetic works with cloud API keys (OpenAI, Anthropic) as well.</Callout>
                            </article>
                        )}

                        {/* QUICK START */}
                        {active === "quickstart" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Getting Started</p>
                                <h1 className="text-3xl font-light text-white mb-4">Quick Start</h1>
                                <p className="text-sm text-white/40 mb-8">Get Prosthetic running in under 5 minutes.</p>
                                <Step num="1" title="Clone and install OpenClaw">
                                    <CodeBlock title="Terminal" code={`git clone https://github.com/prosthetic-ai/openclaw.git
cd openclaw
pip install -r requirements.txt`} />
                                </Step>
                                <Step num="2" title="Configure your environment">
                                    <p className="mb-2">Copy the example environment file and add your API keys:</p>
                                    <CodeBlock title=".env" lang="env" code={`# LLM Provider (choose one)
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...

# WhatsApp Bridge
WHATSAPP_ENABLED=true
WHATSAPP_SESSION_NAME=prosthetic-main

# Server
OPENCLAW_PORT=18789
OPENCLAW_HOST=127.0.0.1`} />
                                </Step>
                                <Step num="3" title="Start the OpenClaw daemon">
                                    <CodeBlock title="Terminal" code={`python main.py
# or use the daemon mode:
python main.py --daemon`} />
                                    <Callout type="success">You should see <code className="font-['JetBrains_Mono'] text-white/50 text-xs">OpenClaw running on http://127.0.0.1:18789</code> in the terminal.</Callout>
                                </Step>
                                <Step num="4" title="Launch the Prosthetic Hub">
                                    <CodeBlock title="Terminal" code={`cd prosthetic-hub
npm install
npm run dev`} />
                                    <p>Open <code className="font-['JetBrains_Mono'] text-white/50 text-xs">http://localhost:3000</code> — the dashboard should show the OpenClaw gateway as connected.</p>
                                </Step>
                                <Step num="5" title="Link WhatsApp">
                                    <p>Scan the QR code shown in the OpenClaw terminal with your WhatsApp. Send a test message: <code className="font-['JetBrains_Mono'] text-white/50 text-xs">hey prosthetic, what can you do?</code></p>
                                </Step>
                            </article>
                        )}

                        {/* OPENCLAW SETUP */}
                        {active === "openclaw-setup" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Installation</p>
                                <h1 className="text-3xl font-light text-white mb-4">OpenClaw Setup</h1>
                                <p className="text-sm text-white/40 mb-6">OpenClaw is the local AI runtime — the brain of Prosthetic. It processes messages, manages agents, and executes skills.</p>
                                <h2 className="text-lg font-medium text-white mb-3">Directory Structure</h2>
                                <CodeBlock title="openclaw/" code={`openclaw/
├── main.py              # Entry point
├── config.yaml          # Agent configuration
├── requirements.txt     # Python dependencies
├── agents/
│   ├── main.py          # Primary orchestrator agent
│   ├── health.py        # Swasthya-Gold agent
│   └── dev.py           # Developer assistant agent
├── skills/
│   ├── browser.py       # Browser automation
│   ├── calendar.py      # Calendar operations
│   ├── invoice.py       # Invoice drafting
│   └── code_runner.py   # Code execution sandbox
├── bridge/
│   └── whatsapp.js      # Baileys WhatsApp bridge
└── data/
    └── sessions/        # Persisted session data`} />
                                <h2 className="text-lg font-medium text-white mt-8 mb-3">Running Modes</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                    {[
                                        { title: "Interactive", cmd: "python main.py", desc: "Runs with live terminal output. Best for development." },
                                        { title: "Daemon", cmd: "python main.py --daemon", desc: "Background process. Auto-restarts on crash. Best for 24/7." },
                                    ].map(m => (
                                        <div key={m.title} className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                            <h4 className="text-sm font-medium text-white mb-1">{m.title}</h4>
                                            <p className="text-xs text-white/30 mb-2">{m.desc}</p>
                                            <code className="text-xs font-['JetBrains_Mono'] text-[#c0ff4d]/50">{m.cmd}</code>
                                        </div>
                                    ))}
                                </div>
                                <Callout type="warning">OpenClaw must be running for the Hub dashboard to connect. The gateway runs on <code className="font-['JetBrains_Mono'] text-xs">http://127.0.0.1:18789</code> by default.</Callout>
                            </article>
                        )}

                        {/* WHATSAPP BRIDGE */}
                        {active === "whatsapp-bridge" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Installation</p>
                                <h1 className="text-3xl font-light text-white mb-4">WhatsApp Bridge</h1>
                                <p className="text-sm text-white/40 mb-6">The WhatsApp bridge uses <strong className="text-white/60">Baileys</strong> (a lightweight WhatsApp Web API) to connect your account to OpenClaw.</p>
                                <Step num="1" title="Install bridge dependencies">
                                    <CodeBlock title="Terminal" code={`cd openclaw/bridge
npm install`} />
                                </Step>
                                <Step num="2" title="Start the bridge">
                                    <CodeBlock title="Terminal" code={`node whatsapp.js`} />
                                    <p>A QR code will appear in the terminal.</p>
                                </Step>
                                <Step num="3" title="Scan with WhatsApp">
                                    <p>Open WhatsApp → Settings → Linked Devices → Link a Device → Scan the QR code.</p>
                                </Step>
                                <Callout type="info">The session persists across restarts. You only need to scan once unless you manually log out from WhatsApp.</Callout>
                                <h2 className="text-lg font-medium text-white mt-8 mb-3">Supported Input</h2>
                                <ul className="space-y-2">
                                    {["Text messages (English, Hindi, Hinglish)", "Voice notes (auto-transcribed)", "Images (with OCR / vision)", "Document attachments (PDF parsing)"].map(s => (
                                        <li key={s} className="flex items-center gap-2 text-sm text-white/40">
                                            <Check className="w-3.5 h-3.5 text-[#c0ff4d]/50 flex-shrink-0" />{s}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        )}

                        {/* HUB DASHBOARD */}
                        {active === "hub-dashboard" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Installation</p>
                                <h1 className="text-3xl font-light text-white mb-4">Hub Dashboard</h1>
                                <p className="text-sm text-white/40 mb-6">The Prosthetic Hub is this Next.js application — your visual command center.</p>
                                <CodeBlock title="Terminal" code={`git clone https://github.com/prosthetic-ai/prosthetic-hub.git
cd prosthetic-hub
npm install
npm run dev`} />
                                <p className="text-sm text-white/40 mt-4 mb-6">The hub connects to OpenClaw at <code className="font-['JetBrains_Mono'] text-xs text-white/50">http://127.0.0.1:18789</code>. Ensure the daemon is running before launching.</p>
                                <h2 className="text-lg font-medium text-white mb-3">Dashboard Tabs</h2>
                                <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                                    {[
                                        ["Overview", "/overview", "System status, active agents, and session metrics."],
                                        ["Agent Chat", "/chat?session=agent:main:main", "Live conversation with your primary AI agent."],
                                        ["Sessions", "/sessions", "Browse all agent sessions and their history."],
                                        ["Canvas", "/canvas", "Visual workspace for agent outputs and artifacts."],
                                    ].map(([name, path, desc]) => (
                                        <div key={name} className="flex items-start gap-4 p-4 border-b border-white/[0.04] last:border-0">
                                            <code className="font-['JetBrains_Mono'] text-xs text-white/30 flex-shrink-0 mt-0.5 min-w-[180px]">{path}</code>
                                            <div>
                                                <span className="text-sm font-medium text-white">{name}</span>
                                                <p className="text-xs text-white/30 mt-0.5">{desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        )}

                        {/* SYSTEM DESIGN */}
                        {active === "system-design" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Architecture</p>
                                <h1 className="text-3xl font-light text-white mb-4">System Design</h1>
                                <p className="text-sm text-white/40 mb-8">Prosthetic follows a modular, event-driven architecture with three core layers.</p>
                                <div className="rounded-xl border border-white/[0.06] p-6 bg-white/[0.02] mb-8">
                                    <pre className="text-xs font-['JetBrains_Mono'] text-white/40 leading-loose whitespace-pre overflow-x-auto">{`┌─────────────────────────────────────────────────────────┐
│                     USER (WhatsApp)                      │
└──────────────┬──────────────────────────┬────────────────┘
               │  voice / text / images   │
               ▼                          │
┌──────────────────────────┐              │
│   WhatsApp Bridge        │              │
│   (Baileys / Node.js)    │              │
└──────────────┬───────────┘              │
               │ parsed message           │ responses
               ▼                          │
┌──────────────────────────────────────────────────────────┐
│                    OpenClaw Daemon                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│  │  Router   │→│  Agents  │→│  Skills   │               │
│  │          │  │  (Swarm) │  │(Actions) │               │
│  └──────────┘  └──────────┘  └──────────┘               │
│                    :18789                                │
└──────────────┬───────────────────────────────────────────┘
               │ WebSocket / REST
               ▼
┌──────────────────────────┐
│   Prosthetic Hub         │
│   (Next.js Dashboard)    │
│   localhost:3000          │
└──────────────────────────┘`}</pre>
                                </div>
                                <h2 className="text-lg font-medium text-white mb-3">Data Flow</h2>
                                <ol className="space-y-3 list-decimal list-inside text-sm text-white/40 leading-relaxed">
                                    <li>User sends a WhatsApp message (text, voice, or image)</li>
                                    <li>Bridge parses and forwards to OpenClaw daemon via internal socket</li>
                                    <li>Router analyzes intent and selects the appropriate agent</li>
                                    <li>Agent decomposes the task and invokes relevant skills</li>
                                    <li>Skills execute real actions (API calls, file I/O, browser automation)</li>
                                    <li>Results are sent back through WhatsApp and displayed on the Hub</li>
                                </ol>
                            </article>
                        )}

                        {/* AGENT SWARM */}
                        {active === "agent-swarm" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Architecture</p>
                                <h1 className="text-3xl font-light text-white mb-4">Agent Swarm</h1>
                                <p className="text-sm text-white/40 mb-6">Prosthetic uses a multi-agent swarm architecture. Each agent specializes in a domain and can delegate to other agents or skills.</p>
                                <CodeBlock title="config.yaml" lang="yaml" code={`agents:
  main:
    role: "Primary Orchestrator"
    model: "gpt-4o"
    can_delegate_to: [health, dev, finance]
    
  health:
    role: "Health & Wellness Agent"
    model: "gpt-4o-mini"
    skills: [vitals_tracker, medication_reminder]
    integration: "swasthya-gold"
    
  dev:
    role: "Developer Assistant"
    model: "claude-3.5-sonnet"
    skills: [code_runner, git_ops, browser_auto]
    
  finance:
    role: "Finance & Invoicing"
    model: "gpt-4o-mini"
    skills: [invoice_draft, expense_track]`} />
                                <Callout type="info">The main agent acts as an orchestrator — it understands the user&#39;s intent and delegates to the right specialized agent. Agents can also chain tasks between themselves.</Callout>
                            </article>
                        )}

                        {/* SKILL SYSTEM */}
                        {active === "skill-system" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Architecture</p>
                                <h1 className="text-3xl font-light text-white mb-4">Skill System</h1>
                                <p className="text-sm text-white/40 mb-6">Skills are discrete, executable capabilities that agents can invoke. Each skill is a Python class with a standard interface.</p>
                                <CodeBlock title="skills/calendar.py" lang="python" code={`from openclaw.skill import Skill

class CalendarSkill(Skill):
    name = "calendar"
    description = "Create, read, update calendar events"
    
    async def execute(self, action, **params):
        if action == "create":
            return await self.create_event(
                title=params["title"],
                time=params["time"],
                duration=params.get("duration", 30)
            )
        elif action == "list":
            return await self.list_events(
                date=params.get("date", "today")
            )`} />
                                <h2 className="text-lg font-medium text-white mt-8 mb-3">Built-in Skills</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        { name: "Browser Automation", desc: "Navigate, click, scrape via Playwright" },
                                        { name: "Calendar", desc: "Google Calendar CRUD operations" },
                                        { name: "Invoice Drafting", desc: "Generate GST-compliant invoices" },
                                        { name: "Code Runner", desc: "Execute code in sandboxed environment" },
                                        { name: "File Manager", desc: "Read, write, organize local files" },
                                        { name: "Notification", desc: "Send alerts via WhatsApp/email" },
                                    ].map(s => (
                                        <div key={s.name} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                            <h4 className="text-sm font-medium text-white mb-1">{s.name}</h4>
                                            <p className="text-xs text-white/30">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        )}

                        {/* SWASTHYA-GOLD */}
                        {active === "swasthya-gold" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Integrations</p>
                                <h1 className="text-3xl font-light text-white mb-4">Swasthya-Gold</h1>
                                <p className="text-sm text-white/40 mb-6">Swasthya-Gold is the first live integration — a health intelligence platform that agents can interact with for vitals tracking, medication management, and wellness.</p>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="w-2 h-2 rounded-full bg-[#c0ff4d] animate-pulse" />
                                    <span className="text-xs font-['JetBrains_Mono'] text-[#c0ff4d]/70">LIVE</span>
                                    <a href="https://swasthya-gold.vercel.app" target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1 no-underline">
                                        swasthya-gold.vercel.app <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </div>
                                <h2 className="text-lg font-medium text-white mb-3">Agent Commands</h2>
                                <CodeBlock title="WhatsApp examples" code={`"log my blood pressure 120/80"
"remind me to take metformin at 8am"
"show my health summary for this week"
"I'm feeling dizzy and have a headache"`} />
                            </article>
                        )}

                        {/* CUSTOM APPS */}
                        {active === "custom-apps" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Integrations</p>
                                <h1 className="text-3xl font-light text-white mb-4">Custom Apps</h1>
                                <p className="text-sm text-white/40 mb-6">Build your own integration by implementing the Prosthetic App interface.</p>
                                <CodeBlock title="my_app/manifest.json" lang="json" code={`{
  "name": "my-custom-app",
  "version": "1.0.0",
  "description": "My custom integration",
  "url": "https://my-app.vercel.app",
  "agent": {
    "role": "Custom Agent",
    "skills": ["my_skill_1", "my_skill_2"]
  },
  "triggers": ["keyword1", "keyword2"]
}`} />
                                <Callout type="info">Place your app manifest in <code className="font-['JetBrains_Mono'] text-xs">openclaw/integrations/</code> and restart the daemon. It will auto-register.</Callout>
                            </article>
                        )}

                        {/* REST API */}
                        {active === "rest-api" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">API Reference</p>
                                <h1 className="text-3xl font-light text-white mb-4">REST API</h1>
                                <p className="text-sm text-white/40 mb-6">OpenClaw exposes a REST API on <code className="font-['JetBrains_Mono'] text-xs text-white/50">http://127.0.0.1:18789</code>.</p>
                                {[
                                    { method: "GET", path: "/api/status", desc: "System health and uptime" },
                                    { method: "GET", path: "/api/agents", desc: "List registered agents" },
                                    { method: "GET", path: "/api/sessions", desc: "List active sessions" },
                                    { method: "POST", path: "/api/message", desc: "Send a message to an agent" },
                                    { method: "GET", path: "/api/sessions/:id", desc: "Get session details and history" },
                                    { method: "DELETE", path: "/api/sessions/:id", desc: "End a session" },
                                ].map((ep) => (
                                    <div key={ep.path} className="flex items-start gap-3 py-3 border-b border-white/[0.04]">
                                        <span className={`text-xs font-['JetBrains_Mono'] font-bold px-2 py-0.5 rounded ${ep.method === "GET" ? "text-[#c0ff4d]/70 bg-[#c0ff4d]/[0.08]" : ep.method === "POST" ? "text-blue-400/70 bg-blue-400/[0.08]" : "text-red-400/70 bg-red-400/[0.08]"}`}>{ep.method}</span>
                                        <code className="font-['JetBrains_Mono'] text-sm text-white/50 flex-1">{ep.path}</code>
                                        <span className="text-xs text-white/30">{ep.desc}</span>
                                    </div>
                                ))}
                                <h2 className="text-lg font-medium text-white mt-8 mb-3">Example Request</h2>
                                <CodeBlock title="Send a message" code={`curl -X POST http://127.0.0.1:18789/api/message \\
  -H "Content-Type: application/json" \\
  -d '{
    "session": "agent:main:main",
    "message": "schedule a meeting tomorrow at 3pm",
    "type": "text"
  }'`} />
                            </article>
                        )}

                        {/* WEBSOCKET */}
                        {active === "websocket" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">API Reference</p>
                                <h1 className="text-3xl font-light text-white mb-4">WebSocket</h1>
                                <p className="text-sm text-white/40 mb-6">Real-time events are streamed over WebSocket at <code className="font-['JetBrains_Mono'] text-xs text-white/50">ws://127.0.0.1:18789/ws</code>.</p>
                                <CodeBlock title="JavaScript" lang="js" code={`const ws = new WebSocket("ws://127.0.0.1:18789/ws");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case "agent:thinking":
      // Agent is processing
      break;
    case "agent:response":
      // Agent has a response
      console.log(data.message);
      break;
    case "skill:executing":
      // A skill is being executed
      break;
    case "session:updated":
      // Session state changed
      break;
  }
};`} />
                            </article>
                        )}

                        {/* ENV VARS */}
                        {active === "env-vars" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Configuration</p>
                                <h1 className="text-3xl font-light text-white mb-4">Environment Variables</h1>
                                <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                                    {[
                                        ["OPENAI_API_KEY", "string", "OpenAI API key for GPT models", "Required*"],
                                        ["ANTHROPIC_API_KEY", "string", "Anthropic API key for Claude models", "Required*"],
                                        ["OPENCLAW_PORT", "number", "Port for the OpenClaw server", "18789"],
                                        ["OPENCLAW_HOST", "string", "Host address for OpenClaw", "127.0.0.1"],
                                        ["WHATSAPP_ENABLED", "boolean", "Enable WhatsApp bridge", "true"],
                                        ["WHATSAPP_SESSION_NAME", "string", "Session name for persistence", "prosthetic-main"],
                                        ["LOG_LEVEL", "string", "Logging verbosity", "info"],
                                        ["SKILL_TIMEOUT", "number", "Max skill execution time (ms)", "30000"],
                                    ].map(([name, type, desc, def]) => (
                                        <div key={name} className="p-4 border-b border-white/[0.04] last:border-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <code className="font-['JetBrains_Mono'] text-sm text-white/60">{name}</code>
                                                <span className="text-[10px] font-['JetBrains_Mono'] text-white/20 px-1.5 py-0.5 rounded border border-white/[0.06]">{type}</span>
                                            </div>
                                            <p className="text-xs text-white/30">{desc}</p>
                                            <p className="text-xs text-white/20 mt-1">Default: <code className="font-['JetBrains_Mono'] text-white/35">{def}</code></p>
                                        </div>
                                    ))}
                                </div>
                                <Callout type="info">* At least one LLM API key is required. You can use both simultaneously — agents can be configured to use different providers.</Callout>
                            </article>
                        )}

                        {/* AGENT CONFIG */}
                        {active === "agent-config" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Configuration</p>
                                <h1 className="text-3xl font-light text-white mb-4">Agent Configuration</h1>
                                <p className="text-sm text-white/40 mb-6">Agents are configured in <code className="font-['JetBrains_Mono'] text-xs text-white/50">openclaw/config.yaml</code>.</p>
                                <CodeBlock title="config.yaml" lang="yaml" code={`# Global settings
global:
  default_model: "gpt-4o"
  max_concurrent_agents: 5
  session_timeout: 3600  # seconds
  language: "auto"       # auto-detect Hindi/English

# Agent definitions  
agents:
  main:
    role: "Primary Orchestrator"
    system_prompt: |
      You are Prosthetic, a local-first AI assistant.
      You help users with ADHD/dyslexia by breaking
      tasks into small, manageable steps.
    model: "gpt-4o"
    temperature: 0.7
    max_tokens: 4096
    can_delegate_to: [health, dev, finance]
    
# Skill registration
skills:
  browser_auto:
    enabled: true
    headless: true
    timeout: 30000
  calendar:
    enabled: true
    provider: "google"
  code_runner:
    enabled: true
    sandbox: true
    allowed_languages: [python, javascript, bash]`} />
                            </article>
                        )}

                        {/* COMMON ISSUES */}
                        {active === "common-issues" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Troubleshooting</p>
                                <h1 className="text-3xl font-light text-white mb-4">Common Issues</h1>
                                {[
                                    {
                                        q: "Dashboard shows \"Cannot connect to local gateway\"",
                                        a: "OpenClaw daemon is not running. Start it with `python main.py` in the openclaw directory. The gateway should be available at http://127.0.0.1:18789.",
                                    },
                                    {
                                        q: "WhatsApp QR code not appearing",
                                        a: "Ensure the bridge dependencies are installed: `cd openclaw/bridge && npm install`. Then run `node whatsapp.js`. If issues persist, delete the `session/` folder and re-scan.",
                                    },
                                    {
                                        q: "Agent not responding to messages",
                                        a: "Check that your API key is correctly set in `.env`. Verify with `curl http://127.0.0.1:18789/api/status`. Look at the OpenClaw terminal for error logs.",
                                    },
                                    {
                                        q: "Skills timing out",
                                        a: "Increase `SKILL_TIMEOUT` in your `.env` file. Browser automation skills may need more time. Default is 30 seconds.",
                                    },
                                    {
                                        q: "High memory usage",
                                        a: "Reduce `max_concurrent_agents` in `config.yaml`. If using local LLMs, consider using quantized models (4-bit) to reduce RAM usage.",
                                    },
                                ].map((issue, i) => (
                                    <div key={i} className="mb-6 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                                        <h3 className="text-sm font-medium text-white mb-2">{issue.q}</h3>
                                        <p className="text-sm text-white/40 leading-relaxed">{issue.a}</p>
                                    </div>
                                ))}
                            </article>
                        )}

                        {/* FAQ */}
                        {active === "faq" && (
                            <article>
                                <p className="text-xs font-['JetBrains_Mono'] text-white/25 tracking-[0.15em] uppercase mb-3">Troubleshooting</p>
                                <h1 className="text-3xl font-light text-white mb-4">FAQ</h1>
                                {[
                                    { q: "Does Prosthetic send data to any cloud?", a: "No. Everything runs locally on your machine. The only external calls are to LLM APIs (OpenAI/Anthropic) for model inference — and you can replace these with local models if you prefer." },
                                    { q: "Can I use local LLMs instead of API keys?", a: "Yes. OpenClaw supports Ollama and LM Studio. Set the model to 'ollama/llama3' in config.yaml and point OLLAMA_HOST to your local instance." },
                                    { q: "What happens when my PC is off?", a: "The daemon stops. Messages received while offline are queued by WhatsApp and processed when you restart. For 24/7 operation, run OpenClaw on an always-on device." },
                                    { q: "Is this safe to use on my primary WhatsApp?", a: "Yes, it uses the linked device feature (like WhatsApp Web). It doesn't replace your phone session. You can unlink anytime from WhatsApp settings." },
                                    { q: "Can multiple people use the same Prosthetic instance?", a: "Currently, it's designed for single-user use — one WhatsApp account per instance. Multi-user support is planned." },
                                ].map((faq, i) => (
                                    <div key={i} className="mb-4 py-4 border-b border-white/[0.04]">
                                        <h3 className="text-sm font-medium text-white mb-2">{faq.q}</h3>
                                        <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </article>
                        )}

                        {/* Bottom nav */}
                        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs text-white/15 font-['JetBrains_Mono']">PROSTHETIC DOCS v1.0</span>
                            <Link href="/dashboard" className="text-xs text-white/30 hover:text-white/50 transition-colors no-underline flex items-center gap-1">
                                Open Dashboard <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
