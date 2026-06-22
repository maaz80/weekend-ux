import { getPolicy, updatePolicy } from "@/controllers/policyController";

export async function GET(request) {
     return getPolicy(request);
}

export async function PUT(request) {
     return updatePolicy(request);
}
