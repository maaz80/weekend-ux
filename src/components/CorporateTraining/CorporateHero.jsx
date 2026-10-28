"use client";

import React from "react";
import Link from "next/link";

const defaultHero = {
  eyebrow: "Corporate Training",
  heading: "Upskill Your Workforce,\nAccelerate AI & Digital Readiness",
  buttonText: "Start Your Journey",
  buttonLink: "/contact-us",
  backgroundImage: "/images/weekend-ux-corporate-training-hero-bg.webp",
};

export default function CorporateHero({ data }) {
  const hero = { ...defaultHero, ...data };

  return (
    <section
      data-navbar-light="true"
      className="relative overflow-hidden bg-cover bg-center text-white pt-42 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 px-4 md:px-6"
      style={{
        backgroundImage: `url('${hero.backgroundImage}')`,
      }}
    >
      <div className="mx-auto max-w-305 text-left flex flex-col items-start relative z-10">
        {/* Top Tagline */}
        <p className="font-inter text-xs sm:text-sm font-semibold uppercase tracking-[0.45em] text-[#ffd000] mb-4">
          {hero.eyebrow}
        </p>

        {/* Main Heading */}
        <h1 className="whitespace-pre-line font-playfair text-[32px] sm:text-[46px] md:text-[56px] lg:text-[62px] leading-[1.12] text-white tracking-tight">
          {hero.heading}
        </h1>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-7">
          <Link
            href={hero.buttonLink || "/contact-us"}
            className="inline-flex items-center justify-center h-12 sm:h-13 px-8 sm:px-10 rounded-lg bg-[#ffd000] text-[#161616] font-urbanist font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#ffc000] hover:scale-105 shadow-[0_8px_25px_rgba(255,208,0,0.35)]"
          >
            {hero.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
