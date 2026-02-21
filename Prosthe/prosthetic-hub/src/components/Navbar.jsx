"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
    { label: "Platform", href: "/#capabilities" },
    { label: "Use Cases", href: "/#use-cases" },
    { label: "Integrations", href: "/integrations" },
    { label: "Docs", href: "/docs" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[rgba(5,5,8,0.8)] backdrop-blur-md border-b border-white/[0.06]"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 no-underline">
                    <span className="font-['Orbitron'] text-white text-base font-semibold tracking-[0.12em] uppercase">
                        Prosthetic
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="px-4 py-2 text-sm text-white/75 hover:text-white transition-colors duration-200 no-underline"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/dashboard"
                        className="ml-4 px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 no-underline flex items-center gap-1.5"
                    >
                        Launch Hub
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </nav>

                {/* Mobile */}
                <button
                    className="md:hidden p-2 text-white/60"
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-[rgba(5,5,8,0.95)] backdrop-blur-lg border-t border-white/[0.06] px-6 py-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block py-3 text-sm text-white/75 hover:text-white transition-colors no-underline border-b border-white/[0.04]"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="mt-4 block text-center px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full no-underline"
                    >
                        Launch Hub
                    </Link>
                </div>
            )}
        </header>
    );
}
