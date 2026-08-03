'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiBookOpen, FiFilter, FiCompass, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useHomeData } from "@/context/HomeDataContext";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

const SearchResultsContent = () => {
     const searchParams = useSearchParams();
     const router = useRouter();
     const { coursesData, loading } = useHomeData();

     const initialQuery = searchParams.get("q") || "";
     const [searchQuery, setSearchQuery] = useState(initialQuery);
     const [selectedCategory, setSelectedCategory] = useState("All");

     // Sync search query and category with URL search params
     useEffect(() => {
          const q = searchParams.get("q") || "";
          const cat = searchParams.get("category") || "All";
          setSearchQuery(q);
          setSelectedCategory(cat);
     }, [searchParams]);

     const getCourseList = (data) => {
          if (!data) return [];
          if (Array.isArray(data)) return data;
          if (Array.isArray(data.course)) return data.course;
          if (Array.isArray(data.courses)) return data.courses;
          if (Array.isArray(data.data)) return data.data;
          return [];
     };

     const courses = getCourseList(coursesData);

     // Filter courses based on query and selected category
     const query = searchQuery.trim().toLowerCase();

     // 1. Direct Matching Courses
     const directMatches = courses.filter((course) => {
          const matchesText = query === "" ||
               course.title?.toLowerCase().includes(query) ||
               course.overview?.toLowerCase().includes(query) ||
               course.category?.toLowerCase().includes(query) ||
               course.slug?.toLowerCase().includes(query) ||
               course.seotitle?.toLowerCase().includes(query) ||
               (course.chapter && Array.isArray(course.chapter) && course.chapter.some(ch =>
                    ch.chaptername?.toLowerCase().includes(query) ||
                    (ch.lessons && Array.isArray(ch.lessons) && ch.lessons.some(les => les.lessonname?.toLowerCase().includes(query)))
               ));

          const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

          return matchesText && matchesCategory;
     });

     // Find all categories in the database for the filter list
     const categoriesList = ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))];

     // Categories matching the search query to show as "Category Suggestions"
     const suggestedCategories = categoriesList.filter(
          (cat) => cat !== "All" && cat.toLowerCase().includes(query)
     );

     // 2. Related Suggestions
     const directCategories = [...new Set(directMatches.map((c) => c.category).filter(Boolean))];
     const relatedSuggestions = courses.filter((course) => {
          const inSameCategory = directCategories.includes(course.category);
          const isNotDirectMatch = !directMatches.some((dm) => dm._id === course._id);
          const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

          return inSameCategory && isNotDirectMatch && matchesCategory;
     });

     const handleSearchSubmit = (e) => {
          e.preventDefault();
          if (selectedCategory !== "All") {
               router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&category=${encodeURIComponent(selectedCategory)}`);
          } else {
               router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
          }
     };

     const selectCategory = (category) => {
          setSelectedCategory(category);
          if (category !== "All") {
               router.push(`/search?category=${encodeURIComponent(category)}`, { scroll: false });
               setSearchQuery("");
          } else {
               router.push(`/search`, { scroll: false });
               setSearchQuery("");
          }
     };

     return (
          <div className="min-h-screen bg-neutral text-white font-urbanist flex flex-col relative pt-22 md:pt-12">
               <Breadcrumb />

               {/* HERO HEADER - NO OVERLAPPING */}
               <section className="relative h-56 md:h-80 w-full flex flex-col items-center justify-center bg-zinc-950 text-center overflow-hidden px-4">
                    <Image
                         src='/images/weekend-ux-policy-hero-bg.webp'
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         fetchPriority="high"
                         className="object-cover object-center opacity-50 z-0"
                    />
                    <div className="max-w-4xl mx-auto z-15 relative space-y-3">
                         <span className="bg-official/20 text-official border border-official/40 text-[11px] font-extrabold tracking-widest uppercase px-3.5 py-1 rounded-full inline-block">
                              Search Explorer
                         </span>
                         <h1 className="text-2xl md:text-5xl font-light tracking-wide text-white leading-tight">
                              Showing results for: <span className="text-official font-extrabold italic">"{initialQuery || "All Courses"}"</span>
                         </h1>
                         <p className="text-zinc-400 text-xs md:text-sm font-medium max-w-2xl mx-auto">
                              We found <span className="text-white font-bold">{directMatches.length}</span> matching course{directMatches.length === 1 ? '' : 's'}
                              {relatedSuggestions.length > 0 && ` and ${relatedSuggestions.length} related recommendations`}
                         </p>
                    </div>
               </section>

               {/* MAIN CONTENT SECTION WITH CLEAN WARM BACKGROUND */}
               <section className="py-8 md:py-14 bg-[#FCFBF7] text-neutral flex-1 border-t border-zinc-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                         {/* LOADING STATE */}
                         {loading ? (
                              <div className="bg-white rounded-2xl border border-zinc-200 p-12 flex flex-col items-center justify-center gap-4 my-8 shadow-sm">
                                   <div className="w-10 h-10 border-4 border-official border-t-transparent rounded-full animate-spin"></div>
                                   <span className="text-zinc-600 font-bold text-sm">Searching our course catalog...</span>
                              </div>
                         ) : (

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                   {/* LEFT SIDEBAR - FILTERS & SEARCH */}
                                   <div className="lg:col-span-4 flex flex-col gap-6">

                                        {/* REFINE SEARCH WIDGET */}
                                        <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-sm text-left">
                                             <h3 className="text-xs font-extrabold text-neutral mb-3 flex items-center gap-2 uppercase tracking-wider">
                                                  <FiSearch className="text-official text-base" />
                                                  Refine Search
                                             </h3>
                                             <form onSubmit={handleSearchSubmit} className="relative">
                                                  <input
                                                       type="text"
                                                       value={searchQuery}
                                                       onChange={(e) => setSearchQuery(e.target.value)}
                                                       placeholder="Search courses by keyword..."
                                                            className="w-full h-11 pl-4 pr-11 rounded-xl border border-[#EDE9DC] bg-zinc-50/50 outline-none text-xs text-neutral focus:bg-white focus:border-[#dad7ce] transition-all duration-200"
                                                  />
                                                  <button
                                                       type="submit"
                                                       className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-official hover:bg-yellow-400 text-neutral flex items-center justify-center transition-colors cursor-pointer shadow-xs font-bold"
                                                  >
                                                       <FiSearch size={14} />
                                                  </button>
                                             </form>
                                        </div>

                                        {/* CATEGORY FILTER CARD */}
                                        <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-sm text-left">
                                             <h3 className="text-xs font-extrabold text-neutral mb-3.5 flex items-center gap-2 uppercase tracking-wider">
                                                  <FiFilter className="text-official text-base" />
                                                  Filter by Category
                                             </h3>
                                             <div className="flex flex-col gap-2">
                                                  {categoriesList.map((cat) => {
                                                       const count = cat === "All"
                                                            ? courses.length
                                                            : courses.filter(c => c.category === cat).length;

                                                       const isSelected = selectedCategory === cat;

                                                       return (
                                                            <button
                                                                 key={cat}
                                                                 type="button"
                                                                 onClick={() => selectCategory(cat)}
                                                                 className={`w-full flex items-center justify-between text-xs px-3.5 py-2.5 rounded-xl font-bold transition-all duration-200 cursor-pointer ${isSelected
                                                                      ? "bg-neutral text-white shadow-sm"
                                                                      : "bg-zinc-50/80 text-zinc-700 hover:bg-zinc-100 hover:text-neutral"
                                                                      }`}
                                                            >
                                                                 <span>{cat}</span>
                                                                 <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isSelected ? 'bg-official text-neutral' : 'bg-zinc-200 text-zinc-600'}`}>
                                                                      {count}
                                                                 </span>
                                                            </button>
                                                       );
                                                  })}
                                             </div>
                                        </div>

                                        {/* CATEGORY SUGGESTIONS */}
                                        {suggestedCategories.length > 0 && (
                                             <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-sm text-left">
                                                  <h3 className="text-xs font-extrabold text-neutral mb-2 flex items-center gap-2 uppercase tracking-wider">
                                                       <FiCompass className="text-official text-base" />
                                                       Suggested Categories
                                                  </h3>
                                                  <p className="text-[11px] text-zinc-400 mb-3">Explore these matching fields:</p>
                                                  <div className="flex flex-wrap gap-2">
                                                       {suggestedCategories.map((cat) => (
                                                            <button
                                                                 key={cat}
                                                                 type="button"
                                                                 onClick={() => selectCategory(cat)}
                                                                 className="border border-[#EDE9DC] bg-zinc-50 hover:bg-official hover:border-official hover:text-neutral/60 text-neutral/70 transition-all text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer shadow-xs shrink-0"
                                                            >
                                                                 {cat}
                                                            </button>
                                                       ))}
                                                  </div>
                                             </div>
                                        )}

                                   </div>

                                   {/* RIGHT MAIN - COURSE CARDS */}
                                   <div className="lg:col-span-8 flex flex-col gap-6">

                                        {/* DIRECT MATCHES SECTION */}
                                        <div>
                                             <div className="flex items-center justify-between border-b border-zinc-200 pb-3.5 mb-6 text-left">
                                                  <h2 className="text-lg md:text-xl font-extrabold text-neutral flex items-center gap-2">
                                                       <FiBookOpen className="text-official" />
                                                       Matching Courses ({directMatches.length})
                                                  </h2>
                                             </div>

                                             {directMatches.length > 0 ? (
                                                  <div className="flex flex-col gap-5">
                                                       {directMatches.map((course) => (
                                                            <div
                                                                 key={course._id || course.slug}
                                                                 className="group bg-white rounded-2xl border border-zinc-200/80 p-4 md:p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 text-left"
                                                            >
                                                                 {/* Course Image */}
                                                                 {course.image && (
                                                                      <div className="w-full md:w-70 h-40 shrink-0 overflow-hidden rounded-xl bg-zinc-100 relative shadow-xs border border-zinc-150">
                                                                           <img
                                                                                src={course.image}
                                                                                alt={course.title}
                                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                           />
                                                                      </div>
                                                                 )}

                                                                 {/* Course Details */}
                                                                 <div className="flex-1 flex flex-col justify-between min-w-0">
                                                                      <div>
                                                                           <div className="flex flex-wrap items-center gap-2 mb-2">
                                                                                <span className="bg-official/20 text-neutral border border-official/40 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                                                                                     {course.category || "Design"}
                                                                                </span>
                                                                           </div>
                                                                           <h3 className="text-base md:text-lg font-extrabold text-neutral mb-1.5 group-hover:text-amber-600 transition-colors leading-snug">
                                                                                {course.title}
                                                                           </h3>
                                                                           <p className="text-zinc-600 text-xs md:text-sm line-clamp-2 leading-relaxed">
                                                                                {course.overview || "Explore professional curriculum in UI/UX Design and develop real world portfolio projects."}
                                                                           </p>
                                                                      </div>

                                                                      {/* Footer row */}
                                                                      <div className="flex items-center justify-between mt-4 border-t border-[#EDE9DC] pt-3">
                                                                           <span className="text-[11px] text-zinc-500 font-semibold flex items-center gap-1">
                                                                                <FiCheckCircle className="text-emerald-600 text-sm" />
                                                                                Industry Certificate Included
                                                                           </span>
                                                                           <Link
                                                                                href={`/courses/${course.slug || course._id}`}
                                                                                className="bg-neutral hover:bg-official hover:text-neutral text-white text-xs font-extrabold px-4.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
                                                                           >
                                                                                <span>Explore Course</span>
                                                                                <FiArrowRight className="text-xs" />
                                                                           </Link>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       ))}
                                                  </div>
                                             ) : (
                                                  <div className="bg-white rounded-2xl border border-zinc-200 py-14 px-6 text-center shadow-sm">
                                                       <div className="w-14 h-14 bg-zinc-100 text-zinc-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                                            <FiBookOpen size={24} />
                                                       </div>
                                                       <h3 className="text-base font-bold text-neutral mb-1">No matching courses found</h3>
                                                       <p className="text-zinc-500 text-xs max-w-md mx-auto">
                                                            We couldn't find any courses matching <span className="font-bold text-neutral">"{searchQuery}"</span>. Try refining your search or pick a category on the left.
                                                       </p>
                                                  </div>
                                             )}
                                        </div>

                                        {/* RELATED SUGGESTIONS SECTION */}
                                        {relatedSuggestions.length > 0 && (
                                             <div className="mt-6">
                                                  <div className="flex items-center justify-between border-b border-zinc-200 pb-3.5 mb-6 text-left">
                                                       <h2 className="text-lg md:text-xl font-extrabold text-neutral flex items-center gap-2">
                                                            <FiCompass className="text-official" />
                                                            Related Suggestions ({relatedSuggestions.length})
                                                       </h2>
                                                  </div>
                                                  <div className="flex flex-col gap-5">
                                                       {relatedSuggestions.slice(0, 5).map((course) => (
                                                            <div
                                                                 key={course._id || course.slug}
                                                                 className="group bg-white rounded-2xl border border-zinc-200/80 p-4 md:p-5 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 text-left opacity-95 hover:opacity-100"
                                                            >
                                                                 {/* Course Image */}
                                                                 {course.image && (
                                                                      <div className="w-full md:w-60 h-40 shrink-0 overflow-hidden rounded-xl bg-zinc-100 relative shadow-xs border border-zinc-150">
                                                                           <img
                                                                                src={course.image}
                                                                                alt={course.title}
                                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                           />
                                                                      </div>
                                                                 )}

                                                                 {/* Course Details */}
                                                                 <div className="flex-1 flex flex-col justify-between min-w-0">
                                                                      <div>
                                                                           <div className="flex flex-wrap items-center gap-2 mb-2">
                                                                                <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                                                                                     {course.category}
                                                                                </span>
                                                                           </div>
                                                                           <h3 className="text-base md:text-lg font-extrabold text-neutral mb-1.5 group-hover:text-amber-600 transition-colors leading-snug">
                                                                                {course.title}
                                                                           </h3>
                                                                           <p className="text-zinc-600 text-xs md:text-sm line-clamp-2 leading-relaxed">
                                                                                {course.overview || "Explore professional curriculum in UI/UX Design and develop real world portfolio projects."}
                                                                           </p>
                                                                      </div>

                                                                      {/* Footer */}
                                                                      <div className="flex items-center justify-between mt-4 border-t border-zinc-150 pt-3">
                                                                           <span className="text-[11px] text-zinc-400 font-semibold">
                                                                                Suggested course in same category
                                                                           </span>
                                                                           <Link
                                                                                href={`/courses/${course.slug || course._id}`}
                                                                                className="bg-neutral hover:bg-official hover:text-neutral text-white text-xs font-extrabold px-4.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
                                                                           >
                                                                                <span>Explore Course</span>
                                                                                <FiArrowRight className="text-xs" />
                                                                           </Link>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       ))}
                                                  </div>
                                             </div>
                                        )}

                                   </div>

                              </div>
                         )}

                    </div>
               </section>

          </div>
     );
};

export default function SearchPage() {
     return (
          <Suspense fallback={
               <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
                    <div className="w-12 h-12 border-4 border-official border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-zinc-400 font-bold text-sm">Loading search...</span>
               </div>
          }>
               <SearchResultsContent />
               <Testimonials />
               <RelatedBlogs />
               <FAQ />
          </Suspense>
     );
}
