"use client";

import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  isExiting: boolean;
}

export function AuroraBackground({ isExiting }: AuroraBackgroundProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Purple blob */}
      <div
        className="aurora-blob aurora-blob-1"
        style={{
          background: "rgba(155, 109, 255, 0.15)",
        }}
      />
      {/* Blue blob */}
      <div
        className="aurora-blob aurora-blob-2"
        style={{
          background: "rgba(75, 143, 232, 0.12)",
        }}
      />
      {/* Teal blob */}
      <div
        className="aurora-blob aurora-blob-3"
        style={{
          background: "rgba(45, 212, 168, 0.1)",
        }}
      />
    </motion.div>
  );
}
