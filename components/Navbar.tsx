"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      // Trigger line ~30% down viewport, just below fixed header — the section that straddles this line is active.
      // This correctly handles pinned Projects (500vh tall) — it stops straddling once its bottom passes the line, so Contact can take over.
      const triggerY = 160; // px below viewport top (header ~60px + 100px buffer)
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) {
        setActive("Contact");
        return;
      }
      if (window.scrollY < 80) {
        setActive("Home");
        return;
      }
      let activeCandidate: string | null = null;
      // Iterate in DOM order Home->Contact; last one that straddles the line wins, but we check straddle first.
      // For pinned Projects, its rect will be huge (-2000 to +2000) and will straddle for a long time — that's correct while pinned.
      // Once Contact wrapper enters and its top crosses triggerY, it will also straddle, but we want the *lowest* section that straddles to win (closest to top).
      // So we collect all straddling sections and pick the one whose top is closest to triggerY from above.
      let bestTop = -Infinity;
      for (const link of navLinks) {
        const id = link.href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const straddles = rect.top <= triggerY && rect.bottom >= triggerY;
        if (straddles) {
          // Among straddling sections, pick the one with largest top (closest to trigger line from above)
          // This ensures when Projects (top -2000) and Contact (top 100) both straddle, Contact wins as it is lower/closer.
          if (rect.top > bestTop) {
            bestTop = rect.top;
            activeCandidate = link.label;
          }
        }
      }
      // Fallback: if nothing straddles (e.g., between sections), pick last section whose top is above triggerY
      if (!activeCandidate) {
        for (const link of navLinks) {
          const id = link.href.slice(1);
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            activeCandidate = link.label;
          }
        }
      }
      if (activeCandidate) {
        // Explicitly ensures Projects is deactivated when Contact is active — only one setActive call
        setActive(activeCandidate);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Smooth scroll click should immediately show Contact — handle hash and clicks
    const onHashChange = () => {
      const hash = window.location.hash;
      const label = navLinks.find((l) => l.href === hash)?.label;
      if (label) setActive(label);
      // Defer updateActive to after scroll
      setTimeout(updateActive, 50);
    };
    window.addEventListener("hashchange", onHashChange);

    // Also listen for clicks on nav links to immediately set active (avoids stale Projects during smooth scroll)
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute("href");
        const label = navLinks.find((l) => l.href === href)?.label;
        if (label) {
          // Immediately set, then let scroll handler correct if needed
          setActive(label);
        }
      }
    };
    document.addEventListener("click", handleNavClick);

    // Initial
    updateActive();
    const hash = window.location.hash;
    if (hash) {
      const label = navLinks.find((l) => l.href === hash)?.label;
      if (label) setActive(label);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", handleNavClick);
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
