import { getLocation, updateLocation } from "@/controllers/locationController";

export async function GET(request) {
     return getLocation(request);
}

export async function PUT(request) {
     return updateLocation(request);
}
