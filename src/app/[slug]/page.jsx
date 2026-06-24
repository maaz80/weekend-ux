import BlogDetailsView from "./Details";
import CourseDetailsView from "@/components/Course Details/Details";
import LocationDetailsView from "@/components/Location/LocationDetailsView";
import FAQ from "@/components/FAQ";
import RelatedBlogs from "@/components/RelatedBlogs";
import Image from "next/image";
import Blog from "@/models/Blog";
import Courses from "@/models/Courses";
import Location from "@/models/Location";
import connectDB from "@/config/db";

async function getSlugData(slug) {
     try {
          await connectDB();
          
          // 1. Check blog
          const blogPage = await Blog.findOne().select("blogs").lean();
          if (blogPage) {
               const blog = blogPage.blogs.find(b => b.slug === slug);
               if (blog) return { type: "blog", data: JSON.parse(JSON.stringify(blog)) };
          }
          
          // 2. Check course
          const coursesPage = await Courses.findOne().select("course").lean();
          if (coursesPage) {
               const course = coursesPage.course.find(c => c.slug === slug);
               if (course) return { type: "course", data: JSON.parse(JSON.stringify(course)) };
          }
          
          // 3. Check location
          const locationDoc = await Location.findOne({ "items.hero.slug": slug }).select("items").lean();
          if (locationDoc) {
               const item = locationDoc.items.find(it => it.hero?.[0]?.slug === slug);
               if (item) return { type: "location", data: JSON.parse(JSON.stringify(item)) };
          }
     } catch (error) {
          console.error("Error in getSlugData fetching database:", error);
     }
     
     return null;
}

export async function generateMetadata({ params }) {
     const { slug } = await params;
     const result = await getSlugData(slug);
     if (!result) {
          return {
               title: "Not Found",
          };
     }

     const { type, data } = result;
     let title = "";
     let description = "";
     let imageUrl = "";

     if (type === "blog") {
          title = data.seotitle || data.title || "Blog";
          description = data.seodescription || data.title;
          imageUrl = data.image || "";
     } else if (type === "course") {
          title = data.seotitle || data.title || "Course";
          description = data.seodescription || data.overview;
          imageUrl = data.image || "";
     } else if (type === "location") {
          title = data.hero?.[0]?.seotitle || data.title || "Location";
          description = data.hero?.[0]?.seodescription || data.title;
          imageUrl = data.image?.imageurl || "";
     }

     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://weekendux.co";
     const pageUrl = `${baseUrl}/${slug}`;
     const finalImageUrl = imageUrl || `${baseUrl}/images/weekend-ux-blogs-hero-bg.webp`;

     return {
          title,
          description,
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

export default async function DynamicSlugPage({ params }) {
     const { slug } = await params;
     const result = await getSlugData(slug);

     if (!result) {
          return (
               <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-urbanist px-4 text-center">
                    <h1 className="text-6xl font-bold font-playfair text-official mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                    <p className="text-zinc-400 max-w-md mb-6">
                         The link you followed may be broken, or the page may have been removed.
                    </p>
                    <a href="/" className="px-6 py-3 bg-official text-black rounded-lg font-medium hover:opacity-90 transition-all">
                         Go to Homepage
                    </a>
               </div>
          );
     }

     const { type, data } = result;

     if (type === "location") {
          return <LocationDetailsView data={data} />;
     }

     if (type === "course") {
          const heroTitle = data?.title && data.title.trim()
               ? data.title.trim()
               : "Advance Certificate in AI for UI UX";

          return (
               <div className="min-h-screen bg-black text-white font-urbanist flex flex-col">
                    {/* Hero Header Section */}
                    <section className="relative h-62.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 overflow-hidden">
                         <Image
                              src="/images/weekend-ux-course-details-hero-bg.webp"
                              alt="weekend-ux-course-details-hero-bg"
                              fill
                              priority
                              className="object-cover object-center opacity-60 z-0"
                         />
                         {/* Content */}
                         <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair text-center px-4">
                              {heroTitle}
                         </h1>
                    </section>
                    <CourseDetailsView data={data} />
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

     // Default fallback to blog layout
     const heroTitle = data?.title && data.title.trim()
          ? data.title.trim()
          : "Explore Our Blogs";

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col">
               {/* Hero Header Section */}
               <section className="relative h-52.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 ">
                    <Image
                         src="/images/weekend-ux-blogs-hero-bg.webp"
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         className="object-cover object-center opacity-65 z-0"
                     />
                    
                    {/* Content */}
                    <h1 className="custom-width text-[22px] md:text-[38px] 2xl:text-[56px] text-center leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair px-4">
                         {heroTitle}
                    </h1>
                    <Image src="/images/weekend-ux-decorative-diamond.webp" alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: "auto" }} />
               </section>
               
               <BlogDetailsView data={data} />
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
