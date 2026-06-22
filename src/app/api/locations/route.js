import { getLocations, createLocation } from "@/controllers/locationController";

export async function GET(request) {
     return getLocations(request);
}

export async function POST(request) {
     return createLocation(request);
}
