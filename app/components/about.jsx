"use client";
import React from "react";
import { motion } from "framer-motion";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay },
});

export default function NocturneAbout({ data }) {
  if (!data) return null;
  const skills = data?.skills || [];
  const flatSkills = Array.isArray(skills[0]) ? skills.flat() :
    skills.flatMap((s) => (typeof s === "object" && s.items ? s.items : [s]));

  return (
    <section id="about" style={{
      background: "#0a0a0a",
      borderTop: "1px solid #1e1c19",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-about-grid { display: block !important; }
          .noc-about-inner { padding: 4rem 1.5rem !important; }
        }
      `}</style>

      <div style={{
        position: "absolute", top: "-1rem", left: "2rem",
        fontSize: "200px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>01</div>

      <div className="noc-about-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        <motion.div {...fadeUp(0)} style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "4rem",
        }}>
          <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
          <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>About</span>
        </motion.div>

        <div
          className="noc-about-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}
        >
          {/* Left: heading + bio */}
          <div>
            <motion.h2 {...fadeUp(0.1)} style={{
              fontSize: "clamp(2.4rem, 5vw, 5rem)",
              fontWeight: 900, letterSpacing: "-0.04em",
              lineHeight: 0.92, textTransform: "uppercase",
              color: "#ede9e0", marginBottom: "2.5rem",
            }}>
              Crafting<br />
              <span style={{ color: GOLD_L }}>Digital</span><br />
              Experiences
            </motion.h2>

            <motion.p {...fadeUp(0.2)} style={{
              fontSize: "15px", fontWeight: 300,
              color: "rgba(237,233,224,0.5)",
              lineHeight: 1.85,
            }}>
              {data?.bio || "A passionate developer who builds thoughtful, high-performance digital experiences."}
            </motion.p>
          </div>

          {/* Right: stat cards + skills */}
          <div style={{ marginTop: "1rem" }}>
            {(data?.experience?.length > 0 || data?.projects?.length > 0) && (
              <motion.div {...fadeUp(0.15)} style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "1px", background: "#1e1c19",
                border: "1px solid #1e1c19",
                marginBottom: "3rem",
              }}>
                {[
                  { label: "Years Experience", value: data?.experience?.length ? `${data.experience.length}+` : "—" },
                  { label: "Projects Built",   value: data?.projects?.length   ? `${data.projects.length}+`   : "—" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: "#0f0e0c", padding: "2rem" }}>
                    <div style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      fontWeight: 900, color: GOLD_L,
                      letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.6rem",
                    }}>{stat.value}</div>
                    <div style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#4a4845" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {flatSkills.length > 0 && (
              <motion.div {...fadeUp(0.25)}>
                <div style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#4a4845", marginBottom: "1.2rem" }}>
                  Core Stack
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {flatSkills.slice(0, 14).map((skill, i) => {
                    const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                    return (
                      <span key={i} style={{
                        fontSize: "10px", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "0.1em",
                        color: "#b8b4ac", border: "1px solid #2a2825",
                        padding: "5px 12px", background: "#0f0e0c",
                        transition: "all 0.2s ease",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2825"; e.currentTarget.style.color = "#b8b4ac"; }}
                      >{label}</span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
