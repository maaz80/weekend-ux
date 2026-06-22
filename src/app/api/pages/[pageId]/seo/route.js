import { getPageSEO, updatePageSEO } from "@/controllers/pageSEOController";

export async function GET(request, context) {
     return getPageSEO(request, context);
}

export async function PUT(request, context) {
     return updatePageSEO(request, context);
}
