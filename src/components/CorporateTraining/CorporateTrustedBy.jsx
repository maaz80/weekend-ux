"use client";

import React from "react";
// import { Lightbulb } from "lucide-react";
import { HiLightBulb } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";

const defaultTrustedBy = {
  startheading: "Trusted",
  midheading: "By",
  endheading: "Leading Organizations Worldwide",
  description: "Our corporate training programs help organizations build the skills their teams need to grow.",
  backgroundImage: "/images/weekend-ux-why-our-students-hiring-bg.webp",
  partners: [
    { name: "Weekend UX", image: "/images/weekend-ux-logo.webp", alt: "Weekend UX" },
    { name: "Partner", image: "", alt: "Partner" },
    { name: "Partner", image: "", alt: "Partner" },
    { name: "Partner", image: "", alt: "Partner" },
    { name: "Partner", image: "", alt: "Partner" },
  ],
};

export default function CorporateTrustedBy({ data }) {
  const trustedBy = { ...defaultTrustedBy, ...data };

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-16 sm:py-20 lg:py-24 px-5 sm:px-8"
      style={{
        backgroundImage: `url('${trustedBy.backgroundImage}')`,
      }}
    >

      <div className="custom-width mx-auto text-center">
        <SectionHeading
          className="mb-12 sm:mb-14"
          heading={
            <>
              <span className="italic text-[#f36600]">{trustedBy.startheading}</span>{" "}
              {trustedBy.midheading} {trustedBy.endheading}
            </>
          }
          description={trustedBy.description}
        />

        {/* Cards Row matching image.png */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          {trustedBy.partners.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              aria-label={item.name || item.alt || "Partner"}
              className="w-36 sm:w-44 h-22 sm:h-26 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-amber-100/80 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt || item.name || ""}
                  loading="lazy"
                  className="h-16 w-24 object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#ffb800] group-hover:scale-110 transition-transform">
                  <HiLightBulb className="w-10 h-10 fill-[#ffc000] text-[#ffc000]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
