"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Lock, Unlock } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import CourseLockedModal from "@/components/CourseLockedModal";

const CourseImage = '/images/weekend-ux-program-image-template.webp';

export default function CourseCard({ course, setIsModal = false, priority = false, fetchPriority = undefined }) {
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
                    className="w-73.5 md:w-full rounded-2xl border min-h-100 md:min-h-114 border-zinc-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col cursor-pointer group relative"
               >
                    {/* Image section */}
                    <div className="relative rounded-t-2xl rounded-b-none overflow-hidden h-50 md:h-60.5 w-full bg-zinc-100">
                         <OptimizedImage
                              src={imageSrc}
                              alt={course?.alt || "weekend-ux-program-image-template"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 320px"
                              priority={priority}
                              fetchPriority={fetchPriority}
                         />

                         {/* Status Badge */}
                         <div className="absolute top-3 right-3 z-10">
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
                    <div className="p-2 md:p-3 flex flex-col grow justify-between">
                         <div>
                              {/* Title */}
                              <h2 className="font-urbanist text-[18px] md:text-[23px] 2xl:text-[24px] font-bold leading-8 md:leading-9 text-zinc-900 min-h-14 flex items-center group-hover:text-official transition-colors">
                                   {course?.title}
                              </h2>

                              {/* Description */}
                              <p className="mt-2 text-xs md:text-[16px] text-zinc-500 font-urbanist line-clamp-2 leading-6">
                                   {course?.description || course?.overview || "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and"}
                              </p>
                         </div>

                         {/* Metadata */}
                         <div className="flex items-center justify-between text-[13px] md:text-[16px] text-zinc-800 font-bold font-urbanist mt-auto pt-4 border-t border-zinc-50">
                              <p>
                                   <span className="text-zinc-500 font-normal">Starts:</span> {course?.deadline || "10th Dec, 26"}
                              </p>

                              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition ${unlocked ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                   {unlocked ? "View Course →" : "Unlock 🔒"}
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
