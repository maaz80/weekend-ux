import Image from "next/image";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Breadcrumb from "@/components/Breadcrumb";
import connectDB from "@/config/db";
import TermsModel from "@/models/Terms";

export const revalidate = 60; // Revalidate static cache every 60 seconds

async function getTermsData() {
     try {
          await connectDB();
          let terms = await TermsModel.findOne().lean();
          if (!terms) {
               // Return fallback if database document is not initialized yet
               return {
                    title: "Terms & Conditions",
                    content: "Please read these terms and conditions carefully before using our services. By accessing or using our website and services, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.",
                    relatedBlogs: {
                         title: "Related Blogs",
                         startheading: "Our",
                         midheading: "Latest",
                         endheading: "Articles",
                         description: "Stay updated with the latest trends and stories from our design blog."
                    }
               };
          }
          return JSON.parse(JSON.stringify(terms));
     } catch (error) {
          console.error("Error fetching terms in Server Component:", error);
          return null;
     }
}

export default async function TermsConditions() {
     const termsData = await getTermsData();

     const title = termsData?.title && termsData.title.trim()
          ? termsData.title.trim()
          : "Terms & Conditions";

     const content = termsData?.content && termsData.content.trim()
          ? termsData.content.trim()
          : "Please read these terms and conditions carefully before using our services...";

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col relative pt-16 md:pt-8" >
               <Breadcrumb />

               {/* Hero Header Section */}
               <section className="relative h-51.5 md:h-114 w-full flex md:items-center items-end pb-12 md:pb-0 justify-center bg-zinc-950 " data-navbar-light="true" id='terms-hero'>
                    <Image
                         src='/images/weekend-ux-policy-hero-bg.webp'
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         fetchPriority="high"
                         className="object-cover object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">
                         {title}
                    </h1>
                    <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: 'auto' }} />
                    
               </section>
               <div className="custom-width flex flex-col gap-4 items-start text-neutral py-20">
                    <div 
                         className="w-full text-[14px] leading-6 my-8 blog-content"
                         dangerouslySetInnerHTML={{ __html: content || "" }}
                    />
               </div>
               <Testimonials />
               <RelatedBlogs data={termsData?.relatedBlogs} />
               <FAQ/>
          </div>
     );
}
