"use client";

if (typeof window !== "undefined" && !window.__fetchIntercepted) {
  window.__fetchIntercepted = true;
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    if (typeof input === "string" && input.startsWith("/api/")) {
      let baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://weekend-backend.onrender.com";
      
      // Safety guard: On live website, if baseUrl points to localhost, auto-fallback to production backend URL
      if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")) {
          baseUrl = "https://weekend-backend.onrender.com";
        }
      }

      input = `${baseUrl.replace(/\/$/, "")}${input}`;
    }
    return originalFetch(input, init);
  };
}

export default function ClientFetchConfig() {
  return null;
}
