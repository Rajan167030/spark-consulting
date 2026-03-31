import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 md:px-6">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-border/80 bg-background/85 px-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:px-7">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Spark
        </Link>

        {/* Desktop */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border/70 bg-background/70 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative rounded-full px-4 py-2 text-sm tracking-wide transition-colors ${
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 -z-10 rounded-full bg-secondary"
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                />
              )}
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:inline-flex"
          aria-label="Toggle dark mode"
        >
          {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-px bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 w-full max-w-6xl rounded-3xl border border-border/80 bg-background/95 px-5 py-5 shadow-lg backdrop-blur-md md:hidden"
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="mb-4 flex w-full items-center justify-between rounded-2xl border border-border px-4 py-3 text-base text-foreground"
          >
            <span>{mounted && isDark ? "Light mode" : "Dark mode"}</span>
            {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-2xl px-4 py-3 text-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
