'use client';

import { useState } from 'react';
import { useWizard } from './WizardContext';

export function FeaturesStep() {
    const { videoPlan, addFeature, updateFeature, removeFeature } = useWizard();
    const [newFeature, setNewFeature] = useState({ title: '', description: '' });

    const handleAddFeature = () => {
        if (newFeature.title.trim() && videoPlan.features.length < 4) {
            addFeature(newFeature);
            setNewFeature({ title: '', description: '' });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddFeature();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">Key Features</h2>
                <p className="text-vemux-muted text-sm">Add up to 4 features to highlight in your demo</p>
            </div>

            {/* Existing features */}
            <div className="space-y-3">
                {videoPlan.features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-vemux-surface border border-vemux-border"
                    >
                        <span className="flex-shrink-0 w-6 h-6 bg-vemux-accent text-vemux-bg text-xs font-medium flex items-center justify-center">
                            {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <input
                                type="text"
                                value={feature.title}
                                onChange={(e) => updateFeature(index, { title: e.target.value })}
                                className="w-full bg-transparent text-base font-medium outline-none mb-1"
                                placeholder="Feature title"
                            />
                            <input
                                type="text"
                                value={feature.description || ''}
                                onChange={(e) => updateFeature(index, { description: e.target.value })}
                                className="w-full bg-transparent text-sm text-vemux-muted outline-none"
                                placeholder="Brief description (optional)"
                            />
                        </div>
                        <button
                            onClick={() => removeFeature(index)}
                            className="flex-shrink-0 w-8 h-8 text-vemux-muted hover:text-red-400 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Add new feature */}
            {videoPlan.features.length < 4 && (
                <div className="space-y-3">
                    <div className="p-4 border border-dashed border-vemux-border">
                        <input
                            type="text"
                            value={newFeature.title}
                            onChange={(e) => setNewFeature(prev => ({ ...prev, title: e.target.value }))}
                            onKeyDown={handleKeyDown}
                            placeholder="Feature title"
                            className="w-full bg-transparent text-base outline-none mb-2"
                        />
                        <input
                            type="text"
                            value={newFeature.description}
                            onChange={(e) => setNewFeature(prev => ({ ...prev, description: e.target.value }))}
                            onKeyDown={handleKeyDown}
                            placeholder="Brief description (optional)"
                            className="w-full bg-transparent text-sm text-vemux-muted outline-none"
                        />
                    </div>
                    <button
                        onClick={handleAddFeature}
                        disabled={!newFeature.title.trim()}
                        className="w-full py-3 border border-vemux-border text-vemux-muted hover:text-vemux-text hover:border-vemux-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        + Add Feature
                    </button>
                </div>
            )}

            {videoPlan.features.length >= 4 && (
                <p className="text-vemux-muted text-sm text-center py-2">
                    Maximum 4 features reached
                </p>
            )}
        </div>
    );
}
