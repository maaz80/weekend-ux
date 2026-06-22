"use client";

import { useState } from "react";
import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import BlogCard from "@/components/Blogs/BlogCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export const blogsData = [
     {
          id: 1,
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
     },
     {
          id: 2,
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
     },
];
export const moreBlogsData = [
     {
          id: 1,
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
     },
     {
          id: 2,
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
     },
     {
          id: 3,
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
     },
     {
          id: 4,
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
     },
     {
          id: 5,
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
     },
     {
          id: 6,
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
     },
];
export default function Blogs() {
     const [currentPage, setCurrentPage] = useState(1);
     const blogsPerPage = 3;
     const totalPages = Math.ceil(moreBlogsData.length / blogsPerPage);

     const getPageNumbers = () => {
          const pages = [];
          if (totalPages <= 4) {
               for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
               }
               return pages;
          }

          const start = Math.max(1, Math.min(currentPage, totalPages - 2));
          const actualStart = currentPage < 3 ? 1 : start;
          
          const end = Math.min(totalPages, actualStart + (currentPage < 3 ? 2 : 2));
          for (let i = actualStart; i <= end; i++) {
               pages.push(i);
          }

          const lastPageInWindow = pages[pages.length - 1];
          if (lastPageInWindow < totalPages) {
               if (totalPages - lastPageInWindow > 1) {
                    pages.push("...");
               }
               pages.push(totalPages);
          }
          return pages;
     };

     const displayedBlogs = moreBlogsData.slice(
          (currentPage - 1) * blogsPerPage,
          currentPage * blogsPerPage
     );

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col">

               {/* Hero Header Section */}
               <section className="relative h-32.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 ">
                    <Image
                         src='/images/weekend-ux-blogs-hero-bg.webp'
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         className="object-fill object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">Explore Our <span className="text-official italic">Blogs</span></h1>
                    <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute right-3 md:right-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: 'auto' }} />
               </section>
               <div className="custom-width py-20">
                    <h2 className="text-[28px] md:text-[40px] text-neutral-900 font-medium font-playfair mb-4"><span className="text-official italic">Featured</span> Blogs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                         {blogsData.map((blog) => (
                              <BlogCard
                                   key={blog.id}
                                   blog={blog}
                                   height="h-62.5 md:h-95"
                              />
                         ))}
                    </div>
               </div>

               <div className="custom-width pb-20">
                    <h2 className="text-[28px] md:text-[40px] text-neutral-900 font-medium font-playfair mb-4">Explore <span className="text-official italic">More</span> Blogs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                         {displayedBlogs.map((blog) => (
                              <BlogCard
                                   key={blog.id}
                                   blog={blog}
                                   height="h-42.5 md:h-61"
                              />
                         ))}
                    </div>

                    {/* Professional Pagination */}
                    {totalPages > 1 && (
                         <div className="flex items-center justify-center gap-3 mt-16">
                              {/* Previous button */}
                              <button
                                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                   disabled={currentPage === 1}
                                   className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${currentPage === 1
                                             ? "border-zinc-200 text-zinc-300 bg-zinc-50 cursor-not-allowed"
                                             : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-black"
                                        }`}
                              >
                                   <FiChevronLeft className="text-lg" />
                              </button>

                              {/* Page Numbers */}
                              {getPageNumbers().map((item, idx) => {
                                   if (item === "...") {
                                        return (
                                             <span
                                                  key={`ellipsis-${idx}`}
                                                  className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-zinc-400 select-none"
                                             >
                                                  ...
                                             </span>
                                        );
                                   }
                                   return (
                                        <button
                                             key={`page-${item}`}
                                             onClick={() => setCurrentPage(item)}
                                             className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${currentPage === item
                                                       ? "bg-official text-black border-transparent shadow-sm"
                                                       : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-black"
                                                  }`}
                                        >
                                             {item}
                                        </button>
                                   );
                              })}

                              {/* Next button */}
                              <button
                                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                   disabled={currentPage === totalPages}
                                   className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${currentPage === totalPages
                                             ? "border-zinc-200 text-zinc-300 bg-zinc-50 cursor-not-allowed"
                                             : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-black"
                                        }`}
                              >
                                   <FiChevronRight className="text-lg" />
                              </button>
                         </div>
                    )}
               </div>
               <FAQ />
          </div>
     );
}