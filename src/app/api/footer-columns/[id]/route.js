import { updateFooterColumn, deleteFooterColumn } from "@/controllers/footerController";

export async function PUT(request, context) {
     return updateFooterColumn(request, context);
}

export async function DELETE(request, context) {
     return deleteFooterColumn(request, context);
}
