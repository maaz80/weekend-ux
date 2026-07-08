"use client";

import { useHomeData } from "@/context/HomeDataContext";

const STATIC_STATS = [
     {
          number: "500+",
          title: "Designers Trained",
          description:
               "Across beginner, intermediate & advanced courses since 2019",
     },
     {
          number: "500+",
          title: "Designers Trained",
          description:
               "Across beginner, intermediate & advanced courses since 2019",
     },
     {
          number: "8-10",
          title: "Students per batch, always",
          description:
               "We've been offered bigger. We've always said no. Small is big.",
     },
     {
          number: "5★",
          title: "Average instructor rating",
          description:
               "Rated by students post-batch. No anonymous reviews, no inflation.",
     },
];

export default function Details({
     bgImage = "/images/weekend-ux-details-bg.webp",
     overlayColor = "bg-[#F4B400]/40",
     taglineColor = "text-[#fff8d6]",
     titleColor = "text-[#1B1B1B]",
     titleHighlightColor = "text-white",
     cardNumberColor = "text-[#171717]",
     cardTitleColor = "text-[#171717]",
     cardDescriptionColor = "text-[#2A2A2A]/80",
     cardDividerColor = "bg-[#1B1B1B]/15"
}) {
     const { homeData } = useHomeData();

     const whyTitle = (homeData?.why?.title && homeData.why.title.trim())
          ? homeData.why.title
          : "Why Weekend UX";

     const startheading = (homeData?.why?.startheading && homeData.why.startheading.trim())
          ? homeData.why.startheading
          : "The Numbers Behind Every";

     const midheading = (homeData?.why?.midheading && homeData.why.midheading.trim())
          ? homeData.why.midheading
          : "Designer";

     const endheading = (homeData?.why?.endheading && homeData.why.endheading.trim())
          ? homeData.why.endheading
          : " We've Trained.";

     const rawCards = homeData?.why?.card;
     const hasValidCards = Array.isArray(rawCards) && rawCards.length > 0 && rawCards.some(c => c.value && c.value.trim());

     const stats = hasValidCards
          ? rawCards.filter(c => c.value && c.value.trim()).map((item, idx) => {
               const fallback = STATIC_STATS[idx] || STATIC_STATS[0];
               return {
                    number: item.value && item.value.trim() ? item.value : fallback.number,
                    title: item.valueName && item.valueName.trim() ? item.valueName : fallback.title,
                    description: item.description && item.description.trim() ? item.description : fallback.description,
               };
          })
          : STATIC_STATS;

     return (
          <section className="relative overflow-hidden">
               {/* Background */}
               <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                         backgroundImage: `url('${bgImage}')`,
                    }}
               />

               {/* Overlay */}
               <div className={`absolute inset-0 ${overlayColor}`} />

               <div className="relative z-10 mx-auto max-w-360 px-5 py-14 md:px-10 md:py-20 xl:px-16">
                    <div className="grid items-start gap-12 lg:grid-cols-[1fr_620px]">

                         {/* Left Content */}
                         <div className="relative">
                              <p className={`mb-5 text-[10px] font-medium uppercase tracking-[0.45em] ${taglineColor} font-inter`}>
                                   {whyTitle}
                              </p>

                              <h2 className={`max-w-150 font-serif text-[38px] md:leading-16 ${titleColor} md:text-[56px] leading-12`}>
                                   {startheading}{" "}
                                   {midheading && <span className={`italic ${titleHighlightColor}`}>{midheading}</span>}
                                   {endheading && <>{endheading.startsWith(" ") ? "" : " "}{endheading}</>}
                              </h2>

                         </div>

                         {/* Cards */}
                         <div className="grid gap-5 sm:grid-cols-2">
                              {stats.map((item, index) => (
                                   <div
                                        key={index}
                                        className="
                  rounded-xl
                  bg-linear-to-b from-white/10 to-transparent
                  backdrop-blur-sm
                  p-7
                  shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
                                   >
                                        <h3 className={`text-center text-[42px] font-semibold leading-none ${cardNumberColor}`}>
                                             {item.number}
                                        </h3>

                                        <p className={`mt-2 text-center font-medium ${cardTitleColor}`}>
                                             {item.title}
                                        </p>

                                        <div className={`my-5 h-px ${cardDividerColor}`} />

                                        <p className={`text-sm leading-6 ${cardDescriptionColor} text-center`}>
                                             {item.description}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     );
}