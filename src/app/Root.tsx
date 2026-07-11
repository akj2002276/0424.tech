import { Outlet, NavLink, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Root() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--background)", fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(7,7,8,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <NavLink
          to="/"
          className="text-base font-black tracking-tight leading-none hover:opacity-80 transition-opacity"
          style={{ color: "var(--foreground)", fontFamily: "'Outfit', sans-serif" }}
        >
          0424<span style={{ color: "var(--primary)" }}>.</span>
          <span style={{ color: "var(--muted-foreground)", fontWeight: 300 }}>tech</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-md text-sm transition-all duration-150 ${
                  isActive
                    ? "text-foreground bg-white/5"
                    : "hover:text-foreground hover:bg-white/5"
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                fontFamily: "'Outfit', sans-serif",
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-md transition-colors"
          style={{ color: "var(--muted-foreground)" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-14"
          style={{ background: "rgba(7,7,8,0.97)" }}
        >
          <nav className="flex flex-col p-6 gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className="py-3 px-4 rounded-lg text-lg font-medium transition-colors"
                style={({ isActive }) => ({
                  color: isActive ? "var(--primary)" : "var(--foreground)",
                  background: isActive ? "rgba(0,255,135,0.06)" : "transparent",
                  fontFamily: "'Outfit', sans-serif",
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Page content */}
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
    </div>
  );
}
