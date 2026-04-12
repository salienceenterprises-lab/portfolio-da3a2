"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const GOLD = "#c8943a";

export default function NocturneNav({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const allNavLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects",   href: "#projects",   key: "projects" },
    { label: "Skills",     href: "#skills",     key: "skills" },
    { label: "Community",  href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "email" },
  ];

  const activeLinks = allNavLinks.filter((link) => {
    if (link.label === "About") return true;
    const d = data?.[link.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  useEffect(() => {
    const ids = ["hero", ...activeLinks.map((l) => l.href.replace("#", ""))];
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sorted = ids
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
        .filter((s) => s.top !== Infinity)
        .sort((a, b) => a.top - b.top);
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].top - 150) { setActiveSection(sorted[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .noc-nav-link {
          position: relative;
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.22em;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.25s ease;
        }
        .noc-nav-link::after {
          content: '';
          position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: ${GOLD};
          transition: width 0.3s ease;
        }
        .noc-nav-link:hover::after, .noc-nav-link.active::after { width: 100%; }
        .noc-nav-desktop { display: flex; align-items: center; gap: 2.5rem; }
        .noc-nav-mobile-btn { display: none; }
        .noc-nav-mobile-menu { display: none; }
        @media (max-width: 767px) {
          .noc-nav-desktop { display: none !important; }
          .noc-nav-mobile-btn { display: block !important; }
        }
      `}</style>

      {/* zIndex: 40 — sits below preview chrome (z-50) and modal (z-60) */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid #1e1c19" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "0 1.5rem", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="#hero" onClick={(e) => go(e, "#hero")} style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "13px", fontWeight: 300, color: "#b8b4ac", letterSpacing: "0.12em" }}>
              {data?.name?.split(" ")[0] || "Portfolio"}
              <span style={{ color: GOLD, marginLeft: "2px" }}>.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="noc-nav-desktop">
            {activeLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                  className={`noc-nav-link ${isActive ? "active" : ""}`}
                  style={{ color: isActive ? "#ede9e0" : "#6a6560" }}>
                  {link.label}
                </a>
              );
            })}
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  fontSize: "9px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.22em",
                  color: GOLD, textDecoration: "none",
                  border: `1px solid ${GOLD}44`,
                  padding: "7px 18px",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${GOLD}14`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                Résumé
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="noc-nav-mobile-btn"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#b8b4ac", padding: "6px" }}>
            {mobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown — zIndex: 39, below preview chrome */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: "fixed", top: "68px", left: 0, right: 0, zIndex: 39,
              background: "#0a0a0a", borderBottom: "1px solid #1e1c19",
              padding: "1.5rem 1.5rem 2rem",
              display: "flex", flexDirection: "column", gap: "1.2rem",
              overflow: "hidden",
            }}>
            {activeLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                style={{
                  fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.22em", color: "#ede9e0", textDecoration: "none",
                }}>
                {link.label}
              </a>
            ))}
            {resumeSource && (
              <a href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: GOLD, textDecoration: "none" }}>
                Résumé ↓
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
