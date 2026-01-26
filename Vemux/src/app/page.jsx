'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spotlight, TextGenerateEffect, BackgroundBeams } from '@/components/ui/aceternity';

// Logo
function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <span className="font-display font-bold text-white text-sm">V</span>
            </div>
            <span className="font-display font-semibold text-white text-lg">vemux</span>
        </Link>
    );
}

// Navbar
function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Logo />

                <div className="flex items-center gap-8">
                    <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
                        Features
                    </Link>
                    <Link href="#demo" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
                        Demo
                    </Link>
                    <Link href="/create" className="btn-primary">
                        Get Started
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}

// Feature Card
function FeatureCard({ icon, title, description, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="feature-card group"
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="font-display text-xl font-semibold text-white mb-3">
                {title}
            </h3>
            <p className="text-zinc-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

// Bento Grid Item
function BentoItem({ className, title, description, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`bento-item p-6 ${className || ''}`}
        >
            {children}
            <div className="mt-4">
                <h3 className="font-display text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-zinc-500 text-sm">{description}</p>
            </div>
        </motion.div>
    );
}

// Step Card
function StepCard({ number, title, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center group"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 mb-4 group-hover:border-violet-500/40 transition-colors">
                <span className="font-display text-2xl font-bold text-gradient">{number}</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-zinc-500 text-sm">{description}</p>
        </motion.div>
    );
}

// Counter
function Counter({ value, suffix = '' }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prev => {
                if (prev >= value) return value;
                return prev + Math.ceil(value / 50);
            });
        }, 30);
        return () => clearInterval(timer);
    }, [value]);

    return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
    return (
        <main className="min-h-screen bg-black relative overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
                {/* Spotlight effect */}
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="rgba(139, 92, 246, 0.5)"
                />

                {/* Grid background */}
                <div className="absolute inset-0 bg-grid opacity-30" />

                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-zinc-400">Now in Beta</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-sm text-violet-400">Powered by Remotion</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
                    >
                        <span className="text-white">Create </span>
                        <span className="text-gradient">stunning</span>
                        <br />
                        <span className="text-white">product demos</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Drop your URL and get a polished 30-second demo video.
                        <span className="text-white"> No video skills required.</span> Perfect for landing pages, pitches, and launches.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link href="/create" className="btn-primary min-w-[180px]">
                            Start Creating
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link href="#demo" className="btn-secondary min-w-[180px]">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                            Watch Demo
                        </Link>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex items-center justify-center gap-8 text-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-black"
                                        style={{
                                            background: `linear-gradient(135deg, hsl(${260 + i * 20}, 70%, 60%), hsl(${180 + i * 20}, 70%, 50%))`
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-zinc-400">
                                <span className="text-white font-medium"><Counter value={2400} />+</span> creators
                            </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-zinc-400">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span>4.9/5 rating</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="relative py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="relative aspect-video rounded-2xl overflow-hidden glass-card group cursor-pointer"
                    >
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20" />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </div>
                        </div>

                        {/* Corner accents */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-violet-500/40 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-violet-500/40 rounded-br-lg" />
                    </motion.div>
                    <p className="text-center text-zinc-500 text-sm mt-6">Watch a 30-second example demo</p>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-4">
                            Why Vemux?
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Built for <span className="text-gradient">modern founders</span>
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            No templates. No learning curve. Just drop your URL and let the magic happen.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon="⚡"
                            title="30 Seconds Flat"
                            description="Get a polished demo video in under 5 minutes. No editing skills required. Just paste and go."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon="🎨"
                            title="5 Premium Styles"
                            description="Choose from curated visual styles. Clean, Dark, Developer, Editorial, or Gradient. Each designed to impress."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon="🚀"
                            title="Founder Ready"
                            description="Perfect for landing pages, pitch decks, Product Hunt launches, and cold outreach. Built to convert."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="relative py-32 px-6">
                <BackgroundBeams className="opacity-30" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            How it works
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            From URL to video in 4 simple steps
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <StepCard number="01" title="Paste URL" description="Drop your product link" />
                        <StepCard number="02" title="Pick Style" description="Choose your vibe" />
                        <StepCard number="03" title="Preview" description="Watch it come alive" />
                        <StepCard number="04" title="Export" description="Download in HD" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-3xl p-12 md:p-16"
                    >
                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            <div>
                                <div className="font-display text-5xl md:text-6xl font-bold text-gradient mb-2">30s</div>
                                <p className="text-zinc-400">Average video</p>
                            </div>
                            <div>
                                <div className="font-display text-5xl md:text-6xl font-bold text-gradient mb-2">5min</div>
                                <p className="text-zinc-400">Time to create</p>
                            </div>
                            <div>
                                <div className="font-display text-5xl md:text-6xl font-bold text-gradient mb-2">$0</div>
                                <p className="text-zinc-400">To get started</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-6">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Ready to <span className="text-gradient">ship</span>?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto"
                    >
                        No signup required. Create your first demo video for free in under 5 minutes.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/create" className="btn-primary text-base px-10 py-4">
                            Start Creating — Free
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Logo />
                        <span className="text-sm text-zinc-600">© 2025 Vemux</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com" className="text-zinc-500 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" className="text-zinc-500 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
