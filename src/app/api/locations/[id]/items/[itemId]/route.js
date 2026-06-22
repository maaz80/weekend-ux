import { getItem, updateItem, deleteItem } from "@/controllers/locationController";

export async function GET(request, { params }) {
     const { id, itemId } = await params;
     return getItem(request, { params: Promise.resolve({ locationId: id, itemId }) });
}

export async function PUT(request, { params }) {
     const { id, itemId } = await params;
     return updateItem(request, { params: Promise.resolve({ locationId: id, itemId }) });
}

export async function DELETE(request, { params }) {
     const { id, itemId } = await params;
     return deleteItem(request, { params: Promise.resolve({ locationId: id, itemId }) });
}
