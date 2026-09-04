"use client";

import { Briefcase, GraduationCap, Compass, Calculator } from "lucide-react";

export default function WhoShouldEnroll() {
  const cards = [
    {
      icon: Briefcase,
      title: "WORKING PROFESSIONALS",
      description: "Looking to upgrade skills and grow in their career."
    },
    {
      icon: GraduationCap,
      title: "STUDENTS",
      description: "Seeking practical knowledge and industry-ready skills."
    },
    {
      icon: Compass,
      title: "CAREER SWITCHERS",
      description: "Planning to switch to a better role or domain."
    },
    {
      icon: Calculator,
      title: "ACCOUNTING PROFESSIONALS",
      description: "Who want to enhance their expertise and stay competitive."
    }
  ];

  return (
    <section className="w-full bg-official text-neutral font-urbanist relative z-1 py-12 sm:py-16 md:py-20 shadow-sm">
      <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral leading-tight">
            This course is ideal for
          </h2>
          <p className="font-urbanist text-sm sm:text-base font-semibold text-neutral/80 leading-relaxed">
            Real stories and tailored learning tracks for professionals and learners aiming to advance their careers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#ffffff] text-[#18181b] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#18181b] flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300 shadow-2xs">
                  <Icon size={28} className="text-[#18181b]" />
                </div>

                {/* Card Title */}
                <h3 className="font-urbanist font-extrabold text-sm sm:text-base tracking-wider uppercase text-[#18181b] leading-snug">
                  {card.title}
                </h3>

                {/* Underline Accent */}
                <div className="w-8 h-0.5 bg-official my-3.5 rounded-full group-hover:w-12 transition-all duration-300" />

                {/* Description */}
                <p className="font-urbanist text-xs sm:text-sm font-medium text-[#4b5563] leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
