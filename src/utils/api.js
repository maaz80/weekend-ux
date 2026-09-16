export const getApiUrl = (endpoint = "") => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.weekendux.in";
  if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1") || baseUrl.includes("onrender.com")) {
    baseUrl = "https://api.weekendux.in";
  }
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  if (cleanBase.endsWith("/api") && cleanEndpoint.startsWith("/api/")) {
    return `${cleanBase}${cleanEndpoint.substring(4)}`;
  }
  if (!cleanBase.endsWith("/api") && !cleanEndpoint.startsWith("/api/")) {
    return `${cleanBase}/api${cleanEndpoint}`;
  }
  return `${cleanBase}${cleanEndpoint}`;
};
