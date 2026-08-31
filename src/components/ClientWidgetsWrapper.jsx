"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import QuickAccessBar from "@/components/QuickAccessBar";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/WhatsAppButton";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });

export default function ClientWidgetsWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/jobs");

  return (
    <>
      <Analytics />
      <Chatbot />
      <LeadModal />
      {!isDashboard && <WhatsAppButton />}
      {!isDashboard && <QuickAccessBar />}
      <CookieBanner />
    </>
  );
}
