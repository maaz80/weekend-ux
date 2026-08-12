"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const LeadModal = dynamic(() => import("@/components/LeadModal"), { ssr: false });
const QuickAccessBar = dynamic(() => import("@/components/QuickAccessBar"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

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
