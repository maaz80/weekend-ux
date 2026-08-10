"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock, Play, X, Film, ArrowRight } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import Link from "next/link";
import CardBg from '@/app/assets/weekend-ux-course-details-call-card-bg.webp';
import OptimizedImage from "@/components/ui/OptimizedImage";
import Form from "./Form";
import CallCard from "./CallCard";
import Curriculum from "./Curriculum";

const getEmbedUrl = (url) => {
     if (!url) return "";
     const cleanUrl = url.trim();

     if (cleanUrl.includes("youtu.be/")) {
          const videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     if (cleanUrl.includes("youtube.com/shorts/")) {
          const videoId = cleanUrl.split("youtube.com/shorts/")[1]?.split("?")[0]?.split("&")[0];
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     if (cleanUrl.includes("youtube.com/watch")) {
          const urlParams = new URLSearchParams(cleanUrl.split("?")[1] || "");
          const videoId = urlParams.get("v");
          if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
     }

     if (cleanUrl.includes("youtube.com/embed/")) {
          return cleanUrl.includes("?") ? `${cleanUrl}&autoplay=1` : `${cleanUrl}?autoplay=1`;
     }

     if (cleanUrl.includes("drive.google.com")) {
          return cleanUrl.replace("/view", "/preview");
     }

     if (cleanUrl.includes("vimeo.com/") && !cleanUrl.includes("player.vimeo.com")) {
          const videoId = cleanUrl.split("vimeo.com/")[1]?.split("?")[0];
          if (videoId) return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
     }

     return cleanUrl;
};

const isIframeVideo = (url) => {
     if (!url) return false;
     const u = url.toLowerCase();
     return u.includes("youtube.com") || u.includes("youtu.be") || u.includes("vimeo.com") || u.includes("drive.google.com");
};

export default function Details({ data }) {
     const router = useRouter();
     const { isCourseUnlocked, loading: authLoading } = useUserAuth();
     const [openChapter, setOpenChapter] = useState(1);
     const [sliderIndex, setSliderIndex] = useState(0);
     const [caseStudyIndex, setCaseStudyIndex] = useState(0);
     const [visibleCards, setVisibleCards] = useState(3);
     const [shareUrl, setShareUrl] = useState("");
     const [selectedVideo, setSelectedVideo] = useState(null);

     const unlocked = isCourseUnlocked(data);

     useEffect(() => {
          if (typeof window !== "undefined") {
               setShareUrl(window.location.href);
          }
     }, []);

     useEffect(() => {
          const handleResize = () => {
               if (window.innerWidth < 640) {
                    setVisibleCards(1);
               } else if (window.innerWidth < 1024) {
                    setVisibleCards(2);
               } else {
                    setVisibleCards(3);
               }
          };
          handleResize();
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
     }, []);

     useEffect(() => {
          if (typeof window !== "undefined" && data?._id) {
               window.__currentCourseId = data._id;
               return () => {
                    window.__currentCourseId = undefined;
               };
          }
     }, [data?._id]);

     const curriculum = Array.isArray(data?.chapter) && data.chapter.length > 0
          ? data.chapter.map((ch, index) => ({
               id: index + 1,
               title: ch.chaptername || `Chapter ${index + 1}`,
               items: ch.lessons || []
          }))
          : (data?.chapter && data.chapter.chaptername)
               ? [
                    {
                         id: 1,
                         title: data.chapter.chaptername,
                         items: data.chapter.lessons || []
                    }
               ]
               : [
                    {
                         id: 1,
                         title: "Chapter Title",
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
                         items: [],
                    },
                    {
                         id: 3,
                         title: "Chapter Title",
                         items: [],
                    },
                    {
                         id: 4,
                         title: "Chapter Title",
                         items: [],
                    },
               ];

     const promoTitle = data?.promoTitle || "UI UX Design Courses in Delhi at Affordable Fees";
     const promoDesc = data?.promoDescription || "The demand for skilled UI and UX designers has increased rapidly with the rise of digital experiences.\n\nAs a result, UI UX design courses are now more popular than ever. In Delhi, these programs are among the most in-demand career options in today’s time. Our UI/UX design institute has been providing industry-oriented training in these courses since its inception.";

     const hasKeyword = promoTitle.toLowerCase().startsWith("ui ux design courses");
     const displayTitle = hasKeyword ? (
          <>
               <span className="text-official">UI UX Design Courses</span> {promoTitle.substring(20)}
          </>
     ) : promoTitle;

     const paragraphs = promoDesc.split("\n\n").filter(Boolean);

     const benefitsString = data?.promoBenefits || "Training Since 2006, Small Batches for UX Design, Highly Experienced UX Faculty, 99% Hiring Rate, UX/UI Portfolio Development";
     const benefitsList = benefitsString.split(",").map(b => b.trim()).filter(Boolean);

     const shouldDownloadRef = useRef(false);

     const defaultShortTermItems = [
          {
               title: "Adobe XD Course",
               description: "Adobe XD is a superb tool for UI and UX designers. It enables us for excellent designing, prototyping, and team collaborations. Best UX tool for users using Adobe software.",
               duration: "DURATION: 01 MONTH",
               iconText: "Xd"
          },
          {
               title: "Figma Fundamentals",
               description: "Learn how to build responsive layouts, reusable components, dynamic design systems and interactive high fidelity prototypes in Figma.",
               duration: "DURATION: 02 WEEKS",
               iconText: "Fg"
          }
     ];
     const shortTermItems = (data?.shortTerm?.items && data.shortTerm.items.length > 0)
          ? data.shortTerm.items
          : defaultShortTermItems;

     const handlePrev = () => {
          setSliderIndex(prev => (prev === 0 ? shortTermItems.length - 1 : prev - 1));
     };
     const handleNext = () => {
          setSliderIndex(prev => (prev === shortTermItems.length - 1 ? 0 : prev + 1));
     };

     const caseStudiesTitle = data?.caseStudies?.title || "UX Case Studies by Our Students";
     const hasStudiesKeyword = caseStudiesTitle.toLowerCase().startsWith("ux case studies");
     const displayCaseStudiesTitle = hasStudiesKeyword ? (
          <>
               <span className="text-official font-extrabold">UX Case Studies</span> {caseStudiesTitle.substring(15)}
          </>
     ) : caseStudiesTitle;

     const defaultCaseStudies = [
          {
               image: "/images/hero-bg.webp",
               alt: "Rezeeride Web Ads Creative",
               link: "#"
          },
          {
               image: "/images/hero-bg.webp",
               alt: "Photoshop Creative Poster Design",
               link: "#"
          },
          {
               image: "/images/hero-bg.webp",
               alt: "Responsive Frontend Layout Project",
               link: "#"
          }
     ];
     const caseStudiesItems = (data?.caseStudies?.items && data.caseStudies.items.length > 0)
          ? data.caseStudies.items
          : defaultCaseStudies;

     const handleCaseStudyPrev = () => {
          setCaseStudyIndex(prev => (prev === 0 ? Math.max(0, caseStudiesItems.length - visibleCards) : prev - 1));
     };
     const handleCaseStudyNext = () => {
          setCaseStudyIndex(prev => (prev >= caseStudiesItems.length - visibleCards ? 0 : prev + 1));
     };

     const defaultCareerDomains = [
          { name: "Graphic Design", link: "#", iconName: "graphic", color: "#10B981" },
          { name: "Web Design", link: "#", iconName: "web", color: "#2563EB" },
          { name: "Post Production", link: "#", iconName: "post", color: "#9333EA" },
          { name: "Data Analytics", link: "#", iconName: "analytics", color: "#701A75" },
          { name: "CAD & Architecture", link: "#", iconName: "cad", color: "#854D0E" },
          { name: "3D Animation", link: "#", iconName: "animation", color: "#0D9488" },
          { name: "Web Development", link: "#", iconName: "code", color: "#1E3A8A" },
          { name: "CAD Textile Design", link: "#", iconName: "textile", color: "#D97706" },
          { name: "Software Development", link: "#", iconName: "software", color: "#16A34A" },
          { name: "Digital Marketing", link: "#", iconName: "marketing", color: "#0891B2" },
          { name: "Machine Learning & AI", link: "#", iconName: "ai", color: "#C026D3" },
          { name: "Video Editing", link: "#", iconName: "video", color: "#DC2626" }
     ];

     const careerDomainsItems = (data?.careerDomains?.items && data.careerDomains.items.length > 0)
          ? data.careerDomains.items
          : defaultCareerDomains;

     const careerDomainsTitle = data?.careerDomains?.title || "Explore More Career Domains";
     const careerDomainsDescription = data?.careerDomains?.description || "Discover ADMEC's diverse courses to continuously enhance your skills through diploma programs in various fields.";

     const hasExploreMoreKeyword = careerDomainsTitle.toLowerCase().startsWith("explore more");
     const displayCareerDomainsTitle = hasExploreMoreKeyword ? (
          <>
               <span className="text-official font-extrabold">Explore More</span> {careerDomainsTitle.substring(12)}
          </>
     ) : careerDomainsTitle;

     const downloadSyllabus = async () => {
          if (!data) return;

          // Load jsPDF dynamically if not present
          if (!window.jsPDF) {
               await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                    script.onload = () => {
                         window.jsPDF = window.jspdf.jsPDF;
                         resolve();
                    };
                    document.body.appendChild(script);
               });
          }

          const doc = new window.jsPDF({
               orientation: "portrait",
               unit: "mm",
               format: "a4"
          });

          // Draw official color (#FFD400) accent top header band
          doc.setFillColor(255, 212, 0);
          doc.rect(0, 0, 210, 8, "F");

          // Brand Header
          doc.setFont("helvetica", "bold");
          doc.setFontSize(22);
          doc.setTextColor(28, 28, 28); // Neutral-900 (#1C1C1C)
          doc.text("WEEKEND UX", 15, 24);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(115, 115, 115); // Zinc-500
          doc.text("Professional Design Learning Platform", 15, 29);

          // Course title and meta details
          doc.setFont("helvetica", "bold");
          doc.setFontSize(18);
          doc.setTextColor(28, 28, 28);
          doc.text((data.title || "UI/UX DESIGN COURSE").toUpperCase(), 15, 44);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10.5);
          doc.setTextColor(115, 115, 115);
          doc.text(`Category: ${data.category || "UI/UX Design"}   |   Start Date: ${data.startdate || "Upcoming Intake"}`, 15, 50);

          // Divider Line
          doc.setDrawColor(228, 228, 231); // Zinc-200
          doc.setLineWidth(0.4);
          doc.line(15, 55, 195, 55);

          // Course Overview Section
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12.5);
          doc.setTextColor(28, 28, 28);
          doc.text("Course Overview", 15, 65);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(63, 63, 70); // Zinc-700
          const overviewText = data.overview || "Master the art of design. Learn through interactive projects, expert mentorship, and industry-standard workflows.";
          const splitOverview = doc.splitTextToSize(overviewText, 180);
          doc.text(splitOverview, 15, 71);

          let y = 71 + (splitOverview.length * 5.2) + 12;

          // Course Curriculum Section
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12.5);
          doc.setTextColor(28, 28, 28);
          doc.text("Course Curriculum", 15, y);
          y += 8;

          const curriculum = data.chapter || [];
          if (curriculum.length > 0) {
               curriculum.forEach((chap, cIdx) => {
                    if (y > 255) {
                         doc.addPage();
                         doc.setFillColor(255, 212, 0);
                         doc.rect(0, 0, 210, 8, "F");
                         y = 25;
                    }

                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(11);
                    doc.setTextColor(28, 28, 28);
                    doc.text(`Chapter ${cIdx + 1}: ${chap.chaptername || "Untitled Chapter"}`, 15, y);
                    y += 6.5;

                    const lessons = chap.lessons || [];
                    lessons.forEach((les) => {
                         if (y > 265) {
                              doc.addPage();
                              doc.setFillColor(255, 212, 0);
                              doc.rect(0, 0, 210, 8, "F");
                              y = 25;
                         }
                         doc.setFont("helvetica", "normal");
                         doc.setFontSize(9.5);
                         doc.setTextColor(63, 63, 70);
                         const lessonName = typeof les === "object" ? les.lessonname : les;
                         doc.text(`•  ${lessonName}`, 20, y);
                         y += 5.5;
                    });
                    y += 4; // gap between chapters
               });
          } else {
               doc.setFont("helvetica", "normal");
               doc.setFontSize(10);
               doc.setTextColor(63, 63, 70);
               doc.text("Curriculum details will be provided upon class commencement.", 15, y);
               y += 8;
          }

          // Footer branding and page numbers
          const pageCount = doc.internal.getNumberOfPages();
          for (let i = 1; i <= pageCount; i++) {
               doc.setPage(i);

               // Footer Divider
               doc.setDrawColor(244, 244, 245); // Zinc-100
               doc.line(15, 278, 195, 278);

               // Footer Text
               doc.setFont("helvetica", "normal");
               doc.setFontSize(8);
               doc.setTextColor(161, 161, 170); // Zinc-400
               doc.text(`Contact: ${data.brochurePhones || "+91 9911782350"}  |  Visit: www.weekendux.com`, 15, 284);
               doc.text(`Page ${i} of ${pageCount}`, 180, 284);
          }

          const fileName = `${(data.title || "syllabus").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-syllabus.pdf`;
          doc.save(fileName);
     };

     return (
          <>
               {/* First Section: Promo Content and Admissions Form */}
               <section className="bg-[#F8F6EE] py-12 lg:py-20 font-urbanist w-full">
                    <div className="custom-width px-4 sm:px-6 lg:px-16">
                         {/* New Custom Section with Left-side Info and Right-side Form/Banner */}
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start px-2">

                              {/* LEFT COLUMN: Content */}
                              <div className="space-y-8 lg:col-span-2">
                                   <div>
                                        <h2 className="font-playfair text-[32px] md:text-[44px] font-extrabold leading-tight text-zinc-900">
                                             {displayTitle}
                                        </h2>
                                        <div className="w-20 h-1 md:h-1.5 bg-official mt-4 rounded"></div>
                                   </div>

                                   <div className="space-y-4 font-urbanist text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                                        {paragraphs.map((p, idx) => (
                                             <p key={idx}>{p}</p>
                                        ))}
                                   </div>

                                   {/* Benefits List */}
                                   <ul className="space-y-4 font-urbanist text-[16px] md:text-[17px] font-semibold text-zinc-800">
                                        {benefitsList.map((benefit, idx) => (
                                             <li key={idx} className="flex items-center gap-3">
                                                  <span className="text-[#FF7A00] shrink-0">
                                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                       </svg>
                                                  </span>
                                                  <span>{benefit}</span>
                                             </li>
                                        ))}
                                   </ul>

                                   {/* Share Section */}
                                   <div className="pt-6 border-t border-zinc-200">
                                        <div className="flex flex-col gap-3">
                                             <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold font-urbanist">
                                                  Share This Course
                                             </span>
                                             <div className="w-8 h-0.5 bg-official"></div>
                                             <div className="flex items-center gap-3.5 mt-2">
                                                  {/* Facebook Share */}
                                                  <a
                                                       href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                                       aria-label="Share on Facebook"
                                                  >
                                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                                       </svg>
                                                  </a>
                                                  {/* LinkedIn Share */}
                                                  <a
                                                       href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                                       aria-label="Share on LinkedIn"
                                                  >
                                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                                       </svg>
                                                  </a>
                                                  {/* Pinterest Share */}
                                                  <a
                                                       href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent("Check out the " + (data?.title || "UI/UX Design") + " course at Weekend UX!")}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                                       aria-label="Share on Pinterest"
                                                  >
                                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.63 7.85 6.39 9.39-.1-.79-.19-2-.04-2.87l1.17-4.96s-.3-.6-.3-1.48c0-1.39.8-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1.01.5 1.84 1.5 1.84 1.8 0 3.19-1.9 3.19-4.64 0-2.42-1.74-4.12-4.22-4.12-2.88 0-4.57 2.16-4.57 4.39 0 .87.34 1.8 0.76 2.3a.35.35 0 0 1 .08.33l-.29 1.18a.31.31 0 0 1-.44.22c-1.28-.6-2.08-2.46-2.08-3.96 0-3.23 2.35-6.2 6.77-6.2 3.55 0 6.32 2.53 6.32 5.92 0 3.53-2.22 6.38-5.31 6.38-1.04 0-2.01-.54-2.35-1.18l-.64 2.43c-.23.89-.86 2.01-1.28 2.69 1 .31 2.05.47 3.14.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                                                       </svg>
                                                  </a>
                                                  {/* Twitter Share */}
                                                  <a
                                                       href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Check out the " + (data?.title || "UI/UX Design") + " course at Weekend UX!")}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                                       aria-label="Share on Twitter"
                                                  >
                                                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                       </svg>
                                                  </a>
                                                  {/* Email Share */}
                                                  <a
                                                       href={`mailto:?subject=${encodeURIComponent("Check out the " + (data?.title || "UI/UX Design") + " course")}&body=${encodeURIComponent("I found this amazing course on Weekend UX: " + shareUrl)}`}
                                                       className="w-10 h-10 rounded-full bg-neutral/10 text-neutral hover:bg-official hover:text-white flex items-center justify-center transition duration-300 cursor-pointer"
                                                       aria-label="Share via Email"
                                                  >
                                                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                                       </svg>
                                                  </a>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Custom Rich Text Content below Social Media icons */}
                                   {data?.promoSocialBottomContent && (
                                        <div className="pt-6 border-t border-zinc-200">
                                             <div
                                                  className="prose prose-zinc max-w-none font-urbanist text-[16px] md:text-[17px] text-zinc-700 leading-relaxed space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-zinc-900 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-zinc-900 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-zinc-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-official [&_a]:underline"
                                                  dangerouslySetInnerHTML={{ __html: data.promoSocialBottomContent }}
                                             />
                                        </div>
                                   )}
                              </div>

                              {/* RIGHT COLUMN: Sidebar Form and CallCard Card */}
                              <div className="space-y-6 lg:sticky lg:top-24">

                                   {/* Admission Form */}
                                   <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-zinc-150">
                                        <h2 className="text-center text-[22px] md:text-[24px] font-bold text-neutral leading-9 mb-4">
                                             Send Us Your Training Requirement
                                        </h2>
                                        <p className="text-center text-sm text-neutral leading-relaxed mb-6">
                                             Not sure yet? Before you pass up the opportunity to sign up for the course, speak with our counselor and get your questions answered.
                                        </p>
                                        <Form />
                                   </div>

                                   {/* Banner */}
                                   <div className="rounded-3xl overflow-hidden">
                                        <CallCard
                                             title="Design is more than just being creative!"
                                             subtitle="Learn how to make design that sells"
                                             buttonText="Enquire Now"
                                             bgImage={CardBg.src}
                                             onButtonClick={() => {
                                                  window.dispatchEvent(new CustomEvent("openLeadModal"));
                                             }}
                                        />
                                   </div>

                              </div>

                         </div>
                    </div>
               </section>

               {/* Second Section: Brochure CTA Banner */}
               <section className="bg-white py-12 font-urbanist w-full border-t border-b border-zinc-100">
                    <div className="custom-width px-4 sm:px-6 lg:px-16">
                         <div
                              className="relative overflow-hidden bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm-48 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm0-36c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm48 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm-24 18c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z' fill='%23E85B24' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
                         >
                              {/* Content info */}
                              <div className="flex-1 space-y-3 text-left">
                                   <h2 className="font-playfair text-[24px] md:text-[28px] font-bold text-zinc-900 leading-tight">
                                        {data?.brochureTitle || "Comprehensive Syllabus for UI UX Design Training"}
                                   </h2>
                                   <p className="font-urbanist text-[15px] md:text-[16px] text-zinc-500 leading-relaxed max-w-3xl">
                                        {data?.brochureSubtext || "Chart your path to a thriving career as a UI/UX designer. Explore our course brochure for an in-depth look at the syllabus training from the best UI UX Design Institute in Delhi. Download now."}
                                   </p>

                                   <p className="font-urbanist text-[16px] md:text-[17px] text-zinc-800 pt-2">
                                        Get in touch <span className=" font-bold">{data?.brochurePhones || "+91 9911782350 or +91 9811818122"}</span>
                                   </p>
                              </div>

                              {/* CTA button */}
                              <div className="shrink-0">
                                   <button
                                        onClick={() => {
                                             window.dispatchEvent(new CustomEvent("openLeadModal"));
                                        }}
                                        className="h-12 px-8 bg-linear-to-r from-zinc-800 to-zinc-900 text-white shadow-sm rounded-md hover:from-zinc-800/70 hover:to-zinc-900/70 text-sm font-bold transition-all duration-300 cursor-pointer flex items-center justify-center font-urbanist"
                                   >
                                        Get Brochure
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>

               {/* Third Section: Short-term Courses Slider Banner */}
               <section className="bg-official px-2 py-8 md:py-24 font-urbanist text-zinc-900 w-full">
                    <div className="custom-width px-4 sm:px-6 lg:px-16">
                         <div className="relative overflow-hidden">

                              {/* Optional background abstract circles */}
                              {/* <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-black/5 pointer-events-none"></div> */}
                              {/* <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-black/5 pointer-events-none"></div> */}

                              <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_520px] gap-12 items-center relative z-10">

                                   {/* Left Text details */}
                                   <div className="space-y-6 text-left flex flex-col justify-between h-full min-h-62.5">
                                        <div className="space-y-4">
                                             <h2 className="font-playfair text-[32px] md:text-[42px] font-bold leading-tight font-neutral">
                                                  {data?.shortTerm?.title || "Short-term UX Design Courses"}
                                             </h2>
                                             <p className="font-urbanist text-[16px] md:text-[17px] text-zinc-700 leading-relaxed max-w-lg">
                                                  {data?.shortTerm?.description || "Check out the short duration courses for building a strong foundation in UI & UX design."}
                                             </p>
                                        </div>

                                        {/* Bottom Apply Now and Arrows Row */}
                                        <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-zinc-900/10 mt-4">
                                             <Link
                                                  href="/contact-us"
                                                  className="h-12 px-8 bg-linear-to-r from-zinc-800 to-zinc-900 text-white shadow-sm rounded-md hover:from-zinc-800/90 hover:to-zinc-900/90 text-sm font-bold transition-all duration-300 cursor-pointer flex items-center justify-center font-urbanist"
                                             >
                                                  Enquire Now
                                             </Link>

                                             {/* Slider Controls */}
                                             {shortTermItems.length > 1 && (
                                                  <div className="flex items-center gap-4">
                                                       <button
                                                            onClick={handlePrev}
                                                            className="w-10 h-10 rounded-full border border-zinc-900/30 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all duration-300 cursor-pointer"
                                                            aria-label="Previous Course"
                                                       >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                       </button>
                                                       <button
                                                            onClick={handleNext}
                                                            className="w-10 h-10 rounded-full border border-zinc-900/30 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all duration-300 cursor-pointer"
                                                            aria-label="Next Course"
                                                       >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                            </svg>
                                                       </button>
                                                  </div>
                                             )}
                                        </div>

                                   </div>

                                   {/* Right Card display */}
                                   <div className="w-full min-h-65">
                                        <div className="bg-white text-zinc-900 rounded-3xl p-8 shadow-lg border border-blue-100 min-h-55 flex flex-col justify-between transition-all duration-500 transform hover:scale-[1.01]">

                                             <p className="font-urbanist text-[15px] md:text-[16px] text-zinc-650 leading-relaxed text-left mb-6 font-medium">
                                                  {shortTermItems[sliderIndex]?.description}
                                             </p>

                                             <div className="flex items-center gap-4 border-t border-zinc-100 pt-5 mt-auto">
                                                  <div className="shrink-0">
                                                       {shortTermItems[sliderIndex]?.image ? (
                                                            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-zinc-200 bg-white shrink-0 shadow-sm">
                                                                 <img
                                                                      src={shortTermItems[sliderIndex].image}
                                                                      alt={shortTermItems[sliderIndex]?.alt || shortTermItems[sliderIndex]?.title || "Course Image"}
                                                                      className="w-full h-full object-cover"
                                                                      onError={(e) => {
                                                                           e.target.onerror = null;
                                                                           e.target.style.display = "none";
                                                                      }}
                                                                 />
                                                            </div>
                                                       ) : (
                                                            getIconBadge(shortTermItems[sliderIndex]?.iconText)
                                                       )}
                                                  </div>
                                                  <div className="text-left">
                                                       <h3 className="font-urbanist text-[17px] md:text-[19px] font-bold text-zinc-900 leading-tight">
                                                            {shortTermItems[sliderIndex]?.title}
                                                       </h3>
                                                       <p className="font-urbanist text-[11px] font-bold text-zinc-400 tracking-wider uppercase mt-1">
                                                            {shortTermItems[sliderIndex]?.duration}
                                                       </p>
                                                  </div>
                                             </div>

                                        </div>
                                   </div>

                              </div>
                         </div>
                    </div>
               </section>

               {/* Fourth Section: Student Case Studies Slider Section */}
               <section className="bg-[#FAF9F5] py-8 md:py-24 font-urbanist w-full">
                    <div className="custom-width px-4 sm:px-6 lg:px-16 overflow-hidden">
                         <div className="text-center space-y-4 mb-5 md:mb-12">
                              <h2 className="font-playfair text-[32px] md:text-[42px] font-bold text-zinc-900 leading-tight">
                                   {displayCaseStudiesTitle}
                              </h2>
                              <p className="font-urbanist text-[16px] md:text-[17px] text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                                   {data?.caseStudies?.description || "Click and explore our students UX projects done in the institute in their courses."}
                              </p>
                         </div>

                         {/* Case Studies Carousel Layout */}
                         <div className="overflow-hidden relative w-full px-2">
                              <div
                                   className="flex transition-transform duration-500 ease-in-out min-h-50 md:min-h-100"
                                   style={{ transform: `translateX(-${caseStudyIndex * (100 / visibleCards)}%)` }}
                              >
                                   {caseStudiesItems.map((study, idx) => (
                                        <div
                                             key={idx}
                                             className="shrink-0 px-3 transition-all duration-300"
                                             style={{ width: `${100 / visibleCards}%` }}
                                        >
                                             <Link
                                                  href={study.link || "#"}
                                                  className="group block bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:border-official shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
                                             >
                                                  <div className="aspect-4/3 bg-zinc-100 overflow-hidden relative">
                                                       {study.image ? (
                                                            <img
                                                                 src={study.image}
                                                                 alt={study.alt || "Student work mockup"}
                                                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                       ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-zinc-400 font-urbanist text-sm">
                                                                 No image uploaded
                                                            </div>
                                                       )}
                                                  </div>
                                                  <div className="p-5 border-t border-zinc-100 text-left">
                                                       <p className="font-urbanist font-bold text-zinc-800 text-base group-hover:text-official transition duration-300 line-clamp-1">
                                                            {study.alt || `Case Study ${idx + 1}`}
                                                       </p>
                                                  </div>
                                             </Link>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Bottom Navigation controls */}
                         {caseStudiesItems.length > visibleCards && (
                              <div className="flex items-center justify-center gap-6 mt-5 md:mt-12">
                                   <button
                                        onClick={handleCaseStudyPrev}
                                        className="w-12 h-12 rounded-full border border-zinc-300 hover:border-official text-zinc-600 hover:text-official flex items-center justify-center transition cursor-pointer hover:shadow-md bg-white"
                                        aria-label="Previous Case Study"
                                   >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                   </button>
                                   <button
                                        onClick={handleCaseStudyNext}
                                        className="w-12 h-12 rounded-full border border-zinc-300 hover:border-official text-zinc-600 hover:text-official flex items-center justify-center transition cursor-pointer hover:shadow-md bg-white"
                                        aria-label="Next Case Study"
                                   >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                   </button>
                              </div>
                         )}

                    </div>
               </section>

               {/* Fifth Section: Explore More Career Domains Section */}
               <section
                    className="relative px-2 py-8 md:py-28 font-urbanist w-full overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
               >
                    {/* Premium blurred glass overlay */}
                    <div className="absolute inset-0 bg-[#FAF9F5]/93 backdrop-blur-[2px] -mt-px"></div>

                    <div className="custom-width px-4 sm:px-6 lg:px-16 relative z-10">
                         {/* Section Title & Description */}
                         <div className="text-left space-y-4 mb-12">
                              <h2 className="font-playfair text-[32px] md:text-[42px] font-bold text-zinc-900 leading-tight">
                                   {displayCareerDomainsTitle}
                              </h2>
                              <p className="font-urbanist text-[16px] md:text-[17px] text-zinc-500 max-w-3xl leading-relaxed">
                                   {careerDomainsDescription}
                              </p>
                         </div>

                         {/* Career Domains Flex Layout */}
                         <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-start">
                              {careerDomainsItems.map((item, idx) => (
                                   <Link
                                        key={idx}
                                        href={item.link || "#"}
                                        className="flex items-center gap-2 sm:gap-3 bg-white px-3.5 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/80 hover:shadow-md hover:scale-[1.01] transition-all duration-300 group shrink-0"
                                        onMouseEnter={(e) => {
                                             if (item.color) e.currentTarget.style.borderColor = item.color;
                                        }}
                                        onMouseLeave={(e) => {
                                             e.currentTarget.style.borderColor = "";
                                        }}
                                   >
                                        <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 [&>svg]:w-4.5 [&>svg]:h-4.5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                                             {getDomainIconSVG(item.iconName, item.color)}
                                        </div>
                                        <span
                                             className="font-urbanist font-extrabold text-[12.5px] sm:text-[15px] md:text-[16px] transition-colors duration-300"
                                             style={{ color: item.color || "#18181b" }}
                                        >
                                             {item.name}
                                        </span>
                                   </Link>
                              ))}
                         </div>

                    </div>
               </section>
          </>
     );
}

