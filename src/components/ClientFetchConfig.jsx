"use client";

if (typeof window !== "undefined" && !window.__fetchIntercepted) {
  window.__fetchIntercepted = true;
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    if (typeof input === "string" && input.startsWith("/api/")) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://weekend-backend.onrender.com";
      input = `${baseUrl.replace(/\/$/, "")}${input}`;
    }
    return originalFetch(input, init);
  };
}

export default function ClientFetchConfig() {
  return null;
}
