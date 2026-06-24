"use client";

import { FiDownload, FiClock, FiUsers, FiBarChart2, FiBookOpen } from "react-icons/fi";
import { useRouter } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";

const CourseImage = "/images/weekend-ux-program-image-template.webp";

export default function CourseCard({ course, setIsModal = false, priority = false, fetchPriority = undefined }) {
     const router = useRouter();

     const handleClick = () => {
          if (setIsModal) setIsModal(false);
          router.push(`/${course.slug || course._id}`);
     };

     const imageSrc = course?.image || CourseImage;



     return (
          <div className="w-full bg-white border border-[#DCD7CC] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 min-h-122.5 max-h-122.5">

               {/* Course Image */}
               <div className="relative h-47.5 md:h-56.5 overflow-hidden bg-zinc-100">
                    <OptimizedImage
                         src={imageSrc}
                         alt={course?.alt || "weekend-ux-program-image-template"}
                         className="w-full h-full object-cover"
                         sizes="(max-width: 768px) 100vw, 400px"
                         priority={priority}
                         fetchPriority={fetchPriority}
                    />
               </div>

               {/* Content */}
               <div className="p-4">

                    {/* Title */}
                    <h2 className="font-urbanist text-[18px] md:text-[24px] font-bold text-zinc-900 leading-8 line-clamp-1 ">
                         {course?.title}
                    </h2>

                    {/* Author */}
                    <p className="text-[16px] text-zinc-500 mt-1 font-urbanist">
                         by {course?.instructor || course?.author || "Determined-Polliras"}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-5 text-[12px] md:text-[14px] font-medium">

                         <div className="flex items-center gap-2 text-zinc-700">
                              <FiClock className="text-[#F4C430] shrink-0 text-[20px]" />
                              <span>{course?.duration || "2 Weeks"}</span>
                         </div>

                         <div className="flex items-center gap-2 text-zinc-700">
                              <FiUsers className="text-[#F4C430] shrink-0 text-[20px]" />
                              <span>
                                   {course?.totalstudents 
                                        ? (course.totalstudents.toLowerCase().includes("student") ? course.totalstudents : `${course.totalstudents} Students`) 
                                        : "156 Students"
                                   }
                              </span>
                         </div>

                         <div className="flex items-center gap-2 text-zinc-700">
                              <FiBarChart2 className="text-[#F4C430] shrink-0 text-[20px]" />
                              <span>{course?.levels || "All Levels"}</span>
                         </div>

                         <div className="flex items-center gap-2 text-zinc-700">
                              <FiBookOpen className="text-[#F4C430] shrink-0 text-[20px]" />
                              <span>
                                   {course?.totallessons 
                                        ? (course.totallessons.toLowerCase().includes("lesson") ? course.totallessons : `${course.totallessons} Lessons`) 
                                        : "20 Lessons"
                                   }
                              </span>
                         </div>

                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-end justify-between gap-3 mt-5 pt-4 border-t border-zinc-100">

                         <div className="flex-1">
                              <p className="text-[12px] md:text-[13px] text-zinc-700">
                                   <span className="font-semibold">
                                        Starts:
                                   </span>{" "}
                                   {course?.startdate || course?.deadline || "10th Dec, 26"}
                              </p>

                              <p className="text-[12px] md:text-[13px] text-zinc-900 font-semibold mt-1">
                                   Duration: {course?.courselength || course?.courseLength || "6 Months"}
                              </p>
                         </div>

                         <button
                              onClick={handleClick}
                              className="h-10 px-4 rounded-md border border-zinc-300 bg-white text-zinc-700 text-[12px] md:text-[13px] font-medium flex items-center gap-2 whitespace-nowrap hover:bg-zinc-50 transition-all duration-300 cursor-pointer"
                         >
                              <FiDownload size={14} />
                              Download Brochure
                         </button>

                    </div>
               </div>
          </div>
     );
}