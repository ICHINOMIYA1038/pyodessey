"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SuccessSparkleProps {
  show: boolean;
}

const sparkleColors = ["#9b6dff", "#4b8fe8", "#2dd4a8", "#ffd700", "#9b6dff", "#4b8fe8", "#2dd4a8", "#ffd700"];
const sparkleChars = ["✦", "✧", "⭐", "✦", "✧", "⭐", "✦", "✧"];

const stars = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: `${8 + Math.random() * 65}%`,
  left: `${8 + Math.random() * 84}%`,
  delay: Math.random() * 0.4,
  color: sparkleColors[i],
  char: sparkleChars[i],
}));

export function SuccessSparkle({ show }: SuccessSparkleProps) {
  return (
    <AnimatePresence>
      {show &&
        stars.map((star) => (
          <motion.span
            key={star.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.2, 0], opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, delay: star.delay }}
            className="pointer-events-none absolute text-xl"
            style={{
              top: star.top,
              left: star.left,
              color: star.color,
              textShadow: `0 0 8px ${star.color}`,
            }}
          >
            {star.char}
          </motion.span>
        ))}
    </AnimatePresence>
  );
}
