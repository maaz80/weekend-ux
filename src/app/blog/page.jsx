import Image from "next/image";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import BlogListingClient from "@/components/Blogs/BlogListingClient";
import connectDB from "@/config/db";
import BlogModel from "@/models/Blog";

// Fetch blog data at build time — no client-side fetching
async function getBlogsData() {
     try {
          await connectDB();
          const blogDoc = await BlogModel.findOne().lean();
          return blogDoc ? JSON.parse(JSON.stringify(blogDoc)) : null;
     } catch (e) {
          console.error("Failed to fetch blogs data at build time:", e);
          return null;
     }
}

export default async function Blogs() {
     const blogsData = await getBlogsData();

     const heroStart = blogsData?.hero?.starttitle?.trim() || "Our Latest";
     const heroEnd = blogsData?.hero?.endtitle?.trim() || "Blogs";
     const featuredStart = blogsData?.featuredblogs?.starttitle?.trim() || "Featured";
     const featuredEnd = blogsData?.featuredblogs?.endtitle?.trim() || "Blogs";
     const blogsList = blogsData?.blogs || [];

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col relative pt-15 md:pt-8">
               <Breadcrumb />

               {/* Hero Header Section */}
               <section className="relative h-51.5 md:h-114 w-full flex md:items-center items-end pb-12 md:pb-0 justify-center bg-zinc-950 " data-navbar-light="true" id='blogs-hero'>
                    <Image
                         src="/images/weekend-ux-blogs-hero-bg.webp"
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         fetchPriority="high"
                         className="object-cover object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">
                         {heroStart} <span className="text-official italic">{heroEnd}</span>
                    </h1>
                    <Image src="/images/weekend-ux-decorative-diamond.webp" alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: "auto" }} />
               </section>

               {/* Blog listing — client component handles pagination state only */}
               <BlogListingClient
                    blogsList={blogsList}
                    featuredStart={featuredStart}
                    featuredEnd={featuredEnd}
               />

               <Testimonials />
               <RelatedBlogs />
               <FAQ />
          </div>
     );
}
