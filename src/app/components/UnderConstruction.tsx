import { useNavigate } from "react-router";

interface Props {
  page: string;
  description: string;
  icon: React.ReactNode;
  eta?: string;
  tags?: string[];
}

export default function UnderConstruction({ page, description, icon, eta, tags = [] }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes wipe-in {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes uc-fade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .uc-fade { animation: uc-fade 0.6s ease forwards; }
        .uc-fade-1 { animation-delay: 0.05s; opacity: 0; }
        .uc-fade-2 { animation-delay: 0.15s; opacity: 0; }
        .uc-fade-3 { animation-delay: 0.25s; opacity: 0; }
        .uc-fade-4 { animation-delay: 0.4s; opacity: 0; }
        .uc-fade-5 { animation-delay: 0.55s; opacity: 0; }
      `}</style>

      <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Faint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,135,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center gap-8">
          {/* Icon block */}
          <div
            className="uc-fade uc-fade-1 w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "0 0 40px rgba(0,255,135,0.06)",
            }}
          >
            <div style={{ color: "var(--primary)" }}>{icon}</div>
          </div>

          {/* Terminal-style label */}
          <div className="uc-fade uc-fade-2 flex flex-col items-center gap-3 w-full">
            <div
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(0,255,135,0.07)",
                border: "1px solid rgba(0,255,135,0.2)",
                color: "var(--primary)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span style={{ animation: "blink 1.2s step-end infinite" }}>▋</span>
              <span>status: building</span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{ letterSpacing: "-0.03em", color: "var(--foreground)" }}
            >
              {page}
            </h1>

            {/* Animated underline */}
            <div className="h-px w-full max-w-xs overflow-hidden" style={{ background: "var(--border)" }}>
              <div
                style={{
                  height: "1px",
                  background: "var(--primary)",
                  animation: "wipe-in 0.8s 0.3s ease forwards",
                  width: 0,
                }}
              />
            </div>
          </div>

          {/* Description */}
          <p
            className="uc-fade uc-fade-3 text-base md:text-lg leading-relaxed max-w-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="uc-fade uc-fade-4 flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "var(--secondary)",
                    border: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ETA + progress bar */}
          {eta && (
            <div className="uc-fade uc-fade-4 w-full max-w-xs flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ color: "var(--muted-foreground)" }}>progress</span>
                <span style={{ color: "var(--primary)" }}>eta {eta}</span>
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "35%",
                    background: "linear-gradient(90deg, var(--primary), rgba(0,255,135,0.4))",
                    boxShadow: "0 0 8px rgba(0,255,135,0.5)",
                  }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="uc-fade uc-fade-5 flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg font-semibold transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              ← Back to home
            </button>
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              more soon
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
