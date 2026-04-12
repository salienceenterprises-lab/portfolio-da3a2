"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

export default function NocturneEducation({ data }) {
  const list = data?.education || [];
  if (!list.length) return null;

  return (
    <section id="education" style={{
      background: "#080807",
      borderTop: "1px solid #1e1c19",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-edu-inner { padding: 4rem 1.5rem !important; }
          .noc-edu-row { grid-template-columns: 1fr !important; }
          .noc-edu-date { text-align: left !important; margin-top: 0.75rem; }
        }
      `}</style>

      <div style={{
        position: "absolute", top: "-1rem", left: "2rem",
        fontSize: "200px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>02</div>

      <div className="noc-edu-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
          <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>
            Education
          </span>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#1e1c19" }}>
          {list.map((edu, i) => {
            const degree       = edu.degree      || edu.field    || edu.qualification || edu.title || "";
            const institution  = edu.institution || edu.school   || edu.university    || "";
            const period       = edu.period      || edu.duration || edu.years         || edu.year  || edu.graduationYear || "";
            const location     = edu.location    || "";
            const grade        = edu.grade       || edu.gpa      || edu.result        || "";
            const description  = edu.description || "";
            const achievements = Array.isArray(edu.achievements) ? edu.achievements.filter(Boolean) : [];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="noc-edu-row"
                style={{
                  background: "#0a0a0a",
                  padding: "2.5rem 3rem",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.6rem" }}>
                    <div style={{ width: "6px", height: "6px", background: GOLD, flexShrink: 0 }} />
                    <h3 style={{
                      fontSize: "18px", fontWeight: 800,
                      color: "#ede9e0", letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                    }}>
                      {degree}
                    </h3>
                  </div>

                  {institution && (
                    <div style={{
                      fontSize: "12px", fontWeight: 500,
                      color: GOLD_L, textTransform: "uppercase",
                      letterSpacing: "0.12em", marginBottom: "0.6rem",
                      paddingLeft: "18px",
                    }}>
                      {institution}
                    </div>
                  )}

                  {location && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#4a4845", paddingLeft: "18px", marginBottom: "0.5rem" }}>
                      <FaMapMarkerAlt size={9} /> {location}
                    </div>
                  )}

                  {grade && (
                    <div style={{
                      fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.18em", color: "#4a4845",
                      paddingLeft: "18px", marginBottom: "0.6rem",
                    }}>
                      {grade}
                    </div>
                  )}

                  {description && (
                    <p style={{
                      fontSize: "13.5px", color: "rgba(237,233,224,0.4)",
                      lineHeight: 1.7, paddingLeft: "18px",
                      maxWidth: "600px", fontWeight: 300,
                      marginBottom: achievements.length > 0 ? "1rem" : 0,
                    }}>
                      {description}
                    </p>
                  )}

                  {achievements.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "18px" }}>
                      {achievements.map((a, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "13px", color: "rgba(237,233,224,0.4)", lineHeight: 1.7, fontWeight: 300 }}>
                          <span style={{ color: GOLD, fontSize: "7px", marginTop: "6px", flexShrink: 0 }}>◆</span>
                          {a}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="noc-edu-date" style={{
                  fontSize: "10px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.2em",
                  color: "#3a3835", whiteSpace: "nowrap", paddingTop: "4px",
                }}>
                  {period}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
