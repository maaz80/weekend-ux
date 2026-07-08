import OptimizedImage from "@/components/ui/OptimizedImage";
import Button from "@/components/ui/Button";
import CardBg from '@/app/assets/weekend-ux-course-details-call-card-bg.webp';

export default function CallCard({
     title = "Design is more than just being creative!",
     subtitle = "Learn how to make design that sells",
     buttonText = "Book a Call",
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

               <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div>
                         <h3 className={`text-[24px] font-playfair leading-tight font-semibold ${titleColor}`}>
                              {title}
                         </h3>

                         <p className={`mt-3 ${subtitleColor}`}>
                              {subtitle}
                         </p>
                    </div>

                    <Button
                         variant="primary"
                         size="h-12 rounded-lg text-sm px-6"
                         className="w-full"
                         onClick={onButtonClick}
                    >
                         {buttonText}
                    </Button>
               </div>
          </div>
     );
}
