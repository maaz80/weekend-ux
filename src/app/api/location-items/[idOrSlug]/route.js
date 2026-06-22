import { getLocationItemBySlug } from "@/controllers/locationController";

export async function GET(request, context) {
     return getLocationItemBySlug(request, context);
}
