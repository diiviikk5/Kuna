"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import {
    Heart,
    Moon,
    Swords,
    TrendingUp,
    Store,
    ShieldCheck,
    ExternalLink,
    ArrowUpRight,
    Clock,
    Sparkles,
    Zap,
    Wind,
    Star,
    Gamepad2,
} from "lucide-react";

const fade = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    }),
};

const stagger = { show: { transition: { staggerChildren: 0.07 } } };

const LIVE_APPS = [
    {
        id: "luna",
        name: "Luna Care",
        tagline: "Wellness & Sleep Companion",
        desc: "Intelligent sleep tracking, circadian rhythm optimization, and mental wellness check-ins. Agents nudge you with calming routines and analyze sleep patterns.",
        icon: Moon,
        url: "https://luna-care-app.vercel.app/",
        features: ["Sleep Analytics", "Wellness Check-ins", "Circadian Optimization"],
    },
    {
        id: "swasthya",
        name: "Swasthya-Gold",
        tagline: "Health Intelligence Platform",
        desc: "AI-powered health vitals tracker, medication management, and wellness insights. Agents can auto-log symptoms, set medication reminders, and track vitals — all triggered via WhatsApp voice notes.",
        icon: Heart,
        url: "https://swasthya-gold.vercel.app/",
        features: ["Vitals Tracking", "Medication Reminders", "Symptom Logging", "Voice-triggered"],
    },
    {
        id: "drift",
        name: "Drift",
        tagline: "Digital Experience by dvkk",
        desc: "A polished personal deployment from dvkk.dev — a showcase of minimalist digital craft, interactive experiences, and live projects built under the dvkk umbrella.",
        icon: Wind,
        url: "https://drift.dvkk.dev",
        features: ["Personal Brand", "Live Deployment", "Vercel Hosted"],
    },
    {
        id: "stellar",
        name: "Stellar",
        tagline: "Elegant Web Experience",
        desc: "A stellar-themed interactive project deployment — clean design, smooth animations, and a refined aesthetic that demonstrates modern frontend craftsmanship at its finest.",
        icon: Star,
        url: "https://stellar-wine.vercel.app",
        features: ["Stellar UI", "Smooth Animations", "Vercel Hosted"],
    },
    {
        id: "nextplay",
        name: "NextPlay",
        tagline: "Game Tracker & Discovery",
        desc: "Track your gaming journey — log games you've played, want to play, and are currently exploring. A beautifully designed game tracker that keeps your library organized and discoveries flowing.",
        icon: Gamepad2,
        url: "https://www.nextplaygame.me",
        features: ["Game Library", "Play Tracker", "Discovery Feed", "Custom Lists"],
    },
    {
        id: "gladiator",
        name: "Algo Gladiator",
        tagline: "DSA Gamified — Competitive Programming Coach",
        desc: "AI-powered DSA practice turned into a game. Earn XP, climb leaderboards, and battle algorithmic challenges. Agents help break down complex problems into digestible steps for learners and competitors.",
        icon: Swords,
        url: "https://gladiator-smoky.vercel.app/",
        features: ["Problem Breakdown", "XP & Leaderboards", "Contest Prep", "Code Review"],
    },
];

const COMING_SOON = [
    {
        id: "financexor",
        name: "FinanceXor",
        tagline: "Personal Finance Automation",
        desc: "Automated expense tracking, GST invoicing, and financial health reports. Agents draft invoices, categorize expenses, and send daily summaries via WhatsApp.",
        icon: TrendingUp,
        features: ["Expense Tracking", "GST Invoicing", "Financial Reports"],
    },
    {
        id: "smb",
        name: "SMB Automator",
        tagline: "Small Business Operations",
        desc: "End-to-end kirana and retail shop management — inventory tracking, order management, and customer communication. Voice-command everything in Hinglish.",
        icon: Store,
        features: ["Inventory Management", "Order Tracking", "Hinglish Commands"],
    },
    {
        id: "kryvault",
        name: "Kryvault",
        tagline: "Blockchain Verification",
        desc: "Decentralized document verification and credential management. Agents can verify certificates, stamp documents, and maintain tamper-proof records on-chain.",
        icon: ShieldCheck,
        features: ["Document Verification", "Credential Management", "On-chain Records"],
    },
];

