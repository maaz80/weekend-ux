"use client";

import { useState } from "react";
import ProgramsSidebar from './ProgramSidebar';
import CourseCard from './CourseCard';

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

const ProgramModalContent = ({ setIsModal }) => {
     const [activeMobileIndex, setActiveMobileIndex] = useState(null);
     const courses = staticCourses;
     const categories = ["All", ...new Set(courses.map(c => c.category))];
     const [activeCategory, setActiveCategory] = useState('All');

     const filteredCourses =
          activeCategory === "All"
               ? courses
               : courses.filter(c => c.category === activeCategory);

     return (
          <div className="w-full bg-[#FCFBF7] py-6 md:py-10 relative">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">

                    {/* DESKTOP VIEW */}
                    <div className="hidden md:flex mt-4 items-start justify-between gap-10">
                         {/* Categories Sidebar */}
                         <div className="space-y-1.5 w-[28%] xl:w-[22%]">
                              {categories.map((cat) => (
                                   <ProgramsSidebar
                                        key={cat}
                                        category={cat}
                                        isActive={activeCategory === cat}
                                        onClick={() => setActiveCategory(cat)}
                                   />
                              ))}
                         </div>

                         {/* Course Cards Grid */}
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-[70%] xl:w-[75%] max-h-[75vh] overflow-y-auto pr-2 hide-scrollbar">
                              {filteredCourses.map((course) => (
                                   <CourseCard key={course._id} course={course} setIsModal={setIsModal} />
                              ))}
                         </div>
                    </div>

                    {/* MOBILE VIEW */}
                    <div className="md:hidden mt-4 space-y-3">
                         {categories.map((cat, index) => {
                              const isOpen = activeMobileIndex === index;
                              const categoryCourses =
                                   cat === "All"
                                        ? courses
                                        : courses.filter((c) => c.category === cat);

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
                                                            <CourseCard course={course} setIsModal={setIsModal} />
                                                       </div>
                                                  ))}
                                             </div>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>

               </div>
          </div>
     );
};

export default ProgramModalContent;
