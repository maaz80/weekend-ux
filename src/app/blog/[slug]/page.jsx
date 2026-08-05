import { cache } from "react";
import BlogDetailsView from "./Details";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Blog from "@/models/Blog";
import connectDB from "@/config/db";
import { generatePageMetadata, getPageSEOData } from "@/utils/seo";
import { buildCanonicalUrl, getSiteUrl } from "@/utils/siteUrl";
import SchemaRenderer from "@/components/SchemaRenderer";

export const dynamicParams = false;

export async function generateStaticParams() {
     try {
          await connectDB();
          const blogPage = await Blog.findOne().select("blogs.slug").lean();
          const slugs = blogPage?.blogs?.map((blog) => blog?.slug).filter(Boolean) || [];
          if (slugs.length === 0) {
               return [{ slug: "what-is-the-difference-between-ui-and-ux" }];
          }
          return slugs.map((slug) => ({ slug }));
     } catch (error) {
          console.error("Error generating blog static params:", error);
          return [{ slug: "what-is-the-difference-between-ui-and-ux" }];
     }
}

// Fetch only blog data
const getBlogData = cache(async (slug) => {
     try {
          await connectDB();
          const blogPage = await Blog.findOne().select("blogs").lean();
          if (blogPage) {
               const blog = blogPage.blogs.find(b => b.slug === slug);
               if (blog) return JSON.parse(JSON.stringify(blog));
          }
     } catch (error) {
          console.error("Error in getBlogData fetching database:", error);
     }
     return null;
});

export async function generateMetadata({ params }) {
     const { slug } = await params;
     const data = await getBlogData(slug);
     if (!data) {
          return generatePageMetadata("not-found", "Page Not Found - Weekend UX", "The page you are looking for does not exist.", `/blog/${slug}`);
     }

     const title = data.seotitle || data.title || "Blog";
     const description = data.seodescription || data.title;
     const imageUrl = data.image || "";
     const baseUrl = getSiteUrl();
     const pageUrl = buildCanonicalUrl(`/blog/${slug}`);
     const finalImageUrl = imageUrl || `${baseUrl}/images/weekend-ux-blogs-hero-bg.webp`;

     return {
          title,
          description,
          alternates: {
               canonical: pageUrl,
          },
          openGraph: {
               title,
               description,
               url: pageUrl,
               type: "article",
               images: [
                    {
                         url: finalImageUrl,
                         alt: title,
                    }
               ],
          },
          twitter: {
               card: "summary_large_image",
               title,
               description,
               images: [finalImageUrl],
          },
     };
}

export default async function BlogSlugPage({ params }) {
     const { slug } = await params;
     const data = await getBlogData(slug);

     if (!data) {
          const seo = await getPageSEOData("not-found");
          const displayTitle = seo?.title || "Page Not Found";
          const displayDesc = seo?.description || "The link you followed may be broken, or the page may have been removed.";

          return (
               <div className="min-h-screen bg-neutral text-white flex flex-col items-center justify-center font-urbanist px-4 text-center">
                    <h1 className="text-6xl font-bold font-playfair text-official mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">{displayTitle}</h2>
                    <p className="text-zinc-400 max-w-md mb-6">
                         {displayDesc}
                    </p>
                    <a href="/" className="px-6 py-3 bg-official text-neutral rounded-lg font-medium hover:opacity-90 transition-all">
                         Go to Homepage
                    </a>
               </div>
          );
     }

     const heroTitle = data.title && data.title.trim()
          ? data.title.trim()
          : "Explore Our Blogs";

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col relative pt-15 md:pt-8">
               <Breadcrumb />
               {/* Hero Header Section */}
               <section className="relative h-61.5 md:h-114 w-full flex md:items-center items-end pb-12 md:pb-0 justify-center bg-zinc-950 " data-navbar-light="true" id='blog-details-hero'>
                    <Image
                         src="/images/weekend-ux-blogs-hero-bg.webp"
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         fetchPriority="high"
                         className="object-cover object-center opacity-65 z-0"
                    />

                    {/* Content */}
                    <h1 className="custom-width text-[22px] md:text-[38px] 2xl:text-[56px] text-center leading-8 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair px-4">
                         {heroTitle}
                    </h1>
                    <Image src="/images/weekend-ux-decorative-diamond.webp" alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: "auto" }} />
               </section>

               <SchemaRenderer schemas={data?.schemas} />

               {/* Server-rendered static JSON-LD fallback for No-JS/Control+U */}
               {data?.schemas && Array.isArray(data.schemas) && data.schemas.map((schemaStr, idx) => {
                    if (!schemaStr || !schemaStr.trim()) return null;
                    try {
                         const cleanJson = JSON.stringify(JSON.parse(schemaStr));
                         return (
                              <script
                                   key={idx}
                                   type="application/ld+json"
                                   dangerouslySetInnerHTML={{ __html: cleanJson }}
                              />
                         );
                    } catch (e) {
                         return null;
                    }
               })}

               <BlogDetailsView data={data} />
               <Testimonials />
               <RelatedBlogs />
               <FAQ faqData={(data?.faq?.items && data.faq.items.length > 0) ? {
                    faq: data.faq.items,
                    title: data.faq.title && data.faq.title.trim() ? data.faq.title.trim() : "FAQ",
                    startheading: data.faq.startheading && data.faq.startheading.trim() ? data.faq.startheading.trim() : "Blog",
                    midheading: data.faq.midheading && data.faq.midheading.trim() ? data.faq.midheading.trim() : "FAQ",
                    endheading: data.faq.endheading && data.faq.endheading.trim() ? data.faq.endheading.trim() : "",
                    description: data.faq.description && data.faq.description.trim() ? data.faq.description.trim() : ""
               } : null} />
          </div>
     );
}
