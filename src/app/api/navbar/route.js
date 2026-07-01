import { getNavbar, updateNavbar } from "@/controllers/navbarController";

export const dynamic = "force-dynamic";

export async function GET(request) {
     return getNavbar(request);
}

export async function PUT(request) {
     return updateNavbar(request);
}
