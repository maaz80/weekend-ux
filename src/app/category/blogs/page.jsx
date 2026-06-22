"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import BlogCard from "@/components/Blogs/BlogCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const staticFeaturedBlogs = [
     {
          id: "static-1",
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
          slug: "the-future-of-ai-in-product-design"
     },
     {
          id: "static-2",
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
          slug: "how-modern-ux-designers-create-experiences"
     },
];

const staticMoreBlogs = [
     {
          id: "static-1",
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
          slug: "the-future-of-ai-in-product-design"
     },
     {
          id: "static-2",
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
          slug: "how-modern-ux-designers-create-experiences"
     },
     {
          id: "static-3",
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
          slug: "the-future-of-ai-in-product-design"
     },
     {
          id: "static-4",
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
          slug: "how-modern-ux-designers-create-experiences"
     },
     {
          id: "static-5",
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.jpg",
          slug: "the-future-of-ai-in-product-design"
     },
     {
          id: "static-6",
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.jpg",
          slug: "how-modern-ux-designers-create-experiences"
     },
];

export default function Blogs() {
     const [blogsPageConfig, setBlogsPageConfig] = useState(null);
     const [blogsList, setBlogsList] = useState([]);
     const [loading, setLoading] = useState(true);
     const [currentPage, setCurrentPage] = useState(1);
     const blogsPerPage = 6; // Fits the 3-column layout nicely (2 rows of 3)

     useEffect(() => {
          async function fetchBlogs() {
               try {
                    const res = await fetch("/api/blogs");
                    if (res.ok) {
                         const data = await res.json();
                         setBlogsPageConfig(data);
                         if (data?.blogs && Array.isArray(data.blogs)) {
                              setBlogsList(data.blogs);
                         }
                    }
               } catch (error) {
                    console.error("Failed to fetch blog configuration / listings:", error);
               } finally {
                    setLoading(false);
               }
          }
          fetchBlogs();
     }, []);

     const heroStart = blogsPageConfig?.hero?.starttitle && blogsPageConfig.hero.starttitle.trim()
          ? blogsPageConfig.hero.starttitle.trim()
          : "Our Latest";
     const heroEnd = blogsPageConfig?.hero?.endtitle && blogsPageConfig.hero.endtitle.trim()
          ? blogsPageConfig.hero.endtitle.trim()
          : "Blogs";

     const featuredStart = blogsPageConfig?.featuredblogs?.starttitle && blogsPageConfig.featuredblogs.starttitle.trim()
          ? blogsPageConfig.featuredblogs.starttitle.trim()
          : "Featured";
     const featuredEnd = blogsPageConfig?.featuredblogs?.endtitle && blogsPageConfig.featuredblogs.endtitle.trim()
          ? blogsPageConfig.featuredblogs.endtitle.trim()
          : "Blogs";

     // Filter featured blogs, default to first 2 database blogs, or fallback static featured blogs
     const dbFeatured = blogsList.filter(b => b.featured === true || b.featured === "true");
     const activeFeaturedBlogs = blogsList.length > 0
          ? (dbFeatured.length > 0 ? dbFeatured : blogsList.slice(0, 2))
          : staticFeaturedBlogs;

     // Use all database blogs for listing, or fallback static blogs list
     const activeMoreBlogs = blogsList.length > 0
          ? blogsList
          : staticMoreBlogs;

     const totalPages = Math.ceil(activeMoreBlogs.length / blogsPerPage);

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

     const displayedBlogs = activeMoreBlogs.slice(
          (currentPage - 1) * blogsPerPage,
          currentPage * blogsPerPage
     );

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col">

               {/* Hero Header Section */}
               <section className="relative h-32.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 ">
                    <Image
                         src="/images/weekend-ux-blogs-hero-bg.webp"
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         className="object-cover object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">
                         {heroStart} <span className="text-official italic">{heroEnd}</span>
                    </h1>
                    <Image src="/images/weekend-ux-decorative-diamond.webp" alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: "auto" }} />
               </section>

               {/* Featured Blogs Section */}
               <div className="custom-width py-20">
                    <h2 className="text-[28px] md:text-[40px] text-neutral-900 font-medium font-playfair mb-4">
                         <span className="text-official italic">{featuredStart}</span> {featuredEnd}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                         {activeFeaturedBlogs.map((blog, idx) => (
                              <BlogCard
                                   key={blog._id || blog.id || idx}
                                   blog={blog}
                                   height="h-62.5 md:h-95"
                              />
                         ))}
                    </div>
               </div>

               {/* Explore More Blogs Section */}
               <div className="custom-width pb-20">
                    <h2 className="text-[28px] md:text-[40px] text-neutral-900 font-medium font-playfair mb-4">
                         Explore <span className="text-official italic">More</span> Blogs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                         {displayedBlogs.map((blog, idx) => (
                              <BlogCard
                                   key={blog._id || blog.id || idx}
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
               
               {/* <RelatedBlogs /> */}
               <FAQ />
          </div>
     );
}