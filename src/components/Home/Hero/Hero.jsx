"use client";

import { useState, useEffect } from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../../ui/Button";
import { useHomeData } from "@/context/HomeDataContext";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";

const staticSlides = [
     {
          tagline: "Learn As You Desire",
          titleHtml: "Design <span class=\"italic text-official\">Skills</span> That<br/>Actually Get You Hired.",
          points: [
               "Explore a curated, collaborative environment.",
               "Find your right fit, online or in-person.",
               "Industry vetted curriculum designed by mentors."
          ],
          bgImage: "/images/weekend-ux-hero-bg-template.webp",
          buttonText: "Explore Programs"
     },
     {
          tagline: "Build Your Future",
          titleHtml: "Master <span class=\"italic text-official\">Products</span> With<br/>Industry Leading Mentors.",
          points: [
               "Hands-on UI/UX design workshops.",
               "Real-world case studies & projects.",
               "Personalized portfolio reviews & critiques."
          ],
          bgImage: "/images/weekend-ux-hero-bg-template.webp",
          buttonText: "Explore Programs"
     },
     {
          tagline: "Collaborate & Grow",
          titleHtml: "Join <span class=\"italic text-official\">Community</span> Of<br/>Creative Designers & Creators.",
          points: [
               "Connect with thousands of active alumni.",
               "Work on live briefs and team hackathons.",
               "Fast-track your design career starting today."
          ],
          bgImage: "/images/weekend-ux-hero-bg-template.webp",
          buttonText: "Explore Programs"
     }
];

