import { motion } from 'framer-motion';

const EvidenceStrip = ({
    validationWindow = 'EPOCH_7 → EPOCH_8',
    baselineRMSE = '0.428 ns',
    stellarRMSE = '0.182 ns',
    improvement = '57.41%'
}) => {
    return (
        <motion.div
            className="flex flex-wrap items-center justify-between gap-6 px-4 py-3 bg-slate-900/50 border border-white/[0.06] font-mono shadow-lg shadow-indigo-500/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                <span className="text-[11px] font-bold text-slate-100 uppercase tracking-wider italic">MISSION_EVIDENCE // PKT_SYNC</span>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 border-l-2 border-slate-800 pl-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">WIN:</span>
                    <span className="text-[11px] font-bold text-slate-200">{validationWindow}</span>
                </div>

                <div className="flex items-center gap-3 border-l-2 border-slate-800 pl-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">BASELINE:</span>
                    <span className="text-[11px] font-bold text-indigo-400">{baselineRMSE}</span>
                </div>

                <div className="flex items-center gap-3 border-l-2 border-slate-800 pl-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">STELLAR_V1:</span>
                    <span className="text-[11px] font-bold text-emerald-500">{stellarRMSE}</span>
                </div>

                <div className="flex items-center gap-3 border-l-2 border-slate-800 pl-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">GAIN:</span>
                    <span className="text-[12px] font-bold text-white bg-emerald-600 px-2 shadow-sm">{improvement}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default EvidenceStrip;
