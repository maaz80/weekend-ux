"use client";

import { useState } from "react";
import BlogCard from "@/components/Blogs/BlogCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const staticFeaturedBlogs = [
     {
          id: "static-1",
          title: "The Future of AI in Product Design and User Experience",
          image: "/images/hero-bg.webp",
          slug: "the-future-of-ai-in-product-design"
     },
     {
          id: "static-2",
          title: "How Modern UX Designers Create Experiences That Convert",
          image: "/images/hero-bg.webp",
          slug: "how-modern-ux-designers-create-experiences"
     },
];

/**
 * BlogListingClient — client component only for interactive pagination state.
 * All actual blog data comes from props (fetched at build time by the server page).
 */
export default function BlogListingClient({ blogsList, featuredStart, featuredEnd }) {
     const [currentPage, setCurrentPage] = useState(1);
     const blogsPerPage = 9;
     const activeFeaturedBlogs = blogsList.length > 0
          ? blogsList
               .map((blog, index) => {
                    const date = typeof blog.date === "string"
                         ? Date.parse(blog.date.replace(/(\d)(st|nd|rd|th)\b/gi, "$1"))
                         : NaN;
                    return { blog, index, timestamp: Number.isFinite(date) ? date : 0 };
               })
               .sort((a, b) => b.timestamp - a.timestamp || a.index - b.index)
               .map(({ blog }) => blog)
          : staticFeaturedBlogs;
     const totalPages = Math.ceil(activeFeaturedBlogs.length / blogsPerPage);

     const getPageNumbers = () => {
          const pages = [];
          if (totalPages <= 4) {
               for (let i = 1; i <= totalPages; i++) pages.push(i);
               return pages;
          }
          const start = Math.max(1, Math.min(currentPage, totalPages - 2));
          const actualStart = currentPage < 3 ? 1 : start;
          const end = Math.min(totalPages, actualStart + 2);
          for (let i = actualStart; i <= end; i++) pages.push(i);
          const lastPageInWindow = pages[pages.length - 1];
          if (lastPageInWindow < totalPages) {
               if (totalPages - lastPageInWindow > 1) pages.push("...");
               pages.push(totalPages);
          }
          return pages;
     };

     const displayedBlogs = activeFeaturedBlogs.slice(
          (currentPage - 1) * blogsPerPage,
          currentPage * blogsPerPage
     );

     return (
          <>
               {/* Featured Blogs Section */}
               <div className="custom-width py-10 md:py-20 px-3 button-neutral">
                    <h2 className="text-[28px] md:text-[36px] text-neutral font-medium font-playfair mb-6">
                         <span className="text-[#f36600] italic">{featuredStart}</span> {featuredEnd}
                    </h2>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                         {displayedBlogs.map((blog, idx) => (
                              <BlogCard
                                   key={blog._id || blog.id || idx}
                                   blog={blog}
                                   height="h-52.5 md:h-65 lg:h-70"
                                   priority={currentPage === 1 && idx < 3}
                                   fetchPriority={idx === 0 ? "high" : undefined}
                              />
                         ))}
                    </div>
                    {totalPages > 1 && (
                         <div className="mt-12 flex items-center justify-center gap-3">
                              <button
                                   onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                                   aria-label="Previous Page"
                                   disabled={currentPage === 1}
                                   className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${currentPage === 1
                                        ? "cursor-not-allowed border-zinc-200 bg-zinc-50 text-zinc-300"
                                        : "cursor-pointer border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-neutral"
                                        }`}
                              >
                                   <FiChevronLeft className="text-lg" />
                              </button>
                              {getPageNumbers().map((item, idx) => item === "..." ? (
                                   <span key={`ellipsis-${idx}`} className="flex h-10 w-10 select-none items-center justify-center text-sm font-semibold text-zinc-400">
                                        ...
                                   </span>
                              ) : (
                                   <button
                                        key={`page-${item}`}
                                        onClick={() => setCurrentPage(item)}
                                        aria-current={currentPage === item ? "page" : undefined}
                                        className={`h-10 w-10 rounded-xl border text-sm font-semibold transition-all ${currentPage === item
                                             ? "border-transparent bg-official text-neutral shadow-sm"
                                             : "cursor-pointer border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-neutral"
                                             }`}
                                   >
                                        {item}
                                   </button>
                              ))}
                              <button
                                   onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                                   aria-label="Next Page"
                                   disabled={currentPage === totalPages}
                                   className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${currentPage === totalPages
                                        ? "cursor-not-allowed border-zinc-200 bg-zinc-50 text-zinc-300"
                                        : "cursor-pointer border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-neutral"
                                        }`}
                              >
                                   <FiChevronRight className="text-lg" />
                              </button>
                         </div>
                    )}
               </div>
          </>
     );
}
