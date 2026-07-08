"use client";

import { FiClock, FiUsers, FiBarChart2, FiBookOpen } from "react-icons/fi";
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
          router.push(`/${course.slug || course._id}`);
     };

     const imageSrc = course?.image || CourseImage;

     return (
          <div className={`w-full border rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 min-h-122.5 max-h-122.5 ${cardBgColor} ${cardBorderColor}`}>

               {/* Course Image */}
               <div className="relative h-47.5 md:h-56.5 overflow-hidden bg-zinc-100">
                    <OptimizedImage
                         src={imageSrc}
                         alt={course?.alt || "weekend-ux-program-image-template"}
                         className="w-full h-full object-fill"
                         sizes="(max-width: 768px) 100vw, 400px"
                         priority={priority}
                         fetchPriority={fetchPriority}
                    />
               </div>

               {/* Content */}
               <div className="p-4">

                    {/* Title */}
                    <h2 className={`font-urbanist text-[18px] md:text-[24px] font-bold leading-8 line-clamp-1 ${cardTitleColor}`}>
                         {course?.title}
                    </h2>

                    {/* Author */}
                    <p className={`text-[16px] mt-1 font-urbanist ${cardSubTitleColor}`}>
                         by {course?.instructor || course?.author || "Determined-Polliras"}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-5 text-[12px] md:text-[14px] font-medium">

                         <div className={`flex items-center gap-2 ${statTextColor}`}>
                              <FiClock className={`shrink-0 text-[20px] ${statIconColor}`} />
                              <span>{course?.duration || "2 Weeks"}</span>
                         </div>

                         <div className={`flex items-center gap-2 ${statTextColor}`}>
                              <FiUsers className={`shrink-0 text-[20px] ${statIconColor}`} />
                              <span>
                                   {course?.totalstudents
                                        ? (course.totalstudents.toLowerCase().includes("student") ? course.totalstudents : `${course.totalstudents} Students`)
                                        : "156 Students"
                                   }
                              </span>
                         </div>

                         <div className={`flex items-center gap-2 ${statTextColor}`}>
                              <FiBarChart2 className={`shrink-0 text-[20px] ${statIconColor}`} />
                              <span>{course?.levels || "All Levels"}</span>
                         </div>

                         <div className={`flex items-center gap-2 ${statTextColor}`}>
                              <FiBookOpen className={`shrink-0 text-[20px] ${statIconColor}`} />
                              <span>
                                   {course?.totallessons
                                        ? (course.totallessons.toLowerCase().includes("lesson") ? course.totallessons : `${course.totallessons} Lessons`)
                                        : "20 Lessons"
                                   }
                              </span>
                         </div>

                    </div>

                    {/* Bottom Section */}
                    <div className={`flex items-end justify-between gap-3 mt-5 pt-4 border-t ${dividerColor}`}>

                         <div className="flex-1">
                              <p className={`text-[12px] md:text-[13px] ${statTextColor}`}>
                                   <span className="font-semibold">
                                        Starts:
                                   </span>{" "}
                                   {course?.startdate || course?.deadline || "10th Dec, 26"}
                              </p>

                              <p className={`text-[12px] md:text-[13px] font-semibold mt-1 ${cardTitleColor}`}>
                                   Duration: {course?.courselength || course?.courseLength || "6 Months"}
                              </p>
                         </div>

                         <button
                              onClick={handleClick}
                              className={`h-10 px-4 rounded-md border font-medium flex items-center gap-2 whitespace-nowrap hover:bg-zinc-50/10 transition-all duration-300 cursor-pointer ${buttonBgColor} ${buttonTextColor} ${buttonBorderColor}`}
                         >
                              {/* <FiDownload size={14} /> */}
                              Course Syllablus
                              <GoArrowRight />
                         </button>

                    </div>
               </div>
          </div>
     );
}