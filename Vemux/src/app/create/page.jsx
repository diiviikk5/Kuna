'use client';

import { useRouter } from 'next/navigation';
import { WizardProvider, useWizard } from '@/components/wizard/WizardContext';
import { ProductStep } from '@/components/wizard/ProductStep';
import { AssetsStep } from '@/components/wizard/AssetsStep';
import { FeaturesStep } from '@/components/wizard/FeaturesStep';
import { StyleStep } from '@/components/wizard/StyleStep';
import { DurationStep } from '@/components/wizard/DurationStep';
import { Navbar } from '@/components/ui/Navbar';
import { GlitchButton, GlitchBlock } from '@/components/ui/Glitch';

function WizardContent() {
    const router = useRouter();
    const {
        currentStep,
        steps,
        isFirstStep,
        isLastStep,
        nextStep,
        prevStep,
        goToStep,
        videoPlan,
    } = useWizard();

    const handleFinish = () => {
        // Store video plan in localStorage for preview page
        localStorage.setItem('vemux-video-plan', JSON.stringify(videoPlan));
        router.push('/preview');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <ProductStep />;
            case 1: return <AssetsStep />;
            case 2: return <FeaturesStep />;
            case 3: return <StyleStep />;
            case 4: return <DurationStep />;
            default: return <ProductStep />;
        }
    };

    return (
        <div className="min-h-screen bg-vemux-bg pt-20">
            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Progress indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <button
                                key={step.id}
                                onClick={() => goToStep(index)}
                                className={`flex-1 text-center py-2 transition-colors ${index === currentStep
                                        ? 'text-vemux-accent'
                                        : index < currentStep
                                            ? 'text-vemux-text'
                                            : 'text-vemux-muted'
                                    }`}
                            >
                                <span className="block font-mono text-xs mb-1">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="block text-sm font-medium">
                                    {step.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="h-px bg-vemux-border relative">
                        <div
                            className="absolute top-0 left-0 h-px bg-vemux-accent transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Step content */}
                <GlitchBlock trigger={true} className="mb-12">
                    {renderStep()}
                </GlitchBlock>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <GlitchButton
                        variant="ghost"
                        onClick={prevStep}
                        className={isFirstStep ? 'invisible' : ''}
                    >
                        ← Back
                    </GlitchButton>

                    {isLastStep ? (
                        <GlitchButton
                            variant="primary"
                            onClick={handleFinish}
                            disabled={!videoPlan.product.name}
                        >
                            Generate Preview →
                        </GlitchButton>
                    ) : (
                        <GlitchButton variant="secondary" onClick={nextStep}>
                            Continue →
                        </GlitchButton>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CreatePage() {
    return (
        <>
            <Navbar />
            <WizardProvider>
                <WizardContent />
            </WizardProvider>
        </>
    );
}
