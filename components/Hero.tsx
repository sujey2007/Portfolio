"use client";

import HeroBackground from "./HeroBackground";
import LargeTypography from "./LargeTypography";
import HeroPortrait from "./HeroPortrait";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#050508]"
      aria-label="Hero — Sujey H"
    >
      {/* Layer 1: Cosmic background */}
      <HeroBackground />

      {/* Layer 4: Navbar (on top) - rendered early for layout but absolute positioned */}
      <Navbar />

      {/* Layer 2: Giant typography behind portrait */}
      <LargeTypography />

      {/* Layer 3: Portrait in front of typography */}
      <HeroPortrait />

      {/* Bottom content / subtle tagline - keeps hero minimal but not empty
          Positioned above portrait z-index but very subtle editorial */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        className="relative z-30 mt-auto w-full"
      >
        {/* Subtle bottom bar - minimal info */}
        <div className="mx-auto flex max-w-[1440px] items-end justify-end gap-6 px-5 pb-7 pt-10 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
          {/* Right - scroll indicator (desktop only) */}
          <div className="hidden items-center gap-3 md:flex">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">Scroll</span>
            <div className="h-px w-12 bg-white/15" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M8 3.5V12.5M8 12.5L12 8.5M8 12.5L4 8.5"
                  stroke="white"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Mobile - centered minimal */}
          <div className="flex w-full justify-center md:hidden">
            <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                Available for new projects
              </span>
            </div>
          </div>
        </div>

        {/* Subtle bottom border glow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </motion.div>
    </section>
  );
}
