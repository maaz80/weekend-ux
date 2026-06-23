"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import ProgramModalContent from "./Home/OurPrograms/ProgramModalContent";
import Link from "next/link";
import Button from "./ui/Button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Logo from "@/app/assets/weekend-ux-logo.webp";
import { useHomeData } from "@/context/HomeDataContext";
import AuthModal from "./AuthModal";
import { getCurrentUser, logoutUser, getUserToken } from "@/utils/auth.js";

const Navbar = ({ initialMenuOpen = false, initialSearchOpen = false }) => {
     const { navbarData, coursesData } = useHomeData();
     const [isMenuOpen, setIsMenuOpen] = useState(initialMenuOpen);
     const [isSearchOpen, setIsSearchOpen] = useState(initialSearchOpen);
     const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
     const [user, setUser] = useState(null);
     const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
     const [searchQuery, setSearchQuery] = useState("");
     const [searchResults, setSearchResults] = useState([]);
     const desktopSearchRef = useRef(null);
     const mobileSearchRef = useRef(null);

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

     useEffect(() => {
          const query = searchQuery.trim().toLowerCase();
          if (query.length >= 2 && coursesData?.course) {
               const filtered = coursesData.course.filter(course => 
                    course.title?.toLowerCase().includes(query) ||
                    course.overview?.toLowerCase().includes(query) ||
                    course.category?.toLowerCase().includes(query)
               );
               setSearchResults(filtered);
          } else {
               setSearchResults([]);
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

     const moreTitle = navbarData?.moreItems?.title || (Array.isArray(navbarData?.moreItems) ? "More" : "More");
     const moreItemsList = navbarData?.moreItems?.items || (Array.isArray(navbarData?.moreItems) ? navbarData.moreItems : []);

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
               <nav className="w-full border-b border-yellow-500/10 bg-black/4 backdrop-blur-2xl font-urbanist sticky top-0 z-99999">

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
                                   className="md:hidden text-white hover:text-yellow-400 text-2xl transition cursor-pointer flex items-center"
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
                                             alt="Logo"
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
                                   <Button variant="primary" onClick={() => setIsCoursesModalOpen(true)}>
                                        {dropdownLabel}
                                   </Button>

                                   {/* SEARCH */}
                                   <div ref={desktopSearchRef} className="relative">
                                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

                                        <input
                                             type="text"
                                             value={searchQuery}
                                             onChange={(e) => setSearchQuery(e.target.value)}
                                             placeholder={searchPlaceholderLabel}
                                             className="w-70 h-11 pl-11 pr-4 rounded-xl bg-white outline-none text-sm text-black"
                                        />

                                        {/* Dropdown for search results */}
                                        {searchQuery.trim().length >= 2 && (
                                             <>
                                                  <style dangerouslySetInnerHTML={{__html: `
                                                       .search-dropdown-scroll::-webkit-scrollbar {
                                                            display: none !important;
                                                       }
                                                  `}} />
                                                  <div 
                                                       className="absolute top-full mt-2 left-0 w-70 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-y-auto max-h-64 z-[999999] divide-y divide-zinc-900 search-dropdown-scroll"
                                                       style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                                  >
                                                       {searchResults.length > 0 ? (
                                                            searchResults.map((course) => (
                                                                 <Link 
                                                                      key={course._id || course.slug}
                                                                      href={`/${course.slug || course._id}`}
                                                                      onClick={() => setSearchQuery("")}
                                                                      className="block px-4 py-3 hover:bg-zinc-800/80 transition-colors text-left group"
                                                                 >
                                                                      <div className="flex items-center gap-3">
                                                                           {course.image && (
                                                                                <img 
                                                                                     src={course.image} 
                                                                                     alt={course.title} 
                                                                                     className="w-10 h-10 object-cover rounded-lg bg-zinc-850 border border-zinc-700/50 shrink-0" 
                                                                                />
                                                                           )}
                                                                           <div className="flex-1 min-w-0">
                                                                                <div className="text-sm font-semibold text-zinc-100 truncate line-clamp-1 group-hover:text-yellow-400 transition-colors">
                                                                                     {course.title}
                                                                                </div>
                                                                                <div className="text-xs text-zinc-400 truncate line-clamp-1 mt-0.5 font-medium">
                                                                                     {course.category || "Design"} • {course.courselength || course.duration || "12 Weeks"}
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 </Link>
                                                            ))
                                                       ) : (
                                                            <div className="px-4 py-6 text-center text-zinc-400 text-sm font-medium">
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
                                   className="md:hidden text-white hover:text-yellow-400 text-xl transition cursor-pointer flex items-center"
                              >
                                   {isSearchOpen ? <FiX className="text-lg" /> : <FiSearch />}
                              </button>

                              <div
                                   className="relative hidden md:block group"
                                   onMouseEnter={() => setIsMenuOpen(false)}
                              >
                                   {/* BUTTON */}
                                   <button className="h-11 px-5 rounded-t-xl flex items-center gap-2 text-sm text-white transition-all duration-300 cursor-pointer group-hover:bg-white group-hover:text-black">

                                        {moreTitle}

                                        <FiChevronDown className="text-base transition-all duration-300 group-hover:rotate-180" />
                                   </button>

                                   {/* DROPDOWN */}
                                   <div className="absolute top-11 right-0 min-w-max overflow-hidden rounded-xl bg-zinc-900 shadow-[0_10px_40px_rgba(0,0,0,0.25)] opacity-0 invisible -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                                        {moreItemsList && moreItemsList.length > 0 ? (
                                             moreItemsList.map((item, idx) => (
                                                  <a
                                                       key={idx}
                                                       href={item.link || "#"}
                                                       className="flex items-center justify-end px-5 h-12 text-sm text-zinc-100 hover:bg-zinc-700 transition whitespace-nowrap"
                                                  >
                                                       {item.title}
                                                  </a>
                                             ))
                                        ) : (
                                             <a
                                                  href="/courses"
                                                  className="flex items-center justify-end px-5 h-12 text-sm text-zinc-100 hover:bg-zinc-700 transition whitespace-nowrap"
                                             >
                                                  All Courses
                                             </a>
                                        )}
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
                                             className="flex items-center gap-2 text-sm text-white hover:text-yellow-400 transition cursor-pointer font-medium"
                                        >
                                             <span>{user.name}</span>
                                             <FiChevronDown className={`text-base transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>
                                        {isUserDropdownOpen && (
                                             <div className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900 shadow-2xl p-2 border border-zinc-800 z-[99999] flex flex-col">
                                                  <button 
                                                       onClick={async () => {
                                                            await logoutUser();
                                                            setUser(null);
                                                            setIsUserDropdownOpen(false);
                                                       }}
                                                       className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 rounded-lg cursor-pointer transition font-medium"
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
                         <div ref={mobileSearchRef} className="md:hidden border-t border-yellow-500/10 bg-black/95 px-4 py-4 relative">

                              <div className="relative">
                                   <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                   <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={searchPlaceholderLabel}
                                        autoFocus
                                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-white outline-none text-sm text-black"
                                   />
                              </div>

                              {/* Dropdown for mobile search results */}
                              {searchQuery.trim().length >= 2 && (
                                   <>
                                        <style dangerouslySetInnerHTML={{__html: `
                                             .search-dropdown-scroll::-webkit-scrollbar {
                                                  display: none !important;
                                             }
                                        `}} />
                                        <div 
                                             className="absolute top-full left-4 right-4 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-y-auto max-h-64 z-[999999] divide-y divide-zinc-900 search-dropdown-scroll"
                                             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                        >
                                             {searchResults.length > 0 ? (
                                                  searchResults.map((course) => (
                                                       <Link 
                                                            key={course._id || course.slug}
                                                            href={`/${course.slug || course._id}`}
                                                            onClick={() => {
                                                                 setSearchQuery("");
                                                                 setIsSearchOpen(false);
                                                            }}
                                                            className="block px-4 py-3 hover:bg-zinc-800/80 transition-colors text-left group"
                                                       >
                                                            <div className="flex items-center gap-3">
                                                                 {course.image && (
                                                                      <img 
                                                                           src={course.image} 
                                                                           alt={course.title} 
                                                                           className="w-10 h-10 object-cover rounded-lg bg-zinc-850 border border-zinc-700/50 shrink-0" 
                                                                      />
                                                                 )}
                                                                 <div className="flex-1 min-w-0">
                                                                      <div className="text-sm font-semibold text-zinc-100 truncate line-clamp-1 group-hover:text-yellow-400 transition-colors">
                                                                           {course.title}
                                                                      </div>
                                                                      <div className="text-xs text-zinc-400 truncate line-clamp-1 mt-0.5 font-medium">
                                                                           {course.category || "Design"} • {course.courselength || course.duration || "12 Weeks"}
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </Link>
                                                  ))
                                             ) : (
                                                  <div className="px-4 py-6 text-center text-zinc-400 text-sm font-medium">
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
                         <div className="md:hidden border-t border-yellow-500/10 bg-black/95 px-4 py-5 flex flex-col gap-4">

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
                                             <span className="text-sm text-zinc-400 font-semibold px-2">Logged in as {user.name}</span>
                                             <button 
                                                  onClick={async () => {
                                                       await logoutUser();
                                                       setUser(null);
                                                       setIsMenuOpen(false);
                                                  }}
                                                  className="w-full text-center py-2 text-sm text-red-400 hover:bg-zinc-800 rounded-lg cursor-pointer transition font-semibold"
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
                              {moreItemsList && moreItemsList.length > 0 && (
                                   <div className="flex flex-col gap-2">
                                        <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                                             {moreTitle}
                                        </span>
                                        {moreItemsList.map((item, idx) => (
                                             <a
                                                  key={idx}
                                                  href={item.link || "#"}
                                                  className="text-sm text-zinc-300 hover:text-yellow-400 transition pl-2"
                                             >
                                                  {item.title}
                                             </a>
                                        ))}
                                   </div>
                              )}
                         </div>
                    )}
               </nav>

               {/* ALL COURSES MODAL */}
               <div
                    onClick={() => setIsCoursesModalOpen(false)}
                    className={`w-full fixed left-0 right-0 bottom-0 top-0 md:top-12 z-9999 bg-black/20 backdrop-blur-lg flex items-center justify-center p-4 md:p-6 transition-all duration-400 hide-scrollbar ease-in-out ${isCoursesModalOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full pointer-events-none"
                         }`}
               >
                    {/* Modal Content container */}
                    <div
                         className="bg-[#FCFBF7] w-[95%] h-full max-h-[88vh] md:max-h-[85vh] shadow-2xl relative flex flex-col overflow-hidden hide-scrollbar"
                         onClick={(e) => e.stopPropagation()}
                    >
                         {/* Close Button */}
                         <button
                              onClick={() => setIsCoursesModalOpen(false)}
                              className="hidden md:flex absolute top-6 right-6 text-zinc-950 hover:text-official transition cursor-pointer z-110 bg-white shadow-lg p-2.5 rounded-full  items-center justify-center border border-zinc-200"
                              aria-label="Close courses modal"
                         >
                              <FiX className="text-xl" />
                         </button>

                         {/* Modal Body */}
                         <div className="w-full h-full overflow-y-auto">
                              <ProgramModalContent setIsModal={setIsCoursesModalOpen} />
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