import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, Img } from 'remotion';

// --- DRIFT MASTER DESIGN SYSTEM (Learned from Jonny Burger) ---
const SPRINGS = {
    heavy: { damping: 200, stiffness: 100 },
    snappy: { damping: 15, stiffness: 180 },
    bouncy: { damping: 7, stiffness: 100 },
};

// --- ADVANCED COMPONENTS ---

export const Magnifier = ({ image, x, y, size = 300, zoom = 1.5 }) => {
    const frame = useCurrentFrame();
    const entrance = spring({ frame, fps: 30, config: SPRINGS.snappy });

    return (
        <div style={{
            position: 'absolute',
            top: y - size / 2,
            left: x - size / 2,
            width: size,
            height: size,
            borderRadius: '50%',
            border: '4px solid #c0ff00',
            overflow: 'hidden',
            boxShadow: '0 0 50px rgba(192, 255, 0, 0.5), 0 0 100px rgba(0,0,0,1)',
            transform: `scale(${entrance})`,
            zIndex: 100,
        }}>
            <Img
                src={image}
                style={{
                    position: 'absolute',
                    top: -y * zoom + size / 2,
                    left: -x * zoom + size / 2,
                    width: `calc(100% * ${zoom * 4})`, // Normalized to the container
                    height: 'auto',
                    objectFit: 'cover',
                    transform: `scale(${zoom})`,
                }}
            />
            {/* Glass Glare */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

export const Scanline = () => {
    return (
        <AbsoluteFill style={{
            pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 3px 100%',
            opacity: 0.1,
            zIndex: 1000
        }} />
    );
};

export const Background = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ backgroundColor: '#020202' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `radial-gradient(circle at center, #c0ff0008 0%, transparent 80%)`,
                transform: `scale(${1 + Math.sin(frame / 30) * 0.05})`,
            }} />
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(#ffffff11 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.5,
            }} />
        </AbsoluteFill>
    );
};
