"use client";

import { GoArrowRight  } from "react-icons/go";
import { useRouter } from 'next/navigation';
import OptimizedImage from "@/components/ui/OptimizedImage";

const CourseImage = '/images/weekend-ux-program-image-template.webp';

export default function CourseCard({ course, setIsModal = false, priority = false, fetchPriority = undefined }) {
     const router = useRouter();
     const handleClick = () => {
          if (setIsModal) setIsModal(false)
          router.push(`/courses/${course.slug || course._id}`);
     };

     const imageSrc = course?.image || CourseImage;


     return (
          <div 
               onClick={handleClick}
               className="w-73.5 md:w-full rounded-2xl border min-h-100 md:min-h-114 border-zinc-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col cursor-pointer group"
          >
               {/* Image section */}
               <div className="relative rounded-xl overflow-hidden h-50 md:h-65.5 w-full bg-zinc-100">
                    <OptimizedImage
                         src={imageSrc}
                         alt={course?.alt || "weekend-ux-program-image-template"}
                         className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
                         sizes="(max-width: 768px) 100vw, 320px"
                         priority={priority}
                         fetchPriority={fetchPriority}
                    />
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
                              <span className="text-zinc-500 font-normal">Starts:</span> {course?.deadline}
                         </p>
                    </div>
               </div>
          </div>
     );
}
