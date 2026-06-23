"use client";

import Map from '@/app/assets/weekend-ux-testimonials-bg.webp';
import { useEffect, useRef, useState } from "react";
import comma from '@/app/assets/weekend-ux-testimonials-decoratice-comma.webp';
import testiImage from '@/app/assets/weekend-ux-testimonials-user-default-icon.webp';
import { usePathname } from "next/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from 'next/image';
import OptimizedImage from "@/components/ui/OptimizedImage";

const DEFAULT_TESTIMONIALS = [
     {
          name: "Kathy Sullivan",
          role: "Data Scientist",
          image: testiImage,
          text: `"I had an amazing experience! The training was top-notch, and the mentors were incredibly helpful. I highly recommend them to anyone looking to level up!"`,
     },
     {
          name: "Alex Carter",
          role: "Full Stack Developer",
          image: testiImage,
          text: `"The curriculum is highly industry-relevant. The hands-on projects and community support helped me gain real confidence in web development."`,
     },
     {
          name: "Sophia Martinez",
          role: "Product Designer",
          image: testiImage,
          text: `"Mentorship here is outstanding. The guidance on design systems and portfolio reviews completely changed my approach to product design."`,
     },
     {
          name: "David Kim",
          role: "AI Specialist",
          image: testiImage,
          text: `"Extremely well-structured courses with deep insights into modern AI. The labs and practical exercises made complex concepts easy to grasp."`,
     },
     {
          name: "Aisha Patel",
          role: "Project Manager",
          image: testiImage,
          text: `"Great learning environment and superb support team. The interactive sessions and alumni network added immense value to my career."`,
     }
];

