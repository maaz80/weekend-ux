"use client";

import { Star, GraduationCap, Briefcase, Trophy } from "lucide-react";

const GENERAL_ICONS = [Star, GraduationCap, Briefcase, Trophy];

function getIconForItem(item, idx) {
  const name = (item?.name || "").toLowerCase();

  if (name.includes("rating") || name.includes("star") || name.includes("google"))
    return Star;

  if (
    name.includes("alumni") ||
    name.includes("student") ||
    name.includes("trained") ||
    name.includes("graduat")
  )
    return GraduationCap;

  if (
    name.includes("placement") ||
    name.includes("job") ||
    name.includes("career") ||
    name.includes("rate")
  )
    return Briefcase;

  if (
    name.includes("partner") ||
    name.includes("company") ||
    name.includes("trophy") ||
    name.includes("award")
  )
    return Trophy;

  return GENERAL_ICONS[idx % GENERAL_ICONS.length];
}

export default function SocialProofBar({ items }) {
  const defaultItems = [
    { value: "4.9 / 5", name: "Google Rating" },
    { value: "10,000+", name: "Alumni Trained" },
    { value: "99%", name: "Placement Rate" },
    { value: "500+", name: "Hiring Partners" },
  ];

  const displayItems =
    Array.isArray(items) && items.length > 0 ? items : defaultItems;

  return (
    <section className="w-full bg-official text-black relative z-20 py-3 sm:py-4">
      <div className="custom-width px-3 sm:px-5 lg:px-8 mx-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {displayItems.slice(0, 4).map((item, idx) => {
            const IconComponent = getIconForItem(item, idx);

            return (
              <div
                key={idx}
                className="
                  group flex flex-wrap flex-col md:flex-row items-center
                  gap-2 sm:gap-3
                  px-2.5 py-2.5 sm:px-4 sm:py-3
                  rounded-xl sm:rounded-2xl
                  border border-white/10
                  backdrop-blur-sm
                  shadow-sm
                  transition-all duration-300
                  hover:bg-white/10
                  hover:border-white/20
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                {/* Icon */}
                <div
                  className="
                    shrink-0
                    w-8 h-8 sm:w-10 sm:h-10
                    rounded-lg sm:rounded-xl
                    bg-white/10
                    border border-white/10
                    flex items-center justify-center
                    text-black
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                >
                  <IconComponent
                    size={17}
                    strokeWidth={2}
                    className="sm:w-5 sm:h-5"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex flex-col">
                  <span
                    className="
                      text-sm sm:text-lg lg:text-xl
                      font-extrabold
                      leading-none
                      tracking-tight
                      text-black
                      truncate
                    "
                  >
                    {item.value || "100%"}
                  </span>

                  <span
                    className="
                      mt-1
                      text-[8px] sm:text-[10px] lg:text-xs
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-black/60
                      truncate
                    "
                  >
                    {item.name || "Metric"}
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