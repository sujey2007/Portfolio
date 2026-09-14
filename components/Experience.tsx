"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "./HeroBackground";

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
  const pathActiveRef = useRef<SVGPathElement>(null);
  const pathActiveMobileRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pathActive = pathActiveRef.current;
      const pathActiveMobile = pathActiveMobileRef.current;
      const pathBg = pathBgRef.current;
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!pathActive || !pathBg || !section) return;

      const length = pathActive.getTotalLength();
      const activePaths: SVGPathElement[] = [pathActive, pathActiveMobile as SVGPathElement].filter(Boolean) as SVGPathElement[];
      gsap.set([pathBg, ...activePaths], { strokeDasharray: length });
      gsap.set(activePaths, { strokeDashoffset: length });
      gsap.set(pathBg, { strokeDashoffset: 0, opacity: 0.14 });
      // Ensure mobile bg also visible
      const bgMobile = document.querySelector<SVGPathElement>(".timeline-svg.md\\:hidden path[stroke='currentColor']");
      if (bgMobile) gsap.set(bgMobile, { strokeDasharray: length, strokeDashoffset: 0, opacity: 0.14 });

      gsap.to(activePaths, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Nodes
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.9, opacity: 0.65 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 82%",
              end: "top 58%",
              scrub: 0.6,
              onEnter: () => node.classList.add("node-active"),
              onLeaveBack: () => node.classList.remove("node-active"),
              onEnterBack: () => node.classList.add("node-active"),
              onLeave: () => node.classList.remove("node-active"),
            },
          }
        );
      });

      // Cards
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item) => {
        const card = item.querySelector<HTMLElement>(".timeline-card");
        if (!card) return;
        const isLeft = item.classList.contains("item-left");
        gsap.fromTo(
          card,
          { x: isLeft ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              end: "top 60%",
              scrub: 0.9,
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

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden scroll-mt-8 bg-[#050508] py-16 md:py-24 lg:py-28"
      aria-label="Work Experience"
    >
      <div className="absolute inset-0 z-0">
        <HeroBackground />
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
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.4px rgba(220,220,225,0.90)",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.4px rgba(220,220,225,0.90)",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.4px rgba(220,220,225,0.90)",
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
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.4px rgba(220,220,225,0.90)",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.4px rgba(220,220,225,0.90)",
                  textTransform: "uppercase",
                }}
              >
                WORK EXPERIENCE
              </span>
              <span
                className="block text-[18vw] font-black leading-none tracking-[-0.06em] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw]"
                style={{
                  fontFamily: "'Bodoni MT Black','Bodoni MT','Bodoni Moda',Georgia,serif",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.4px rgba(220,220,225,0.90)",
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
        <div className="mx-auto max-w-[720px] text-center pt-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-[520px] text-[14px] leading-[1.7] text-white/55"
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
              <filter id="timeline-glow-exp" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
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
            />
            <path
              ref={pathActiveRef}
              d={PATH_D}
              fill="none"
              stroke="url(#timeline-gradient-exp)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#timeline-glow-exp)"
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
              d={PATH_D}
              fill="none"
              stroke="currentColor"
              className="text-white/10"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              ref={pathActiveMobileRef}
              d={PATH_D}
              fill="none"
              stroke="url(#timeline-gradient-exp)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#timeline-glow-exp)"
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
              <article className="timeline-card group relative flex w-[44%] max-w-[480px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-6 backdrop-blur transition-all duration-500 md:p-7">
                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 transition-opacity group-[.card-active]:opacity-100" />
                <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-br from-purple-500/[0.05] to-cyan-500/[0.05] opacity-0 blur-xl transition-opacity group-[.card-active]:opacity-100" />
                {/* connector */}
                <div className="pointer-events-none absolute -right-[32px] top-[48px] hidden h-px w-8 bg-gradient-to-r from-white/10 to-cyan-400/40 md:block" />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">MAY 2026 — JUN 2026</p>
                <h3 className="mt-2 text-[18px] font-bold leading-tight text-white md:text-[19px]">Cloud Technical Intern</h3>
                <p className="text-[13.5px] font-medium text-white/55">MulticoreWare</p>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-white/65">
                  Worked on cloud and infrastructure-related technical tasks, gaining practical exposure to cloud
                  technologies, containerized environments, and modern development workflows.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experiences[1].tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/65">
                      {t}
                    </span>
                  ))}
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
              <article className="timeline-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-5 backdrop-blur">
                <div className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60" />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">MAY 2026 — JUN 2026</p>
                <h3 className="mt-2 text-[16px] font-bold text-white">Cloud Technical Intern</h3>
                <p className="text-[13px] font-medium text-white/55">MulticoreWare</p>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/65">
                  Worked on cloud and infrastructure-related technical tasks, gaining practical exposure to cloud
                  technologies, containerized environments, and modern development workflows.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {experiences[1].tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/65">
                      {t}
                    </span>
                  ))}
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
              <article className="timeline-card group relative flex w-[44%] max-w-[480px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-6 backdrop-blur transition-all duration-500 md:p-7">
                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 transition-opacity group-[.card-active]:opacity-100" />
                <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-br from-purple-500/[0.05] to-cyan-500/[0.05] opacity-0 blur-xl transition-opacity group-[.card-active]:opacity-100" />
                <div className="pointer-events-none absolute -left-[32px] top-[48px] hidden h-px w-8 bg-gradient-to-l from-white/10 to-purple-500/40 md:block" />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">AUG 2026 — PRESENT</p>
                <h3 className="mt-2 text-[18px] font-bold leading-tight text-white md:text-[19px]">Web Developer Intern</h3>
                <p className="text-[13.5px] font-medium text-white/55">DNYX Business Solutions</p>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-white/65">
                  Working as a Web Developer Intern, contributing to modern web application development and frontend
                  implementation while gaining hands-on experience with production development workflows.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experiences[0].tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/65">
                      {t}
                    </span>
                  ))}
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
              <article className="timeline-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/75 p-5 backdrop-blur">
                <div className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60" />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">AUG 2026 — PRESENT</p>
                <h3 className="mt-2 text-[16px] font-bold text-white">Web Developer Intern</h3>
                <p className="text-[13px] font-medium text-white/55">DNYX Business Solutions</p>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/65">
                  Working as a Web Developer Intern, contributing to modern web application development and frontend
                  implementation while gaining hands-on experience with production development workflows.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {experiences[0].tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/65">
                      {t}
                    </span>
                  ))}
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
