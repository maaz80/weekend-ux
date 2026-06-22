import { addItem } from "@/controllers/locationController";

export async function POST(request, { params }) {
     const { id } = await params;
     return addItem(request, { params: Promise.resolve({ locationId: id }) });
}
