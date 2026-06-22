import { getAbout, updateAbout } from "@/controllers/aboutController";

export async function GET(request) {
     return getAbout(request);
}

export async function PUT(request) {
     return updateAbout(request);
}
