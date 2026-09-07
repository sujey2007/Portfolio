"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring for smoothness
  const springX = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });

  const translateX = useTransform(springX, [-1, 1], [-8, 8]);
  const translateY = useTransform(springY, [-1, 1], [-6, 6]);
  // slight rotation for depth
  const rotateY = useTransform(springX, [-1, 1], [-1.2, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
    };

    const handleDeviceOrientation = () => {
      // No-op for now; mouse only
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mx, my]);

  // Floating animation
  const floatY = {
    y: [0, -6, 0],
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
      style={{
        x: translateX,
        y: translateY,
        rotateY: rotateY,
      } as any}
      className="absolute z-20 pointer-events-none will-change-transform flex items-end justify-center
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

      {/* Portrait image container */}
      <motion.div
        animate={floatY as any}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        className="relative flex items-end justify-center"
        style={{ perspective: 1000 }}
      >
        {/* Image */}
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
            // Ensure crisp rendering on hi-dpi
            imageRendering: "auto",
            // subtle drop shadow to lift from background
            filter: "drop-shadow(0 18px 42px rgba(0,0,0,0.55)) drop-shadow(0 2px 10px rgba(120,40,200,0.12))",
          }}
        />

        {/* Optional subtle bottom fade so portrait blends into background edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent lg:hidden"
        />
      </motion.div>
    </motion.div>
  );
}
