"use client";

import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Unlock, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";

const CourseImage = '/images/weekend-ux-program-image-template.webp';

export default function HorizontalCourseCard({ course, unlocked }) {
     const imageSrc = course?.image || CourseImage;
     const title = course?.title || "Course Program";
     const category = course?.category || "UI/UX Design";
     const description = course?.overview || course?.description || course?.seodescription || "Master industry skills with hands-on projects and expert mentorship.";
     const courseLength = course?.courselength || course?.duration || course?.courseLength || "6 Months";
     const deadline = course?.startdate || course?.deadline || "Enrollment Open";

     const targetHref = unlocked ? "/dashboard" : `/courses/${course?.slug || course?._id}`;

     return (
          <Link
               href={targetHref}
               className={`w-full rounded-2xl border transition-all duration-300 flex flex-col md:flex-row overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-md block ${unlocked ? "border-emerald-200 hover:border-emerald-400" : "border-zinc-200/90 hover:border-zinc-300"
                    }`}
          >
               {/* IMAGE CONTAINER (Left) */}
               <div className="relative w-full md:w-80 lg:w-80 h-40 sm:h-48 md:h-auto shrink-0 bg-zinc-100 overflow-hidden">
                    <OptimizedImage
                         src={imageSrc}
                         alt={course?.alt || title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         sizes="(max-width: 768px) 340px, 320px"
                    />

                    {/* Status Badge over Image — sirf unlocked course par 'Unlocked' dikhega */}
                    {unlocked && (
                         <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-md">
                                   <Unlock size={12} className="sm:w-3.5 sm:h-3.5" /> Unlocked
                              </span>
                         </div>
                    )}
               </div>

               {/* CONTENT CONTAINER (Right) */}
               <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow text-neutral">
                    <div className="space-y-1.5">
                         <div className="flex items-center justify-between gap-3">
                              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-official bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                                   {category}
                              </span>
                              {unlocked && (
                                   <span className="text-[11px] sm:text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                        <Sparkles size={12} /> Purchased
                                   </span>
                              )}
                         </div>

                         <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 group-hover:text-official transition-colors line-clamp-2">
                              {title}
                         </h3>

                         <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                              {description}
                         </p>
                    </div>

                    {/* METADATA & BUTTON FOOTER */}
                    <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-3 sm:mt-4">
                         <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-zinc-500">
                              <span className="flex items-center gap-1.5">
                                   <Clock size={13} className="text-zinc-400" /> {courseLength}
                              </span>
                              <span className="flex items-center gap-1.5">
                                   <Calendar size={13} className="text-zinc-400" /> {deadline}
                              </span>
                         </div>

                         <div className="flex flex-wrap items-center justify-end gap-2">
                              {course?.liveClass?.active && course?.liveClass?.meetUrl && (
                                   <a
                                        href={course.liveClass.meetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md animate-pulse z-10"
                                   >
                                        <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
                                        <span>🔴 Join Live Meet ({course.liveClass.scheduledAt || "Live Now"})</span>
                                   </a>
                              )}

                              {unlocked ? (
                                   <span
                                        className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-official text-neutral font-bold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                                   >
                                        <span>Continue Learning</span>
                                        <ArrowRight size={14} />
                                   </span>
                              ) : (
                                   <span
                                        className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-zinc-900 text-white font-bold rounded-xl text-xs hover:bg-zinc-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                                   >
                                        <span>View Details</span>
                                        <ArrowRight size={14} />
                                   </span>
                              )}
                         </div>
                    </div>
               </div>
          </Link>
     );
}
