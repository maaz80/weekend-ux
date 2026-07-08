import Image from "next/image";
import FeatureStrip from "./FeatureStrip";
export default function Feature({
     bgColor = "bg-official",
     textColor = "text-neutral",
     borderColor = "bg-neutral",
     showDiamond = true,
     diamondImage = '/images/weekend-ux-decorative-diamond.webp'
}) {
     return (
          <section className={`w-full relative ${bgColor}`}>
               <FeatureStrip textColor={textColor} borderColor={borderColor} />
               {showDiamond && diamondImage && (
                    <Image
                         src={diamondImage}
                         alt="weekend-ux-decorative-diamond"
                         className="w-34 md:w-50 h-auto absolute right-3 md:right-10 -top-22 md:-top-22 z-30"
                         width={200}
                         height={200}
                         style={{ height: 'auto' }}
                    />
               )}
          </section>
     );
}