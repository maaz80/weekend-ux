import React from 'react'

const Philosophy = () => {
     return (
          <div className='relative   min-h-75'>
               {/* Background */}
               <div
                    className="absolute inset-0 bg-cover bg-center z-10"
                    style={{
                         backgroundImage: "url('/images/weekend-ux-philosophy-bg.webp')",
                    }}
               />
               <div className='custom-width flex flex-col md:flex-row gap-5 items-start md:items-center justify-center md:justify-between  min-h-75 '>
               <h2 className='font-playfair font-medium text-[28px] md:text-[48px] text-official relative z-20 w-[98%] md:w-[30%]'>Our Philosophy</h2>
               <p className='font-urbanist text-[16px] md:text-[24px] leading-8 md:leading-9 italic w-[98%] md:w-[70%] relative z-20 text-white'>“Design can't be learned by watching someone else design. Weekend UX exists because the only way to get better is to sit down, make something, and get honest feedback on it.”</p>
          </div>
          </div>
     )
}

export default Philosophy