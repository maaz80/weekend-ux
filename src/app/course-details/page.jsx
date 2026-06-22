"use client";

import Image from "next/image";
import Details from "@/components/Course Details/Details";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";

export default function CoursesPage() {
     return (
          <div className="min-h-screen bg-black text-white font-urbanist flex flex-col">

               {/* Hero Header Section */}
               <section className="relative h-62.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 overflow-hidden">
                    <Image
                         src="/images/weekend-ux-course-details-hero-bg.webp"
                         alt="weekend-ux-course-details-hero-bg"
                         fill
                         priority
                         className="object-cover object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">Advance Certificate in AI for UI UX</h1>
               </section>
               <Details/>
               <RelatedBlogs/>
               <FAQ/>
          </div>
     );
}