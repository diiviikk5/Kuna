import { z } from 'zod';

// Video plan schema - the structured output that can be rendered by Remotion
export const VideoSchema = z.object({
    version: z.literal('1.0'),
    product: z.object({
        name: z.string().min(1, 'Product name is required'),
        tagline: z.string().optional(),
        url: z.string().url('Must be a valid URL').optional(),
        logo: z.string().optional(), // Base64 or URL
    }),
    features: z.array(z.object({
        title: z.string().min(1, 'Feature title is required'),
        description: z.string().optional(),
        screenshot: z.string().optional(), // Base64 or URL
    })).max(4, 'Maximum 4 features allowed'),
    style: z.enum(['clean', 'dark', 'developer', 'editorial', 'minimal']),
    branding: z.object({
        primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
        secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    }).optional(),
    duration: z.number().min(30).max(45),
});

// Default empty video plan
export const defaultVideoPlan = {
    version: '1.0',
    product: {
        name: '',
        tagline: '',
        url: '',
        logo: '',
    },
    features: [],
    style: 'dark',
    branding: {
        primaryColor: '#00ffff',
    },
    duration: 35,
};

// Style configurations
export const styleConfigs = {
    clean: {
        name: 'Clean',
        description: 'White background, soft shadows, blue accents',
        bg: '#ffffff',
        text: '#1a1a1a',
        accent: '#3b82f6',
    },
    dark: {
        name: 'Dark',
        description: 'Dark gray/black, neon accents, subtle glow',
        bg: '#0a0a0a',
        text: '#fafafa',
        accent: '#00ffff',
    },
    developer: {
        name: 'Developer',
        description: 'Monospace fonts, terminal aesthetic, green on black',
        bg: '#000000',
        text: '#00ff00',
        accent: '#00ff00',
    },
    editorial: {
        name: 'Editorial',
        description: 'Serif fonts, elegant transitions, muted colors',
        bg: '#f5f5f4',
        text: '#292524',
        accent: '#a8a29e',
    },
    minimal: {
        name: 'Minimal',
        description: 'Maximum whitespace, stark contrast, no decorations',
        bg: '#fafafa',
        text: '#0a0a0a',
        accent: '#0a0a0a',
    },
};

// Duration options
export const durationOptions = [
    { value: 30, label: '30 seconds' },
    { value: 35, label: '35 seconds' },
    { value: 40, label: '40 seconds' },
    { value: 45, label: '45 seconds' },
];
