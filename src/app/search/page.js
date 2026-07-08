'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiClock, FiBookOpen, FiFilter, FiCompass } from "react-icons/fi";
import { useHomeData } from "@/context/HomeDataContext";
import OptimizedImage from "@/components/ui/OptimizedImage";
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
     const [sortBy, setSortBy] = useState("default");

     // Sync search query and category with URL search params
     useEffect(() => {
          const q = searchParams.get("q") || "";
          const cat = searchParams.get("category") || "All";
          setSearchQuery(q);
          setSelectedCategory(cat);
     }, [searchParams]);

     const courses = coursesData?.course || [];

     // Filter courses based on query and selected category
     const query = searchQuery.trim().toLowerCase();

     // 1. Direct Matching Courses
     const directMatches = courses.filter((course) => {
          const matchesText = query === "" ||
               course.title?.toLowerCase().includes(query) ||
               course.overview?.toLowerCase().includes(query) ||
               course.category?.toLowerCase().includes(query);

          const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

          return matchesText && matchesCategory;
     });

     // Find all categories in the database for the filter list and counts
     const categoriesList = ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))];

     // Categories matching the search query to show as "Category Suggestions"
     const suggestedCategories = categoriesList.filter(
          (cat) => cat !== "All" && cat.toLowerCase().includes(query)
     );

     // 2. Related Suggestions (Courses in the same categories as direct matches, but not direct matches themselves)
     const directCategories = [...new Set(directMatches.map((c) => c.category).filter(Boolean))];
     const relatedSuggestions = courses.filter((course) => {
          // Belongs to the categories of our matches
          const inSameCategory = directCategories.includes(course.category);
          // Is not already in the direct matches
          const isNotDirectMatch = !directMatches.some((dm) => dm._id === course._id);
          // Matches the category filter if set
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
          // Clear text search when switching categories so they see all courses in that category
          if (category !== "All") {
               router.push(`/search?category=${encodeURIComponent(category)}`, { scroll: false });
               setSearchQuery("");
          } else {
               router.push(`/search`, { scroll: false });
               setSearchQuery("");
          }
     };

     return (
          <div className="min-h-screen pb-20 pt-16 md:pt-12 font-urbanist bg-white relative">
               <Breadcrumb />

               {/* HEADER */}
               <div className=" text-white h-62.5 md:h-104 w-full z-999 flex flex-col items-center justify-end md:justify-center text-center relative overflow-hidden pb-5 md:pb-0">
                    <Image
                         src='/images/weekend-ux-policy-hero-bg.webp'
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         fetchPriority="high"
                         className="object-cover object-center z-0"
                    />
                    <div className="max-w-5xl mx-auto z-10 relative">
                         <span className="text-official text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-md">
                              Search Results
                         </span>
                         <h1 className="text-3xl md:text-5xl font-light mt-4 tracking-wide leading-tight">
                              Showing results for: <span className="text-official font-semibold">"{initialQuery || "All Courses"}"</span>
                         </h1>
                         <p className="text-zinc-400 text-sm md:text-base font-medium mt-3">
                              We found {directMatches.length} matching courses {relatedSuggestions.length > 0 && `and ${relatedSuggestions.length} related suggestions`} for you
                         </p>
                    </div>
                    {/* Decorative Background grid lines */}
                    {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div> */}
               </div>

               {/* MAIN CONTENT CONTAINER */}
               <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10">

                    {/* LOADING STATE */}
                    {loading ? (
                         <div className="flex flex-col items-center justify-center py-24 gap-4">
                              <div className="w-10 h-10 border-4 border-official border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-zinc-500 font-bold text-sm">Loading search results...</span>
                         </div>
                    ) : (

                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                              {/* LEFT SIDEBAR - FILTERS & SUGGESTIONS */}
                              <div className="lg:col-span-3 flex flex-col gap-6">

                                   {/* SEARCH WIDGET */}
                                   <div className="bg-white border border-zinc-250/60 p-5 rounded-md shadow-sm text-left">
                                        <h3 className="text-sm font-bold text-neutral mb-3 flex items-center gap-2">
                                             <FiSearch className="text-official" />
                                             Refine Search
                                        </h3>
                                        <form onSubmit={handleSearchSubmit} className="relative">
                                             <input
                                                  type="text"
                                                  value={searchQuery}
                                                  onChange={(e) => setSearchQuery(e.target.value)}
                                                  placeholder="Search courses..."
                                                  className="w-full h-11 pl-4 pr-10 rounded-md border border-zinc-200 bg-zinc-50 outline-none text-sm text-neutral focus:border-official transition-all duration-300"
                                             />
                                             <button
                                                  type="submit"
                                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-official transition-colors cursor-pointer"
                                             >
                                                  <FiSearch size={16} />
                                             </button>
                                        </form>
                                   </div>

                                   {/* CATEGORY FILTERS */}
                                   <div className="bg-white border border-zinc-250/60 p-5 rounded-md shadow-sm text-left">
                                        <h3 className="text-sm font-bold text-neutral mb-3 flex items-center gap-2">
                                             <FiFilter className="text-official" />
                                             Filter by Category
                                        </h3>
                                        <div className="flex flex-col gap-1.5 mt-2">
                                             {categoriesList.map((cat) => {
                                                  // Count courses in this category
                                                  const count = cat === "All"
                                                       ? courses.length
                                                       : courses.filter(c => c.category === cat).length;

                                                  const isSelected = selectedCategory === cat;

                                                  return (
                                                       <button
                                                            key={cat}
                                                            type="button"
                                                            onClick={() => selectCategory(cat)}
                                                            className={`w-full flex items-center justify-between text-xs px-3 py-2.5 rounded-md font-semibold transition-all duration-200 cursor-pointer ${isSelected
                                                                      ? "bg-official text-neutral shadow-sm"
                                                                      : "bg-zinc-50 text-neutral-700 hover:bg-zinc-100"
                                                                 }`}
                                                       >
                                                            <span>{cat}</span>
                                                            <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${isSelected ? 'bg-neutral text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                                                                 {count}
                                                            </span>
                                                       </button>
                                                  );
                                             })}
                                        </div>
                                   </div>

                                   {/* CATEGORY SUGGESTIONS */}
                                   {suggestedCategories.length > 0 && (
                                        <div className="bg-white border border-zinc-250/60 p-5 rounded-md shadow-sm text-left animate-fadeIn">
                                             <h3 className="text-sm font-bold text-neutral mb-2 flex items-center gap-2">
                                                  <FiCompass className="text-official" />
                                                  Suggested Categories
                                             </h3>
                                             <p className="text-[11px] text-zinc-400 mb-3">Based on your query, check these categories:</p>
                                             <div className="flex flex-wrap gap-1.5">
                                                  {suggestedCategories.map((cat) => (
                                                       <button
                                                            key={cat}
                                                            type="button"
                                                            onClick={() => selectCategory(cat)}
                                                            className="border border-official/40 text-neutral-800 bg-white hover:bg-official hover:text-neutral transition-all text-xs font-semibold px-2.5 py-1.5 rounded-md cursor-pointer shadow-sm shrink-0"
                                                       >
                                                            {cat}
                                                       </button>
                                                  ))}
                                             </div>
                                        </div>
                                   )}

                              </div>

                              {/* RIGHT MAIN - RESULTS IN BAR FORMAT */}
                              <div className="lg:col-span-9 flex flex-col gap-6">

                                   {/* DIRECT MATCHES SECTION */}
                                   <div>
                                        <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-6 text-left">
                                             <h2 className="text-lg font-bold text-neutral flex items-center gap-2">
                                                  <FiBookOpen className="text-official" />
                                                  Matching Courses ({directMatches.length})
                                             </h2>
                                        </div>

                                        {directMatches.length > 0 ? (
                                             <div className="flex flex-col gap-4">
                                                  {directMatches.map((course) => (
                                                       <div
                                                            key={course._id || course.slug}
                                                            className="bg-white border border-zinc-200 rounded-md p-4 flex flex-col md:flex-row gap-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300"
                                                       >
                                                            {/* Course Image */}
                                                            {course.image && (
                                                                 <div className="w-full md:w-56 h-36 shrink-0 overflow-hidden rounded-md bg-zinc-100 relative shadow-sm border border-zinc-100">
                                                                      <img
                                                                           src={course.image}
                                                                           alt={course.title}
                                                                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                      />
                                                                 </div>
                                                            )}

                                                            {/* Course Details */}
                                                            <div className="flex-1 flex flex-col justify-between text-left min-w-0">
                                                                 <div>
                                                                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                                                                           <span className="bg-official/10 text-neutral text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                                                                                {course.category}
                                                                           </span>
                                                                           <span className="text-zinc-500 text-xs font-semibold flex items-center gap-1">
                                                                                <FiClock size={12} />
                                                                                {course.courselength || "12 Weeks"}
                                                                           </span>
                                                                      </div>
                                                                      <h3 className="text-lg font-extrabold text-neutral mb-2 hover:text-official transition-colors">
                                                                           {course.title}
                                                                      </h3>
                                                                      <p className="text-zinc-600 text-xs md:text-sm line-clamp-2 leading-relaxed">
                                                                           {course.overview || "Explore professional curriculum in UI/UX Design and develop real world portfolio projects."}
                                                                      </p>
                                                                 </div>

                                                                 {/* Footer row inside the bar */}
                                                                 <div className="flex items-center justify-between mt-4 border-t border-zinc-150 pt-3">
                                                                      <span className="text-[11px] text-zinc-400 font-medium">
                                                                           Professional Syllabus • Beginner to Pro
                                                                      </span>
                                                                      <Link
                                                                           href={`/${course.slug || course._id}`}
                                                                           className="bg-neutral hover:bg-official hover:text-neutral text-white text-xs font-bold px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
                                                                      >
                                                                           Explore Course
                                                                      </Link>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  ))}
                                             </div>
                                        ) : (
                                             <div className="bg-white border border-zinc-200 rounded-md py-16 px-4 text-center">
                                                  <FiBookOpen size={40} className="mx-auto text-zinc-300 mb-3" />
                                                  <p className="text-zinc-500 font-bold text-sm">No courses directly match your search query.</p>
                                                  <p className="text-zinc-400 text-xs mt-1">Try refining your search terms or select a category on the left.</p>
                                             </div>
                                        )}
                                   </div>

                                   {/* RELATED SUGGESTIONS SECTION */}
                                   {relatedSuggestions.length > 0 && (
                                        <div className="mt-8 animate-fadeIn">
                                             <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-6 text-left">
                                                  <h2 className="text-lg font-bold text-neutral flex items-center gap-2">
                                                       <FiCompass className="text-official" />
                                                       Related Suggestions ({relatedSuggestions.length})
                                                  </h2>
                                             </div>
                                             <div className="flex flex-col gap-4">
                                                  {relatedSuggestions.slice(0, 5).map((course) => (
                                                       <div
                                                            key={course._id || course.slug}
                                                            className="bg-white border border-zinc-200 rounded-md p-4 flex flex-col md:flex-row gap-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 opacity-90 hover:opacity-100"
                                                       >
                                                            {/* Course Image */}
                                                            {course.image && (
                                                                 <div className="w-full md:w-56 h-36 shrink-0 overflow-hidden rounded-md bg-zinc-100 relative shadow-sm border border-zinc-100">
                                                                      <img
                                                                           src={course.image}
                                                                           alt={course.title}
                                                                           className="w-full h-full object-cover"
                                                                      />
                                                                 </div>
                                                            )}

                                                            {/* Course Details */}
                                                            <div className="flex-1 flex flex-col justify-between text-left min-w-0">
                                                                 <div>
                                                                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                                                                           <span className="bg-zinc-100 text-zinc-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wide border border-zinc-200">
                                                                                {course.category}
                                                                           </span>
                                                                           <span className="text-zinc-500 text-xs font-semibold flex items-center gap-1">
                                                                                <FiClock size={12} />
                                                                                {course.courselength || "12 Weeks"}
                                                                           </span>
                                                                      </div>
                                                                      <h3 className="text-lg font-extrabold text-neutral mb-2 hover:text-official transition-colors">
                                                                           {course.title}
                                                                      </h3>
                                                                      <p className="text-zinc-600 text-xs md:text-sm line-clamp-2 leading-relaxed">
                                                                           {course.overview || "Explore professional curriculum in UI/UX Design and develop real world portfolio projects."}
                                                                      </p>
                                                                 </div>

                                                                 {/* Footer */}
                                                                 <div className="flex items-center justify-between mt-4 border-t border-zinc-150 pt-3">
                                                                      <span className="text-[11px] text-zinc-400 font-medium">
                                                                           Suggested course in same category
                                                                      </span>
                                                                      <Link
                                                                           href={`/${course.slug || course._id}`}
                                                                           className="bg-neutral hover:bg-official hover:text-neutral text-white text-xs font-bold px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
                                                                      >
                                                                           Explore Course
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

          </div>
     );
};

export default function SearchPage() {
     return (
          <Suspense fallback={
               <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-zinc-50/50">
                    <div className="w-10 h-10 border-4 border-official border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-zinc-500 font-bold text-sm">Loading search...</span>
               </div>
          }>
               <SearchResultsContent />
               <RelatedBlogs />
               <FAQ />
          </Suspense>
     );
}
