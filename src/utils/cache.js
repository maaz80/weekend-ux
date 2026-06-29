export const setCacheHeader = (req, response) => {
     try {
          const url = new URL(req.url);
          const origin = req.headers.get("origin") || "";
          const referer = req.headers.get("referer") || "";

          // Check if request is from the admin panel (by query string or referer/origin)
          const isAdmin =
               url.searchParams.get("admin") === "true" ||
               origin.includes("admin") ||
               referer.includes("admin") ||
               origin.includes("localhost:517") || // Vite dev server ports
               referer.includes("localhost:517") ||
               origin.includes("localhost:3001") || // custom admin port
               referer.includes("localhost:3001");

          if (isAdmin) {
               response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
               response.headers.set("Pragma", "no-cache");
               response.headers.set("Expires", "0");
          } else {
               response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
          }
     } catch (e) {
          response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
     }
     return response;
};
