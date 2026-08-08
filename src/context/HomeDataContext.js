"use client";

import { createContext, useContext, useState } from "react";

export const HomeDataContext = createContext({
     homeData: null,
     faqData: null,
     coursesData: null,
     navbarData: null,
     footerGlobalData: null,
     footerColumnsData: null,
     testimonialsData: null,
     blogsData: null,
     loading: false,
});

/**
 * HomeDataProvider — purely static data distribution.
 *
 * All content data is fetched at BUILD TIME by layout.js (server component)
 * and passed here as `initialData`. No client-side API calls are made.
 *
 * Flow:
 *   Admin changes → GitHub Action triggered → Next.js build runs →
 *   layout.js fetches fresh DB data → baked into static HTML → FTP to Hostinger
 *
 * After one page refresh the user sees new content. No caching issues.
 */
export function HomeDataProvider({ children, initialData }) {
     const [isChatbotOpen, setIsChatbotOpen] = useState(false);

     return (
          <HomeDataContext.Provider
               value={{
                    homeData: initialData?.homeData || null,
                    faqData: initialData?.faqData || null,
                    coursesData: initialData?.coursesData || null,
                    navbarData: initialData?.navbarData || null,
                    footerGlobalData: initialData?.footerGlobalData || null,
                    footerColumnsData: initialData?.footerColumnsData || null,
                    testimonialsData: initialData?.testimonialsData || null,
                    blogsData: initialData?.blogsData || null,
                    loading: false,
                    isChatbotOpen,
                    setIsChatbotOpen,
               }}
          >
               {children}
          </HomeDataContext.Provider>
     );
}

export function useHomeData() {
     return useContext(HomeDataContext);
}
