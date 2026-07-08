"use client";

import { useState, useEffect, useMemo } from "react";
import {
     FaFacebookF,
     FaInstagram,
     FaYoutube,
} from "react-icons/fa";
import CardBg from '../assets/weekend-ux-course-details-call-card-bg.webp';
import { CiShare2 } from "react-icons/ci";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Image from "next/image";

export default function Details({ data }) {
     const dateStr = data?.date || "22nd July, 2026";
     const readStr = data?.read || "3 min read";
     const coverImage = data?.image || "/images/hero-bg.webp";
     const htmlContent = data?.content ? data.content.map(c => c.data).join("") : "";

     // Pre-parse headings and inject IDs/styles on the server to prevent CLS
     const { processedHtmlContent, headingsList } = useMemo(() => {
          const headings = [];
          if (!htmlContent) return { processedHtmlContent: "", headingsList: [] };

          let headingIndex = 0;
          const processed = htmlContent.replace(/<h([1-3])\b([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
               const id = `blog-heading-${headingIndex}`;
               headingIndex++;
               
               // Strip HTML tags to get clean plain text for the TOC
               const text = content.replace(/<[^>]*>/g, "").trim();
               headings.push({
                    id,
                    text,
                    level: `H${level}`
               });

               // Inject scroll-margin-top to clear the sticky header when scrolling
               let newAttrs = attrs;
               if (/style="/i.test(attrs)) {
                    newAttrs = attrs.replace(/style="/i, 'style="scroll-margin-top: 130px; ');
               } else {
                    newAttrs = `${attrs} style="scroll-margin-top: 130px;"`;
               }

               // Inject or replace the ID attribute
               if (/id="/i.test(attrs)) {
                    newAttrs = newAttrs.replace(/id="[^"]*"/i, `id="${id}"`);
               } else {
                    newAttrs = `${newAttrs} id="${id}"`;
               }

               return `<h${level}${newAttrs}>${content}</h${level}>`;
          });

          return { processedHtmlContent: processed, headingsList: headings };
     }, [htmlContent]);

     const [activeId, setActiveId] = useState("");

     // Set initial active heading
     useEffect(() => {
          if (headingsList.length > 0 && !activeId) {
               setActiveId(headingsList[0].id);
          }
     }, [headingsList, activeId]);

     // Sync active heading with scroll position using IntersectionObserver
     useEffect(() => {
          if (headingsList.length === 0) return;

          const observer = new IntersectionObserver(
               (entries) => {
                    // Find the first heading that is currently intersecting the viewport trigger area
                    const visibleEntry = entries.find((entry) => entry.isIntersecting);
                    if (visibleEntry) {
                         setActiveId(visibleEntry.target.id);
                      }
                 },
                 {
                      // Offset to trigger when heading is near the top of the content area
                      rootMargin: "-140px 0px -60% 0px",
                      threshold: 0
                 }
            );

            headingsList.forEach((h) => {
                 const el = document.getElementById(h.id);
                 if (el) observer.observe(el);
            });

            return () => observer.disconnect();
       }, [headingsList]);

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

                                     <button aria-label="Share this article" className="w-9 h-9 rounded-full border border-neutral-400 flex items-center justify-center text-neutral">
                                          <CiShare2 size={16} />
                                     </button>

                                     <button aria-label="Share on Facebook" className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                          <FaFacebookF size={15} />
                                     </button>

                                     <button aria-label="Share on Instagram" className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                          <FaInstagram size={15} />
                                     </button>

                                     <button aria-label="Share on YouTube" className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                          <FaYoutube size={15} />
                                     </button>

                                </div>

                                {/* TOC */}
                                {headingsList.length > 0 && (
                                     <div className="mt-10">
                                          <h2 className="font-urbanist font-bold text-[22px] text-neutral uppercase">
                                               Table Of Content
                                          </h2>

                                          <div className="mt-6 space-y-2">
                                               {headingsList.map((item) => {
                                                    const isActive = item.id === activeId;
                                                    return (
                                                         <button
                                                              key={item.id}
                                                              onClick={() => handleScroll(item.id)}
                                                              className={`w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer leading-7.5 line-clamp-1 ${isActive
                                                                        ? "bg-neutral text-white font-bold"
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

                                     <Image
                                          src={CardBg}
                                          alt="banner"
                                          fill
                                          className="object-cover"
                                     />

                                     <div className="absolute inset-0 bg-neutral/25" />

                                     <div className="absolute inset-0 p-4 flex flex-col justify-between">

                                          <div>
                                               <h2 className="font-playfair text-white text-[34px] leading-[1.1]">
                                                    Design is more than just being creative!
                                               </h2>

                                               <p className="mt-3 text-white/80 text-sm">
                                                    Learn how to make design that sells
                                               </p>
                                          </div>

                                          <button className="h-12 rounded-lg bg-[#F7C600] text-neutral font-medium cursor-pointer">
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
                                          priority={true}
                                     />
                                </div>

                                {/* BLOG CONTENT RENDERER */}
                                <div className="mt-8 lg:mt-12">
                                     <div
                                          className="blog-content"
                                          dangerouslySetInnerHTML={{ __html: processedHtmlContent }}
                                     />
                                </div>

                           </div>

                      </div>

                 </div>
            </section>
       );
  }