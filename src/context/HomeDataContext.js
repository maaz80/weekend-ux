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

export function HomeDataProvider({ children }) {
     const [homeData, setHomeData] = useState(null);
     const [faqData, setFaqData] = useState(null);
     const [coursesData, setCoursesData] = useState(null);
     const [navbarData, setNavbarData] = useState(null);
     const [footerGlobalData, setFooterGlobalData] = useState(null);
     const [footerColumnsData, setFooterColumnsData] = useState(null);
     const [testimonialsData, setTestimonialsData] = useState(null);
     const [blogsData, setBlogsData] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          let isMounted = true;
          async function fetchAllData() {
               try {
                    const [homeRes, faqRes, coursesRes, navbarRes, footerGlobalRes, footerColumnsRes, testimonialsRes, blogsRes] = await Promise.all([
                         fetch("/api/home"),
                         fetch("/api/pages/home/faq"),
                         fetch("/api/courses"),
                         fetch("/api/navbar"),
                         fetch("/api/footer-columns/global"),
                         fetch("/api/footer-columns"),
                         fetch("/api/testimonials"),
                         fetch("/api/blogs")
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

                    if (coursesRes.ok) {
                         const cData = await coursesRes.json();
                         if (isMounted) setCoursesData(cData);
                    } else {
                         console.warn("Failed to fetch courses data, status code:", coursesRes.status);
                    }

                    if (navbarRes.ok) {
                         const nData = await navbarRes.json();
                         if (isMounted) setNavbarData(nData);
                    } else {
                         console.warn("Failed to fetch navbar settings, status code:", navbarRes.status);
                    }

                    if (footerGlobalRes.ok) {
                         const fgData = await footerGlobalRes.json();
                         if (isMounted) setFooterGlobalData(fgData);
                    } else {
                         console.warn("Failed to fetch footer global settings, status code:", footerGlobalRes.status);
                    }

                    if (footerColumnsRes.ok) {
                         const fcData = await footerColumnsRes.json();
                         if (isMounted) setFooterColumnsData(fcData);
                    } else {
                         console.warn("Failed to fetch footer columns, status code:", footerColumnsRes.status);
                    }

                    if (testimonialsRes.ok) {
                         const tData = await testimonialsRes.json();
                         if (isMounted) setTestimonialsData(tData);
                    } else {
                         console.warn("Failed to fetch testimonials, status code:", testimonialsRes.status);
                    }

                    if (blogsRes.ok) {
                         const bData = await blogsRes.json();
                         if (isMounted) setBlogsData(bData);
                    } else {
                         console.warn("Failed to fetch blogs, status code:", blogsRes.status);
                    }
               } catch (error) {
                    console.error("Error fetching homepage config/FAQ/Courses/Navbar/Footer/Blogs from API:", error);
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
          <HomeDataContext.Provider value={{ homeData, faqData, coursesData, navbarData, footerGlobalData, footerColumnsData, testimonialsData, blogsData, loading }}>
               {children}
          </HomeDataContext.Provider>
     );
}

export function useHomeData() {
     return useContext(HomeDataContext);
}
