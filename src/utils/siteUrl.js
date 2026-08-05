export const SITE_URL = "https://weekendux.in";

export function getSiteUrl() {
     const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
     return (fromEnv || SITE_URL).replace(/\/$/, "");
}

export function buildCanonicalUrl(pathname = "/", baseUrlOverride) {
     const base = (baseUrlOverride || getSiteUrl()).replace(/\/$/, "");
     if (!pathname || pathname === "/") return `${base}`;
     const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
     const hasFileExtension = /\.[a-z0-9]+$/i.test(path);
     if (hasFileExtension) return `${base}${path}`;
     return `${base}${path.replace(/\/+$/, "")}`;
}
