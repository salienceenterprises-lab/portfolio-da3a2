"use client";
import React from "react";
import { motion } from "framer-motion";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

export default function NocturneSkills({ data }) {
  const skills = data?.skills || [];
  if (!skills.length) return null;

  // Normalize: handle category objects OR flat string array
  const groups = (() => {
    if (
      typeof skills[0] === "object" && skills[0] !== null &&
      (skills[0].items || skills[0].category || skills[0].skills || skills[0].name)
    ) {
      return skills
        .map((g) => ({
          category: g.category || g.name || "Skills",
          items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
        }))
        .filter((g) => g.items.length > 0);
    }
    return [{ category: "Technologies", items: skills }];
  })();

  const totalSkills = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section id="skills" style={{
      background: "#0a0a0a",
      borderTop: "1px solid #1e1c19",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-skills-inner { padding: 4rem 1.5rem !important; }
          .noc-skills-row { grid-template-columns: 1fr !important; gap: 1rem !important; padding: 1.5rem 0 !important; }
          .noc-skills-label { padding-top: 0 !important; }
        }
      `}</style>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", top: "-1rem", left: "2rem",
        fontSize: "200px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>05</div>

      <div className="noc-skills-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
            <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>
              Skills
            </span>
          </div>
          <span style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "#3a3835" }}>
            {totalSkills} skill{totalSkills !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Row-based layout */}
        <div style={{ borderTop: "1px solid #1e1c19" }}>
          {groups.map((group, gi) => (
            <motion.div
              key={gi}
              className="noc-skills-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.07 }}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: "3rem",
                padding: "2.5rem 0",
                borderBottom: "1px solid #1e1c19",
                alignItems: "start",
              }}
            >
              {/* Category label */}
              <div className="noc-skills-label" style={{ paddingTop: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "4px", height: "4px", background: GOLD, transform: "rotate(45deg)", flexShrink: 0 }} />
                  <span style={{
                    fontSize: "9px", fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: "0.28em",
                    color: GOLD,
                  }}>
                    {group.category}
                  </span>
                </div>
                <div style={{ fontSize: "9px", color: "#2a2825", marginTop: "6px", paddingLeft: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {group.items.length} skill{group.items.length !== 1 ? "s" : ""}
                </div>
              </div>

              {/* Skill pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.items.filter(Boolean).map((skill, si) => {
                  const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                  return (
                    <span
                      key={si}
                      style={{
                        fontSize: "10px", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "0.1em",
                        color: "#6a6560",
                        border: "1px solid #2a2825",
                        padding: "6px 14px",
                        background: "#0f0e0c",
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = GOLD;
                        e.currentTarget.style.color = GOLD;
                        e.currentTarget.style.background = `${GOLD}0a`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#2a2825";
                        e.currentTarget.style.color = "#6a6560";
                        e.currentTarget.style.background = "#0f0e0c";
                      }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
