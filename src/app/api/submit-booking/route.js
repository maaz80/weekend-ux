import { verifyOTPAndSubmit } from "@/controllers/otpController";

export async function POST(request) {
     return verifyOTPAndSubmit(request);
}
