"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const GOLD = "#c8943a";
const GOLD_L = "#e0b256";

export default function NocturneContact({ data }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const hasContact = !!(data?.email || data?.github || data?.linkedin || data?.twitter || data?.website || data?.web3forms_key);
  if (!hasContact) return null;

  const web3formsKey = data?.web3forms_key || "";
  const hasForm = Boolean(web3formsKey);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasForm || !form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputBase = (field) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? GOLD : "#2a2825"}`,
    color: "#ede9e0",
    fontSize: "14px",
    padding: "12px 0",
    outline: "none",
    transition: "border-color 0.25s ease",
    fontFamily: "inherit",
    fontWeight: 300,
    boxSizing: "border-box",
    letterSpacing: "0.02em",
  });

  const socials = [
    data?.github   && { icon: <FaGithub size={16} />,   href: data.github,            label: "GitHub" },
    data?.linkedin && { icon: <FaLinkedin size={16} />,  href: data.linkedin,          label: "LinkedIn" },
    data?.email    && { icon: <FaEnvelope size={16} />,  href: `mailto:${data.email}`, label: "Email" },
  ].filter(Boolean);

  return (
    <section id="contact" style={{
      background: "#0a0a0a",
      borderTop: "1px solid #1e1c19",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .noc-contact-inner { padding: 4rem 1.5rem 3rem !important; }
          .noc-contact-grid { display: block !important; }
          .noc-contact-heading { font-size: clamp(2.5rem, 12vw, 5rem) !important; margin-bottom: 3rem !important; }
          .noc-contact-left { margin-bottom: 3rem; }
        }
      `}</style>

      {/* Top gold accent line */}
      <div style={{ height: "2px", background: `linear-gradient(to right, ${GOLD}, transparent)` }} />

      <div style={{
        position: "absolute", top: "-1rem", left: "2rem",
        fontSize: "200px", fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.025)",
        pointerEvents: "none", userSelect: "none",
      }}>07</div>

      <div className="noc-contact-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "8rem 3rem 6rem" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "3.5rem" }}
        >
          <div style={{ width: "28px", height: "1.5px", background: GOLD }} />
          <span style={{ fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: GOLD }}>
            Contact
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="noc-contact-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 900, letterSpacing: "-0.05em",
            lineHeight: 0.88, textTransform: "uppercase",
            color: "#ede9e0", margin: "0 0 6rem",
          }}
        >
          Let's Work<br />
          <span style={{ color: GOLD_L }}>Together.</span>
        </motion.h2>

        <div
          className="noc-contact-grid"
          style={{ display: "grid", gridTemplateColumns: hasForm ? "1fr 1fr" : "1fr", gap: "6rem" }}
        >
          {/* Left: info */}
          <motion.div
            className="noc-contact-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p style={{
              fontSize: "15px", color: "rgba(237,233,224,0.45)",
              lineHeight: 1.85, maxWidth: "380px",
              margin: "0 0 3rem", fontWeight: 300,
              borderLeft: `2px solid ${GOLD}40`,
              paddingLeft: "1.4rem",
            }}>
              {data?.contactBlurb || "Available for full-time roles, freelance projects, and interesting collaborations. Let's build something exceptional."}
            </p>

            {/* Direct email */}
            {data?.email && (
              <a href={`mailto:${data.email}`} style={{
                display: "block",
                fontSize: "13px", fontWeight: 500,
                color: "rgba(237,233,224,0.4)",
                textDecoration: "none", letterSpacing: "0.04em",
                transition: "color 0.25s ease",
                marginBottom: "2.5rem",
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = GOLD_L}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(237,233,224,0.4)"}
              >
                {data.email}
              </a>
            )}

            {/* Socials */}
            {socials.length > 0 && (
              <div style={{ display: "flex", gap: "10px" }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "42px", height: "42px",
                      border: "1px solid #2a2825",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#4a4845", textDecoration: "none",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.background = `${GOLD}0f`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2825"; e.currentTarget.style.color = "#4a4845"; e.currentTarget.style.background = "transparent"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: form */}
          {hasForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {status === "sent" ? (
                <div style={{
                  border: `1px solid ${GOLD}40`,
                  padding: "3rem",
                  textAlign: "center",
                  background: `${GOLD}08`,
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: GOLD_L }}>◆</div>
                  <h3 style={{ color: "#ede9e0", fontSize: "18px", fontWeight: 800, marginBottom: "0.5rem", textTransform: "uppercase" }}>
                    Message Received.
                  </h3>
                  <p style={{ color: "#6a6560", fontSize: "12px", letterSpacing: "0.05em" }}>
                    I'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  <div>
                    <label style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#3a3835", display: "block", marginBottom: "8px" }}>Name</label>
                    <input
                      type="text" placeholder="Your name" required
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={inputBase("name")}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#3a3835", display: "block", marginBottom: "8px" }}>Email</label>
                    <input
                      type="email" placeholder="your@email.com" required
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      style={inputBase("email")}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "#3a3835", display: "block", marginBottom: "8px" }}>Message</label>
                    <textarea
                      rows={4} placeholder="Tell me about your project…" required
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      style={{ ...inputBase("message"), resize: "none" }}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      style={{
                        background: "none",
                        border: `1px solid ${GOLD}`,
                        color: GOLD,
                        padding: "14px 40px",
                        fontSize: "10px", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.25em",
                        cursor: status === "sending" ? "not-allowed" : "pointer",
                        opacity: status === "sending" ? 0.5 : 1,
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (status !== "sending") {
                          e.currentTarget.style.background = GOLD;
                          e.currentTarget.style.color = "#0a0a0a";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = GOLD;
                      }}
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </button>
                    {status === "error" && (
                      <p style={{ fontSize: "12px", color: "#ff5555", margin: "1rem 0 0", letterSpacing: "0.04em" }}>
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </div>

        {/* Footer strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "6rem", paddingTop: "2rem",
          borderTop: "1px solid #1e1c19",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontSize: "9px", color: "#2a2825", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            © {new Date().getFullYear()} {data?.name} — All rights reserved
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "4px", height: "4px", background: GOLD, transform: "rotate(45deg)" }} />
            <span style={{ fontSize: "9px", color: "#2a2825", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Nocturne
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
