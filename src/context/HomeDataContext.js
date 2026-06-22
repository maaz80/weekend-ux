"use client";

import { createContext, useContext, useState, useEffect } from "react";

const HomeDataContext = createContext({
     homeData: null,
     faqData: null,
     loading: true,
});

export function HomeDataProvider({ children }) {
     const [homeData, setHomeData] = useState(null);
     const [faqData, setFaqData] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          let isMounted = true;
          async function fetchAllData() {
               try {
                    const [homeRes, faqRes] = await Promise.all([
                         fetch("/api/home"),
                         fetch("/api/pages/home/faq")
                    ]);

                    if (homeRes.ok) {
                         const hData = await homeRes.json();
                         if (isMounted) setHomeData(hData);
                    } else {
                         console.warn("Failed to fetch home data, status code:", homeRes.status);
                    }

                    if (faqRes.ok) {
                         const fData = await faqRes.json();
                         if (isMounted) setFaqData(fData);
                    } else {
                         console.warn("Failed to fetch FAQ data, status code:", faqRes.status);
                    }
               } catch (error) {
                    console.error("Error fetching homepage config/FAQ from API:", error);
               } finally {
                    if (isMounted) {
                         setLoading(false);
                    }
               }
          }

          fetchAllData();

          return () => {
               isMounted = false;
          };
     }, []);

     return (
          <HomeDataContext.Provider value={{ homeData, faqData, loading }}>
               {children}
          </HomeDataContext.Provider>
     );
}

export function useHomeData() {
     return useContext(HomeDataContext);
}
