"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ultra, Anton } from "next/font/google";

const ultra = Ultra({ subsets: ["latin"], weight: ["400"] });
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

type Project = {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string[];
  technologies: string[];
  achievement?: { label: string; sub?: string; accent?: boolean };
  impact?: string;
};

const PROJECTS: Project[] = [
  {
    number: "01",
    title: "SAKSHI",
    subtitle: "Decentralized Forensic Evidence Platform",
    category: "Web3 · Android · Forensics",
    description: [
      "A decentralized application for secure digital forensic evidence management.",
      "Built tamper-proof evidence system using Solidity smart contracts and IPFS.",
      "Developed React.js dashboard for audit trails — reduced verification time by 30%.",
      "Led a 4-person team building the companion Android app with Java & Kotlin.",
    ],
    technologies: ["Java", "Kotlin", "Solidity", "IPFS", "React.js", "Smart Contracts", "Android"],
    achievement: { label: "🏆 1st of 400 teams", sub: "KAAVAL Hackathon 2026", accent: true },
    impact: "Tamper-proof evidence vault · 30% faster verification",
  },
  {
    number: "02",
    title: "AGRICOACH",
    subtitle: "AI Agricultural Ecosystem",
    category: "AI · Mobile · Cloud",
    description: [
      "AI-powered agricultural ecosystem with multiple intelligent modules.",
      "AI selling advisor, crop health analysis, financial hub and OCR receipt processing.",
      "Loan scheduling, government scheme eligibility, demand forecasting and soil health insights.",
    ],
    technologies: ["React Native", "Expo", "Python", "FastAPI", "Gemini", "Amazon Bedrock", "AI/ML"],
    impact: "9 AI modules · From field to finance",
  },
  {
    number: "03",
    title: "SURAKSHA",
    subtitle: "AI Disaster Intelligence Platform",
    category: "AI · Disaster Response",
    description: [
      "AI-powered disaster intelligence platform for early warning and coordinated response.",
      "Real-time monitoring with predictive risk assessment and resource allocation.",
      "Automated impact analysis for faster, data-driven emergency decision-making.",
    ],
    technologies: ["Python", "AI/ML", "React", "FastAPI", "TensorFlow", "Geospatial"],
    impact: "Early warning · Real-time response",
  },
  {
    number: "04",
    title: "CI/CD ORCHESTRATION ENGINE",
    subtitle: "Automated Hybrid CI/CD for Containerized Expo App",
    category: "DevOps · Cloud · GitOps",
    description: [
      "Decoupled dual-method CI/CD: GitHub Actions for cloud validation, Helm v3 for manifest dry-run.",
      "Multi-stage Docker builds with Git commit SHAs as immutable tags.",
      "Minikube for local rollout testing · fail-fast workflows · telemetry & compliance reporting.",
    ],
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Helm", "Minikube", "GitOps", "Prometheus", "PowerShell", "CI/CD"],
    impact: "Immutable deploys · Zero-drift validation",
  },
];

