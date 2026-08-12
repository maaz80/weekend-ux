"use client";

import dynamic from "next/dynamic";
import QuickAccessBar from "@/components/QuickAccessBar";
import CookieBanner from "@/components/CookieBanner";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });

export default function ClientWidgetsWrapper() {
  return (
    <>
      <Chatbot />
      <LeadModal />
      <QuickAccessBar />
      <CookieBanner />
    </>
  );
}