export default function Hero({
     bgColor = "bg-neutral",
     taglineColor = "text-official",
     titleColor = "text-white",
     pointsColor = "text-white/70",
     activeDotColor = "bg-official"
}) {
     const { homeData } = useHomeData();
     const [currentSlide, setCurrentSlide] = useState(0);

     const slides = (homeData?.hero && homeData.hero.length > 0)
          ? homeData.hero.map((slide, idx) => {
               const fallback = staticSlides[idx] || staticSlides[0];
               const tagline = slide?.title?.trim() ? slide.title.trim() : fallback.tagline;

               const start = slide?.startheading?.trim() || "";
               const mid = slide?.midheading?.trim() || "";
               const end = slide?.endheading?.trim() || "";

               const titleHtml = (start || mid || end)
                    ? `${start} ${mid ? `<span class="italic text-official">${mid}</span>` : ""} ${end}`.trim()
                    : fallback.titleHtml;

               const points = Array.isArray(slide?.points) && slide.points.length > 0
                    ? slide.points
                    : fallback.points;
               const bgImage = slide?.bgImage?.trim() ? slide.bgImage.trim() : fallback.bgImage;
               const buttonText = slide?.buttonName?.trim() ? slide.buttonName.trim() : fallback.buttonText;

               return { tagline, titleHtml, points, bgImage, buttonText };
          })
          : staticSlides;

     const nextSlide = () => {
          setCurrentSlide((prev) => (prev + 1) % (slides.length || 1));
     };

     const prevSlide = () => {
          setCurrentSlide((prev) => (prev - 1 + (slides.length || 1)) % (slides.length || 1));
     };

     // Auto-play
     useEffect(() => {
          const timer = setInterval(() => {
               setCurrentSlide((prev) => (prev + 1) % (slides.length || 1));
          }, 6000);
          return () => clearInterval(timer);
     }, [slides.length]);

     return (
          <section id="home-hero" className={`relative min-h-145 overflow-hidden text-white select-none mt-12 ${bgColor}`}>
               {/* Slides Wrapper */}
               <div className="relative min-h-145 w-full">
                    {slides.map((slide, index) => (
                         <div
                              key={index}
                              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                                   ? "opacity-100 z-10 scale-100"
                                   : "opacity-0 z-0 pointer-events-none scale-105"
                                   }`}
                         >
                              {/* Background Image */}
                              <OptimizedImage
                                   src={slide.bgImage}
                                   alt={slide.tagline || "weekend-ux-hero-bg-template"}
                                   className="absolute inset-0 w-full h-full"
                                   priority={index === 0}
                                   fetchPriority={index === 0 ? "high" : undefined}
                                   objectFit="cover"
                                   fallbackSrc="/images/weekend-ux-hero-bg-template.webp"
                              />
                              {/* Dark Overlay for better text readability */}
                              {/* <div className="absolute inset-0 bg-neutral/40" /> */}

                              {/* Content */}
                              <div className="relative z-20 mx-auto flex min-h-145 max-w-337.5 items-center px-6 sm:px-10 lg:px-16">
                                   <div className="max-w-197.5">
                                        <p
                                             className={`mb-5 text-[11px] md:text-[14px] font-semibold font-inter uppercase tracking-[0.45em] transition-all duration-700 transform delay-100 ${taglineColor} ${index === currentSlide
                                                  ? "translate-y-0 opacity-100"
                                                  : "translate-y-8 opacity-0"
                                                  }`}
                                        >
                                             {slide.tagline}
                                        </p>

                                        <h1
                                             className={`font-playfair text-[37px] leading-13 md:leading-16 md:text-[56px] transition-all duration-700 transform delay-300 ${titleColor} ${index === currentSlide
                                                  ? "translate-y-0 opacity-100"
                                                  : "translate-y-8 opacity-0"
                                                  }`}
                                             dangerouslySetInnerHTML={{ __html: slide.titleHtml }}
                                        />

                                        <ul
                                             className={`mt-8 max-w-140 text-base leading-7 font-urbanist transition-all duration-700 transform delay-500 space-y-2 list-none ${pointsColor} ${index === currentSlide
                                                  ? "translate-y-0 opacity-100"
                                                  : "translate-y-8 opacity-0"
                                                  }`}
                                        >
                                             {Array.isArray(slide.points) && slide.points.filter(p => p.trim() !== "").map((point, pIdx) => (
                                                  <li key={pIdx} className="flex items-start gap-2 text-[15px] md:text-[17px]">
                                                       {/* <span className="text-official select-none mt-1 shrink-0">•</span> */}
                                                       <span>{point}</span>
                                                  </li>
                                             ))}
                                        </ul>

                                        <div
                                             className={`transition-all duration-700 transform delay-700 ${index === currentSlide
                                                  ? "translate-y-0 opacity-100"
                                                  : "translate-y-8 opacity-0"
                                                  }`}
                                        >
                                             <Link href="/courses">
                                                  <Button variant="primary" className="mt-10 hover:scale-101">
                                                       {slide.buttonText}
                                                  </Button>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>

               {/* Navigation Arrows */}
               {/* <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-neutral/40 p-3 text-white backdrop-blur-md transition-all hover:bg-official/80 hover:text-neutral hover:scale-110 active:scale-95 cursor-pointer hidden md:flex items-center justify-center"
                    aria-label="Previous slide"
               >
                    <FiChevronLeft size={24} />
               </button>

               <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-neutral/40 p-3 text-white backdrop-blur-md transition-all hover:bg-official/80 hover:text-neutral hover:scale-110 active:scale-95 cursor-pointer hidden md:flex items-center justify-center"
                    aria-label="Next slide"
               >
                    <FiChevronRight size={24} />
               </button> */}

               {/* Dot Indicators */}
               <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2">
                    {slides.map((_, index) => (
                         <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className="flex h-11 w-11 items-center justify-center cursor-pointer"
                              aria-label={`Go to slide ${index + 1}`}
                         >
                              <span
                                   className={`block rounded-full transition-all duration-300 h-2.5 ${index === currentSlide
                                        ? `w-8 ${activeDotColor}`
                                        : "w-2.5 bg-white/30 hover:bg-white/60"
                                        }`}
                              />
                         </button>
                    ))}
               </div>

          </section>
     );
}