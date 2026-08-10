"use client";

import { useState, useEffect, useMemo } from "react";
import CardBg from '@/app/assets/weekend-ux-course-details-call-card-bg.webp';
import OptimizedImage from "@/components/ui/OptimizedImage";
import Image from "next/image";
import AuthorWrittenBy from '@/components/Blogs/AuthorWrittenBy';
import AuthorAbout from '@/components/Blogs/AuthorAbout';

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
          const processed = htmlContent.replace(/<h2\b([^>]*)>(.*?)<\/h2>/gi, (match, attrs, content) => {
               const id = `blog-heading-${headingIndex}`;
               headingIndex++;
               
               // Strip HTML tags to get clean plain text for the TOC
               const text = content.replace(/<[^>]*>/g, "").trim();
               headings.push({
                    id,
                    text,
                    level: "H2"
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

               return `<h2${newAttrs}>${content}</h2>`;
          });

          return { processedHtmlContent: processed, headingsList: headings };
     }, [htmlContent]);

     const [activeId, setActiveId] = useState("");
     const [shareUrl, setShareUrl] = useState("");

     useEffect(() => {
          setShareUrl(window.location.href);
     }, []);

     // Set initial active heading
     useEffect(() => {
          if (headingsList.length > 0 && !activeId) {
               setActiveId(headingsList[0].id);
          }
     }, [headingsList, activeId]);

     // Viewport-relative scroll spy using getBoundingClientRect (100% exact heading match)
     useEffect(() => {
          if (!headingsList.length) return;

          const handleScroll = () => {
               const headerOffset = 160; // Pixel threshold below fixed header
               let currentActiveId = headingsList[0]?.id || "";

               for (let i = 0; i < headingsList.length; i++) {
                    const el = document.getElementById(headingsList[i].id);
                    if (el) {
                         const rect = el.getBoundingClientRect();
                         if (rect.top <= headerOffset) {
                              currentActiveId = headingsList[i].id;
                         } else {
                              break;
                         }
                    }
               }

               setActiveId(currentActiveId);
          };

          handleScroll();
          window.addEventListener("scroll", handleScroll, { passive: true });
          return () => window.removeEventListener("scroll", handleScroll);
     }, [headingsList]);

       const handleScroll = (id) => {
            setActiveId(id);

            const element = document.getElementById(id);
            if (element) {
                 const yOffset = -130;
                 const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                 window.scrollTo({ top: y, behavior: 'smooth' });
            }
       };

       return (
            <section className="bg-[#F8F6EE] py-10 lg:py-16">
                 <div className="custom-width px-4 md:px-6 lg:px-8">

                      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 lg:gap-10 px-1.5">

                           {/* ================= LEFT SIDEBAR ================= */}

                           <aside className="lg:sticky lg:top-24 h-fit">

                                {/* Date */}
                                <div className="flex items-center gap-2 text-[14px] text-neutral-600">
                                     <span>{dateStr}</span>
                                     <span>|</span>
                                     <span>{readStr}</span>
                                </div>

                                {/* Social */}
                                <div className="flex items-center gap-3.5 mt-5">
                                     {/* Facebook Share */}
                                     <a
                                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                          aria-label="Share on Facebook"
                                     >
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                               <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                          </svg>
                                     </a>
                                     {/* LinkedIn Share */}
                                     <a
                                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                          aria-label="Share on LinkedIn"
                                     >
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                               <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                          </svg>
                                     </a>
                                     {/* Pinterest Share */}
                                     <a
                                          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent("Check out this blog post on Weekend UX!")}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                          aria-label="Share on Pinterest"
                                     >
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                               <path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.63 7.85 6.39 9.39-.1-.79-.19-2-.04-2.87l1.17-4.96s-.3-.6-.3-1.48c0-1.39.8-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1.01.5 1.84 1.5 1.84 1.8 0 3.19-1.9 3.19-4.64 0-2.42-1.74-4.12-4.22-4.12-2.88 0-4.57 2.16-4.57 4.39 0 .87.34 1.8 0.76 2.3a.35.35 0 0 1 .08.33l-.29 1.18a.31.31 0 0 1-.44.22c-1.28-.6-2.08-2.46-2.08-3.96 0-3.23 2.35-6.2 6.77-6.2 3.55 0 6.32 2.53 6.32 5.92 0 3.53-2.22 6.38-5.31 6.38-1.04 0-2.01-.54-2.35-1.18l-.64 2.43c-.23.89-.86 2.01-1.28 2.69 1 .31 2.05.47 3.14.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                                          </svg>
                                     </a>
                                     {/* Twitter/X Share */}
                                     <a
                                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Check out this blog post on Weekend UX!")}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                          aria-label="Share on Twitter"
                                     >
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                               <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                          </svg>
                                     </a>
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
                                          className="w-full h-60 md:h-112.5 lg:h-127.5 object-cover"
                                          sizes="100vw"
                                          priority={true}
                                     />
                                </div>

                                 {/* AUTHOR WRITTEN BY CARD */}
                                 <div className="mt-8">
                                     <AuthorWrittenBy author={data?.author} date={data?.date} read={data?.read} />
                                 </div>

                                {/* BLOG CONTENT RENDERER */}
                                <div className="mt-8 lg:mt-12">
                                     <div
                                          className="blog-content"
                                          dangerouslySetInnerHTML={{ __html: processedHtmlContent }}
                                     />
                                </div>

                                 {/* ABOUT THE AUTHOR CARD */}
                                 <div className="mt-10 mb-4">
                                     <AuthorAbout author={data?.author} />
                                 </div>

                           </div>

                      </div>

                 </div>
            </section>
       );
  }
