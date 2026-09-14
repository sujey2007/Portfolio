"use client";

import { motion } from "framer-motion";

export default function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
      className="absolute z-20 pointer-events-none flex items-end justify-center
                 inset-x-0 bottom-0 mx-auto
                 lg:inset-x-auto lg:left-auto lg:right-[3%] xl:right-[7%] 2xl:right-[10%]"
    >
      {/* Subtle glow behind portrait - enhances neon rim */}
      <div
        aria-hidden
        className="absolute -z-10 blur-[50px] pointer-events-none"
        style={{
          width: "68%",
          height: "58%",
          left: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.18) 0%, rgba(236, 72, 153, 0.10) 45%, transparent 75%)",
        }}
      />

      {/* Portrait image container — static, no parallax / no floating */}
      <div className="relative flex items-end justify-center">
        <img
          src="/portrait.png"
          alt="Sujey H - low-poly stylized portrait"
          width={1000}
          height={1400}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="block h-auto w-auto object-contain object-bottom select-none"
          style={{
            height: "min(88vh, 860px)",
            maxHeight: "calc(100svh - 96px)",
            width: "auto",
            maxWidth: "min(92vw, 620px)",
            imageRendering: "auto",
            filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.55)) drop-shadow(0 2px 10px rgba(120,40,200,0.12))",
          }}
        />

        {/* Optional subtle bottom fade so portrait blends into background edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent lg:hidden"
        />
      </div>
    </motion.div>
  );
}
