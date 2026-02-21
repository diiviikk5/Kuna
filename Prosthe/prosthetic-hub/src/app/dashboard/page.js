"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
    MonitorPlay, MessageSquare, Layers, PenTool, ExternalLink,
    Heart, Moon, Sword, Brain, Server, Clock, Users,
    ArrowUpRight, Activity, Wifi, WifiOff,
} from "lucide-react";

const OPENCLAW_BASE = "http://127.0.0.1:18789";

const SIDE_APPS = [
    { id: "swasthya", name: "Swasthya-Gold", desc: "Health vitals & medication", icon: Heart, url: "https://swasthya-gold.vercel.app" },
    { id: "luna", name: "Luna Care", desc: "Wellness & sleep tracking", icon: Moon, url: null },
    { id: "gladiator", name: "Gladiator", desc: "Fitness & workouts", icon: Sword, url: null },
];

const STATS = [
    { label: "Active Agents", value: "3", icon: Brain },
    { label: "Sessions Today", value: "12", icon: Users },
    { label: "Uptime", value: "24/7", icon: Clock },
    { label: "Gateway", value: ":18789", icon: Server },
];

const QUICK_LINKS = [
    { label: "Overview", path: "/overview", icon: MonitorPlay },
    { label: "Agent Chat", path: "/chat?session=agent%3Amain%3Amain", icon: MessageSquare },
    { label: "Sessions", path: "/sessions", icon: Layers },
    { label: "Canvas", path: "/canvas", icon: PenTool },
];

const fade = {
    hidden: { opacity: 0, y: 16 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 1, 0.5, 1] } }),
};

const stagger = { show: { transition: { staggerChildren: 0.05 } } };

