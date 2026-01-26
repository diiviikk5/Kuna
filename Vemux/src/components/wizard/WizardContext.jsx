'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { defaultVideoPlan } from '@/lib/schema';

const WizardContext = createContext(null);

export function WizardProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [videoPlan, setVideoPlan] = useState(defaultVideoPlan);

    const steps = [
        { id: 'product', title: 'Product', description: 'URL & basic info' },
        { id: 'assets', title: 'Assets', description: 'Logo & screenshots' },
        { id: 'features', title: 'Features', description: 'Key highlights' },
        { id: 'style', title: 'Style', description: 'Visual theme' },
        { id: 'duration', title: 'Duration', description: 'Video length' },
    ];

    const updateVideoPlan = useCallback((updates) => {
        setVideoPlan(prev => ({
            ...prev,
            ...updates,
        }));
    }, []);

    const updateProduct = useCallback((updates) => {
        setVideoPlan(prev => ({
            ...prev,
            product: { ...prev.product, ...updates },
        }));
    }, []);

    const addFeature = useCallback((feature) => {
        setVideoPlan(prev => ({
            ...prev,
            features: [...prev.features, feature].slice(0, 4),
        }));
    }, []);

    const updateFeature = useCallback((index, updates) => {
        setVideoPlan(prev => ({
            ...prev,
            features: prev.features.map((f, i) => i === index ? { ...f, ...updates } : f),
        }));
    }, []);

    const removeFeature = useCallback((index) => {
        setVideoPlan(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    }, []);

    const nextStep = useCallback(() => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, [steps.length]);

    const prevStep = useCallback(() => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    }, []);

    const goToStep = useCallback((step) => {
        setCurrentStep(step);
    }, []);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    return (
        <WizardContext.Provider value={{
            currentStep,
            steps,
            videoPlan,
            updateVideoPlan,
            updateProduct,
            addFeature,
            updateFeature,
            removeFeature,
            nextStep,
            prevStep,
            goToStep,
            isFirstStep,
            isLastStep,
        }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
}
