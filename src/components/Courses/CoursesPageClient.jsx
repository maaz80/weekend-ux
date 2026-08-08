"use client";

import { useState } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import CourseCard from "@/components/Courses/CourseCard";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useUserAuth } from "@/context/UserAuthContext";
import { GraduationCap, BookOpen, Lock, Unlock, LayoutGrid } from "lucide-react";

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

/**
 * CoursesPageClient — handles interactive search/filter/pagination.
 * All data is passed as props from the server page (fetched at build time).
 * No API calls, no context needed.
 */
export default function CoursesPageClient({ coursesData }) {
     const { user, isLoggedIn, isCourseUnlocked } = useUserAuth();

     const [searchQuery, setSearchQuery] = useState("");
     const [activeCategory, setActiveCategory] = useState("All");
     const [viewFilter, setViewFilter] = useState("all");
     const [currentPage, setCurrentPage] = useState(1);
     const coursesPerPage = 6;

     const coursesList = coursesData?.course && coursesData.course.length > 0
          ? coursesData.course
          : staticCourses;

     const unlockedCount = coursesList.filter(c => isCourseUnlocked(c)).length;

     const hero = coursesData?.hero?.[0] || {};
     const heroStart = hero.startheading?.trim() || "Explore Our";
     const heroEnd = hero.endheading?.trim() || "Courses";

     const categories = ["All", ...new Set(coursesList.map(c => c.category).filter(Boolean))];

     const handleCategoryChange = (category) => {
          setActiveCategory(category);
          setCurrentPage(1);
     };

     const filteredCourses = coursesList.filter(course => {
          const matchesSearch =
               (course.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
               (course.overview || course.description || course.seodescription || "").toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = activeCategory === "All" || course.category === activeCategory;
          const matchesViewFilter = viewFilter === "all" || (viewFilter === "my-courses" && isCourseUnlocked(course));
          return matchesSearch && matchesCategory && matchesViewFilter;
     });

     const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

     const getPageNumbers = () => {
          const pages = [];
          if (totalPages <= 4) {
               for (let i = 1; i <= totalPages; i++) pages.push(i);
               return pages;
          }
          const start = Math.max(1, Math.min(currentPage, totalPages - 2));
          const actualStart = currentPage < 3 ? 1 : start;
          const end = Math.min(totalPages, actualStart + (currentPage < 3 ? 2 : 2));
          for (let i = actualStart; i <= end; i++) pages.push(i);
          const lastPageInWindow = pages[pages.length - 1];
          if (lastPageInWindow < totalPages) {
               if (totalPages - lastPageInWindow > 1) pages.push("...");
               pages.push(totalPages);
          }
          return pages;
     };

     const displayedCourses = filteredCourses.slice(
          (currentPage - 1) * coursesPerPage,
          currentPage * coursesPerPage
     );

     return (
          <div className="min-h-screen bg-neutral text-white font-urbanist flex flex-col relative pt-22 md:pt-12">
               <Breadcrumb />

               {/* Hero Header Section */}
               <section id="courses-hero" className="relative h-39.5 md:h-104 w-full flex items-center justify-center bg-zinc-950 overflow-hidden">
                    <Image
                         src="/images/weekend-ux-courses-hero-bg.webp"
                         alt="weekend-ux-courses-hero-bg"
                         fill
                         sizes="100vw"
                         priority
                         fetchPriority="high"
                         className="object-cover object-center opacity-60 z-0"
                    />
                    <h1 className="text-[28px] md:text-[58px] 2xl:text-[72px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">
                         {heroStart} <span className="text-official italic">{heroEnd}</span>
                    </h1>
               </section>

               <section className="py-7 md:py-14 bg-[#FCFBF7] bg-cover bg-center border-b border-zinc-100">
                    <div className="custom-width px-4 sm:px-6 lg:px-10">

                         {/* Logged-in User Dashboard Banner */}
                         {isLoggedIn && (
                              <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 md:p-6 mb-8 shadow-sm text-neutral flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                   <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                             <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
                                                  Welcome back, <span className="text-official">{user?.name || "Student"}</span>!
                                             </h2>
                                        </div>
                                        <p className="text-xs md:text-sm text-zinc-500 font-medium">
                                             {user?.email ? `Logged in as ${user.email}` : "Manage your unlocked courses and explore new programs."}
                                        </p>
                                   </div>
                                   <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                        <div className="bg-official/50 border border-official/50 px-4 py-2.5 rounded-xl text-left">
                                             <p className="text-[11px] font-bold text-neutral uppercase tracking-wider">Unlocked Courses</p>
                                             <p className="text-lg font-extrabold text-neutral flex items-center gap-1.5 mt-0.5">
                                                  <GraduationCap size={18} /> {unlockedCount} Purchased
                                             </p>
                                        </div>
                                        <div className="bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl text-left">
                                             <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Total Catalog</p>
                                             <p className="text-lg font-extrabold text-zinc-800 flex items-center gap-1.5 mt-0.5">
                                                  <BookOpen size={18} /> {coursesList.length} Courses
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         )}

                         {/* View Filter Toggle */}
                         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200/60">
                              <div className="inline-flex bg-zinc-200/60 p-1 rounded-xl text-xs font-bold text-zinc-600">
                                   <button
                                        onClick={() => { setViewFilter("all"); setCurrentPage(1); }}
                                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${viewFilter === "all" ? "bg-white text-zinc-900 shadow-sm" : "hover:text-zinc-900"}`}
                                   >
                                        <LayoutGrid size={15} /> All Courses ({coursesList.length})
                                   </button>
                                   {isLoggedIn && (
                                        <button
                                             onClick={() => { setViewFilter("my-courses"); setCurrentPage(1); }}
                                             className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${viewFilter === "my-courses" ? "bg-official text-neutral shadow-sm" : "hover:text-zinc-900"}`}
                                        >
                                             <Unlock size={15} /> My Unlocked Courses ({unlockedCount})
                                        </button>
                                   )}
                              </div>
                              <div className="text-xs text-zinc-500 font-semibold">
                                   Showing <span className="text-zinc-900 font-bold">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
                              </div>
                         </div>

                         {/* Category Filter */}
                         <div className="flex justify-start mb-5 md:mb-14">
                              <div className="flex flex-wrap justify-start gap-1 md:gap-3">
                                   {categories.map((category) => (
                                        <button
                                             key={category}
                                             onClick={() => handleCategoryChange(category)}
                                             className={`px-5 h-8 md:h-12 rounded-lg text-[10px] md:text-[13px] font-medium transition-all duration-300 hover:bg-neutral hover:text-white cursor-pointer ${activeCategory === category
                                                  ? "bg-neutral text-white shadow-md"
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
                                        {displayedCourses.map((course, idx) => (
                                             <div key={course._id} className="w-full max-w-sm text-neutral">
                                                  <CourseCard
                                                       course={course}
                                                       priority={idx < 3 && currentPage === 1}
                                                       fetchPriority={idx === 0 && currentPage === 1 ? "high" : undefined}
                                                  />
                                             </div>
                                        ))}
                                   </div>

                                   {/* Pagination */}
                                   {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-3 mt-16">
                                             <button
                                                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                  aria-label="Previous Page"
                                                  disabled={currentPage === 1}
                                                  className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${currentPage === 1
                                                       ? "border-zinc-200 text-zinc-300 bg-zinc-50 cursor-not-allowed"
                                                       : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-neutral"
                                                       }`}
                                             >
                                                  <FiChevronLeft className="text-lg" />
                                             </button>

                                             {getPageNumbers().map((item, idx) => {
                                                  if (item === "...") {
                                                       return (
                                                            <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-zinc-400 select-none">
                                                                 ...
                                                            </span>
                                                       );
                                                  }
                                                  return (
                                                       <button
                                                            key={`page-${item}`}
                                                            onClick={() => setCurrentPage(item)}
                                                            className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${currentPage === item
                                                                 ? "bg-official text-neutral border-transparent shadow-sm"
                                                                 : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-neutral"
                                                                 }`}
                                                       >
                                                            {item}
                                                       </button>
                                                  );
                                             })}

                                             <button
                                                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                  aria-label="Next Page"
                                                  disabled={currentPage === totalPages}
                                                  className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${currentPage === totalPages
                                                       ? "border-zinc-200 text-zinc-300 bg-zinc-50 cursor-not-allowed"
                                                       : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-neutral"
                                                       }`}
                                             >
                                                  <FiChevronRight className="text-lg" />
                                             </button>
                                        </div>
                                   )}
                              </div>
                         ) : viewFilter === "my-courses" ? (
                              <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center max-w-lg mx-auto space-y-4 my-8 shadow-sm">
                                   <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                                        <Lock size={28} />
                                   </div>
                                   <h3 className="text-xl font-bold text-zinc-900 font-playfair">No Unlocked Courses Yet</h3>
                                   <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                                        You haven't unlocked any courses yet. Explore our full catalog and view course details to get instant access!
                                   </p>
                                   <button
                                        onClick={() => { setViewFilter("all"); setActiveCategory("All"); setSearchQuery(""); }}
                                        className="px-6 py-3 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition cursor-pointer shadow-md"
                                   >
                                        Explore All Courses
                                   </button>
                              </div>
                         ) : (
                              <div className="text-center py-20">
                                   <p className="text-zinc-500 text-lg">No courses found matching your criteria.</p>
                                   <button
                                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); setViewFilter("all"); }}
                                        className="mt-4 text-official font-medium hover:underline cursor-pointer"
                                   >
                                        Reset Filters
                                   </button>
                              </div>
                         )}
                    </div>
               </section>

               <Testimonials />
               <RelatedBlogs data={coursesData?.relatedBlogs} />
               <FAQ paddings="py-20" />
          </div>
     );
}
