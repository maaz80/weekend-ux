import { getNavbar, updateNavbar } from "@/controllers/navbarController";

export async function GET(request) {
     return getNavbar(request);
}

export async function PUT(request) {
     return updateNavbar(request);
}
