import { getHome, updateHome } from "@/controllers/homeController";

export async function GET(request) {
     return getHome(request);
}

export async function PUT(request) {
     return updateHome(request);
}
