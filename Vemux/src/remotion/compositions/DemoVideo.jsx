import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, Img } from 'remotion';
import { AdvancedGrid, DeviceCard, CinematicText, MouseSimulation } from './ProComponents';
import { MacTerminal } from './MacTerminal';

// --- CINEMATIC DRIFT PRO COMPOSITION ---

const SceneTransition = ({ children, from = 0, duration = 60, type = "fade" }) => {
    const frame = useCurrentFrame();
    const t = frame - from;

    const opacity = interpolate(t, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const exitOpacity = interpolate(t, [duration - 15, duration], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ opacity: Math.min(opacity, exitOpacity) }}>
            {children}
        </AbsoluteFill>
    );
};

export const DemoVideo = ({ plan }) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // 15s = 450 frames
    const INTRO = 1.3 * fps;      // 39
    const TERM = 3.2 * fps;       // 96
    const SHOT_1 = 3 * fps;       // 90
    const SHOT_2 = 3 * fps;       // 90
    const SHOT_3 = 2.5 * fps;      // 75
    const FINALE = 2 * fps;        // 60

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
            <AdvancedGrid />

            {/* SCENE 1: THE BRAND REVEAL */}
            <Sequence from={0} durationInFrames={INTRO}>
                <SceneTransition duration={INTRO}>
                    <CinematicText text="DRIFT." />
                </SceneTransition>
            </Sequence>

            {/* SCENE 2: THE TECH STACK (TERMINAL) */}
            <Sequence from={INTRO} durationInFrames={TERM}>
                <SceneTransition from={INTRO} duration={TERM}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <div style={{
                            width: 1100,
                            height: 550,
                            transform: `perspective(2000px) rotateX(10deg) scale(${interpolate(frame - INTRO, [0, TERM], [0.8, 1])})`,
                        }}>
                            <MacTerminal
                                command="npx drift --cinema-mode"
                                output="◇ Loading AI Auto-Zoom...\n◇ Calibrating 4K Capture...\n● READY TO RECORD"
                            />
                        </div>
                    </div>
                </SceneTransition>
            </Sequence>

            {/* SCENE 3: FEATURE 1 (AUTO ZOOM) */}
            <Sequence from={INTRO + TERM} durationInFrames={SHOT_1}>
                <SceneTransition from={INTRO + TERM} duration={SHOT_1}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <DeviceCard
                            image={plan.assets.screenshots[0]}
                            title={plan.features[0]}
                        />
                        <MouseSimulation delay={INTRO + TERM + 10} />
                    </div>
                </SceneTransition>
            </Sequence>

            // Scene 4 & 5 (Features 2 & 3)
            <Sequence from={INTRO + TERM + SHOT_1} durationInFrames={SHOT_2}>
                <SceneTransition from={INTRO + TERM + SHOT_1} duration={SHOT_2}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <DeviceCard
                            image={plan.assets.screenshots[1]}
                            title={plan.features[1]}
                        />
                    </div>
                </SceneTransition>
            </Sequence>

            <Sequence from={INTRO + TERM + SHOT_1 + SHOT_2} durationInFrames={SHOT_3}>
                <SceneTransition from={INTRO + TERM + SHOT_1 + SHOT_2} duration={SHOT_3}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <DeviceCard
                            image={plan.assets.screenshots[2]}
                            title={plan.features[2]}
                        />
                    </div>
                </SceneTransition>
            </Sequence>

            {/* FINALE: CTA */}
            <Sequence from={durationInFrames - FINALE}>
                <SceneTransition from={durationInFrames - FINALE} duration={FINALE}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: 120, fontWeight: 950, color: 'white', letterSpacing: '-0.07em' }}>
                            START <span style={{ color: '#c0ff00' }}>SHIPPING.</span>
                        </h2>
                        <div style={{
                            marginTop: 40,
                            display: 'inline-block',
                            backgroundColor: '#c0ff00',
                            color: '#000',
                            padding: '15px 50px',
                            borderRadius: 100,
                            fontSize: 32,
                            fontWeight: 900,
                            boxShadow: '0 20px 50px rgba(192, 255, 0, 0.4)'
                        }}>
                            {plan.url.toUpperCase()}
                        </div>
                    </div>
                </SceneTransition>
            </Sequence>

            {/* Global Overlay: Cinematic Noise */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6-dark.png")',
                opacity: 0.05,
                pointerEvents: 'none'
            }} />
        </AbsoluteFill>
    );
};
