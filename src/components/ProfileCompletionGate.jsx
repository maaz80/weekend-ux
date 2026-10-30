"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";

const PROFILE_PATH = "/complete-profile";

export default function ProfileCompletionGate({ children }) {
     const { user, loading } = useUserAuth();
     const pathname = usePathname();
     const router = useRouter();
     const [mounted, setMounted] = useState(false);
     const [openAuthAfterRedirect, setOpenAuthAfterRedirect] = useState(false);

     useEffect(() => {
          setMounted(true);
     }, []);

     useEffect(() => {
          if (!mounted || loading) return;

          if (!user) {
               if (pathname === PROFILE_PATH) {
                    if (openAuthAfterRedirect) return;
                    setOpenAuthAfterRedirect(true);
                    router.replace("/");
               } else if (openAuthAfterRedirect) {
                    setOpenAuthAfterRedirect(false);
                    window.dispatchEvent(new Event("openAuthModal"));
               }
               return;
          }

          if (openAuthAfterRedirect) setOpenAuthAfterRedirect(false);

          const isProfileIncomplete = user.profileCompleted === false;

          if (isProfileIncomplete && pathname !== PROFILE_PATH) {
               const returnTo = `${window.location.pathname}${window.location.search}`;
               if (!sessionStorage.getItem("profileReturnTo")) {
                    sessionStorage.setItem("profileReturnTo", returnTo);
               }
               router.replace(PROFILE_PATH);
               return;
          }

          if (!isProfileIncomplete && pathname === PROFILE_PATH) {
               const returnTo = sessionStorage.getItem("profileReturnTo") || "/";
               sessionStorage.removeItem("profileReturnTo");
               router.replace(returnTo.startsWith("/") && returnTo !== PROFILE_PATH ? returnTo : "/");
          }
     }, [mounted, loading, openAuthAfterRedirect, pathname, router, user]);

     if (!mounted) {
          return children;
     }

     if (user?.profileCompleted === false && pathname !== PROFILE_PATH) {
          return (
               <div className="flex min-h-screen items-center justify-center bg-[#fffaf0] px-6 text-center">
                    <p className="font-semibold text-neutral">Taking you to your required profile form…</p>
               </div>
          );
     }

     if (pathname === PROFILE_PATH && (!user || user.profileCompleted !== false)) {
          return (
               <div className="flex min-h-screen items-center justify-center bg-[#fffaf0]">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f36600]/20 border-t-[#f36600]" />
               </div>
          );
     }

     return children;
}
