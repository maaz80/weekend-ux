"use client";

import React from "react";

export default function HiringPartners({ data }) {
     const hiringData = data?.hiringPartners || {};
     const title = hiringData.title || "Our Hiring Partners";
     const subtitle = hiringData.subtitle || "Trusted by top companies across India";

     // Default partner logos (purely images)
     const partnerLogos = [
          { image: "/images/google-logo-icon.webp" },
          { image: "/images/course-report.png" },
          { image: "/images/switchup.png" },
          { image: "/images/career-karma-logo.png" },
          { image: "/images/Figma.webp" },
          { image: "/images/google-logo-icon.webp" },
          { image: "/images/course-report.png" },
          { image: "/images/switchup.png" },
          { image: "/images/career-karma-logo.png" },
          { image: "/images/Figma.webp" }
     ];

     // Extract partner items and filter only items with valid image URLs
     const validItems = (Array.isArray(hiringData.items) && hiringData.items.length > 0)
          ? hiringData.items.filter(item => item && item.image && String(item.image).trim() !== "")
          : [];

     const displayItems = validItems.length > 0 ? validItems : partnerLogos;

     // Split items into 2 rows for double-marquee effect matching image-9.png
     const row1 = displayItems.slice(0, Math.ceil(displayItems.length / 2));
     const row2 = displayItems.slice(Math.ceil(displayItems.length / 2));

     const targetLength = 12;
     const repeatCount1 = Math.max(2, Math.ceil(targetLength / (row1.length || 1)));
     const repeatCount2 = Math.max(2, Math.ceil(targetLength / (row2.length || 1)));

     const ticker1 = Array(repeatCount1).fill(row1).flat();
     const ticker2 = Array(repeatCount2).fill(row2.length ? row2 : row1).flat();

     return (
          <section className="button-neutral w-full bg-yellow-100 py-7 sm:py-18 md:py-24 font-urbanist relative z-1 overflow-hidden">
               <style jsx>{`
                    @keyframes marquee-left {
                         0% { transform: translateX(0%); }
                         100% { transform: translateX(-50%); }
                    }
                    @keyframes marquee-right {
                         0% { transform: translateX(-50%); }
                         100% { transform: translateX(0%); }
                    }
                    .animate-marquee-left {
                         animation: marquee-left 28s linear infinite;
                    }
                    .animate-marquee-right {
                         animation: marquee-right 28s linear infinite;
                    }
                    .animate-marquee-left:hover,
                    .animate-marquee-right:hover {
                         animation-play-state: paused;
                    }
               `}</style>

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    
                    {/* Header Section */}
                    <div className="space-y-2 max-w-2xl mx-auto mb-10 md:mb-14">
                         <h2 className="font-urbanist text-3xl sm:text-4xl md:text-5xl font-black text-neutral tracking-tight leading-tight">
                              Our Hiring <span className="text-[#f36600] font-extrabold">Partners</span>
                         </h2>
                         <p className="font-urbanist text-sm sm:text-base 2xl:text-[18px] font-semibold text-neutral/90 leading-relaxed">
                              {subtitle}
                         </p>
                    </div>

                    {/* Marquee Container with Left and Right Fade Masks */}
                    <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5">
                         
                         {/* Left Fade Overlay */}
                         <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-linear-to-r from-yellow-100 to-transparent z-10 h-60" />
                         
                         {/* Right Fade Overlay */}
                         <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-linear-to-l from-yellow-100 to-transparent z-10 h-60" />

                         {/* ROW 1 (Scroll Left) */}
                         <div className="flex w-max gap-4 sm:gap-6 animate-marquee-left">
                              {ticker1.map((partner, idx) => (
                                   <div
                                        key={`r1-${idx}`}
                                        className="w-30 sm:w-56 h-10 sm:h-22 bg-white rounded-xl sm:rounded-2xl shadow-xs border border-zinc-200/80 px-6 py-4 flex items-center justify-center shrink-0 hover:shadow-md hover:border-blue-300 transition-all duration-300 group cursor-pointer"
                                   >
                                        <img
                                             src={partner.image}
                                             alt="Hiring Partner Logo"
                                             width="130"
                                             height="40"
                                             className="h-6 sm:h-10 w-auto max-w-32.5 sm:max-w-40 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                                        />
                                   </div>
                              ))}
                         </div>

                         {/* ROW 2 (Scroll Right) */}
                         <div className="flex w-max gap-4 sm:gap-6 animate-marquee-right">
                              {ticker2.map((partner, idx) => (
                                   <div
                                        key={`r2-${idx}`}
                                        className="w-30 sm:w-56 h-10 sm:h-22 bg-white rounded-xl sm:rounded-2xl shadow-xs border border-zinc-200/80 px-6 py-4 flex items-center justify-center shrink-0 hover:shadow-md hover:border-blue-300 transition-all duration-300 group cursor-pointer"
                                   >
                                        <img
                                             src={partner.image}
                                             alt="Hiring Partner Logo"
                                             width="130"
                                             height="40"
                                             className="h-6 sm:h-10 w-auto max-w-32.5 sm:max-w-40 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                                        />
                                   </div>
                              ))}
                         </div>

                    </div>

               </div>
          </section>
     );
}
