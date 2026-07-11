import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes glitch-404 {
          0%, 90%, 100% { transform: none; }
          91% { transform: translateX(-3px); clip-path: inset(20% 0 60% 0); }
          93% { transform: translateX(3px); clip-path: inset(60% 0 10% 0); }
          95% { transform: none; clip-path: none; }
        }
      `}</style>
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 text-center gap-6">
        <div
          className="text-[8rem] md:text-[12rem] font-black leading-none select-none"
          style={{
            color: "var(--foreground)",
            letterSpacing: "-0.05em",
            fontFamily: "'Outfit', sans-serif",
            animation: "glitch-404 4s ease-in-out infinite",
          }}
        >
          4<span style={{ color: "var(--primary)" }}>0</span>4
        </div>
        <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
          This page doesn't exist — yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-sm px-5 py-2.5 rounded-lg font-semibold transition-all duration-150 hover:brightness-110 active:scale-95"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          ← Back to home
        </button>
      </div>
    </>
  );
}
