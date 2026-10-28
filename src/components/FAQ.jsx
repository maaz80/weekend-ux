'use client'
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useHomeData } from "@/context/HomeDataContext";
import { HiMinus, HiPlus } from "react-icons/hi";
import { getApiUrl } from "@/utils/api";

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

const faqCache = {};
const managedPageSlugs = new Set(["corporate-training", "free-resources", "hire-from-us"]);
const corporateTrainingFaqDefaults = [
     {
          ques: "What does Weekend UX corporate training cover?",
          ans: "Our corporate training covers practical UI/UX, product design, Figma, AI tools, and other digital skills. The topics can be aligned with your team's goals and learning needs.",
     },
     {
          ques: "Can the training be customized for our organization?",
          ans: "Yes. The learning journey can be tailored around your organization's priorities, current team skills, and the capabilities you want to build.",
     },
     {
          ques: "Who can take part in the training?",
          ans: "Training can be planned for teams with different roles and experience levels. Share your team profile and goals so the program can be scoped appropriately.",
     },
     {
          ques: "How is the training schedule decided?",
          ans: "The schedule and delivery plan are discussed with your organization based on team availability, learning objectives, and program scope.",
     },
     {
          ques: "How can we get started?",
          ans: "Use the Start Your Journey button on the Corporate Training page to contact our team. We can discuss your goals and recommend a suitable learning plan.",
     },
];

const hireFromUsFaqDefaults = [
     {
          ques: "What types of candidates can I hire through Weekend UX?",
          ans: "You can connect with job-ready designers across beginner, intermediate, senior, and expert skill pools. Use the enquiry form to share the role and experience you need.",
     },
     {
          ques: "Is there a fee to hire candidates?",
          ans: "Weekend UX's hiring service is offered at no cost to employers.",
     },
     {
          ques: "How do I get started with hiring?",
          ans: "Submit your details through the enquiry form on this page. The Weekend UX team can follow up to understand your hiring needs and guide you on suitable candidates.",
     },
     {
          ques: "What design roles can I hire for?",
          ans: "Candidate roles include UI/UX, UI, UX, industrial, graphic, and web design. Contact the team if you are hiring for another design role.",
     },
     {
          ques: "Can I search candidates directly on this page?",
          ans: "The candidate search section lets you explore suggested job roles. If you have a specific hiring requirement, use the enquiry form to connect with the team.",
     },
];

const freeResourcesFaqDefaults = [
     {
          ques: "What free resources are available on the Free Resources page?",
          ans: "The page features selected Weekend UX courses and design tutorials to help you explore practical learning content.",
     },
     {
          ques: "Are the featured courses free to access?",
          ans: "The Free Resources page highlights selected learning resources. Course details explain the format and any enrollment requirements.",
     },
     {
          ques: "Who are these resources for?",
          ans: "They are useful for aspiring and practicing designers who want to build UI/UX skills and explore design topics.",
     },
     {
          ques: "How do I view a featured course?",
          ans: "Select a course card to open its course page, where you can find more information about the curriculum and learning format.",
     },
     {
          ques: "Where can I find more design tutorials?",
          ans: "Browse the Popular Tutorials section on this page and select a tutorial to continue exploring.",
     },
];

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
     const { faqData: homeFaqData } = useHomeData();
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

     const faqs = faqInfo?.faq && faqInfo.faq.length > 0
          ? faqInfo.faq
          : slug === "corporate-training"
               ? corporateTrainingFaqDefaults
               : slug === "hire-from-us"
               ? hireFromUsFaqDefaults
               : slug === "free-resources"
               ? freeResourcesFaqDefaults
               : managedPageSlugs.has(slug)
               ? []
               : defaultFaqs;

     if (managedPageSlugs.has(slug) && faqs.length === 0) {
          return null;
     }

     const title = faqInfo?.title && faqInfo.title.trim()
          ? faqInfo.title.trim()
          : slug === "corporate-training" ? "Corporate Training FAQs" : slug === "hire-from-us" ? "Hire From Us FAQs" : slug === "free-resources" ? "Free Resources FAQs" : "FAQ";

     const startheading = faqInfo?.startheading && faqInfo.startheading.trim()
          ? faqInfo.startheading.trim()
          : slug === "corporate-training" ? "Corporate" : slug === "hire-from-us" ? "Hiring" : slug === "free-resources" ? "Free" : "All You";

     const midheading = faqInfo?.midheading && faqInfo.midheading.trim()
          ? faqInfo.midheading.trim()
          : slug === "corporate-training" ? "Training" : slug === "hire-from-us" ? "Candidates" : slug === "free-resources" ? "Resources" : "Need";

     const endheading = faqInfo?.endheading && faqInfo.endheading.trim()
          ? faqInfo.endheading.trim()
          : slug === "corporate-training" ? "FAQs" : slug === "hire-from-us" ? "FAQs" : slug === "free-resources" ? "FAQs" : "To Know";

     const description = faqInfo?.description && faqInfo.description.trim()
          ? faqInfo.description.trim()
          : slug === "corporate-training"
               ? "Answers to common questions about corporate training with Weekend UX."
               : slug === "hire-from-us"
               ? "Learn more about hiring job-ready design candidates through Weekend UX."
               : slug === "free-resources"
               ? "Answers to common questions about the free courses and tutorials available from Weekend UX."
               : "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.";

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

                         <p className={`mx-auto mt-5 max-w-200 font-urbanist para `}>
                              {description}
                         </p>
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