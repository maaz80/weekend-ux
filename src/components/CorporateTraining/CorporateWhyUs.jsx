"use client";

import React from "react";

const defaultContent = {
  eyebrow: "Why Us",
  headingStart: "Why",
  headingHighlight: "Top Companies",
  headingEnd: "Prefer WeekendUX",
  description:
    "Simplilearn for Business helps organizations convert learning investments into measurable goals. Unlimited hands-on learning that fuels career growth, fills in-demand roles, and builds complementary skills with real business impact.",
  backgroundImage: "/images/weekend-ux-why-us-bg.webp",
  cardImageOne: "/images/weekend-ux-why-us-card-1.png",
  cardImageTwo: "/images/weekend-ux-why-us-card-2.png",
  points: [
    "Customized curriculum built with industry leaders, for industry leaders",
    "Extensive GenAI curriculum from foundation to advanced across domains. Learning journeys covering 40+ AI and digital roles.",
    "Assignments and project work review and feedback from industry SMEs",
    "Comprehensive learning across digital literacy and technology, with soft skills programs for real workplace impact",
    "Assignments and project work review and feedback from industry SMEs",
    "Assignments and project work review and feedback from industry SMEs",
  ],
};

export default function CorporateWhyUs({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    points: Array.isArray(data?.points) ? data.points : defaultContent.points,
  };
  const leftPoints = content.points.slice(0, 3);
  const rightPoints = content.points.slice(3);

  const renderPoint = (point, index) => (
    <div
      key={`${index}-${point}`}
      className="bg-linear-to-b from-white/45 to-transparent rounded-2xl p-4 sm:p-5 backdrop-blur-md flex items-center gap-4 shadow-sm hover:bg-white/35 transition-all"
    >
      <div className="w-10 h-10 rounded-full bg-[#ffea79] shrink-0 shadow-inner" />
      <p className="font-urbanist font-semibold text-[#1a1200] leading-snug">{point}</p>
    </div>
  );

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-6 sm:py-10 lg:py-14 px-5 sm:px-8 text-[#1a1200]"
      style={{
        backgroundImage: `url('${content.backgroundImage}')`,
      }}
    >
      <div className="custom-width mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* <p className="font-inter font-semibold uppercase tracking-[0.45em] text-[#1a1200] mb-2">
            {content.eyebrow}
          </p> */}
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium leading-[1.15] text-[#1a1200]">
            {content.headingStart}{" "}
            <span className="italic font-playfair">{content.headingHighlight}</span>{" "}
            {content.headingEnd}
          </h2>
          <p className="font-urbanist md:text-base text-[#1a1200] mt-4 leading-relaxed max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* 2-Column Grid Layout matching image-1.png */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Row 1 Left: 3 Pills */}
          <div className="flex flex-col gap-4 justify-between">
            {leftPoints.map((point, index) => renderPoint(point, index))}
          </div>

          {/* Row 1 Right: Text Card and Photo Panel */}
          <div className="flex flex-col gap-4">
            {rightPoints[0] && renderPoint(rightPoints[0], 3)}

            <div className="relative rounded-2xl overflow-hidden h-[190px] bg-neutral shadow-lg">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${content.cardImageTwo}')`,
                }}
              />
            </div>
          </div>

          {/* Row 2 Left: Photo Panel (Dark Curved Light Streaks / Tunnel) */}
          <div className="relative rounded-2xl overflow-hidden h-[190px] bg-neutral shadow-lg order-2 lg:order-1">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${content.cardImageOne}')`,
              }}
            />
          </div>

          {/* Row 2 Right: 2 Pills */}
          <div className="flex flex-col gap-4 justify-between order-1 lg:order-2">
            {rightPoints.slice(1).map((point, index) => renderPoint(point, index + 4))}
          </div>
        </div>
      </div>
    </section>
  );
}
