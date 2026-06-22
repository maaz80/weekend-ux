"use client";

import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";

export default function PrivacyPolicy() {
     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col">

               {/* Hero Header Section */}
               <section className="relative h-32.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 ">
                    <Image
                         src='/images/weekend-ux-policy-hero-bg.webp'
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         className="object-fill object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">Privacy Policy</h1>
   <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: 'auto' }} />
                   
               </section>
               <div className="custom-width flex flex-col gap-4 items-start text-neutral-900 py-20">
                    <h2 className="font-bold text-xl">Heading</h2>
                    <p>We value your privacy and are committed to protecting your personal information.
                         We collect limited data—such as your name, contact details, and property preferences—to provide personalized real estate solutions and improve our services.
                         Your data may be shared with trusted partners (like builders, legal advisors, or financial institutions) only for service-related purposes. We never sell or misuse your information.
                         All data is stored securely and used in compliance with applicable privacy laws. By engaging with us, you consent to our data practices.
                         For any queries or to manage your data, please contact us at info@dhswellness.com</p>
               </div>
               <RelatedBlogs/>
               <FAQ/>
          </div>
     );
}