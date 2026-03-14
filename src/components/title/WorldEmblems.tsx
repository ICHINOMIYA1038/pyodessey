"use client";

import { motion, type Variants } from "framer-motion";
import { WORLDS } from "@/lib/world-config";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const emblemVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1.4 + i * 0.12,
      duration: 0.5,
      ease: EASE,
    },
  }),
  exit: (i: number) => ({
    scale: 0.5,
    opacity: 0,
    transition: {
      delay: (WORLDS.length - 1 - i) * 0.04,
      duration: 0.2,
      ease: "easeIn" as const,
    },
  }),
};

const floatVariants: Variants = {
  float: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      delay: 2.0 + i * 0.15,
      duration: 2.5 + i * 0.3,
      ease: "easeInOut" as const,
      repeat: Infinity,
    },
  }),
};

export function WorldEmblems() {
  return (
    <div className="flex items-center gap-5">
      {WORLDS.map((world, i) => (
        <motion.div
          key={world.id}
          custom={i}
          variants={emblemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            custom={i}
            variants={floatVariants}
            animate="float"
            className="flex items-center justify-center rounded-full"
            style={{
              width: 56,
              height: 56,
              background: `radial-gradient(circle, ${world.colors.bg} 0%, transparent 70%)`,
              boxShadow: `0 0 20px ${world.colors.glow}, inset 0 0 12px ${world.colors.bg}`,
              border: `1.5px solid ${world.colors.glow}`,
            }}
          >
            <span className="text-2xl" role="img" aria-label={world.name}>
              {world.emoji}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
