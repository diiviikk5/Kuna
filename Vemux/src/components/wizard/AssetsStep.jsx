'use client';

import { useState, useRef } from 'react';
import { useWizard } from './WizardContext';

export function AssetsStep() {
    const { videoPlan, updateProduct } = useWizard();
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updateProduct({ logo: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const removeLogo = () => {
        updateProduct({ logo: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">Brand Assets</h2>
                <p className="text-vemux-muted text-sm">Upload your logo and brand colors</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Logo</label>

                    {videoPlan.product.logo ? (
                        <div className="relative w-32 h-32 bg-vemux-surface border border-vemux-border">
                            <img
                                src={videoPlan.product.logo}
                                alt="Logo preview"
                                className="w-full h-full object-contain p-2"
                            />
                            <button
                                onClick={removeLogo}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <div
                            className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${dragActive
                                    ? 'border-vemux-accent bg-vemux-accent/10'
                                    : 'border-vemux-border hover:border-vemux-muted'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={handleClick}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                            />
                            <div className="text-vemux-muted">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm">Drop logo here or click to upload</p>
                                <p className="text-xs mt-1">PNG, JPG, SVG up to 5MB</p>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Primary Brand Color</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={videoPlan.branding?.primaryColor || '#00ffff'}
                            onChange={(e) => updateProduct({ branding: { ...videoPlan.branding, primaryColor: e.target.value } })}
                            className="w-12 h-12 bg-transparent border border-vemux-border cursor-pointer"
                        />
                        <input
                            type="text"
                            value={videoPlan.branding?.primaryColor || '#00ffff'}
                            onChange={(e) => updateProduct({ branding: { ...videoPlan.branding, primaryColor: e.target.value } })}
                            placeholder="#00ffff"
                            className="flex-1 px-4 py-3 bg-vemux-surface border border-vemux-border focus:border-vemux-accent outline-none font-mono text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
