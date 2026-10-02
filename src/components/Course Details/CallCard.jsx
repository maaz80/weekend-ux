import OptimizedImage from "@/components/ui/OptimizedImage";
import Button from "@/components/ui/Button";
import CardBg from '@/app/assets/weekend-ux-course-details-call-card-bg.webp';

export default function CallCard({
     title = "Design is more than just being creative!",
     subtitle = "Learn how to make design that sells",
     buttonText = "Enquire Now",
     bgImage = CardBg.src,
     titleColor = "text-white",
     subtitleColor = "text-white/90",
     overlayOpacity = "bg-neutral/25",
     onButtonClick
}) {
     return (
          <div className="rounded-xl overflow-hidden relative h-64.5 w-full">
               <OptimizedImage
                    src={bgImage}
                    alt="weekend-ux-course-details-call-card-bg"
                    className="w-full h-full object-cover"
                    sizes="100vw"
               />
               <div className={`absolute inset-0 ${overlayOpacity}`} />

               <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                         <h3 className={`font-playfair text-[34px] leading-[1.1] ${titleColor}`}>
                              {title}
                         </h3>

                         <p className={`mt-3 text-white/80 text-sm`}>
                              {subtitle}
                         </p>
                    </div>

                    <Button
                         variant="primary"
                         size="h-12 rounded-md text-sm px-6"
                         className="w-full"
                         onClick={onButtonClick}
                    >
                         {buttonText}
                    </Button>
               </div>
          </div>
     );
}
<div className="absolute inset-0 p-4 flex flex-col justify-between">

     <div>
          <h2 className="font-playfair text-white text-[34px] leading-[1.1]">
               Design is more than just being creative!
          </h2>

          <p className="mt-3 text-white/80 text-sm">
               Learn how to make design that sells
          </p>
     </div>

     <button className="h-12 rounded-lg bg-[#F7C600] text-neutral font-bold text-sm cursor-pointer">
          Enquire Now
     </button>

</div>