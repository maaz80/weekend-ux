import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'

const BlogCard = ({
     blog,
     height = 'h-62.5 md:h-95',
     priority = false,
     fetchPriority = undefined,
     titleColor = "text-neutral",
     arrowColor = "text-neutral",
     imgBgColor = "bg-zinc-100"
}) => {
     const slugOrId = blog?.slug || blog?._id || blog?.id || "";
     const imageSrc = blog?.image && blog.image.trim() ? blog.image.trim() : "/images/hero-bg.webp";

     return (
          <div>
               <Link href={`/${slugOrId}`} className="block">
                    <article
                         className="group cursor-pointer"
                    >
                         {/* Image */}
                         <div className={`overflow-hidden rounded-md ${imgBgColor}`}>
                              <OptimizedImage
                                   src={imageSrc}
                                   alt={blog?.alt || ""}
                                   className={`w-full object-cover transition duration-700 group-hover:scale-105 ${height}`}
                                   sizes="(max-width: 768px) 100vw, 50vw"
                                   priority={priority}
                                   fetchPriority={fetchPriority}
                              />
                         </div>

                         {/* Title */}
                         <div className="mt-2 md:mt-5 flex items-start justify-between gap-4">
                              <h2 className={`font-urbanist text-[20px] md:text-[26px] leading-[1.35] line-clamp-2 ${titleColor}`}>
                                   {blog?.title || "Untitled Post"}
                              </h2>

                              <IoIosArrowForward
                                   size={22}
                                   className={`mt-1 md:mt-2 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${arrowColor}`}
                              />
                         </div>
                    </article>
               </Link>
          </div>
     )
}

export default BlogCard;