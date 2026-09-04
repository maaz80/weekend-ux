"use client";

import { useState } from "react";

export default function SkillsYouWillLearn({ data }) {
  const [showAll, setShowAll] = useState(false);

  const defaultSkills = [
    "AGENTIC AI SYSTEMS",
    "RETRIEVAL-AUGMENTED GENERATION (RAG)",
    "FINE-TUNING (LORA QLORA PEFT)",
    "MULTI-AGENT SYSTEMS",
    "AGENT EVALUATION & HUMAN-IN-THE-LOOP",
    "UI/UX DESIGN & WIREFRAMING",
    "FIGMA & DESIGN SYSTEMS",
    "PROTOTYPING & USER TESTING"
  ];

  const title = data?.skillsYouWillLearn?.title || "Skills you will learn";
  const rawSkills = data?.skillsYouWillLearn?.skills;
  const skillsList = Array.isArray(rawSkills) && rawSkills.length > 0
    ? rawSkills.filter(s => s && String(s).trim())
    : defaultSkills;

  const INITIAL_LIMIT = 5;
  const visibleSkills = showAll ? skillsList : skillsList.slice(0, INITIAL_LIMIT);
  const hasMore = skillsList.length > INITIAL_LIMIT;

  return (
    <section className="w-full bg-white py-10 sm:py-12 border-b border-zinc-100 font-urbanist">
      <div className="custom-width px-4 sm:px-6 lg:px-16">
        <div className="space-y-6 text-left">
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-[34px] font-extrabold text-zinc-900 leading-tight">
            {title}
          </h2>

          <div className="flex flex-wrap gap-2.5 sm:gap-3.5 pt-1">
            {visibleSkills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block px-4 py-2.5 sm:px-5 sm:py-3 bg-[#EFF4FA] text-black border border-official font-bold text-[11px] sm:text-xs tracking-wider uppercase rounded-md shadow-lg shadow-amber-400 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-950 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>

          {hasMore && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="text-xs sm:text-sm font-extrabold text-[#2563EB] hover:text-amber-600 uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
              >
                {showAll ? "VIEW LESS ▲" : "VIEW MORE ▼"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
