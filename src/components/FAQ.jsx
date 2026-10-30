'use client'
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useHomeData } from "@/context/HomeDataContext";
import { HiMinus, HiPlus } from "react-icons/hi";
import { getApiUrl } from "@/utils/api";

const faqCache = {};
const FAQ = ({
     paddings,
     faqData: initialFaqData,
     bgImage = "/images/weekend-ux-faq-bg.webp",
     bgColor = "bg-white",
     taglineColor = "text-[#f36600]",
     titleColor = "text-neutral",
     titleHighlightColor = "text-[#f36600]",
     descriptionColor = "text-neutral/80",
     questionClosedColor = "text-neutral",
     questionOpenColor = "text-[#f36600] font-bold",
     answerColor = "text-neutral",
     dividerColor = "border-gray-300"
}) => {
     const { faqData: homeFaqData, setFaqVisibility } = useHomeData();
     const pathname = usePathname();
     const [fetchedFaq, setFetchedFaq] = useState({});
     const [activeIndex, setActiveIndex] = useState(0);

     const toggleFaq = (index) => {
          setActiveIndex(index === activeIndex ? null : index);
     };

     let slug = "home";
     if (pathname && pathname !== "/") {
          // Normalise path slug (e.g. /category/blogs -> category-blogs)
          slug = pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-");
          if (slug === "blog") slug = "category-blogs";
     }

     useEffect(() => {
          if (initialFaqData || slug === "home") {
               return;
          }

          // If already cached, do nothing (it will render instantly from memory)
          if (faqCache[slug]) {
               return;
          }

          let isMounted = true;
          async function fetchPageFaq() {
               try {
                    const res = await fetch(getApiUrl(`/api/pages/${slug}/faq`));
                    if (res.ok) {
                         const data = await res.json();
                         faqCache[slug] = data; // Cache the response
                         if (isMounted) {
                              setFetchedFaq(prev => ({ ...prev, [slug]: data }));
                         }
                    }
               } catch (error) {
                    console.error(`Failed to fetch FAQ for page: ${slug}`, error);
               }
          }
          fetchPageFaq();
          return () => {
               isMounted = false;
          };
     }, [initialFaqData, slug]);

     // Determine active faqInfo dynamically to prevent synchronous setState inside useEffect
     const faqInfo = initialFaqData || (slug === "home" ? homeFaqData : (faqCache[slug] || fetchedFaq[slug]));

     const faqs = Array.isArray(faqInfo?.faq)
          ? faqInfo.faq.filter((faq) => {
               const question = faq?.question || faq?.ques;
               const answer = faq?.answer || faq?.ans;
               return typeof question === "string" && question.trim() &&
                    typeof answer === "string" && answer.trim();
          })
          : [];

     useEffect(() => {
          setFaqVisibility?.({ slug, hasFaq: faqs.length > 0 });
     }, [faqs.length, setFaqVisibility, slug]);

     if (faqs.length === 0) {
          return null;
     }

     const title = faqInfo?.title && faqInfo.title.trim()
          ? faqInfo.title.trim()
          : "FAQ";

     const startheading = faqInfo?.startheading && faqInfo.startheading.trim()
          ? faqInfo.startheading.trim()
          : "All You";

     const midheading = faqInfo?.midheading && faqInfo.midheading.trim()
          ? faqInfo.midheading.trim()
          : "Need";

     const endheading = faqInfo?.endheading && faqInfo.endheading.trim()
          ? faqInfo.endheading.trim()
          : "To Know";

     const description = faqInfo?.description && faqInfo.description.trim()
          ? faqInfo.description.trim()
          : "";

     return (
          <section className={`button-neutral relative z-999 ${paddings} pt-10 md:pt-15 pb-35 md:pb-70 ${bgColor} px-5 md:px-2.5`}>
               {/* Background */}
               {bgImage && (
                    <div
                         className="absolute inset-0 bg-cover bg-center z-10"
                         style={{
                              backgroundImage: `url('${bgImage}')`,
                         }}
                    />
               )}
               <div className="custom-width mx-auto relative z-50">

                    {/* Heading */}
                    <div className="mx-auto max-w-212.5 text-left md:text-center mb-10 md:mb-20">
                         {/* <span className={`font-urbanist subheading`}>
                              {title}
                         </span> */}

                         <h2 className={`mt-4 font-playfair h2-section-title ${titleColor}`}>
                              {startheading}{" "}
                              {midheading && (
                                   <span className={`italic ${titleHighlightColor}`}>
                                        {midheading}
                                   </span>
                              )}{" "}
                              {endheading}
                         </h2>

                         {description && (
                              <p className="mx-auto mt-5 max-w-200 font-urbanist para">
                                   {description}
                              </p>
                         )}
                    </div>
                    {/* FAQ */}

                    <div className="space-y-6 cursor-pointer">

                         {faqs.map((faq, index) => {

                              const isOpen = activeIndex === index;

                              return (
                                   <div
                                        key={index}
                                        className={`pb-6 plus-jakarta-sans ${dividerColor} border-b`}
                                   >

                                        {/* Question */}

                                        <button
                                             onClick={() => toggleFaq(index)}
                                             className="w-full flex justify-between items-start text-left gap-4"
                                        >

                                             <span
                                                  className={`text-[18px] md:text-[24px] cursor-pointer transition ${isOpen ? questionOpenColor : questionClosedColor
                                                       }`}
                                             >
                                                  {faq.question || faq.ques}
                                             </span>

                                             <span className="relative text-lg md:text-xl w-5 h-5 inline-block shrink-0 mt-1 md:mt-1.5">

                                                  <HiPlus
                                                       className={`absolute inset-0 cursor-pointer transition-all duration-300 ${isOpen ? "opacity-0 rotate-180 " : "opacity-100 rotate-0"
                                                            } ${questionClosedColor}`}
                                                  />

                                                  <HiMinus
                                                       className={`absolute cursor-pointer inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                                                            } ${questionOpenColor}`}
                                                  />

                                             </span>

                                        </button>

                                        {/* Answer */}

                                        <div
                                             className={`grid transition-all duration-300 ${isOpen
                                                  ? "grid-rows-[1fr] mt-4"
                                                  : "grid-rows-[0fr]"
                                                  }`}
                                        >

                                             <div className="overflow-hidden">

                                                  <p className={`para`}>
                                                       {faq.answer || faq.ans}
                                                  </p>

                                             </div>

                                        </div>

                                   </div>
                              );
                         })}

                    </div>

               </div>

          </section>
     );
};;

export default FAQ;