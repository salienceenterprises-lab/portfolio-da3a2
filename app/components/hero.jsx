"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

const slam = (delay = 0) => ({
  initial: { y: 110, opacity: 0, skewY: 4 },
  animate: {
    y: 0, opacity: 1, skewY: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, mass: 1.1, delay },
  },
});

const slamFromLeft = (delay = 0) => ({
  initial: { x: -120, opacity: 0 },
  animate: {
    x: 0, opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 16, mass: 1.2, delay },
  },
});

const slamFromRight = (delay = 0) => ({
  initial: { x: 120, opacity: 0 },
  animate: {
    x: 0, opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 16, mass: 1.2, delay },
  },
});

export default function NocturneHero({ data }) {
  const hasPhoto = !!data?.heroImageBase64;
  const nameParts = (data?.name || "Portfolio").toUpperCase().split(" ");
  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  const leftCtrl = useAnimation();
  const rightCtrl = useAnimation();
  const [curtainDone, setCurtainDone] = useState(false);

  useEffect(() => {
    const run = async () => {
      await new Promise((r) => setTimeout(r, 120));
      await Promise.all([
        leftCtrl.start({ x: "-100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }),
        rightCtrl.start({ x: "100%",  transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }),
      ]);
      setCurtainDone(true);
    };
    run();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <section id="hero" style={{
      minHeight: "100vh", background: "#0a0a0a",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-hero-grid { grid-template-columns: 1fr !important; padding: 5rem 1.5rem 4rem !important; }
          .noc-hero-photo { display: none !important; }
        }
      `}</style>

      {/* Background texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px)`,
      }} />

      {/* Gold ambient glow */}
      <div style={{
        position: "absolute",
        top: "20%", right: hasPhoto ? "36%" : "15%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: `radial-gradient(circle, ${GOLD}14 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Curtains — zIndex: 30, below preview chrome (z-50) */}
      <motion.div animate={leftCtrl} style={{
        position: "absolute", top: 0, left: 0,
        width: "50%", height: "100%", background: "#080808",
        zIndex: 30, transformOrigin: "left center",
      }} />
      <motion.div animate={rightCtrl} style={{
        position: "absolute", top: 0, right: 0,
        width: "50%", height: "100%", background: "#080808",
        zIndex: 30, transformOrigin: "right center",
      }} />

      {/* Main content */}
      <div
        className="noc-hero-grid"
        style={{
          maxWidth: "1400px", margin: "0 auto",
          width: "100%", padding: "7rem 3rem 5rem",
          display: "grid",
          gridTemplateColumns: hasPhoto ? "1fr 420px" : "1fr",
          alignItems: "center", gap: "4rem",
          position: "relative", zIndex: 10,
        }}
      >
        {/* Left: text */}
        <div>
          <motion.div {...slamFromLeft(0.65)} style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
              <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>
                {data?.title || "Developer & Designer"}
              </span>
            </div>
          </motion.div>

          <div style={{ marginBottom: "3rem", overflow: "hidden" }}>
            {nameParts.map((word, i) => (
              <div key={i} style={{ overflow: "hidden", lineHeight: 0.88 }}>
                <motion.span
                  {...slam(0.7 + i * 0.12)}
                  style={{
                    display: "block",
                    fontSize: "clamp(3.2rem, 10vw, 10rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.05em",
                    color: i === nameParts.length - 1 ? GOLD_L : "#ede9e0",
                    lineHeight: 0.9,
                    textTransform: "uppercase",
                    textShadow: i === nameParts.length - 1 ? `0 0 80px ${GOLD}44` : "none",
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {(data?.sloganHeroSection || data?.bio) && (
            <motion.p {...slamFromLeft(0.9 + nameParts.length * 0.1)} style={{
              fontSize: "15px", fontWeight: 300,
              color: "rgba(237,233,224,0.45)",
              lineHeight: 1.85, maxWidth: "520px",
              margin: "0 0 3.5rem",
              borderLeft: `2px solid ${GOLD}50`,
              paddingLeft: "1.4rem",
            }}>
              {data?.sloganHeroSection || data?.bio?.slice(0, 170) + "…"}
            </motion.p>
          )}

          <motion.div
            {...slamFromLeft(1.05 + nameParts.length * 0.1)}
            style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
          >
            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: GOLD, color: "#080808",
                border: "none", padding: "14px 36px",
                fontSize: "10px", fontWeight: 900,
                textTransform: "uppercase", letterSpacing: "0.22em",
                cursor: "pointer", transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_L; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; }}
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollTo("projects")}
              style={{
                background: "none", color: "#b8b4ac",
                border: "1px solid #2a2825", padding: "14px 36px",
                fontSize: "10px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.22em",
                cursor: "pointer", transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2825"; e.currentTarget.style.color = "#b8b4ac"; }}
            >
              View Work
            </button>
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  fontSize: "10px", fontWeight: 600, color: "rgba(200,148,58,0.5)",
                  textTransform: "uppercase", letterSpacing: "0.22em",
                  textDecoration: "none", transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(200,148,58,0.5)"}
              >
                Résumé ↓
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: photo */}
        {hasPhoto && (
          <motion.div
            {...slamFromRight(0.8)}
            className="noc-hero-photo"
            style={{ position: "relative", alignSelf: "stretch" }}
          >
            <div style={{
              position: "absolute", top: "16px", left: "16px",
              right: "-16px", bottom: "-16px",
              border: `1px solid ${GOLD}30`,
              pointerEvents: "none", zIndex: 0,
            }} />
            <div style={{
              position: "relative", zIndex: 1,
              overflow: "hidden",
              height: "100%", minHeight: "460px",
              border: `1px solid ${GOLD}44`,
            }}>
              <img
                src={data.heroImageBase64}
                alt={data.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top",
                  display: "block",
                  filter: "brightness(0.9) saturate(0.85)",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, ${GOLD}20 0%, transparent 50%)`,
                pointerEvents: "none",
              }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Corner crop marks */}
      {[
        { top: "5rem", left: "1.5rem" },
        { top: "5rem", right: "1.5rem" },
        { bottom: "2rem", left: "1.5rem" },
        { bottom: "2rem", right: "1.5rem" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          style={{
            position: "absolute", ...pos,
            width: "20px", height: "20px",
            borderTop: i < 2 ? `1px solid ${GOLD}40` : "none",
            borderBottom: i >= 2 ? `1px solid ${GOLD}40` : "none",
            borderLeft: i % 2 === 0 ? `1px solid ${GOLD}40` : "none",
            borderRight: i % 2 === 1 ? `1px solid ${GOLD}40` : "none",
            zIndex: 10,
          }}
        />
      ))}

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          cursor: "pointer", zIndex: 10,
        }}
        onClick={() => scrollTo("about")}
      >
        <span style={{ fontSize: "8.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(200,148,58,0.4)" }}>Scroll</span>
        <div style={{ width: "1px", height: "28px", background: `linear-gradient(to bottom, ${GOLD}50, transparent)` }} />
      </motion.div>
    </section>
  );
}
