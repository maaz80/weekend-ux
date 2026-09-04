"use client";

import React from "react";
import { useHomeData } from "@/context/HomeDataContext";
import CourseCard from "@/components/Home/OurPrograms/CourseCard";

const staticRelatedCourses = [
     {
          _id: "rc-1",
          title: "Advance Certificate in UI UX",
          slug: "advance-certificate-ui-ux",
          description: "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: "/images/weekend-ux-program-image-template.webp",
          startdate: "10th Dec, 26",
          courselength: "6 Months",
          category: "UI & UX Design"
     },
     {
          _id: "rc-2",
          title: "Interaction Design Masterclass",
          slug: "interaction-design-masterclass",
          description: "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: "/images/weekend-ux-program-image-template.webp",
          startdate: "15th Dec, 26",
          courselength: "3 Months",
          category: "UI & UX Design"
     },
     {
          _id: "rc-3",
          title: "AI-Powered Product Design",
          slug: "ai-product-design",
          description: "Learn to leverage generative AI models in your design workflows to speed up concept testing.",
          image: "/images/weekend-ux-program-image-template.webp",
          startdate: "10th Dec, 26",
          courselength: "4 Months",
          category: "Generative AI"
     }
];

export default function RelatedCourses({ currentSlug, data }) {
     const { coursesData } = useHomeData();

     const tagline = (data?.tagline || data?.relatedCoursesTagline || "COURSES").trim();
     const startheading = (data?.startheading || "Explore").trim();
     const midheading = (data?.midheading || "Related").trim();
     const endheading = (data?.endheading || "Courses").trim();
     const description = (data?.description || data?.relatedCoursesSubtitle || "Enhance your career expertise with our industry-tailored certification programs.").trim();

     // Safely parse courses array
     const getCourseList = (dataObj) => {
          if (!dataObj) return [];
          if (Array.isArray(dataObj)) return dataObj;
          if (Array.isArray(dataObj.course)) return dataObj.course;
          if (Array.isArray(dataObj.courses)) return dataObj.courses;
          if (Array.isArray(dataObj.data)) return dataObj.data;
          return [];
     };

     const rawCourses = getCourseList(coursesData);
     const availableCourses = rawCourses.length > 0 ? rawCourses : staticRelatedCourses;

     // Format courses into CourseCard props structure
     const formattedCourses = availableCourses.map(c => ({
          ...c,
          _id: c._id || c.slug,
          title: c.title || "Certification Course",
          slug: c.slug || c._id,
          description: c.description || c.overview || c.seodescription || "AWS provides services for every domain such as computing, data storage, data analytics, robotics, and",
          image: c.image || "/images/weekend-ux-program-image-template.webp",
          startdate: c.startdate || c.deadline || "10th Dec, 26",
          category: c.category || "Design"
     }));

     // Filter out current active course page
     const filteredCourses = formattedCourses.filter(c => (c.slug !== currentSlug && c._id !== currentSlug)).slice(0, 3);
     const displayCourses = filteredCourses.length > 0 ? filteredCourses : formattedCourses.slice(0, 3);

     return (
          <section
               className="w-full py-14 sm:py-18 md:py-24 font-urbanist relative z-1 overflow-hidden"
               style={{ backgroundColor: "#FFD400", color: "#18181b" }}
          >
               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto relative z-10">
                    
                    {/* Header Section matching RelatedBlogs heading style */}
                    <div className="mx-auto max-w-212.5 text-center mb-12 md:mb-16">
                         <span className="font-urbanist text-[11px] font-bold uppercase tracking-[0.45em] text-white">
                              {tagline}
                         </span>

                         <h2 className="mt-4 font-playfair text-[38px] leading-[1.05] md:text-[58px] lg:text-[72px] text-neutral">
                              {startheading}{" "}
                              {midheading && <span className="italic text-white">{midheading}</span>}
                              {endheading && <>{endheading.startsWith(" ") ? "" : " "}{endheading}</>}
                         </h2>

                         <p className="mx-auto mt-5 max-w-200 font-urbanist text-[15px] leading-7 md:text-[17px] text-neutral/80">
                              {description}
                         </p>
                    </div>

                    {/* 3 Related Course Cards Grid matching Navbar/OurPrograms CourseCard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-items-center">
                         {displayCourses.map((course, idx) => (
                              <div key={course._id || idx} className="w-full max-w-sm lg:max-w-none flex justify-center">
                                   <CourseCard course={course} />
                              </div>
                         ))}
                    </div>

               </div>
          </section>
     );
}
