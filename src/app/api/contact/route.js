import { getContact, updateContact } from "@/controllers/contactController";

export async function GET(request) {
     return getContact(request);
}

export async function PUT(request) {
     return updateContact(request);
}
