import { getMe } from "@/controllers/authController";

export async function GET(request) {
     return getMe(request);
}
