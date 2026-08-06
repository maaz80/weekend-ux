"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { GoArrowRight } from "react-icons/go";
import { Lock, Unlock } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import CourseLockedModal from "@/components/CourseLockedModal";

const CourseImage = "/images/weekend-ux-program-image-template.webp";

export default function CourseCard({
     course,
     setIsModal = false,
     priority = false,
     fetchPriority = undefined,
     cardBgColor = "bg-white",
     cardBorderColor = "border-[#DCD7CC]",
     cardTitleColor = "text-zinc-900",
     cardSubTitleColor = "text-zinc-500",
     statIconColor = "text-[#F4C430]",
     statTextColor = "text-zinc-700",
     dividerColor = "border-zinc-100",
     buttonBgColor = "bg-white",
     buttonTextColor = "text-zinc-700",
     buttonBorderColor = "border-zinc-300"
}) {
     const router = useRouter();
     const { isCourseUnlocked } = useUserAuth();
     const [showLockModal, setShowLockModal] = useState(false);

     const unlocked = isCourseUnlocked(course);

     const handleClick = (e) => {
          e.stopPropagation();

          if (unlocked) {
               if (setIsModal) setIsModal(false);
               router.push(`/courses/${course.slug || course._id}`);
          } else {
               if (setIsModal) {
                    setIsModal(false);
                    router.push("/contact-us");
               } else {
                    setShowLockModal(true);
               }
          }
     };

     const imageSrc = course?.image || CourseImage;

     return (
          <>
               <div
                    onClick={handleClick}
                    className={`w-full border rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 min-h-100 md:min-h-102.5 max-h-122.5 cursor-pointer group relative ${cardBgColor} ${cardBorderColor}`}
               >
                    {/* Course Image */}
                    <div className="relative h-47.5 md:h-56.5 overflow-hidden bg-zinc-100">
                         <OptimizedImage
                              src={imageSrc}
                              alt={course?.alt || "weekend-ux-program-image-template"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 400px"
                              priority={priority}
                              fetchPriority={fetchPriority}
                         />

                         {/* Status Badge */}
                         <div className="absolute top-3 left-3 z-10">
                              {unlocked ? (
                                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md">
                                        <Unlock size={13} /> Unlocked
                                   </span>
                              ) : (
                                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
                                        <Lock size={13} /> Locked
                                   </span>
                              )}
                         </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)] md:h-[calc(100%-14rem)]">
                         <div>
                              {/* Title */}
                              <h2 className={`font-urbanist pb-2 text-[18px] md:text-[24px] font-bold leading-8 line-clamp-1 group-hover:text-amber-600 transition-colors ${cardTitleColor}`}>
                                   {course?.title}
                              </h2>

                              <div className="w-full line-clamp-3 text-xs md:text-sm text-zinc-600">{course?.overview}</div>
                         </div>

                         {/* Bottom Section */}
                         <div className={`flex items-center justify-between w-full pt-3 border-t ${dividerColor} mt-4`}>
                              <p className={`text-[12px] md:text-[13px] ${statTextColor}`}>
                                   <span className="font-semibold">
                                        Starts:
                                   </span>{" "}
                                   {course?.startdate || course?.deadline || "10th Dec, 26"}
                              </p>

                              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition ${unlocked ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                   {unlocked ? "View Course →" : "Contact to Unlock 🔒"}
                              </span>
                         </div>
                    </div>
               </div>

               <CourseLockedModal
                    isOpen={showLockModal}
                    onClose={() => setShowLockModal(false)}
                    course={course}
               />
          </>
     );
}