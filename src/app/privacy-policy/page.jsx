import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Breadcrumb from "@/components/Breadcrumb";
import connectDB from "@/config/db";
import Policy from "@/models/Policy";

export const revalidate = 60; // Revalidate static cache every 60 seconds

async function getPolicyData() {
     try {
          await connectDB();
          let policy = await Policy.findOne().lean();
          if (!policy) {
               // Return fallback if database document is not initialized yet
               return {
                    title: "Privacy Policy",
                    content: "We value your privacy and are committed to protecting your personal information. We collect limited data—such as your name, contact details, and property preferences—to provide personalized real estate solutions and improve our services. Your data may be shared with trusted partners (like builders, legal advisors, or financial institutions) only for service-related purposes. We never sell or misuse your information. All data is stored securely and used in compliance with applicable privacy laws. By engaging with us, you consent to our data practices. For any queries or to manage your data, please contact us at info@dhswellness.com",
                    relatedBlogs: {
                         title: "Related Blogs",
                         startheading: "Our",
                         midheading: "Latest",
                         endheading: "Articles",
                         description: "Stay updated with the latest trends and stories from our design blog."
                    }
               };
          }
          return JSON.parse(JSON.stringify(policy));
     } catch (error) {
          console.error("Error fetching policy in Server Component:", error);
          return null;
     }
}

export default async function PrivacyPolicy() {
     const policyData = await getPolicyData();

     const title = policyData?.title && policyData.title.trim()
          ? policyData.title.trim()
          : "Privacy Policy";

     const content = policyData?.content && policyData.content.trim()
          ? policyData.content.trim()
          : "We value your privacy and are committed to protecting your personal information...";

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col relative pt-16 md:pt-8" >
               <Breadcrumb />

               {/* Hero Header Section */}
               <section className="relative h-51.5 md:h-114 w-full flex md:items-center items-end pb-12 md:pb-0 justify-center bg-zinc-950 " data-navbar-light="true" id='policy-hero'>
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
               <div className="custom-width flex flex-col gap-4 items-start text-neutral-900 py-20">
                    <div 
                         className="w-full text-[14px] leading-6 my-8 blog-content"
                         dangerouslySetInnerHTML={{ __html: content || "" }}
                    />
               </div>
               <RelatedBlogs data={policyData?.relatedBlogs} />
               <FAQ/>
          </div>
     );
}