"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Spotlight effect component
export const Spotlight = ({ className, fill }) => {
    return (
        <svg
            className={cn(
                "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            <g filter="url(#filter)">
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill || "white"}
                    fillOpacity="0.21"
                ></ellipse>
            </g>
            <defs>
                <filter
                    id="filter"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    ></feBlend>
                    <feGaussianBlur
                        stdDeviation="151"
                        result="effect1_foregroundBlur_1065_8"
                    ></feGaussianBlur>
                </filter>
            </defs>
        </svg>
    );
};

// Text Generate Effect
export const TextGenerateEffect = ({ words, className }) => {
    const wordsArray = words.split(" ");

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <div className="text-inherit leading-snug tracking-wide">
                    {wordsArray.map((word, idx) => (
                        <motion.span
                            key={word + idx}
                            className="text-inherit opacity-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: idx * 0.1,
                            }}
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Hover Border Gradient
export const HoverBorderGradient = ({
    children,
    containerClassName,
    className,
    as: Tag = "button",
    duration = 1,
    clockwise = true,
    ...props
}) => {
    return (
        <Tag
            className={cn(
                "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
                containerClassName
            )}
            {...props}
        >
            <div
                className={cn(
                    "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
                    className
                )}
            >
                {children}
            </div>
            <motion.div
                className={cn(
                    "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
                )}
                style={{
                    filter: "blur(2px)",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: clockwise ? 360 : -360 }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <div
                    className={cn(
                        "absolute w-[99999px] aspect-square",
                        "bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]",
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    )}
                />
            </motion.div>
        </Tag>
    );
};

// Background Beams
export const BackgroundBeams = ({ className }) => {
    const paths = [
        "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
        "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
        "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    ];

    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
                className
            )}
        >
            <svg
                className="z-0 h-full w-full pointer-events-none absolute"
                width="100%"
                height="100%"
                viewBox="0 0 696 316"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {paths.map((path, index) => (
                    <motion.path
                        key={`path-` + index}
                        d={path}
                        stroke={`url(#linearGradient-${index})`}
                        strokeOpacity="0.4"
                        strokeWidth="0.5"
                    />
                ))}
                <defs>
                    {paths.map((_, index) => (
                        <motion.linearGradient
                            id={`linearGradient-${index}`}
                            key={`gradient-${index}`}
                            initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
                            animate={{
                                x1: ["0%", "100%"],
                                x2: ["0%", "95%"],
                                y1: ["0%", "100%"],
                                y2: ["0%", "0%"],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                ease: "easeInOut",
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        >
                            <stop stopColor="#18CCFC" stopOpacity="0" />
                            <stop stopColor="#18CCFC" />
                            <stop offset="32.5%" stopColor="#6344F5" />
                            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
                        </motion.linearGradient>
                    ))}
                </defs>
            </svg>
        </div>
    );
};

// Movingborder Button
export const MovingBorder = ({
    children,
    duration = 2000,
    className,
    containerClassName,
    borderClassName,
    as: Component = "button",
    ...otherProps
}) => {
    return (
        <Component
            className={cn(
                "bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden",
                containerClassName
            )}
            {...otherProps}
        >
            <div
                className="absolute inset-0"
                style={{ borderRadius: "inherit" }}
            >
                <motion.div
                    className={cn(
                        "absolute inset-[-1000%] rounded-full opacity-[0.6]",
                        "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]",
                        borderClassName
                    )}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: duration / 1000,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
            <div
                className={cn(
                    "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
                    className
                )}
                style={{ borderRadius: "inherit" }}
            >
                {children}
            </div>
        </Component>
    );
};

// Bento Grid
export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};

// Sparkles effect
export const SparklesCore = ({
    id,
    className,
    background,
    minSize,
    maxSize,
    particleDensity,
    particleColor,
}) => {
    return (
        <div className={cn("h-full w-full", className)}>
            <motion.div
                className="h-full w-full"
                style={{ background }}
            >
                {[...Array(particleDensity || 50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * (maxSize || 4 - (minSize || 1)) + (minSize || 1),
                            height: Math.random() * (maxSize || 4 - (minSize || 1)) + (minSize || 1),
                            background: particleColor || "#FFF",
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};
