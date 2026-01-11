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
        <header className="sticky top-0 z-30 bg-slate-900 border-b-2 border-slate-700">
            <div className="px-8 py-3 flex items-center justify-between">
                {/* Left: Page Title */}
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-black text-white uppercase tracking-widest font-mono">
                        {title}
                    </h1>
                    {subtitle && (
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                            <p className="text-[11px] font-mono font-black text-slate-300 tracking-widest uppercase">
                                {subtitle}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Clock, Search, Actions */}
                <div className="flex items-center gap-8">
                    {/* UTC Clock */}
                    <div className="text-right border-l-2 border-slate-700 pl-6">
                        <div className="font-mono text-2xl font-black text-amber-500 leading-none">
                            {formatTime(currentTime)}
                        </div>
                        <div className="font-mono text-[10px] font-black text-slate-300 uppercase mt-1 tracking-widest italic">
                            SYSTEM_SYNC // {formatDate(currentTime)}
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative hidden lg:block">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="OPERATOR_SEARCH..."
                            className="w-64 pl-10 pr-4 py-2 bg-slate-950 border-2 border-slate-700 text-xs font-mono font-black text-slate-100 placeholder-slate-500 focus:border-amber-500 outline-none transition-all shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]"
                        />
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-slate-800 border-2 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                            <BellIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-slate-800 border-2 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                            <Cog6ToothIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-amber-600 text-black border-2 border-amber-700 hover:bg-amber-500 transition-all">
                            <UserCircleIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
