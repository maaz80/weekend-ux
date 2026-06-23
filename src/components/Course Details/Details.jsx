"use client";

import { useState } from "react";
import { BsBarChartFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import {
     FiChevronDown,
     FiChevronUp,
     FiUser,
     FiMail,
     FiPhone,
} from "react-icons/fi";
import { GoClockFill } from "react-icons/go";
import { PiFilesFill } from "react-icons/pi";
import CardBg from '@/app/assets/weekend-ux-course-details-call-card-bg.webp';
import { useEffect } from "react";
import { X, Lock, Play } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Form from "./Form";

export default function Details({ data }) {
     const [openChapter, setOpenChapter] = useState(1);
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [showLockModal, setShowLockModal] = useState(false);
     const [showAuthModal, setShowAuthModal] = useState(false);
     const [activeVideo, setActiveVideo] = useState(null); // { url, name }

     useEffect(() => {
          if (typeof window !== "undefined") {
               setIsLoggedIn(!!localStorage.getItem("userToken"));
          }
     }, []);

     const handleAuthSuccess = () => {
          setIsLoggedIn(true);
          setShowLockModal(false);
     };

     const curriculum = (data?.chapter && data.chapter.chaptername) ? [
          {
               id: 1,
               title: data.chapter.chaptername,
               lessons: data.chapter.totallessons || data.chapter.lessons?.length || 0,
               items: data.chapter.lessons || []
          }
     ] : [
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
                                        {data?.category || "Development"}
                                   </span>

                                   <span className="text-[18px] text-zinc-600 font-medium">
                                        by {data?.author || "Determined-Poitras"}
                                   </span>
                              </div>

                              {/* Stats */}
                              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 text-neutral-900">
                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><GoClockFill /></span>
                                        <span>{data?.courselength || data?.duration || "2 Weeks"}</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><FaGraduationCap /></span>
                                        <span>
                                             {data?.totalstudents 
                                                  ? (data.totalstudents.toString().toLowerCase().includes("students") 
                                                       ? data.totalstudents 
                                                       : `${data.totalstudents} Students`) 
                                                  : "156 Students"}
                                        </span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><BsBarChartFill /></span>
                                        <span>{data?.levels || "All levels"}</span>
                                   </div>

                                   <div className="flex items-center gap-2">
                                        <span className="text-official text-[20px]"><PiFilesFill /></span>
                                        <span>
                                             {data?.totallessons 
                                                  ? (data.totallessons.toString().toLowerCase().includes("lessons") 
                                                       ? data.totallessons 
                                                       : `${data.totallessons} Lessons`) 
                                                  : "20 Lessons"}
                                        </span>
                                   </div>
                              </div>

                              {/* Overview */}
                              <div>
                                   <h2 className="font-playfair text-[20px] lg:text-[24px] font-medium text-zinc-900 mb-5">
                                        Overview
                                   </h2>

                                   <p className="font-urbanist text-neutral-900 leading-6 text-[16px]">
                                        {data?.overview || "Thank you for buying our courses. We ensure that our users have a rewarding experience while they discover, assess and purchase our courses, whether it is an instructor-led or self-paced training. As with any online purchase experience, there are terms and conditions that govern our Refund Policy. When you buy a training course from us, you agree to our Privacy Policy, Terms of Use and Refund Policy."}
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
                                                            <div className="border-t border-[#E5E0D6] px-3 md:px-5 py-5">
                                                                 <div className="space-y-2">
                                                                      {chapter.items.map((lesson, idx) => {
                                                                           const isObject = typeof lesson === "object" && lesson !== null;
                                                                           const lessonName = isObject ? lesson.lessonname : lesson;
                                                                           const videoUrl = isObject ? lesson.video?.videourl : null;
                                                                           const duration = isObject ? lesson.video?.duration : null;

                                                                           return (
                                                                                <div
                                                                                     key={idx}
                                                                                     onClick={() => {
                                                                                          if (isLoggedIn) {
                                                                                               setActiveVideo({
                                                                                                    url: videoUrl,
                                                                                                    name: lessonName
                                                                                               });
                                                                                          } else {
                                                                                               setShowLockModal(true);
                                                                                          }
                                                                                     }}
                                                                                     className="flex items-center justify-between text-[15px] md:text-[17px] text-neutral-900 h-14.5 px-4 md:px-5 font-medium rounded-xl hover:bg-zinc-100/70 border border-transparent hover:border-zinc-200/50 transition cursor-pointer group"
                                                                                >
                                                                                     <div className="flex items-center gap-3">
                                                                                          {isLoggedIn ? (
                                                                                               <span className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 transition-colors group-hover:bg-yellow-500 group-hover:text-neutral-900">
                                                                                                    <Play size={12} className="fill-current" />
                                                                                               </span>
                                                                                          ) : (
                                                                                               <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                                                                                                    <Lock size={12} />
                                                                                               </span>
                                                                                          )}
                                                                                          <span className="font-semibold text-zinc-800 transition-colors group-hover:text-yellow-600">
                                                                                               {lessonName}
                                                                                          </span>
                                                                                     </div>

                                                                                     <div className="flex items-center gap-3">
                                                                                          {duration && (
                                                                                               <span className="text-sm text-zinc-500 font-medium">{duration} mins</span>
                                                                                          )}
                                                                                          {!isLoggedIn && (
                                                                                               <span className="text-[10px] uppercase tracking-wider bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded font-bold">Locked</span>
                                                                                          )}
                                                                                     </div>
                                                                                </div>
                                                                           );
                                                                      })}
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

                                        <Form />
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

               {/* LOCK MODAL */}
               {showLockModal && (
                    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                         <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl text-center relative border border-zinc-100 text-neutral-900">
                              
                              <button 
                                   onClick={() => setShowLockModal(false)}
                                   className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition cursor-pointer"
                                   aria-label="Close"
                              >
                                   <X size={20} />
                               </button>

                              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500 border border-yellow-100">
                                   <Lock size={30} />
                              </div>

                              <h3 className="text-xl font-playfair font-bold text-neutral-900 mb-2">Lesson Locked</h3>
                              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                                   This lesson is reserved for enrolled members. Please log in or sign up to unlock access to all video lectures.
                              </p>

                              <div className="flex flex-col gap-3">
                                   <button 
                                        onClick={() => {
                                             setShowLockModal(false);
                                             setShowAuthModal(true);
                                        }}
                                        className="w-full h-11 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 rounded-lg text-sm font-semibold transition cursor-pointer"
                                   >
                                        Log In / Sign Up
                                   </button>
                                   <button 
                                        onClick={() => setShowLockModal(false)}
                                        className="w-full h-11 border border-zinc-200 hover:bg-zinc-50 text-neutral-600 rounded-lg text-sm font-semibold transition cursor-pointer"
                                   >
                                        Cancel
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

               {/* VIDEO LIGHTBOX PLAYER */}
               {activeVideo && (
                    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                         <div className="w-full max-w-5xl bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl relative text-white">
                              
                              <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center text-white">
                                   <div>
                                        <span className="text-[11px] uppercase tracking-wider text-yellow-500 font-bold">Now Playing</span>
                                        <h4 className="text-lg font-semibold font-playfair">{activeVideo.name}</h4>
                                   </div>
                                   <button 
                                        onClick={() => setActiveVideo(null)}
                                        className="p-2 hover:bg-zinc-800 rounded-full transition cursor-pointer text-zinc-400 hover:text-white"
                                        aria-label="Close video player"
                                   >
                                        <X size={20} />
                                   </button>
                              </div>

                              <div className="relative aspect-video w-full bg-black">
                                   <video 
                                        src={activeVideo.url || "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34354-large.mp4"}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                   />
                              </div>
                         </div>
                    </div>
               )}

               {/* AUTH MODAL FALLBACK */}
               <AuthModal 
                    isOpen={showAuthModal} 
                    onClose={() => setShowAuthModal(false)} 
                    onAuthSuccess={handleAuthSuccess}
               />
          </section>
     );
}