"use client";

import { useMemo } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ListChecks,
  FileText,
  Mic,
  CalendarClock,
  Code2,
  ShieldCheck,
  Brain,
  Store,
  Stethoscope,
  Zap,
  ChevronRight,
} from "lucide-react";

/* ── Animations ── */
const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  }),
};

const stagger = { show: { transition: { staggerChildren: 0.08 } } };

/* ── Data ── */
const capabilities = [
  {
    icon: ListChecks,
    title: "ADHD Task Splitter",
    desc: "Breaks overwhelming tasks into tiny 5-min steps with smart reminders.",
  },
  {
    icon: FileText,
    title: "Dyslexia-Friendly Reader",
    desc: "Turns dense PDFs and emails into simple spoken, actionable steps.",
  },
  {
    icon: Mic,
    title: "Voice & Hinglish",
    desc: "Understands voice notes, Hinglish, and messy typing — no judgment.",
  },
  {
    icon: CalendarClock,
    title: "Real Work Execution",
    desc: "Schedules events, drafts invoices, manages inventory, tracks health.",
  },
  {
    icon: Code2,
    title: "Dev Assistant",
    desc: "Debug code, run scripts, automate repetitive dev workflows.",
  },
  {
    icon: ShieldCheck,
    title: "100% Local & Private",
    desc: "Runs on your PC via OpenClaw — no cloud, no data leaves your machine.",
  },
];

const steps = [
  {
    num: "01",
    title: "Message via WhatsApp",
    desc: "Voice note, Hinglish, messy text — anything goes.",
  },
  {
    num: "02",
    title: "OpenClaw processes locally",
    desc: "Your local daemon selects the right skill and starts execution.",
  },
  {
    num: "03",
    title: "Real action happens",
    desc: "Calendar events created, invoices drafted, code debugged — while you sleep.",
  },
  {
    num: "04",
    title: "See results on the Hub",
    desc: "Live sessions, agent conversations, and side-app outputs in one place.",
  },
];

const useCases = [
  {
    icon: Brain,
    tag: "ADHD / Dyslexia",
    title: "Students & Learners",
    points: ["Break assignments into micro-steps", "Read-aloud complex study material", "Timed Pomodoro nudges via WhatsApp"],
  },
  {
    icon: Store,
    tag: "SMB Owners",
    title: "Kirana / Finance",
    points: ["Voice-command inventory updates", "Auto-draft GST invoices", "Daily sales summary on WhatsApp"],
  },
  {
    icon: Stethoscope,
    tag: "Health",
    title: "Patients & Wellness",
    points: ["Medication reminders & tracking", "Swasthya-Gold integration", "Symptom logging via voice"],
  },
  {
    icon: Code2,
    tag: "Developers",
    title: "Engineers",
    points: ["Debug code via WhatsApp snippet", "Trigger CI/CD remotely", "Context-aware codebase Q&A"],
  },
];

const stack = [
  { label: "WhatsApp", sub: "Baileys" },
  { label: "OpenClaw", sub: "Local Runtime" },
  { label: "Next.js", sub: "Dashboard" },
  { label: "Swarm", sub: "Multi-Agent" },
  { label: "Skills", sub: "Browser Auto" },
  { label: "Daemon", sub: "24/7 Alive" },
];

