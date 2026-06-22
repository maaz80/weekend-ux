import Image from "next/image";

const Content = ({ data }) => {
     const quote = data && data.trim()
          ? data.trim()
          : "“Design can't be learned by watching someone else design. Weekend UX exists because the only way to get better is to sit down, make something, and get honest feedback on it.”";

     return (
          <div className="relative py-9 md:py-15 custom-width px-0 md:px-5">
               <div className='text-[32px] md:text-[40px] text-neutral-900 text-center font-urbanist max-w-230 mx-auto'>{quote}</div>
               <Image src='/images/weekend-ux-decorative-diamond.webp' alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute right-1 md:right-3 top-0 opacity-50 md:top-0 z-30" width={200} height={200} style={{ height: 'auto' }} />
          </div>
     )
}

export default Content;