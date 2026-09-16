"use client";

if (typeof window !== "undefined" && !window.__fetchIntercepted) {
  window.__fetchIntercepted = true;
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    if (typeof input === "string" && input.startsWith("/api/")) {
      let baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.weekendux.in";
      
      if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1") || baseUrl.includes("onrender.com")) {
        baseUrl = "https://api.weekendux.in";
      }

      input = `${baseUrl.replace(/\/$/, "")}${input}`;
    }
    return originalFetch(input, init);
  };
}

export default function ClientFetchConfig() {
  return null;
}
