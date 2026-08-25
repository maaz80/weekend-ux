'use client';

import React from "react";
import whatsappIconAsset from "../../public/images/whatsapp-icon.webp";

export default function WhatsAppButton({ 
  phoneNumber = "919311500424", 
  defaultMessage = "Hi, I came from the website and want to enquire about Weekend UX courses.",
  whatsappIcon = whatsappIconAsset
}) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      aria-label="Whatsapp Icon"
      rel="noopener noreferrer"
      className="whatsapp_cont hover:scale-110 overflow-hidden transition-all cursor-pointer bg-white rounded-full flex items-center justify-center shadow-lg"
      style={{ position: 'fixed', bottom: '5.25rem', right: '2rem', zIndex: 9990, width: '4rem', height: '4rem' }}
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
  );
}
