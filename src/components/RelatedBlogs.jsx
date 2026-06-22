import { IoIosArrowForward } from "react-icons/io";
const blogs = [
     {
          id: 1,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to on campus rather",
     },
     {
          id: 2,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to study on campus",
     },
     {
          id: 3,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to study on campus rather than other options",
     },
];

export default function RelatedBlogs() {
     return (
          <section className="relative overflow-hidden ">
               {/* Background Image */}
               <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                         backgroundImage: "url('/images/weekend-ux-related-blogs-bg.webp')",
                    }}
               />

               {/* Yellow Overlay */}
               <div className="absolute inset-0 bg-[#F8C400]/25" />

               {/* Content */}
               <div className="relative z-10 mx-auto max-w-360 px-5 py-16 md:px-8 md:py-20 xl:px-12 xl:py-24">
               

                    {/* Heading */}
                    <div className="mx-auto max-w-212.5 text-center">
                         <span className="font-urbanist text-[11px] font-bold uppercase tracking-[0.45em] text-white">
                              BLOGS
                         </span>

                         <h2 className="mt-4 font-playfair text-[38px] leading-[1.05] text-neutral-900 md:text-[58px] lg:text-[72px]">
                              All You{" "}
                              <span className="italic text-white">
                                   Need
                              </span>{" "}
                              To Know
                         </h2>

                         <p className="mx-auto mt-5 max-w-200 font-urbanist text-[15px] leading-7 text-neutral-900/80 md:text-[17px]">
                              Our students have gone on to build successful careers with
                              leading organizations across diverse industries, showcasing
                              the skills, knowledge, and confidence they gained through our
                              programs.
                         </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                         {blogs.map((blog) => (
                              <article
                                   key={blog.id}
                                   className="group cursor-pointer"
                              >
                                   {/* Image */}
                                   <div className="overflow-hidden rounded-md">
                                        <img
                                             src={blog.image}
                                             alt={blog.title}
                                             className="h-62.5 w-full object-cover transition duration-700 group-hover:scale-105 md:h-70"
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
                         ))}
                    </div>
               </div>
          </section>
     );
}