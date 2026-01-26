import { Composition, staticFile } from 'remotion';
import { DemoVideo } from './compositions/DemoVideo';

// Professional Apple-style video plan for Drift
const driftPlan = {
    client: 'Drift',
    product: 'Drift',
    tagline: 'Cinema-grade screen recording. Automatically.',
    features: [
        'Auto-zoom tracks every click',
        'Professional Layouts & Backgrounds',
        '100% Private. 100% Secure.',
        'Zero watermarks. Zero cost.'
    ],
    cta: 'Start Recording @ drift.dvkk.dev',
    url: 'drift.dvkk.dev',
    style: 'apple',
    colors: {
        background: '#000000',
        text: '#ffffff',
        accent: '#c0ff00', // Drift's signature lime green
        surface: '#111111',
    },
    assets: {
        logo: null,
        screenshots: [
            staticFile('assets/drift/landing.jpg'),
            staticFile('assets/drift/editor.jpg'),
            staticFile('assets/drift/labs.jpg'),
            staticFile('assets/drift/landing.jpg'),
        ],
    },
    duration: 15,
    fps: 30,
};

export const RemotionRoot = () => {
    return (
        <>
            <Composition
                id="DemoVideo"
                component={DemoVideo}
                durationInFrames={driftPlan.duration * driftPlan.fps}
                fps={driftPlan.fps}
                width={1920}
                height={1080}
                defaultProps={{ plan: driftPlan }}
            />

            <Composition
                id="DemoVideo15"
                component={DemoVideo}
                durationInFrames={15 * 30}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{ plan: { ...driftPlan, duration: 15 } }}
            />
        </>
    );
};
