"use client";

import { useState } from "react";
import { BsBarChartFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import {
     FiChevronDown,
     FiChevronUp,
     FiFileText,
     FiUser,
     FiMail,
     FiPhone,
} from "react-icons/fi";
import { GoClockFill } from "react-icons/go";
import { PiFilesFill } from "react-icons/pi";
import { TbLogin } from "react-icons/tb";
import CardBg from '@/app/assets/weekend-ux-course-details-call-card-bg.webp';

export default function Details() {
     const [openChapter, setOpenChapter] = useState(1);

     const curriculum = [
          {
               id: 1,
               title: "Chapter Title",
               lessons: 5,
               duration: "45 Mins",
               items: [
                    "Lessons name",
                    "Lessons name",
                    "Lessons name",
                    "Lessons name",
               ],
          },
          {
               id: 2,
               title: "Chapter Title",
               lessons: 5,
               duration: "45 Mins",
               items: [],
          },
          {
               id: 3,
               title: "Chapter Title",
               lessons: 5,
               duration: "45 Mins",
               items: [],
          },
          {
               id: 4,
               title: "Chapter Title",
               lessons: 5,
               duration: "45 Mins",
               items: [],
          },
     ];

     return (
          <section className="bg-[#F8F6EE] py-12 lg:py-20 font-urbanist">
               <div className="custom-width px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-12">

                         {/* LEFT SIDE */}
                         <div>
                              {/* Category */}
                              <div className="flex flex-wrap items-center gap-4 mb-6">
                                   <span className="bg-[#7C3AED] text-white text-[14px] px-3 py-1 rounded">
                                        Development
                                   </span>

                                   <span className="text-[18px] text-zinc-600 font-medium">
                                        by Determined-Poitras
                                   </span>
                              </div>

                              {/* Stats */}
                              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 text-neutral-900">
                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><GoClockFill /></span>
                                        <span>2 Weeks</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><FaGraduationCap /></span>
                                        <span>156 Students</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><BsBarChartFill /></span>
                                        <span>All levels</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><PiFilesFill /></span>
                                        <span>20 Lessons</span>
                                   </div>
                              </div>

                              {/* Overview */}
                              <div>
                                   <h2 className="font-playfair text-[20px] lg:text-[24px] font-medium text-zinc-900 mb-5">
                                        Overview
                                   </h2>

                                   <p className="font-urbanist text-neutral-900 leading-6 text-[16px]">
                                        Thank you for buying our courses. We ensure that our users
                                        have a rewarding experience while they discover, assess and
                                        purchase our courses, whether it is an instructor-led or
                                        self-paced training. As with any online purchase experience,
                                        there are terms and conditions that govern our Refund Policy.
                                        When you buy a training course from us, you agree to our
                                        Privacy Policy, Terms of Use and Refund Policy.
                                   </p>
                              </div>

                              {/* Curriculum */}
                              <div className="mt-16">
                                   <h2 className="font-playfair text-[20px] lg:text-[24px] font-medium text-zinc-900 mb-6">
                                        Curriculum
                                   </h2>

                                   <div className="space-y-3">
                                        {curriculum.map((chapter) => {
                                             const isOpen = openChapter === chapter.id;

                                             return (
                                                  <div
                                                       key={chapter.id}
                                                       className="border border-[#E5E0D6] rounded-lg overflow-hidden bg-transparent"
                                                  >
                                                       <button
                                                            onClick={() =>
                                                                 setOpenChapter(isOpen ? null : chapter.id)
                                                            }
                                                            className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                                                       >
                                                            <div className="flex items-center gap-3 text-neutral-900 text-[18px] font-medium">
                                                                 {isOpen ? (
                                                                      <FiChevronUp size={18} />
                                                                 ) : (
                                                                      <FiChevronDown size={18} />
                                                                 )}

                                                                 <span className="font-medium text-zinc-800">
                                                                      {chapter.title}
                                                                 </span>
                                                            </div>

                                                            <div className="flex items-center gap-5 text-[18px] font-medium text-neutral-900">
                                                                 <span>{chapter.lessons} Lessons</span>

                                                                 {/* {chapter.duration && (
                                                                      <span>{chapter.duration}</span>
                                                                 )} */}
                                                            </div>
                                                       </button>

                                                       {isOpen && (
                                                            <div className="border-t border-[#E5E0D6] px-5 py-5">
                                                                 <div className="space-y-4">
                                                                      {chapter.items.map((lesson, idx) => (
                                                                           <div
                                                                                key={idx}
                                                                                className="flex items-center gap-3 text-[18px] text-neutral-900 h-14.5 px-5 font-medium"
                                                                           >
                                                                                <TbLogin
                                                                                     size={18}
                                                                                     className="text-neutral-900"
                                                                                />
                                                                                <span>{lesson}</span>
                                                                           </div>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                       )}
                                                  </div>
                                             );
                                        })}
                                   </div>
                              </div>
                         </div>

                         {/* RIGHT SIDEBAR */}
                         <div>
                              <div className="sticky top-24">

                                   {/* Admission Form */}
                                   <div className="bg-white rounded-2xl shadow-sm p-10">
                                        <h2 className="text-center text-[24px] font-bold text-neutral-900 leading-9">
                                             Admissions Close On 7th Oct
                                        </h2>


                                        <p className="text-center text-sm text-neutral-900 leading-5 my-4">
                                             Still not sure? Talk with our advisor and get
                                             your doubts sorted before you miss the chance
                                             to enroll into the course.
                                        </p>

                                        <form className="space-y-4">
                                             <div>
                                                  <label className="block text-sm text-neutral-900 mb-2">
                                                       Full Name
                                                  </label>

                                                  <div className="relative">
                                                       <FiUser className="absolute left-3 top-3 text-neutral-900 text-[16px]" />

                                                       <input
                                                            type="text"
                                                            placeholder="John Doe"
                                                            className="w-full h-10 border border-neutral-200 rounded-lg pl-10 pr-4 outline-none focus:border-official text-neutral-900 placeholder:text-neutral-500 text-[14px]"
                                                       />
                                                  </div>
                                             </div>

                                             <div>
                                                  <label className="block text-sm text-neutral-900 mb-2">
                                                       Email
                                                  </label>

                                                  <div className="relative">
                                                       <FiMail className="absolute left-3 top-3.5 text-neutral-900 text-[16px]" />

                                                       <input
                                                            type="email"
                                                            placeholder="example@email.com"
                                                            className="w-full h-10 border border-neutral-200 rounded-lg pl-10 pr-4 outline-none focus:border-official text-neutral-900 placeholder:text-neutral-500 text-[14px]"
                                                       />
                                                  </div>
                                             </div>

                                             <div>
                                                  <label className="block text-sm text-neutral-900 mb-2">
                                                       Mobile Number
                                                  </label>

                                                  <div className="relative">
                                                       <FiPhone className="absolute left-3 top-3.5 text-neutral-900 text-[16px]" />

                                                       <input
                                                            type="tel"
                                                            placeholder="+91 Enter 10 digit mobile number"
                                                            className="w-full h-10 border border-neutral-200 rounded-lg pl-10 pr-4 outline-none focus:border-official text-neutral-900 placeholder:text-neutral-500 text-[14px]"
                                                       />
                                                  </div>
                                             </div>

                                             <label className="flex items-start gap-2 text-xs text-zinc-500">
                                                  <input
                                                       type="checkbox"
                                                       defaultChecked
                                                       className="mt-1 accent-official"
                                                  />

                                                  <span>
                                                       By providing your contact details, you agree
                                                       to our Terms of Use & Privacy Policy.
                                                  </span>
                                             </label>

                                             <button
                                                  type="submit"
                                                  className="w-full h-12 bg-official rounded-lg font-medium text-zinc-900 hover:opacity-90 transition-all cursor-pointer"
                                             >
                                                  Talk to our advisor
                                             </button>
                                        </form>
                                   </div>

                                   {/* Banner */}
                                   <div className="mt-6 rounded-xl overflow-hidden relative h-64.5">
                                        <img
                                             src={CardBg.src}
                                             alt="weekend-ux-course-details-call-card-bg"
                                             className="w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/25" />

                                        <div className="absolute inset-0 p-10 flex flex-col justify-between">
                                             <div>
                                                  <h3 className="text-white text-[24px] font-playfair leading-tight font-semibold">
                                                       Design is more than just being creative!
                                                  </h3>

                                                  <p className="text-white mt-3">
                                                       Learn how to make design that sells
                                                  </p>
                                             </div>

                                             <button className="h-12 bg-official rounded-lg text-zinc-900 font-medium">
                                                  Book a Call
                                             </button>
                                        </div>
                                   </div>

                              </div>
                         </div>

                    </div>
               </div>
          </section>
     );
}