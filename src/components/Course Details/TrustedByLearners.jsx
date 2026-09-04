"use client";

import { Star } from "lucide-react";

export default function TrustedByLearners() {
  const ratings = [
    {
      score: "4.9",
      image: "/images/google-logo-icon.webp",
      alt: "Google",
      heightClass: "h-5 sm:h-6"
    },
    {
      score: "4.89",
      image: "/images/course-report.png",
      alt: "Course Report",
      heightClass: "h-5 sm:h-6"
    },
    {
      score: "4.94",
      image: "/images/switchup.png",
      alt: "SwitchUp",
      heightClass: "h-5 sm:h-6"
    },
    {
      score: "4.7",
      image: "/images/career-karma-logo.png",
      alt: "Career Karma",
      heightClass: "h-5 sm:h-6"
    }
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-12 border-b border-zinc-150 font-urbanist">
      <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto text-center space-y-6">
        
        {/* Section Heading */}
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-[32px] font-extrabold text-zinc-900 leading-tight">
          Trusted by millions of learners
        </h2>

        {/* Badges Grid / Row */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 pt-1">
          {ratings.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200/90 rounded-2xl px-4.5 py-2.5 sm:px-6 sm:py-3 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex items-center gap-2.5 shrink-0"
            >
              {/* Score */}
              <span className="font-urbanist font-extrabold text-base sm:text-lg text-zinc-900">
                {item.score}
              </span>

              {/* Star Icon */}
              <Star size={18} className="fill-amber-400 text-amber-400 shrink-0" />

              {/* Platform Logo Image */}
              <div className="pl-2.5 border-l border-zinc-200 flex items-center">
                <img
                  src={item.image}
                  alt={item.alt}
                  className={`w-auto ${item.heightClass} object-contain max-w-[110px] sm:max-w-[130px]`}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
