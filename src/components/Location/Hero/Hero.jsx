import Image from "next/image";
import Link from "next/link";

export default function Hero() {
         return (
              <div className=" bg-white text-white font-urbanist flex flex-col relative">
    <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute right-3 md:right-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: 'auto' }}/>
                   {/* Hero Header Section */}
                   <section className="relative h-62.5 md:h-100 w-full flex flex-col gap-5 items-center justify-center bg-zinc-950 overflow-hidden">
                        <Image
                             src='/images/weekend-ux-location-hero-bg.webp'
                             alt="weekend-ux-policy-hero-bg"
                             fill
                             priority
                             className="object-cover object-center opacity-60 z-0"
                        />
                        {/* Content */}
                        <span className="font-urbanist text-[11px] font-bold uppercase tracking-[0.45em] relative z-50 text-official">
                             Learn as you desire
                        </span>

                        <h1 className="custom-width text-[22px] md:text-[38px] 2xl:text-[56px] text-center leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair">Best Design Academy in Delhi that teacher you actual skills in person</h1>
    
                        <Link href="/courses">
                             <button className="px-5 h-10 rounded-xl bg-official text-neutral-900 font-urbanist relative z-50">
                                  Explore Programs
                             </button>
                        </Link>
                   </section>
          </div>
     );
}
