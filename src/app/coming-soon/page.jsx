"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMail, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import diamondImg from "@/app/assets/weekend-ux-hero-decorative-diamond.webp";

export default function ComingSoonPage() {
     // Live countdown calculation for Summer 2026 / dynamic ticker
     const [timeLeft, setTimeLeft] = useState({
          days: 18,
          hours: 14,
          mins: 42,
          secs: 9
     });

     const [email, setEmail] = useState("");
     const [submitted, setSubmitted] = useState(false);

     useEffect(() => {
          const timer = setInterval(() => {
               setTimeLeft((prev) => {
                    if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
                    if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
                    if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
                    if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
                    return prev;
               });
          }, 1000);

          return () => clearInterval(timer);
     }, []);

     const handleSubmit = (e) => {
          e.preventDefault();
          if (email.trim()) {
               setSubmitted(true);
               setEmail("");
          }
     };

     return (
          <main className="relative min-h-screen overflow-hidden bg-[#191917] text-white flex items-center justify-center px-4 sm:px-6 py-40 md:py-38 font-urbanist">

               {/* Background Golden / Ambient Glow Effects (Identical to 404) */}
               <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(100,90,25,0.28),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,rgba(255,212,0,0.10),transparent_25%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.18))]" />
               </div>

               {/* Floating 3D Glowing Cube (Top Right) */}
               <div className="absolute z-1 top-[22%] right-[-10%] sm:top-[3%] sm:right-[-5%] md:top-[5%] md:right-[3%] lg:right-[8%] w-25 sm:w-40 md:w-35 lg:w-97.5 pointer-events-none select-none opacity-90">
                    <img
                         src={diamondImg.src}
                         alt=""
                         aria-hidden="true"
                         className="w-full h-auto drop-shadow-[0_0_55px_rgba(255,212,0,0.38)]"
                    />
               </div>

               {/* Main Card Content */}
               <section className="relative z-10 w-full max-w-190 flex flex-col items-center text-center">

                    {/* Top Pill Tag */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-official/30 bg-[#1f1f1b]/70 backdrop-blur-md px-4 py-1.5 mb-6 md:mb-7 shadow-lg">
                         <span className="w-1.75 h-1.75 rounded-full bg-official shadow-[0_0_10px_rgba(255,212,0,0.9)]" />
                         <span className="text-[8px] sm:text-[9.5px] md:text-[10px] font-bold uppercase tracking-[0.16em] text-official">
                              COHORT ENROLLMENT OPENS SOON • SUMMER 2026
                         </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-playfair font-normal text-[40px] sm:text-[54px] md:text-[64px] lg:text-[74px] leading-[1.05] tracking-tight mb-4 md:mb-5">
                         The Studio is{" "}
                         <span className="italic text-official">
                              Preparing.
                         </span>
                    </h1>

                    {/* Subtitle / Description */}
                    <p className="max-w-135 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.75] text-zinc-400 mb-8 md:mb-10 text-center font-medium">
                         A comprehensive and hands-on residency track is currently under final peer critique, live benchmark stress testing, and prototype iteration.
                    </p>

                    {/* Countdown Timer Block */}
                    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-115 sm:max-w-125 w-full mb-8 md:mb-10">
                         {/* DAYS */}
                         <div className="bg-[#1a1a17] border border-zinc-800/80 rounded-2xl py-4 sm:py-5 px-2 sm:px-3 flex flex-col items-center justify-center shadow-lg shadow-black/40">
                              <span className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-1 tracking-tight">
                                   {String(timeLeft.days).padStart(2, '0')}
                              </span>
                              <span className="font-urbanist text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-zinc-500">
                                   DAYS
                              </span>
                         </div>

                         {/* HOURS */}
                         <div className="bg-[#1a1a17] border border-zinc-800/80 rounded-2xl py-4 sm:py-5 px-2 sm:px-3 flex flex-col items-center justify-center shadow-lg shadow-black/40">
                              <span className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-1 tracking-tight">
                                   {String(timeLeft.hours).padStart(2, '0')}
                              </span>
                              <span className="font-urbanist text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-zinc-500">
                                   HOURS
                              </span>
                         </div>

                         {/* MINS */}
                         <div className="bg-[#1a1a17] border border-zinc-800/80 rounded-2xl py-4 sm:py-5 px-2 sm:px-3 flex flex-col items-center justify-center shadow-lg shadow-black/40">
                              <span className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-1 tracking-tight">
                                   {String(timeLeft.mins).padStart(2, '0')}
                              </span>
                              <span className="font-urbanist text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-zinc-500">
                                   MINS
                              </span>
                         </div>

                         {/* SECS */}
                         <div className="bg-[#1a1a17] border border-zinc-800/80 rounded-2xl py-4 sm:py-5 px-2 sm:px-3 flex flex-col items-center justify-center shadow-lg shadow-black/40">
                              <span className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-1 tracking-tight">
                                   {String(timeLeft.secs).padStart(2, '0')}
                              </span>
                              <span className="font-urbanist text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-zinc-500">
                                   SECS
                              </span>
                         </div>
                    </div>

                    {/* Email Form Container */}
                    <div className="w-full max-w-125 mb-6 sm:mb-7">
                         {submitted ? (
                              <div className="bg-[#1a1a17] border border-official/40 rounded-full py-3.5 px-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-official font-bold shadow-lg">
                                   <FiCheckCircle className="text-base" />
                                   <span>You are on the priority waitlist! We will notify you soon.</span>
                              </div>
                         ) : (
                              <form onSubmit={handleSubmit} className="relative w-full bg-[#141412] border border-zinc-800 rounded-full p-1.5 pl-4 sm:pl-5 flex items-center justify-between gap-2 shadow-xl focus-within:border-official/50 transition-colors">
                                   <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                        <FiMail className="text-zinc-500 text-sm sm:text-base shrink-0" />
                                        <input
                                             type="email"
                                             required
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                             placeholder="Enter your email for private early access..."
                                             className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-zinc-500 font-urbanist font-medium"
                                        />
                                   </div>

                                   <button
                                        type="submit"
                                        className="shrink-0 bg-official hover:bg-[#ffe033] text-[#141412] font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_20px_rgba(255,212,0,0.18)] hover:shadow-[0_6px_25px_rgba(255,212,0,0.28)] cursor-pointer"
                                   >
                                        <span>Join Early Access</span>
                                        <FiArrowRight className="text-sm" />
                                   </button>
                              </form>
                         )}
                    </div>

                    {/* Social Proof & Features Micro Footer */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11.5px] text-zinc-400 font-medium mb-16 md:mb-40">
                         {/* Avatar Circles */}
                         <div className="flex items-center -space-x-1.5 mr-1">
                              <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-amber-800 border border-[#191917] flex items-center justify-center text-[7.5px] sm:text-[8px] font-bold text-amber-200">
                                   JD
                              </div>
                              <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-zinc-700 border border-[#191917] flex items-center justify-center text-[7.5px] sm:text-[8px] font-bold text-zinc-200">
                                   MK
                              </div>
                              <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-official border border-[#191917] flex items-center justify-center text-[7.5px] sm:text-[8px] font-bold text-black">
                                   AL
                              </div>
                         </div>

                         {/* Text 1 */}
                         <span>
                              <strong className="text-white font-bold">1,240+ product designers on the waitlist</strong>
                         </span>

                         {/* Separator */}
                         <span className="text-zinc-600 font-bold">•</span>

                         {/* Text 2 */}
                         <span>Strictly capped cohorts of 18 fellows</span>

                         {/* Separator */}
                         <span className="text-zinc-600 font-bold">•</span>

                         {/* Text 3 */}
                         <span>100% Industry Practicum</span>
                    </div>

               </section>
          </main>
     );
}
