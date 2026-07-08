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
import OptimizedImage from "../ui/OptimizedImage";
import Button from "@/components/ui/Button";
import CallCard from "./CallCard";
import Curriculum from "./Curriculum";

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

     const curriculum = Array.isArray(data?.chapter) && data.chapter.length > 0
          ? data.chapter.map((ch, index) => ({
               id: index + 1,
               title: ch.chaptername || `Chapter ${index + 1}`,
               lessons: ch.totallessons || ch.lessons?.length || 0,
               items: ch.lessons || []
          }))
          : (data?.chapter && data.chapter.chaptername)
               ? [
                    {
                         id: 1,
                         title: data.chapter.chaptername,
                         lessons: data.chapter.totallessons || data.chapter.lessons?.length || 0,
                         items: data.chapter.lessons || []
                    }
               ]
               : [
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
                              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 text-neutral">
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

                                   <p className="font-urbanist text-neutral leading-6 text-[16px]">
                                        {data?.overview || "Thank you for buying our courses. We ensure that our users have a rewarding experience while they discover, assess and purchase our courses, whether it is an instructor-led or self-paced training. As with any online purchase experience, there are terms and conditions that govern our Refund Policy. When you buy a training course from us, you agree to our Privacy Policy, Terms of Use and Refund Policy."}
                                   </p>
                              </div>

                              {/* Curriculum */}
                              <div className="mt-16">
                                   <h2 className="font-playfair text-[20px] lg:text-[24px] font-medium text-zinc-900 mb-6">
                                        Curriculum
                                   </h2>

                                   <Curriculum
                                        curriculum={curriculum}
                                        isLoggedIn={isLoggedIn}
                                        onLessonClick={(lessonName, videoUrl) => {
                                             if (isLoggedIn) {
                                                  setActiveVideo({
                                                       url: videoUrl,
                                                       name: lessonName
                                                  });
                                             } else {
                                                  setShowLockModal(true);
                                             }
                                        }}
                                   />
                              </div>
                         </div>

                         {/* RIGHT SIDEBAR */}
                         <div>
                              <div className="sticky top-24">

                                   {/* Admission Form */}
                                   <div className="bg-white rounded-2xl shadow-sm p-10">
                                        <h2 className="text-center text-[24px] font-bold text-neutral leading-9">
                                             Admissions Close On 7th Oct
                                        </h2>


                                        <p className="text-center text-sm text-neutral leading-5 my-4">
                                             Still not sure? Talk with our advisor and get
                                             your doubts sorted before you miss the chance
                                             to enroll into the course.
                                        </p>

                                        <Form />
                                   </div>

                                   {/* Banner */}
                                   <div className="mt-6">
                                        <CallCard
                                             title="Design is more than just being creative!"
                                             subtitle="Learn how to make design that sells"
                                             buttonText="Book a Call"
                                             bgImage={CardBg.src}
                                        />
                                   </div>

                              </div>
                         </div>

                    </div>
               </div>

               {/* LOCK MODAL */}
               {showLockModal && (
                    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-neutral/60 backdrop-blur-sm p-4">
                         <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl text-center relative border border-zinc-100 text-neutral">

                              <button
                                   onClick={() => setShowLockModal(false)}
                                   className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition cursor-pointer"
                                   aria-label="Close"
                              >
                                   <X size={20} />
                              </button>

                              <div className="w-16 h-16 bg-official/30 rounded-full flex items-center justify-center mx-auto mb-6 text-official border border-official/50">
                                   <Lock size={30} />
                              </div>

                              <h3 className="text-xl font-bold text-neutral mb-2">Lesson Locked</h3>
                              <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                                   This lesson is reserved for enrolled members. Please log in or sign up to unlock access to all video lectures.
                              </p>

                              <div className="flex flex-col gap-3">
                                   <Button
                                        onClick={() => {
                                             setShowLockModal(false);
                                             setShowAuthModal(true);
                                        }}
                                        variant="primary"
                                        size="h11"
                                        className="w-full text-sm font-semibold"
                                   >
                                        Log In / Sign Up
                                   </Button>
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
                    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-neutral/90 backdrop-blur-md p-4">
                         <div className="w-full max-w-5xl bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl relative text-white">

                              <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center text-white">
                                   <div>
                                        <span className="text-[11px] uppercase tracking-wider text-official font-bold">Now Playing</span>
                                        <h2 className="text-lg font-semibold font-playfair">{activeVideo.name}</h2>
                                   </div>
                                   <button
                                        onClick={() => setActiveVideo(null)}
                                        className="p-2 hover:bg-zinc-800 rounded-full transition cursor-pointer text-zinc-400 hover:text-white"
                                        aria-label="Close video player"
                                   >
                                        <X size={20} />
                                   </button>
                              </div>

                              <div className="relative aspect-video w-full bg-neutral">
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