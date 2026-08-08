"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import HorizontalCourseCard from "@/components/HorizontalCourseCard";
import Form from "@/components/Course Details/Form";
import CallCard from "@/components/Course Details/CallCard";
import CardBg from "@/app/assets/weekend-ux-course-details-call-card-bg.webp";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useHomeData } from "@/context/HomeDataContext";
import { useUserAuth } from "@/context/UserAuthContext";
import { BookOpen, Video, CheckCircle2, Sparkles, AlertCircle, Play, X, Film } from "lucide-react";

const getEmbedUrl = (url) => {
     if (!url) return "";
     const cleanUrl = url.trim();

     // YouTube Short URLs (youtu.be/ID)
     if (cleanUrl.includes("youtu.be/")) {
          const videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     // YouTube Shorts (youtube.com/shorts/ID)
     if (cleanUrl.includes("youtube.com/shorts/")) {
          const videoId = cleanUrl.split("youtube.com/shorts/")[1]?.split("?")[0]?.split("&")[0];
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     // YouTube Watch URLs (youtube.com/watch?v=ID)
     if (cleanUrl.includes("youtube.com/watch")) {
          const urlParams = new URLSearchParams(cleanUrl.split("?")[1] || "");
          const videoId = urlParams.get("v");
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     // YouTube Embed URLs (youtube.com/embed/ID)
     if (cleanUrl.includes("youtube.com/embed/")) {
          return cleanUrl.includes("?") ? `${cleanUrl}&autoplay=1` : `${cleanUrl}?autoplay=1`;
     }

     // Google Drive links
     if (cleanUrl.includes("drive.google.com")) {
          if (cleanUrl.includes("/view")) {
               return cleanUrl.replace("/view", "/preview");
          }
          if (!cleanUrl.includes("/preview")) {
               return `${cleanUrl.split("?")[0]}/preview`;
          }
     }

     // Loom links
     if (cleanUrl.includes("loom.com/share/")) {
          const videoId = cleanUrl.split("loom.com/share/")[1]?.split("?")[0];
          if (videoId) return `https://www.loom.com/embed/${videoId}`;
     }

     // Vimeo links
     if (cleanUrl.includes("vimeo.com/") && !cleanUrl.includes("player.vimeo.com")) {
          const videoId = cleanUrl.split("vimeo.com/")[1]?.split("?")[0];
          if (videoId) return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
     }

     return cleanUrl;
};

const isIframeVideo = (url) => {
     if (!url) return false;
     const u = url.toLowerCase();
     return u.includes("youtube.com") || u.includes("youtu.be") || u.includes("vimeo.com") || u.includes("drive.google.com") || u.includes("loom.com");
};

export default function StudentDashboardPage() {
     const { coursesData } = useHomeData();
     const { user, isLoggedIn, loading: authLoading, isCourseUnlocked } = useUserAuth();
     const [activeTab, setActiveTab] = useState("my-courses"); // "my-courses" | "session-recordings"
     const [selectedVideo, setSelectedVideo] = useState(null); // { videoUrl, title, alt }

     // Auto-trigger auth modal if user lands on dashboard without login
     useEffect(() => {
          if (!authLoading && !isLoggedIn) {
               window.dispatchEvent(new CustomEvent("openAuthModal"));
          }
     }, [authLoading, isLoggedIn]);

     // Loading state while checking authentication
     if (authLoading) {
          return (
               <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center pt-28">
                    <div className="text-center space-y-3">
                         <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                         <p className="text-xs text-zinc-500 font-semibold">Loading student dashboard...</p>
                    </div>
               </div>
          );
     }

     // Auth Gate: Require login to view dashboard
     if (!isLoggedIn) {
          return (
               <div className="min-h-screen bg-[#FCFBF7] text-neutral font-urbanist flex flex-col justify-between py-22 md:py-26">
                    <main className="grow py-37">
                         <div className="custom-width px-4 max-w-md mx-auto text-center space-y-6 bg-white p-8 md:p-10 rounded-3xl border border-zinc-200 shadow-sm">
                              <div className="w-16 h-16 bg-amber-500/10 text-official rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
                                   <BookOpen size={32} />
                              </div>
                              <div className="space-y-2">
                                   <h2 className="text-2xl font-bold text-zinc-900">Student Dashboard Access</h2>
                                   <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-medium">
                                        Please log in to your account to view your enrolled courses and session recordings.
                                   </p>
                              </div>
                              <button
                                   onClick={() => window.dispatchEvent(new CustomEvent("openAuthModal"))}
                                   className="w-full py-3.5 bg-official text-neutral font-bold rounded-xl text-sm hover:opacity-90 transition cursor-pointer shadow-md"
                              >
                                   Log In / Sign Up
                              </button>
                         </div>
                    </main>
                    <Footer />
               </div>
          );
     }

     const allCourses = coursesData?.course && coursesData.course.length > 0
          ? coursesData.course
          : [];

     // Split courses into Unlocked (My Courses) vs Locked (Remaining Courses)
     const unlockedCourses = allCourses.filter((c) => isCourseUnlocked(c));
     const lockedCourses = allCourses.filter((c) => !isCourseUnlocked(c));

     // Target courses for recordings: unlocked courses if available with videos, else all courses with videos
     const baseRecordings = unlockedCourses.some(c => c.videos && c.videos.length > 0) ? unlockedCourses : allCourses;
     const recordingCourses = baseRecordings.filter(c => c.videos && c.videos.length > 0);
     const totalVideosCount = recordingCourses.reduce((sum, c) => sum + (c.videos?.length || 0), 0);

     return (
          <div className="min-h-screen bg-[#FCFBF7] text-neutral font-urbanist flex flex-col justify-between pt-22 sm:pt-28 md:pt-30 pb-30 md:pb-50">
               {/* MAIN BODY CONTENT */}
               <main className="grow pt-14 sm:pt-16 md:pt-18 pb-34 sm:pb-28 md:pb-32">
                    <div className="custom-width px-3.5 sm:px-6 lg:px-10">

                         {/* GREETING BANNER */}
                         <div className="mb-6 sm:mb-8">
                              <div className="flex items-center gap-2 mb-1">
                                   <span className="text-xl sm:text-2xl">🎓</span>
                                   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
                                        Student Dashboard
                                   </h1>
                              </div>
                              <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
                                   Welcome back, {user?.name || "Student"}! Access your enrolled course materials and explore new tracks.
                              </p>
                         </div>

                         {/* TOP SUMMARY STAT CARDS (2 CARDS) */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-10">
                              {/* Card 1: Course To do */}
                              <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition flex items-start justify-between gap-3 relative overflow-hidden group">
                                   <div className="space-y-1.5 sm:space-y-2 z-10">
                                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                                             <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" /> Active Learning
                                        </span>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900">
                                             Course To do
                                        </h2>
                                        <p className="text-xs text-zinc-500 font-medium">
                                             <strong className="text-emerald-600 text-sm font-bold">{unlockedCourses.length}</strong> course{unlockedCourses.length !== 1 ? 's' : ''} enrolled & unlocked.
                                        </p>
                                   </div>
                                   <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-5 h-5 sm:w-7 sm:h-7" />
                                   </div>
                              </div>

                              {/* Card 2: Recordings */}
                              <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition flex items-start justify-between gap-3 relative overflow-hidden group">
                                   <div className="space-y-1.5 sm:space-y-2 z-10">
                                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                                             <Video size={12} className="sm:w-3.5 sm:h-3.5" /> Live Archive
                                        </span>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900">
                                             Recordings ({totalVideosCount})
                                        </h2>
                                        <p className="text-xs text-zinc-500 font-medium">
                                             Access recorded live lectures & workshops.
                                        </p>
                                   </div>
                                   <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 border border-purple-500/20 group-hover:scale-110 transition-transform">
                                        <Video className="w-5 h-5 sm:w-7 sm:h-7" />
                                   </div>
                              </div>
                         </div>

                         {/* MAIN NAVIGATION TOGGLE TABS */}
                         <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar border-b border-zinc-200 mb-6 sm:mb-8 pb-3 sm:pb-4 w-full">
                              <button
                                   onClick={() => setActiveTab("my-courses")}
                                   className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${activeTab === "my-courses"
                                        ? "bg-official text-neutral shadow-sm border border-amber-400 font-extrabold"
                                        : "bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                        }`}
                              >
                                   <BookOpen size={15} className="sm:w-4 sm:h-4" />
                                   <span>My Course</span>
                                   <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${activeTab === "my-courses" ? "bg-neutral text-official" : "bg-zinc-100 text-zinc-600"}`}>
                                        {unlockedCourses.length}
                                   </span>
                              </button>

                              <button
                                   onClick={() => setActiveTab("session-recordings")}
                                   className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${activeTab === "session-recordings"
                                        ? "bg-official text-neutral shadow-sm border border-amber-400 font-extrabold"
                                        : "bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                        }`}
                              >
                                   <Video size={15} className="sm:w-4 sm:h-4" />
                                   <span>Session Recordings</span>
                                   <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${activeTab === "session-recordings" ? "bg-neutral text-official" : "bg-zinc-100 text-zinc-600"}`}>
                                        {totalVideosCount}
                                   </span>
                              </button>
                         </div>

                         {/* MAIN BODY GRID: TAB CONTENT (LEFT 2 COLS) + FORM SIDEBAR (RIGHT 1 COL) */}
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">

                              {/* LEFT COLUMN: ACTIVE TAB CONTENT */}
                              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                                   {/* TAB 1: MY COURSE VIEW */}
                                   {activeTab === "my-courses" && (
                                        <div className="space-y-8 sm:space-y-10 animate-fadeIn">
                                             {/* SECTION A: ENROLLED / PURCHASED COURSES */}
                                             <div>
                                                  <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                                                       <div className="flex items-center gap-2">
                                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                                                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900">
                                                                 Enrolled Courses (Unlocked)
                                                            </h2>
                                                       </div>
                                                       <span className="text-xs text-zinc-500 font-semibold shrink-0">
                                                            {unlockedCourses.length} Purchased
                                                       </span>
                                                  </div>

                                                  {unlockedCourses.length > 0 ? (
                                                       <div className="flex flex-col gap-4 sm:gap-5">
                                                            {unlockedCourses.map((course) => (
                                                                 <HorizontalCourseCard
                                                                      key={course._id || course.slug}
                                                                      course={course}
                                                                      unlocked={true}
                                                                 />
                                                            ))}
                                                       </div>
                                                  ) : (
                                                       <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 text-center max-w-lg mx-auto my-4 space-y-3">
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                                                                 <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                                            </div>
                                                            <h3 className="text-sm sm:text-base font-bold text-zinc-900">No Enrolled Courses Yet</h3>
                                                            <p className="text-xs text-zinc-500 leading-relaxed">
                                                                 You haven't purchased or unlocked any courses yet. Browse the remaining courses below and view course details to get access!
                                                            </p>
                                                       </div>
                                                  )}
                                             </div>

                                             {/* SECTION B: REMAINING LOCKED COURSES */}
                                             {lockedCourses.length > 0 && (
                                                  <div className="pt-6 border-t border-zinc-200">
                                                       <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                                                            <div className="flex items-center gap-2">
                                                                 <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500" />
                                                                 <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900">
                                                                      Remaining Courses (Locked)
                                                                 </h2>
                                                            </div>
                                                            <span className="text-xs text-zinc-500 font-semibold shrink-0">
                                                                 {lockedCourses.length} Available
                                                            </span>
                                                       </div>

                                                       <div className="flex flex-col gap-4 sm:gap-5">
                                                            {lockedCourses.map((course) => (
                                                                 <HorizontalCourseCard
                                                                      key={course._id || course.slug}
                                                                      course={course}
                                                                      unlocked={false}
                                                                 />
                                                            ))}
                                                       </div>
                                                  </div>
                                             )}
                                        </div>
                                   )}

                                   {/* TAB 2: SESSION RECORDINGS VIEW (Grouped by Course) */}
                                   {activeTab === "session-recordings" && (
                                        <div className="space-y-8 sm:space-y-10 animate-fadeIn">
                                             {recordingCourses.length > 0 ? (
                                                  recordingCourses.map((course, cIdx) => {
                                                       const courseVideos = course.videos || [];
                                                       return (
                                                            <div key={course._id || course.slug || cIdx} className="bg-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm space-y-4 sm:space-y-6">
                                                                 {/* Course Recording Header */}
                                                                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-zinc-100 pb-3 sm:pb-4">
                                                                      <div>
                                                                           <span className="text-[10px] font-bold uppercase tracking-wider text-official bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                                                                                {course.category || "Design Track"}
                                                                           </span>
                                                                           <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 mt-1">
                                                                                {course.title}
                                                                           </h3>
                                                                      </div>
                                                                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 sm:px-3 py-1 rounded-lg border border-purple-200 flex items-center gap-1.5 shrink-0">
                                                                           <Film size={13} className="sm:w-3.5 sm:h-3.5" /> {courseVideos.length} Video{courseVideos.length !== 1 ? 's' : ''}
                                                                      </span>
                                                                 </div>

                                                                 {/* Course Videos Grid */}
                                                                 {courseVideos.length > 0 ? (
                                                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                                                           {courseVideos.map((v, vIdx) => {
                                                                                const thumbSrc = v.thumbnail || course.image || "/images/weekend-ux-program-image-template.webp";
                                                                                return (
                                                                                     <div
                                                                                          key={vIdx}
                                                                                          onClick={() => setSelectedVideo({ videoUrl: v.video, title: v.title || `${course.title} - Session #${vIdx + 1}`, alt: v.alt })}
                                                                                          className="group bg-zinc-50 rounded-2xl border border-zinc-200/80 overflow-hidden hover:border-amber-400 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                                                                                     >
                                                                                          {/* THUMBNAIL WITH PLAY OVERLAY */}
                                                                                          <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                                                                                               <OptimizedImage
                                                                                                    src={thumbSrc}
                                                                                                    alt={v.alt || v.title || course.title}
                                                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                                                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                                                               />
                                                                                               <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-official text-neutral flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                                                                         <Play size={18} className="fill-neutral ml-0.5 sm:w-5 sm:h-5" />
                                                                                                    </div>
                                                                                               </div>
                                                                                          </div>

                                                                                          {/* VIDEO INFO */}
                                                                                          <div className="p-3.5 sm:p-4 space-y-1 bg-white">
                                                                                               <h4 className="font-bold text-xs sm:text-sm text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                                                                                                    {v.title || `Session Video #${vIdx + 1}`}
                                                                                               </h4>
                                                                                               {v.alt && (
                                                                                                    <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-1 font-medium">
                                                                                                         {v.alt}
                                                                                                    </p>
                                                                                               )}
                                                                                          </div>
                                                                                     </div>
                                                                                );
                                                                           })}
                                                                      </div>
                                                                 ) : (
                                                                      <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl p-5 text-center space-y-1">
                                                                           <p className="text-xs text-zinc-500 font-medium">No session recordings uploaded for this course yet.</p>
                                                                      </div>
                                                                 )}
                                                            </div>
                                                       );
                                                  })
                                             ) : (
                                                  <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 text-center max-w-lg mx-auto my-4 space-y-3">
                                                       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto border border-purple-200">
                                                            <Video className="w-5 h-5 sm:w-6 sm:h-6" />
                                                       </div>
                                                       <h3 className="text-sm sm:text-base font-bold text-zinc-900">No Session Recordings Available</h3>
                                                       <p className="text-xs text-zinc-500 leading-relaxed">
                                                            You haven't unlocked any courses yet. Once a course is unlocked for your account by admin, session recordings will appear here.
                                                       </p>
                                                  </div>
                                             )}
                                        </div>
                                   )}
                              </div>

                              {/* RIGHT COLUMN: ADMISSIONS FORM & CALLCARD (Matching Course Details Page) */}
                              <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">
                                   {/* Admission Form */}
                                   <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-6 md:p-8 border border-zinc-200">
                                        <h2 className="text-center text-xl sm:text-[22px] md:text-[24px] font-bold text-neutral leading-snug mb-2 sm:mb-3">
                                             Admissions Close On 7th Oct
                                        </h2>
                                        <p className="text-center text-xs md:text-sm text-zinc-600 leading-relaxed mb-5 sm:mb-6 font-urbanist">
                                             Not sure yet? Before you pass up the opportunity to sign up for the course, speak with our counselor and get your questions answered.
                                        </p>
                                        <Form />
                                   </div>

                                   {/* Call Banner */}
                                   {/* <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
                                        <CallCard
                                             title="Design is more than just being creative!"
                                             subtitle="Learn how to make design that sells"
                                             buttonText="Book a Call"
                                             bgImage={CardBg.src}
                                             onButtonClick={() => {
                                                  window.dispatchEvent(new CustomEvent("openLeadModal"));
                                             }}
                                        />
                                   </div> */}
                              </div>

                         </div>

                    </div>
               </main>

               {/* VIDEO MODAL PLAYER OVERLAY */}
               {selectedVideo && (
                    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-99999 flex items-center justify-center p-2.5 sm:p-4">
                         <div
                              className="bg-zinc-900 text-white w-full max-w-5xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col"
                              style={{ height: "80vh", maxHeight: "800px" }}
                         >
                              {/* Header */}
                              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-zinc-800 shrink-0 h-12 sm:h-14">
                                   <h3 className="text-xs sm:text-sm md:text-base font-bold line-clamp-1">
                                        {selectedVideo.title}
                                   </h3>
                                   <button
                                        onClick={() => setSelectedVideo(null)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition cursor-pointer shrink-0"
                                   >
                                        <X size={16} className="sm:w-4 sm:h-4" />
                                   </button>
                              </div>

                              {/* Video Container */}
                              <div
                                   className="bg-black w-full flex-1 min-h-0 flex items-center justify-center relative overflow-hidden"
                                   style={{ height: "calc(100% - 48px)" }}
                              >
                                   {selectedVideo.videoUrl ? (
                                        isIframeVideo(selectedVideo.videoUrl) ? (
                                             <iframe
                                                  src={getEmbedUrl(selectedVideo.videoUrl)}
                                                  className="w-full h-full border-0 block"
                                                  style={{ width: "100%", height: "100%", minHeight: "100%" }}
                                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                  allowFullScreen
                                             />
                                        ) : (
                                             <video
                                                  key={selectedVideo.videoUrl}
                                                  controls
                                                  autoPlay
                                                  playsInline
                                                  preload="metadata"
                                                  className="w-full h-full object-contain"
                                                  style={{ width: "100%", height: "100%" }}
                                             >
                                                  <source src={selectedVideo.videoUrl} />
                                                  Your browser does not support the video tag.
                                             </video>
                                        )
                                   ) : (
                                        <div className="p-6 sm:p-8 text-center space-y-2 text-zinc-400">
                                             <Film className="w-8 h-8 sm:w-9 sm:h-9 mx-auto text-zinc-600" />
                                             <p className="text-xs sm:text-sm font-semibold">Video stream link not configured for this lesson.</p>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               )}

               {/* FOOTER */}
               <Footer />
          </div>
     );
}
