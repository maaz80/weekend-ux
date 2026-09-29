"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, GraduationCap, Lightbulb, BookOpen, FileCheck } from "lucide-react";

export default function ReadyToStartJourney({ data }) {
     const ctaData = data?.readyToStartJourney || {};

     const title = ctaData.title || "Ready to start your journey?";
     const subtitle = ctaData.subtitle || "Embark on your path to success with expert training and a world of opportunities awaiting you.";
     const button1Text = ctaData.button1Text || "Contact us";
     const button1Link = ctaData.button1Link || "/contact-us";
     const button2Text = ctaData.button2Text || "Get A Free Demo";
     const button2Link = ctaData.button2Link || "/contact-us#demo";

     const handleDemoClick = (e) => {
          if (!button2Link || button2Link.includes("#demo")) {
               const demoElement = document.getElementById("demo-class") || document.getElementById("enroll-form");
               if (demoElement) {
                    e.preventDefault();
                    demoElement.scrollIntoView({ behavior: "smooth" });
               }
          }
     };

     return (
          <section
               data-navbar-light="true"
               className="w-full py-10 sm:py-18 md:py-20 font-urbanist relative z-1 overflow-hidden"
               style={{ backgroundColor: "#18181b", color: "#ffffff" }}
          >
               {/* Decorative Ambient Radial Yellow Glows */}
               <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255, 212, 0, 0.12)" }} />
               <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255, 212, 0, 0.15)" }} />


               {/* Center Content Box */}
               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto relative z-10 text-left md:text-center space-y-4">
                    
                    {/* Main Heading */}
                    <h2
                         className="font-playfair h2-section-title text-white"
                    >
                         {title.includes("journey?") ? (
                              <>
                                   Ready to start your <span style={{ color: "#FFD400" }}>journey?</span>
                              </>
                         ) : (
                              title
                         )}
                    </h2>

                    {/* Subtitle */}
                    <p
                         className="para" style={{ color: '#ffffff' }}
                    >
                         {subtitle}
                    </p>

                    {/* Buttons CTA Container */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                         
                         {/* Button 1: Contact Us (Official Brand Yellow Button) */}
                         <Link
                              href={button1Link}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-urbanist font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer min-w-42.5"
                              style={{ backgroundColor: "#FFD400", color: "#18181b" }}
                         >
                              <UserCheck className="w-4.5 h-4.5 stroke-[2.5]" style={{ color: "#18181b" }} />
                              <span>{button1Text}</span>
                         </Link>

                         {/* Button 2: Get A Free Demo (Outlined White/Yellow Button) */}
                         <Link
                              href={button2Link}
                              onClick={handleDemoClick}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-urbanist font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer min-w-42.5"
                              style={{ backgroundColor: "transparent", color: "#ffffff", border: "2px solid #FFD400" }}
                         >
                              <span>{button2Text}</span>
                         </Link>

                    </div>

               </div>
          </section>
     );
}
