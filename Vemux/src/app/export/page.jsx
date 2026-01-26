'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { GlitchButton, GlitchBlock } from '@/components/ui/Glitch';

export default function ExportPage() {
    const router = useRouter();
    const [videoPlan, setVideoPlan] = useState(null);
    const [isGlitching, setIsGlitching] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('vemux-video-plan');
        if (stored) {
            try {
                setVideoPlan(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse video plan:', e);
                router.push('/create');
            }
        } else {
            router.push('/create');
        }
        setTimeout(() => setIsGlitching(false), 300);
    }, [router]);

    const downloadJSON = useCallback(() => {
        if (!videoPlan) return;

        const blob = new Blob([JSON.stringify(videoPlan, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${videoPlan.product.name.toLowerCase().replace(/\s+/g, '-')}-demo.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [videoPlan]);

    const copyCommand = useCallback(async () => {
        const command = 'npx remotion render src/remotion/index.js DemoVideo out/demo.mp4 --props="$(cat video-plan.json)"';
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    if (!videoPlan) {
        return (
            <div className="min-h-screen bg-vemux-bg flex items-center justify-center">
                <p className="text-vemux-muted">Loading...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-vemux-bg">
            <Navbar />

            <div className="pt-24 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <GlitchBlock trigger={isGlitching} className="mb-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-vemux-accent/10 border border-vemux-accent flex items-center justify-center">
                            <svg className="w-8 h-8 text-vemux-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="font-heading text-4xl font-semibold mb-4">Ready to Export</h1>
                        <p className="text-vemux-muted">
                            Your demo video is ready. Download the video plan and render it locally with Remotion.
                        </p>
                    </GlitchBlock>

                    {/* Download section */}
                    <div className="space-y-6 mb-12">
                        <div className="p-6 bg-vemux-surface border border-vemux-border">
                            <h2 className="font-heading text-xl font-medium mb-4">Step 1: Download Video Plan</h2>
                            <p className="text-vemux-muted text-sm mb-4">
                                Download your video configuration as a JSON file.
                            </p>
                            <GlitchButton variant="primary" onClick={downloadJSON}>
                                Download JSON
                            </GlitchButton>
                        </div>

                        <div className="p-6 bg-vemux-surface border border-vemux-border">
                            <h2 className="font-heading text-xl font-medium mb-4">Step 2: Install Remotion</h2>
                            <p className="text-vemux-muted text-sm mb-4">
                                If you haven't already, install Remotion CLI globally.
                            </p>
                            <div className="p-4 bg-vemux-bg font-mono text-sm text-vemux-accent">
                                npm install -g @remotion/cli
                            </div>
                        </div>

                        <div className="p-6 bg-vemux-surface border border-vemux-border">
                            <h2 className="font-heading text-xl font-medium mb-4">Step 3: Render Your Video</h2>
                            <p className="text-vemux-muted text-sm mb-4">
                                Clone the Vemux renderer and run the following command.
                            </p>
                            <div className="relative">
                                <div className="p-4 bg-vemux-bg font-mono text-sm text-vemux-accent overflow-x-auto">
                                    npx remotion render DemoVideo out/demo.mp4
                                </div>
                                <button
                                    onClick={copyCommand}
                                    className="absolute top-2 right-2 px-3 py-1 text-xs bg-vemux-border hover:bg-vemux-muted transition-colors"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="p-6 bg-vemux-surface border border-vemux-border mb-8">
                        <h3 className="font-medium mb-4">Video Summary</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-vemux-muted">Product:</span>
                                <span className="ml-2">{videoPlan.product.name}</span>
                            </div>
                            <div>
                                <span className="text-vemux-muted">Style:</span>
                                <span className="ml-2 capitalize">{videoPlan.style}</span>
                            </div>
                            <div>
                                <span className="text-vemux-muted">Duration:</span>
                                <span className="ml-2">{videoPlan.duration}s</span>
                            </div>
                            <div>
                                <span className="text-vemux-muted">Features:</span>
                                <span className="ml-2">{videoPlan.features.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <GlitchButton
                            variant="ghost"
                            onClick={() => router.push('/preview')}
                        >
                            ← Back to Preview
                        </GlitchButton>

                        <GlitchButton
                            variant="secondary"
                            onClick={() => router.push('/create')}
                        >
                            Create Another
                        </GlitchButton>
                    </div>
                </div>
            </div>
        </main>
    );
}
