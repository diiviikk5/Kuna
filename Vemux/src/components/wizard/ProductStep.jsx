'use client';

import { useWizard } from './WizardContext';

export function ProductStep() {
    const { videoPlan, updateProduct } = useWizard();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">Product Details</h2>
                <p className="text-vemux-muted text-sm">Tell us about your product</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <input
                        type="text"
                        value={videoPlan.product.name}
                        onChange={(e) => updateProduct({ name: e.target.value })}
                        placeholder="e.g., Acme Dashboard"
                        className="w-full px-4 py-3 bg-vemux-surface border border-vemux-border focus:border-vemux-accent outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Product URL</label>
                    <input
                        type="url"
                        value={videoPlan.product.url}
                        onChange={(e) => updateProduct({ url: e.target.value })}
                        placeholder="https://yourproduct.com"
                        className="w-full px-4 py-3 bg-vemux-surface border border-vemux-border focus:border-vemux-accent outline-none transition-colors"
                    />
                    <p className="text-vemux-muted text-xs mt-1">We'll extract metadata from this URL</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Tagline</label>
                    <input
                        type="text"
                        value={videoPlan.product.tagline}
                        onChange={(e) => updateProduct({ tagline: e.target.value })}
                        placeholder="A short description of what your product does"
                        className="w-full px-4 py-3 bg-vemux-surface border border-vemux-border focus:border-vemux-accent outline-none transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
