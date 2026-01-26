// Video Plan Schema for Remotion rendering
// This defines the structure for each client video project

export const createVideoPlan = ({
    clientName,
    productName,
    tagline,
    features = [],
    style = 'dark',
    duration = 30,
    cta = 'Get Started',
    colors = {},
    assets = {}
}) => {
    // Calculate timing based on duration
    const fps = 30;
    const totalFrames = duration * fps;

    // Scene distribution
    const scenes = {
        intro: { start: 0, duration: Math.floor(totalFrames * 0.15) },
        tagline: { start: Math.floor(totalFrames * 0.15), duration: Math.floor(totalFrames * 0.15) },
        features: { start: Math.floor(totalFrames * 0.30), duration: Math.floor(totalFrames * 0.45) },
        cta: { start: Math.floor(totalFrames * 0.75), duration: Math.floor(totalFrames * 0.25) },
    };

    // Style presets
    const styleConfigs = {
        clean: {
            background: '#ffffff',
            text: '#0a0a0a',
            accent: '#3b82f6',
            surface: '#f5f5f5',
        },
        dark: {
            background: '#0a0a0a',
            text: '#ffffff',
            accent: '#8b5cf6',
            surface: '#1a1a1a',
        },
        developer: {
            background: '#0f172a',
            text: '#e2e8f0',
            accent: '#22c55e',
            surface: '#1e293b',
        },
        minimal: {
            background: '#fafafa',
            text: '#171717',
            accent: '#000000',
            surface: '#f5f5f5',
        },
        gradient: {
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            text: '#ffffff',
            accent: '#fcd34d',
            surface: 'rgba(255,255,255,0.1)',
        },
    };

    return {
        id: `${clientName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        client: clientName,
        product: productName,
        tagline,
        features: features.slice(0, 4), // Max 4 features
        cta,
        style,
        colors: { ...styleConfigs[style], ...colors },
        duration,
        fps,
        totalFrames,
        scenes,
        assets: {
            logo: assets.logo || null,
            screenshots: assets.screenshots || [],
            background: assets.background || null,
        },
        outputResolution: { width: 1920, height: 1080 },
        createdAt: new Date().toISOString(),
    };
};

// Example usage:
/*
const plan = createVideoPlan({
  clientName: 'Acme Corp',
  productName: 'Acme Analytics',
  tagline: 'Analytics that actually make sense',
  features: [
    'Real-time dashboards',
    'AI-powered insights',
    'One-click reports',
    'Team collaboration'
  ],
  style: 'dark',
  duration: 30,
  cta: 'Start Free Trial',
  assets: {
    logo: '/assets/acme/logo.png',
    screenshots: [
      '/assets/acme/dashboard.png',
      '/assets/acme/reports.png'
    ]
  }
});
*/

export const styleOptions = ['clean', 'dark', 'developer', 'minimal', 'gradient'];
export const durationOptions = [15, 30, 45];
