import React from "react";
import Link from "next/link";

export const metadata = {
     title: "Page Not Found - Weekend UX",
     description: "The page you are looking for does not exist.",
};

export default function NotFound() {
     return (
          <main
               id="not-found-hero"
               data-navbar-light="true"
               className="relative min-h-[120vh] overflow-hidden bg-[#191917] bg-cover bg-center text-white flex items-center justify-center py-40 font-urbanist"
               style={{
                    backgroundImage:
                         "linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.42)), url('/images/weekend-ux-error-bg.webp')",
               }}
          >

               {/* Main Content */}
               <section className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start text-left">

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