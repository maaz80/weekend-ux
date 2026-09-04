"use client";

import React from "react";
import { GraduationCap, BadgeDollarSign, UserCog, Zap, Layers, CalendarCheck, Award, ShieldCheck, HeartHandshake } from "lucide-react";

const ICON_MAP = {
     graduationCap: GraduationCap,
     badgeDollarSign: BadgeDollarSign,
     userCog: UserCog,
     zap: Zap,
     layers: Layers,
     calendarCheck: CalendarCheck,
     award: Award,
     shieldCheck: ShieldCheck,
     heartHandshake: HeartHandshake
};

export default function WhyChooseUs({ data }) {
     const whyData = data?.whyChooseUs || {};

     const sectionTitle = whyData.title || "Why Choose Us?";
     const sectionSubtitle = whyData.subtitle || "Real stories from learners who achieved career growth with our SAP courses.";

     // Default 6 Cards matching image-11.png
     const defaultCards = [
          {
               iconName: "graduationCap",
               title: "Qualified Candidates Pool",
               description: "Access a diverse range of ready-to-hire professionals"
          },
          {
               iconName: "badgeDollarSign",
               title: "No Cost Hiring",
               description: "Completely free recruitment"
          },
          {
               iconName: "userCog",
               title: "Dedicated Manager",
               description: "Receive personalized support throughout the hiring process"
          },
          {
               iconName: "zap",
               title: "Faster Hiring",
               description: "Reduce hiring time significantly"
          },
          {
               iconName: "layers",
               title: "Expertise in 150+ Technologies",
               description: "From Data Science to Cyber Security, find experts in any field."
          },
          {
               iconName: "calendarCheck",
               title: "Year-Round Hiring",
               description: "Flexible hiring options available anytime."
          }
     ];

     const items = (Array.isArray(whyData.items) && whyData.items.length > 0)
          ? whyData.items
          : defaultCards;

     const renderIcon = (iconName, idx) => {
          const IconComponent = ICON_MAP[iconName] || (idx % 3 === 0 ? GraduationCap : idx % 3 === 1 ? BadgeDollarSign : UserCog);
          return <IconComponent className="w-6 h-6 stroke-[2.2]" style={{ color: "#18181b" }} />;
     };

     return (
          <section
               className="w-full py-14 sm:py-18 md:py-24 font-urbanist relative z-1 overflow-hidden"
               style={{ backgroundColor: "#FFD400", color: "#18181b" }}
          >
               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto relative z-10">
                    
                    {/* Header Section */}
                    <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 md:mb-16">
                         <span
                              className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-1"
                              style={{ backgroundColor: "rgba(24, 24, 27, 0.08)", color: "#18181b", border: "1px solid rgba(24, 24, 27, 0.12)" }}
                         >
                              WHY CHOOSE US
                         </span>
                         <h2 className="font-urbanist text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ color: "#18181b" }}>
                              {sectionTitle}
                         </h2>
                         <p className="font-urbanist text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(24, 24, 27, 0.8)" }}>
                              {sectionSubtitle}
                         </p>
                    </div>

                    {/* 6 Cards Grid (3 columns on desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                         {items.map((card, idx) => (
                              <div
                                   key={idx}
                                   className="group rounded-3xl p-6 sm:p-8 flex flex-col justify-start text-left shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border hover:border-[#18181b]"
                                   style={{ backgroundColor: "#ffffff", color: "#18181b", borderColor: "rgba(24, 24, 27, 0.1)" }}
                              >
                                   {/* Icon Container */}
                                   <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105"
                                        style={{ backgroundColor: "#FFD400", color: "#18181b", border: "1px solid rgba(24, 24, 27, 0.1)" }}
                                   >
                                        {renderIcon(card.iconName, idx)}
                                   </div>

                                   {/* Card Title */}
                                   <h3 className="font-urbanist font-extrabold text-lg sm:text-xl mt-5 mb-1.5 leading-snug" style={{ color: "#18181b" }}>
                                        {card.title}
                                   </h3>

                                   {/* Underline Accent */}
                                   <div
                                        className="w-8 h-1 my-2 rounded-full transition-all duration-300 group-hover:w-12"
                                        style={{ backgroundColor: "#FFD400" }}
                                   />

                                   {/* Card Description */}
                                   <p className="font-urbanist text-xs sm:text-sm font-semibold leading-relaxed" style={{ color: "rgba(24, 24, 27, 0.7)" }}>
                                        {card.description}
                                   </p>
                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}
