"use client";

import { FiDownload } from "react-icons/fi";
import { useRouter } from 'next/navigation';

const CourseImage = '/images/weekend-ux-program-image-template.webp';

export default function CourseCard({ course, setIsModal = false }) {
     const router = useRouter();
     const handleClick = () => {
          if (setIsModal) setIsModal(false)
          router.push(`/${course.slug || course._id}`);
     };

     const imageSrc = course?.image || CourseImage;
     const getImg = (w) => {
          if (typeof imageSrc === 'string' && imageSrc.includes("/upload/")) {
               return imageSrc.replace("/upload/", `/upload/w_${w},q_auto:eco,f_auto/`);
          }
          return imageSrc;
     };

     return (
          <div className="w-73.5 md:w-full rounded-2xl border min-h-100 md:min-h-125 border-zinc-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col">
               {/* Image section */}
               <div className="relative rounded-xl overflow-hidden h-50 md:h-65.5 w-full bg-zinc-100">
                    <img
                         src={getImg(300)}
                         srcSet={`
                             ${getImg(280)} 280w,
                             ${getImg(420)} 420w,
                             ${getImg(600)} 600w
                          `}
                         sizes="(max-width: 768px) 100vw, 320px"
                         alt={course?.alt || course?.title || "Course Cover Image"}
                         loading="lazy"
                         decoding="async"
                         className="w-full h-full object-cover"
                    />
               </div>

               {/* Content */}
               <div className="p-2 md:p-3 flex flex-col grow">
                    {/* Title */}
                    <h3 className="font-urbanist text-[18px] md:text-[23px] 2xl:text-[24px] font-bold leading-8 md:leading-9 text-zinc-900 min-h-14 flex items-center ">
                         {course?.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs md:text-[16px] text-zinc-500 font-urbanist line-clamp-2 leading-6">
                         {course?.description || "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and"}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[13px] md:text-[16px] text-zinc-800 font-bold font-urbanist mt-5 mb-5 border-t border-zinc-50 pt-4">
                         <p>
                              <span className="text-zinc-400 font-normal">Starts:</span> {course?.deadline}
                         </p>
                         <p>
                              <span className="text-zinc-400 font-normal">Duration:</span> {course?.courseLength}
                         </p>
                    </div>

                    {/* CTA button */}
                    <button
                         onClick={handleClick}
                         className="w-full h-12 rounded-xl text-zinc-800 text-[16px] font-medium flex items-center justify-center gap-2 border border-zinc-200 cursor-pointer hover:bg-linear-to-r from-zinc-500 to-zinc-900 hover:text-white hover:border-transparent transition-all duration-300 ease-in-out mt-auto"
                    >
                         <FiDownload className="text-base" />
                         Download Brochure
                    </button>
               </div>
          </div>
     );
}