export default function HomePage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="content-layer">
        {/* ═══════ HERO ═══════ */}
        <section className="min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-6 py-32 md:py-40">
            <m.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl">
              {/* Badge */}
              <m.div variants={fade} custom={0}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-white/10 text-white/60 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0ff4d] animate-pulse" />
                  LOCAL-FIRST AI
                </span>
              </m.div>

              {/* Headline — left aligned, clean serif + sans mix */}
              <m.h1
                variants={fade}
                custom={1}
                className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-[#ff4dd2] to-[#ff8533] bg-clip-text text-transparent">Prosthetic</span>
                <br />
                <span className="text-white">Orchestrator</span>
              </m.h1>

              {/* Subtitle */}
              <m.p
                variants={fade}
                custom={2}
                className="text-lg md:text-xl text-white/50 leading-relaxed max-w-lg mb-4"
              >
                AI that doesn&apos;t just chat — it thinks + executes autonomously.
                Message on WhatsApp, works even when you&apos;re asleep.
              </m.p>

              {/* Tagline */}
              <m.p
                variants={fade}
                custom={2.5}
                className="text-sm font-['JetBrains_Mono'] text-white/30 mb-10"
              >
                &quot;Bridging the Cognitive Gap&quot;
              </m.p>

              {/* CTAs */}
              <m.div variants={fade} custom={3} className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all no-underline"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white/60 text-sm font-medium rounded-full border border-white/10 hover:border-white/20 hover:text-white/80 transition-all no-underline"
                >
                  Learn More
                </a>
              </m.div>
            </m.div>
          </div>
        </section>

        {/* ═══════ CAPABILITIES ═══════ */}
        <section id="capabilities" className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <m.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <m.p variants={fade} className="text-xs font-['JetBrains_Mono'] tracking-[0.2em] text-white/30 uppercase mb-3">
                Capabilities
              </m.p>
              <m.h2 variants={fade} className="text-3xl md:text-5xl font-light text-white mb-4 leading-tight">
                Not another chatbot.
                <br />
                <span className="font-['Playfair_Display'] italic text-white/70">A cognitive extension.</span>
              </m.h2>
              <m.p variants={fade} className="text-white/40 max-w-md mb-16">
                Prosthetic goes beyond answers — it breaks down tasks, reads for you, and executes real work autonomously.
              </m.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {capabilities.map((cap, i) => (
                  <m.div
                    key={cap.title}
                    variants={fade}
                    custom={i}
                    className="bg-[rgba(5,5,8,0.6)] p-8 hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-300 group"
                  >
                    <cap.icon className="w-5 h-5 text-white/25 group-hover:text-white/50 transition-colors mb-5" />
                    <h3 className="text-base font-medium text-white mb-2">{cap.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{cap.desc}</p>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ═══════ HOW IT WORKS ═══════ */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <m.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <m.p variants={fade} className="text-xs font-['JetBrains_Mono'] tracking-[0.2em] text-white/30 uppercase mb-3">
                How it works
              </m.p>
              <m.h2 variants={fade} className="text-3xl md:text-5xl font-light text-white mb-16 leading-tight">
                Message → Think → <span className="font-['Playfair_Display'] italic text-white/70">Execute</span>
              </m.h2>

              <div className="space-y-0">
                {steps.map((s, i) => (
                  <m.div
                    key={s.num}
                    variants={fade}
                    custom={i}
                    className="flex items-start gap-6 md:gap-10 py-8 border-t border-white/[0.06] group"
                  >
                    <span className="text-3xl md:text-4xl font-['Orbitron'] font-bold text-white/10 group-hover:text-white/20 transition-colors flex-shrink-0 w-16">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-medium text-white mb-1">{s.title}</h3>
                      <p className="text-sm text-white/40">{s.desc}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ═══════ USE CASES ═══════ */}
        <section id="use-cases" className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <m.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <m.p variants={fade} className="text-xs font-['JetBrains_Mono'] tracking-[0.2em] text-white/30 uppercase mb-3">
                Use Cases
              </m.p>
              <m.h2 variants={fade} className="text-3xl md:text-5xl font-light text-white mb-16 leading-tight">
                One AI. <span className="font-['Playfair_Display'] italic text-white/70">Every user.</span>
              </m.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {useCases.map((uc, i) => (
                  <m.div
                    key={uc.title}
                    variants={fade}
                    custom={i}
                    className="rounded-2xl border border-white/[0.06] bg-[rgba(5,5,8,0.5)] p-8 hover:border-white/[0.1] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <uc.icon className="w-5 h-5 text-white/30" />
                      <span className="text-xs font-['JetBrains_Mono'] text-white/30 tracking-wide uppercase">
                        {uc.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-4">{uc.title}</h3>
                    <ul className="space-y-2.5">
                      {uc.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-white/40">
                          <ChevronRight className="w-3.5 h-3.5 text-white/20 mt-0.5 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ═══════ ARCHITECTURE ═══════ */}
        <section id="architecture" className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <m.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <m.p variants={fade} className="text-xs font-['JetBrains_Mono'] tracking-[0.2em] text-white/30 uppercase mb-3">
                Architecture
              </m.p>
              <m.h2 variants={fade} className="text-3xl md:text-5xl font-light text-white mb-16 leading-tight">
                Built <span className="font-['Playfair_Display'] italic text-white/70">different.</span>
              </m.h2>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
                {stack.map((t, i) => (
                  <m.div
                    key={t.label}
                    variants={fade}
                    custom={i}
                    className="bg-[rgba(5,5,8,0.6)] p-5 text-center hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                  >
                    <div className="text-sm font-medium text-white mb-1">{t.label}</div>
                    <div className="text-xs text-white/25">{t.sub}</div>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="py-24 md:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <m.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-xl">
              <m.h2 variants={fade} className="text-3xl md:text-5xl font-light text-white leading-tight mb-6">
                Stop juggling apps.
                <br />
                <span className="font-['Playfair_Display'] italic text-white/70">Let Prosthetic handle it.</span>
              </m.h2>
              <m.p variants={fade} className="text-white/40 mb-10 text-lg">
                Open the dashboard, send a WhatsApp message, and watch your AI think + execute in real time.
              </m.p>
              <m.div variants={fade}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all no-underline"
                >
                  Launch Dashboard
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </m.div>
            </m.div>
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer className="border-t border-white/[0.06] py-8">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <span className="text-xs font-['JetBrains_Mono'] text-white/20">
              PROSTHETIC © 2026
            </span>
            <span className="text-xs text-white/20">
              Bridging the Cognitive Gap
            </span>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
