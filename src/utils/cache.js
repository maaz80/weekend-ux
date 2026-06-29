export const setCacheHeader = (req, response) => {
     try {
          const url = new URL(req.url);
          const isAdmin = url.searchParams.get("admin") === "true";
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
