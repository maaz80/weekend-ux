import { sendAuthOTP } from "@/controllers/authController";

export async function POST(request) {
     return sendAuthOTP(request);
}
