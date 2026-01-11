import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    GlobeAltIcon,
    BeakerIcon,
    ChartBarIcon,
    DocumentArrowDownIcon,
    SignalIcon,
    CloudArrowUpIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Command Deck', href: '/dashboard', icon: HomeIcon },
    { name: 'Satellite Console', href: '/console', icon: GlobeAltIcon },
    { name: 'Forecast Lab', href: '/forecast-lab', icon: BeakerIcon },
    { name: 'Scientist Workflow', href: '/scientist-workflow', icon: CloudArrowUpIcon },
    { name: 'Uncertainty & Residuals', href: '/residuals', icon: ChartBarIcon },
    { name: 'Export Bulletin', href: '/export', icon: DocumentArrowDownIcon },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r-2 border-slate-700 z-40">
            {/* Logo Section */}
            <div className="p-8 border-b-2 border-slate-700 bg-slate-800 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 border-2 border-amber-500/50 flex items-center justify-center rotate-45 shadow-[4px_4px_0px_#000]">
                        <SignalIcon className="w-8 h-8 text-amber-500 -rotate-45" />
                    </div>
                    <div>
                        <h1 className="font-mono font-black text-2xl tracking-tighter uppercase italic text-white">
                            STELLAR
                        </h1>
                        <p className="text-[11px] font-mono font-black text-slate-300 tracking-widest leading-none">
                            CONSOLE // V1.0
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-3 mt-4">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className="block"
                        >
                            <motion.div
                                className={`
                                    flex items-center gap-4 px-4 py-3 border-2 transition-all font-mono font-black tracking-tight
                                    ${isActive
                                        ? 'bg-amber-600 text-black border-amber-700 shadow-[4px_4px_0px_#000]'
                                        : 'bg-transparent text-slate-300 border-transparent hover:bg-slate-800 hover:text-white hover:border-slate-700'
                                    }
                                `}
                                whileTap={{ scale: 0.95 }}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                                <span className="text-xs uppercase whitespace-nowrap">{item.name}</span>
                            </motion.div>
                        </NavLink>
                    );
                })}
            </nav>

            {/* System Status */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t-2 border-slate-700 bg-slate-950/50">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-mono font-black text-[11px] tracking-widest uppercase italic">SYS_LINK // ACTIVE</span>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono font-black text-slate-400">
                            <span>RE_PROCESSING_LOAD</span>
                            <span className="text-amber-500">23%</span>
                        </div>
                        <div className="h-1.5 border border-slate-800 bg-slate-900">
                            <div className="h-full bg-slate-400" style={{ width: '23%' }} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono font-black text-slate-500 border-t border-slate-800 pt-3">
                        <span>LAST_SYNC</span>
                        <span className="text-slate-300">
                            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}_UTC
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
