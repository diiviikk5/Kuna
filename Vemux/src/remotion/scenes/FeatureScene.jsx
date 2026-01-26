import { AbsoluteFill, interpolate, Easing } from 'remotion';

export function FeatureScene({ feature, index, style, frame, duration }) {
    // Animation progress
    const fadeIn = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const slideIn = interpolate(frame, [0, 20], [50, 0], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const fadeOut = interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: 'clamp',
        easing: Easing.in(Easing.cubic),
    });

    const opacity = Math.min(fadeIn, fadeOut);

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 80,
                opacity,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 80,
                    maxWidth: 1400,
                    transform: `translateX(${slideIn}px)`,
                }}
            >
                {/* Feature number */}
                <div
                    style={{
                        fontSize: 200,
                        fontWeight: 700,
                        opacity: 0.1,
                        fontFamily: 'monospace',
                        lineHeight: 1,
                    }}
                >
                    {String(index + 1).padStart(2, '0')}
                </div>

                {/* Feature content */}
                <div style={{ flex: 1 }}>
                    <h2
                        style={{
                            fontSize: 48,
                            fontWeight: 600,
                            margin: 0,
                            marginBottom: 16,
                            color: style.accent,
                        }}
                    >
                        {feature.title}
                    </h2>
                    {feature.description && (
                        <p
                            style={{
                                fontSize: 24,
                                opacity: 0.7,
                                margin: 0,
                                lineHeight: 1.5,
                            }}
                        >
                            {feature.description}
                        </p>
                    )}
                </div>

                {/* Screenshot if available */}
                {feature.screenshot && (
                    <img
                        src={feature.screenshot}
                        alt={feature.title}
                        style={{
                            maxWidth: 500,
                            maxHeight: 400,
                            objectFit: 'contain',
                            borderRadius: 8,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        }}
                    />
                )}
            </div>
        </AbsoluteFill>
    );
}
