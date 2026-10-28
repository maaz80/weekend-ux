"use client";

import { useEffect, useState } from "react";
import { useHomeData } from "@/context/HomeDataContext";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";

const relevanceStopWords = new Set([
     "about", "after", "also", "and", "are", "because", "been", "being", "but",
     "can", "could", "does", "during", "each", "for", "from", "have", "into",
     "more", "most", "other", "our", "over", "should", "that", "their", "them",
     "then", "there", "these", "they", "this", "those", "through", "under",
     "very", "was", "were", "what", "when", "where", "which", "while", "with",
     "would", "your", "you", "the", "this", "these", "those", "into", "than",
     "how", "why", "who", "where", "when", "what", "which", "from", "your",
     "weekend"
]);

const getBlogKeywords = (blog) => {
     const content = Array.isArray(blog?.content)
          ? blog.content.map((item) => item?.data || "").join(" ")
          : "";
     const text = `${blog?.title || ""} ${blog?.seodescription || ""} ${content}`
          .replace(/<[^>]*>/g, " ")
          .replace(/&(?:nbsp|amp|quot|#39);/gi, " ");

     return new Set(
          text.toLowerCase().match(/[a-z0-9]{2,}/g)?.filter((word) => !relevanceStopWords.has(word)) || []
     );
};

const getBlogRelevance = (currentBlog, candidateBlog) => {
     const currentKeywords = getBlogKeywords(currentBlog);
     const candidateTitleKeywords = getBlogKeywords({ title: candidateBlog?.title });
     const candidateKeywords = getBlogKeywords(candidateBlog);
     let score = 0;

     currentKeywords.forEach((keyword) => {
          if (candidateTitleKeywords.has(keyword)) score += 3;
          else if (candidateKeywords.has(keyword)) score += 1;
     });

     return score;
};

const staticBlogs = [
     {
          id: 1,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to on campus rather",
          slug: "why-should-a-learner-prefer-to-on-campus-rather"
     },
     {
          id: 2,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to study on campus",
          slug: "why-should-a-learner-prefer-to-study-on-campus"
     },
     {
          id: 3,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to study on campus rather than other options",
          slug: "why-should-a-learner-prefer-to-study-on-campus-rather-than-other-options"
     },
];

export default function RelatedBlogs({
     data,
     currentBlog,
     bgImage = "/images/weekend-ux-related-blogs-bg.webp",
     overlayColor = "bg-official/25",
     taglineColor = "text-white",
     titleColor = "text-neutral",
     titleHighlightColor = "text-white",
     descriptionColor = "text-neutral/80",
     blogTitleColor = "text-neutral",
     arrowColor = "text-neutral"
}) {
     const { homeData, blogsData } = useHomeData();

     const config = data || homeData?.relatedBlogs;
     const pathname = usePathname();
     const isBlogDetailsPage = pathname?.startsWith("/blog/");

     const allBlogs = blogsData?.blogs && Array.isArray(blogsData.blogs) && blogsData.blogs.length > 0
          ? blogsData.blogs
          : staticBlogs;
     const currentSlug = currentBlog?.slug;
     const activeBlogs = isBlogDetailsPage
          ? allBlogs
               .filter((blog) => blog.slug !== currentSlug)
               .map((blog, index) => ({
                    blog,
                    index,
                    score: getBlogRelevance(currentBlog, blog)
               }))
               .sort((a, b) => b.score - a.score || a.index - b.index)
               .slice(0, 3)
               .map(({ blog }) => blog)
          : allBlogs.slice(0, 3);

     const title = (config?.title && config.title.trim())
          ? config.title
          : "BLOGS";

     const startheading = (config?.startheading && config.startheading.trim())
          ? config.startheading
          : "Latest";

     const midheading = (config?.midheading && config.midheading.trim())
          ? config.midheading
          : "Blogs";

     const endheading = (config?.endheading && config.endheading.trim())
          ? config.endheading
          : " To Know";

     const description = (config?.description && config.description.trim())
          ? config.description
          : "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.";

     return (
          <section className="relative overflow-hidden button-neutral">
               {/* Background Image */}
               <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                         backgroundImage: `url('${bgImage}')`,
                    }}
               />

               {/* Overlay */}
               <div className={`absolute inset-0 ${overlayColor}`} />

               {/* Content */}
               <div className={`relative z-10 mx-auto max-w-360 px-5 md:px-8 xl:px-12 ${isBlogDetailsPage
                    ? "pt-10 pb-[120px] md:pt-20 md:pb-[240px] xl:pt-24 xl:pb-[288px]"
                    : "py-10 md:py-20 xl:py-24"
                    }`}>


                    {/* Heading */}
                    <div className={`mx-auto max-w-212.5 text-left md:text-center ${pathname === '/' ? 'pt-0' : 'pt-0'}`}>
                         {/* <span className={`subheading-white font-urbanist text-[11px] font-bold uppercase tracking-[0.45em]`}>
                              {title}
                         </span> */}

                         <h2 className={`font-playfair h2-section-title text-zinc-900 font-medium`}>
                              {startheading}{" "}
                              {midheading && <span className={`italic ${titleHighlightColor} font-semibold`}>{midheading}</span>}
                              {/* {endheading && <>{endheading.startsWith(" ") ? "" : " "}{endheading}</>} */}
                         </h2>

                         <p className={`mx-auto font-semibold mt-5 max-w-200 font-urbanist para ${descriptionColor}`}>
                              {description}
                         </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="mt-7 md:mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                         {activeBlogs.map((blog) => {
                              const slugOrId = blog.slug || blog._id || blog.id;
                              const imageSrc = blog.image && blog.image.trim() ? blog.image.trim() : "/images/hero-bg.webp";
                              return (
                                   <Link
                                        key={slugOrId}
                                        href={`/blog/${slugOrId}`}
                                        className="group block cursor-pointer"
                                   >
                                        {/* Image */}
                                        <div className="overflow-hidden rounded-2xl bg-zinc-100">
                                             <OptimizedImage
                                                  src={imageSrc}
                                                  alt={blog.alt && blog.alt.trim() !== blog.title?.trim() ? blog.alt : ""}
                                                  className="h-55.5 w-full object-fill transition duration-700 group-hover:scale-105 md:h-70"
                                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                                  width={380}
                                                  height={222}
                                             />
                                        </div>

                                        {/* Title */}
                                        <div className="mt-2 md:mt-1 flex items-start justify-between gap-4">
                                             <h2 className={`font-urbanist text-[22px] md:text-[26px] lg:text-[30px] leading-[1.35] line-clamp-2 font-semibold ${blogTitleColor}`}>
                                                  {blog.title}
                                             </h2>

                                             <IoIosArrowForward
                                                  size={22}
                                                  className={`mt-1 md:mt-2 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${arrowColor}`}
                                             />
                                        </div>
                                   </Link>
                              );
                         })}
                    </div>
               </div>
          </section>
     );
}