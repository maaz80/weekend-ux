"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import ProgramModalContent from "./Home/OurPrograms/ProgramModalContent";
import Link from "next/link";
import Button from "./ui/Button";
import Logo from "@/app/assets/weekend-ux-logo.webp";
import { useHomeData } from "@/context/HomeDataContext";

const Navbar = ({ initialMenuOpen = false, initialSearchOpen = false }) => {
     const { navbarData } = useHomeData();
     const [isMenuOpen, setIsMenuOpen] = useState(initialMenuOpen);
     const [isSearchOpen, setIsSearchOpen] = useState(initialSearchOpen);
     const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);

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
                                        <img
                                             src={navbarData.logo.image.trim()}
                                             alt={navbarData.logo.alt && navbarData.logo.alt.trim() ? navbarData.logo.alt.trim() : "Logo"}
                                             className="w-auto h-9 md:h-11 object-contain"
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
                                   <div className="relative">
                                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

                                        <input
                                             type="text"
                                             placeholder={searchPlaceholderLabel}
                                             className="w-70 h-11 pl-11 pr-4 rounded-xl bg-white outline-none text-sm text-black"
                                        />
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

                              {/* DESKTOP LINKS */}
                              {navbarData?.buttonText && navbarData.buttonText.trim() && (
                                   <a
                                        href="#"
                                        className="hidden md:flex items-center text-sm text-white hover:text-yellow-400 transition"
                                   >
                                        {navbarData.buttonText.trim()}
                                   </a>
                              )}

                              <div
                                   className="relative hidden md:block group"
                                   onMouseEnter={() => setIsMenuOpen(false)}
                              >
                                   {/* BUTTON */}
                                   <button className="h-11 px-5 rounded-t-xl flex items-center gap-2 text-sm text-white transition-all duration-300 cursor-pointer group-hover:bg-white group-hover:text-black">

                                        More

                                        <FiChevronDown className="text-base transition-all duration-300 group-hover:rotate-180" />
                                   </button>

                                   {/* DROPDOWN */}
                                   <div className="absolute top-11 right-0 min-w-40 overflow-hidden rounded-xl bg-zinc-900 shadow-[0_10px_40px_rgba(0,0,0,0.25)] opacity-0 invisible -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">

                                        <a
                                             href="#"
                                             className="flex items-center justify-end px-5 h-12 text-sm text-zinc-100 hover:bg-zinc-700 transition"
                                        >
                                             AI Tools & Models
                                        </a>

                                        <a
                                             href="#"
                                             className="flex items-center justify-end px-5 h-12 text-sm text-zinc-100 hover:bg-zinc-700 transition"
                                        >
                                             Learning Paths
                                        </a>

                                        <a
                                             href="#"
                                             className="flex items-center justify-end px-5 h-12 text-sm text-zinc-100 hover:bg-zinc-700 transition"
                                        >
                                             Community Forum
                                        </a>
                                   </div>
                              </div>

                              {/* DESKTOP BUTTON */}
                              <Button variant="primary" className="hidden md:inline-flex">
                                   {loginLabel}
                              </Button>
                         </div>
                    </div>

                    {/* MOBILE SEARCH DROPDOWN */}
                    {isSearchOpen && (
                         <div className="md:hidden border-t border-yellow-500/10 bg-black/95 px-4 py-4">

                              <div className="relative">
                                   <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                   <input
                                        type="text"
                                        placeholder={searchPlaceholderLabel}
                                        autoFocus
                                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-white outline-none text-sm text-black"
                                   />
                              </div>
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

                                   {/* <Button variant="primary" className="w-full justify-center">
                                   Login
                              </Button> */}
                              </div>

                              {/* MENU LINKS */}
                              {navbarData?.buttonText && navbarData.buttonText.trim() && (
                                   <a
                                        href="#"
                                        className="text-sm text-white hover:text-yellow-400 transition py-2 border-b border-zinc-800"
                                   >
                                        {navbarData.buttonText.trim()}
                                   </a>
                              )}

                              {/* MORE OPTIONS */}
                              <div className="flex flex-col gap-2">

                                   <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                                        More Options
                                   </span>

                                   <a
                                        href="#"
                                        className="text-sm text-zinc-300 hover:text-yellow-400 transition pl-2"
                                   >
                                        AI Tools & Models
                                   </a>

                                   <a
                                        href="#"
                                        className="text-sm text-zinc-300 hover:text-yellow-400 transition pl-2"
                                   >
                                        Learning Paths
                                   </a>

                                   <a
                                        href="#"
                                        className="text-sm text-zinc-300 hover:text-yellow-400 transition pl-2"
                                   >
                                        Community Forum
                                   </a>
                              </div>
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
          </>
     );
};

export default Navbar;