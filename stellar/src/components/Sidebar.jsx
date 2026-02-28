import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    GlobeAltIcon,
    BeakerIcon,
    ChartBarIcon,
    DocumentArrowDownIcon,
    SignalIcon,
    CloudArrowUpIcon,
    CloudArrowDownIcon,
    CubeTransparentIcon,
    CodeBracketIcon,
    ChatBubbleLeftRightIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Command Deck', href: '/dashboard', icon: HomeIcon },
    { name: 'Scientist Workflow', href: '/scientist-workflow', icon: CloudArrowUpIcon },
    { name: 'Satellite Console', href: '/console', icon: GlobeAltIcon },
    { name: 'Forecast Lab', href: '/forecast-lab', icon: BeakerIcon },
    { name: 'divider', href: '', icon: null, label: 'Agentic Platform' },
    { name: 'Agent Workflows', href: '/agents', icon: CpuChipIcon },
    { name: 'Developer SDK', href: '/sdk', icon: CodeBracketIcon },
    { name: 'Bhuvan Connect', href: '/bhuvan', icon: CloudArrowDownIcon },
    { name: 'WhatsApp Bot', href: '/whatsapp', icon: ChatBubbleLeftRightIcon },
    { name: 'divider', href: '', icon: null, label: 'Analysis' },
    { name: 'Uncertainty & Residuals', href: '/residuals', icon: ChartBarIcon },
    { name: 'Export Bulletin', href: '/export', icon: DocumentArrowDownIcon },
    { name: 'Model Marketplace', href: '/marketplace', icon: CubeTransparentIcon },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#020617]/95 backdrop-blur-3xl border-r border-white/[0.06] z-40 flex flex-col">
            {/* Logo Section */}
            <div className="px-6 py-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/15 ring-1 ring-white/10">
                        <SignalIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-[17px] tracking-tight text-white leading-none">
                            STELLAR
                        </h1>
                        <p className="text-[10px] font-medium text-slate-500 tracking-wider mt-1 leading-none">
                            PLATFORM V2.0
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5">
                {navigation.map((item, index) => {
                    if (item.name === 'divider') {
                        return (
                            <div key={`divider-${index}`} className="pt-5 pb-2 px-3">
                                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide block">
                                    {item.label || 'Tools'}
                                </span>
                            </div>
                        );
                    }
                    const isActive = location.pathname === item.href;
                    return (
                        <NavLink key={item.name} to={item.href} className="block">
                            <motion.div
                                className={`
                                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-[13px] font-medium
                                    ${isActive
                                        ? 'bg-white/[0.08] text-white'
                                        : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300'
                                    }
                                `}
                                whileTap={{ scale: 0.98 }}
                            >
                                <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />
                                <span className="truncate">{item.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
                                )}
                            </motion.div>
                        </NavLink>
                    );
                })}
            </nav>

            {/* System Status Footer */}
            <div className="px-5 py-4 border-t border-white/[0.06] bg-[#020617]/80">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-600 font-medium tracking-wide">System</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-emerald-500/90 font-medium">Online</span>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-600">
                        <span>Last sync</span>
                        <span className="text-slate-500 font-mono">
                            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} UTC
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
