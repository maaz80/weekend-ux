"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";

export default function CourseHero({ data, heroTitle }) {
  const overviewText =
    data?.overview ||
    data?.seodescription ||
    "Master industry-standard design tools, user research, wireframing, prototyping, and AI workflows with hands-on live project training.";

  const category = data?.category || "Design & Tech Track";
  const duration = data?.courselength || "12 Weeks";

  const titleText = heroTitle || data?.title || "Advance Certificate in AI for UI UX";

  const handleEnquireClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openLeadModal"));
    }
  };

  return (
    <section
      className="relative min-h-[80vh] md:min-h-165 lg:min-h-230 xl:min-h-245 w-full flex flex-col items-center justify-center bg-zinc-950 overflow-hidden pt-36 sm:pt-40 md:pt-48 lg:pt-52 pb-16 md:pb-24 lg:pb-32"
      style={{ minHeight: '85vh', paddingTop: '180px', paddingBottom: '80px' }}
      data-navbar-light="true"
      id="course-details-hero"
    >
      {/* Background Hero Image */}
      <Image
        src="/images/weekend-ux-course-details-hero-bg.webp"
        alt="weekend-ux-course-details-hero-bg"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover object-center opacity-40 z-0"
      />

      {/* Dark Overlay Gradients for Legibility */}
      <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/85 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-zinc-950/50 z-10 pointer-events-none" />

      {/* Hero Content Wrapper */}
      <div className="custom-width px-4 sm:px-0 md:px-0 lg:px-0 mx-auto w-full relative z-20">
        <div className="max-w-7xl space-y-4 md:space-y-6 text-left">
          
          {/* Top Category / Pill Badges */}
          {/* <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-md">
              <Sparkles size={14} className="text-amber-400" />
              {category}
            </span>

            {duration && (
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-zinc-300 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                <Clock size={14} className="text-zinc-400" />
                {duration}
              </span>
            )}
          </div> */}

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight md:leading-tight lg:leading-tight font-playfair tracking-tight">
            {titleText}
          </h1>

          {/* Overview / Summary */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-200/90 font-medium leading-relaxed font-urbanist max-w-2xl">
            {overviewText.replace(/<[^>]*>?/gm, "")}
          </p>

          {/* Hero Action Buttons */}
          <div className="pt-2 md:pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Link
              href="/contact-us"
              className="h-12 px-8 bg-official text-neutral hover:bg-official/80 font-bold text-sm rounded-lg inline-flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 gap-2"
            >
              <span>Enquire Now</span>
            </Link>

            {/* <a
              href="#curriculum"
              className="px-6 py-3.5 sm:px-7 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm md:text-base transition-all duration-300 border border-white/20 backdrop-blur-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <BookOpen size={18} />
              <span>Explore Curriculum</span>
            </a> */}
          </div>

        </div>
      </div>
    </section>
  );
}
