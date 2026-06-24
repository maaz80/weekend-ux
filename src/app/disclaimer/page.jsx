import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import connectDB from "@/config/db";
import DisclaimerModel from "@/models/Disclaimer";

export const revalidate = 60; // Revalidate static cache every 60 seconds

async function getDisclaimerData() {
     try {
          await connectDB();
          let disclaimer = await DisclaimerModel.findOne().lean();
          if (!disclaimer) {
               // Return fallback if database document is not initialized yet
               return {
                    title: "Disclaimer",
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
          return JSON.parse(JSON.stringify(disclaimer));
     } catch (error) {
          console.error("Error fetching disclaimer in Server Component:", error);
          return null;
     }
}

export default async function Disclaimer() {
     const disclaimerData = await getDisclaimerData();

     const title = disclaimerData?.title && disclaimerData.title.trim()
          ? disclaimerData.title.trim()
          : "Disclaimer";

     const content = disclaimerData?.content && disclaimerData.content.trim()
          ? disclaimerData.content.trim()
          : "We value your privacy and are committed to protecting your personal information...";

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col relative">

               {/* Hero Header Section */}
               <section className="relative h-32.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 ">
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
               <RelatedBlogs data={disclaimerData?.relatedBlogs} />
               <FAQ/>
          </div>
     );
}