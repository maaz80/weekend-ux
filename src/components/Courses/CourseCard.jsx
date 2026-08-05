"use client";

import { useRouter } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { GoArrowRight } from "react-icons/go";

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

     const handleClick = () => {
          if (setIsModal) setIsModal(false);
          router.push(`/courses/${course.slug || course._id}`);
     };

     const imageSrc = course?.image || CourseImage;

     return (
          <div
               onClick={handleClick}
               className={`w-full border rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 min-h-100 md:min-h-102.5 max-h-122.5 cursor-pointer group ${cardBgColor} ${cardBorderColor}`}
          >

               {/* Course Image */}
               <div className="relative h-47.5 md:h-56.5 overflow-hidden bg-zinc-100">
                    <OptimizedImage
                         src={imageSrc}
                         alt={course?.alt || "weekend-ux-program-image-template"}
                         className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
                         sizes="(max-width: 768px) 100vw, 400px"
                         priority={priority}
                         fetchPriority={fetchPriority}
                    />
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
                    </div>
               </div>
          </div>
     );
}