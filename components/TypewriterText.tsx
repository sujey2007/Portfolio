"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES: readonly string[] = [
  "Android Developer",
  "Blockchain & Web3 Engineer",
  "AI/ML Enthusiast",
] as const;

// Timing matches spec: typing 70–100ms, deleting 40–60ms, pause 1.5–2s
const TYPING_MS = 85;
const DELETING_MS = 45;
const PAUSE_AFTER_TYPING_MS = 1800;
const PAUSE_AFTER_DELETING_MS = 400;

export default function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPhrase = PHRASES[phraseIndex];
  const displayedText = currentPhrase.slice(0, charIndex);

  useEffect(() => {
    let delay: number;

    if (!isDeleting && charIndex < currentPhrase.length) {
      // Typing forward
      delay = TYPING_MS + Math.round((Math.random() - 0.5) * 16); // subtle jitter ±8ms
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      // Finished typing current phrase -> pause before deleting
      delay = PAUSE_AFTER_TYPING_MS;
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      delay = DELETING_MS;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting -> short pause before next phrase
      delay = PAUSE_AFTER_DELETING_MS;
    } else {
      delay = TYPING_MS;
    }

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setCharIndex((v) => v + 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex((v) => v - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, isDeleting, currentPhrase, phraseIndex]);

  // Cleanup on unmount (extra safety — effect cleanup already handles it)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      // Bottom-left role label — typewriter
      aria-live="polite"
      aria-label="Professional roles"
      className="pointer-events-none select-none"
    >
      <p
        className="
          flex items-center
          leading-none
          text-[#fdf8ec] antialiased
          tracking-[0.04em]
          text-[17px] sm:text-[19px] md:text-[20px] lg:text-[22px] xl:text-[24px]
          max-w-[calc(100vw-40px)] sm:max-w-none
        "
        style={{
          fontFamily: "Algerian, 'Bodoni MT Black', Georgia, serif",
          fontWeight: 400,
          // No highlight / glow / shining block — clean dark background
          textShadow: "none",
          background: "transparent",
          // Reserve height to avoid layout shift; 1.2em line height keeps it compact
          minHeight: "1.2em",
        }}
      >
        {/* Text — keep single line when possible, allow wrap only on very small screens */}
        <span
          className="
            inline-block
            whitespace-nowrap
            max-[360px]:whitespace-normal max-[360px]:break-words
            max-[360px]:leading-[1.12]
          "
        >
          {displayedText}
          {/* Zero-width space keeps line height stable when empty */}
          {displayedText.length === 0 && "\u200B"}
        </span>

        {/* Thin blinking neon cursor */}
        <span
          aria-hidden="true"
          className="ml-[3px] inline-block shrink-0 self-center"
          style={{
            width: "2px",
            height: "1.15em",
            background: "#a78bfa",
            boxShadow: "0 0 8px rgba(167,139,250,0.75), 0 0 14px rgba(167,139,250,0.35)",
            borderRadius: "1px",
            animation: "typewriter-blink 1s step-end infinite",
            transform: "translateY(1px)",
          }}
        />
      </p>

      {/* Scoped keyframes — avoids global file edit yet keeps neon blink */}
      <style>{`
        @keyframes typewriter-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          span[aria-hidden="true"] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Screen-reader only — ensures full phrase context without affecting visuals */}
      <span className="sr-only">
        {PHRASES.join(", ")}
      </span>
    </div>
  );
}
