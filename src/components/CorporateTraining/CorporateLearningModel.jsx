"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

const defaultContent = {
  eyebrow: "Training Options",
  headingStart: "Learning Model That",
  headingHighlight: "Moves",
  headingEnd: "The Business Forward",
  backgroundImage: "/images/weekend-ux-why-our-students-hiring-bg.webp",
  showcaseBackgroundImage: "/images/weekend-ux-training-options-card-bg.webp",
  options: [
  {
    id: "ui",
    title: "User Interface Design",
    image: "/images/weekend-ux-training-options-card-center-image.webp",
    topics: [
      "Design Systems",
      "Figma Advanced Mastery",
      "Responsive Layouts",
      "Micro-Interactions",
      "Component Architecture",
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    image: "/images/weekend-ux-training-options-card-center-image.webp",
    topics: [
      "Gen AI",
      "AI Design Tools",
      "AI Prompting",
      "AI In Research",
      "AI In Wireframing",
    ],
  },
  {
    id: "ux",
    title: "User Experience Design",
    image: "/images/weekend-ux-training-options-card-center-image.webp",
    topics: [
      "User Research & Testing",
      "Information Architecture",
      "Wireframing & Prototyping",
      "Usability Audits",
      "Heuristic Evaluation",
    ],
  },
  {
    id: "graphic",
    title: "Graphic Design",
    image: "/images/weekend-ux-training-options-card-center-image.webp",
    topics: [
      "Brand Identity & Systems",
      "Typography & Layout",
      "Visual Storytelling",
      "Vector Illustration",
      "Marketing Collaterals",
    ],
  },
  {
    id: "video",
    title: "Video Design & Editing",
    image: "/images/weekend-ux-training-options-card-center-image.webp",
    topics: [
      "Premiere Pro & DaVinci",
      "Color Grading & LUTs",
      "Audio & Sound Design",
      "Storyboarding & Pace",
      "Narrative Video Editing",
    ],
  },
  {
    id: "motion",
    title: "Motion & Animation",
    image: "/images/weekend-ux-training-options-card-center-image.webp",
    topics: [
      "After Effects 2D Motion",
      "UI Motion Guidelines",
      "3D Motion Graphics",
      "Kinetic Typography",
      "Lottie Micro-Animations",
    ],
  },
  ],
};

export default function CorporateLearningModel({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    options: Array.isArray(data?.options) && data.options.length > 0 ? data.options : defaultContent.options,
  };
  const [activeTab, setActiveTab] = useState(1); // Default to Artificial Intelligence matching image-2.png
  const current = content.options[activeTab] || content.options[0];

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-6 sm:py-10 lg:py-14 px-5 sm:px-8 text-[#18181b]"
      style={{
        backgroundImage: `url('${content.backgroundImage}')`,
      }}
    >

      <div className="custom-width mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="font-inter text-xs sm:text-sm font-semibold uppercase tracking-[0.45em] text-[#e59b00] mb-2">
            {content.eyebrow}
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium leading-[1.15] text-[#18181b]">
            {content.headingStart}{" "}
            <span className="italic text-[#f3a800]">{content.headingHighlight}</span>{" "}
            {content.headingEnd}
          </h2>
        </div>

        {/* 2-Column Tabs + Preview Display matching image-2.png */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-14 items-center">
          {/* Left: Tab options */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {content.options.map((item, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={item.id || `${item.title}-${idx}`}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left px-5 sm:px-6 py-4 rounded-xl font-urbanist text-base sm:text-lg transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#18181b] text-white font-semibold shadow-md translate-x-1"
                      : "text-[#18181b]/75 hover:text-[#18181b] hover:bg-black/5 font-medium"
                  }`}
                >
                  <span>{item.title}</span>
                  {isActive && (
                    <Sparkles className="w-4 h-4 text-[#ffd000] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Showcase Box */}
          <div className="relative isolate overflow-hidden rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-zinc-800 text-white">
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: `url('${content.showcaseBackgroundImage}')` }}
            />
            {/* Visual Screen */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-900 border border-zinc-800">
              <img
                src={current.image || defaultContent.options[0].image}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10]/80 via-transparent to-transparent" />
            </div>

            {/* Topics Grid with Arrows */}
            <div className="mt-6 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-7">
              {(current.topics || []).map((topic, tIdx) => (
                <div
                  key={tIdx}
                  className="flex items-center gap-2.5 text-white/95 font-urbanist text-sm sm:text-[19px] font-medium"
                >
                  <span className="text-white font-bold text-base">→</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
