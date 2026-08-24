"use client";

import dynamic from "next/dynamic";
import QuickAccessBar from "@/components/QuickAccessBar";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import WhatsAppButton from "@/components/WhatsAppButton";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });

export default function ClientWidgetsWrapper() {
  return (
    <>
      <Analytics />
      <Chatbot />
      <LeadModal />
      <WhatsAppButton />
      <QuickAccessBar />
      <CookieBanner />
    </>
  );
}
