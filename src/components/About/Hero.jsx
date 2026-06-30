import Image from "next/image";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";

export default function Hero({ data }) {
     const title = data?.title?.trim() ? data.title.trim() : "Learn as you desire";
     const heading = data?.heading?.trim() ? data.heading.trim() : "Best Design Academy in Delhi that teaches you actual skills in person";
     const buttonName = data?.buttonName?.trim() ? data.buttonName.trim() : "Explore Programs";
     const bgImage = data?.bgImage?.trim() ? data.bgImage.trim() : "/images/weekend-ux-location-hero-bg.webp";

     return (
          <div id="about-hero" className=" bg-white text-white font-urbanist flex flex-col relative pt-16 md:pt-8">
               <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: 'auto' }}/>
               {/* Hero Header Section */}
               <section className="relative h-62.5 md:h-120 w-full flex flex-col gap-5 items-center justify-center bg-zinc-950 overflow-hidden">
                    <OptimizedImage
                         src={bgImage}
                         alt="weekend-ux-location-hero-bg"
                         className="absolute inset-0 w-full h-full object-cover object-center opacity-60 z-0"
                         sizes="100vw"
                         priority={true}
                         fetchPriority="high"
                    />
                    {/* Content */}
                    <span className="font-urbanist text-[11px] font-bold uppercase tracking-[0.45em] relative z-50 text-official">
                         {title}
                    </span>

                    <h1 className="custom-width text-[22px] md:text-[38px] 2xl:text-[56px] text-center leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">
                         {heading}
                    </h1>

                    <Link href="/courses">
                         <button className="px-5 h-10 rounded-xl bg-official text-neutral-900 font-urbanist relative z-50 cursor-pointer hover:scale-102 transition font-bold">
                              {buttonName}
                         </button>
                    </Link>
               </section>
          </div>
     );
}
