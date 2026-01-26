'use client';

import { useWizard } from './WizardContext';
import { styleConfigs } from '@/lib/schema';

export function StyleStep() {
    const { videoPlan, updateVideoPlan } = useWizard();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">Visual Style</h2>
                <p className="text-vemux-muted text-sm">Choose a style that matches your brand</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(styleConfigs).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => updateVideoPlan({ style: key })}
                        className={`relative p-4 text-left border transition-all ${videoPlan.style === key
                                ? 'border-vemux-accent bg-vemux-accent/5'
                                : 'border-vemux-border hover:border-vemux-muted'
                            }`}
                    >
                        {/* Style preview */}
                        <div
                            className="h-24 mb-3 flex items-center justify-center text-sm font-medium"
                            style={{ backgroundColor: config.bg, color: config.text }}
                        >
                            <span style={{ color: config.accent }}>Preview</span>
                        </div>

                        {/* Style info */}
                        <div>
                            <h3 className="font-medium mb-1">{config.name}</h3>
                            <p className="text-xs text-vemux-muted">{config.description}</p>
                        </div>

                        {/* Selected indicator */}
                        {videoPlan.style === key && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-vemux-accent text-vemux-bg flex items-center justify-center">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
