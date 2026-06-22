import { loginAdmin } from "@/controllers/adminController";

export async function POST(request) {
     return loginAdmin(request);
}