function getDomainIconSVG(iconName, color = "currentColor") {
     const stroke = color;
     const fill = `${color}15`; // ~8% opacity fill for premium look
     const normalized = (iconName || "").toLowerCase().trim();

     switch (normalized) {
          case "graphic":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="m12 22 1-1c1.4-1.4 2.4-3.2 3-5.2l.5-1.8H7.5l.5 1.8c.6 2 1.6 3.8 3 5.2Z" fill={fill} />
                         <path d="M19 3a3.5 3.5 0 0 0-5 0l-7.5 7.5c-.6.6-.9 1.4-.9 2.3V14h1.2c.9 0 1.7-.3 2.3-.9L19 5a3.5 3.5 0 0 0 0-5Z" />
                         <path d="m14 8 2-2" />
                    </svg>
               );
          case "web":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="12" cy="12" r="10" fill={fill} />
                         <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                         <path d="M2 12h20" />
                    </svg>
               );
          case "post":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <line x1="4" x2="4" y1="21" y2="14" />
                         <line x1="4" x2="4" y1="10" y2="3" />
                         <line x1="12" x2="12" y1="21" y2="12" />
                         <line x1="12" x2="12" y1="8" y2="3" />
                         <line x1="20" x2="20" y1="21" y2="16" />
                         <line x1="20" x2="20" y1="12" y2="3" />
                         <line x1="2" x2="6" y1="14" y2="14" />
                         <line x1="10" x2="14" y1="8" y2="8" />
                         <line x1="18" x2="22" y1="16" y2="16" />
                    </svg>
               );
          case "analytics":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M3 3v18h18" />
                         <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
               );
          case "cad":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M4 22h16" />
                         <path d="M20 22V10" />
                         <path d="M4 22V10" />
                         <path d="M12 2 2 7v3h20V7L12 2Z" fill={fill} />
                         <path d="M8 22V10" />
                         <path d="M12 22V10" />
                         <path d="M16 22V10" />
                    </svg>
               );
          case "animation":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" fill={fill} />
                         <path d="M12 21v-9" />
                         <path d="m21 8-9 4-9-4" />
                         <path d="m12 12 9-5" />
                         <path d="m12 12-9-5" />
                    </svg>
               );
          case "code":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="m18 16 4-4-4-4" />
                         <path d="m6 8-4 4 4 4" />
                         <path d="m14.5 4-5 16" />
                    </svg>
               );
          case "textile":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <polygon points="12 2 22 8.5 22 19.5 12 22 2 19.5 2 8.5" fill={fill} />
                         <line x1="12" y1="2" x2="12" y2="22" />
                         <line x1="2" y1="8.5" x2="22" y2="19.5" />
                         <line x1="2" y1="19.5" x2="22" y2="8.5" />
                    </svg>
               );
          case "software":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="12" cy="12" r="3" fill={fill} />
                         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
               );
          case "marketing":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                         <path d="M2 13h4.4a2 2 0 0 0 1.4-.6L11 9H2v4Z" fill={fill} />
                         <path d="M11 9c0-3.87 3.13-7 7-7v18c-3.87 0-7-3.13-7-7" />
                         <path d="M18 2a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4" />
                    </svg>
               );
          case "ai":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <rect x="3" y="11" width="18" height="10" rx="2" fill={fill} />
                         <path d="M12 2v4" />
                         <path d="M8 8a4 4 0 0 1 8 0" />
                         <circle cx="9" cy="14" r="1.5" fill={stroke} />
                         <circle cx="15" cy="14" r="1.5" fill={stroke} />
                    </svg>
               );
          case "video":
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <rect x="2" y="3" width="20" height="18" rx="5" ry="5" fill={fill} />
                         <polygon points="10 8 16 12 10 16 10 8" fill={stroke} />
                    </svg>
               );
          default:
               return (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="12" cy="12" r="10" fill={fill} />
                         <path d="M12 16v-4" />
                         <path d="M12 8h.01" />
                    </svg>
               );
     }
}

function getIconBadge(text) {
     const lower = (text || "").toLowerCase().trim();

     if (text && (text.startsWith("/") || text.startsWith("http"))) {
          return (
               <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-zinc-200 bg-white shrink-0 shadow-sm">
                    <img
                         src={text}
                         alt="Course Icon"
                         className="w-full h-full object-cover"
                         onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/Figma.webp";
                         }}
                    />
               </div>
          );
     }

     if (lower === "xd") {
          return (
               <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-lg border border-pink-200 shrink-0">
                    Xd
               </div>
          );
     }

     // Default fallback image using /images/Figma.webp
     return (
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-zinc-200 bg-white shrink-0 shadow-sm">
               <img
                    src="/images/Figma.webp"
                    alt={text || "Figma Icon"}
                    className="w-full h-full object-cover"
               />
          </div>
     );
}