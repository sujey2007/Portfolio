"use client";

import HeroBackground from "./HeroBackground";
import LargeTypography from "./LargeTypography";
import HeroPortrait from "./HeroPortrait";
import TypewriterText from "./TypewriterText";
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

      {/* Layer 2: Giant typography behind portrait */}
      <LargeTypography />

      {/* Layer 3: Portrait in front of typography */}
      <HeroPortrait />

      {/* Bottom-left group — typewriter + CTAs — moved a little downward; heading/typography remain static */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.15, ease: "easeOut" }}
        className="absolute inset-x-0 z-40 pointer-events-none bottom-[96px] sm:bottom-[100px] md:bottom-[84px] lg:bottom-[60px] xl:bottom-[68px]"
        aria-hidden={false}
      >
        <div className="mx-auto flex max-w-[1440px] justify-start px-5 md:px-8 lg:px-10">
          <div className="pointer-events-auto flex max-w-full flex-col gap-4 sm:gap-5">
            <TypewriterText />
            {/* CTA row — directly below typewriter */}
            <div className="flex max-w-[calc(100vw-40px)] flex-wrap gap-2.5 sm:max-w-none sm:gap-3">
              {/* Look My Work — white → black sweep */}
              <a
                href="#projects"
                className="group relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white px-5 py-[9px] text-[13px] font-semibold tracking-[-0.01em] text-black transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:px-[22px] sm:py-[10px] sm:text-[13.5px]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 translate-x-[-101%] bg-[#050508] transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                />
                <span className="pointer-events-none relative z-10 transition-colors duration-[320ms] group-hover:text-white">Look My Work</span>
              </a>
              {/* GitHub — black → white sweep */}
              <a
                href="https://github.com/sujey2007"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black bg-[#050508] px-5 py-[9px] text-[13px] font-medium tracking-[-0.01em] text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 sm:px-[22px] sm:py-[10px] sm:text-[13.5px]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 translate-x-[-101%] bg-white transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                />
                <span className="pointer-events-none relative z-10 transition-colors duration-[320ms] group-hover:text-black">GitHub</span>
              </a>
              {/* Contact Me — white → black sweep */}
              <a
                href="#contact"
                className="group relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white px-5 py-[9px] text-[13px] font-semibold tracking-[-0.01em] text-black transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:px-[22px] sm:py-[10px] sm:text-[13.5px]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 translate-x-[-101%] bg-[#050508] transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                />
                <span className="pointer-events-none relative z-10 transition-colors duration-[320ms] group-hover:text-white">Contact Me</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom content / subtle tagline - keeps hero minimal but not empty
          Positioned above portrait z-index but very subtle editorial */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        className="relative z-30 mt-auto w-full pointer-events-none"
      >
        {/* Subtle bottom bar - minimal info */}
        <div className="mx-auto flex max-w-[1440px] items-end justify-end gap-6 px-5 pb-7 pt-10 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
          {/* Right - scroll indicator (desktop only) */}
          <div className="hidden items-center gap-3 md:flex pointer-events-auto">
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
          <div className="flex w-full justify-center md:hidden pointer-events-auto">
            <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                Available for new projects
              </span>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
