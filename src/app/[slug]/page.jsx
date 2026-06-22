import Image from "next/image";
import Details from "./Details";
import FAQ from "@/components/FAQ";
import RelatedBlogs from "@/components/RelatedBlogs";

export default function BlogDetails() {
         return (
              <div className="min-h-screen bg-white text-white font-urbanist flex flex-col">
    
                   {/* Hero Header Section */}
                   <section className="relative h-52.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 ">
                        <Image
                             src='/images/weekend-ux-blogs-hero-bg.webp'
                             alt="weekend-ux-policy-hero-bg"
                             fill
                             priority
                             className="object-cover
                              object-center opacity-60 z-0"
                        />
                        
                        {/* Content */}
                        <h1 className="custom-width text-[22px] md:text-[38px] 2xl:text-[56px] text-center leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">Explore Why should a learner prefer to study on campus rather than other options</h1>
                        <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: 'auto' }} />
                   </section>
                   <Details/>
                   <RelatedBlogs/>
                   <FAQ/>
          </div>
     );
}
