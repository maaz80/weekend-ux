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
     const blogsPerPage = 6;

     const dbFeatured = blogsList.filter(b => b.featured === true || b.featured === "true");
     const activeFeaturedBlogs = blogsList.length > 0
          ? (dbFeatured.length > 0 ? dbFeatured : blogsList.slice(0, 2))
          : staticFeaturedBlogs;

     const activeMoreBlogs = blogsList.length > 0 ? blogsList : [];
     const totalPages = Math.ceil(activeMoreBlogs.length / blogsPerPage);

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

     const displayedBlogs = activeMoreBlogs.slice(
          (currentPage - 1) * blogsPerPage,
          currentPage * blogsPerPage
     );

     return (
          <>
               {/* Featured Blogs Section */}
               <div className="custom-width py-10 md:py-20">
                    <h2 className="text-[28px] md:text-[40px] text-neutral font-medium font-playfair mb-4">
                         <span className="text-[#8F6A00] italic">{featuredStart}</span> {featuredEnd}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {activeFeaturedBlogs.map((blog, idx) => (
                              <BlogCard
                                   key={blog._id || blog.id || idx}
                                   blog={blog}
                                   height="h-62.5 md:h-95"
                                   priority={idx < 2}
                                   fetchPriority={idx === 0 ? "high" : undefined}
                              />
                         ))}
                    </div>
               </div>
          </>
     );
}
