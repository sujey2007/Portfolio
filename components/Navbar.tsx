"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Find most visible section near top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          const label = navLinks.find((l) => l.href === `#${visible.target.id}`)?.label;
          if (label) setActive(label);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    // Fallback: scroll handler for top
    const onScroll = () => {
      if (window.scrollY < 120) setActive("Home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050508]/60 backdrop-blur-xl supports-[backdrop-filter]:bg-[#050508]/45"
    >
      {/* subtle top gradient for readability, preserved */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none" />

      <nav className="relative mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-8 lg:px-10">
        {/* LEFT - Logo + Name */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.10] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="text-[13px] font-bold tracking-widest text-white">SH</span>
          </div>
          <span className="hidden text-[15px] font-medium tracking-[-0.02em] text-white/90 sm:block group-hover:text-white transition-colors">
            Sujey H
          </span>
        </a>

        {/* CENTER - Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:gap-8 xl:gap-9 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/55 hover:text-white/90"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-[5px] left-0 right-0 h-px bg-white"
                  />
                )}
                {!isActive && (
                  <span className="absolute -bottom-[5px] left-0 right-0 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </a>
            );
          })}
        </div>

        {/* RIGHT - CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#a78bfa]/30 bg-transparent px-[22px] py-[9px] text-[13.5px] font-medium tracking-[-0.01em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#a78bfa]/60 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(168,85,247,0.25),0_0_8px_rgba(168,85,247,0.15)]"
          >
            Let&apos;s Talk
          </motion.a>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 5 : 0, width: 16 }}
                className="block h-[1.5px] bg-white origin-center"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block h-[1.5px] w-4 bg-white"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -5 : 0, width: 16 }}
                className="block h-[1.5px] bg-white origin-center"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden relative mx-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/90 backdrop-blur-xl"
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link) => {
                const isActive = active === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-[14px] font-medium transition-colors ${
                      isActive ? "bg-white/[0.08] text-white" : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="p-2 pt-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-full border border-[#a78bfa]/30 bg-white/[0.06] py-3 text-[14px] font-medium text-white backdrop-blur"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
