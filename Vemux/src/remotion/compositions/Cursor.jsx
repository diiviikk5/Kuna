import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Cursor = ({ blinking }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = blinking
        ? interpolate(Math.sin((frame * Math.PI * 2) / fps), [-1, 1], [0, 1])
        : 1;

    return (
        <span
            style={{
                width: 12,
                height: 34,
                backgroundColor: "#333",
                marginLeft: 4,
                display: "inline-block",
                opacity,
                verticalAlign: 'middle'
            }}
        />
    );
};
