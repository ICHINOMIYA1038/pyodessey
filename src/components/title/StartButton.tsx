"use client";

import { motion, type Variants } from "framer-motion";

interface StartButtonProps {
  onClick: () => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const buttonVariants: Variants = {
  hidden: { y: 20, scale: 0.95, opacity: 0 },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: 2.2,
      duration: 0.6,
      ease: EASE,
    },
  },
  exit: {
    y: -10,
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

export function StartButton({ onClick }: StartButtonProps) {
  return (
    <motion.button
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="start-button relative px-10 py-4 rounded-2xl text-lg font-semibold text-white tracking-wider cursor-pointer overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(155,109,255,0.25) 0%, rgba(75,143,232,0.2) 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 30px rgba(155,109,255,0.15), 0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <span className="relative z-10">冒険をはじめる</span>
      <div className="start-button-shimmer" />
    </motion.button>
  );
}
