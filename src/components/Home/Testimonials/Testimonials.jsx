"use client";

import Map from '@/app/assets/weekend-ux-testimonials-bg.webp';
import { useEffect, useRef, useState, useMemo } from "react";
import comma from '@/app/assets/weekend-ux-testimonials-decoratice-comma.webp';
import testiImage from '@/app/assets/weekend-ux-testimonials-user-default-icon.webp';
import { usePathname } from "next/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from 'next/image';
import OptimizedImage from "@/components/ui/OptimizedImage";

const DEFAULT_TESTIMONIALS = [
     {
          name: "Kathy Sullivan",
          image: testiImage,
          text: `"I had an amazing experience! The training was top-notch, and the mentors were incredibly helpful. I highly recommend them to anyone looking to level up!"`,
     },
     {
          name: "Alex Carter",
          image: testiImage,
          text: `"The curriculum is highly industry-relevant. The hands-on projects and community support helped me gain real confidence in web development."`,
     },
     {
          name: "Sophia Martinez",
          image: testiImage,
          text: `"Mentorship here is outstanding. The guidance on design systems and portfolio reviews completely changed my approach to product design."`,
     },
     {
          name: "David Kim",
          image: testiImage,
          text: `"Extremely well-structured courses with deep insights into modern AI. The labs and practical exercises made complex concepts easy to grasp."`,
     },
     {
          name: "Aisha Patel",
          image: testiImage,
          text: `"Great learning environment and superb support team. The interactive sessions and alumni network added immense value to my career."`,
     }
];

import { useHomeData } from "@/context/HomeDataContext";

