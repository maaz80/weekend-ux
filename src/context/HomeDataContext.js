"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

export const HomeDataContext = createContext({
     homeData: null,
     faqData: null,
     coursesData: null,
     navbarData: null,
     footerGlobalData: null,
     footerColumnsData: null,
     testimonialsData: null,
     blogsData: null,
     loading: true,
});

export function HomeDataProvider({ children, initialData }) {
     const [homeData, setHomeData] = useState(initialData?.homeData || null);
     const [faqData, setFaqData] = useState(initialData?.faqData || null);
     const [coursesData, setCoursesData] = useState(initialData?.coursesData || null);
     const [navbarData, setNavbarData] = useState(initialData?.navbarData || null);
     const [footerGlobalData, setFooterGlobalData] = useState(initialData?.footerGlobalData || null);
     const [footerColumnsData, setFooterColumnsData] = useState(initialData?.footerColumnsData || null);
     const [testimonialsData, setTestimonialsData] = useState(initialData?.testimonialsData || null);
     const [blogsData, setBlogsData] = useState(initialData?.blogsData || null);
     const [loading, setLoading] = useState(!initialData);
     const [isChatbotOpen, setIsChatbotOpen] = useState(false);

     const hasFetchedRef = useRef(false);

     useEffect(() => {
          if (hasFetchedRef.current) return;
          hasFetchedRef.current = true;

          let isMounted = true;

          async function fetchAllData() {
               // Always fetch all data fresh from the API so admin changes always reflect.
               // initialData is only used for the initial paint — we re-fetch everything on mount.
               const endpoints = [
                    { key: "home",         url: "/api/home" },
                    { key: "faq",          url: "/api/pages/home/faq" },
                    { key: "courses",      url: "/api/courses" },
                    { key: "navbar",       url: "/api/navbar" },
                    { key: "footerGlobal", url: "/api/footer-columns/global" },
                    { key: "footerColumns",url: "/api/footer-columns" },
                    { key: "testimonials", url: "/api/testimonials" },
                    { key: "blogs",        url: "/api/blogs" },
               ];

               try {
                    const results = await Promise.allSettled(
                         endpoints.map(e => fetch(e.url, { cache: "no-store" }))
                    );

                    for (let i = 0; i < results.length; i++) {
                         const result = results[i];
                         const key = endpoints[i].key;

                         if (result.status === "fulfilled") {
                              const res = result.value;
                              if (res.ok) {
                                   try {
                                        const data = await res.json();
                                        if (!isMounted) return;

                                        if (key === "home")          setHomeData(data);
                                        else if (key === "faq")      setFaqData(data);
                                        else if (key === "courses")   setCoursesData(data);
                                        else if (key === "navbar")    setNavbarData(data);
                                        else if (key === "footerGlobal")  setFooterGlobalData(data);
                                        else if (key === "footerColumns") setFooterColumnsData(data);
                                        else if (key === "testimonials")  setTestimonialsData(data);
                                        else if (key === "blogs")    setBlogsData(data);
                                   } catch (jsonErr) {
                                        console.error(`Failed to parse JSON for key: ${key}`, jsonErr);
                                   }
                              } else {
                                   console.warn(`Failed to fetch data for: ${key}, status: ${res.status}`);
                              }
                         } else {
                              console.error(`Network error fetching data for: ${key}:`, result.reason);
                         }
                    }
               } catch (error) {
                    console.error("Error in fetching homepage config data batch:", error);
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
          <HomeDataContext.Provider value={{ homeData, faqData, coursesData, navbarData, footerGlobalData, footerColumnsData, testimonialsData, blogsData, loading, isChatbotOpen, setIsChatbotOpen }}>
               {children}
          </HomeDataContext.Provider>
     );
}

export function useHomeData() {
     return useContext(HomeDataContext);
}
