'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Player } from '@remotion/player';
import { DemoVideo } from '@/remotion/compositions/DemoVideo';
import { Navbar } from '@/components/ui/Navbar';
import { GlitchButton, GlitchBlock } from '@/components/ui/Glitch';
import { defaultVideoPlan } from '@/lib/schema';

export default function PreviewPage() {
    const router = useRouter();
    const [videoPlan, setVideoPlan] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGlitching, setIsGlitching] = useState(true);

    useEffect(() => {
        // Load video plan from localStorage
        const stored = localStorage.getItem('vemux-video-plan');
        if (stored) {
            try {
                setVideoPlan(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse video plan:', e);
                setVideoPlan(defaultVideoPlan);
            }
        } else {
            // No video plan, redirect to create
            router.push('/create');
        }

        // Trigger glitch on initial load
        setTimeout(() => setIsGlitching(false), 300);
    }, [router]);

    const handleExport = useCallback(() => {
        setIsGlitching(true);
        setTimeout(() => {
            setIsGlitching(false);
            localStorage.setItem('vemux-video-plan', JSON.stringify(videoPlan));
            router.push('/export');
        }, 200);
    }, [router, videoPlan]);

    if (!videoPlan) {
        return (
            <div className="min-h-screen bg-vemux-bg flex items-center justify-center">
                <p className="text-vemux-muted">Loading...</p>
            </div>
        );
    }

    const durationInFrames = videoPlan.duration * 30; // 30 fps

    return (
        <main className="min-h-screen bg-vemux-bg">
            <Navbar />

            <div className="pt-24 pb-12 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-heading text-3xl font-semibold mb-2">Preview</h1>
                        <p className="text-vemux-muted">
                            Preview your demo video. Make adjustments if needed, then export.
                        </p>
                    </div>

                    {/* Video Player */}
                    <GlitchBlock trigger={isGlitching} className="mb-8">
                        <div className="aspect-video bg-vemux-surface border border-vemux-border overflow-hidden">
                            <Player
                                component={DemoVideo}
                                inputProps={{ videoPlan }}
                                durationInFrames={durationInFrames}
                                fps={30}
                                compositionWidth={1920}
                                compositionHeight={1080}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                controls
                                autoPlay={false}
                            />
                        </div>
                    </GlitchBlock>

                    {/* Video info */}
                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-vemux-surface border border-vemux-border">
                            <p className="text-vemux-muted text-xs mb-1">Product</p>
                            <p className="font-medium">{videoPlan.product.name}</p>
                        </div>
                        <div className="p-4 bg-vemux-surface border border-vemux-border">
                            <p className="text-vemux-muted text-xs mb-1">Style</p>
                            <p className="font-medium capitalize">{videoPlan.style}</p>
                        </div>
                        <div className="p-4 bg-vemux-surface border border-vemux-border">
                            <p className="text-vemux-muted text-xs mb-1">Duration</p>
                            <p className="font-medium">{videoPlan.duration} seconds</p>
                        </div>
                        <div className="p-4 bg-vemux-surface border border-vemux-border">
                            <p className="text-vemux-muted text-xs mb-1">Features</p>
                            <p className="font-medium">{videoPlan.features.length} highlights</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <GlitchButton
                            variant="ghost"
                            onClick={() => router.push('/create')}
                        >
                            ← Edit
                        </GlitchButton>

                        <GlitchButton
                            variant="primary"
                            onClick={handleExport}
                        >
                            Export Video →
                        </GlitchButton>
                    </div>
                </div>
            </div>
        </main>
    );
}
