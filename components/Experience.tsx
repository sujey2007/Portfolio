"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    title: "Web Developer Intern",
    company: "DNYX Business Solutions",
    date: "AUG 2026 — PRESENT",
    month: "AUG",
    year: "2026",
    description:
      "Working as a Web Developer Intern, contributing to modern web application development and frontend implementation while gaining hands-on experience with production development workflows.",
    tags: ["React.js", "Next.js", "JavaScript", "Web Development"],
  },
  {
    title: "Cloud Technical Intern",
    company: "MulticoreWare",
    date: "MAY 2026 — JUN 2026",
    month: "MAY",
    year: "2026",
    description:
      "Worked on cloud and infrastructure-related technical tasks, gaining practical exposure to cloud technologies, containerized environments, and modern development workflows.",
    tags: ["AWS", "Kubernetes", "Docker", "Cloud"],
  },
];

// Reference spline truncated for 2 items but preserves center→right→center→left rhythm — same Bezier pattern, single continuous path
const PATH_D =
  "M 362 0 C 362 9.625, 327.248 17.875, 362 27.5 C 419.92 54.275, 419.92 77.225, 362 104 C 304.08 193.95, 304.08 271.05, 362 361 C 419.92 463.375, 419.92 551.125, 362 653.5 C 304.08 733.475, 304.08 802.025, 362 882 C 419.92 956.2, 419.92 1019.8, 362 1094 C 304.08 1169.775, 304.08 1234.725, 362 1310.5 C 362 1360, 362 1390, 362 1420";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathBgRef = useRef<SVGPathElement>(null);
  const pathBgMobileRef = useRef<SVGPathElement>(null);
  const pathActiveRef = useRef<SVGPathElement>(null);
  const pathActiveMobileRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const bgPaths = [pathBgRef.current, pathBgMobileRef.current].filter(Boolean) as SVGPathElement[];
      const activePaths = [pathActiveRef.current, pathActiveMobileRef.current].filter(Boolean) as SVGPathElement[];
      if (activePaths.length === 0) return;

      // Proper per-path length setup — fixes line not drawing / offset mismatch on mobile
      const setupPaths = () => {
        bgPaths.forEach((p) => {
          const len = p.getTotalLength();
          // Use string dasharray for SVG correctness and GPU-friendly style
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = "0";
          p.style.opacity = "0.14";
        });
        activePaths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
          p.style.opacity = "1";
        });
      };

      setupPaths();

      if (!prefersReduced) {
        // Faster line draw — touches AUG node when its bg lights (AUG node at ~60% path, lights at top 88% ≈ section top 19%)
        // Shorter range (bottom 100% vs 58% = H-0.22V vs H+0.20V) + low scrub = immediate, line at ~61% when AUG lights vs ~42% before
        gsap.to(activePaths, {
          strokeDashoffset: 0,
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 100%",
            scrub: 0.32,
            invalidateOnRefresh: true,
            anticipatePin: 0,
            fastScrollEnd: true,
            onRefresh: setupPaths,
          },
        });
      } else {
        // Reduced motion: show line instantly without scroll scrub
        activePaths.forEach((p) => (p.style.strokeDashoffset = "0"));
      }

      // Nodes — use toggleActions instead of scrub (huge perf win, no per-frame updates)
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      nodes.forEach((node) => {
        if (prefersReduced) {
          node.classList.add("node-active");
          gsap.set(node, { scale: 1, opacity: 1 });
          return;
        }
        gsap.fromTo(
          node,
          { scale: 0.92, opacity: 0.65 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              toggleActions: "play none none reverse",
              onEnter: () => node.classList.add("node-active"),
              onLeaveBack: () => node.classList.remove("node-active"),
              onEnterBack: () => node.classList.add("node-active"),
              onLeave: () => node.classList.remove("node-active"),
            },
          }
        );
      });

      // Cards — entrance without scrub + separate active class toggle (no continuous scrub)
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item) => {
        const card = item.querySelector<HTMLElement>(".timeline-card");
        if (!card) return;
        if (prefersReduced) {
          gsap.set(card, { x: 0, opacity: 1 });
          card.classList.add("card-active");
          return;
        }
        const isLeft = item.classList.contains("item-left");
        gsap.fromTo(
          card,
          { x: isLeft ? -28 : 28, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
        ScrollTrigger.create({
          trigger: item,
          start: "top 68%",
          end: "top 35%",
          onEnter: () => card.classList.add("card-active"),
          onLeave: () => card.classList.remove("card-active"),
          onEnterBack: () => card.classList.add("card-active"),
          onLeaveBack: () => card.classList.remove("card-active"),
        });
      });

      // Refresh once after fonts/images settle, debounced
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden scroll-mt-8 bg-[#050508] pt-8 md:pt-12 lg:pt-14 pb-16 md:pb-24 lg:pb-28"
      aria-label="Work Experience"
    >
      {/* Lightweight background for Experience — single subtle glow instead of full HeroBackground (perf: 4x fewer blur layers) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050508]">
        <div
          className="absolute rounded-full blur-[90px] opacity-70"
          style={{
            width: "720px",
            height: "600px",
            left: "50%",
            top: "28%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center, rgba(120,40,200,0.09) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.28]" style={{
          backgroundImage: `radial-gradient(1px 1px at 22% 18%, rgba(255,255,255,0.45) 50%, transparent 51%), radial-gradient(1px 1px at 68% 24%, rgba(255,255,255,0.35) 50%, transparent 51%), radial-gradient(1px 1px at 42% 72%, rgba(255,255,255,0.18) 50%, transparent 51%)`
        }}/>
      </div>

      {/* Background moving poster — WORK EXPERIENCE repeated LEFT → RIGHT, a little upward to subtitle */}
      <div
        aria-hidden="true"
        className="experience-poster-bg pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <div className="absolute left-0 right-0 top-[3%] overflow-hidden sm:top-[2%] lg:top-[1.5%]">
          <div className="flex w-max animate-[experience-marquee_32s_linear_infinite] whitespace-nowrap will-change-transform">
            {/* Group 1 */}
            <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8 md:gap-10 md:pr-10 lg:gap-12 lg:pr-12">
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                  WebkitTextStroke: "0px transparent",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                  WebkitTextStroke: "0px transparent",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                  WebkitTextStroke: "0px transparent",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
            </div>
            {/* Group 2 — duplicate for seamless loop */}
            <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8 md:gap-10 md:pr-10 lg:gap-12 lg:pr-12" aria-hidden="true">
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                  WebkitTextStroke: "0px transparent",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                  WebkitTextStroke: "0px transparent",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                  WebkitTextStroke: "0px transparent",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        {/* Header — foreground WORK EXPERIENCE removed; bg poster is the large typography */}
        <div className="mx-auto max-w-[720px] text-center pt-8 md:pt-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-10 max-w-[520px] text-[14px] leading-[1.7] text-white/55"
          >
            A timeline of my professional experience and technical journey.
          </motion.p>
        </div>

        {/* Timeline — centered spline, alternating cards — reduced top gap per request */}
        <div
          ref={containerRef}
          className="relative mx-auto mt-8 max-w-[1160px] md:mt-10"
          style={{ height: "800px" }}
        >
          {/* Central SVG — true center */}
          <svg
            className="timeline-svg pointer-events-none absolute left-1/2 top-0 h-full w-[720px] -translate-x-1/2"
            width="724"
            height="1420"
            viewBox="0 0 724 1420"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="timeline-gradient-exp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="12%" stopColor="#a78bfa" />
                <stop offset="45%" stopColor="#22d3ee" />
                <stop offset="78%" stopColor="#ec4899" />
                <stop offset="92%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
              </linearGradient>
              {/* Lighter glow — stdDeviation 2.5 vs 4 and smaller region = large perf gain */}
              <filter id="timeline-glow-exp" x="-20%" y="-10%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              ref={pathBgRef}
              d={PATH_D}
              fill="none"
              stroke="currentColor"
              className="text-white/10"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ opacity: 0.14 }}
            />
            <path
              ref={pathActiveRef}
              d={PATH_D}
              fill="none"
              stroke="url(#timeline-gradient-exp)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#timeline-glow-exp)"
              style={{ willChange: "stroke-dashoffset" }}
            />
          </svg>

          {/* Mobile: left timeline (override centering) */}
          <svg
            className="pointer-events-none absolute left-[28px] top-0 block h-full w-[48px] -translate-x-1/2 md:hidden"
            width="724"
            height="1420"
            viewBox="0 0 724 1420"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={pathBgMobileRef}
              d={PATH_D}
              fill="none"
              stroke="currentColor"
              className="text-white/10"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ opacity: 0.14 }}
            />
            <path
              ref={pathActiveMobileRef}
              d={PATH_D}
              fill="none"
              stroke="url(#timeline-gradient-exp)"
              strokeWidth="3.5"
              strokeLinecap="round"
              // No heavy filter on mobile for perf
              style={{ willChange: "stroke-dashoffset" }}
            />
          </svg>

          {/* Items — absolute positioned on spline */}
          {/* ITEM 1 — LEFT desktop, right mobile — MAY first per request */}
          <div
            className="timeline-item item-left absolute left-0 right-0"
            style={{ top: "90px" }}
          >
            {/* Desktop layout */}
            <div className="hidden w-full items-center justify-between md:flex">
              <article className="timeline-card group relative flex w-[44%] max-w-[480px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-6 backdrop-blur transition-all duration-500 hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:p-7">
                {/* Left → right white sweep — hover light turning */}
                <div className="pointer-events-none absolute inset-0 z-0 translate-x-[-101%] bg-white transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-0" />
                <div className="pointer-events-none absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-[720ms] ease-out will-change-transform group-hover:translate-x-full group-hover:opacity-100" style={{ transitionDelay: "80ms" }} />
                <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 transition-opacity group-hover:opacity-0 group-[.card-active]:opacity-100" />
                <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-br from-purple-500/[0.05] to-cyan-500/[0.05] opacity-0 blur-xl transition-opacity group-[.card-active]:opacity-100 group-hover:opacity-0" />
                {/* connector */}
                <div className="pointer-events-none absolute -right-[32px] top-[48px] z-10 hidden h-px w-8 bg-gradient-to-r from-white/10 to-cyan-400/40 md:block group-hover:opacity-0" />
                <div className="relative z-10 flex flex-col">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 transition-colors duration-300 group-hover:text-black/45">MAY 2026 — JUN 2026</p>
                  <h3 className="mt-2 text-[18px] font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#050508] md:text-[19px]">Cloud Technical Intern</h3>
                  <p className="text-[13.5px] font-medium text-white/55 transition-colors duration-300 group-hover:text-black/60">MulticoreWare</p>
                  <p className="mt-3 text-[13.5px] leading-[1.65] text-white/65 transition-colors duration-300 group-hover:text-black/75">
                    Worked on cloud and infrastructure-related technical tasks, gaining practical exposure to cloud
                    technologies, containerized environments, and modern development workflows.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experiences[1].tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/65 transition-colors duration-300 group-hover:border-black/10 group-hover:bg-black/[0.06] group-hover:text-black/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              <div className="timeline-node relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
                <div className="node-glow pointer-events-none absolute inset-0 rounded-full bg-cyan-400/20 blur-[16px] opacity-0 transition-opacity duration-500" />
                <div className="relative flex h-[64px] w-[64px] flex-col items-center justify-center rounded-full border border-white/10 bg-[#0a0a12]/85 backdrop-blur transition-all duration-500">
                  <span className="text-[11px] font-bold tracking-[0.12em] text-white/70">MAY</span>
                  <span className="text-[14px] font-black text-white">2026</span>
                </div>
              </div>

              <div className="w-[44%] max-w-[480px]" aria-hidden />
            </div>

            {/* Mobile layout — node left, card right */}
            <div className="grid grid-cols-[56px_1fr] items-start gap-3 px-4 md:hidden">
              <div className="timeline-node relative flex h-[56px] w-[56px] items-center justify-center">
                <div className="relative flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full border border-white/10 bg-[#0a0a12]/85 backdrop-blur">
                  <span className="text-[10px] font-bold tracking-[0.12em] text-white/70">MAY</span>
                  <span className="text-[12px] font-black text-white">2026</span>
                </div>
              </div>
              <article className="timeline-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-5 backdrop-blur transition-colors duration-300 hover:border-white/20">
                <div className="pointer-events-none absolute inset-0 z-0 translate-x-[-101%] bg-white transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-0" />
                <div className="pointer-events-none absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-[720ms] ease-out will-change-transform group-hover:translate-x-full group-hover:opacity-100" style={{ transitionDelay: "80ms" }} />
                <div className="absolute left-0 right-0 top-0 z-10 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 transition-opacity group-hover:opacity-0" />
                <div className="relative z-10 flex flex-col">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 transition-colors duration-300 group-hover:text-black/45">MAY 2026 — JUN 2026</p>
                  <h3 className="mt-2 text-[16px] font-bold text-white transition-colors duration-300 group-hover:text-[#050508]">Cloud Technical Intern</h3>
                  <p className="text-[13px] font-medium text-white/55 transition-colors duration-300 group-hover:text-black/60">MulticoreWare</p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-white/65 transition-colors duration-300 group-hover:text-black/75">
                    Worked on cloud and infrastructure-related technical tasks, gaining practical exposure to cloud
                    technologies, containerized environments, and modern development workflows.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {experiences[1].tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/65 transition-colors duration-300 group-hover:border-black/10 group-hover:bg-black/[0.06] group-hover:text-black/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* ITEM 2 — RIGHT desktop — AUG second */}
          <div
            className="timeline-item item-right absolute left-0 right-0"
            style={{ top: "400px" }}
          >
            {/* Desktop */}
            <div className="hidden w-full items-center justify-between md:flex">
              <div className="w-[44%] max-w-[480px]" aria-hidden />
              <div className="timeline-node relative flex h-[72px] w-[72px] shrink-0 items-center justify-center">
                <div className="node-glow pointer-events-none absolute inset-0 rounded-full bg-cyan-400/20 blur-[16px] opacity-0 transition-opacity duration-500" />
                <div className="relative flex h-[64px] w-[64px] flex-col items-center justify-center rounded-full border border-white/10 bg-[#0a0a12]/85 backdrop-blur transition-all duration-500">
                  <span className="text-[11px] font-bold tracking-[0.12em] text-white/70">AUG</span>
                  <span className="text-[14px] font-black text-white">2026</span>
                </div>
              </div>
              <article className="timeline-card group relative flex w-[44%] max-w-[480px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-6 backdrop-blur transition-all duration-500 hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:p-7">
                <div className="pointer-events-none absolute inset-0 z-0 translate-x-[-101%] bg-white transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-0" />
                <div className="pointer-events-none absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-[720ms] ease-out will-change-transform group-hover:translate-x-full group-hover:opacity-100" style={{ transitionDelay: "80ms" }} />
                <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 transition-opacity group-hover:opacity-0 group-[.card-active]:opacity-100" />
                <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-br from-purple-500/[0.05] to-cyan-500/[0.05] opacity-0 blur-xl transition-opacity group-[.card-active]:opacity-100 group-hover:opacity-0" />
                <div className="pointer-events-none absolute -left-[32px] top-[48px] z-10 hidden h-px w-8 bg-gradient-to-l from-white/10 to-purple-500/40 md:block group-hover:opacity-0" />
                <div className="relative z-10 flex flex-col">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 transition-colors duration-300 group-hover:text-black/45">AUG 2026 — PRESENT</p>
                  <h3 className="mt-2 text-[18px] font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#050508] md:text-[19px]">Web Developer Intern</h3>
                  <p className="text-[13.5px] font-medium text-white/55 transition-colors duration-300 group-hover:text-black/60">DNYX Business Solutions</p>
                  <p className="mt-3 text-[13.5px] leading-[1.65] text-white/65 transition-colors duration-300 group-hover:text-black/75">
                    Working as a Web Developer Intern, contributing to modern web application development and frontend
                    implementation while gaining hands-on experience with production development workflows.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experiences[0].tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/65 transition-colors duration-300 group-hover:border-black/10 group-hover:bg-black/[0.06] group-hover:text-black/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            {/* Mobile */}
            <div className="grid grid-cols-[56px_1fr] items-start gap-3 px-4 md:hidden">
              <div className="timeline-node relative flex h-[56px] w-[56px] items-center justify-center">
                <div className="relative flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full border border-white/10 bg-[#0a0a12]/85 backdrop-blur">
                  <span className="text-[10px] font-bold tracking-[0.12em] text-white/70">AUG</span>
                  <span className="text-[12px] font-black text-white">2026</span>
                </div>
              </div>
              <article className="timeline-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-5 backdrop-blur transition-colors duration-300 hover:border-white/20">
                <div className="pointer-events-none absolute inset-0 z-0 translate-x-[-101%] bg-white transition-transform duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-0" />
                <div className="pointer-events-none absolute inset-0 z-[1] -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-[720ms] ease-out will-change-transform group-hover:translate-x-full group-hover:opacity-100" style={{ transitionDelay: "80ms" }} />
                <div className="absolute left-0 right-0 top-0 z-10 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 transition-opacity group-hover:opacity-0" />
                <div className="relative z-10 flex flex-col">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 transition-colors duration-300 group-hover:text-black/45">AUG 2026 — PRESENT</p>
                  <h3 className="mt-2 text-[16px] font-bold text-white transition-colors duration-300 group-hover:text-[#050508]">Web Developer Intern</h3>
                  <p className="text-[13px] font-medium text-white/55 transition-colors duration-300 group-hover:text-black/60">DNYX Business Solutions</p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-white/65 transition-colors duration-300 group-hover:text-black/75">
                    Working as a Web Developer Intern, contributing to modern web application development and frontend
                    implementation while gaining hands-on experience with production development workflows.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {experiences[0].tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/65 transition-colors duration-300 group-hover:border-black/10 group-hover:bg-black/[0.06] group-hover:text-black/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes experience-marquee {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .timeline-node.node-active > div {
          border-color: rgba(255,255,255,0.22) !important;
          background: rgba(18,18,28,0.92) !important;
          box-shadow: 0 0 22px rgba(34,211,238,0.24), 0 0 42px rgba(168,85,247,0.18) !important;
          transform: scale(1.04);
        }
        .timeline-node.node-active .node-glow { opacity: 1 !important; }
        .timeline-card.card-active {
          border-color: rgba(255,255,255,0.11) !important;
          background: rgba(14,14,22,0.86) !important;
          box-shadow: 0 16px 44px rgba(0,0,0,0.48), 0 0 26px rgba(124,58,237,0.09) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .timeline-card, .timeline-node { transform: none !important; opacity: 1 !important; }
          .experience-poster-bg > div > div { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
