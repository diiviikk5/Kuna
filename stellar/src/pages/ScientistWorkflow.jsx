import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CloudArrowUpIcon,
    CpuChipIcon,
    ChartBarIcon,
    DocumentTextIcon,
    CubeIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    BeakerIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Header } from '../components';
import DataUpload from '../components/DataUpload';
import TrainingDashboard from '../components/TrainingDashboard';
import ModelEvaluation from '../components/ModelEvaluation';
import ModelExporter from '../components/ModelExporter';
import ISROEvaluationPanel from '../components/ISROEvaluationPanel';
import { prepareTrainingSequences, normalizeData } from '../utils/validation';
import { evaluateModel, predictFuture, AI_CONFIG } from '../services/aiService';
import { downloadPredictions, downloadTrainingHistory } from '../services/modelManager';

const ScientistWorkflow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isroEvalData, setIsroEvalData] = useState(null);
    const [workflowData, setWorkflowData] = useState({
        data: null,
        statistics: null,
        fileName: null,
        config: {
            epochs: 50,
            batchSize: 32,
            learningRate: 0.001,
            validationSplit: 0.2
        },
        trainingResult: null,
        evaluationResults: null,
        model: null
    });

    const steps = [
        { id: 1, title: 'UPLOAD', subtitle: 'Load CSV Data', icon: CloudArrowUpIcon },
        { id: 2, title: 'CONFIGURE', subtitle: 'Set Training Parameters', icon: BeakerIcon },
        { id: 3, title: 'TRAIN', subtitle: 'Execute ML Training', icon: CpuChipIcon },
        { id: 4, title: 'EVALUATE', subtitle: 'Analyze Performance', icon: ChartBarIcon },
        { id: 5, title: 'DEPLOY', subtitle: 'Export & Deploy', icon: CubeIcon }
    ];

    const handleDataLoaded = (dataInfo) => {
        setWorkflowData(prev => ({
            ...prev,
            data: dataInfo.data,
            statistics: dataInfo.statistics,
            fileName: dataInfo.fileName
        }));
        setCurrentStep(1);
    };

    const handleTrainingComplete = (result) => {
        if (result.success) {
            setWorkflowData(prev => ({
                ...prev,
                trainingResult: result,
                model: result.normalizationParams
            }));
            setCurrentStep(3);
        }
    };

    const handleEvaluate = async () => {
        if (!workflowData.data || !workflowData.trainingResult) return;

        try {
            const result = await evaluateModel(
                workflowData.data,
                workflowData.trainingResult.normalizationParams
            );

            // Generate ISRO evaluation data
            const data = workflowData.data;
            const seqLen = AI_CONFIG?.sequenceLength || 48;

            if (data.length > seqLen + 10) {
                console.log('🔬 Generating ISRO evaluation data from user data...');
                const predictions = [];
                const actuals = [];
                const numEvalSamples = Math.min(50, data.length - seqLen);

                for (let i = 0; i < numEvalSamples; i++) {
                    const sequence = data.slice(i, i + seqLen);
                    const actualSample = data[i + seqLen];

                    if (sequence.length === seqLen && actualSample) {
                        try {
                            const pred = await predictFuture(sequence);
                            if (pred) {
                                predictions.push({
                                    x: Array.isArray(pred.radial) ? pred.radial[0] : (pred.radial || 0),
                                    y: Array.isArray(pred.along) ? pred.along[0] : (pred.along || 0),
                                    z: Array.isArray(pred.cross) ? pred.cross[0] : (pred.cross || 0),
                                    clock: Array.isArray(pred.clock) ? pred.clock[0] : (pred.clock || 0)
                                });
                                actuals.push({
                                    x: actualSample.radial || actualSample.x_error || 0,
                                    y: actualSample.along || actualSample.y_error || 0,
                                    z: actualSample.cross || actualSample.z_error || 0,
                                    clock: actualSample.clock || actualSample.clock_error || 0
                                });
                            }
                        } catch (e) {
                            console.warn(`Prediction ${i} failed:`, e);
                        }
                    }
                }

                if (predictions.length > 0) {
                    setIsroEvalData({ predictions, actuals });
                    console.log(`✅ ISRO evaluation ready with ${predictions.length} samples`);
                }
            }

            setWorkflowData(prev => ({
                ...prev,
                evaluationResults: result
            }));
            setCurrentStep(4);
        } catch (error) {
            console.error('Evaluation error:', error);
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 0:
                return workflowData.data !== null;
            case 1:
                return workflowData.data !== null;
            case 2:
                return workflowData.data !== null;
            case 3:
                return workflowData.trainingResult !== null;
            case 4:
                return true;
            default:
                return false;
        }
    };

    const ConfigOption = ({ label, value, options, onChange }) => (
        <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 bg-[#020617] border border-white/[0.08] text-white text-sm font-medium rounded-xl focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617]">
            <Header
                title="Scientist Workflow"
                subtitle="Complete ML Pipeline for GNSS Error Prediction"
            />

            <div className="p-8 max-w-7xl mx-auto">
                {/* Step Navigation */}
                <div className="flex bg-[#0f172a]/60 backdrop-blur-xl border border-white/[0.06] rounded-2xl mb-8 overflow-x-auto p-1.5">
                    {steps.map((step, index) => (
                        <button
                            key={step.id}
                            onClick={() => index <= currentStep && setCurrentStep(index)}
                            disabled={index > currentStep}
                            className={`
                                relative flex items-center gap-3 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider
                                transition-all min-w-[170px] rounded-xl
                                ${index === currentStep
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                    : index < currentStep
                                        ? 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                                        : 'text-slate-600 cursor-not-allowed'
                                }
                            `}
                        >
                            <step.icon className={`w-4 h-4 ${index === currentStep ? 'text-white' : ''}`} />
                            <div className="flex flex-col items-start">
                                <span className="leading-none">{step.title}</span>
                                <span className={`text-[9px] font-medium leading-none mt-1 ${index === currentStep ? 'text-indigo-200' : 'text-slate-600'}`}>{step.subtitle}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <ChevronRightIcon className="w-3 h-3 ml-auto text-slate-700" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {/* Step 1: Data Upload */}
                    {currentStep === 0 && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <DataUpload onDataLoaded={handleDataLoaded} />
                        </motion.div>
                    )}

                    {/* Step 2: Configure */}
                    {currentStep === 1 && (
                        <motion.div
                            key="configure"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 shadow-lg">
                                <h3 className="text-sm font-semibold text-white tracking-wide mb-6 flex items-center gap-3">
                                    <BeakerIcon className="w-5 h-5 text-indigo-400" />
                                    Training Configuration
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <ConfigOption
                                        label="EPOCHS"
                                        value={workflowData.config.epochs}
                                        options={[
                                            { value: 10, label: '10 EPOCHS (QUICK)' },
                                            { value: 25, label: '25 EPOCHS (FAST)' },
                                            { value: 50, label: '50 EPOCHS (RECOMMENDED)' },
                                            { value: 100, label: '100 EPOCHS (THOROUGH)' }
                                        ]}
                                        onChange={(e) => setWorkflowData(prev => ({
                                            ...prev,
                                            config: { ...prev.config, epochs: parseInt(e.target.value) }
                                        }))}
                                    />

                                    <ConfigOption
                                        label="BATCH_SIZE"
                                        value={workflowData.config.batchSize}
                                        options={[
                                            { value: 16, label: '16 (SMALL)' },
                                            { value: 32, label: '32 (MEDIUM)' },
                                            { value: 64, label: '64 (LARGE)' },
                                            { value: 128, label: '128 (XL)' }
                                        ]}
                                        onChange={(e) => setWorkflowData(prev => ({
                                            ...prev,
                                            config: { ...prev.config, batchSize: parseInt(e.target.value) }
                                        }))}
                                    />

                                    <ConfigOption
                                        label="LEARNING_RATE"
                                        value={workflowData.config.learningRate}
                                        options={[
                                            { value: 0.0001, label: '0.0001 (CONSERVATIVE)' },
                                            { value: 0.001, label: '0.001 (RECOMMENDED)' },
                                            { value: 0.01, label: '0.01 (AGGRESSIVE)' }
                                        ]}
                                        onChange={(e) => setWorkflowData(prev => ({
                                            ...prev,
                                            config: { ...prev.config, learningRate: parseFloat(e.target.value) }
                                        }))}
                                    />

                                    <ConfigOption
                                        label="VALIDATION_SPLIT"
                                        value={workflowData.config.validationSplit}
                                        options={[
                                            { value: 0.1, label: '10% (MOST DATA)' },
                                            { value: 0.2, label: '20% (BALANCED)' },
                                            { value: 0.3, label: '30% (MORE VALIDATION)' }
                                        ]}
                                        onChange={(e) => setWorkflowData(prev => ({
                                            ...prev,
                                            config: { ...prev.config, validationSplit: parseFloat(e.target.value) }
                                        }))}
                                    />
                                </div>

                                {/* Data Summary */}
                                {workflowData.statistics && (
                                    <div className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-xl">
                                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                                            Dataset Summary
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total Samples</div>
                                                <div className="text-lg font-bold text-white">{workflowData.statistics.count}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Duration</div>
                                                <div className="text-lg font-bold text-white">{workflowData.statistics.timeRange.durationDays.toFixed(1)} days</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Train Samples</div>
                                                <div className="text-lg font-bold text-emerald-400">
                                                    {Math.floor(workflowData.statistics.count * (1 - workflowData.config.validationSplit))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Val Samples</div>
                                                <div className="text-lg font-bold text-amber-400">
                                                    {Math.floor(workflowData.statistics.count * workflowData.config.validationSplit)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Training */}
                    {currentStep === 2 && (
                        <motion.div
                            key="training"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <TrainingDashboard
                                data={workflowData.data}
                                config={workflowData.config}
                                onTrainingComplete={handleTrainingComplete}
                            />
                        </motion.div>
                    )}

                    {/* Step 4: Evaluation */}
                    {currentStep === 3 && (
                        <motion.div
                            key="evaluation"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-10 text-center shadow-lg">
                                <h3 className="text-base font-semibold text-white mb-4 flex items-center justify-center gap-3">
                                    <ChartBarIcon className="w-5 h-5 text-indigo-400" />
                                    Model Evaluation Ready
                                </h3>

                                <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                                    Training has been completed. Click below to evaluate the model on test data and generate performance metrics.
                                </p>

                                <button
                                    onClick={handleEvaluate}
                                    className="px-8 py-3.5 bg-indigo-500 text-white font-semibold text-sm rounded-xl hover:bg-indigo-400 shadow-lg shadow-indigo-500/20 transition-all inline-flex items-center gap-3 active:scale-[0.98]"
                                >
                                    <ChartBarIcon className="w-5 h-5" />
                                    Evaluate Model
                                    <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {workflowData.trainingResult && (
                                <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 shadow-lg">
                                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-indigo-500 rounded-full" />
                                        Training Summary
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Best Epoch</div>
                                            <div className="text-xl font-bold text-white mt-1">
                                                {workflowData.trainingResult.metrics.bestEpoch}
                                            </div>
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Best Loss</div>
                                            <div className="text-xl font-bold text-emerald-400 mt-1">
                                                {workflowData.trainingResult.metrics.bestTrainLoss.toFixed(6)}
                                            </div>
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Val Loss</div>
                                            <div className="text-xl font-bold text-amber-400 mt-1">
                                                {workflowData.trainingResult.metrics.bestValLoss?.toFixed(6) || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Duration</div>
                                            <div className="text-xl font-bold text-indigo-400 mt-1">
                                                {workflowData.trainingResult.metrics.trainingDurationFormatted}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Step 4: Evaluation Results */}
                    {currentStep === 4 && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            {/* ISRO Evaluation Panel */}
                            {isroEvalData && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                        <BeakerIcon className="w-6 h-6 text-indigo-400" />
                                        ISRO Evaluation Metrics
                                    </h3>
                                    <ISROEvaluationPanel
                                        predictions={isroEvalData.predictions}
                                        actuals={isroEvalData.actuals}
                                    />
                                </div>
                            )}

                            {/* Standard Model Evaluation */}
                            <ModelEvaluation
                                evaluationResults={workflowData.evaluationResults}
                                onExport={(results) => downloadPredictions(results.predictions)}
                            />
                        </motion.div>
                    )}

                    {/* Step 5: Export/Deploy */}
                    {currentStep === 5 && (
                        <motion.div
                            key="deploy"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <ModelExporter
                                model={workflowData.model}
                                history={workflowData.trainingResult?.history}
                                evaluationResults={workflowData.evaluationResults}
                                onModelLoaded={(model, metadata) => {
                                    console.log('Model loaded:', model, metadata);
                                    alert('Model loaded successfully! (Full integration pending)');
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/[0.06]">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-5 py-2.5 font-semibold text-sm rounded-xl transition-all flex items-center gap-2
                            ${currentStep === 0
                                ? 'bg-white/[0.03] text-slate-600 cursor-not-allowed border border-white/[0.04]'
                                : 'bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:bg-white/[0.1] hover:text-white'
                            }`}
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                        Previous
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={!canProceed() || currentStep === 2 || currentStep === 5}
                        className={`px-5 py-2.5 font-semibold text-sm rounded-xl transition-all flex items-center gap-2
                            ${!canProceed() || currentStep === 2 || currentStep === 5
                                ? 'bg-white/[0.03] text-slate-600 cursor-not-allowed border border-white/[0.04]'
                                : 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/20'
                            }`}
                    >
                        Next
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScientistWorkflow;