export default function DashboardPage() {
    const [gatewayStatus, setGatewayStatus] = useState("checking"); // checking | online | offline

    useEffect(() => {
        fetch(OPENCLAW_BASE, { mode: "no-cors" })
            .then(() => setGatewayStatus("online"))
            .catch(() => setGatewayStatus("offline"));
    }, []);

    return (
        <LazyMotion features={domAnimation} strict>
            <div className="content-layer pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header */}
                    <m.div initial="hidden" animate="show" variants={stagger} className="mb-10">
                        <m.p variants={fade} className="text-xs font-['JetBrains_Mono'] tracking-[0.2em] text-white/30 uppercase mb-2">
                            Command Hub
                        </m.p>
                        <m.h1 variants={fade} className="text-3xl md:text-4xl font-light text-white mb-2">
                            Prosthetic <span className="font-['Playfair_Display'] italic text-white/60">Dashboard</span>
                        </m.h1>
                        <m.p variants={fade} className="text-sm text-white/30">
                            Live agents, sessions, and integrations — all from one place.
                        </m.p>
                    </m.div>

                    {/* Mobile Note */}
                    <div className="md:hidden mb-6 px-4 py-3 rounded-lg border border-white/[0.06] bg-[rgba(5,5,8,0.5)]">
                        <p className="text-xs text-white/30 text-center">📱 Best viewed on desktop · Use WhatsApp for mobile control</p>
                    </div>

                    {/* Stats */}
                    <m.div
                        initial="hidden" animate="show"
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden mb-10"
                    >
                        {STATS.map((s, i) => (
                            <m.div key={s.label} variants={fade} custom={i} className="bg-[rgba(5,5,8,0.6)] p-5 flex items-center gap-3">
                                <s.icon className="w-4 h-4 text-white/20 flex-shrink-0" />
                                <div>
                                    <div className="text-lg font-medium text-white">{s.value}</div>
                                    <div className="text-xs text-white/25">{s.label}</div>
                                </div>
                            </m.div>
                        ))}
                    </m.div>

                    {/* ── OpenClaw Section ── */}
                    <section className="mb-14">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <div>
                                <p className="text-xs font-['JetBrains_Mono'] tracking-[0.2em] text-white/25 uppercase mb-1">
                                    OpenClaw Gateway
                                </p>
                                <h2 className="text-xl font-medium text-white">Local AI Runtime</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {gatewayStatus === "online" ? (
                                        <><Wifi className="w-3.5 h-3.5 text-[#c0ff4d]" /><span className="text-xs font-['JetBrains_Mono'] text-[#c0ff4d]/70">CONNECTED</span></>
                                    ) : gatewayStatus === "offline" ? (
                                        <><WifiOff className="w-3.5 h-3.5 text-white/20" /><span className="text-xs font-['JetBrains_Mono'] text-white/25">OFFLINE</span></>
                                    ) : (
                                        <><Activity className="w-3.5 h-3.5 text-white/20 animate-pulse" /><span className="text-xs font-['JetBrains_Mono'] text-white/25">CHECKING…</span></>
                                    )}
                                </div>
                                {gatewayStatus === "online" && (
                                    <a
                                        href={OPENCLAW_BASE}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-white/50 border border-white/10 rounded-lg hover:border-white/20 hover:text-white/70 transition-all no-underline"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        Open Full Dashboard
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Quick links to OpenClaw pages */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                            {QUICK_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={gatewayStatus === "online" ? `${OPENCLAW_BASE}${link.path}` : "#"}
                                    target={gatewayStatus === "online" ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 no-underline ${gatewayStatus === "online"
                                            ? "border-white/[0.06] bg-[rgba(5,5,8,0.4)] hover:border-white/[0.12] hover:bg-white/[0.03] cursor-pointer"
                                            : "border-white/[0.04] bg-[rgba(5,5,8,0.3)] opacity-50 cursor-not-allowed"
                                        }`}
                                >
                                    <link.icon className="w-4 h-4 text-white/25 flex-shrink-0" />
                                    <div>
                                        <span className="text-sm font-medium text-white/70 block">{link.label}</span>
                                        <span className="text-[10px] font-['JetBrains_Mono'] text-white/20">{link.path}</span>
                                    </div>
                                    {gatewayStatus === "online" && <ArrowUpRight className="w-3 h-3 text-white/15 ml-auto" />}
                                </a>
                            ))}
                        </div>

                        {/* Offline message */}
                        {gatewayStatus === "offline" && (
                            <div className="rounded-xl border border-white/[0.06] bg-[rgba(5,5,8,0.5)] p-8 text-center">
                                <WifiOff className="w-8 h-8 text-white/10 mx-auto mb-4" />
                                <p className="text-sm text-white/30 mb-2">OpenClaw daemon is not running</p>
                                <p className="text-xs text-white/20 max-w-md mx-auto mb-4">
                                    Start the daemon to access agent chat, sessions, and the live canvas.
                                </p>
                                <div className="inline-block px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                    <code className="text-xs font-['JetBrains_Mono'] text-white/40">python main.py --daemon</code>
                                </div>
                                <button
                                    onClick={() => { setGatewayStatus("checking"); fetch(OPENCLAW_BASE, { mode: "no-cors" }).then(() => setGatewayStatus("online")).catch(() => setGatewayStatus("offline")); }}
                                    className="block mx-auto mt-4 px-4 py-2 text-xs text-white/40 border border-white/[0.08] rounded-lg hover:border-white/[0.15] hover:text-white/60 transition-colors"
                                >
                                    Retry Connection
                                </button>
                            </div>
                        )}
                    </section>

                    {/* ── Integrations ── */}
                    <section id="integrations">
                        <p className="text-xs font-['JetBrains_Mono'] tracking-[0.2em] text-white/25 uppercase mb-1">
                            Integrations
                        </p>
                        <h2 className="text-xl font-medium text-white mb-2">Connected Apps</h2>
                        <p className="text-sm text-white/25 mb-8">
                            Agents can trigger these apps — you see results here.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {SIDE_APPS.map((app) => (
                                <div
                                    key={app.id}
                                    className="rounded-xl border border-white/[0.06] bg-[rgba(5,5,8,0.4)] p-5 hover:border-white/[0.1] transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <app.icon className="w-5 h-5 text-white/25 group-hover:text-white/40 transition-colors" />
                                        <div>
                                            <h3 className="text-sm font-medium text-white">{app.name}</h3>
                                            <p className="text-xs text-white/25">{app.desc}</p>
                                        </div>
                                        {app.url ? (
                                            <span className="ml-auto flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#c0ff4d] animate-pulse" />
                                                <span className="text-[10px] font-['JetBrains_Mono'] text-white/30">LIVE</span>
                                            </span>
                                        ) : (
                                            <span className="ml-auto text-[10px] font-['JetBrains_Mono'] text-white/15">SOON</span>
                                        )}
                                    </div>
                                    {app.url ? (
                                        <a
                                            href={app.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs text-white/40 border border-white/[0.06] rounded-lg hover:border-white/[0.12] hover:text-white/60 transition-all no-underline"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            Open {app.name}
                                        </a>
                                    ) : (
                                        <div className="w-full flex items-center justify-center px-4 py-2 text-xs text-white/15 border border-white/[0.04] rounded-lg">
                                            Coming Soon
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </LazyMotion>
    );
}
