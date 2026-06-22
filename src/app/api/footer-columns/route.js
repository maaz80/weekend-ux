import { getFooterColumns, createFooterColumn } from "@/controllers/footerController";

export async function GET(request) {
     return getFooterColumns(request);
}

export async function POST(request) {
     return createFooterColumn(request);
}
