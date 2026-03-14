"use client";

import { motion, type Variants } from "framer-motion";

const TITLE = "PyOdessey";
const STAGGER_DELAY = 0.06;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const letterVariants: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    y: 40,
    filter: "blur(12px)",
    opacity: 0,
  },
  visible: (i: number) => ({
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      delay: 0.3 + i * STAGGER_DELAY,
      duration: 0.7,
      ease: EASE,
    },
  }),
  exit: (i: number) => ({
    clipPath: "inset(0 0 100% 0)",
    y: -30,
    filter: "blur(8px)",
    opacity: 0,
    transition: {
      delay: (TITLE.length - 1 - i) * 0.03,
      duration: 0.3,
      ease: "easeIn" as const,
    },
  }),
};

const subtitleVariants: Variants = {
  hidden: { y: 20, filter: "blur(8px)", opacity: 0 },
  visible: {
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { delay: 0.9, duration: 0.6, ease: EASE },
  },
  exit: {
    y: -15,
    opacity: 0,
    transition: { delay: 0.08, duration: 0.25, ease: "easeIn" as const },
  },
};

export function CinematicTitle() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Main title */}
      <h1
        className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight"
        style={{
          textShadow: "0 0 60px rgba(155,109,255,0.3), 0 0 120px rgba(75,143,232,0.15)",
        }}
      >
        {TITLE.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="inline-block"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #c8a8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="text-lg sm:text-xl text-white/60 tracking-widest"
      >
        パイソンのぼうけん
      </motion.p>
    </div>
  );
}
