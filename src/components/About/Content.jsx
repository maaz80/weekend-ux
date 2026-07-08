import Image from "next/image";

const Content = ({
     data,
     textColor = "text-neutral",
     fontSize = "text-[32px] md:text-[40px]",
     showDiamond = true,
     diamondOpacity = "opacity-50"
}) => {
     const quote = data && typeof data === "string" && data.trim()
          ? data.trim()
          : "“Design can't be learned by watching someone else design. Weekend UX exists because the only way to get better is to sit down, make something, and get honest feedback on it.”";

     return (
          <div className="relative py-9 md:py-15 custom-width px-0 md:px-5">
               <div className={`text-center font-urbanist max-w-230 mx-auto ${fontSize} ${textColor}`}>{quote}</div>
               {showDiamond && (
                    <Image
                         src='/images/weekend-ux-decorative-diamond.webp'
                         alt="weekend-ux-decorative-diamond"
                         className={`w-24 md:w-50 h-auto absolute right-1 md:right-3 top-0 md:top-0 z-30 ${diamondOpacity}`}
                         width={200}
                         height={200}
                         style={{ height: 'auto' }}
                    />
               )}
          </div>
     )
}

export default Content;