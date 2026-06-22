import { getLocationById, updateLocation, deleteLocation } from "@/controllers/locationController";

export async function GET(request, context) {
     return getLocationById(request, context);
}

export async function PUT(request, context) {
     return updateLocation(request, context);
}

export async function DELETE(request, context) {
     return deleteLocation(request, context);
}
