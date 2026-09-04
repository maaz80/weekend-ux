"use client";

import React from "react";
import { CreditCard, GraduationCap, Calendar, Check, Percent, Award } from "lucide-react";

export default function ChooseYourLearning({ data }) {
     const learningData = data?.chooseLearning || {};

     const sectionTitle = learningData.title || "Choose Your Learning";
     const sectionSubtitle = learningData.subtitle || "Explore our flexible execution paths mapped to different career commitments, learning schedules, and experience levels.";

     // Default EMI Option Card Data
     const defaultEmi = {
          title: "EMI OPTION",
          subtitle: "Pay in easy installments",
          bannerTitle: "No Cost EMI available",
          bannerSubtitle: "Starting from ₹1,667/month",
          points: [
               "0% Interest EMI on selected banks",
               "Flexible tenure options",
               "Hassle-free documentation"
          ]
     };

     // Default Scholarship Card Data
     const defaultScholarship = {
          title: "SCHOLARSHIP",
          subtitle: "Learn more, pay less",
          discountAmount: "30%",
          discountLabel: "GET UP TO",
          discountText: "OFF",
          discountSubtext: "on course fees",
          meritTitle: "Merit Scholarship",
          meritSubtitle: "For eligible candidates",
          points: [
               "Performance Based Discounts",
               "Early Enrollment Benefits",
               "Special Offers for Students"
          ]
     };

     // Default Batches Card Data
     const defaultBatches = {
          title: "COMING BATCHES",
          subtitle: "Join a batch that suits you",
          items: [
               {
                    dayDate: "01",
                    month: "JUN",
                    title: "Weekend Batch",
                    time: "Sat - Sun • 10:00 AM - 01:00 PM",
                    status: "Upcoming"
               },
               {
                    dayDate: "08",
                    month: "JUN",
                    title: "Weekday Batch",
                    time: "Mon - Fri • 07:00 PM - 09:00 PM",
                    status: "Upcoming"
               },
               {
                    dayDate: "15",
                    month: "JUN",
                    title: "Fast Track Batch",
                    time: "Mon - Fri • 10:00 AM - 01:00 PM",
                    status: "Upcoming"
               }
          ]
     };

     const emi = { ...defaultEmi, ...(learningData.emi || {}) };
     const scholarship = { ...defaultScholarship, ...(learningData.scholarship || {}) };
     const batches = { ...defaultBatches, ...(learningData.batches || {}) };

     const emiPoints = (Array.isArray(emi.points) && emi.points.length > 0) ? emi.points : defaultEmi.points;
     const scholarshipPoints = (Array.isArray(scholarship.points) && scholarship.points.length > 0) ? scholarship.points : defaultScholarship.points;
     const batchItems = (Array.isArray(batches.items) && batches.items.length > 0) ? batches.items : defaultBatches.items;

     return (
          <section
               className="w-full py-14 sm:py-18 md:py-24 font-urbanist relative z-1 overflow-hidden"
               style={{ backgroundColor: "#18181b", color: "#ffffff" }}
          >
               {/* Background Decorative Yellow Glows */}
               <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255, 212, 0, 0.12)" }} />
               <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255, 212, 0, 0.15)" }} />

               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto relative z-10">
                    
                    {/* Header Section */}
                    <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 md:mb-16">
                         <span
                              className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-xs mb-1"
                              style={{ backgroundColor: "rgba(255, 212, 0, 0.15)", color: "#FFD400", border: "1px solid rgba(255, 212, 0, 0.3)" }}
                         >
                              FLEXIBLE PATHWAYS
                         </span>
                         <h2 className="font-urbanist text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: "#ffffff" }}>
                              {sectionTitle}
                         </h2>
                         <p className="font-urbanist text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                              {sectionSubtitle}
                         </p>
                    </div>

                    {/* 3 Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                         
                         {/* CARD 1: EMI OPTION */}
                         <div
                              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-official"
                              style={{ backgroundColor: "#ffffff", color: "#18181b", borderColor: "transparent" }}
                         >
                              <div>
                                   {/* Dark Header Band with Official Yellow Accent */}
                                   <div
                                        className="p-6 flex items-center gap-4 transition-colors"
                                        style={{ backgroundColor: "#18181b", color: "#ffffff", borderBottom: "2px solid #FFD400" }}
                                   >
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105" style={{ backgroundColor: "rgba(255, 212, 0, 0.15)", border: "1px solid rgba(255, 212, 0, 0.3)" }}>
                                             <CreditCard className="w-6 h-6" style={{ color: "#FFD400" }} />
                                        </div>
                                        <div>
                                             <h3 className="font-urbanist font-extrabold text-lg sm:text-xl tracking-wide uppercase leading-tight" style={{ color: "#ffffff" }}>
                                                  {emi.title}
                                             </h3>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-0.5" style={{ color: "#FFD400" }}>
                                                  {emi.subtitle}
                                             </p>
                                        </div>
                                   </div>

                                   {/* Body Content */}
                                   <div className="p-6 sm:p-7 space-y-6" style={{ backgroundColor: "#ffffff" }}>
                                        
                                        {/* No Cost EMI Banner Box */}
                                        <div className="rounded-2xl p-4 sm:p-5 flex items-center gap-4 transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                             <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                  <Percent className="w-5 h-5" style={{ color: "#18181b" }} />
                                             </div>
                                             <div className="text-left">
                                                  <h4 className="font-urbanist font-extrabold text-sm sm:text-base leading-tight" style={{ color: "#18181b" }}>
                                                       {emi.bannerTitle}
                                                  </h4>
                                                  <p className="font-urbanist text-xs sm:text-sm font-bold mt-0.5" style={{ color: "#18181b" }}>
                                                       {emi.bannerSubtitle}
                                                  </p>
                                             </div>
                                        </div>

                                        {/* Bullet points checklist */}
                                        <ul className="space-y-3.5 text-left pt-1">
                                             {emiPoints.map((point, idx) => (
                                                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-bold" style={{ color: "#18181b" }}>
                                                       <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                            <Check className="w-3.5 h-3.5 stroke-3" />
                                                       </span>
                                                       <span className="leading-snug" style={{ color: "#18181b" }}>{point}</span>
                                                  </li>
                                             ))}
                                        </ul>

                                   </div>
                              </div>
                         </div>

                         {/* CARD 2: SCHOLARSHIP */}
                         <div
                              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-official"
                              style={{ backgroundColor: "#ffffff", color: "#18181b", borderColor: "transparent" }}
                         >
                              <div>
                                   {/* Dark Header Band */}
                                   <div
                                        className="p-6 flex items-center gap-4 transition-colors"
                                        style={{ backgroundColor: "#18181b", color: "#ffffff", borderBottom: "2px solid #FFD400" }}
                                   >
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105" style={{ backgroundColor: "rgba(255, 212, 0, 0.15)", border: "1px solid rgba(255, 212, 0, 0.3)" }}>
                                             <GraduationCap className="w-6 h-6" style={{ color: "#FFD400" }} />
                                        </div>
                                        <div>
                                             <h3 className="font-urbanist font-extrabold text-lg sm:text-xl tracking-wide uppercase leading-tight" style={{ color: "#ffffff" }}>
                                                  {scholarship.title}
                                             </h3>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-0.5" style={{ color: "#FFD400" }}>
                                                  {scholarship.subtitle}
                                             </p>
                                        </div>
                                   </div>

                                   {/* Body Content */}
                                   <div className="p-6 sm:p-7 space-y-6" style={{ backgroundColor: "#ffffff" }}>
                                        
                                        {/* Big Hero Discount Box */}
                                        <div className="text-center space-y-0.5 py-1">
                                             <p className="text-[11px] font-extrabold tracking-widest uppercase" style={{ color: "rgba(24, 24, 27, 0.6)" }}>
                                                  {scholarship.discountLabel || "GET UP TO"}
                                             </p>
                                             <div className="flex items-baseline justify-center gap-1">
                                                  <span className="font-urbanist font-black text-4xl sm:text-5xl tracking-tight" style={{ color: "#18181b" }}>
                                                       {scholarship.discountAmount || "30%"}
                                                  </span>
                                                  <span className="font-urbanist font-extrabold text-xl sm:text-2xl" style={{ color: "#18181b" }}>
                                                       {scholarship.discountText || "OFF"}
                                                  </span>
                                             </div>
                                             <p className="text-xs font-bold" style={{ color: "rgba(24, 24, 27, 0.6)" }}>
                                                  {scholarship.discountSubtext || "on course fees"}
                                             </p>
                                        </div>

                                        {/* Merit Scholarship Pill Box */}
                                        <div className="rounded-2xl p-4 flex items-center gap-3.5 text-left transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                             <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                  <Award className="w-5 h-5" style={{ color: "#18181b" }} />
                                             </div>
                                             <div>
                                                  <h4 className="font-urbanist font-extrabold text-sm sm:text-base leading-tight" style={{ color: "#18181b" }}>
                                                       {scholarship.meritTitle}
                                                  </h4>
                                                  <p className="font-urbanist text-xs font-bold mt-0.5" style={{ color: "#18181b" }}>
                                                       {scholarship.meritSubtitle}
                                                  </p>
                                             </div>
                                        </div>

                                        {/* Bullet points checklist */}
                                        <ul className="space-y-3.5 text-left pt-1">
                                             {scholarshipPoints.map((point, idx) => (
                                                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-bold" style={{ color: "#18181b" }}>
                                                       <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                            <Check className="w-3.5 h-3.5 stroke-3" />
                                                       </span>
                                                       <span className="leading-snug" style={{ color: "#18181b" }}>{point}</span>
                                                  </li>
                                             ))}
                                        </ul>

                                   </div>
                              </div>
                         </div>

                         {/* CARD 3: COMING BATCHES */}
                         <div
                              className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-official"
                              style={{ backgroundColor: "#ffffff", color: "#18181b", borderColor: "transparent" }}
                         >
                              <div>
                                   {/* Dark Header Band */}
                                   <div
                                        className="p-6 flex items-center gap-4 transition-colors"
                                        style={{ backgroundColor: "#18181b", color: "#ffffff", borderBottom: "2px solid #FFD400" }}
                                   >
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105" style={{ backgroundColor: "rgba(255, 212, 0, 0.15)", border: "1px solid rgba(255, 212, 0, 0.3)" }}>
                                             <Calendar className="w-6 h-6" style={{ color: "#FFD400" }} />
                                        </div>
                                        <div>
                                             <h3 className="font-urbanist font-extrabold text-lg sm:text-xl tracking-wide uppercase leading-tight" style={{ color: "#ffffff" }}>
                                                  {batches.title}
                                             </h3>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-0.5" style={{ color: "#FFD400" }}>
                                                  {batches.subtitle}
                                             </p>
                                        </div>
                                   </div>

                                   {/* Body Content: Batches Rows */}
                                   <div className="p-6 sm:p-7 space-y-3.5 text-left" style={{ backgroundColor: "#ffffff" }}>
                                        {batchItems.map((batch, idx) => (
                                             <div
                                                  key={idx}
                                                  className="rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors"
                                                  style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}
                                             >
                                                  {/* Date Pill */}
                                                  <div className="rounded-xl px-2.5 py-1.5 text-center shrink-0 min-w-12" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                       <span className="block font-urbanist font-black text-sm leading-none" style={{ color: "#18181b" }}>
                                                            {batch.dayDate || `0${idx + 1}`}
                                                       </span>
                                                       <span className="block font-urbanist font-bold text-[9px] uppercase tracking-wider mt-0.5 leading-none" style={{ color: "#18181b" }}>
                                                            {batch.month || "JUN"}
                                                       </span>
                                                  </div>

                                                  {/* Batch Info */}
                                                  <div className="flex-1 min-w-0">
                                                       <h4 className="font-urbanist font-extrabold text-xs sm:text-sm truncate leading-tight" style={{ color: "#18181b" }}>
                                                            {batch.title}
                                                       </h4>
                                                       <p className="font-urbanist text-[11px] sm:text-xs font-bold truncate mt-0.5" style={{ color: "rgba(24, 24, 27, 0.7)" }}>
                                                            {batch.time}
                                                       </p>
                                                  </div>

                                                  {/* Status Badge Pill */}
                                                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                       {batch.status || "Upcoming"}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>

                    </div>

               </div>
          </section>
     );
}
