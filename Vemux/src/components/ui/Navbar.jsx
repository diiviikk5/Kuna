'use client';

import Link from 'next/link';
import { GlitchText } from './Glitch';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-vemux-bg/80 backdrop-blur-md border-b border-vemux-border">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-heading text-xl font-semibold tracking-tight">
                        <GlitchText triggerOnHover>vemux</GlitchText>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        href="/create"
                        className="text-sm text-vemux-muted hover:text-vemux-text transition-colors"
                    >
                        Create
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm text-vemux-muted hover:text-vemux-text transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/auth/login"
                        className="text-sm px-4 py-2 bg-vemux-surface border border-vemux-border hover:border-vemux-muted transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </nav>
    );
}
