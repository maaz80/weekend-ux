"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Content from "@/components/Contact/Content";

export default function ContactUs() {
     const [contactData, setContactData] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          async function fetchContact() {
               try {
                    const res = await fetch("/api/contact");
                    if (res.ok) {
                         const data = await res.json();
                         setContactData(data);
                    }
               } catch (error) {
                    console.error("Failed to fetch contact page configuration:", error);
               } finally {
                    setLoading(false);
               }
          }
          fetchContact();
     }, []);

     const title = contactData?.title && contactData.title.trim()
          ? contactData.title.trim()
          : "Contact Us";

     return (
          <div className=" bg-white text-white font-urbanist flex flex-col relative ">

               {/* Hero Header Section */}
               <section className="relative h-32.5 md:h-100 w-full flex flex-col gap-5 items-center justify-center bg-zinc-950 ">
                    <Image
                         src='/images/weekend-ux-contact-hero-bg.webp'
                         alt="weekend-ux-contact-hero-bg"
                         fill
                         priority={true}
                         fetchPriority="high"
                         className="object-fill object-center opacity-60 z-0"
                    />
                    {/* Content */}

                    <h1 className="custom-width text-[32px] md:text-[38px] 2xl:text-[56px] text-center leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">
                         {title}
                    </h1>
                    <Image 
                         src='/images/weekend-ux-decorative-diamond.webp' 
                         alt="weekend-ux-decorative-diamond" 
                         className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-99999" 
                         width={200} 
                         height={200} 
                         style={{ height: 'auto' }} 
                         priority={true}
                         fetchPriority="high"
                    />
               </section>
               <Content data={contactData} />
               <RelatedBlogs data={contactData?.relatedBlogs} />
               <FAQ />
          </div>
     );
}
