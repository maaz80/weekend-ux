"use client";

import React from "react";
import { TrendingUp, Clock, RefreshCw, ShieldCheck, Coins, BarChart3 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CourseBenefitCard from "./CourseBenefitCard";

export default function CourseBenefits({ data }) {
     const courseName = data?.title || "UI/UX Design";
     
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
               Benefits of <span className="text-[#f36600] font-semibold italic">{title.substring(12)}</span>
          </>
     ) : title;

     return (
          <section className="button-neutral w-full bg-[#F8F6EE] py-10 sm:py-18 md:py-24 font-urbanist border-b border-zinc-200/80 relative z-1">
               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto">
                    
                    {/* Header Section */}
                    <SectionHeading
                         className="mb-5 md:mb-16"
                         heading={displayTitle}
                         description={subtitle}
                    />

                    {/* 6 Cards Grid (3 cols x 2 rows) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                         {cardsList.map((item, idx) => {
                              const Icon = item.icon || TrendingUp;

                              return (
                                   <CourseBenefitCard
                                        key={idx}
                                        icon={Icon}
                                        title={item.title}
                                        description={item.description}
                                   />
                              );
                         })}
                    </div>

               </div>
          </section>
     );
}
