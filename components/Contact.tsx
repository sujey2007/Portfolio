"use client";

import { useState } from "react";

// ──────────────────────────────────────────────────────────
// PART 1 — Editorial Diagonal Poster (TEXT/CSS ONLY)
// Exactly 2 large diagonal bands crossing in an X
// Lightweight CSS-only marquee — no scroll JS, no RAF
// ──────────────────────────────────────────────────────────
function EditorialPoster() {
  const serif = "'Bodoni Moda','Bodoni MT',Georgia,serif";
  // Repeated editorial phrases — high-contrast serif, cream/off-white
  const row1 = "CONNECT  •  CREATE  •  COLLABORATE  •  BUILD  •  ";
  const row2 = "DEVELOP  •  DESIGN  •  DEPLOY  •  DELIVER  •  ";

  const Repeat = ({ text, count = 7 }: { text: string; count?: number }) => (
    <span className="inline-flex items-center whitespace-nowrap">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="whitespace-nowrap">
          {text}
        </span>
      ))}
    </span>
  );

  return (
    <section
      aria-label="Editorial transition — diagonal poster"
      className="relative overflow-hidden bg-[#050508]"
      style={{ height: "clamp(300px, 36vw, 440px)" }}
    >
      {/* pure black background — no starfield, no glow */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Center container for the X — bands are oversized and rotated */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Band 1 — rotated +5deg, LEFT → RIGHT */}
        <div
          className="absolute left-1/2 top-1/2 flex h-[56px] md:h-[66px] lg:h-[72px] w-[160vw] items-center overflow-hidden border-y border-white/[0.07] bg-[#0f0f12] md:w-[150vw] lg:w-[140vw]"
          style={{ transform: "translate(-50%, -50%) rotate(5deg)", transformOrigin: "center center" }}
        >
          <div className="flex h-full w-max items-center will-change-transform animate-[poster-ltr_42s_linear_infinite]">
            <span
              className="inline-flex items-center pr-0 text-[18px] font-black leading-none tracking-[0.08em] text-[#f2ede6] md:text-[22px] lg:text-[26px] xl:text-[28px] select-none"
              style={{ fontFamily: serif }}
            >
              <Repeat text={row1} count={8} />
              <Repeat text={row1} count={8} />
            </span>
            <span
              aria-hidden="true"
              className="inline-flex items-center pr-0 text-[18px] font-black leading-none tracking-[0.08em] text-[#f2ede6] md:text-[22px] lg:text-[26px] xl:text-[28px] select-none"
              style={{ fontFamily: serif }}
            >
              <Repeat text={row1} count={8} />
              <Repeat text={row1} count={8} />
            </span>
          </div>
        </div>

        {/* Band 2 — rotated -5deg, RIGHT → LEFT — crosses Band 1 */}
        <div
          className="absolute left-1/2 top-1/2 flex h-[56px] md:h-[66px] lg:h-[72px] w-[160vw] items-center overflow-hidden border-y border-white/[0.07] bg-[#0a0a0f] md:w-[150vw] lg:w-[140vw]"
          style={{ transform: "translate(-50%, -50%) rotate(-5deg)", transformOrigin: "center center" }}
        >
          <div className="flex h-full w-max items-center will-change-transform animate-[poster-rtl_42s_linear_infinite]">
            <span
              className="inline-flex items-center pr-0 text-[18px] font-black leading-none tracking-[0.08em] text-[#f2ede6] md:text-[22px] lg:text-[26px] xl:text-[28px] select-none"
              style={{ fontFamily: serif }}
            >
              <Repeat text={row2} count={8} />
              <Repeat text={row2} count={8} />
            </span>
            <span
              aria-hidden="true"
              className="inline-flex items-center pr-0 text-[18px] font-black leading-none tracking-[0.08em] text-[#f2ede6] md:text-[22px] lg:text-[26px] xl:text-[28px] select-none"
              style={{ fontFamily: serif }}
            >
              <Repeat text={row2} count={8} />
              <Repeat text={row2} count={8} />
            </span>
          </div>
        </div>
      </div>

      {/* thin top/bottom hairlines for the poster section itself — keep almost invisible editorial feel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.04]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.04]" />

      <style>{`
        @keyframes poster-ltr {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes poster-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[poster-ltr_42s_linear_infinite\\],
          .animate-\\[poster-rtl_42s_linear_infinite\\] {
            animation: none !important;
            transform: translate3d(0,0,0) !important;
          }
        }
      `}</style>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// PART 2 — Let's Connect (Premium two-column)
// ──────────────────────────────────────────────────────────
type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;

function ContactForm() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "valid" | "error">("idle");

  const validate = (v: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!v.name.trim()) e.name = "Please enter your name.";
    else if (v.name.trim().length < 2) e.name = "Name should be at least 2 characters.";

    if (!v.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";

    if (!v.subject.trim()) e.subject = "Please enter a subject.";
    else if (v.subject.trim().length < 3) e.subject = "Subject should be at least 3 characters.";

    if (!v.message.trim()) e.message = "Please enter your message.";
    else if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";

    return e;
  };

  const handleChange = (field: keyof FormState, val: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: val };
      if (touched[field]) {
        const err = validate(next);
        setErrors((prevErr) => ({ ...prevErr, [field]: err[field] }));
      }
      return next;
    });
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((p) => ({ ...p, [field]: true }));
    // validate with latest values from state closure — safe as blur follows committed state
    const next = validate(values);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(v).length > 0) {
      setStatus("error");
      const first = (Object.keys(v)[0] as keyof FormState) || "name";
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("valid");
    // eslint-disable-next-line no-console
    console.log("[Contact] Validated payload ready for backend:", values);
  };

  const inputBase =
    "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-[14px] font-medium leading-tight text-white placeholder:text-white/30 backdrop-blur transition-all duration-200 focus:outline-none";

  const getBorder = (field: keyof FormState) =>
    errors[field] ? "border-red-500/50 focus:border-red-400/70 focus:bg-white/[0.06]" : "border-white/[0.08] focus:border-white/18 focus:bg-white/[0.06] hover:border-white/[0.12]";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col">
      <div className="grid grid-cols-1 gap-4 md:gap-5">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Sujey H"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${inputBase} ${getBorder("name")}`}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-[11px] font-medium text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@domain.com"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${inputBase} ${getBorder("email")}`}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-[11px] font-medium text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Project inquiry — Android / Web3 / AI"
            value={values.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            onBlur={() => handleBlur("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            className={`${inputBase} ${getBorder("subject")}`}
          />
          {errors.subject && (
            <p id="contact-subject-error" className="mt-1.5 text-[11px] font-medium text-red-300">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Tell me about your idea, timeline and goals…"
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${inputBase} ${getBorder("message")} min-h-[128px] resize-none py-3.5 leading-[1.6]`}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-[11px] font-medium text-red-300">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-6 py-3.5 text-[13.5px] font-semibold tracking-[-0.01em] text-black transition-all duration-300 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.99]"
        >
          <span className="absolute inset-0 -z-10 translate-x-[-101%] bg-[#050508] transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-[380ms] group-hover:text-white">
            Send Message
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <p className="mt-3 text-center text-[11px] leading-[1.5] text-white/35">
          Your information stays private. No spam — I’ll reply directly to your email.
        </p>

        {status === "valid" && (
          <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
            <p className="text-[13px] font-medium leading-[1.6] text-emerald-200/90">
              Form validated — ready to connect. <span className="text-white/60">Hook this form to your email service (API route / Formspree / Resend) to enable delivery. No endpoint invented.</span>
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 rounded-xl border border-red-500/15 bg-red-500/[0.06] px-4 py-3">
            <p className="text-[12px] font-medium text-red-200/85">Please fix the highlighted fields and try again.</p>
          </div>
        )}
      </div>
    </form>
  );
}

export default function Contact() {
  const [socialActive, setSocialActive] = useState<number | null>(null);
  return (
    <div id="contact" className="scroll-mt-24">
      <EditorialPoster />

      {/* PART 2 — Let's Connect */}
      <section
        aria-label="Contact — Let's Connect"
        className="relative overflow-hidden bg-[#050508] py-12 md:py-16 lg:py-20"
      >
        {/* Background — subtle starfield + glows, consistent with portfolio */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#050508]">
          <div
            className="absolute rounded-full blur-[90px] opacity-60"
            style={{
              width: "680px",
              height: "560px",
              right: "10%",
              top: "18%",
              transform: "translateY(-50%)",
              background: "radial-gradient(ellipse at center, rgba(120,40,200,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full blur-[90px] opacity-40"
            style={{
              width: "720px",
              height: "580px",
              left: "6%",
              bottom: "10%",
              background: "radial-gradient(ellipse at center, rgba(30,160,220,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage: `radial-gradient(1.1px 1.1px at 11% 14%, rgba(255,255,255,0.50) 50%, transparent 51%), radial-gradient(1px 1px at 23% 26%, rgba(255,255,255,0.28) 50%, transparent 51%), radial-gradient(1px 1px at 63% 24%, rgba(255,255,255,0.22) 50%, transparent 51%), radial-gradient(1px 1px at 42% 78%, rgba(255,255,255,0.14) 50%, transparent 51%)`,
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
          <div className="mx-auto mb-8 md:mb-10 text-center">
            <h2
              className="text-[28px] font-black leading-none tracking-[-0.02em] text-white md:text-[34px] lg:text-[38px]"
              style={{ fontFamily: "'Bodoni Moda','Bodoni MT',Georgia,serif" }}
            >
              Let&apos;s Connect
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[13.5px] leading-[1.6] text-white/50">
              Have an idea, collaboration, or opportunity? Send a message — I’ll get back within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 md:gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 xl:gap-10">
            {/* LEFT — Contact Information */}
            <div className="relative overflow-hidden rounded-[20px] md:rounded-[24px] border border-white/[0.07] bg-[#0a0a12]/70 p-6 md:p-7 lg:p-8 backdrop-blur-xl">
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-400/40 via-purple-500/40 to-pink-500/40 opacity-40" />
              <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-br from-purple-500/[0.04] to-cyan-500/[0.04] blur-xl opacity-60" />

              <h3 className="text-[16px] font-bold tracking-[-0.01em] text-white md:text-[17px]">Contact Information</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-white/45">Prefer direct contact? Reach me here — I respond myself.</p>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 6.5C4 5.67 4.67 5 5.5 5H18.5C19.33 5 20 5.67 20 6.5V17.5C20 18.33 19.33 19 18.5 19H5.5C4.67 19 4 18.33 4 17.5V6.5Z" stroke="white" strokeOpacity="0.85" strokeWidth="1.25" strokeLinejoin="round" />
                      <path d="M4.5 6L12 12.2L19.5 6" stroke="white" strokeOpacity="0.55" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Email</p>
                    <a
                      href="mailto:sujeyhariprasad4@gmail.com"
                      className="mt-1 block break-all text-[14px] font-medium text-white underline decoration-white/15 underline-offset-4 hover:decoration-white/30"
                    >
                      sujeyhariprasad4@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 21C12 21 19 13.5 19 9.5C19 5.36 15.64 2 12 2C8.36 2 5 5.36 5 9.5C5 13.5 12 21 12 21Z" stroke="white" strokeOpacity="0.85" strokeWidth="1.25" />
                      <circle cx="12" cy="9.5" r="2.8" stroke="white" strokeOpacity="0.55" strokeWidth="1.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Location</p>
                    <p className="mt-1 text-[14px] font-medium text-white">Chennai, Tamil Nadu, India</p>
                    <p className="text-[12px] text-white/45">Available for remote · Open to on-site in India</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="8.2" stroke="white" strokeOpacity="0.85" strokeWidth="1.25" />
                      <path d="M12 7.5V12L14.6 14" stroke="white" strokeOpacity="0.65" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Typical Response Time</p>
                    <p className="mt-1 text-[14px] font-medium text-white">Within 24 hours</p>
                    <p className="text-[12px] text-white/45">Usually replies the same day</p>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Social Media</p>
                  {/* Minimal editorial showcase — ONE white geometric panel travels on hover only (no automation) */}
                  <div
                    className="relative isolate mt-4 grid h-[62px] w-full max-w-[380px] grid-cols-4 overflow-hidden rounded-[14px] border border-white/[0.06] bg-[#050507] md:h-[68px]"
                    style={{ isolation: "isolate" }}
                    onMouseLeave={() => setSocialActive(null)}
                  >
                    {/* Moving white geometric panel — single element, transform only, hover-driven — hidden when not hovering (everything black) */}
                    <div
                      className="pointer-events-none absolute inset-y-[6px] left-0 z-0 flex w-[25%] items-center justify-center will-change-transform"
                      style={
                        {
                          transform: socialActive === null ? "translate3d(-100%, 0, 0)" : `translate3d(${socialActive * 100}%, 0, 0)`,
                          opacity: socialActive === null ? 0 : 1,
                          transition: "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease",
                        } as any
                      }
                      aria-hidden="true"
                    >
                      <div
                        className="relative flex h-[46px] w-[64px] items-center justify-center bg-white md:h-[50px] md:w-[68px]"
                        style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
                      >
                        {/* small dark angular detail — as in reference */}
                        <div
                          className="absolute right-[-1px] top-0 h-[11px] w-[11px] bg-[#050507]"
                          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Instagram — decorative (no fake URL invented) */}
                    <div
                      className="relative z-10 flex items-center justify-center cursor-pointer"
                      onMouseEnter={() => setSocialActive(0)}
                      onFocus={() => setSocialActive(0)}
                      onClick={() => setSocialActive(0)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSocialActive(0);
                        }
                      }}
                      tabIndex={0}
                      aria-label="Instagram"
                      role="button"
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center md:h-10 md:w-10 ${socialActive === 0 ? "text-black" : "text-white"}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.45" />
                          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.45" />
                          <circle cx="17.3" cy="6.7" r="1.05" fill="currentColor" />
                        </svg>
                      </span>
                    </div>

                    {/* GitHub — real link */}
                    <a
                      href="https://github.com/sujey2007"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="relative z-10 flex items-center justify-center"
                      onMouseEnter={() => setSocialActive(1)}
                      onFocus={() => setSocialActive(1)}
                    >
                      <span className={`flex h-9 w-9 items-center justify-center md:h-10 md:w-10 ${socialActive === 1 ? "text-black" : "text-white"}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.46.09.63-.2.63-.44v-1.55c-2.54.55-3.07-1.08-3.07-1.08-.42-1.05-1.02-1.33-1.02-1.33-.83-.57.06-.56.06-.56.92.06 1.4.94 1.4.94.82 1.4 2.14 1 2.66.76.08-.59.32-1 .58-1.23-2.02-.23-4.14-1.01-4.14-4.5 0-.99.35-1.8.93-2.44-.09-.23-.4-1.15.09-2.4 0 0 .76-.24 2.5.93A8.6 8.6 0 0 1 12 7.05a8.6 8.6 0 0 1 2.28.31c1.74-1.17 2.5-.93 2.5-.93.49 1.25.18 2.17.09 2.4.58.64.93 1.45.93 2.44 0 3.5-2.13 4.26-4.15 4.49.33.29.62.85.62 1.72v2.55c0 .24.17.53.63.44A9.2 9.2 0 0 0 12 2.8Z"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>

                    {/* LinkedIn — real link */}
                    <a
                      href="https://linkedin.com/in/sujey-hariprasad"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="relative z-10 flex items-center justify-center"
                      onMouseEnter={() => setSocialActive(2)}
                      onFocus={() => setSocialActive(2)}
                    >
                      <span className={`flex h-9 w-9 items-center justify-center md:h-10 md:w-10 ${socialActive === 2 ? "text-black" : "text-white"}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M16 8.2a5 5 0 0 1 5 5V19h-3.2v-5.3a2.2 2.2 0 0 0-2.2-2.2c-1.2 0-2.2 1-2.2 2.2V19H10V9h3.1v1.3A3.4 3.4 0 0 1 16 8.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                          <rect x="3.2" y="9" width="3.2" height="10" rx="0.6" stroke="currentColor" strokeWidth="1.3" />
                          <circle cx="4.8" cy="5.2" r="1.4" fill="currentColor" />
                        </svg>
                      </span>
                    </a>

                    {/* Email — real mailto as fourth icon (uses actual info, no fake account) */}
                    <a
                      href="mailto:sujeyhariprasad4@gmail.com"
                      aria-label="Email"
                      className="relative z-10 flex items-center justify-center"
                      onMouseEnter={() => setSocialActive(3)}
                      onFocus={() => setSocialActive(3)}
                    >
                      <span className={`flex h-9 w-9 items-center justify-center md:h-10 md:w-10 ${socialActive === 3 ? "text-black" : "text-white"}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.45" />
                          <path d="M3.6 6.2 12 12.8 20.4 6.2" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[20px] md:rounded-[24px] border border-white/[0.07] bg-[#0a0a12]/70 p-6 md:p-7 lg:p-8 backdrop-blur-xl">
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-400/45 via-purple-500/45 to-pink-500/45 opacity-50" />
              <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-br from-purple-500/[0.04] to-cyan-500/[0.04] blur-xl opacity-60" />

              <h3 className="text-[16px] font-bold tracking-[-0.01em] text-white md:text-[17px]">Let&apos;s Connect</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-white/45">Fill the form — it validates and prepares a payload. Connect your email service later.</p>

              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
