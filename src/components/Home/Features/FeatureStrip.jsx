"use client";

import { HiLightBulb } from "react-icons/hi";
import { TbChartBubbleFilled } from "react-icons/tb";
import { FaBolt, FaStar, FaRegLightbulb } from "react-icons/fa";
import { useHomeData } from "@/context/HomeDataContext";

const ICON_MAP = {
     HiLightBulb,
     TbChartBubbleFilled,
     FaBolt,
     FaStar,
     FaRegLightbulb
};

function getIconComponent(iconName, defaultIcon) {
     if (!iconName || !iconName.trim()) return defaultIcon;
     
     const Icon = ICON_MAP[iconName.trim()];
     if (Icon) return <Icon size={42} />;
     
     const matchedKey = Object.keys(ICON_MAP).find(k => k.toLowerCase() === iconName.trim().toLowerCase());
     if (matchedKey) {
          const MatchedIcon = ICON_MAP[matchedKey];
          return <MatchedIcon size={42} />;
     }
     
     return defaultIcon;
}

export default function FeatureStrip({
     textColor = "text-neutral",
     borderColor = "bg-neutral"
}) {
     const { homeData } = useHomeData();

     const introText = (homeData?.features?.description && homeData.features.description.trim())
          ? homeData.features.description
          : "Weekend UX is a hands-on design institute, in-person classes and structured recordings built for people who learn by doing, not watching.";

     const rawPoints = homeData?.features?.points;
     const hasValidPoints = Array.isArray(rawPoints) && rawPoints.length > 0 && rawPoints.some(p => p.text && p.text.trim());

     const featPoints = hasValidPoints
          ? rawPoints.filter(p => p.text && p.text.trim()).map((item, idx) => {
               const text = item.text || "";
               let title = text;
               let subtitle = "";
               if (text.includes("\n")) {
                    const parts = text.split("\n");
                    title = parts[0];
                    subtitle = parts.slice(1).join(" ");
               } else {
                    if (text.toLowerCase().includes("experience world class learning")) {
                         title = "Experience World";
                         subtitle = "Class Learning";
                    } else if (text.toLowerCase().includes("100% placement assistance")) {
                         title = "100% Placement";
                         subtitle = "Assistance";
                    } else if (text.toLowerCase().includes("study on-campus or online")) {
                         title = "Study On-Campus";
                         subtitle = "or Online";
                    } else {
                         const words = text.split(" ");
                         if (words.length > 2) {
                              const mid = Math.ceil(words.length / 2);
                              title = words.slice(0, mid).join(" ");
                              subtitle = words.slice(mid).join(" ");
                         } else if (words.length === 2) {
                              title = words[0];
                              subtitle = words[1];
                         }
                    }
               }

               const defaultIcon = idx === 0 ? <HiLightBulb size={42} /> : <TbChartBubbleFilled size={42} />;

               return {
                    icon: getIconComponent(item.icon, defaultIcon),
                    title,
                    subtitle,
               };
          })
          : [
               {
                    icon: <HiLightBulb size={42} />,
                    title: "Experience World",
                    subtitle: "Class Learning",
               },
               {
                    icon: <TbChartBubbleFilled size={42} />,
                    title: "100% Placement",
                    subtitle: "Assistance",
               },
               {
                    icon: <TbChartBubbleFilled size={42} />,
                    title: "Study On-Campus",
                    subtitle: "or Online",
               },
          ];

     return (
          <section className="relative overflow-hidden">

               <div className="mx-auto max-w-85 md:max-w-310 min-h-137.5 md:min-h-104 flex flex-col items-start justify-center">
                    {/* Intro Text */}
                    <div className="">
                         <p className={`font-serif text-[20px] leading-[1.55] md:text-[26px] lg:text-[32px] ${textColor}`}>
                              {introText}
                         </p>
                    </div>

                    {/* Features */}
                    <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-10">
                         {featPoints.map((item, index) => (
                              <div
                                   key={index}
                                   className={`flex items-center gap-5`}
                              >
                                   <div className={`shrink-0 ${textColor}`}>
                                        {item.icon}
                                   </div>
                                   <div>
                                        <h2 className={`font-serif text-[20px] md:text-[22px] leading-tight lg:text-[28px] ${textColor}`}>
                                             {item.title}
                                        </h2>

                                        {item.subtitle && (
                                             <p className={`font-serif text-[20px] md:text-[22px] leading-tight lg:text-[28px] ${textColor}`}>
                                                  {item.subtitle}
                                             </p>
                                        )}
                                   </div>
                                   {/* Border  */}
                                   {index < featPoints.length - 1 && (
                                        <div className="min-w-32  items-center justify-center hidden md:flex">
                                             <div className={`w-0.5 h-18 ${borderColor}`}></div>
                                        </div>
                                   )}
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}