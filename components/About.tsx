"use client";

import { useRef } from "react";
import { Anton } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";

const anton = Anton({ subsets: ["latin"], weight: "400" });

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Scroll-linked: off-screen right → center → off-screen left. Direct transform (no spring) for perf — spring caused per-frame physics
  const x = useTransform(scrollYProgress, [0, 1], ["75vw", "-75vw"]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative flex min-h-[92svh] items-center overflow-hidden scroll-mt-8 bg-[#050508] pt-32 md:pt-40 lg:pt-44 xl:pt-48 pb-12 md:pb-16 lg:pb-20 xl:pb-20"
      aria-label="About me"
    >
      {/* Lightweight cosmic background — single glow + minimal stars (perf: avoids 4x blur layers vs HeroBackground) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050508]">
        <div
          className="absolute rounded-full blur-[80px] opacity-60"
          style={{
            width: "680px",
            height: "560px",
            left: "18%",
            top: "22%",
            background: "radial-gradient(ellipse at center, rgba(120,40,200,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.32]" style={{
          backgroundImage: `radial-gradient(1px 1px at 22% 28%, rgba(255,255,255,0.5) 50%, transparent 51%), radial-gradient(1px 1px at 68% 22%, rgba(255,255,255,0.35) 50%, transparent 51%), radial-gradient(1px 1px at 42% 78%, rgba(255,255,255,0.18) 50%, transparent 51%)`
        }}/>
      </div>
      {/* Background decorative text — scroll-linked right→center→left, disappears off-screen left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 flex justify-center pt-[6%] sm:pt-[5%] lg:pt-[4%]"
          style={{ x, willChange: "transform" } as any}
        >
          <span
            className={`${anton.className} block whitespace-nowrap text-[28vw] leading-none tracking-[-0.02em] sm:text-[24vw] md:text-[20vw] lg:text-[16vw] xl:text-[14vw]`}
            style={{
              color: "rgba(160,160,160,0.20)",
              WebkitTextFillColor: "rgba(160,160,160,0.20)",
              WebkitTextStroke: "1.4px rgba(255,255,255,0.90)",
              textTransform: "uppercase",
            }}
          >
            ABOUT ME
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* LEFT — Existing image — true transparent cutout, no container/background */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:mx-0 lg:max-w-none"
          >
            <img
              src="/about.png"
              alt="H Sujey — laptop and neon crystal artwork"
              width={1412}
              height={1114}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain select-none"
              style={{
                maxHeight: "520px",
                maxWidth: "100%",
                filter: "drop-shadow(0 22px 40px rgba(0,0,0,0.55))",
              }}
              draggable={false}
            />
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col pt-14 md:pt-16 lg:pt-20"
          >
            <p className="text-[15px] md:text-[17px] lg:text-[18px] font-black tracking-[0.01em] text-white leading-tight">
              Android Developer &nbsp;·&nbsp; Blockchain & Web3 Engineer &nbsp;·&nbsp; AI/ML Enthusiast
            </p>

            <div className="mt-6 space-y-4 text-[14.5px] leading-[1.7] text-white">
              <p className="text-white">
                Computer Science undergraduate at Chennai Institute of Technology with hands-on
                experience building mobile, blockchain, and AI-driven applications. Currently
                interning as a Web Developer at DNYX Business Solutions and previously as a Cloud
                Technical Intern at MulticoreWare.
              </p>
              <p className="text-white">
                Winner of the KAAVAL Hackathon (1st of 400 teams) and Top Finalist at Hack with
                Uttar Pradesh selected from 20,000+ applicants. Founder of HackHive, a student
                developer community focused on hackathons, Web3 and Agentic AI, and On-Campus
                Organising Lead for GDG. Passionate about crafting performant Android experiences,
                decentralized systems, and applied AI.
              </p>
            </div>

            {/* Key details — compact, premium grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur sm:grid-cols-2 sm:p-6">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                  Location
                </p>
                <p className="text-[13.5px] font-medium text-white">Chennai 600078, India</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                  Education
                </p>
                <p className="text-[13.5px] font-medium leading-snug text-white">
                  B.E. CSE, Chennai Institute of Technology — 2025–2029
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                  Email
                </p>
                <a
                  href="mailto:sujeyhariprasad4@gmail.com"
                  className="text-[13.5px] font-medium text-white underline decoration-white/15 underline-offset-4 hover:decoration-white/30"
                >
                  sujeyhariprasad4@gmail.com
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                  Links
                </p>
                <div className="flex flex-wrap gap-3 text-[13.5px] font-medium">
                  <a
                    href="https://github.com/sujey2007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-white/15 underline-offset-4 hover:decoration-white/30"
                  >
                    GitHub
                  </a>
                  <span className="text-white/20">·</span>
                  <a
                    href="https://linkedin.com/in/sujey-hariprasad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-white/15 underline-offset-4 hover:text-white hover:decoration-white/30"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
