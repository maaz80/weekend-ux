"use client";

import { useState } from "react";
import BlogCard from "@/components/Blogs/BlogCard";

const fallbackFeaturedBlogs = [
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
 * BlogListingClient — client component for loading more blog cards.
 * All actual blog data comes from props (fetched at build time by the server page).
 */
export default function BlogListingClient({ blogsList, featuredStart, featuredEnd }) {
     const [visibleCount, setVisibleCount] = useState(9);
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
               : fallbackFeaturedBlogs;
     const displayedBlogs = activeFeaturedBlogs.slice(0, visibleCount);

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
                                   priority={idx < 3}
                                   fetchPriority={idx === 0 ? "high" : undefined}
                              />
                         ))}
                    </div>
                    {visibleCount < activeFeaturedBlogs.length && (
                         <div className="mt-12 flex justify-center">
                              <button
                                   onClick={() => setVisibleCount((count) => count + 9)}
                                   className="rounded-xl bg-official px-7 py-3 text-sm font-semibold text-neutral transition-colors hover:bg-official/80"
                              >
                                   Load More
                              </button>
                         </div>
                    )}
               </div>
          </>
     );
}
