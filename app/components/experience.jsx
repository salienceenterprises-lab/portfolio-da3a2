"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

export default function NocturneExperience({ data }) {
  const list = data?.experience || [];
  if (!list.length) return null;

  const [active, setActive] = useState(0);
  const job = list[active];

  // Support all common field names including creative-vivid's `highlights`
  const rawBullets =
    Array.isArray(job?.highlights)       ? job.highlights :
    Array.isArray(job?.responsibilities) ? job.responsibilities :
    Array.isArray(job?.bullets)          ? job.bullets : [];
  const bullets = rawBullets.filter(Boolean);

  const stack =
    Array.isArray(job?.stack)        ? job.stack :
    Array.isArray(job?.tags)         ? job.tags :
    Array.isArray(job?.technologies) ? job.technologies :
    [];

  const role    = job?.role     || job?.title    || job?.position || "";
  const company = job?.company  || job?.employer || job?.organization || "";
  const period  = job?.period   || job?.duration || job?.years || "";
  const location = job?.location || "";

  return (
    <section id="experience" style={{
      background: "#0a0a0a",
      borderTop: "1px solid #1e1c19",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-exp-layout { grid-template-columns: 1fr !important; }
          .noc-exp-sidebar { border-right: none !important; border-bottom: 1px solid #1e1c19 !important; display: flex !important; flex-direction: row !important; overflow-x: auto !important; }
          .noc-exp-sidebar button { flex-shrink: 0 !important; border-bottom: none !important; border-right: 1px solid #1e1c19 !important; }
          .noc-exp-inner { padding: 4rem 1.5rem !important; }
          .noc-exp-detail { padding: 1.5rem !important; }
        }
      `}</style>

      <div style={{
        position: "absolute", top: "-1rem", left: "2rem",
        fontSize: "200px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>03</div>

      <div className="noc-exp-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
          <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>
            Experience
          </span>
        </motion.div>

        <div className="noc-exp-layout" style={{ display: "grid", gridTemplateColumns: "280px 1fr", alignItems: "start" }}>
          {/* Left: job list */}
          <div className="noc-exp-sidebar" style={{ borderRight: "1px solid #1e1c19" }}>
            {list.map((j, i) => {
              const jCompany = j?.company || j?.employer || j?.organization || "";
              const jPeriod  = j?.period  || j?.duration || j?.years || "";
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: active === i ? "#0f0e0c" : "transparent",
                    border: "none",
                    borderLeft: active === i ? `2px solid ${GOLD}` : "2px solid transparent",
                    padding: "1.6rem 2rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    borderBottom: "1px solid #1e1c19",
                  }}
                  onMouseEnter={(e) => { if (active !== i) e.currentTarget.style.background = "#0d0c0a"; }}
                  onMouseLeave={(e) => { if (active !== i) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{
                    fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: active === i ? "#ede9e0" : "#6a6560",
                    marginBottom: "4px", transition: "color 0.2s ease",
                  }}>
                    {jCompany}
                  </div>
                  <div style={{
                    fontSize: "9px", fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: active === i ? GOLD : "#3a3835",
                    transition: "color 0.2s ease",
                  }}>
                    {jPeriod}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="noc-exp-detail"
              style={{ padding: "2.5rem 3rem" }}
            >
              {/* Role */}
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: GOLD, marginBottom: "0.5rem" }}>
                {role}
              </div>

              {/* Company */}
              <h3 style={{
                fontSize: "clamp(1.4rem, 3vw, 2.6rem)",
                fontWeight: 900, letterSpacing: "-0.03em",
                color: "#ede9e0", textTransform: "uppercase",
                lineHeight: 0.95, marginBottom: "1rem",
              }}>
                {company}
              </h3>

              {/* Meta row: period + location */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
                {period && (
                  <span style={{
                    fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.2em", color: "#4a4845",
                    border: "1px solid #2a2825", padding: "4px 12px",
                  }}>
                    {period}
                  </span>
                )}
                {location && (
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#4a4845" }}>
                    <FaMapMarkerAlt size={10} /> {location}
                  </span>
                )}
              </div>

              {/* Gold divider */}
              <div style={{ width: "40px", height: "1.5px", background: GOLD, marginBottom: "2rem" }} />

              {/* Description */}
              {job?.description && (
                <p style={{ fontSize: "14px", color: "rgba(237,233,224,0.55)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.5rem" }}>
                  {job.description}
                </p>
              )}

              {/* Bullet points */}
              {bullets.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {bullets.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <span style={{ color: GOLD, fontSize: "8px", marginTop: "6px", flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: "14px", color: "rgba(237,233,224,0.55)", lineHeight: 1.75, fontWeight: 300 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech stack */}
              {stack.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "1.5rem", borderTop: "1px solid #1e1c19" }}>
                  {stack.filter(Boolean).map((tech, i) => {
                    const label = typeof tech === "string" ? tech : tech?.name || String(tech);
                    return (
                      <span key={i} style={{
                        fontSize: "9px", fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "0.12em", color: GOLD,
                        border: `1px solid ${GOLD}40`,
                        padding: "3px 10px", background: `${GOLD}08`,
                      }}>
                        {label}
                      </span>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
