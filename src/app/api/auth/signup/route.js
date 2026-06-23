import { signup } from "@/controllers/authController";

export async function POST(request) {
     return signup(request);
}
