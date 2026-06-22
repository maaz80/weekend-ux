"use client";

import React from 'react'
import { useHomeData } from "@/context/HomeDataContext";

const Philosophy = () => {
     const { homeData } = useHomeData();

     const title = (homeData?.philosophy?.title && homeData.philosophy.title.trim())
          ? homeData.philosophy.title
          : "Our Philosophy";

     const description = (homeData?.philosophy?.description && homeData.philosophy.description.trim())
          ? homeData.philosophy.description
          : "“Design can't be learned by watching someone else design. Weekend UX exists because the only way to get better is to sit down, make something, and get honest feedback on it.”";

     return (
          <div className='relative w-full min-h-75 flex items-center justify-center'>
               {/* Background */}
               <div
                    className="absolute inset-0 bg-cover bg-center z-10"
                    style={{
                         backgroundImage: "url('/images/weekend-ux-philosophy-bg.webp')",
                    }}
               />
               <div className='relative z-20 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between custom-width w-full py-12 md:py-16'>
                    <h2 className='font-playfair font-medium text-[28px] md:text-[48px] text-official w-[98%] md:w-[30%]'>{title}</h2>
                    <p className='font-urbanist text-[16px] md:text-[24px] leading-8 md:leading-9 italic w-[98%] md:w-[70%] text-white'>{description}</p>
               </div>
          </div>
     )
}

export default Philosophy