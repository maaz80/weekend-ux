"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiLogOut, FiHome, FiBookOpen } from "react-icons/fi";
import { User, ShieldCheck } from "lucide-react";
import Logo from "@/app/assets/weekend-ux-logo.webp";
import { useHomeData } from "@/context/HomeDataContext";
import { useUserAuth } from "@/context/UserAuthContext";
import { logoutUser } from "@/utils/auth.js";
import OptimizedImage from "@/components/ui/OptimizedImage";

export default function StudentNavbar() {
     const router = useRouter();
     const { navbarData } = useHomeData();
     const { user, refreshUser } = useUserAuth();
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const hasLogoImage = navbarData?.logo?.image && navbarData.logo.image.trim();

     useEffect(() => {
          if (!isDropdownOpen) return;
          const close = () => setIsDropdownOpen(false);
          document.addEventListener("click", close);
          return () => document.removeEventListener("click", close);
     }, [isDropdownOpen]);

     const handleLogout = async () => {
          await logoutUser();
          await refreshUser();
          setIsDropdownOpen(false);
          router.push("/");
     };

     return (
          <header className="sticky top-0 z-999 bg-zinc-950 border-b border-zinc-800/80 shadow-md font-urbanist text-white">
               <div className="custom-width px-4 sm:px-6 lg:px-10 h-16 md:h-18 flex items-center justify-between">
                    {/* LEFT SIDE - LOGO */}
                    <Link href="/" className="flex items-center gap-3 group">
                         {hasLogoImage ? (
                              <OptimizedImage
                                   src={navbarData.logo.image.trim()}
                                   alt={navbarData.logo.alt || "Weekend UX Logo"}
                                   className="w-auto h-9 md:h-11 object-contain"
                                   objectFit="contain"
                                   sizes="200px"
                                   width={180}
                                   height={44}
                                   priority={true}
                              />
                         ) : (
                              <Image
                                   src={Logo}
                                   alt="weekend-ux-logo"
                                   width={48}
                                   height={40}
                                   className="w-auto h-9 md:h-10 transition-transform group-hover:scale-105"
                                   priority
                              />
                         )}
                         <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md tracking-wider uppercase">
                              Student Hub
                         </span>
                    </Link>

                    {/* RIGHT SIDE - LOGGED IN PROFILE NAME */}
                    <div className="relative">
                         {user ? (
                              <div>
                                   <button
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             setIsDropdownOpen(!isDropdownOpen);
                                        }}
                                        className="flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
                                   >
                                        <div className="w-7 h-7 rounded-lg bg-official/20 text-official flex items-center justify-center font-bold text-xs">
                                             {user.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                                        </div>
                                        <span className="text-zinc-100 max-w-[140px] truncate">{user.name}</span>
                                        <FiChevronDown className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                                   </button>

                                   {/* Profile Dropdown */}
                                   {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-60 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-9999 font-urbanist animate-fadeIn">
                                             <div className="px-3.5 py-2.5 border-b border-zinc-800/80 mb-1">
                                                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                                                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{user.email || user.mobileNumber || "Student Account"}</p>
                                             </div>

                                             <Link
                                                  href="/"
                                                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition"
                                             >
                                                  <FiHome size={14} /> Main Homepage
                                             </Link>
                                             <Link
                                                  href="/courses"
                                                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition"
                                             >
                                                  <FiBookOpen size={14} /> Browse Catalog
                                             </Link>

                                             <button
                                                  onClick={handleLogout}
                                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer transition mt-1"
                                             >
                                                  <FiLogOut size={14} /> Logout
                                             </button>
                                        </div>
                                   )}
                              </div>
                         ) : (
                              <Link
                                   href="/courses"
                                   className="px-4 py-2 bg-official text-neutral font-bold rounded-xl text-xs hover:opacity-90 transition"
                              >
                                   Log In
                              </Link>
                         )}
                    </div>
               </div>
          </header>
     );
}
