import { AbsoluteFill, interpolate, Easing } from 'remotion';

export function IntroScene({ product, style, frame, duration }) {
    // Animation progress (0 to 1)
    const fadeIn = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const slideUp = interpolate(frame, [0, 20], [30, 0], {
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
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 32,
                opacity,
                transform: `translateY(${slideUp}px)`,
            }}
        >
            {/* Logo */}
            {product.logo && (
                <img
                    src={product.logo}
                    alt={product.name}
                    style={{
                        width: 120,
                        height: 120,
                        objectFit: 'contain',
                    }}
                />
            )}

            {/* Product name */}
            <h1
                style={{
                    fontSize: 72,
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: '-0.02em',
                }}
            >
                {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
                <p
                    style={{
                        fontSize: 28,
                        opacity: 0.7,
                        margin: 0,
                        maxWidth: 800,
                        textAlign: 'center',
                    }}
                >
                    {product.tagline}
                </p>
            )}
        </AbsoluteFill>
    );
}
