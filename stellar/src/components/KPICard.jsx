import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/solid';

const KPICard = ({
    label,
    value,
    unit = '',
    trend = 'stable',
    subtitle,
    icon: Icon,
    color = 'blue',
    delay = 0
}) => {
    const getTrendIcon = () => {
        switch (trend) {
            case 'up':
                return <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-500" />;
            case 'down':
                return <ArrowTrendingDownIcon className="w-5 h-5 text-amber-500" />;
            default:
                return <MinusIcon className="w-5 h-5 text-slate-600" />;
        }
    };

    const getStatusColor = () => {
        switch (color) {
            case 'emerald': return 'text-emerald-500 border-emerald-500/30';
            case 'amber': return 'text-amber-500 border-amber-500/30';
            case 'rose': return 'text-rose-500 border-rose-500/30';
            default: return 'text-white border-slate-700';
        }
    };

    return (
        <motion.div
            className="neo-panel bg-slate-900 group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            {/* Background Data Decal */}
            <div className="absolute -right-4 -bottom-4 opacity-5 font-mono font-black text-8xl italic select-none">
                {label.slice(0, 3)}
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 border-b-2 border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="w-8 h-8 bg-slate-950 border-2 border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-amber-500 transition-colors">
                                <Icon className="w-4 h-4" />
                            </div>
                        )}
                        <span className="text-[11px] font-mono font-black text-slate-300 uppercase tracking-[0.2em] italic">{label}</span>
                    </div>
                    {getTrendIcon()}
                </div>

                <div className="flex items-end gap-3 mb-4">
                    <span className={`text-5xl font-mono font-black tracking-tighter italic ${getStatusColor()}`}>
                        {value}
                    </span>
                    {unit && (
                        <span className="text-xl font-mono font-black text-slate-500 mb-2">{unit}</span>
                    )}
                </div>

                {subtitle && (
                    <div className="flex items-center gap-2 border-t border-slate-800 pt-3 mt-4">
                        <div className="w-1.5 h-1.5 bg-slate-700" />
                        <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">{subtitle}</p>
                    </div>
                )}
            </div>

            {/* Accent Border Line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

export default KPICard;
