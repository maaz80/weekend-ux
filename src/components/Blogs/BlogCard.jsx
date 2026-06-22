import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const BlogCard = ({ blog, height ='h-62.5 md:h-95'}) => {
     return (
          <div>
               <article
                    key={blog.id}
                    className="group cursor-pointer"
               >
                    {/* Image */}
                    <div className="overflow-hidden rounded-md">
                         <img
                              src={blog.image}
                              alt={blog.title}
                              className={`w-full object-cover transition duration-700 group-hover:scale-105 ${height}`}
                         />
                    </div>

                    {/* Title */}
                    <div className="mt-2 md:mt-5 flex items-start justify-between gap-4">
                         <h3 className="font-urbanist text-[20px] md:text-[26px] leading-[1.35] text-neutral-900 line-clamp-2">
                              {blog.title}
                         </h3>

                         <IoIosArrowForward
                              size={22}
                              className="mt-1 md:mt-2 shrink-0 text-neutral-900 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                         />
                    </div>
               </article>
          </div>
     )
}

export default BlogCard