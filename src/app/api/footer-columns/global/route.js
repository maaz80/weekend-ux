import { getFooterGlobalSettings, updateFooterGlobalSettings } from "@/controllers/footerController";

export async function GET(request) {
     return getFooterGlobalSettings(request);
}

export async function PUT(request) {
     return updateFooterGlobalSettings(request);
}
