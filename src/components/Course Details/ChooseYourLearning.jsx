"use client";

import React from "react";
import { CreditCard, GraduationCap, Calendar, Check, Percent, Award, ArrowRight } from "lucide-react";

export default function ChooseYourLearning({ data }) {
     const learningData = data?.chooseLearning || {};

     const sectionTitle = learningData.title || "Choose Your Learning";
     const sectionSubtitle = learningData.subtitle || "Explore our flexible execution paths mapped to different career commitments, learning schedules, and experience levels.";

     // Default EMI Option Card Data
     const defaultEmi = {
          title: "EMI OPTION",
          subtitle: "Pay in easy installments",
          bannerTitle: "No Cost EMI Available",
          bannerSubtitle: "Starting from ₹1,667/month across selected banks",
          approvalTitle: "Instant Approval",
          approvalSubtitle: "Zero Preclosure Fees • 100% Digital",
          points: [
               "0% Interest EMI on selected partner banks",
               "Flexible tenure options (3 to 12 months)",
               "Hassle-free documentation & instant processing"
          ]
     };

     // Default Scholarship Card Data
     const defaultScholarship = {
          title: "SCHOLARSHIP",
          subtitle: "Learn more, pay less",
          discountAmount: "30%",
          discountLabel: "GET UP TO",
          discountText: "OFF",
          discountSubtext: "Available on course fees for eligible candidates",
          meritTitle: "Merit Scholarship",
          meritSubtitle: "For Eligible Students & Early Applicants",
          points: [
               "Performance & merit-based fee discounts",
               "Early enrollment benefits & fast-bird waivers",
               "Special offers for college students & freshers"
          ]
     };

     // Default Batches Card Data
     const defaultBatches = {
          title: "COMING BATCHES",
          subtitle: "Join a batch that suits you",
          bannerTitle: "NEW BATCHES OPEN",
          bannerSubtitle: "Upcoming weekday, weekend & fast-track slots",
          featureTitle: "Live & Interactive Sessions",
          featureSubtitle: "Small Batch Sizes • 1-on-1 Mentor Support",
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

     const handleLeadModalOpen = () => {
          if (typeof window !== "undefined") {
               window.dispatchEvent(new CustomEvent("openLeadModal"));
          }
     };

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
                         <p className="font-urbanist text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                              {sectionSubtitle}
                         </p>
                    </div>

                    {/* 3 Cards Grid - Fully Visible Text & Slightly Larger Typography */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                         
                         {/* CARD 1: EMI OPTION */}
                         <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
                              {/* Official Yellow Header Band */}
                              <div className="bg-official p-5 sm:p-6 flex items-center gap-3.5 text-black min-h-23">
                                   <div className="w-10.5 h-10.5 rounded-xl bg-black/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                                        <CreditCard className="w-5.5 h-5.5 text-zinc-900" />
                                   </div>
                                   <div>
                                        <h3 className="font-urbanist font-black text-xl sm:text-2xl tracking-wide uppercase leading-tight text-zinc-900">
                                             {emi.title}
                                        </h3>
                                        <p className="font-urbanist text-xs sm:text-sm font-bold text-zinc-800/90 mt-0.5">
                                             {emi.subtitle}
                                        </p>
                                   </div>
                              </div>

                              {/* Body Content */}
                              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-left" style={{ backgroundColor: "#ffffff" }}>
                                   
                                   {/* Top Hero Highlight Box */}
                                   <div className="rounded-2xl p-4 flex items-center gap-3.5 h-30 transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                             <Percent className="w-4.5 md:w-5.5 h-4.5 md:h-5.5 stroke-3" style={{ color: "#18181b" }} />
                                        </div>
                                        <div className="text-left flex-1">
                                             <h4 className="font-urbanist font-black text-base sm:text-lg leading-tight" style={{ color: "#18181b" }}>
                                                  {emi.bannerTitle}
                                             </h4>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-1 leading-normal" style={{ color: "rgba(24, 24, 27, 0.85)" }}>
                                                  {emi.bannerSubtitle}
                                             </p>
                                        </div>
                                   </div>

                                   {/* Secondary Feature Highlight Box */}
                                   <div className="rounded-2xl p-3.5 flex items-center gap-3 h-30 transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                             <Award className="w-4.5 md:w-5.5 h-4.5 md:h-5.5 stroke-2.5" style={{ color: "#18181b" }} />
                                        </div>
                                        <div className="flex-1">
                                             <h4 className="font-urbanist font-extrabold text-base sm:text-lg leading-tight" style={{ color: "#18181b" }}>
                                                  {emi.approvalTitle || "Instant Approval"}
                                             </h4>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-0.5 leading-normal" style={{ color: "rgba(24, 24, 27, 0.8)" }}>
                                                  {emi.approvalSubtitle || "Zero Preclosure Fees • 100% Digital"}
                                             </p>
                                        </div>
                                   </div>

                                   {/* 3 Checklist Bullet Items */}
                                   <ul className="space-y-3 pt-1 flex-1 flex flex-col justify-center">
                                        {emiPoints.map((point, idx) => (
                                             <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-bold" style={{ color: "#18181b" }}>
                                                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                       <Check className="w-3.5 h-3.5 stroke-3" />
                                                  </span>
                                                  <span className="leading-relaxed flex-1" style={{ color: "#18181b" }}>{point}</span>
                                             </li>
                                        ))}
                                   </ul>

                                   {/* CTA Action Button */}
                                   <button
                                        onClick={handleLeadModalOpen}
                                        className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-urbanist font-extrabold text-xs sm:text-sm rounded-2xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:bg-official group-hover:text-zinc-950 cursor-pointer mt-2"
                                   >
                                        <span>Apply For EMI</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                   </button>
                              </div>
                         </div>

                         {/* CARD 2: SCHOLARSHIP */}
                         <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
                              {/* Official Yellow Header Band */}
                              <div className="bg-official p-5 sm:p-6 flex items-center gap-3.5 text-black min-h-23">
                                   <div className="w-10.5 h-10.5 rounded-xl bg-black/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                                        <GraduationCap className="w-4.5 md:w-5.5 h-4.5 md:h-5.5 text-zinc-900" />
                                   </div>
                                   <div>
                                        <h3 className="font-urbanist font-black text-xl sm:text-2xl tracking-wide uppercase leading-tight text-zinc-900">
                                             {scholarship.title}
                                        </h3>
                                        <p className="font-urbanist text-xs sm:text-sm font-bold text-zinc-800/90 mt-0.5">
                                             {scholarship.subtitle}
                                        </p>
                                   </div>
                              </div>

                              {/* Body Content */}
                              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-left" style={{ backgroundColor: "#ffffff" }}>
                                   
                                   {/* Top Hero Highlight Box */}
                                   <div className="rounded-2xl p-4 flex items-center gap-3.5 h-30 transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                             <GraduationCap className="w-4.5 md:w-5.5 h-4.5 md:h-5.5 stroke-2.5" style={{ color: "#18181b" }} />
                                        </div>
                                        <div className="text-left flex-1">
                                             <h4 className="font-urbanist font-black text-base sm:text-lg leading-tight" style={{ color: "#18181b" }}>
                                                  {scholarship.discountLabel || "GET UP TO"} {scholarship.discountAmount || "30%"} {scholarship.discountText || "OFF"}
                                             </h4>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-1 leading-normal" style={{ color: "rgba(24, 24, 27, 0.85)" }}>
                                                  {scholarship.discountSubtext || "Available on course fees for eligible candidates"}
                                             </p>
                                        </div>
                                   </div>

                                   {/* Secondary Feature Highlight Box */}
                                   <div className="rounded-2xl p-3.5 flex items-center gap-3 h-30 transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                             <Award className="w-4.5 h-4.5 stroke-2.5" style={{ color: "#18181b" }} />
                                        </div>
                                        <div className="flex-1">
                                             <h4 className="font-urbanist font-extrabold text-base sm:text-lg leading-tight" style={{ color: "#18181b" }}>
                                                  {scholarship.meritTitle || "Merit Scholarship"}
                                             </h4>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-0.5 leading-normal" style={{ color: "rgba(24, 24, 27, 0.8)" }}>
                                                  {scholarship.meritSubtitle || "For Eligible Candidates & Early Applicants"}
                                             </p>
                                        </div>
                                   </div>

                                   {/* 3 Checklist Bullet Items */}
                                   <ul className="space-y-3 pt-1 flex-1 flex flex-col justify-center">
                                        {scholarshipPoints.map((point, idx) => (
                                             <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-bold" style={{ color: "#18181b" }}>
                                                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                       <Check className="w-3.5 h-3.5 stroke-3" />
                                                  </span>
                                                  <span className="leading-relaxed flex-1" style={{ color: "#18181b" }}>{point}</span>
                                             </li>
                                        ))}
                                   </ul>

                                   {/* CTA Action Button */}
                                   <button
                                        onClick={handleLeadModalOpen}
                                        className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-urbanist font-extrabold text-xs sm:text-sm rounded-2xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:bg-official group-hover:text-zinc-950 cursor-pointer mt-2"
                                   >
                                        <span>Check Eligibility</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                   </button>
                              </div>
                         </div>

                         {/* CARD 3: COMING BATCHES */}
                         <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
                              {/* Official Yellow Header Band */}
                              <div className="bg-official p-5 sm:p-6 flex items-center gap-3.5 text-black min-h-23">
                                   <div className="w-10.5 h-10.5 rounded-xl bg-black/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                                        <Calendar className="v text-zinc-900" />
                                   </div>
                                   <div>
                                        <h3 className="font-urbanist font-black text-xl sm:text-2xl tracking-wide uppercase leading-tight text-zinc-900">
                                             {batches.title}
                                        </h3>
                                        <p className="font-urbanist text-xs sm:text-sm font-bold text-zinc-800/90 mt-0.5">
                                             {batches.subtitle}
                                        </p>
                                   </div>
                              </div>

                              {/* Body Content: Batches Rows */}
                              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-left" style={{ backgroundColor: "#ffffff" }}>
                                   
                                   {/* Top Hero Highlight Box */}
                                   <div className="rounded-2xl p-4 flex items-center gap-3.5 h-30 transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                             <Calendar className="w-4.5 md:w-5.5 h-4.5 md:h-5.5 stroke-2.5" style={{ color: "#18181b" }} />
                                        </div>
                                        <div className="text-left flex-1">
                                             <h4 className="font-urbanist font-black text-base sm:text-lg leading-tight" style={{ color: "#18181b" }}>
                                                  {batches.bannerTitle || "NEW BATCHES OPEN"}
                                             </h4>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-1 leading-normal" style={{ color: "rgba(24, 24, 27, 0.85)" }}>
                                                  {batches.bannerSubtitle || "Upcoming weekday, weekend & fast-track slots"}
                                             </p>
                                        </div>
                                   </div>

                                   {/* Secondary Feature Highlight Box */}
                                   <div className="rounded-2xl p-3.5 flex items-center gap-3 h-30 transition-colors" style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}>
                                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                             <Award className="w-4.5 h-4.5 stroke-2.5" style={{ color: "#18181b" }} />
                                        </div>
                                        <div className="flex-1">
                                             <h4 className="font-urbanist font-extrabold text-base sm:text-lg leading-tight" style={{ color: "#18181b" }}>
                                                  {batches.featureTitle || "Live & Interactive Sessions"}
                                             </h4>
                                             <p className="font-urbanist text-xs sm:text-sm font-semibold mt-0.5 leading-normal" style={{ color: "rgba(24, 24, 27, 0.8)" }}>
                                                  {batches.featureSubtitle || "Small Batch Sizes • 1-on-1 Mentor Support"}
                                             </p>
                                        </div>
                                   </div>

                                   {/* 3 Batch Items List */}
                                   <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                                        {batchItems.map((batch, idx) => (
                                             <div
                                                  key={idx}
                                                  className="rounded-2xl p-3 flex items-center justify-between gap-3 transition-colors"
                                                  style={{ backgroundColor: "#FFFCEE", border: "1px solid #FFD400" }}
                                             >
                                                  {/* Date Pill */}
                                                  <div className="rounded-xl px-2.5 py-1 text-center shrink-0 min-w-12" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                       <span className="block font-urbanist font-black text-xs sm:text-sm leading-none" style={{ color: "#18181b" }}>
                                                            {batch.dayDate || `0${idx + 1}`}
                                                       </span>
                                                       <span className="block font-urbanist font-bold text-[6px] md:text-[8px] uppercase tracking-wider mt-0.5 leading-none" style={{ color: "#18181b" }}>
                                                            {batch.month || "JUN"}
                                                       </span>
                                                  </div>

                                                  {/* Batch Info */}
                                                  <div className="flex-1 min-w-0">
                                                       <h4 className="font-urbanist font-extrabold text-xs sm:text-sm leading-tight" style={{ color: "#18181b" }}>
                                                            {batch.title}
                                                       </h4>
                                                       <p className="font-urbanist text-xs sm:text-sm font-semibold mt-0.5 leading-normal" style={{ color: "rgba(24, 24, 27, 0.75)" }}>
                                                            {batch.time}
                                                       </p>
                                                  </div>

                                                  {/* Status Badge Pill */}
                                                  <span className="text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0" style={{ backgroundColor: "#FFD400", color: "#18181b" }}>
                                                       {batch.status || "Upcoming"}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>

                                   {/* CTA Action Button */}
                                   <button
                                        onClick={handleLeadModalOpen}
                                        className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-urbanist font-extrabold text-xs sm:text-sm rounded-2xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:bg-official group-hover:text-zinc-950 cursor-pointer mt-2"
                                   >
                                        <span>Reserve Your Seat</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                   </button>
                              </div>
                         </div>

                    </div>

               </div>
          </section>
     );
}