const Testimonials = ({ data }) => {
     const sliderRef = useRef();
     const [currentIndex, setCurrentIndex] = useState(0);
     const [maxIndex, setMaxIndex] = useState(0);
     const [testimonialsList, setTestimonialsList] = useState(DEFAULT_TESTIMONIALS);
     const pathname = usePathname();

     const pathnames = pathname.split("/").filter((x) => x);
     const isLocation = pathname.startsWith("/location");
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

     // ✅ Fetch all reviews dynamically
     // useEffect(() => {
     //      const fetchReviews = async () => {
     //           const data = await getAllReviews();
     //           if (data && data.length > 0) {
     //                const formatted = data.map((review) => ({
     //                     name: review.name,
     //                     role: review.role || review.courseName || "Student",
     //                     image: review.image || testiImage,
     //                     text: review.text
     //                }));
     //                setTestimonialsList(formatted);
     //           } else {
     //                setTestimonialsList(DEFAULT_TESTIMONIALS);
     //           }
     //      };
     //      fetchReviews();
     // }, []);

     // ✅ Calculate maxIndex (responsive safe)
     useEffect(() => {
          const calculateAll = () => {
               calculateCardWidth();
               calculateVisibleCards();
               setMaxIndex(
                    Math.max(testimonialsList.length - visibleCardsRef.current, 0)
               );
          };

          calculateAll();

          window.addEventListener("resize", calculateAll);
          return () => window.removeEventListener("resize", calculateAll);
     }, [testimonialsList]);

     // ✅ Arrow scroll
     const scroll = (direction) => {
          let newIndex =
               direction === "left"
                    ? Math.max(currentIndex - 1, 0)
                    : Math.min(currentIndex + 1, maxIndex);

          setCurrentIndex(newIndex);

          sliderRef.current.scrollTo({
               left: newIndex * cardWidthRef.current,
               behavior: "auto",
          });
     };

     // ✅ Sync scroll → dots
     useEffect(() => {
          const slider = sliderRef.current;
          if (!slider) return;

          let ticking = false;

          const handleScroll = () => {
               if (!ticking) {
                    requestAnimationFrame(() => {
                         const scrollLeft = slider.scrollLeft;
                         const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

                         let index;
                         if (scrollLeft <= 10) {
                              index = 0;
                         } else if (scrollLeft >= maxScrollLeft - 10) {
                              index = maxIndex;
                         } else if (cardWidthRef.current > 0) {
                              index = Math.round(scrollLeft / cardWidthRef.current);
                         } else {
                              index = 0;
                         }

                         index = Math.max(0, Math.min(index, maxIndex));
                         setCurrentIndex(index);
                         ticking = false;
                    });
                    ticking = true;
               }
          };

          slider.addEventListener("scroll", handleScroll);

          return () => slider.removeEventListener("scroll", handleScroll);
     }, [maxIndex]);

     return (
          <div className='relative min-h-100 md:min-h-84.25 mx-auto w-full px-4 sm:px-6 lg:px-10 pt-18 lg:pt-16'>
               <Image src={Map} alt="Testimonial Map Bg" fetchPriority='high' decoding="async" className='absolute top-0 inset-0 w-full h-screen md:h-[110vh] z-10 object-cover' />

               {/* Heading */}

                    <h2 className="text-[38px] md:text-[58px] 2xl:text-[72px] leading-10 md:leading-15 2xl:leading-20 font-medium text-center w-[99%] md:w-[60%] mx-auto z-20 relative font-playfair text-black">
                         {data?.startTitle || "What Our"}{" "}
                         <span className="relative inline-block text-official italic">
                              {data?.midTitle || "Students"}
                         
                         </span>{' '}
                         {data?.endTitle || "Say About Us"}
                    </h2>

               {/* Description */}
               <p className={`text-[14px] 2xl:text-[16px] text-black/60 leading-6 md:leading-7 text-center ${isLocation ? 'max-w-3xl' : 'max-w-4xl'}  mx-auto mt-6 z-20 relative`}>
                    {isLocation ? "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs." : (data?.description || "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.")}
               </p>


               <div className="relative z-20 w-full pl-0 md:pl-16">

                    {/* Slider */}
                    <div
                         ref={sliderRef}
                         className="flex gap-5 md:gap-11 overflow-x-auto scroll-smooth hide-scrollbar pt-20 pl-2 md:pl-9"
                    >
                         {testimonialsList.map((item, i) => (
                              <div
                                   key={i}
                                   className="relative min-w-80 md:min-w-100 max-w-80 md:max-w-100 rounded-[28px] border border-[#D9D6CE] bg-white/10 p-7 backdrop-blur-sm"
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
                                        alt="quote"
                                        className="absolute top-6 right-6 w-18  -scale-x-100"
                                   />

                                   {/* Testimonial */}
                                   <p className="text-[16px] leading-6 text-[#454545] mb-8 max-w-[95%]">
                                        {item.text}
                                   </p>

                                   {/* User */}
                                   <div className="flex items-center gap-4">
                                        <OptimizedImage
                              src={typeof item.image === 'string' ? item.image : item.image?.src || testiImage.src}
                              alt={`${item.name} profile`}
                              fallbackSrc={testiImage.src}
                              className="w-15 h-15 rounded-full object-cover border border-[#E5E5E5]"
                        />

                                        <div>
                                             <h3 className="text-[24px] font-bold leading-none text-[#1F1F1F]">
                                                  {item.name}
                                             </h3>

                                             <p className="mt-2 text-[17px] italic text-[#8B8B8B]">
                                                  {item.role}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-end gap-3 mt-8">

                         {/* DOTS */}
                         <div className="flex items-center gap-0">
                              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                                   <button
                                        key={i}
                                        onClick={() => {
                                             setCurrentIndex(i);
                                             sliderRef.current.scrollTo({
                                                  left: i * cardWidthRef.current,
                                                  behavior: "auto",
                                             });
                                        }}
                                        aria-label={`Go to slide ${i + 1}`}
                                        aria-current={currentIndex === i ? "true" : undefined}
                                        className="p-2 md:p-3 cursor-pointer"
                                   >
                                        <span className={`block rounded-full transition-all duration-300
                    ${currentIndex === i ? "w-6 h-2 bg-gray-800" : "w-2 h-2 bg-gray-300"}`}
                                        />
                                   </button>
                              ))}
                         </div>

                         {/* Arrows */}
                         <button
                              onClick={() => scroll("left")}
                              aria-label="Go to Previous Testimonial"
                              className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
                         >
                              <IoIosArrowBack />
                         </button>

                         <button
                              onClick={() => scroll("right")}
                              aria-label="Go to Next Testimonial"
                              className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
                         >
                              <IoIosArrowForward />
                         </button>
                    </div>
               </div>


          </div>
     )
}

export default Testimonials