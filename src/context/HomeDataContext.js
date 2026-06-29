"use client";

import { createContext, useContext, useState, useEffect } from "react";

const HomeDataContext = createContext({
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

     useEffect(() => {
          let isMounted = true;

          async function fetchMissingData() {
               const promises = [];
               const keys = [];

               if (!homeData) { promises.push(fetch("/api/home")); keys.push("home"); }
               if (!faqData) { promises.push(fetch("/api/pages/home/faq")); keys.push("faq"); }
               if (!coursesData) { promises.push(fetch("/api/courses")); keys.push("courses"); }
               if (!navbarData) { promises.push(fetch("/api/navbar")); keys.push("navbar"); }
               if (!footerGlobalData) { promises.push(fetch("/api/footer-columns/global")); keys.push("footerGlobal"); }
               if (!footerColumnsData) { promises.push(fetch("/api/footer-columns")); keys.push("footerColumns"); }
               if (!testimonialsData) { promises.push(fetch("/api/testimonials")); keys.push("testimonials"); }
               if (!blogsData) { promises.push(fetch("/api/blogs")); keys.push("blogs"); }

               if (promises.length === 0) {
                    if (isMounted) setLoading(false);
                    return;
               }

               try {
                    const responses = await Promise.all(promises);

                    for (let i = 0; i < responses.length; i++) {
                         const res = responses[i];
                         const key = keys[i];
                         if (res.ok) {
                              const data = await res.json();
                              if (!isMounted) return;

                              if (key === "home") setHomeData(data);
                              else if (key === "faq") setFaqData(data);
                              else if (key === "courses") setCoursesData(data);
                              else if (key === "navbar") setNavbarData(data);
                              else if (key === "footerGlobal") setFooterGlobalData(data);
                              else if (key === "footerColumns") setFooterColumnsData(data);
                              else if (key === "testimonials") setTestimonialsData(data);
                              else if (key === "blogs") setBlogsData(data);
                         } else {
                              console.warn(`Failed to fetch missing context data for: ${key}, status: ${res.status}`);
                         }
                    }
               } catch (error) {
                    console.error("Error fetching missing homepage config data:", error);
               } finally {
                    if (isMounted) {
                         setLoading(false);
                    }
               }
          }

          fetchMissingData();

          return () => {
               isMounted = false;
          };
     }, [initialData]);

     return (
          <HomeDataContext.Provider value={{ homeData, faqData, coursesData, navbarData, footerGlobalData, footerColumnsData, testimonialsData, blogsData, loading, isChatbotOpen, setIsChatbotOpen }}>
               {children}
          </HomeDataContext.Provider>
     );
}

export function useHomeData() {
     return useContext(HomeDataContext);
}
