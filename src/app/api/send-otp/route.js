import { sendOTP } from "@/controllers/otpController";

export async function POST(request) {
     return sendOTP(request);
}
