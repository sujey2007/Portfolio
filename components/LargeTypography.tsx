"use client";

import { motion } from "framer-motion";

export default function LargeTypography() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* Vertically centered stack - editorial poster with gap */}
      <div className="flex flex-col items-center w-full -translate-y-[6vh] gap-[0.34em]">
        {/* Row 1 - SUJEY - Bodoni MT Black */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative w-full flex justify-center"
        >
          <h1
            className="leading-none text-[#fdf8ec] whitespace-nowrap"
            style={{
              fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
              fontWeight: 900,
              fontSize: "clamp(84px, 18.5vw, 280px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.86,
              textTransform: "uppercase",
              textShadow: "0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            SUJEY
          </h1>
        </motion.div>

        {/* Row 2 - HARIPRASAD - Bodoni MT Black */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="relative w-full flex justify-center"
        >
          <span
            className="leading-none text-[#fdf8ec] whitespace-nowrap"
            style={{
              fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
              fontWeight: 900,
              fontSize: "clamp(44px, 12vw, 182px)",
              letterSpacing: "-0.015em",
              lineHeight: 0.86,
              textTransform: "uppercase",
            }}
          >
            HARIPRASAD
          </span>
        </motion.div>
      </div>
    </div>
  );
}
