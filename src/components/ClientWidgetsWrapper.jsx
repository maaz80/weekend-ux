"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import QuickAccessBar from "@/components/QuickAccessBar";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import { prefetchBrochure } from "@/utils/brochureDownload";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });

export default function ClientWidgetsWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/jobs");
  const isCompleteProfile = pathname === "/complete-profile" || pathname?.startsWith("/complete-profile");

  useEffect(() => {
    prefetchBrochure();
  }, []);

  return (
    <>
      <Analytics />
      <Chatbot />
      <LeadModal />
      {!isDashboard && !isCompleteProfile && <WhatsAppButton />}
      {!isDashboard && !isCompleteProfile && <QuickAccessBar />}
      <CookieBanner />
    </>
  );
}