export default function IntegrationsPage() {
    return (
        <LazyMotion features={domAnimation} strict>
            <div className="content-layer pt-24 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    {/* ── Header ── */}
                    <m.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="mb-16"
                    >
                        <m.p
                            variants={fade}
                            className="text-xs tracking-[0.2em] text-white/30 uppercase mb-3"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            Integrations
                        </m.p>
                        <m.h1
                            variants={fade}
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-5"
                        >
                            Niche assistants,
                            <br />
                            <span
                                className="italic text-white/60"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                one ecosystem.
                            </span>
                        </m.h1>
                        <m.p
                            variants={fade}
                            className="text-lg text-white/35 max-w-xl leading-relaxed"
                        >
                            Prosthetic connects with specialized apps so your agents can take
                            real action — health, finance, code, inventory, and more.
                        </m.p>
                    </m.div>

                    {/* ══════════ LIVE — Swasthya Gold ══════════ */}
                    <m.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={stagger}
                        className="mb-20"
                    >
                        <m.div variants={fade} className="flex items-center gap-3 mb-8">
                            <Zap className="w-4 h-4 text-white/30" />
                            <span
                                className="text-xs tracking-[0.15em] text-white/30 uppercase"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Live Integrations
                            </span>
                        </m.div>

                        {LIVE_APPS.map((app, i) => (
                            <m.div
                                key={app.id}
                                variants={fade}
                                custom={i}
                                className="rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/[0.1] transition-all duration-500"
                            >
                                {/* Preview iframe */}
                                <div className="relative w-full h-[360px] md:h-[480px] border-b border-white/[0.04] overflow-hidden bg-[rgba(5,5,8,0.3)]">
                                    <iframe
                                        src={app.url}
                                        title={app.name}
                                        className="w-full h-full border-none"
                                        loading="lazy"
                                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                                    />
                                    {/* Fade at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
                                    {/* Live badge */}
                                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(5,5,8,0.6)] border border-white/[0.08]">
                                        <span className="w-2 h-2 rounded-full bg-[#c0ff4d] animate-pulse" />
                                        <span
                                            className="text-[11px] text-[#c0ff4d]/80"
                                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                        >
                                            LIVE
                                        </span>
                                    </div>
                                </div>

                                {/* Info section */}
                                <div className="p-8 md:p-10 bg-[rgba(5,5,8,0.5)]">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <app.icon className="w-5 h-5 text-white/30" />
                                                <h2 className="text-2xl font-medium text-white">
                                                    {app.name}
                                                </h2>
                                            </div>
                                            <p
                                                className="text-sm text-white/30 mb-4"
                                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                            >
                                                {app.tagline}
                                            </p>
                                            <p className="text-sm text-white/40 leading-relaxed max-w-lg mb-6">
                                                {app.desc}
                                            </p>

                                            {/* Feature pills */}
                                            <div className="flex flex-wrap gap-2">
                                                {app.features.map((f) => (
                                                    <span
                                                        key={f}
                                                        className="px-3 py-1 text-xs text-white/35 border border-white/[0.06] rounded-full"
                                                    >
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 md:flex-shrink-0">
                                            <a
                                                href={app.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all no-underline"
                                            >
                                                Open App
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </a>
                                            <a
                                                href={app.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-white/40 text-sm border border-white/[0.08] rounded-full hover:border-white/[0.15] hover:text-white/60 transition-all no-underline"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                Preview
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </m.section>

                    {/* ══════════ COMING SOON ══════════ */}
                    <m.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={stagger}
                    >
                        <m.div variants={fade} className="flex items-center gap-3 mb-8">
                            <Clock className="w-4 h-4 text-white/25" />
                            <span
                                className="text-xs tracking-[0.15em] text-white/25 uppercase"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                Coming Soon
                            </span>
                        </m.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
                            {COMING_SOON.map((app, i) => (
                                <m.div
                                    key={app.id}
                                    variants={fade}
                                    custom={i}
                                    className="bg-[rgba(5,5,8,0.6)] p-7 md:p-8 hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-300 group relative"
                                >
                                    {/* Coming soon badge */}
                                    <div className="absolute top-6 right-6 flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3 text-white/15" />
                                        <span
                                            className="text-[10px] text-white/15 uppercase tracking-wider"
                                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                        >
                                            Soon
                                        </span>
                                    </div>

                                    <app.icon className="w-5 h-5 text-white/20 group-hover:text-white/35 transition-colors mb-5" />

                                    <h3 className="text-lg font-medium text-white mb-1">
                                        {app.name}
                                    </h3>
                                    <p
                                        className="text-xs text-white/25 mb-4"
                                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                    >
                                        {app.tagline}
                                    </p>
                                    <p className="text-sm text-white/30 leading-relaxed mb-5">
                                        {app.desc}
                                    </p>

                                    {/* Feature pills */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {app.features.map((f) => (
                                            <span
                                                key={f}
                                                className="px-2.5 py-0.5 text-[11px] text-white/20 border border-white/[0.04] rounded-full"
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </m.section>

                    {/* ── Bottom note ── */}
                    <m.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="mt-20 text-center"
                    >
                        <m.p variants={fade} className="text-sm text-white/20">
                            More integrations are being built. Each one connects to Prosthetic&apos;s
                            agent swarm —
                        </m.p>
                        <m.p
                            variants={fade}
                            className="text-sm italic text-white/30 mt-1"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            one message, real action across every app.
                        </m.p>
                    </m.div>
                </div>
            </div>
        </LazyMotion>
    );
}
