import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    BellIcon,
    UserCircleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Header = ({ title, subtitle }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <header className="sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/[0.06]">
            <div className="px-8 py-4 flex items-center justify-between">
                {/* Left: Page Title */}
                <div className="flex items-center gap-5">
                    <h1 className="text-xl font-semibold text-white tracking-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                            <p className="text-[11px] font-medium text-slate-400 tracking-wide">
                                {subtitle}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Clock, Search, Actions */}
                <div className="flex items-center gap-6">
                    {/* UTC Clock */}
                    <div className="text-right border-l border-white/[0.06] pl-6">
                        <div className="font-mono text-lg font-semibold text-white leading-none tracking-tight">
                            {formatTime(currentTime)}
                        </div>
                        <div className="text-[10px] font-medium text-slate-500 mt-1 tracking-wide">
                            {formatDate(currentTime)}
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative hidden lg:block">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-52 pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-200 placeholder-slate-600 rounded-lg focus:border-indigo-500/40 focus:bg-white/[0.06] outline-none transition-all"
                        />
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-1.5">
                        <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
                            <BellIcon className="w-[18px] h-[18px]" />
                        </button>
                        <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all">
                            <Cog6ToothIcon className="w-[18px] h-[18px]" />
                        </button>
                        <button className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all ring-1 ring-indigo-500/20">
                            <UserCircleIcon className="w-[18px] h-[18px]" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
