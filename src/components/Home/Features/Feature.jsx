import Image from "next/image";
import FeatureStrip from "./FeatureStrip";
export default function Feature() {
     return (
          <section className="w-full bg-official relative">
               <FeatureStrip />
              <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-34 md:w-50 h-auto absolute right-3 md:right-10 -top-22 md:-top-22 z-30" width={200} height={200} style={{ height: 'auto' }}/>
          </section>
     );
}