import { AbsoluteFill, interpolate, Easing } from 'remotion';

export function CTAScene({ product, style, frame, duration }) {
    // Animation progress
    const fadeIn = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const scaleIn = interpolate(frame, [0, 20], [0.9, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 40,
                opacity: fadeIn,
                transform: `scale(${scaleIn})`,
            }}
        >
            {/* Logo */}
            {product.logo && (
                <img
                    src={product.logo}
                    alt={product.name}
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                    }}
                />
            )}

            {/* Get started text */}
            <h2
                style={{
                    fontSize: 56,
                    fontWeight: 600,
                    margin: 0,
                }}
            >
                Get started with {product.name}
            </h2>

            {/* URL */}
            {product.url && (
                <div
                    style={{
                        padding: '16px 48px',
                        backgroundColor: style.accent,
                        color: style.bg,
                        fontSize: 28,
                        fontWeight: 500,
                    }}
                >
                    {product.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </div>
            )}
        </AbsoluteFill>
    );
}
