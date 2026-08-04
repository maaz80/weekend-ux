import { cache } from "react";
import CourseDetailsView from "@/components/Course Details/Details";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Courses from "@/models/Courses";
import connectDB from "@/config/db";
import { generatePageMetadata, getPageSEOData } from "@/utils/seo";
import SchemaRenderer from "@/components/SchemaRenderer";

export const dynamicParams = false;

export async function generateStaticParams() {
     try {
          await connectDB();
          const coursesPage = await Courses.findOne().select("course.slug").lean();
          const slugs = coursesPage?.course?.map((course) => course?.slug).filter(Boolean) || [];
          return slugs.map((slug) => ({ slug }));
     } catch (error) {
          console.error("Error generating course static params:", error);
          return [];
     }
}

// Fetch only course data
const getCourseData = cache(async (slug) => {
     try {
          await connectDB();
          const coursesPage = await Courses.findOne().lean();
          if (coursesPage && Array.isArray(coursesPage.course) && coursesPage.course.length > 0) {
               // 1. Exact match by slug or _id
               let course = coursesPage.course.find(c => c.slug === slug || (c._id && c._id.toString() === slug));

               // 2. Loose match by slug substring or title
               if (!course && slug) {
                    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
                    course = coursesPage.course.find(c => {
                         const cSlug = (c.slug || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                         const cTitle = (c.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                         return (cSlug && (cSlug.includes(cleanSlug) || cleanSlug.includes(cSlug))) ||
                              (cTitle && (cTitle.includes(cleanSlug) || cleanSlug.includes(cTitle)));
                    });
               }

               // 3. Fallback to first course in database instead of 404
               if (!course) {
                    course = coursesPage.course[0];
               }

               if (course) {
                    const resObj = JSON.parse(JSON.stringify(course));
                    if (coursesPage.caseStudies && coursesPage.caseStudies.items && coursesPage.caseStudies.items.length > 0) {
                         resObj.caseStudies = JSON.parse(JSON.stringify(coursesPage.caseStudies));
                    }
                    if (coursesPage.careerDomains && coursesPage.careerDomains.items && coursesPage.careerDomains.items.length > 0) {
                         resObj.careerDomains = JSON.parse(JSON.stringify(coursesPage.careerDomains));
                    }
                    return resObj;
               }
          }
     } catch (error) {
          console.error("Error in getCourseData fetching database:", error);
     }
     return null;
});

export async function generateMetadata({ params }) {
     const { slug } = await params;
     const data = await getCourseData(slug);
     if (!data) {
          return generatePageMetadata("not-found", "Page Not Found - Weekend UX", "The page you are looking for does not exist.", `/courses/${slug}`);
     }

     const title = data.seotitle || data.title || "Course";
     const description = data.seodescription || data.overview;
     const imageUrl = data.image || "";
     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.weekendux.com";
     const pageUrl = `${baseUrl}/courses/${slug}`;
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

export default async function CourseSlugPage({ params }) {
     const { slug } = await params;
     const data = await getCourseData(slug);

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
          : "Advance Certificate in AI for UI UX";

     return (
          <div className="min-h-screen bg-neutral text-white font-urbanist flex flex-col relative">
               <Breadcrumb />
               {/* Hero Header Section */}
               <section className="relative h-65.5 md:h-114 w-full flex md:items-center items-end pb-7 md:pb-0 justify-center bg-zinc-950 overflow-hidden" data-navbar-light="true" id='course-details-hero'>
                    <Image
                         src="/images/weekend-ux-course-details-hero-bg.webp"
                         alt="weekend-ux-course-details-hero-bg"
                         fill
                         priority
                         fetchPriority="high"
                         className="object-cover object-center opacity-60 z-0"
                    />
                    {/* Content */}
                    <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-8 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair text-center px-4">
                         {heroTitle}
                    </h1>
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

               <CourseDetailsView data={data} />
               <Testimonials />
               <RelatedBlogs />
               <FAQ faqData={(data?.faq?.items && data.faq.items.length > 0) ? {
                    faq: data.faq.items,
                    title: data.faq.title && data.faq.title.trim() ? data.faq.title.trim() : "FAQ",
                    startheading: data.faq.startheading && data.faq.startheading.trim() ? data.faq.startheading.trim() : "Course",
                    midheading: data.faq.midheading && data.faq.midheading.trim() ? data.faq.midheading.trim() : "FAQ",
                    endheading: data.faq.endheading && data.faq.endheading.trim() ? data.faq.endheading.trim() : "",
                    description: data.faq.description && data.faq.description.trim() ? data.faq.description.trim() : ""
               } : null} />
          </div>
     );
}
