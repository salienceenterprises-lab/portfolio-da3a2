"use client";
import React from "react";
import portfolioData from "../profile.json";

import NocturneNav from "./components/nav";
import NocturneHero from "./components/hero";
import NocturneAbout from "./components/about";
import NocturneEducation from "./components/education";
import NocturneExperience from "./components/experience";
import NocturneProjects from "./components/projects";
import NocturneSkills from "./components/skills";
import NocturneCommunity from "./components/community";
import NocturneContact from "./components/contact";

export default function DeployedPortfolio() {
  const data = portfolioData;

  if (!data) return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontSize: "10px", color: "#2a2825", letterSpacing: "0.3em", textTransform: "uppercase" }}>
        Loading…
      </span>
    </div>
  );

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 68px; }
        ::placeholder { color: #2a2825; }
        @media (max-width: 768px) {
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
        @media (max-width: 1023px) {
          .noc-two-col { grid-template-columns: 1fr !important; }
          .noc-exp-grid { grid-template-columns: 1fr !important; }
          .noc-exp-grid > *:first-child { border-right: none !important; border-bottom: 1px solid #1e1c19; }
        }
      `}</style>

      <NocturneNav data={data} />
      <NocturneHero data={data} />
      <NocturneAbout data={data} />
      <NocturneEducation data={data} />
      <NocturneExperience data={data} />
      <NocturneProjects data={data} />
      <NocturneSkills data={data} />
      <NocturneCommunity data={data} />
      <NocturneContact data={data} />
    </div>
  );
}