const AGRICOACH_MODULES = [
  "AI selling advisor",
  "Crop health analysis",
  "Financial hub",
  "OCR receipt processing",
  "Loan scheduling",
  "Gov scheme eligibility",
  "Demand forecasting",
  "Irrigation scheduling",
  "Soil health insights",
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressNumberRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== 4) return;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", position: "relative" as any, inset: "auto" as any });
        cards.forEach((c) => {
          (c as HTMLElement).style.position = "relative";
          (c as HTMLElement).style.inset = "auto";
          (c as HTMLElement).style.marginBottom = "20px";
        });
        if (cardsWrapRef.current) {
          cardsWrapRef.current.style.display = "block";
          cardsWrapRef.current.style.height = "auto";
        }
        if (pin) {
          pin.style.height = "auto";
          pin.style.maxHeight = "none";
        }
        if (titleRef.current) gsap.set(titleRef.current, { x: "0vw", opacity: 0.5 });
        if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: 1 });
        if (progressNumberRef.current) progressNumberRef.current.textContent = "04 — 04";
        dotRefs.current.forEach((d, i) => {
          if (d) d.style.opacity = i === 3 ? "1" : "0.35";
        });
        return;
      }

      // ONE CARD VISIBLE — others fully hidden (no bleed)
      gsap.set(cards, { autoAlpha: 0, y: 28, scale: 0.98, filter: "blur(4px)", visibility: "hidden" as any, pointerEvents: "none" as any });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", visibility: "visible" as any, pointerEvents: "auto" as any });
      if (titleRef.current) gsap.set(titleRef.current, { x: "-100vw", opacity: 0 });
      if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: 0.25 });
      if (progressNumberRef.current) progressNumberRef.current.textContent = "01 — 04";
      dotRefs.current.forEach((d, i) => {
        if (!d) return;
        gsap.set(d, { scale: i === 0 ? 1.4 : 1, opacity: i === 0 ? 1 : 0.3, backgroundColor: i === 0 ? "#ffffff" : "rgba(255,255,255,0.2)" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          pin: pin,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const barProgress = 0.25 + p * 0.75;
            if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: barProgress });
            const idx = Math.min(3, Math.floor(p * 4 + 0.0001));
            const display = `0${idx + 1} — 04`;
            if (progressNumberRef.current && progressNumberRef.current.textContent !== display) {
              progressNumberRef.current.textContent = display;
            }
            dotRefs.current.forEach((d, i) => {
              if (!d) return;
              const active = i === idx || (p >= 0.99 && i === 3);
              gsap.set(d, {
                scale: active ? 1.4 : 1,
                opacity: active ? 1 : 0.32,
                backgroundColor: active ? "#ffffff" : "rgba(255,255,255,0.22)",
              });
            });
            // Enforce single visibility — scrub may be mid-transition, ensure only active is visible outside transition windows
            // Timeline handles visibility during transitions via onStart/onComplete, but keep dots/number in sync
          },
        },
      });

      // Title: hidden left → center for 01-04, then hidden right after 04
      if (titleRef.current) {
        tl.fromTo(titleRef.current, { x: "-100vw", opacity: 0 }, { x: "0vw", opacity: 0.5, duration: 0.5, ease: "power2.out" }, 0)
          .to(titleRef.current, { x: "0vw", opacity: 0.5, duration: 2.8 }, 0.5)
          .to(titleRef.current, { x: "100vw", opacity: 0, duration: 0.5, ease: "power2.in" }, 3.3);
      }

      // Sequential — old fully out BEFORE new in (no overlapping readable text)
      // 01 -> 02
      tl.to(cards[0], { autoAlpha: 0, y: -22, scale: 0.98, filter: "blur(4px)", duration: 0.32, ease: "power2.in", onComplete: () => { (cards[0] as HTMLElement).style.visibility = "hidden"; (cards[0] as HTMLElement).style.pointerEvents = "none"; } }, 0.78)
        .fromTo(cards[1], { autoAlpha: 0, y: 22, scale: 0.98, filter: "blur(4px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "power2.out", onStart: () => { (cards[1] as HTMLElement).style.visibility = "visible"; (cards[1] as HTMLElement).style.pointerEvents = "auto"; } }, 1.12);

      // 02 -> 03
      tl.to(cards[1], { autoAlpha: 0, y: -22, scale: 0.98, filter: "blur(4px)", duration: 0.32, ease: "power2.in", onComplete: () => { (cards[1] as HTMLElement).style.visibility = "hidden"; (cards[1] as HTMLElement).style.pointerEvents = "none"; } }, 1.78)
        .fromTo(cards[2], { autoAlpha: 0, y: 22, scale: 0.98, filter: "blur(4px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "power2.out", onStart: () => { (cards[2] as HTMLElement).style.visibility = "visible"; (cards[2] as HTMLElement).style.pointerEvents = "auto"; } }, 2.12);

      // 03 -> 04
      tl.to(cards[2], { autoAlpha: 0, y: -22, scale: 0.98, filter: "blur(4px)", duration: 0.32, ease: "power2.in", onComplete: () => { (cards[2] as HTMLElement).style.visibility = "hidden"; (cards[2] as HTMLElement).style.pointerEvents = "none"; } }, 2.78)
        .fromTo(cards[3], { autoAlpha: 0, y: 22, scale: 0.98, filter: "blur(4px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "power2.out", onStart: () => { (cards[3] as HTMLElement).style.visibility = "visible"; (cards[3] as HTMLElement).style.pointerEvents = "auto"; } }, 3.12);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" aria-label="Projects — Scroll Showcase" className="relative bg-[#050508] overflow-hidden">
      <div ref={pinRef} className="relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-[#050508]">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full blur-[90px] opacity-40" style={{ width: "680px", height: "560px", right: "10%", top: "38%", transform: "translateY(-50%)", background: "radial-gradient(ellipse at center, rgba(120,40,200,0.08) 0%, transparent 70%)" }} />
          <div className="absolute rounded-full blur-[90px] opacity-30" style={{ width: "720px", height: "580px", left: "8%", bottom: "8%", background: "radial-gradient(ellipse at center, rgba(30,160,220,0.06) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.22]" style={{
            backgroundImage: `radial-gradient(1.1px 1.1px at 11% 14%, rgba(255,255,255,0.60) 50%, transparent 51%), radial-gradient(1px 1px at 23% 26%, rgba(255,255,255,0.35) 50%, transparent 51%), radial-gradient(1px 1px at 63% 24%, rgba(255,255,255,0.32) 50%, transparent 51%)`
          }} />
        </div>
        {/* Giant PROJECTS — hidden left → center while cards show, then hidden right after 04 */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] select-none overflow-hidden opacity-100">
          <div ref={titleRef} className="absolute inset-0 flex justify-center pt-[8%] md:pt-[6%] will-change-transform">
            <span className={`${anton.className} block whitespace-nowrap text-[20vw] leading-none tracking-[-0.02em] sm:text-[18vw] md:text-[14vw] lg:text-[11vw] xl:text-[9vw]`} style={{ color: "rgba(160,160,160,0.20)", WebkitTextFillColor: "rgba(160,160,160,0.20)", WebkitTextStroke: "1.4px rgba(255,255,255,0.90)", textTransform: "uppercase" }}>PROJECTS</span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/40 via-black/10 to-transparent z-0" />
        {/* Header — inside pin, above cards, minimal (no title/counter/Cinematic) */}
        <div className="projects-header relative z-20 bg-[#050508]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            <div className="absolute rounded-full blur-[90px] opacity-20" style={{ width: "640px", height: "260px", left: "50%", top: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(ellipse at center, rgba(120,40,200,0.12) 0%, transparent 70%)" }} />
          </div>
          <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10 py-1.5 md:py-2">
            <div className="flex items-center justify-end gap-4 md:gap-6 min-h-[14px]">
              <div className="hidden sm:flex items-center gap-1.5 opacity-0 pointer-events-none" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} ref={(el) => { dotRefs.current[i] = el; }} className="h-1.5 w-1.5 rounded-full bg-white/20" />
                ))}
              </div>
            </div>
            <div ref={progressBarRef} className="hidden" aria-hidden="true" />
            <span ref={progressNumberRef} className="hidden" aria-hidden="true">01 — 04</span>
          </div>
        </div>

        {/* Card stage — moved down so card fully visible, not half clipped */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-5 md:px-8 lg:px-10 pb-4 md:pb-6 pt-36 md:pt-40">
          <div ref={cardsWrapRef} className="relative h-full w-full max-w-[880px] flex items-center justify-center">
            {PROJECTS.map((p, idx) => {
              const isFirst = idx === 0;
              return (
                <div
                  key={p.number}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{ willChange: "transform, opacity, filter" }}
                  aria-hidden={idx !== 0 ? true : undefined}
                >
                  {/* ONE stable card container — same dimensions/position/border for all, only content swaps via parent visibility */}
                  <article
                    className={`relative flex w-full max-w-[880px] flex-col overflow-hidden rounded-[20px] md:rounded-[24px] border bg-[#0a0a12]/75 backdrop-blur-xl
                    ${isFirst ? "border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.12),0_16px_48px_rgba(0,0,0,0.45)]" : "border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"}
                    max-h-[68svh] md:max-h-[62svh]`}
                    style={{ transform: "translateZ(0)" }}
                  >
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60" />
                    <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-br from-purple-500/[0.04] to-cyan-500/[0.04] blur-xl opacity-60" />
                    <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-2 md:right-4 md:top-3 select-none">
                      <span className={`block font-black leading-none tracking-[-0.04em] ${ultra.className}`} style={{ fontSize: "clamp(64px, 11vw, 108px)", color: isFirst ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.022)", lineHeight: 0.85 }}>{p.number}</span>
                    </div>

                    <div className="relative flex flex-col p-5 md:p-7 lg:p-8 overflow-y-auto scrollbar-thin">
                      <h3 className={`text-[22px] md:text-[30px] lg:text-[32px] font-black leading-[0.95] tracking-[-0.02em] text-white ${ultra.className}`} style={{ lineHeight: 0.95 }}>{p.title}</h3>
                      <p className="mt-1.5 text-[12px] md:text-[13px] font-medium leading-tight text-white/55">{p.subtitle}</p>

                      {p.achievement && (
                        <div className={`mt-3 md:mt-4 inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 md:px-4 md:py-2 ${isFirst ? "border-white bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.15)]" : "border-white/10 bg-white/[0.06] text-white"}`}>
                          <span className={`text-[11px] md:text-[12px] font-black tracking-[-0.01em] ${isFirst ? "text-black" : "text-white"}`}>{p.achievement.label}</span>
                          {p.achievement.sub && <span className={`hidden md:inline text-[11px] font-medium ${isFirst ? "text-black/60" : "text-white/55"}`}>— {p.achievement.sub}</span>}
                        </div>
                      )}
                      {p.achievement?.sub && (
                        <p className="md:hidden mt-1.5 text-[11px] font-medium text-white/45">{p.achievement.sub}</p>
                      )}

                      <div className="mt-4 md:mt-5 space-y-2">
                        {p.description.map((line, i) => (
                          <p key={i} className="flex gap-2 text-[12.5px] md:text-[13.5px] leading-[1.6] text-white/65">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/25 md:mt-[9px]" />
                            <span>{line}</span>
                          </p>
                        ))}
                        {p.number === "02" && (
                          <div className="mt-3 flex flex-wrap gap-1.5 md:gap-2">
                            {AGRICOACH_MODULES.map((m) => (
                              <span key={m} className="rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-[10px] md:text-[11px] font-medium text-white/60">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                        {p.number === "03" && (
                          <div className="mt-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/30">Stack — AI/ML · Geospatial · Real-time</p>
                          </div>
                        )}
                      </div>

                      {p.impact && (
                        <div className="mt-4 flex items-center gap-2 text-[11px] md:text-[12px] font-medium text-white/45">
                          <span className="h-px w-6 bg-white/15 hidden md:block" />
                          <span className="tracking-[-0.01em]">{p.impact}</span>
                        </div>
                      )}

                      <div className="mt-4 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
                        {p.technologies.map((t) => (
                          <span key={t} className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 md:px-3 md:py-1 text-[10px] md:text-[11px] font-medium text-white/65 backdrop-blur">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 md:mt-6 relative overflow-hidden rounded-xl border border-white/[0.05] bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-3 md:p-4">
                        <div className="absolute inset-0 opacity-30" style={{
                          backgroundImage: `radial-gradient(1px 1px at 18% 32%, rgba(255,255,255,0.30) 50%, transparent 51%)`
                        }} />
                        <div className="relative flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-[11px] font-bold text-white/70">{p.number}</span>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold tracking-[0.08em] text-white/50 uppercase">Abstract Visual</span>
                              <span className="text-[11px] text-white/30 hidden md:block">Future image — content focus</span>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">Case Study</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
