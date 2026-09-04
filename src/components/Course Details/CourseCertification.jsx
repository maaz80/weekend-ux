"use client";

import React from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const DeltaIcon = ({ className = "w-5 h-5" }) => (
     <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
               d="M12 3.5L21 19H3L12 3.5Z"
               stroke="currentColor"
               strokeWidth="2.2"
               strokeLinecap="round"
               strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="1.5" fill="currentColor" />
     </svg>
);

export default function CourseCertification({ data }) {
     const courseName = data?.title || "UI/UX Design";
     
     const title = data?.certificationTitle || `${courseName} Course Certification`;
     const subtitle = data?.certificationSubtitle || `Master ${courseName} Skills & Earn Your Professional Certificate`;

     const defaultBullets = [
          `Industry-recognized ${courseName} certification awarded upon successful course completion.`,
          `Learn from certified ${courseName} trainers and industry experts through practical, hands-on training.`,
          "Gain real-world project experience designed to match current industry requirements.",
          "Receive dedicated career mentorship, interview preparation, and placement assistance."
     ];

     const bullets = (Array.isArray(data?.certificationBullets) && data.certificationBullets.length > 0)
          ? data.certificationBullets
          : defaultBullets;

     const imageSrc = data?.certificationImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";

     return (
          <section className="w-full bg-[#051329] py-14 sm:py-18 md:py-24 font-urbanist relative overflow-hidden text-white border-b border-zinc-800/80 px-2">
               {/* Background Decorative Abstract Triangles */}
               {/* <div className="absolute top-12 left-6 w-48 h-48 border-2 border-white/5 rounded-3xl rotate-12 pointer-events-none hidden sm:block"></div>
               <div className="absolute bottom-10 right-10 w-64 h-64 border border-amber-500/10 rounded-full pointer-events-none hidden md:block"></div> */}

               {/* Soft Background Radial Glow */}
               {/* <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div> */}

               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

                         {/* Left Side: Student Image holding Certificate */}
                         <div className="lg:col-span-5 w-full flex justify-center relative">
                              
                              {/* Background Decorative Outline */}
                              <div className="absolute -top-6 -left-6 w-32 h-32 border border-white/10 rounded-2xl rotate-45 pointer-events-none hidden sm:block"></div>

                              <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xs group">
                                   
                                   {/* Student Photo */}
                                   <div className="aspect-4/5 sm:aspect-3/4 lg:aspect-5/5 w-full relative overflow-hidden bg-linear-to-b from-transparent to-black/60">
                                        <OptimizedImage
                                             src={imageSrc}
                                             alt={title}
                                             width={800}
                                             height={750}
                                             className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                                        />
                                   </div>

                                   {/* Bottom Glow Badge Overlay */}
                                   {/* <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center justify-between text-left shadow-lg">
                                        <div>
                                             <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">OFFICIAL CERTIFICATE</p>
                                             <p className="text-sm font-semibold text-white truncate">{courseName} Graduate</p>
                                        </div>
                                        <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                                             <DeltaIcon className="w-5 h-5 text-amber-400" />
                                        </div>
                                   </div> */}

                              </div>
                         </div>

                         {/* Right Side: Heading, Subtitle and Bullet Points */}
                         <div className="lg:col-span-7 space-y-6 text-left min-w-0">

                              {/* Title */}
                              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-official leading-tight">
                                   {title}
                              </h2>

                              {/* Subtitle */}
                              <p className="font-urbanist text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                                   {subtitle}
                              </p>

                              {/* Bullets List */}
                              <div className="space-y-5 pt-4 border-t border-white/10">
                                   {bullets.map((bulletText, idx) => (
                                        <div key={idx} className="flex items-start gap-4 text-left group min-w-0">
                                             {/* Triangular Delta Icon */}
                                             <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 text-official flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-official group-hover:text-zinc-950 transition-all duration-300 shadow-2xs">
                                                  <DeltaIcon className="w-4 h-4 text-official group-hover:text-zinc-950 transition-colors" />
                                             </div>

                                             {/* Bullet Description */}
                                             <p className="font-urbanist text-sm sm:text-base text-zinc-200 font-medium leading-relaxed pt-1">
                                                  {bulletText}
                                             </p>
                                        </div>
                                   ))}
                              </div>

                         </div>

                    </div>
               </div>
          </section>
     );
}
