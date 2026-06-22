import { getFaq, updateFaq } from "@/controllers/faqController";

export async function GET(request, context) {
     return getFaq(request, context);
}

export async function PUT(request, context) {
     return updateFaq(request, context);
}
