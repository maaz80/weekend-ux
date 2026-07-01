"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import dynamic from "next/dynamic";
const ProgramModalContent = dynamic(
     () => import("./Home/OurPrograms/ProgramModalContent"),
     { ssr: false }
);
import Link from "next/link";
import Button from "./ui/Button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Logo from "@/app/assets/weekend-ux-logo.webp";
const AuthModal = dynamic(
     () => import("./AuthModal"),
     { ssr: false }
);
import { useHomeData } from "@/context/HomeDataContext";
import { getCurrentUser, logoutUser, getUserToken } from "@/utils/auth.js";
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { SiFacebook, SiYoutube } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = ({ initialMenuOpen = false, initialSearchOpen = false }) => {
     const { navbarData, coursesData } = useHomeData();
     const router = useRouter();
     const pathname = usePathname();
     const [isMenuOpen, setIsMenuOpen] = useState(initialMenuOpen);
     const [suggestedResults, setSuggestedResults] = useState([]);
     const [isSearchOpen, setIsSearchOpen] = useState(initialSearchOpen);
     const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
     const [isMoreButtonLight, setIsMoreButtonLight] = useState(false);
     const [user, setUser] = useState(null);
     const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const [searchResults, setSearchResults] = useState([]);
     const desktopSearchRef = useRef(null);
     const mobileSearchRef = useRef(null);

     const hoverTimeoutRef = useRef(null);

     const startCloseTimeout = () => {
          if (window.innerWidth >= 768) {
               if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
               hoverTimeoutRef.current = setTimeout(() => {
                    setIsCoursesModalOpen(false);
               }, 200);
          }
     };

     const clearCloseTimeout = () => {
          if (window.innerWidth >= 768) {
               if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
               }
               setIsCoursesModalOpen(true);
          }
     };

     useEffect(() => {
          return () => {
               if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
               }
          };
     }, []);

     useEffect(() => {
          const token = getUserToken();
          if (token) {
               getCurrentUser().then((userData) => {
                    if (userData) {
                         setUser(userData);
                    }
               });
          }
     }, []);

     useEffect(() => {
          if (!isUserDropdownOpen) return;
          const closeDropdown = () => setIsUserDropdownOpen(false);
          document.addEventListener("click", closeDropdown);
          return () => document.removeEventListener("click", closeDropdown);
     }, [isUserDropdownOpen]);

     const handleAuthSuccess = () => {
          getCurrentUser().then((userData) => {
               if (userData) {
                    setUser(userData);
               }
          });
     };

     const handleSearchSubmit = (e) => {
          if (e) e.preventDefault();
          if (searchQuery.trim()) {
               router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
               setSearchQuery("");
               setIsSearchOpen(false);
          }
     };

     useEffect(() => {
          const query = searchQuery.trim().toLowerCase();
          if (query.length >= 2 && coursesData?.course) {
               // Direct Matches
               const direct = coursesData.course.filter(course =>
                    course.title?.toLowerCase().includes(query) ||
                    course.overview?.toLowerCase().includes(query) ||
                    course.category?.toLowerCase().includes(query)
               );
               setSearchResults(direct);

               // Related Matches (Same Category, but not in direct matches)
               const directCategories = [...new Set(direct.map(c => c.category).filter(Boolean))];
               if (directCategories.length > 0) {
                    const related = coursesData.course.filter(course =>
                         directCategories.includes(course.category) &&
                         !direct.some(d => d._id === course._id)
                    );
                    setSuggestedResults(related);
               } else {
                    setSuggestedResults([]);
               }
          } else {
               setSearchResults([]);
               setSuggestedResults([]);
          }
     }, [searchQuery, coursesData]);

     useEffect(() => {
          const handleClickOutside = (e) => {
               if (
                    (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target)) &&
                    (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target))
               ) {
                    setSearchQuery("");
               }
          };
          document.addEventListener("click", handleClickOutside);
          return () => document.removeEventListener("click", handleClickOutside);
     }, []);

     const dropdownLabel = navbarData?.dropdownName && navbarData.dropdownName.trim()
          ? navbarData.dropdownName.trim()
          : "All Courses";

     const searchPlaceholderLabel = navbarData?.searchPlaceholder && navbarData.searchPlaceholder.trim()
          ? navbarData.searchPlaceholder.trim()
          : "What do you want to learn?";

     const loginLabel = navbarData?.loginButtonName && navbarData.loginButtonName.trim()
          ? navbarData.loginButtonName.trim()
          : "Login";

     const hasLogoImage = navbarData?.logo?.image && navbarData.logo.image.trim();

     const moreTitle = navbarData?.moreItems?.title || "More";
     const moreItemsDropdownList = navbarData?.moreItems?.dropdown_items || [];

     useEffect(() => {
          const routeSectionIds = pathname === "/"
               ? ["home-hero", "home-philosophy"]
               : pathname === "/about-us"
                    ? ["about-hero"]
                    : pathname === "/courses"
                         ? ["courses-hero"]
                         : [];

          const explicitSections = Array.from(
               document.querySelectorAll("[data-navbar-light='true'], [data-navbar-light-section='true']")
          ).filter((section) => section instanceof HTMLElement);

          const sectionIds = [...new Set([...routeSectionIds, ...explicitSections.map((section) => section.id).filter(Boolean)])];
          const sections = sectionIds
               .map((id) => document.getElementById(id))
               .filter(Boolean);

          if (sections.length === 0) {
               setIsMoreButtonLight(false);
               return;
          }

          const updateLightState = () => {
               const isVisible = sections.some((section) => {
                    const rect = section.getBoundingClientRect();
                    return rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
               });
               setIsMoreButtonLight(isVisible);
          };

          updateLightState();

          const observer = new IntersectionObserver((entries) => {
               const isVisible = entries.some((entry) => entry.isIntersecting);
               setIsMoreButtonLight(isVisible);
          }, { threshold: 0.2 });

          sections.forEach((section) => observer.observe(section));

          window.addEventListener("scroll", updateLightState, { passive: true });
          window.addEventListener("resize", updateLightState);

          return () => {
               observer.disconnect();
               window.removeEventListener("scroll", updateLightState);
               window.removeEventListener("resize", updateLightState);
          };
     }, [pathname]);

     useEffect(() => {
          const html = document.documentElement;
          if (isCoursesModalOpen) {
               const scrollBarWidth = window.innerWidth - html.clientWidth;
               html.style.overflow = "hidden";
               html.style.paddingRight = `${scrollBarWidth}px`;
          } else {
               html.style.overflow = "";
               html.style.paddingRight = "";
          }
          return () => {
               html.style.overflow = "";
               html.style.paddingRight = "";
          };
     }, [isCoursesModalOpen]);

     const [prevInitialMenuOpen, setPrevInitialMenuOpen] = useState(initialMenuOpen);
     if (initialMenuOpen !== prevInitialMenuOpen) {
          setIsMenuOpen(initialMenuOpen);
          setPrevInitialMenuOpen(initialMenuOpen);
     }

     const [prevInitialSearchOpen, setPrevInitialSearchOpen] = useState(initialSearchOpen);
     if (initialSearchOpen !== prevInitialSearchOpen) {
          setIsSearchOpen(initialSearchOpen);
          setPrevInitialSearchOpen(initialSearchOpen);
     }

     return (
          <>
               <div className="font-urbanist fixed w-full top-0 z-99999">
                    {/* Top Bar */}
                    <div className="w-full bg-official text-neutral-900 py-1.5 md:py-2 text-[11px] md:text-[13px] font-semibold border-b border-zinc-950/10 relative z-50">
                         <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-col md:flex-row px-3 md:px-6 pb-0.5 md:pb-0">
                              <div className="flex items-center gap-4 md:gap-6">
                                   <a href="tel:+919311500423" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                        <FaPhoneAlt size={12} className="md:w-3.5 md:h-3.5" aria-hidden="true" />
                                        <span>+91 9599272764</span>
                                   </a>
                                   <a href="mailto:business@kreeyadesign.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                        <FaEnvelope size={12} className="md:w-3.5 md:h-3.5" aria-hidden="true" />
                                        <span className="">business@weekendux.com</span>
                                   </a>
                              </div>
                              <div className="flex items-center gap-4 md:gap-5">
                                   <a href="https://www.facebook.com/weekendux/" target="_blank" rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                        <SiFacebook size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                                   </a>
                                   <a href="https://www.instagram.com/weekendux1/" target="_blank" rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                        <FaInstagram size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                                   </a>
                                   <a href="https://www.linkedin.com/in/weekend-ux-7b03212a8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                        <FaLinkedinIn size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                                   </a>
                                   <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                        <SiYoutube size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                                   </a>
                                   <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                        <FaXTwitter size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                                   </a>
                              </div>
                         </div>
                    </div>

                    <nav className="w-full backdrop-blur-xl">
                         {/* MAIN NAVBAR */}
                         <div className="max-w-7xl mx-auto h-16 md:h-20 px-4 md:px-6 flex items-center justify-between">

                              {/* LEFT SIDE */}
                              <div className="flex items-center gap-3">

                                   {/* MOBILE MENU BUTTON */}
                                   <button
                                        onClick={() => {
                                             setIsMenuOpen(!isMenuOpen);
                                             if (isSearchOpen) {
                                                  setIsSearchOpen(false);
                                             }
                                        }}
                                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                        className={`md:hidden ${isMoreButtonLight ? "text-white" : "text-neutral-900"} hover:text-official/80 text-2xl transition cursor-pointer flex items-center`}
                                   >
                                        {isMenuOpen ? <FiX /> : <FiMenu />}
                                   </button>

                                   {/* LOGO */}
                                   <Link href="/" className="flex items-center">
                                        {hasLogoImage ? (
                                             <OptimizedImage
                                                  src={navbarData.logo.image.trim()}
                                                  alt={navbarData.logo.alt && navbarData.logo.alt.trim() ? navbarData.logo.alt.trim() : "Logo"}
                                                  className="w-auto h-9 md:h-11 object-contain"
                                                  objectFit="contain"
                                             />
                                        ) : (
                                             <Image
                                                  src={Logo}
                                                  alt="weekend-ux-logo"
                                                  width={50}
                                                  height={40}
                                                  className="w-auto h-9 md:h-auto"
                                                  priority
                                             />
                                        )}
                                   </Link>

                                   {/* DESKTOP CONTENT */}
                                   <div className="hidden md:flex items-center gap-4 ml-4">
                                        {/* AI COURSES BUTTON */}
                                        <Button
                                             variant="primary"
                                             onClick={() => setIsCoursesModalOpen(true)}
                                             onMouseEnter={clearCloseTimeout}
                                             onMouseLeave={startCloseTimeout}
                                        >
                                             {dropdownLabel}
                                        </Button>

                                        {/* SEARCH */}
                                        <div ref={desktopSearchRef} className="relative">
                                             <form onSubmit={handleSearchSubmit} className="relative">
                                                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                                                  <input
                                                       type="text"
                                                       value={searchQuery}
                                                       onChange={(e) => setSearchQuery(e.target.value)}
                                                       placeholder={searchPlaceholderLabel}
                                                       className="w-70 h-11 pl-11 pr-4 rounded-md bg-white outline-none text-sm text-black border border-transparent focus:border-official transition-all duration-300"
                                                  />
                                             </form>

                                             {/* Dropdown for search results with related suggestions */}
                                             {searchQuery.trim().length >= 2 && (
                                                  <>
                                                       <style dangerouslySetInnerHTML={{
                                                            __html: `
                                                            .search-dropdown-scroll::-webkit-scrollbar {
                                                                 display: none !important;
                                                            }
                                                       `}} />
                                                       <div
                                                            className="absolute top-full mt-2 left-0 w-80 bg-white border border-zinc-200 rounded-md shadow-2xl overflow-y-auto max-h-87.5 z-999999 search-dropdown-scroll"
                                                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                                       >
                                                            {searchResults.length > 0 || suggestedResults.length > 0 ? (
                                                                 <div className="flex flex-col">
                                                                      {/* Direct Matches Section */}
                                                                      {searchResults.length > 0 && (
                                                                           <div>
                                                                                <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 border-b border-zinc-100 text-left">
                                                                                     Matching Courses
                                                                                </div>
                                                                                <div className="divide-y divide-zinc-100">
                                                                                     {searchResults.map((course) => (
                                                                                          <Link
                                                                                               key={course._id || course.slug}
                                                                                               href={`/${course.slug || course._id}`}
                                                                                               onClick={() => setSearchQuery("")}
                                                                                               className="block px-4 py-3 hover:bg-zinc-50 transition-colors text-left group"
                                                                                          >
                                                                                               <div className="flex items-center gap-3">
                                                                                                    {course.image && (
                                                                                                         <img
                                                                                                              src={course.image}
                                                                                                              alt="course-image"
                                                                                                              className="w-9 h-9 object-cover rounded-md bg-zinc-100 shrink-0"
                                                                                                         />
                                                                                                    )}
                                                                                                    <div className="flex-1 min-w-0">
                                                                                                         <div className="text-xs font-semibold text-neutral-900 truncate line-clamp-1 group-hover:text-official transition-colors">
                                                                                                              {course.title}
                                                                                                         </div>
                                                                                                         <div className="text-[10px] text-zinc-500 truncate line-clamp-1 mt-0.5 font-medium">
                                                                                                              {course.category || "Design"} • {course.courselength || "12 Weeks"}
                                                                                                         </div>
                                                                                                    </div>
                                                                                               </div>
                                                                                          </Link>
                                                                                     ))}
                                                                                </div>
                                                                           </div>
                                                                      )}

                                                                      {/* Related Suggestions Section */}
                                                                      {suggestedResults.length > 0 && (
                                                                           <div>
                                                                                <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 border-y border-zinc-100 text-left">
                                                                                     Related Suggestions
                                                                                </div>
                                                                                <div className="divide-y divide-zinc-100">
                                                                                     {suggestedResults.slice(0, 4).map((course) => (
                                                                                          <Link
                                                                                               key={course._id || course.slug}
                                                                                               href={`/${course.slug || course._id}`}
                                                                                               onClick={() => setSearchQuery("")}
                                                                                               className="block px-4 py-3 hover:bg-zinc-50 transition-colors text-left group"
                                                                                          >
                                                                                               <div className="flex items-center gap-3">
                                                                                                    {course.image && (
                                                                                                         <img
                                                                                                              src={course.image}
                                                                                                              alt="course-image"
                                                                                                              className="w-9 h-9 object-cover rounded-md bg-zinc-100 shrink-0"
                                                                                                         />
                                                                                                    )}
                                                                                                    <div className="flex-1 min-w-0">
                                                                                                         <div className="text-xs font-semibold text-neutral-900 truncate line-clamp-1 group-hover:text-official transition-colors">
                                                                                                              {course.title}
                                                                                                         </div>
                                                                                                         <div className="text-[10px] text-zinc-500 truncate line-clamp-1 mt-0.5 font-medium">
                                                                                                              {course.category || "Design"} • {course.courselength || "12 Weeks"}
                                                                                                         </div>
                                                                                                    </div>
                                                                                               </div>
                                                                                          </Link>
                                                                                     ))}
                                                                                </div>
                                                                           </div>
                                                                      )}
                                                                 </div>
                                                            ) : (
                                                                 <div className="px-4 py-6 text-center text-zinc-500 text-xs font-medium">
                                                                      No results found
                                                                 </div>
                                                            )}
                                                       </div>
                                                  </>
                                             )}
                                        </div>
                                   </div>
                              </div>

                              {/* RIGHT SIDE */}
                              <div className="flex items-center gap-4 md:gap-8">
                                   {/* MOBILE SEARCH */}
                                   <button
                                        onClick={() => {
                                             setIsSearchOpen(!isSearchOpen);
                                             if (isMenuOpen) {
                                                  setIsMenuOpen(false);
                                             }
                                        }}
                                        aria-label={isSearchOpen ? "Close search" : "Open search"}
                                        className={`md:hidden ${isMoreButtonLight ? "text-white" : "text-neutral-900"} hover:text-official/80 text-xl transition cursor-pointer flex items-center`}
                                   >
                                        {isSearchOpen ? <FiX className="text-lg" /> : <FiSearch />}
                                   </button>

                                   <div
                                        className="relative hidden md:block group"
                                        onMouseEnter={() => setIsMenuOpen(false)}
                                   >
                                        {/* BUTTON */}
                                        <button className={`h-11 px-5 rounded-t-md flex items-center gap-2 text-sm transition-all duration-300 cursor-pointer ${isMoreButtonLight ? "text-white" : "text-neutral-900"} group-hover:bg-white group-hover:text-black`}>
                                             {moreTitle}
                                             <FiChevronDown className={`text-base transition-all duration-300 group-hover:rotate-180 ${isMoreButtonLight ? "text-white group-hover:text-black" : "text-neutral-900 group-hover:text-black"}`} />
                                        </button>
                                        {/* DROPDOWN */}
                                        <div className="absolute top-11 right-0 w-245 p-6 bg-white border border-zinc-100 opacity-0 invisible -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-99999 rounded-b-md">
                                             <div className="grid grid-cols-4 gap-6 text-left">
                                                  {moreItemsDropdownList && moreItemsDropdownList.length > 0 ? (
                                                       moreItemsDropdownList.map((cat, catIdx) => (
                                                            <div key={catIdx} className="flex flex-col">
                                                                 <h3 className="text-[14px] font-bold uppercase tracking-wider text-neutral-900 border-b border-zinc-100 pb-2 mb-3">
                                                                      {cat.title}
                                                                 </h3>
                                                                 <div className="flex flex-col gap-2">
                                                                      {cat.items && cat.items.map((subItem, subIdx) => (
                                                                           <a
                                                                                key={subIdx}
                                                                                href={subItem.link || "#"}
                                                                                className="text-[16px] text-zinc-600 hover:text-official transition-colors font-medium"
                                                                           >
                                                                                {subItem.name}
                                                                           </a>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                       ))
                                                  ) : (
                                                       <a
                                                            href="/courses"
                                                            className="col-span-4 flex items-center justify-center h-12 text-sm text-neutral-900 font-semibold hover:text-official/80 transition"
                                                       >
                                                            All Courses
                                                       </a>
                                                  )}
                                             </div>
                                        </div>
                                   </div>

                                   {/* DESKTOP BUTTON */}
                                   {user ? (
                                        <div className="relative">
                                             <button
                                                  onClick={(e) => {
                                                       e.stopPropagation();
                                                       setIsUserDropdownOpen(!isUserDropdownOpen);
                                                  }}
                                                  className="flex items-center gap-2 text-sm text-neutral-900 hover:text-official/80 transition cursor-pointer font-medium"
                                             >
                                                  <span>{user.name}</span>
                                                  <FiChevronDown className={`text-base transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                                             </button>
                                             {isUserDropdownOpen && (
                                                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-zinc-900 shadow-2xl p-2 border border-zinc-800 z-99999 flex flex-col">
                                                       <button
                                                            onClick={async () => {
                                                                 await logoutUser();
                                                                 setUser(null);
                                                                 setIsUserDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 rounded-md cursor-pointer transition font-medium"
                                                       >
                                                            Logout
                                                       </button>
                                                  </div>
                                             )}
                                        </div>
                                   ) : (
                                        <Button variant="primary" className="hidden md:inline-flex" onClick={() => setIsAuthModalOpen(true)}>
                                             {loginLabel}
                                        </Button>
                                   )}
                              </div>
                         </div>

                         {/* MOBILE SEARCH DROPDOWN */}
                         {isSearchOpen && (
                              <div ref={mobileSearchRef} className="md:hidden border-t border-official/10 bg-black/95 px-4 py-4 relative">
                                   <div className="relative">
                                        <form onSubmit={handleSearchSubmit} className="relative">
                                             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                             <input
                                                  type="text"
                                                  value={searchQuery}
                                                  onChange={(e) => setSearchQuery(e.target.value)}
                                                  placeholder={searchPlaceholderLabel}
                                                  autoFocus
                                                  className="w-full h-11 pl-11 pr-4 rounded-md bg-white outline-none text-sm text-black border border-transparent focus:border-official transition-all duration-300"
                                             />
                                        </form>
                                   </div>

                                   {/* Dropdown for mobile search results */}
                                   {searchQuery.trim().length >= 2 && (
                                        <>
                                             <style dangerouslySetInnerHTML={{
                                                  __html: `
                                                  .search-dropdown-scroll::-webkit-scrollbar {
                                                       display: none !important;
                                                  }
                                             `}} />
                                             <div
                                                  className="absolute top-full left-4 right-4 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-y-auto max-h-64 z-999999 search-dropdown-scroll"
                                                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                             >
                                                  {searchResults.length > 0 || suggestedResults.length > 0 ? (
                                                       <div className="flex flex-col">
                                                            {/* Direct Matches */}
                                                            {searchResults.length > 0 && (
                                                                 <div>
                                                                      <div className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/50 border-b border-zinc-900 text-left">
                                                                           Matching Courses
                                                                      </div>
                                                                      <div className="divide-y divide-zinc-900">
                                                                           {searchResults.map((course) => (
                                                                                <Link
                                                                                     key={course._id || course.slug}
                                                                                     href={`/${course.slug || course._id}`}
                                                                                     onClick={() => {
                                                                                          setSearchQuery("");
                                                                                          setIsSearchOpen(false);
                                                                                     }}
                                                                                     className="block px-4 py-3 hover:bg-zinc-900 transition-colors text-left group"
                                                                                >
                                                                                     <div className="flex items-center gap-3">
                                                                                          {course.image && (
                                                                                               <img
                                                                                                    src={course.image}
                                                                                                    alt="course-image"
                                                                                                    className="w-8 h-8 object-cover rounded-md bg-zinc-800 shrink-0"
                                                                                               />
                                                                                          )}
                                                                                          <div className="flex-1 min-w-0">
                                                                                               <div className="text-xs font-semibold text-zinc-100 truncate line-clamp-1 group-hover:text-official/80 transition-colors">
                                                                                                    {course.title}
                                                                                               </div>
                                                                                               <div className="text-[10px] text-zinc-400 truncate line-clamp-1 mt-0.5 font-medium">
                                                                                                    {course.category || "Design"} • {course.courselength || "12 Weeks"}
                                                                                               </div>
                                                                                          </div>
                                                                                     </div>
                                                                                </Link>
                                                                           ))}
                                                                      </div>
                                                                 </div>
                                                            )}

                                                            {/* Related Suggestions */}
                                                            {suggestedResults.length > 0 && (
                                                                 <div>
                                                                      <div className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/50 border-y border-zinc-900 text-left">
                                                                           Related Suggestions
                                                                      </div>
                                                                      <div className="divide-y divide-zinc-900">
                                                                           {suggestedResults.slice(0, 3).map((course) => (
                                                                                <Link
                                                                                     key={course._id || course.slug}
                                                                                     href={`/${course.slug || course._id}`}
                                                                                     onClick={() => {
                                                                                          setSearchQuery("");
                                                                                          setIsSearchOpen(false);
                                                                                     }}
                                                                                     className="block px-4 py-3 hover:bg-zinc-900 transition-colors text-left group"
                                                                                >
                                                                                     <div className="flex items-center gap-3">
                                                                                          {course.image && (
                                                                                               <img
                                                                                                    src={course.image}
                                                                                                    alt="course-image"
                                                                                                    className="w-8 h-8 object-cover rounded-md bg-zinc-800 shrink-0"
                                                                                               />
                                                                                          )}
                                                                                          <div className="flex-1 min-w-0">
                                                                                               <div className="text-xs font-semibold text-zinc-100 truncate line-clamp-1 group-hover:text-official/80 transition-colors">
                                                                                                    {course.title}
                                                                                               </div>
                                                                                               <div className="text-[10px] text-zinc-400 truncate line-clamp-1 mt-0.5 font-medium">
                                                                                                    {course.category || "Design"} • {course.courselength || "12 Weeks"}
                                                                                               </div>
                                                                                          </div>
                                                                                     </div>
                                                                                </Link>
                                                                           ))}
                                                                      </div>
                                                                 </div>
                                                            )}
                                                       </div>
                                                  ) : (
                                                       <div className="px-4 py-6 text-center text-zinc-500 text-xs font-medium">
                                                            No results found
                                                       </div>
                                                  )}
                                             </div>
                                        </>
                                   )}
                              </div>
                         )}

                         {/* MOBILE MENU */}
                         {isMenuOpen && (
                              <div className="md:hidden border-t border-official/10 bg-black/95 px-4 py-5 flex flex-col gap-4">
                                   {/* MOBILE BUTTONS */}
                                   <div className="flex flex-col gap-3">
                                        <Button variant="primary" className="w-full justify-center" onClick={() => {
                                             setIsCoursesModalOpen(true);
                                             setIsMenuOpen(false);
                                        }}>
                                             {dropdownLabel}
                                        </Button>

                                        {user ? (
                                             <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800">
                                                  <span className="text-sm text-neutral-400 font-semibold px-2">Logged in as {user.name}</span>
                                                  <button
                                                       onClick={async () => {
                                                            await logoutUser();
                                                            setUser(null);
                                                            setIsMenuOpen(false);
                                                       }}
                                                       className="w-full text-center py-2 text-sm text-red-400 hover:bg-zinc-800 rounded-md cursor-pointer transition font-semibold"
                                                  >
                                                       Logout
                                                  </button>
                                             </div>
                                        ) : (
                                             <Button variant="primary" className="w-full justify-center" onClick={() => {
                                                  setIsAuthModalOpen(true);
                                                  setIsMenuOpen(false);
                                             }}>
                                                  Login
                                             </Button>
                                        )}
                                   </div>

                                   {/* MORE OPTIONS */}
                                   {moreItemsDropdownList && moreItemsDropdownList.length > 0 && (
                                        <div className="flex flex-col gap-4 text-left">
                                             <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                                                  {moreTitle}
                                             </span>
                                             {moreItemsDropdownList.map((cat, catIdx) => (
                                                  <div key={catIdx} className="flex flex-col gap-2 pl-2">
                                                       <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                                                            {cat.title}
                                                       </span>
                                                       {cat.items && cat.items.map((subItem, subIdx) => (
                                                            <a
                                                                 key={subIdx}
                                                                 href={subItem.link || "#"}
                                                                 className="text-sm text-zinc-300 hover:text-official/80 transition pl-2"
                                                            >
                                                                 {subItem.name}
                                                            </a>
                                                       ))}
                                                  </div>
                                             ))}
                                        </div>
                                   )}
                              </div>
                         )}
                    </nav>
               </div>

               {/* ALL COURSES MODAL */}
               <div
                    onClick={() => setIsCoursesModalOpen(false)}
                    className={`w-full fixed left-0 right-0 bottom-0 top-0 md:top-12 z-9999 bg-black/20 backdrop-blur-lg flex items-center justify-center p-4 md:p-6 transition-all duration-400 hide-scrollbar ease-in-out ${isCoursesModalOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full pointer-events-none"
                         }`}
               >
                    {/* Modal Content container */}
                    <div
                         className="bg-[#FCFBF7] w-full h-full max-h-[88vh] md:max-h-[85vh] shadow-2xl relative flex flex-col overflow-hidden hide-scrollbar"
                         onClick={(e) => e.stopPropagation()}
                         onMouseEnter={clearCloseTimeout}
                         onMouseLeave={startCloseTimeout}
                    >
                         {/* Close Button */}
                         <button
                              onClick={() => setIsCoursesModalOpen(false)}
                              className="flex md:hidden absolute top-6 right-6 text-zinc-950 hover:text-official/80 transition cursor-pointer z-110 bg-white shadow-lg p-2.5 rounded-full items-center justify-center border border-zinc-200"
                              aria-label="Close courses modal"
                         >
                              <FiX className="text-xl" />
                         </button>

                         {/* Modal Body */}
                         <div className="w-full h-full overflow-y-auto">
                              {isCoursesModalOpen && <ProgramModalContent setIsModal={setIsCoursesModalOpen} />}
                         </div>
                    </div>
               </div>

               <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    onAuthSuccess={handleAuthSuccess}
               />
          </>
     );
};

export default Navbar;