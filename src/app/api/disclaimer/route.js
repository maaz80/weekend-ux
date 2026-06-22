import { getDisclaimer, updateDisclaimer } from "@/controllers/disclaimerController";

export async function GET(request) {
     return getDisclaimer(request);
}

export async function PUT(request) {
     return updateDisclaimer(request);
}
