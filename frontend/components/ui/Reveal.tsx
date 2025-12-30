"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    height?: "fit-content" | "100%";
    fullHeight?: boolean;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    once?: boolean;
    className?: string;
}

export const Reveal = ({
    children,
    width = "fit-content",
    height = "fit-content",
    fullHeight = false,
    delay = 0,
    duration = 0.5,
    direction = "up",
    distance = 50,
    once = true,
    className = "",
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else if (!once) {
            mainControls.start("hidden");
        }
    }, [isInView, mainControls, once]);

    const x = direction === "left" ? distance : direction === "right" ? -distance : 0;
    const y = direction === "up" ? distance : direction === "down" ? -distance : 0;

    return (
        <div
            ref={ref}
            className={className}
            style={{
                position: "relative",
                width,
                height: fullHeight ? "100%" : height,
                overflow: "visible"
            }}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, x, y },
                    visible: { opacity: 1, x: 0, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: fullHeight ? "100%" : "auto" }}
            >
                {children}
            </motion.div>
        </div>
    );
};
