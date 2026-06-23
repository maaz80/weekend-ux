"use client";

import { useState, useEffect, useRef } from "react";
import {
     FaFacebookF,
     FaInstagram,
     FaYoutube,
} from "react-icons/fa";
import CardBg from '../assets/weekend-ux-course-details-call-card-bg.webp';
import { CiShare2 } from "react-icons/ci";
import OptimizedImage from "@/components/ui/OptimizedImage";

export default function Details({ data }) {
     const [headingsList, setHeadingsList] = useState([]);
     const [activeId, setActiveId] = useState("");
     const contentRef = useRef(null);

     const dateStr = data?.date || "22nd July, 2026";
     const readStr = data?.read || "3 min read";
     const coverImage = data?.image || "/images/hero-bg.jpg";
     const htmlContent = data?.content ? data.content.map(c => c.data).join("") : "";

     useEffect(() => {
          if (!htmlContent || !contentRef.current) return;

          const parseAndSetupHeadings = () => {
               if (!contentRef.current) return false;
               const headingElements = contentRef.current.querySelectorAll("h1, h2, h3");
               if (headingElements && headingElements.length > 0) {
                    const parsed = Array.from(headingElements).map((el, index) => {
                         const id = `blog-heading-${index}`;
                         el.id = id;
                         el.style.scrollMarginTop = "130px"; // Inline offset style to clear header cleanly
                         return {
                              id,
                              text: el.innerText || el.textContent || "",
                              level: el.tagName
                         };
                    });
                    setHeadingsList(parsed);
                    setActiveId(prev => prev || (parsed[0] ? parsed[0].id : ""));
                    return true;
               }
               return false;
          };

          // 1. Try parsing immediately (if content is already rendered)
          const success = parseAndSetupHeadings();
          if (success) return;

          // 2. Observe DOM modifications (react instantly when dangerouslySetInnerHTML commits)
          const observer = new MutationObserver(() => {
               const done = parseAndSetupHeadings();
               if (done) {
                    observer.disconnect();
               }
          });

          observer.observe(contentRef.current, {
               childList: true,
               subtree: true
          });

          // 3. Backup timeout
          const timer = setTimeout(() => {
               parseAndSetupHeadings();
          }, 250);

          return () => {
               observer.disconnect();
               clearTimeout(timer);
          };
     }, [htmlContent, data]);

     const handleScroll = (id) => {
          setActiveId(id);

          const element = document.getElementById(id);
          if (element) {
               element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
               });
          }
     };

     return (
          <section className="bg-[#F8F6EE] py-10 lg:py-16">
               <div className="custom-width px-4 md:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 lg:gap-10">

                         {/* ================= LEFT SIDEBAR ================= */}

                         <aside className="lg:sticky lg:top-24 h-fit">

                              {/* Date */}
                              <div className="flex items-center gap-2 text-[14px] text-neutral-600">
                                   <span>{dateStr}</span>
                                   <span>|</span>
                                   <span>{readStr}</span>
                              </div>

                              {/* Social */}
                              <div className="flex items-center gap-3 mt-5">

                                   <button className="w-9 h-9 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-900">
                                        <CiShare2 size={16} />
                                   </button>

                                   <button className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                        <FaFacebookF size={15} />
                                   </button>

                                   <button className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                        <FaInstagram size={15} />
                                   </button>

                                   <button className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                        <FaYoutube size={15} />
                                   </button>

                              </div>

                              {/* TOC */}
                              {headingsList.length > 0 && (
                                   <div className="mt-10">
                                        <h3 className="font-urbanist font-bold text-[22px] text-neutral-900 uppercase">
                                             Table Of Content
                                        </h3>

                                        <div className="mt-6 space-y-2">
                                             {headingsList.map((item) => {
                                                  const isActive = item.id === activeId;
                                                  return (
                                                       <button
                                                            key={item.id}
                                                            onClick={() => handleScroll(item.id)}
                                                            className={`w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer leading-7.5 line-clamp-1 ${
                                                                 isActive
                                                                      ? "bg-neutral-900 text-white font-bold"
                                                                      : "text-neutral-800 hover:bg-neutral-200/60 hover:text-orange-500 font-medium"
                                                            }`}
                                                           
                                                       >
                                                            {item.text}
                                                       </button>
                                                  );
                                             })}
                                        </div>
                                   </div>
                              )}

                              {/* CTA CARD */}
                              <div className="mt-10 rounded-xl overflow-hidden relative h-57.5">

                                   <img
                                        src={CardBg.src}
                                        alt="banner"
                                        className="absolute inset-0 w-full h-full object-cover"
                                   />

                                   <div className="absolute inset-0 bg-black/25" />

                                   <div className="absolute inset-0 p-4 flex flex-col justify-between">

                                        <div>
                                             <h3 className="font-playfair text-white text-[34px] leading-[1.1]">
                                                  Design is more than just being creative!
                                             </h3>

                                             <p className="mt-3 text-white/80 text-sm">
                                                  Learn how to make design that sells
                                             </p>
                                        </div>

                                        <button className="h-12 rounded-lg bg-[#F7C600] text-neutral-900 font-medium cursor-pointer">
                                             Book a Call
                                        </button>

                                   </div>

                              </div>
                         </aside>

                         {/* ================= CONTENT ================= */}

                         <div>

                              {/* HERO COVER IMAGE */}
                              <div className="overflow-hidden rounded-2xl bg-zinc-100">
                                   <OptimizedImage
                                        src={coverImage}
                                        alt={data?.alt || data?.title || "Blog Cover"}
                                        className="w-full h-65 md:h-112.5 lg:h-137.5 object-cover"
                                        sizes="100vw"
                                   />
                              </div>

                              {/* BLOG CONTENT RENDERER */}
                              <div className="mt-8 lg:mt-12">
                                   <div 
                                        ref={contentRef}
                                        className="blog-content"
                                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                                   />
                              </div>

                         </div>

                    </div>

               </div>
          </section>
     );
}