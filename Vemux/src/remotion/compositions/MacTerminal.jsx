import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Cursor } from "./Cursor";

export const MacTerminal = ({ command = "npx drift record", output = "◇ Detected screen\n◇ Privacy guard: ACTIVE\n● Recording started..." }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Typewriter logic
    const charsPerSecond = 20;
    const framesPerChar = fps / charsPerSecond;
    const typingDuration = command.length * framesPerChar;

    const visibleChars = Math.floor(
        interpolate(frame, [0, typingDuration], [0, command.length], {
            extrapolateRight: "clamp",
        })
    );

    const displayedText = command.slice(0, visibleChars);
    const isTyping = visibleChars < command.length;
    const showOutput = frame > typingDuration + 15;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
        }}>
            {/* Title Bar */}
            <div style={{
                height: 40,
                backgroundColor: "#f6f6f6",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                padding: "0 15px",
                gap: 8
            }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                padding: 30,
                fontFamily: "monospace",
                fontSize: 32,
                color: "#333",
                lineHeight: 1.4
            }}>
                <div>
                    <span style={{ color: "#2ecc71", fontWeight: "bold" }}>~</span>
                    <span style={{ margin: "0 10px" }}>$</span>
                    <span>{displayedText}</span>
                    {!showOutput && <Cursor blinking={!isTyping} />}
                </div>

                {showOutput && (
                    <div style={{ marginTop: 20, color: "#666", fontSize: 24, whiteSpace: 'pre-wrap' }}>
                        {output}
                    </div>
                )}
            </div>
        </div>
    );
};
