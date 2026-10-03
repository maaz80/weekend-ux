"use client";

import React from "react";
import { Briefcase, BarChart3, Clock, UserCheck, Layers, Award, Target, Sparkles } from "lucide-react";

export default function JobRoles({ data }) {
     const courseName = data?.title || "UI/UX Design";

     const jobRolesData = data?.jobRoles || {};
     const tag = jobRolesData.tag || "JOB ROLES";
     const title = jobRolesData.title || `Job Roles After ${courseName}`;
     const description = jobRolesData.description || `Unlock exciting career opportunities with in-demand ${courseName} roles. Plan your path from fundamental skills to industry leadership.`;

     const defaultRoles = [
          {
               step: "01",
               iconName: "briefcase",
               title: "UI/UX Designer",
               description: "Design intuitive, user-centered digital interfaces and interactive product experiences using modern design systems and prototyping software.",
               keyFocusTitle: "KEY FOCUS AREAS",
               keyFocus: "Wireframing, High-Fidelity Prototyping, Design Systems, Mobile & Web Layouts"
          },
          {
               step: "02",
               iconName: "chart",
               title: "Product Designer",
               description: "Lead end-to-end product design processes, bridging user needs, technical capabilities, and core business growth objectives.",
               keyFocusTitle: "KEY FOCUS AREAS",
               keyFocus: "User Research, Product Strategy, Interaction Design, Cross-Functional Collaboration"
          },
          {
               step: "03",
               iconName: "user",
               title: "UX Researcher & Strategist",
               description: "Conduct usability testing, user interviews, and data-driven analysis to transform insights into user-focused design decisions.",
               keyFocusTitle: "KEY FOCUS AREAS",
               keyFocus: "Usability Testing, User Interviews, Information Architecture, Persona Mapping"
          }
     ];

     const items = (Array.isArray(jobRolesData.items) && jobRolesData.items.length > 0)
          ? jobRolesData.items
          : defaultRoles;

     const getIcon = (iconName, idx) => {
          const key = iconName ? String(iconName).toLowerCase().trim() : "";
          if (key === "briefcase" || key === "job") return <Briefcase className="w-5 h-5 stroke-[2.2]" />;
          if (key === "chart" || key === "analytics" || key === "bar") return <BarChart3 className="w-5 h-5 stroke-[2.2]" />;
          if (key === "user" || key === "researcher" || key === "person") return <UserCheck className="w-5 h-5 stroke-[2.2]" />;
          if (key === "clock" || key === "time") return <Clock className="w-5 h-5 stroke-[2.2]" />;
          if (key === "layers") return <Layers className="w-5 h-5 stroke-[2.2]" />;
          if (key === "award") return <Award className="w-5 h-5 stroke-[2.2]" />;

          // Fallbacks by index
          if (idx % 3 === 0) return <Briefcase className="w-5 h-5 stroke-[2.2]" />;
          if (idx % 3 === 1) return <BarChart3 className="w-5 h-5 stroke-[2.2]" />;
          return <UserCheck className="w-5 h-5 stroke-[2.2]" />;
     };

     // Format title with text-official styling
     const renderTitle = () => {
          if (!title) return null;
          if (title.toLowerCase().includes("after")) {
               const parts = title.split(/after/i);
               return (
                    <>
                         {parts[0]} <span className="font-playfair text-zinc-900 font-medium">After</span> <span className="text-[#f36600] font-semibold italic">{parts.slice(1).join("After")}</span>
                    </>
               );
          }
          return title;
     };

     return (
          <section className="button-neutral w-full bg-[#F8F6EE] py-10 sm:py-18 md:py-24 font-urbanist relative z-1">
               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto">

                    {/* Header Section */}
                    <div className="space-y-3 max-w-3xl mb-5 md:mb-16 text-left md:text-center mx-auto">

                         {/* Badge Tag */}
                         <div>
                              {/* <span className="subheading">
                                   {tag}
                              </span> */}
                         </div>

                         {/* Main Heading */}
                         <h2 className="font-playfair h2-section-title text-zinc-900 ">
                              {renderTitle()}
                         </h2>

                         {/* Subtitle Description */}
                         <p className="font-urbanist para">
                              {description}
                         </p>

                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                         {items.map((item, idx) => {
                              const stepNum = item.step || `0${idx + 1}`;

                              return (
                                   <div
                                        key={idx}
                                        className="group relative bg-white rounded-2xl p-5 sm:p-8 border border-zinc-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden border-l-4 border-l-amber-400 hover:border-amber-400"
                                   >
                                        <div>
                                             {/* Top Row: Icon Badge & Step Number */}
                                             <div className="flex items-center justify-between mb-6">
                                                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-300 bg-amber-500/10 border-amber-500/20 text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-900 shadow-2xs group-hover:shadow-inner">
                                                       {getIcon(item.iconName, idx)}
                                                  </div>
                                                  <span className="font-urbanist font-extrabold text-sm text-zinc-400 group-hover:text-zinc-900 tracking-wider">
                                                       {stepNum}
                                                  </span>
                                             </div>

                                             {/* Role Title */}
                                             <h3 className="font-urbanist font-extrabold text-xl sm:text-xl leading-snug mb-2 text-zinc-900 group-hover:text-zinc-950 transition-colors">
                                                  {item.title}
                                             </h3>

                                             {/* Description */}
                                             <p className="font-urbanist para">
                                                  {item.description}
                                             </p>
                                        </div>

                                        {/* Bottom Key Focus Section */}
                                        <div className="pt-4 border-t border-zinc-100 group-hover:border-zinc-900/10 mt-auto">
                                             <div className="flex items-center gap-1.5 font-urbanist font-bold text-[12px] sm:text-xs uppercase tracking-wider mb-1.5 text-amber-700 group-hover:text-zinc-950">
                                                  <span className="font-extrabold text-sm">&gt;</span>
                                                  <span>{item.keyFocusTitle || "KEY FOCUS AREAS"}</span>
                                             </div>
                                             <p className="font-urbanist text-sm leading-[1.7] sm:text-[13px] font-semibold text-zinc-700 group-hover:text-zinc-900">
                                                  {item.keyFocus}
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
