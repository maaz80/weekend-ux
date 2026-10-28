"use client";

import React from "react";
import { Award, Star, DollarSign } from "lucide-react";

const defaultContent = {
  headingStart: "What Learning",
  headingHighlight: "Delivers",
  headingEnd: "For Your Organization",
  cards: [
    { icon: "award", value: "95%", label: "Certification Pass Rate" },
    { icon: "star", value: "85%", label: "Average Completion Rate" },
    { icon: "dollar-sign", value: "40%", label: "Savings on Training Costs" },
  ],
};

const icons = {
  award: Award,
  star: Star,
  "dollar-sign": DollarSign,
};

export default function CorporateOutcomes({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    cards: Array.isArray(data?.cards) ? data.cards : defaultContent.cards,
  };

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-6 sm:py-10 lg:py-14 px-5 sm:px-8 text-[#1a1200]"
      style={{
        backgroundImage: "url('/images/weekend-ux-proven-outcomes-section-bg.webp')",
      }}
    >

      <div className="custom-width mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* <p className="font-inter text-xs sm:text-sm font-semibold uppercase tracking-[0.45em] text-[#1a1200] mb-2">
            Proven Outcomes
          </p> */}
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium leading-[1.15] text-[#1a1200]">
            {content.headingStart}{" "}
            <span className="italic font-playfair text-white">{content.headingHighlight}</span>{" "}
            {content.headingEnd}
          </h2>
        </div>

        {/* 3 Outcome Cards matching image-3.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {content.cards.map((item, idx) => {
            const Icon = icons[item.icon] || Award;
            return (
              <div
                key={`${item.label}-${idx}`}
                className="bg-linear-to-b from-white/25 to-transparent rounded-3xl p-6 sm:p-8 backdrop-blur-md flex items-center gap-5 shadow-sm hover:bg-white/35 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ffea79] flex items-center justify-center shrink-0 shadow-inner text-[#1a1200]">
                  <Icon className="w-7 h-7 stroke-[2.2]" />
                </div>
                <div>
                  <span className="font-urbanist text-4xl sm:text-5xl font-bold text-[#1a1200] leading-none block">
                    {item.value}
                  </span>
                  <span className="font-urbanist text-xs sm:text-sm font-semibold text-[#1a1200]/85 mt-1.5 leading-snug block">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
