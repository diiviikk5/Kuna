import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, Img } from 'remotion';

// --- PRO DESIGN SYSTEM ---
const SPRINGS = {
    heavy: { damping: 200, stiffness: 100 },
    snappy: { damping: 12, stiffness: 180 },
    bouncy: { damping: 6, stiffness: 120 },
    soft: { damping: 20, stiffness: 50 },
};

// --- TECHNICAL BACKGROUND ---
export const AdvancedGrid = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Slow movement of the grid
    const ty = (frame * 0.5) % 80;
    const tx = (frame * 0.3) % 80;

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* Dark Gradient Base */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, #111 0%, #000 100%)',
            }} />

            {/* The Animated Grid */}
            <div style={{
                position: 'absolute',
                inset: -100,
                backgroundImage: `
                    linear-gradient(rgba(192, 255, 0, 0.08) 1.5px, transparent 1.5px),
                    linear-gradient(90deg, rgba(192, 255, 0, 0.08) 1.5px, transparent 1.5px)
                `,
                backgroundSize: '80px 80px',
                backgroundPosition: `${tx}px ${ty}px`,
                maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                opacity: 0.6,
            }} />

            {/* Glowing Floor Perspective (Simulated) */}
            <div style={{
                position: 'absolute',
                bottom: -200,
                left: -200,
                right: -200,
                height: 600,
                background: 'linear-gradient(to top, rgba(192, 255, 0, 0.1), transparent)',
                transform: 'perspective(1000px) rotateX(60deg)',
                filter: 'blur(50px)',
            }} />
        </AbsoluteFill>
    );
};

// --- LUXURY DEVICE MOCKUP ---
export const DeviceCard = ({ image, title, subfolder = "Feature" }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({ frame, fps, config: SPRINGS.snappy });
    const float = Math.sin(frame / 20) * 15;
    const rotate = Math.sin(frame / 40) * 2;

    return (
        <div style={{
            width: '85%',
            height: '75%',
            position: 'relative',
            perspective: 2000,
            transform: `scale(${0.9 + entrance * 0.1}) translateY(${float}px) rotateY(${rotate}deg)`,
            opacity: entrance,
        }}>
            {/* Outer Glass Frame */}
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#111',
                borderRadius: 40,
                padding: 12,
                boxShadow: '0 50px 150px rgba(0,0,0,1), 0 0 100px rgba(192, 255, 0, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Internal UI Shell */}
                <div style={{
                    flex: 1,
                    borderRadius: 28,
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <Img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                    {/* Light Sweep Animation */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 70%)',
                        transform: `translateX(${interpolate(frame % 90, [0, 90], [-100, 200])}%)`,
                        pointerEvents: 'none'
                    }} />
                </div>
            </div>

            {/* Floating Tag Overlay */}
            <div style={{
                position: 'absolute',
                top: -30,
                right: 50,
                backgroundColor: '#c0ff00',
                color: '#000',
                padding: '12px 30px',
                borderRadius: 100,
                fontSize: 24,
                fontWeight: 900,
                boxShadow: '0 20px 40px rgba(192, 255, 0, 0.3)',
                transform: `rotate(${rotate * 2}deg) translateY(${Math.sin(frame / 15) * 5}px)`,
            }}>
                {title.toUpperCase()}
            </div>
        </div>
    );
};

// --- KINETIC TYPOGRAPHY ---
export const CinematicText = ({ text, delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const t = frame - delay;

    if (t < 0) return null;

    return (
        <div style={{ textAlign: 'center' }}>
            {text.split('').map((char, i) => {
                const charEntrance = spring({
                    frame: t - i * 1.5,
                    fps,
                    config: SPRINGS.snappy,
                });

                return (
                    <span key={i} style={{
                        display: 'inline-block',
                        fontSize: 140,
                        fontWeight: 950,
                        color: char === '.' ? '#c0ff00' : 'white',
                        transform: `translateY(${(1 - charEntrance) * 50}px) scale(${charEntrance})`,
                        opacity: charEntrance,
                        letterSpacing: '-0.05em',
                        textShadow: char === '.' ? '0 0 30px #c0ff0066' : 'none',
                    }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                );
            })}
        </div>
    );
};

// --- CURSOR / MOUSE TRAIL ---
export const MouseSimulation = ({ delay = 0 }) => {
    const frame = useCurrentFrame();
    const t = frame - delay;

    const x = interpolate(t, [0, 60], [200, 1000], { easing: Easing.bezier(0.4, 0, 0.2, 1) });
    const y = interpolate(t, [0, 60], [800, 300], { easing: Easing.bezier(0.4, 0, 0.2, 1) });
    const scale = spring({ frame: t, fps: 30, config: SPRINGS.bouncy });

    return (
        <div style={{
            position: 'absolute',
            top: y,
            left: x,
            zIndex: 1000,
            transform: `scale(${scale})`,
            pointerEvents: 'none'
        }}>
            {/* The Cursor */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.83-4.83c.2-.2.46-.31.73-.31h6.61c.45 0 .67-.54.35-.85L6.35 2.87c-.32-.32-.85-.1-.85.34z" />
            </svg>

            {/* Click Ripple */}
            {t > 30 && t < 45 && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 100,
                    height: 100,
                    border: '4px solid #c0ff00',
                    borderRadius: '50%',
                    transform: `translate(-50%, -50%) scale(${interpolate(t - 30, [0, 15], [0, 2])})`,
                    opacity: interpolate(t - 30, [0, 15], [1, 0]),
                }} />
            )}
        </div>
    );
};
