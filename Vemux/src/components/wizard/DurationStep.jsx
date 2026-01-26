'use client';

import { useWizard } from './WizardContext';
import { durationOptions } from '@/lib/schema';

export function DurationStep() {
    const { videoPlan, updateVideoPlan } = useWizard();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">Video Duration</h2>
                <p className="text-vemux-muted text-sm">Choose how long your demo should be</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {durationOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => updateVideoPlan({ duration: option.value })}
                            className={`py-4 px-3 text-center border transition-all ${videoPlan.duration === option.value
                                    ? 'border-vemux-accent bg-vemux-accent/5 text-vemux-accent'
                                    : 'border-vemux-border hover:border-vemux-muted'
                                }`}
                        >
                            <span className="block text-2xl font-heading font-semibold mb-1">
                                {option.value}s
                            </span>
                            <span className="block text-xs text-vemux-muted">
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="p-4 bg-vemux-surface border border-vemux-border">
                    <h4 className="font-medium mb-2">Duration Guide</h4>
                    <ul className="text-sm text-vemux-muted space-y-1">
                        <li>• <strong>30s</strong> — Cold outreach, quick hooks</li>
                        <li>• <strong>35s</strong> — Landing pages (recommended)</li>
                        <li>• <strong>40s</strong> — Product launches</li>
                        <li>• <strong>45s</strong> — Investor demos, detailed walkthroughs</li>
                    </ul>
                </div>
            </div>

            {/* Summary preview */}
            <div className="p-6 bg-vemux-surface border border-vemux-border">
                <h4 className="font-medium mb-4">Summary</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-vemux-muted">Product</span>
                        <span>{videoPlan.product.name || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-vemux-muted">Features</span>
                        <span>{videoPlan.features.length} / 4</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-vemux-muted">Style</span>
                        <span className="capitalize">{videoPlan.style}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-vemux-muted">Duration</span>
                        <span>{videoPlan.duration} seconds</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
