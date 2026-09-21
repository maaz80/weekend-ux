import React from "react";
import Link from "next/link";
import diamondImg from "@/app/assets/weekend-ux-hero-decorative-diamond.webp";

export const metadata = {
     title: "Page Not Found - Weekend UX",
     description: "The page you are looking for does not exist.",
};

export default function NotFound() {
     return (
          <main id="not-found-hero" data-navbar-light="true" className="relative min-h-screen overflow-hidden bg-[#191917] text-white flex items-center justify-center px-5 py-40 font-urbanist">

               {/* Background Golden / Olive Glow */}
               <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(100,90,25,0.28),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,rgba(255,212,0,0.10),transparent_25%)]" />
                    <div className="absolute inset-0 bg-linear-to-t from-official/30 to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.18))]" />
               </div>

               {/* Decorative Cube */}
               <div className="absolute z-1 top-[13%] right-[-12%] w-5 sm:w-20 md:w-37.5 lg:w-47.5 xl:right-[7%] xl:top-[5%] pointer-events-none select-none opacity-90">
                    <img
                         src={diamondImg.src}
                         alt="Decorative diamond cube"
                         aria-hidden="true"
                         className="w-full h-auto drop-shadow-[0_0_55px_rgba(255,212,0,0.35)]"
                    />
               </div>

               {/* Huge Background 404 */}
               <div className="absolute z-0 left-1/2 top-[40%] md:top-[27%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-playfair font-bold text-[45vw] md:text-[500px] lg:text-[560px] leading-none text-white/2.5 whitespace-nowrap">
                    404
               </div>

               {/* Main Content */}
               <section className="relative z-10 w-full max-w-180 flex flex-col items-center text-center">

                    {/* Error Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-official/30 bg-[#1f1f1b]/60 backdrop-blur-md px-4 py-1.5 mb-6 md:mb-7">
                         <span className="w-1.75 h-1.75 rounded-full bg-official shadow-[0_0_10px_rgba(255,212,0,0.9)]" />

                         <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.16em] text-official">
                              ERROR 404 • UNRESOLVED WORKSHOP INDEX
                         </span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-playfair font-normal text-[42px] sm:text-[52px] md:text-[62px] lg:text-[72px] leading-[1.05] tracking-tight mb-5 md:mb-6">
                         Lost in The{" "}
                         <span className="italic text-official">
                              Archive.
                         </span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-130 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.7] text-zinc-400 mb-8 md:mb-10">
                         The studio syllabus or workshop module you're seeking does not
                         exist or has been relocated to our drafting labs. Let's guide
                         you back to active cohorts.
                    </p>

                    {/* Button */}
                    <Link
                         href="/courses"
                         className="inline-flex items-center justify-center rounded-lg bg-official px-7 py-3.5 md:px-8 md:py-4 text-[13px] md:text-sm font-bold text-[#171717] shadow-[0_8px_30px_rgba(255,212,0,0.12)] transition-all duration-300 hover:bg-[#ffe033] hover:shadow-[0_10px_35px_rgba(255,212,0,0.22)] hover:-translate-y-0.5 mb-16 md:mb-40"
                    >
                         Back to Active Courses
                    </Link>

               </section>
          </main>
     );
}