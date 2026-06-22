'use client'
import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const defaultFaqs = [
     {
          question: "What services do UI UX design agencies offer?",
          answer: "User research, UX strategy, wireframing, UI design, prototyping, and usability testing are all provided by UI/UX design firms to produce user-friendly, conversion-focused digital products for the web and mobile platforms."
     },
     {
          question: "Why do I need a UI UX design company for my business?",
          answer: "By matching design with business objectives, a UI/UX design firm assists you in creating aesthetically pleasing, user-friendly solutions that enhance customer happiness, boost conversions, and minimize expensive usability problems."
     },
     {
          question: "How long does it take to complete a UI UX design project?",
          answer: "Depending on scope, research depth, number of screens, and iterations, a UI/UX design project usually takes four to eight weeks to complete; simpler projects are completed more quickly, whereas complicated products take longer."
     },
     {
          question: "Why do I need a UI UX design company for my business?",
          answer: "A UI/UX design firm assists you in developing user-friendly, intuitive digital experiences that increase conversions, lower friction, and foster trust—all of which help you achieve your business objectives and transform users into devoted clients."
     },
     {
          question: "How do I choose the right UI UX design agency for my business?",
          answer: "When selecting a UI/UX design firm, make sure they can address your unique business difficulties by looking at their portfolio relevancy, customer testimonials, industry experience, design process clarity, and alignment with your budget and objectives."
     },
     {
          question: "What is a UI UX design agency?",
          answer: "A UI/UX design firm specializes in creating user-centered digital experiences by fusing interaction design, visual design, and user research to create products that are simple to use, captivating, and efficient."
     }
];
const FAQ = ({ paddings, faqData }) => {
     const [faqs, setFaqs] = useState(defaultFaqs);
     const [activeIndex, setActiveIndex] = useState(0);
     const toggleFaq = (index) => {
          setActiveIndex(index === activeIndex ? null : index);
     };


     // useEffect(() => {
     //      if (faqData?.faq && faqData.faq.length > 0) {
     //           setFaqs(faqData.faq);
     //      } else {
     //           setFaqs(defaultFaqs);
     //      }
     // }, [faqData]);

     return (
          <section className={` relative z-999 ${paddings} py-15 min-h-[160vh] bg-white`}>
               {/* Background */}
               <div
                    className="absolute inset-0 bg-cover bg-center z-10"
                    style={{
                         backgroundImage: "url('/images/weekend-ux-faq-bg.webp')",
                    }}
               />
               <div className="custom-width mx-auto relative z-50">

                    {/* Heading */}

                    {/* Heading */}
                     <div className="mx-auto max-w-212.5 text-center mb-10 md:mb-20">
                          <span className="font-urbanist text-[11px] font-bold uppercase tracking-[0.45em] text-official">
                               FAQ
                          </span>

                          <h3 className="mt-4 font-playfair text-[38px] leading-[1.05] text-neutral-900 md:text-[58px] lg:text-[72px]">
                               All You{" "}
                               <span className="italic text-official">
                                    Need
                               </span>{" "}
                               To Know
                          </h3>

                          <p className="mx-auto mt-5 max-w-200 font-urbanist text-[15px] leading-5.5 md:leading-7 text-neutral-900/80 md:text-[17px]">
                               Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.
                          </p>
                     </div>
                    {/* FAQ */}

                    <div className="space-y-6 cursor-pointer">

                         {faqs.map((faq, index) => {

                              const isOpen = activeIndex === index;

                              return (
                                   <div
                                        key={index}
                                        className="border-b border-gray-300 pb-6 plus-jakarta-sans "
                                   >

                                        {/* Question */}

                                        <button
                                             onClick={() => toggleFaq(index)}
                                             className="w-full flex justify-between items-center text-left"
                                        >

                                             <span
                                                  className={`text-[18px] md:text-[24px] cursor-pointer transition ${isOpen ? "text-official" : "text-neutral-900"
                                                       }`}
                                             >
                                                  {faq.question || faq.ques}
                                             </span>

                                             <span className="relative text-lg md:text-xl w-5 h-5 inline-block">

                                                  <HiPlus
                                                       className={`absolute inset-0 text-neutral-900 cursor-pointer transition-all duration-300 ${isOpen ? "opacity-0 rotate-180 " : "opacity-100 rotate-0"
                                                            }`}
                                                  />

                                                  <HiMinus
                                                       className={`absolute text-official cursor-pointer inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                                                            }`}
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

                                                  <p className="text-neutral-900  text-[12px] md:text-[16px] lg:text-[18px] leading-5 md:leading-6 lg:leading-8">
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
};

export default FAQ;