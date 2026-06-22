"use client";

// Trigger compilation
import { useState } from "react";
import Image from "next/image";
import CourseCard from "@/components/Courses/CourseCard";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import {  FiChevronLeft, FiChevronRight } from "react-icons/fi";

const staticCourses = [
     {
          _id: "1",
          slug: "advance-certificate-ui-ux",
          title: "Advance Certificate in UI UX",
          category: "UI & UX Design",
          description: "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Advance Certificate in UI UX",
          deadline: "10th Dec, 26",
          courseLength: "6 Months"
     },
     {
          _id: "2",
          slug: "interaction-design-masterclass",
          title: "Interaction Design Masterclass",
          category: "UI & UX Design",
          description: "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Interaction Design Masterclass",
          deadline: "15th Dec, 26",
          courseLength: "3 Months"
     },
     {
          _id: "3",
          slug: "ai-product-design",
          title: "AI-Powered Product Design",
          category: "Generative AI",
          description: "Learn to leverage generative AI models in your design workflows to speed up concept testing.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "AI-Powered Product Design",
          deadline: "10th Dec, 26",
          courseLength: "4 Months"
     },
     {
          _id: "4",
          slug: "generative-ai-ux-creators",
          title: "Generative AI for UX Creators",
          category: "Generative AI",
          description: "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Generative AI for UX Creators",
          deadline: "20th Dec, 26",
          courseLength: "6 Months"
     },
     {
          _id: "5",
          slug: "product-design-foundations",
          title: "Product Design Foundations",
          category: "Product and Design",
          description: "Master user research, business metrics, and interface design to launch successful products.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Product Design Foundations",
          deadline: "1st Jan, 27",
          courseLength: "6 Months"
     },
     {
          _id: "6",
          slug: "service-blueprinting",
          title: "Service Blueprinting Masterclass",
          category: "Service Design",
          description: "Design service blueprints, customer journeys, and backstage processes for modern brands.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Service Blueprinting Masterclass",
          deadline: "10th Jan, 27",
          courseLength: "3 Months"
     },
     {
          _id: "7",
          slug: "midjourney-figma",
          title: "Midjourney & Figma Integration",
          category: "AI Design Tools",
          description: "Integrate generative image creation and collaborative prototyping inside Figma workflows.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Midjourney & Figma Integration",
          deadline: "15th Dec, 26",
          courseLength: "2 Months"
     },
     {
          _id: "8",
          slug: "visual-communication",
          title: "Visual Communication Bootcamp",
          category: "Graphic Design",
          description: "Master typography, color theory, grid systems, and layout principles for digital media.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Visual Communication Bootcamp",
          deadline: "20th Dec, 26",
          courseLength: "4 Months"
     },
     {
          _id: "9",
          slug: "webflow-responsive",
          title: "Webflow & Responsive UI Design",
          category: "Web Design",
          description: "Bridge the gap between design and development by building pixel-perfect websites with Webflow.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Webflow & Responsive UI Design",
          deadline: "10th Dec, 26",
          courseLength: "6 Months"
     },
     {
          _id: "10",
          slug: "advanced-post-production",
          title: "Advanced Post-Production",
          category: "Video Editing",
          description: "Learn color grading, audio mixing, storytelling techniques, and video editing workflows.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Advanced Post-Production",
          deadline: "5th Jan, 27",
          courseLength: "3 Months"
     },
     {
          _id: "11",
          slug: "after-effects-animation",
          title: "After Effects & Animation",
          category: "Motion Graphics",
          description: "Create stunning logo animations, UI transitions, explainer videos, and motion designs.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "After Effects & Animation",
          deadline: "12th Dec, 26",
          courseLength: "4 Months"
     },
     {
          _id: "12",
          slug: "micro-interactions-workshop",
          title: "Micro-interactions Workshop",
          category: "Interaction Design",
          description: "Design delightful micro-interactions, gestures, and state transitions to engage users.",
          image: "/images/weekend-ux-program-image-template.webp",
          alt: "Micro-interactions Workshop",
          deadline: "18th Dec, 26",
          courseLength: "2 Months"
     },
];

export default function CoursesPage() {
     const [searchQuery, setSearchQuery] = useState("");
     const [activeCategory, setActiveCategory] = useState("All");
     const [currentPage, setCurrentPage] = useState(1);
     const coursesPerPage = 6;

     const categories = ["All", ...new Set(staticCourses.map(c => c.category))];

     const handleCategoryChange = (category) => {
          setActiveCategory(category);
          setCurrentPage(1);
     };

     const handleSearchChange = (query) => {
          setSearchQuery(query);
          setCurrentPage(1);
     };

     const filteredCourses = staticCourses.filter(course => {
          const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               course.description.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = activeCategory === "All" || course.category === activeCategory;
          return matchesSearch && matchesCategory;
     });

     const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

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

     const displayedCourses = filteredCourses.slice(
          (currentPage - 1) * coursesPerPage,
          currentPage * coursesPerPage
     );

     return (
          <div className="min-h-screen bg-black text-white font-urbanist flex flex-col">

               {/* Hero Header Section */}
               <section className="relative h-32.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 overflow-hidden">
                    <Image
                         src="/images/weekend-ux-courses-hero-bg.webp"
                         alt="weekend-ux-courses-hero-bg"
                         fill
                         priority
                         className="object-cover object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[28px] md:text-[58px] 2xl:text-[72px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">Explore Our <span className="text-official italic">Courses</span></h1>
               </section>

               {/* Courses Section with warm light background */}
               <section
                    className="py-7 md:py-14 bg-[#FCFBF7] bg-cover bg-center border-b border-zinc-100"

               >
                    <div className="custom-width px-4 sm:px-6 lg:px-10">
                         {/* Search & Category Filter Header */}
                         <div className="flex justify-start mb-5 md:mb-14">
                              <div className="flex flex-wrap justify-start gap-1 md:gap-3 ">
                                   {categories.map((category) => (
                                        <button
                                             key={category}
                                             onClick={() => handleCategoryChange(category)}
                                             className={`px-5 h-8 md:h-12 rounded-lg text-[10px] md:text-[13px] font-medium transition-all duration-300 hover:bg-neutral-900 hover:text-white cursor-pointer ${activeCategory === category
                                                  ? "bg-neutral-900 text-white shadow-md"
                                                  : "bg-transparent text-zinc-600 hover:text-white"
                                                  }`}
                                        >
                                             {category}
                                        </button>
                                   ))}
                              </div>
                         </div>

                         {/* Course Cards Grid */}
                         {displayedCourses.length > 0 ? (
                              <div>
                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                                        {displayedCourses.map((course) => (
                                             <div key={course._id} className="w-full max-w-sm text-black">
                                                  <CourseCard course={course} />
                                             </div>
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
                         ) : (
                              <div className="text-center py-20">
                                   <p className="text-zinc-500 text-lg">No courses found matching your criteria.</p>
                                   <button
                                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                                        className="mt-4 text-yellow font-medium hover:underline cursor-pointer"
                                   >
                                        Reset Filters
                                   </button>
                              </div>
                         )}
                    </div>
               </section>

               {/* Common Shared Components (RelatedBlogs, FAQ, Footer) */}
               <RelatedBlogs />
               <FAQ paddings="py-20" />
               
          </div>
     );
}
