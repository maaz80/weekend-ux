'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

const CookieBanner = () => {
     const [visible, setVisible] = useState(false);

     useEffect(() => {
          if (typeof window === "undefined") return;

          const isBot = /SearchBot|Googlebot|Chrome-Lighthouse|Lighthouse/i.test(navigator.userAgent);
          if (isBot) return;

          const consent = localStorage.getItem("cookie-consent");

          if (!consent) {
               const timer = setTimeout(() => {
                    setVisible(true);
               }, 1500);

               return () => clearTimeout(timer);
          }
     }, []);

     const acceptCookies = () => {
          localStorage.setItem("cookie-consent", "accepted");
          setVisible(false);
     };

     const declineCookies = () => {
          localStorage.setItem("cookie-consent", "declined");
          setVisible(false);
     };

     if (!visible) return null;

     return (
          <div
               className="fixed bottom-0 left-0 z-100000 w-full border-t border-zinc-200 bg-white/98 backdrop-blur-md shadow-[0_-4px_25px_rgba(0,0,0,0.12)] font-urbanist animate-in fade-in slide-in-from-bottom-5 duration-300"
               role="dialog"
               aria-live="polite"
               aria-label="Cookie Consent Banner"
          >
               <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-3 max-w-7xl px-4 md:px-8 py-3.5 md:py-2.5 min-h-14">
                    
                    {/* Text Section */}
                    <div className="flex items-center gap-2.5 text-center md:text-left">
                         <p className="text-xs md:text-sm text-neutral font-medium leading-normal">
                              We use cookies to personalize content, enhance browsing experience, and analyze traffic. Read our{" "}
                              <Link
                                   href="/privacy-policy"
                                   className="text-neutral font-bold underline underline-offset-2 hover:text-official transition-colors"
                              >
                                   Privacy Policy
                              </Link>
                              .
                         </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                         <button
                              type="button"
                              onClick={declineCookies}
                              className="flex-1 md:flex-none h-9 px-5 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 font-semibold text-xs transition-all duration-200 cursor-pointer"
                         >
                              Decline
                         </button>

                         <button
                              type="button"
                              onClick={acceptCookies}
                              className="flex-1 md:flex-none h-9 px-6 rounded-lg bg-official text-neutral hover:bg-official/90 font-bold text-xs transition-all duration-200 cursor-pointer shadow-xs"
                         >
                              Accept
                         </button>
                    </div>

               </div>
          </div>
     );
};

export default CookieBanner;
