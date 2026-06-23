import { logout } from "@/controllers/authController";

export async function POST(request) {
     return logout(request);
}
