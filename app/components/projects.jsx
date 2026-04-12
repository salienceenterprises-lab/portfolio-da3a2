"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

export default function NocturneProjects({ data }) {
  const list = data?.projects || [];
  if (!list.length) return null;

  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={{
      background: "#080807",
      borderTop: "1px solid #1e1c19",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-proj-inner { padding: 4rem 1.5rem !important; }
          .noc-proj-row { grid-template-columns: 1fr !important; gap: 1rem !important; padding: 1.5rem !important; }
          .noc-proj-index { display: none !important; }
          .noc-proj-links { justify-content: flex-start !important; }
        }
      `}</style>

      <div style={{
        position: "absolute", top: "-1rem", left: "2rem",
        fontSize: "200px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>04</div>

      <div className="noc-proj-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}
        >
          <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
          <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>
            Projects
          </span>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#1e1c19" }}>
          {list.map((project, i) => {
            const isHov = hovered === i;
            const title = project.title || project.name || "";
            const description = project.description || "";
            const tags = Array.isArray(project.stack)        ? project.stack :
                         Array.isArray(project.tags)         ? project.tags :
                         Array.isArray(project.technologies) ? project.technologies :
                         Array.isArray(project.tech)         ? project.tech : [];
            const githubUrl = project.github    || project.githubUrl || project.repo  || "";
            const liveUrl   = project.demo      || project.live      || project.url   || project.link || project.liveUrl || "";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="noc-proj-row"
                style={{
                  background: isHov ? "#0f0e0c" : "#0a0a0a",
                  padding: "2.5rem 3rem",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "2rem",
                  alignItems: "center",
                  transition: "background 0.25s ease",
                  borderLeft: isHov ? `2px solid ${GOLD}` : "2px solid transparent",
                }}
              >
                {project.imageBase64 && (
                  <div style={{ gridColumn: "1 / -1", height: "140px", overflow: "hidden", marginBottom: "0.5rem" }}>
                    <img src={project.imageBase64} alt={project.title || project.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }} />
                  </div>
                )}
                {/* Index */}
                <div className="noc-proj-index" style={{
                  fontSize: "36px", fontWeight: 900,
                  color: isHov ? `${GOLD}40` : "#1e1c19",
                  letterSpacing: "-0.04em", lineHeight: 1,
                  transition: "color 0.25s ease", userSelect: "none",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Info */}
                <div>
                  <h3 style={{
                    fontSize: "20px", fontWeight: 800,
                    color: isHov ? "#ede9e0" : "#b8b4ac",
                    letterSpacing: "-0.02em", textTransform: "uppercase",
                    marginBottom: "0.5rem", transition: "color 0.25s ease",
                  }}>
                    {title}
                  </h3>
                  {description && (
                    <p style={{
                      fontSize: "13.5px", color: "rgba(237,233,224,0.4)",
                      lineHeight: 1.65, maxWidth: "580px",
                      fontWeight: 300, margin: "0 0 1rem",
                    }}>
                      {description}
                    </p>
                  )}
                  {tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {tags.filter(Boolean).map((tag, j) => (
                        <span key={j} style={{
                          fontSize: "9px", fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: "0.12em",
                          color: isHov ? GOLD : "#4a4845",
                          border: `1px solid ${isHov ? GOLD + "50" : "#2a2825"}`,
                          padding: "3px 9px", transition: "all 0.25s ease",
                        }}>
                          {typeof tag === "string" ? tag : tag?.name || String(tag)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="noc-proj-links" style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                  {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        width: "38px", height: "38px",
                        border: `1px solid ${isHov ? GOLD + "60" : "#2a2825"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isHov ? GOLD : "#4a4845",
                        textDecoration: "none", transition: "all 0.25s ease",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={14} />
                    </a>
                  )}
                  {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        width: "38px", height: "38px",
                        border: `1px solid ${isHov ? GOLD + "60" : "#2a2825"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isHov ? GOLD : "#4a4845",
                        textDecoration: "none", transition: "all 0.25s ease",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
