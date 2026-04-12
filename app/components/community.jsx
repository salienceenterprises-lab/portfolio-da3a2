"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

export default function NocturneCommunity({ data }) {
  const list = data?.community || data?.volunteering || data?.involvement || [];
  if (!list.length) return null;

  return (
    <section id="community" style={{
      background: "#080807",
      borderTop: "1px solid #1e1c19",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-community-inner { padding: 4rem 1.5rem !important; }
          .noc-community-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        position: "absolute", top: "-1rem", left: "2rem",
        fontSize: "200px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>06</div>

      <div className="noc-community-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
          <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>
            Community
          </span>
        </motion.div>

        <div
          className="noc-community-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
            gap: "1px",
            background: "#1e1c19",
          }}
        >
          {list.map((item, i) => {
            const title        = item.title       || item.role         || item.name         || item.position || "";
            const organization = item.organization || item.company      || item.employer     || "";
            const period       = item.period       || item.duration     || item.years        || item.date || "";
            const description  = item.description  || item.achievements || item.impact       || "";
            const link         = item.link         || item.url          || item.website      || "";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  background: "#080807",
                  padding: "2.5rem",
                  position: "relative",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0d0c0a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#080807"; }}
              >
                {/* Index marker */}
                <div style={{
                  fontSize: "9px", fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.25em",
                  color: "#2a2825", marginBottom: "1.2rem",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                <h3 style={{
                  fontSize: "16px", fontWeight: 800,
                  color: "#ede9e0", letterSpacing: "-0.02em",
                  textTransform: "uppercase", marginBottom: "0.5rem",
                }}>
                  {title}
                </h3>

                {organization && (
                  <div style={{
                    fontSize: "11px", fontWeight: 600,
                    color: GOLD, textTransform: "uppercase",
                    letterSpacing: "0.15em", marginBottom: "0.75rem",
                  }}>
                    {organization}
                  </div>
                )}

                {period && (
                  <div style={{
                    fontSize: "9px", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.2em",
                    color: "#3a3835", marginBottom: "1rem",
                  }}>
                    {period}
                  </div>
                )}

                {description && (
                  <p style={{
                    fontSize: "13px", color: "rgba(237,233,224,0.4)",
                    lineHeight: 1.7, fontWeight: 300,
                    marginBottom: link ? "1.2rem" : 0,
                  }}>
                    {description}
                  </p>
                )}

                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      marginTop: "1rem",
                      fontSize: "9px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.18em",
                      color: "rgba(200,148,58,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(200,148,58,0.5)"}
                  >
                    Visit <FaExternalLinkAlt size={8} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