const getInitials = (nameStr) => {
     if (!nameStr) return "";
     const parts = nameStr.trim().split(/\s+/);
     if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Testimonials = ({ data }) => {
     const { homeData, testimonialsData } = useHomeData();
     const sliderRef = useRef();
     const [currentIndex, setCurrentIndex] = useState(0);
     const [maxIndex, setMaxIndex] = useState(0);
     const testimonialsList = useMemo(() => {
          if (testimonialsData && Array.isArray(testimonialsData) && testimonialsData.length > 0) {
               return testimonialsData.map((review) => ({
                    name: review.name,
                    image: review.avatar || testiImage,
                    text: review.quote
               }));
          }
          return DEFAULT_TESTIMONIALS;
     }, [testimonialsData]);
     const pathname = usePathname();

     const pathnames = pathname.split("/").filter((x) => x);
     const isLocation = pathname.startsWith("/location");


     const testimonialsConf = homeData?.testimonials;
     const startTitle = (testimonialsConf?.startheading && testimonialsConf.startheading.trim())
          ? testimonialsConf.startheading
          : (data?.startTitle || "What Our");

     const midTitle = (testimonialsConf?.midheading && testimonialsConf.midheading.trim())
          ? testimonialsConf.midheading
          : (data?.midTitle || "Students");

     const endTitle = (testimonialsConf?.endheading && testimonialsConf.endheading.trim())
          ? testimonialsConf.endheading
          : (data?.endTitle || "Say About Us");

     const testimonialsDescription = (testimonialsConf?.description && testimonialsConf.description.trim())
          ? testimonialsConf.description
          : (data?.description || "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.");
     // ✅ Card width
     const cardWidthRef = useRef(0);

     const calculateCardWidth = () => {
          const slider = sliderRef.current;
          const card = slider?.children[0];

          if (!slider || !card) return;

          const gap = window.innerWidth >= 768 ? 44 : 20;

          // ✅ ONE TIME READ
          cardWidthRef.current = card.getBoundingClientRect().width + gap;
     };

     // ✅ Visible cards
     const visibleCardsRef = useRef(1);

     const calculateVisibleCards = () => {
          const slider = sliderRef.current;
          if (!slider || !cardWidthRef.current) return;

          visibleCardsRef.current = Math.max(
               Math.floor(slider.offsetWidth / cardWidthRef.current),
               1
          );
     };



     // ✅ Calculate maxIndex
     useEffect(() => {
          setMaxIndex(Math.max(testimonialsList.length - 1, 0));
     }, [testimonialsList]);

     const isProgrammaticScrollRef = useRef(false);
     const scrollTimeoutRef = useRef(null);

     // ✅ Scroll to exact card offset
     const scrollToIndex = (index) => {
          const slider = sliderRef.current;
          if (!slider || !slider.children[index]) return;

          const firstCard = slider.children[0];
          const targetCard = slider.children[index];

          if (firstCard && targetCard) {
               const targetLeft = targetCard.offsetLeft - firstCard.offsetLeft;

               isProgrammaticScrollRef.current = true;
               setCurrentIndex(index);

               if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

               slider.scrollTo({
                    left: targetLeft,
                    behavior: "smooth",
               });

               scrollTimeoutRef.current = setTimeout(() => {
                    isProgrammaticScrollRef.current = false;
               }, 450);
          }
     };

     // ✅ Arrow scroll
     const scroll = (direction) => {
          let newIndex =
               direction === "left"
                    ? Math.max(currentIndex - 1, 0)
                    : Math.min(currentIndex + 1, maxIndex);

          scrollToIndex(newIndex);
     };

     // ✅ Sync scroll → dots using exact element offset
     useEffect(() => {
          const slider = sliderRef.current;
          if (!slider) return;

          let ticking = false;

          const handleScroll = () => {
               if (isProgrammaticScrollRef.current) return;

               if (!ticking) {
                    requestAnimationFrame(() => {
                         if (!slider || !slider.children.length) return;

                         const firstCardLeft = slider.children[0].offsetLeft;
                         const scrollLeft = slider.scrollLeft;

                         let closestIndex = 0;
                         let minDistance = Infinity;

                         Array.from(slider.children).forEach((child, idx) => {
                              const childLeft = child.offsetLeft - firstCardLeft;
                              const distance = Math.abs(scrollLeft - childLeft);
                              if (distance < minDistance) {
                                   minDistance = distance;
                                   closestIndex = idx;
                              }
                         });

                         setCurrentIndex(Math.max(0, Math.min(closestIndex, maxIndex)));
                         ticking = false;
                    });
                    ticking = true;
               }
          };

          slider.addEventListener("scroll", handleScroll);

          return () => {
               slider.removeEventListener("scroll", handleScroll);
               if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          };
     }, [maxIndex]);

     return (
          <div className='relative min-h-215 md:min-h-200.25 mx-auto w-full px-4 sm:px-6 lg:px-10 pt-10 lg:pt-16 pb-8 overflow-hidden'>
               <Image src={Map} alt="weekend-ux-testimonials-bg" fetchPriority='high' decoding="async" className='absolute top-0 inset-0 w-full min-h-[120vh] md:h-[110vh] z-10 object-cover' />

               {/* Heading */}
               {isLocation ? (
                    <h2 className="plus-jakarta-sans text-[38px] md:text-[58px] xl:text-[72px] font-bold leading-10 md:leading-15 max-w-140 text-primary text-center z-20 relative mx-auto">
                         What our students say about us
                    </h2>
               ) : (
                    <h2 className="text-[38px] md:text-[58px] 2xl:text-[72px] leading-10 md:leading-15 2xl:leading-20 font-medium text-center w-[99%] md:w-[60%] mx-auto z-20 relative font-playfair text-neutral">
                         {startTitle}{" "}
                         <span className="relative inline-block text-official italic">
                              {midTitle}

                         </span>{' '}
                         {endTitle}
                    </h2>
               )
               }
               {/* Description */}
               <p className={`text-[14px] 2xl:text-[16px] text-neutral/60 leading-6 md:leading-7 text-center ${isLocation ? 'max-w-3xl' : 'max-w-4xl'}  mx-auto mt-6 z-20 relative`}>
                    {isLocation ? "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs." : testimonialsDescription}
               </p>


               <div className="relative z-20 w-full pl-0 md:pl-16">

                    {/* Slider */}
                    <div
                         ref={sliderRef}
                         className="flex gap-4 md:gap-11 overflow-x-auto scroll-smooth hide-scrollbar pt-8 md:pt-20 pl-0 md:pl-9"
                    >
                         {testimonialsList.map((item, i) => (
                              <div
                                   key={i}
                                   className="relative w-[89vw] sm:w-[340px] md:w-[400px] shrink-0 rounded-[28px] border border-[#D9D6CE] bg-white/10 p-5 md:p-7 backdrop-blur-sm shadow-2xs"
                              >
                                   {/* Stars */}
                                   <div className="flex items-center gap-1 mb-6">
                                        {[...Array(5)].map((_, idx) => (
                                             <span key={idx} className="text-official text-2xl">
                                                  ★
                                             </span>
                                        ))}
                                   </div>

                                   {/* Quote Icon */}
                                   <Image
                                        src={comma}
                                        alt="weekend-ux-testimonials-decoratice-comma"
                                        className="absolute top-6 right-6 w-18  -scale-x-100"
                                   />

                                   {/* Testimonial */}
                                   <p className="text-[16px] leading-6 text-[#454545] mb-8 max-w-[95%]">
                                        {item.text}
                                   </p>

                                   {/* User */}
                                   <div className="flex items-center gap-4">
                                        <div className="w-15 h-15 rounded-full bg-official text-neutral flex items-center justify-center font-bold text-lg border border-official/20 shrink-0 select-none">
                                             {getInitials(item.name)}
                                        </div>

                                        <div>
                                             <h3 className="text-[24px] font-bold leading-none text-[#1F1F1F]">
                                                  {item.name}
                                             </h3>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                     {/* Controls */}
                     <div className="flex items-center justify-between md:justify-end gap-3 mt-6 md:mt-8 px-2 md:px-0">

                          {/* Slide Counter on Mobile */}
                          <div className="text-xs font-bold text-neutral/70 md:hidden bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-200/80 shadow-2xs">
                               {currentIndex + 1} / {maxIndex + 1}
                          </div>

                          {/* DOTS WINDOW (Fixed 5 Dots, Cyclic Highlight 1 -> 5 -> 1) */}
                          <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs">
                               {Array.from({ length: Math.min(maxIndex + 1, 5) }).map((_, dotIdx) => {
                                    const activeDotIdx = currentIndex % 5;
                                    const isActive = activeDotIdx === dotIdx;

                                    return (
                                         <button
                                              key={dotIdx}
                                              onClick={() => {
                                                   const currentGroup = Math.floor(currentIndex / 5);
                                                   let targetIndex = (currentGroup * 5) + dotIdx;
                                                   if (targetIndex > maxIndex) {
                                                        targetIndex = dotIdx;
                                                   }
                                                   scrollToIndex(targetIndex);
                                              }}
                                              aria-label={`Go to slide ${dotIdx + 1}`}
                                              aria-current={isActive ? "true" : undefined}
                                              className="p-1 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                                         >
                                              <span className={`block rounded-full transition-all duration-300 ${
                                                   isActive
                                                        ? "w-5 md:w-6 h-1.5 md:h-2 bg-neutral"
                                                        : "w-1.5 md:w-2 h-1.5 md:h-2 bg-zinc-300 hover:bg-zinc-500"
                                              }`}
                                              />
                                         </button>
                                    );
                               })}
                          </div>

                          {/* Navigation Arrows */}
                          <div className="flex items-center gap-2">
                               <button
                                    onClick={() => scroll("left")}
                                    disabled={currentIndex === 0}
                                    aria-label="Go to Previous Testimonial"
                                    className="w-9 h-9 rounded-full border border-zinc-200/80 bg-white/80 flex items-center justify-center text-neutral hover:bg-neutral hover:text-white transition-all duration-200 cursor-pointer shadow-2xs disabled:opacity-30 disabled:cursor-not-allowed"
                               >
                                    <IoIosArrowBack size={16} />
                               </button>

                               <button
                                    onClick={() => scroll("right")}
                                    disabled={currentIndex >= maxIndex}
                                    aria-label="Go to Next Testimonial"
                                    className="w-9 h-9 rounded-full border border-zinc-200/80 bg-white/80 flex items-center justify-center text-neutral hover:bg-neutral hover:text-white transition-all duration-200 cursor-pointer shadow-2xs disabled:opacity-30 disabled:cursor-not-allowed"
                               >
                                    <IoIosArrowForward size={16} />
                               </button>
                          </div>
                     </div>
               </div>


          </div>
     )
}

export default Testimonials