"use client";

import Image from "next/image";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Breadcrumb from "@/components/Breadcrumb";
import { useHomeData } from "@/context/HomeDataContext";
import HomeFeature from "@/components/Home/Features/Feature";
import Link from "next/link";
import HomeWhyChoose from "@/components/Home/Details/Details";
import HomePhilosophy from "@/components/Home/Philosophy/Philosophy";
import HomeTestimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";

export default function LocationDetailsView({ data }) {
     const { faqData } = useHomeData();

     const heroData = data?.hero?.[0] || {};
     const heroTitle = heroData.heading || data?.title || "Best Design Academy";
     const heroDescription = heroData.seodescription || "Learn as you desire";
     const heroBtn = heroData.buttonName || "Explore Programs";

     return (
          <main className="min-h-screen bg-white text-neutral-900 font-urbanist">
               {/* 1. HERO SECTION */}
               <div className="bg-white text-white font-urbanist flex flex-col relative">
                    <Breadcrumb />
                    {/* <Image 
                         src='/images/weekend-ux-decorative-diamond.webp' 
                         alt="weekend-ux-decorative-diamond" 
                         className="w-24 md:w-50 h-auto absolute right-3 md:right-10 -bottom-8 md:-bottom-16 z-30" 
                         width={200} 
                         height={200} 
                         style={{ height: 'auto' }}
                    /> */}
                    <section className="relative h-86.5 md:h-114 w-full flex flex-col gap-2 md:gap-5 items-center pb-6 md:pb-20  justify-end md:justify-end bg-neutral-950 overflow-hidden" data-navbar-light="true" id='location-hero'>
                         <Image
                              src='/images/weekend-ux-location-hero-bg.webp'
                              alt="weekend-ux-policy-hero-bg"
                              fill
                              priority
                              fetchPriority="high"
                              className="object-cover object-center opacity-60 z-0"
                         />

                         <span className="font-urbanist text-[11px] font-bold uppercase tracking-[0.45em] relative z-50 text-official">
                              {heroDescription}
                         </span>

                         <h1 className="custom-width text-[22px] md:text-[38px] 2xl:text-[56px] text-center leading-8 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair px-4">
                              {heroTitle}
                         </h1>

                         {heroBtn && (
                              <Link href="/courses">
                                   <button className="px-5 h-10 rounded-md bg-official text-neutral-900 font-urbanist relative z-50 hover:bg-official/80 transition-all cursor-pointer font-bold">
                                        {heroBtn}
                                   </button>
                              </Link>
                         )}
                    </section>
               </div>

               {/* 2. FEATURES STRIP (FROM HOME DATA) */}
               <HomeFeature />

               {/* 3. CONTENT SECTION (DYNAMIC EDITOR CONTENT + IMAGE WITH FLOAT WRAPPING) */}
               <div className="custom-width py-15 text-neutral-900 font-urbanist min-h-60 overflow-hidden">
                    {data?.image?.imageurl && (
                         <OptimizedImage
                              src={data.image.imageurl}
                              alt={data.image.alt || data.title || "Location view"}
                              className="w-full md:w-[50%] h-60 md:h-90 object-cover rounded-xl md:float-right md:ml-8 md:mb-6 mb-5"
                              sizes="(max-width: 768px) 100vw, 50vw"
                         />
                    )}
                    <div
                         className="blog-content text-[#1C1C1C80] leading-7 text-[15px] md:text-[17px] text-justify"
                         dangerouslySetInnerHTML={{ __html: data?.content || "" }}
                    />
               </div>

               {/* 4. WHY CHOOSE US (FROM HOME DATA) */}
               <HomeWhyChoose />

               {/* 5. PHILOSOPHY (FROM HOME DATA) */}
               <HomePhilosophy />

               {/* 6. TESTIMONIALS (FROM HOME DATA) */}
               <HomeTestimonials />

               {/* 7. RELATED BLOGS */}
               <RelatedBlogs />

               {/* 8. FAQ (FROM HOME DATA) */}
               <FAQ faqData={(data?.faq?.items && data.faq.items.length > 0) ? {
                    faq: data.faq.items,
                    title: data.faq.title && data.faq.title.trim() ? data.faq.title.trim() : "FAQ",
                    startheading: data.faq.startheading && data.faq.startheading.trim() ? data.faq.startheading.trim() : "Location",
                    midheading: data.faq.midheading && data.faq.midheading.trim() ? data.faq.midheading.trim() : "FAQ",
                    endheading: data.faq.endheading && data.faq.endheading.trim() ? data.faq.endheading.trim() : "",
                    description: data.faq.description && data.faq.description.trim() ? data.faq.description.trim() : "",
               } : faqData} />
          </main>
     );
}
