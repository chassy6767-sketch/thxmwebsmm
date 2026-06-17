"use client";

import { motion } from "framer-motion";

export function MorphingShape({
  className = "",
  color = "rgba(255,255,255,0.03)",
  size = 400,
  delay = 0,
}: {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute morph-shape ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(60px)",
      }}
      animate={{
        scale: [1, 1.1, 0.95, 1.05, 1],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

export function FloatingDot({
  x,
  y,
  size = 4,
  delay = 0,
}: {
  x: string;
  y: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#ff8c00]/10"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        opacity: [0.1, 0.4, 0.2, 0.5, 0.1],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function GradientOrb({
  className = "",
  colors = ["rgba(255,140,0,0.16)", "rgba(255,140,0,0.08)", "transparent"],
}: {
  className?: string;
  colors?: string[];
}) {
  return (
    <motion.div
      className={`absolute morph-shape-slow ${className}`}
      style={{
        background: `radial-gradient(circle, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
        filter: "blur(80px)",
      }}
      animate={{
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
}
