"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
    const videoRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);

        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 0.7;

        // On mobile, pause video when tab is not visible to save battery
        const handleVisibility = () => {
            if (document.hidden) {
                video.pause();
            } else {
                video.play().catch(() => { });
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    return (
        <>
            <div
                className="fixed inset-0 z-0 overflow-hidden"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload={isMobile ? "metadata" : "auto"}
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover"
                    style={{
                        transform: "translate(-50%, -50%) translateZ(0)",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                    }}
                >
                    <source src="/bg-video.mp4" type="video/mp4" />
                </video>
            </div>
            {/* Thin overlay — GPU composited */}
            <div
                className="fixed inset-0 z-[1] pointer-events-none"
                style={{
                    background: "linear-gradient(180deg, rgba(5,5,8,0.45) 0%, rgba(5,5,8,0.2) 30%, rgba(5,5,8,0.15) 50%, rgba(5,5,8,0.25) 70%, rgba(5,5,8,0.55) 100%)",
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
            />
        </>
    );
}
