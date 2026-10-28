"use client";

import React from "react";

const stats = [
  {
    value: "700+",
    label: "Live, expert-led sessions monthly",
  },
  {
    value: "1000",
    label: "Async learning programs",
  },
  {
    value: "1000+",
    label: "Hands-on projects, labs, and assessments",
  },
];

export default function CorporateStatsBanner() {
  return (
    <section className="relative w-full bg-[#ffd000] text-[#161616] py-14 sm:py-18 lg:py-20 px-5 sm:px-8 lg:px-16 overflow-hidden">
      <div className="custom-width mx-auto">
        {/* Top Description Paragraph */}
        <div className="max-w-2xl">
          <p className="font-urbanist text-lg sm:text-xl md:text-2xl font-medium leading-relaxed sm:leading-snug text-[#161616]">
            Give your workforce access to an AI-first learning platform, covering expert-led programs in AI, data, power skills, and industry-recognized certifications.
          </p>
        </div>

        {/* 3 Stats with Dividers */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {stats.map((stat, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3.5 sm:gap-4">
                <span className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161616]">
                  {stat.value}
                </span>
                <span className="font-urbanist text-xs sm:text-sm font-semibold text-[#161616]/85 leading-snug max-w-[140px]">
                  {stat.label}
                </span>
              </div>
              {idx < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 lg:h-14 bg-black/30" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
