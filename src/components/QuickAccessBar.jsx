'use client'
import React from "react";
import { FiPhoneCall, FiPhone, FiMessageSquare } from "react-icons/fi";
import { useHomeData } from "@/context/HomeDataContext";

const QuickAccessBar = () => {
     const { isChatbotOpen, setIsChatbotOpen } = useHomeData();

     return (
          <div className="fixed bottom-0 left-0 z-99999 w-full border-t border-zinc-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
               <div className="mx-auto flex h-14 max-w-4xl">

                    {/* Request Callback */}
                    <a
                         href="https://wa.me/919599272764?text=Hi! I would like to request a callback."
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-medium text-neutral transition hover:bg-zinc-50"
                    >
                         <FiPhoneCall className="text-base shrink-0" />
                         <span className="hidden sm:inline">
                              Request Callback
                         </span>
                         <span className="sm:hidden">
                              Callback
                         </span>
                     </a>

                    {/* Call */}
                    <a
                         href="tel:9195992 72764"
                         className="flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-medium text-neutral transition hover:bg-zinc-50"
                    >
                         <FiPhone className="text-base shrink-0" />
                         <span className="hidden md:inline">
                              Call us at +91 95992 72764
                         </span>
                         <span className="md:hidden">
                              Call Now
                         </span>
                     </a>

                    {/* Live Chat */}
                    <div 
                         onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                         className="flex flex-1 items-center justify-center gap-2 text-[14px] md:text-sm font-bold text-neutral transition cursor-pointer mr-2.5 md:mr-0 select-none"
                    >
                         <div className={`flex items-center justify-center gap-2 w-35 h-12 rounded-md transition-all duration-300 ${isChatbotOpen ? 'bg-neutral text-official' : 'bg-official text-neutral hover:bg-official/80'}`}>
                              <FiMessageSquare className="text-base shrink-0" />
                              <span>Live Chat</span>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default QuickAccessBar;