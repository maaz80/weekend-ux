'use client'
import React from "react";
import { FiPhoneCall, FiPhone, FiMessageSquare } from "react-icons/fi";

const QuickAccessBar = () => {
     return (
          <div className="fixed bottom-0 left-0 z-99999 w-full border-t border-zinc-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
               <div className="mx-auto flex h-14 max-w-4xl">

                    {/* Request Callback */}
                    <a
                         href="https://wa.me/919599272764?text=Hi! I would like to request a callback."
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-medium text-neutral-900 transition hover:bg-zinc-50"
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
                         className="flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-medium text-neutral-900 transition hover:bg-zinc-50"
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
                    <div className="flex flex-1 items-center justify-center gap-2 text-[14px] md:text-sm font-semibold text-black transition cursor-pointer mr-2.5 md:mr-0">
                         <div className="flex items-center justify-center gap-2 bg-official text-neutral-900 w-35 h-12 rounded-xl">
                              <FiMessageSquare className="text-base shrink-0" />
                              <span>Live Chat</span>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default QuickAccessBar;