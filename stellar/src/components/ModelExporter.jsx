import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    DocumentTextIcon,
    CubeIcon,
    TrashIcon,
    CheckCircleIcon,
    ClockIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import { downloadModel, downloadTrainingHistory, downloadPredictions, downloadModelReport, getSavedModels, deleteSavedModel, loadModelFromFile } from '../services/modelManager';

const ModelExporter = ({ model, history, evaluationResults, onModelLoaded }) => {
    const [savedModels, setSavedModels] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    useState(() => {
        setSavedModels(getSavedModels());
    }, []);

    const handleDownloadModel = async () => {
        const metadata = {
            modelId: Date.now().toString(),
            dataSource: 'User Uploaded Data',
            trainingDate: new Date().toISOString(),
            totalSamples: history?.epoch?.length || 0,
            epochs: history?.epoch?.length || 0,
            batchSize: 32,
            learningRate: 0.001,
            optimizer: 'Adam',
            lossFunction: 'MSE',
            sequenceLength: 96,
            features: 4,
            evaluationResults
        };

        await downloadModel(model, metadata, `stellar-model-${Date.now()}.json`);
    };

    const handleDownloadHistory = () => {
        if (history && history.epoch) {
            const historyData = history.epoch.map((epoch, i) => ({
                epoch,
                trainLoss: history.trainLoss[i],
                valLoss: history.valLoss[i],
                trainRMSE: history.trainRMSE[i],
                valRMSE: history.valRMSE[i]
            }));
            downloadTrainingHistory(historyData, `training-history-${Date.now()}.csv`);
        }
    };

    const handleDownloadPredictions = () => {
        if (evaluationResults?.predictions) {
            downloadPredictions(evaluationResults.predictions, `predictions-${Date.now()}.csv`);
        }
    };

    const handleDownloadReport = () => {
        const metadata = {
            modelId: Date.now().toString(),
            dataSource: 'User Uploaded Data',
            totalSamples: history?.epoch?.length || 0,
            trainingSamples: Math.floor((history?.epoch?.length || 0) * 0.8),
            validationSamples: Math.floor((history?.epoch?.length || 0) * 0.2),
            epochs: history?.epoch?.length || 0,
            batchSize: 32,
            learningRate: 0.001,
            optimizer: 'Adam',
            lossFunction: 'MSE',
            sequenceLength: 96,
            features: 4,
            trainingDuration: 'N/A'
        };

        downloadModelReport(metadata, history, evaluationResults, `model-report-${Date.now()}.txt`);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadStatus('loading');

        try {
            const result = await loadModelFromFile(file);
            if (onModelLoaded) {
                onModelLoaded(result.model, result.metadata);
            }
            setUploadStatus('success');
            setTimeout(() => setUploadStatus(null), 3000);
        } catch (error) {
            console.error('Error loading model:', error);
            setUploadStatus('error');
            setTimeout(() => setUploadStatus(null), 3000);
        }
    };

    const handleDeleteModel = (modelId) => {
        if (confirm('Are you sure you want to delete this saved model?')) {
            deleteSavedModel(modelId);
            setSavedModels(getSavedModels());
        }
    };

    const ExportButton = ({ icon: Icon, label, onClick, disabled = false }) => (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`flex items-center gap-3 px-4 py-4 border-2 font-semibold text-xs uppercase tracking-wider transition-all
                ${disabled 
                    ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-[#020617] border-slate-700 text-slate-300 hover:bg-indigo-500 hover:text-black hover:border-indigo-500/30 hover:shadow-lg shadow-indigo-500/10'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </motion.button>
    );

    return (
        <div className="space-y-6">
            {/* Model Export */}
            <div className="neo-panel bg-[#0f172a]/80 border border-white/[0.06] p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                    <ArrowDownTrayIcon className="w-5 h-5 text-indigo-400" />
                    MODEL_EXPORT_MODULE
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ExportButton
                        icon={CubeIcon}
                        label="EXPORT_MODEL"
                        onClick={handleDownloadModel}
                        disabled={!model}
                    />
                    <ExportButton
                        icon={DocumentTextIcon}
                        label="TRAINING_HISTORY"
                        onClick={handleDownloadHistory}
                        disabled={!history}
                    />
                    <ExportButton
                        icon={ChartBarIcon}
                        label="PREDICTIONS_CSV"
                        onClick={handleDownloadPredictions}
                        disabled={!evaluationResults}
                    />
                    <ExportButton
                        icon={DocumentTextIcon}
                        label="MODEL_REPORT"
                        onClick={handleDownloadReport}
                        disabled={!history}
                    />
                </div>
            </div>

            {/* Model Import */}
            <div className="neo-panel bg-[#0f172a]/80 border border-white/[0.06] p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                    <ArrowUpTrayIcon className="w-5 h-5 text-indigo-400" />
                    MODEL_IMPORT_MODULE
                </h3>

                <div className="flex gap-4">
                    <label className="flex-1">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`h-14 border-2 border-dashed flex items-center justify-center cursor-pointer font-semibold text-xs uppercase tracking-wider transition-all
                                ${uploadStatus === 'loading'
                                    ? 'border-indigo-500/30 bg-indigo-400/5 text-indigo-400'
                                    : 'border-slate-700 bg-[#020617] text-slate-300 hover:border-indigo-500/30 hover:bg-indigo-400/5'
                                }`}
                        >
                            {uploadStatus === 'loading' && (
                                <div className="animate-spin mr-3">
                                    <ClockIcon className="w-5 h-5" />
                                </div>
                            )}
                            {uploadStatus === 'success' && (
                                <CheckCircleIcon className="w-5 h-5 mr-3 text-emerald-500" />
                            )}
                            {uploadStatus === 'error' && (
                                <div className="mr-3 text-rose-500">✗</div>
                            )}
                            {uploadStatus === 'loading' ? 'LOADING_MODEL...' :
                             uploadStatus === 'success' ? 'MODEL_LOADED_SUCCESSFULLY' :
                             uploadStatus === 'error' ? 'FAILED_TO_LOAD_MODEL' :
                             'CLICK_TO_UPLOAD_MODEL'}
                        </motion.div>
                    </label>
                </div>
            </div>

            {/* Saved Models */}
            <div className="neo-panel bg-[#0f172a]/80 border border-white/[0.06] p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                    <DocumentTextIcon className="w-5 h-5 text-indigo-400" />
                    SAVED_MODELS ({savedModels.length})
                </h3>

                {savedModels.length === 0 ? (
                    <div className="text-center py-12">
                        <CubeIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-sm font-mono text-slate-500 uppercase tracking-wider">
                            No saved models found
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {savedModels.map((savedModel, i) => (
                            <motion.div
                                key={savedModel.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#020617] border border-white/[0.06] p-4 hover:border-amber-500/50 transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-white mb-1">
                                            {savedModel.modelName || `Model #${savedModel.id.slice(-4)}`}
                                        </div>
                                        <div className="flex gap-4 text-[10px] font-mono text-slate-400">
                                            <span>{savedModel.dataSource || 'Unknown Source'}</span>
                                            <span>Epochs: {savedModel.epochs || 0}</span>
                                            <span>{new Date(savedModel.savedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteModel(savedModel.id)}
                                        className="px-3 py-1 bg-rose-600/10 border border-rose-600/50 text-rose-500 hover:bg-rose-600 hover:text-white transition-all font-mono text-[10px] font-bold uppercase"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelExporter;
