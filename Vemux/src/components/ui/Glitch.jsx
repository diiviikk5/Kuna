'use client';

import { useState, useEffect } from 'react';

export function GlitchText({ children, className = '', triggerOnHover = false }) {
    const [isGlitching, setIsGlitching] = useState(false);

    const triggerGlitch = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
    };

    return (
        <span
            className={`inline-block ${isGlitching ? 'animate-glitch-text' : ''} ${className}`}
            onMouseEnter={triggerOnHover ? triggerGlitch : undefined}
        >
            {children}
        </span>
    );
}

export function GlitchBlock({ children, className = '', trigger = false }) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        if (trigger) {
            setIsGlitching(true);
            const timer = setTimeout(() => setIsGlitching(false), 300);
            return () => clearTimeout(timer);
        }
    }, [trigger]);

    return (
        <div className={`${isGlitching ? 'animate-glitch' : ''} ${className}`}>
            {children}
        </div>
    );
}

export function GlitchButton({ children, onClick, className = '', variant = 'primary' }) {
    const [isGlitching, setIsGlitching] = useState(false);

    const handleClick = (e) => {
        setIsGlitching(true);
        setTimeout(() => {
            setIsGlitching(false);
            onClick?.(e);
        }, 200);
    };

    const baseStyles = 'relative px-6 py-3 font-medium transition-all duration-200 ease-out';
    const variants = {
        primary: 'bg-vemux-accent text-vemux-bg hover:bg-vemux-accent-dim border border-vemux-accent',
        secondary: 'bg-transparent text-vemux-text hover:bg-vemux-surface border border-vemux-border hover:border-vemux-muted',
        ghost: 'bg-transparent text-vemux-muted hover:text-vemux-text',
    };

    return (
        <button
            onClick={handleClick}
            className={`${baseStyles} ${variants[variant]} ${isGlitching ? 'animate-glitch' : ''} ${className}`}
        >
            {children}
        </button>
    );
}
