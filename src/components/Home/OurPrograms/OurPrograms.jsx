"use client";

import { useState } from "react";
import ProgramsSidebar from './ProgramSidebar';
import CourseCard from './CourseCard';
import { useHomeData } from "@/context/HomeDataContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
const OurPrograms = ({ data }) => {
     const { homeData, coursesData } = useHomeData();
     const [activeMobileIndex, setActiveMobileIndex] = useState(null);
     const [activeCategory, setActiveCategory] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const coursesPerPage = 4;

     const rawCourses = coursesData?.course;
     const hasValidCourses = Array.isArray(rawCourses) && rawCourses.length > 0 && rawCourses.some(c => c.title && c.title.trim());

     const courses = hasValidCourses
          ? rawCourses.filter(c => c.title && c.title.trim()).map((c, idx) => {
               return {
                    _id: c._id || String(idx + 1),
                    slug: c.slug && c.slug.trim() ? c.slug : `course-${idx + 1}`,
                    title: c.title.trim(),
                    category: c.category && c.category.trim() ? c.category : "UI & UX Design",
                    description: c.overview && c.overview.trim() ? c.overview.trim() : (c.seodescription && c.seodescription.trim() ? c.seodescription.trim() : "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and"),
                    image: c.image && c.image.trim() ? c.image.trim() : "/images/weekend-ux-program-image-template.webp",
                    alt: c.alt && c.alt.trim() ? c.alt.trim() : c.title.trim(),
                    deadline: c.startdate && c.startdate.trim() ? c.startdate.trim() : "10th Dec, 26",
                    courseLength: c.courselength && c.courselength.trim() ? c.courselength.trim() : "6 Months"
               };
          })
          : staticCourses;

     const categories = [...new Set(courses.map(c => c.category).filter(Boolean))];
     const currentCategory = activeCategory || null;

     const filteredCourses = !currentCategory
          ? courses
          : courses.filter(c => c.category === currentCategory);

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

     const courseConf = homeData?.course;

     const title = (courseConf?.title && courseConf.title.trim())
          ? courseConf.title
          : "Our Courses";

     const startheading = (courseConf?.startheading && courseConf.startheading.trim())
          ? courseConf.startheading
          : "Every";

     const midheading = (courseConf?.midheading && courseConf.midheading.trim())
          ? courseConf.midheading
          : "Course";

     const endheading = (courseConf?.endheading && courseConf.endheading.trim())
          ? courseConf.endheading
          : " We Teach.\nPick Yours";

     const description = (courseConf?.description && courseConf.description.trim())
          ? courseConf.description
          : "browse full syllabuses, pick your level, and choose between in-person batches or recordings. Content only unlocks after you enroll — no online access.";

     return (
          <section
               id="courses"
               className="w-full bg-[#FCFBF7] bg-cover bg-center py-20 border-t border-zinc-100"
               style={{ backgroundImage: "url('/images/weekend-ux-programs-bg.webp')" }}
          >
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">

                    {/* Heading Area */}
                    <div className="text-center mb-16">
                         <p className="text-[12px] font-semibold tracking-[0.25em] text-official uppercase font-inter mb-3">
                              {title}
                         </p>
                         <h2 className="font-playfair text-[38px] md:text-[56px] leading-tight text-zinc-900 font-medium">
                              {startheading}{" "}
                              {midheading && <span className="italic text-official font-normal">{midheading}</span>}
                              {endheading && (
                                   <>
                                        {endheading.startsWith(" ") ? "" : " "}
                                        {endheading.split('\n').map((line, index) => (
                                             <span key={index}>
                                                  {index > 0 && <br />}
                                                  {line}
                                             </span>
                                        ))}
                                   </>
                              )}
                         </h2>
                         <p className="mt-4 mx-auto max-w-155 text-sm md:text-base text-zinc-500 leading-relaxed font-urbanist">
                              {description}
                         </p>
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className="hidden md:flex mt-10 items-start justify-between gap-10">
                         {/* Categories Sidebar */}
                         <div className="space-y-1.5 w-[28%] xl:w-[22%] shrink-0 sticky top-36 self-start">
                              {/* Static Heading */}
                              <div className="w-full text-[13px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-3 text-left pl-4 select-none">
                                   Categories
                              </div>
                              {categories.map((cat) => (
                                   <ProgramsSidebar
                                        key={cat}
                                        category={cat}
                                        isActive={currentCategory === cat}
                                        onClick={() => {
                                             setActiveCategory(currentCategory === cat ? null : cat);
                                             setCurrentPage(1);
                                        }}
                                   />
                              ))}
                         </div>
                         {/* Course Cards Column with Pagination */}
                         <div className="flex-1 w-[70%] xl:w-[75%] flex flex-col gap-8 ">
                              {/* Grid */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                                   {displayedCourses.map((course, idx) => (
                                        <CourseCard
                                             key={course._id}
                                             course={course}
                                             setIsModal={false}
                                             priority={idx === 0 && currentPage === 1}
                                             fetchPriority={idx === 0 && currentPage === 1 ? "high" : undefined}
                                        />
                                   ))}
                              </div>

                              {/* Professional Pagination */}
                              {totalPages > 1 && (
                                   <div className="flex items-center justify-center gap-3 mt-4">
                                        {/* Previous button */}
                                        <button
                                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                             aria-label="Previous Page"
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
                                                            ? "bg-official text-black border-transparent shadow-sm font-bold"
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
                                             aria-label="Next Page"
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
                    </div>

                    {/* MOBILE VIEW */}
                    <div className="md:hidden mt-8 space-y-3">
                         {/* Static Heading */}
                         <div className="w-full text-[12px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-4 text-left pl-2 select-none">
                              Categories
                         </div>

                         {/* All Courses shown initially when no category is active/open */}
                         {activeMobileIndex === null && (
                              <div className="mb-6">
                                   <h3 className="text-[14px] font-bold text-zinc-800 mb-3 pl-2">All Courses</h3>
                                   <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                                        {courses.map((course) => (
                                             <div key={course._id} className="min-w-70 shrink-0">
                                                  <CourseCard course={course} />
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         )}

                         {categories.map((cat, index) => {
                              const isOpen = activeMobileIndex === index;
                              const categoryCourses = courses.filter((c) => c.category === cat);

                              return (
                                   <div key={cat} className="overflow-hidden">
                                        {/* Sidebar header click */}
                                        <div
                                             onClick={() =>
                                                  setActiveMobileIndex(isOpen ? null : index)
                                             }
                                             className="cursor-pointer"
                                        >
                                             <ProgramsSidebar
                                                  category={cat}
                                                  isActive={isOpen}
                                             />
                                        </div>

                                        {/* Accordion content */}
                                        <div
                                             className={`
                                                  overflow-hidden transition-all duration-500 ease-in-out
                                                  ${isOpen ? 'max-h-[80vh] opacity-100 mt-3' : 'max-h-0 opacity-0'}
                                             `}
                                        >
                                             <div
                                                  className={`
                                                       flex gap-4 overflow-x-auto hide-scrollbar pb-2
                                                       transform transition-transform duration-500 ease-in-out
                                                       ${isOpen ? 'translate-y-0' : '-translate-y-4'}
                                                  `}
                                             >
                                                  {categoryCourses.map((course) => (
                                                       <div
                                                            key={course._id}
                                                            className="min-w-70 shrink-0"
                                                       >
                                                            <CourseCard course={course} />
                                                       </div>
                                                  ))}
                                             </div>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>

               </div>
          </section>
     );
}

export default OurPrograms;