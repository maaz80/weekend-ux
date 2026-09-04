"use client";

import React from "react";
import { TrendingUp, Clock, RefreshCw, ShieldCheck, Coins, BarChart3 } from "lucide-react";

export default function CourseBenefits({ data }) {
     const courseName = data?.title || "UI/UX Design";
     
     const tag = data?.benefitsTag || `WHY ${courseName.toUpperCase()}?`;
     const title = data?.benefitsTitle || `Benefits of ${courseName}`;
     const subtitle = data?.benefitsSubtitle || `${courseName} helps learners and businesses streamline workflows, improve efficiency, and drive smarter decisions.`;

     const defaultCards = [
          {
               icon: TrendingUp,
               title: "Improved Accuracy & Quality",
               description: "Automates processes and reduces manual errors, ensuring accurate and reliable results.",
               featured: false
          },
          {
               icon: Clock,
               title: "Real-Time Visibility",
               description: "Get real-time insights into your data to make faster and more informed decisions.",
               featured: false
          },
          {
               icon: RefreshCw,
               title: "Streamlined Processes",
               description: "Integrates core workflows, improving efficiency and reducing operational complexity.",
               featured: false
          },
          {
               icon: ShieldCheck,
               title: "Better Compliance & Risk",
               description: "Ensures compliance with industry standards and internal policies, mitigating operational risks.",
               featured: false
          },
          {
               icon: Coins,
               title: "Cost & Resource Optimization",
               description: "Helps identify cost-saving opportunities and optimizes resource allocation across projects.",
               featured: true // Highlighted featured card like in screenshot
          },
          {
               icon: BarChart3,
               title: "Scalability & Growth",
               description: "Supports long-term growth with scalable solutions that adapt to evolving organizational needs.",
               featured: false
          }
     ];

     const cardsList = (Array.isArray(data?.benefitsCards) && data.benefitsCards.length > 0)
          ? data.benefitsCards
          : defaultCards;

     const hasKeyword = title.toLowerCase().startsWith("benefits of");
     const displayTitle = hasKeyword ? (
          <>
               Benefits of <span className="text-official">{title.substring(12)}</span>
          </>
     ) : title;

     return (
          <section className="w-full bg-[#F8F6EE] py-14 sm:py-18 md:py-24 font-urbanist border-b border-zinc-200/80 relative z-1">
               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto">
                    
                    {/* Header Section */}
                    <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 md:mb-16">
                         
                         {/* Badge Tag */}
                         <div>
                              <span className="inline-block bg-amber-500/10 text-amber-800 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider border border-amber-500/20 shadow-2xs font-urbanist">
                                   {tag}
                              </span>
                         </div>

                         {/* Main Heading */}
                         <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
                              {displayTitle}
                         </h2>

                         {/* Subtitle */}
                         <p className="font-urbanist text-sm sm:text-base font-medium text-zinc-600 leading-relaxed">
                              {subtitle}
                         </p>

                    </div>

                    {/* 6 Cards Grid (3 cols x 2 rows) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                         {cardsList.map((item, idx) => {
                              const Icon = item.icon || TrendingUp;

                              return (
                                   <div
                                        key={idx}
                                        className="group rounded-3xl p-7 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 border bg-white text-zinc-900 border-zinc-200/90 hover:bg-official hover:text-zinc-950 hover:border-amber-400"
                                   >
                                        <div>
                                             {/* Icon Container */}
                                             <div
                                                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-all duration-300 border bg-amber-500/10 border-amber-500/20 text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-900 shadow-2xs group-hover:shadow-inner"
                                             >
                                                  <Icon size={24} className="shrink-0" />
                                             </div>

                                             {/* Card Title */}
                                             <h3
                                                  className="font-urbanist font-extrabold text-lg sm:text-xl leading-snug mb-2 text-zinc-900 group-hover:text-zinc-950 transition-colors"
                                             >
                                                  {item.title}
                                             </h3>

                                             {/* Underline Accent */}
                                             <div
                                                  className="w-8 h-0.5 rounded-full mb-3.5 transition-all duration-300 group-hover:w-12 bg-official group-hover:bg-zinc-950"
                                             />

                                             {/* Card Description */}
                                             <p
                                                  className="font-urbanist text-xs sm:text-sm font-medium leading-relaxed text-zinc-500 group-hover:text-zinc-900/90 transition-colors"
                                             >
                                                  {item.description}
                                             </p>
                                        </div>

                                   </div>
                              );
                         })}
                    </div>

               </div>
          </section>
     );
}
