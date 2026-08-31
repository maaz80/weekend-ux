'use client';

import React from "react";
import { BsChevronUp } from "react-icons/bs";
import whatsappIconAsset from "../../public/images/whatsapp-icon.webp";

export default function WhatsAppButton({ 
  phoneNumber = "919311500424", 
  defaultMessage = "Hi, I came from the website and want to enquire about Weekend UX courses.",
  whatsappIcon = whatsappIconAsset
}) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        aria-label="Whatsapp Icon"
        rel="noopener noreferrer"
        className="whatsapp_cont hover:scale-110 overflow-hidden transition-all cursor-pointer bg-white rounded-full flex items-center justify-center shadow-lg text-neutral"
        style={{ position: 'fixed', bottom: '8.5rem', right: '1.75rem', zIndex: 99999999, width: '3.75rem', height: '3.75rem' }}
      >
        <img
          src={whatsappIcon?.src || whatsappIcon || "/images/whatsapp-icon.webp"}
          alt="Whatsapp Icon"
          width="80"
          height="80"
          loading="lazy"
          style={{ aspectRatio: "1/1", width: '100%', height: '100%' }}
          className="whatsapp object-cover"
        />
      </a>

      {/* Scroll To Top Button */}
      <a
        href="#"
        aria-label="Scroll to top"
        className="text-lg p-3 rounded-full bg-white text-neutral hover:scale-110 flex items-center justify-center font-black cursor-pointer transition-all border border-zinc-200/90 active:scale-95"
        style={{ 
          position: 'fixed', 
          bottom: '4.5rem', 
          right: '2rem', 
          zIndex: 99999999, 
          width: '3.25rem', 
          height: '3.25rem', 
          boxShadow: '0px 4px 16px rgba(0,0,0,0.18)' 
        }}
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
      >
        <BsChevronUp className="text-xl text-neutral font-extrabold" />
      </a>
    </>
  );
}
