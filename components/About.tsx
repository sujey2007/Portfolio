"use client";

import { useRef } from "react";
import { Anton } from "next/font/google";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const anton = Anton({ subsets: ["latin"], weight: "400" });

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Scroll-linked: off-screen right → center (when About is centered) → off-screen left
  // 0 = section below viewport → hidden right, 0.5 = section centered → 0 (visible center), 1 = section above → hidden left
  const rawX = useTransform(scrollYProgress, [0, 1], ["75vw", "-75vw"]);
  // Fast scrub matching inspiration translate3d(82.67px): high stiffness for quick right→left
  const x = useSpring(rawX, { stiffness: 140, damping: 20, mass: 0.5 });

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden scroll-mt-8 bg-[#050508] py-16 md:py-24 lg:py-28"
      aria-label="About me"
    >
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
              color: "rgba(255,255,255,0.30)",
              WebkitTextFillColor: "rgba(255,255,255,0.30)",
              WebkitTextStroke: "1.6px rgba(255,255,255,1)",
              textTransform: "uppercase",
            }}
          >
            ABOUT ME
          </span>
        </motion.div>
      </div>

      {/* subtle top divider to separate from Hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

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
            className="flex flex-col"
          >
            <p className="text-[13.5px] font-black tracking-[0.02em] text-white">
              Android Developer &nbsp;·&nbsp; Blockchain & Web3 Engineer &nbsp;·&nbsp; AI/ML Enthusiast
            </p>

            <div className="mt-6 space-y-4 text-[14.5px] leading-[1.7] text-white/65">
              <p>
                Computer Science undergraduate at Chennai Institute of Technology with hands-on
                experience building mobile, blockchain, and AI-driven applications. Currently
                interning as a Web Developer at DNYX Business Solutions and previously as a Cloud
                Technical Intern at MulticoreWare.
              </p>
              <p className="text-white/60">
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
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                  Location
                </p>
                <p className="text-[13.5px] font-medium text-white/85">Chennai 600078, India</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                  Education
                </p>
                <p className="text-[13.5px] font-medium leading-snug text-white/85">
                  B.E. CSE, Chennai Institute of Technology — 2025–2029
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                  Email
                </p>
                <a
                  href="mailto:sujeyhariprasad4@gmail.com"
                  className="text-[13.5px] font-medium text-white/85 underline decoration-white/15 underline-offset-4 hover:decoration-white/30"
                >
                  sujeyhariprasad4@gmail.com
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                  Links
                </p>
                <div className="flex flex-wrap gap-3 text-[13.5px] font-medium">
                  <a
                    href="https://github.com/sujey2007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 underline decoration-white/15 underline-offset-4 hover:text-white hover:decoration-white/30"
                  >
                    GitHub
                  </a>
                  <span className="text-white/20">·</span>
                  <a
                    href="https://linkedin.com/in/sujey-hariprasad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 underline decoration-white/15 underline-offset-4 hover:text-white hover:decoration-white/30"
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
