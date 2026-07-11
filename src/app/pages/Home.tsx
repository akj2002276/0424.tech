import { useState, useEffect, useRef } from "react";

const TARGET_DATE = new Date("2026-09-04T00:00:00Z");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  function getTimeLeft(t: Date) {
    const diff = Math.max(0, t.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative font-mono text-5xl md:text-7xl font-bold tracking-tighter text-foreground tabular-nums"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span className="relative z-10">{pad(value)}</span>
        <span
          className="absolute inset-0 blur-xl opacity-25 z-0 select-none"
          style={{ color: "var(--primary)" }}
          aria-hidden
        >
          {pad(value)}
        </span>
      </div>
      <span
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="text-4xl md:text-6xl font-bold pb-6 select-none"
      style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
    >
      :
    </div>
  );
}

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const loop = () => {
      const delay = 3000 + Math.random() * 4000;
      const t = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
        loop();
      }, delay);
      return t;
    };
    const t = loop();
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={`relative inline-block transition-all duration-75 ${glitch ? "translate-x-[2px]" : ""}`}>
      {glitch && (
        <>
          <span
            className="absolute inset-0 select-none pointer-events-none"
            style={{ color: "#ff0055", clipPath: "inset(30% 0 50% 0)", transform: "translateX(-3px)" }}
            aria-hidden
          >
            {text}
          </span>
          <span
            className="absolute inset-0 select-none pointer-events-none"
            style={{ color: "#00ffcc", clipPath: "inset(55% 0 20% 0)", transform: "translateX(3px)" }}
            aria-hidden
          >
            {text}
          </span>
        </>
      )}
      {text}
    </span>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,255,135,0.07) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden style={{ mixBlendMode: "overlay" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.4), transparent)",
          animation: "scanline 6s linear infinite",
        }}
      />
    </div>
  );
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <>
      <style>{`
        @keyframes scanline { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.6; }
          70% { transform: scale(1.05); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.8s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.25s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.4s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.55s; opacity: 0; }
        .fade-up-5 { animation-delay: 0.7s; opacity: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="relative min-h-[calc(100vh-3.5rem)] w-full flex flex-col items-center justify-center overflow-hidden">
        <GridBackground />
        <ScanLine />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-10">
          <div className="fade-up fade-up-1 flex flex-col items-center gap-3">
            <div
              className="text-xs tracking-[0.35em] uppercase mb-1"
              style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              launching soon
            </div>
            <h1
              className="text-6xl md:text-8xl font-black tracking-tight leading-none"
              style={{ letterSpacing: "-0.03em" }}
            >
              <GlitchText text="0424" />
              <span style={{ color: "var(--primary)" }}>.</span>
              <span style={{ color: "var(--muted-foreground)", fontWeight: 300 }}>tech</span>
            </h1>
          </div>

          <p
            className="fade-up fade-up-2 text-lg md:text-xl max-w-md leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Something worth the wait is being built. This domain goes live September 4, 2026.
          </p>

          <div className="fade-up fade-up-3 flex items-end gap-4 md:gap-6">
            <CountUnit value={days} label="days" />
            <Divider />
            <CountUnit value={hours} label="hours" />
            <Divider />
            <CountUnit value={minutes} label="mins" />
            <Divider />
            <CountUnit value={seconds} label="secs" />
          </div>

          <div className="fade-up fade-up-3 w-full max-w-xs h-px" style={{ background: "var(--border)" }} />

          <div className="fade-up fade-up-4 w-full max-w-sm">
            {submitted ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.3)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9l4 4 8-8" stroke="#00ff87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm" style={{ color: "var(--primary)", fontFamily: "'JetBrains Mono', monospace" }}>
                  you're on the list
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  We'll notify you when we launch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <p className="text-sm mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Get notified when we go live
                </p>
                <div
                  className="flex w-full rounded-lg overflow-hidden transition-all duration-200"
                  style={{
                    border: `1px solid ${focused ? "rgba(0,255,135,0.4)" : "rgba(255,255,255,0.1)"}`,
                    boxShadow: focused ? "0 0 0 3px rgba(0,255,135,0.08)" : "none",
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
                    style={{ color: "var(--foreground)", background: "var(--secondary)", fontFamily: "'JetBrains Mono', monospace" }}
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 text-sm font-semibold transition-all duration-150 hover:brightness-110 active:scale-95"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)", flexShrink: 0 }}
                  >
                    Notify me
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="fade-up fade-up-5 flex items-center gap-2 mt-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary)", animation: "pulse-ring 2.5s ease-in-out infinite" }}
            />
            <span
              className="text-xs tracking-[0.2em]"
              style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              0424.tech — under construction
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
