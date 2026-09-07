export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050508]">
      {/* Base near-black */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Soft atmospheric glows - very subtle, not flashy */}
      {/* Purple glow around portrait area (center-right) */}
      <div
        className="absolute rounded-full blur-[80px] will-change-transform"
        style={{
          width: "680px",
          height: "680px",
          right: "8%",
          top: "42%",
          transform: "translateY(-50%)",
          background: "radial-gradient(ellipse at center, rgba(120, 40, 200, 0.22) 0%, rgba(100, 30, 180, 0.14) 30%, rgba(80, 20, 160, 0.06) 55%, transparent 72%)",
          opacity: 0.9,
        }}
      />
      {/* Magenta glow - bottom left / center */}
      <div
        className="absolute rounded-full blur-[90px]"
        style={{
          width: "720px",
          height: "560px",
          left: "12%",
          bottom: "5%",
          background: "radial-gradient(ellipse at center, rgba(200, 30, 140, 0.13) 0%, rgba(180, 20, 120, 0.07) 35%, transparent 70%)",
        }}
      />
      {/* Cyan glow - top right edge */}
      <div
        className="absolute rounded-full blur-[70px]"
        style={{
          width: "520px",
          height: "520px",
          right: "-6%",
          top: "-8%",
          background: "radial-gradient(ellipse at center, rgba(60, 200, 255, 0.09) 0%, rgba(40, 160, 220, 0.04) 40%, transparent 70%)",
        }}
      />
      {/* Additional very soft center glow */}
      <div
        className="absolute rounded-full blur-[100px] opacity-60"
        style={{
          width: "900px",
          height: "700px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at center, rgba(35, 20, 80, 0.18) 0%, transparent 65%)",
        }}
      />

      {/* Stars field */}
      <div className="absolute inset-0">
        {/* Use CSS box-shadow trick for stars - lightweight */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.85) 50%, transparent 51%),
              radial-gradient(1px 1px at 22% 28%, rgba(255,255,255,0.6) 50%, transparent 51%),
              radial-gradient(1.2px 1.2px at 28% 42%, rgba(255,255,255,0.7) 50%, transparent 51%),
              radial-gradient(1px 1px at 35% 18%, rgba(255,255,255,0.5) 50%, transparent 51%),
              radial-gradient(0.9px 0.9px at 42% 32%, rgba(255,255,255,0.45) 50%, transparent 51%),
              radial-gradient(1px 1px at 48% 22%, rgba(255,255,255,0.55) 50%, transparent 51%),
              radial-gradient(0.8px 0.8px at 55% 12%, rgba(255,255,255,0.4) 50%, transparent 51%),
              radial-gradient(1.1px 1.1px at 62% 26%, rgba(255,255,255,0.6) 50%, transparent 51%),
              radial-gradient(1px 1px at 71% 18%, rgba(255,255,255,0.5) 50%, transparent 51%),
              radial-gradient(0.9px 0.9px at 78% 32%, rgba(255,255,255,0.45) 50%, transparent 51%),
              radial-gradient(1px 1px at 86% 22%, rgba(255,255,255,0.55) 50%, transparent 51%),
              radial-gradient(1.2px 1.2px at 91% 38%, rgba(255,255,255,0.35) 50%, transparent 51%),
              radial-gradient(1px 1px at 16% 52%, rgba(255,255,255,0.4) 50%, transparent 51%),
              radial-gradient(0.9px 0.9px at 8% 62%, rgba(255,255,255,0.3) 50%, transparent 51%),
              radial-gradient(1px 1px at 18% 78%, rgba(255,255,255,0.35) 50%, transparent 51%),
              radial-gradient(1.1px 1.1px at 26% 88%, rgba(255,255,255,0.25) 50%, transparent 51%),
              radial-gradient(0.8px 0.8px at 34% 68%, rgba(255,255,255,0.3) 50%, transparent 51%),
              radial-gradient(1px 1px at 44% 82%, rgba(255,255,255,0.22) 50%, transparent 51%),
              radial-gradient(1px 1px at 58% 78%, rgba(255,255,255,0.28) 50%, transparent 51%),
              radial-gradient(0.9px 0.9px at 66% 68%, rgba(255,255,255,0.32) 50%, transparent 51%),
              radial-gradient(1px 1px at 74% 72%, rgba(255,255,255,0.24) 50%, transparent 51%),
              radial-gradient(1.1px 1.1px at 82% 62%, rgba(255,255,255,0.18) 50%, transparent 51%),
              radial-gradient(1px 1px at 88% 78%, rgba(255,255,255,0.2) 50%, transparent 51%),
              radial-gradient(0.9px 0.9px at 94% 58%, rgba(255,255,255,0.15) 50%, transparent 51%),
              radial-gradient(1.3px 1.3px at 50% 8%, rgba(255,255,255,0.9) 50%, transparent 51%),
              radial-gradient(1px 1px at 38% 6%, rgba(255,255,255,0.5) 50%, transparent 51%),
              radial-gradient(0.8px 0.8px at 65% 4%, rgba(255,255,255,0.4) 50%, transparent 51%)
            `,
          }}
        />
        {/* Extra tiny dense stars - very subtle */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='40' r='0.6' fill='white'/%3E%3Ccircle cx='90' cy='70' r='0.5' fill='white'/%3E%3Ccircle cx='150' cy='30' r='0.7' fill='white'/%3E%3Ccircle cx='210' cy='90' r='0.5' fill='white'/%3E%3Ccircle cx='280' cy='50' r='0.6' fill='white'/%3E%3Ccircle cx='340' cy='80' r='0.5' fill='white'/%3E%3Ccircle cx='50' cy='150' r='0.5' fill='white'/%3E%3Ccircle cx='120' cy='180' r='0.6' fill='white'/%3E%3Ccircle cx='200' cy='160' r='0.5' fill='white'/%3E%3Ccircle cx='300' cy='170' r='0.5' fill='white'/%3E%3Ccircle cx='360' cy='140' r='0.6' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: "400px 400px",
          }}
        />
      </div>

      {/* Grain texture - subtle */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom vignette for depth */}
      <div className="absolute inset-x-0 bottom-0 h-[280px] bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
