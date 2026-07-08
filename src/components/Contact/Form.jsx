"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

const Form = ({
     inputBgColor = "bg-transparent",
     inputBorderColor = "border-[#E5E0D6]",
     inputFocusColor = "focus:border-official",
     buttonSize = "w-full h-12 rounded-md font-bold text-sm"
}) => {
     const [status, setStatus] = useState("idle");
     const [otpStep, setOtpStep] = useState(false);
     const [formData, setFormData] = useState({
          fullName: "",
          phone: "",
          email: "",
          message: "",
          otp: ""
     });
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const [resendTimer, setResendTimer] = useState(0);
     const [successMessage, setSuccessMessage] = useState("");
     const timerRef = useRef(null);

     useEffect(() => {
          if (!successMessage) return undefined;
          const timer = setTimeout(() => setSuccessMessage(""), 5000);
          return () => clearTimeout(timer);
     }, [successMessage]);

     useEffect(() => {
          return () => {
               if (timerRef.current) clearInterval(timerRef.current);
          };
     }, []);

     const handleChange = (e) => {
          const { name, value } = e.target;

          if (name === "phone") {
               const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);
               setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
          } else if (name === "otp") {
               const otpDigits = value.replace(/\D/g, "").slice(0, 6);
               setFormData((prev) => ({ ...prev, otp: otpDigits }));
          } else {
               setFormData((prev) => ({ ...prev, [name]: value }));
          }

          if (errors[name]) {
               setErrors((prev) => ({ ...prev, [name]: "" }));
          }
     };

     const validateForm = () => {
          const newErrors = {};
          if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
          if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be exactly 10 digits";
          if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email address";
          return newErrors;
     };

     const startResendTimer = () => {
          setResendTimer(60);
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = setInterval(() => {
               setResendTimer((prev) => {
                    if (prev <= 1) {
                         if (timerRef.current) clearInterval(timerRef.current);
                         return 0;
                    }
                    return prev - 1;
               });
          }, 1000);
     };

     const handleSendOTP = async (e) => {
          e.preventDefault();
          const validationErrors = validateForm();
          if (Object.keys(validationErrors).length > 0) {
               setErrors(validationErrors);
               return;
          }

          setLoading(true);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          try {
               const response = await fetch("/api/send-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         phone: formData.phone,
                         email: formData.email
                    }),
                    signal: controller.signal
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setOtpStep(true);
                    setErrors({});
                    startResendTimer();
               } else {
                    setErrors({ phone: result.error || "Failed to send OTP" });
               }
          } catch (error) {
               clearTimeout(timeoutId);
               setErrors({ phone: error.name === "AbortError" ? "Request timeout" : "Failed to send OTP" });
          }

          setLoading(false);
     };

     const handleResendOTP = async () => {
          if (resendTimer > 0) return;
          setLoading(true);

          try {
               const response = await fetch("/api/send-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         phone: formData.phone,
                         email: formData.email
                    })
               });

               const result = await response.json();
               if (response.ok) {
                    setErrors({});
                    startResendTimer();
               } else {
                    setErrors({ otp: result.error || "Failed to resend OTP" });
               }
          } catch (error) {
               console.error(error);
               setErrors({ otp: "Failed to resend OTP" });
          }

          setLoading(false);
     };

     const handleSubmitWithOTP = async (e) => {
          e.preventDefault();

          if (!formData.otp || formData.otp.length !== 6) {
               setErrors({ otp: "Please enter 6-digit OTP" });
               return;
          }

          setStatus("loading");
          setLoading(true);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);

          try {
               const response = await fetch("/api/submit-booking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         fullName: formData.fullName,
                         phone: formData.phone,
                         email: formData.email,
                         message: formData.message,
                         otp: formData.otp
                    }),
                    signal: controller.signal
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setStatus("success");
                    setSuccessMessage("Enquiry submitted successfully! We'll contact you soon.");
                    setFormData({ fullName: "", phone: "", email: "", message: "", otp: "" });
                    setOtpStep(false);
                    setErrors({});
                    if (timerRef.current) clearInterval(timerRef.current);
                    setTimeout(() => setStatus("idle"), 3000);
               } else {
                    setStatus("error");
                    setErrors({ otp: result.error || "Invalid OTP" });
               }
          } catch (error) {
               clearTimeout(timeoutId);
               if (error.name === "AbortError") {
                    setStatus("timeout");
                    setErrors({ otp: "Request timeout. Please try again." });
               } else {
                    setStatus("error");
                    setErrors({ otp: "Failed to submit. Please try again." });
               }
          }

          setLoading(false);
     };

     return (
          <>
               {successMessage && (
                    <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm" role="alert">
                         <span className="block sm:inline">{successMessage}</span>
                    </div>
               )}

               <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} className="space-y-4 max-w-130 mx-auto text-neutral" noValidate>
                    {!otpStep ? (
                         <>
                              <div>
                                   <label className="block text-[14px] text-neutral-700 mb-2 font-medium">
                                        Full Name
                                   </label>
                                   <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className={`w-full h-10 border px-4 text-sm outline-none rounded-sm placeholder:text-neutral-400 transition-colors ${inputFocusColor} ${inputBgColor} ${errors.fullName ? "border-red-400" : inputBorderColor}`}
                                   />
                                   {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                              </div>

                              <div>
                                   <label className="block text-[14px] text-neutral-700 mb-2 font-medium">
                                        Email Id
                                   </label>
                                   <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className={`w-full h-10 border px-4 text-sm outline-none rounded-sm placeholder:text-neutral-400 transition-colors ${inputFocusColor} ${inputBgColor} ${errors.email ? "border-red-400" : inputBorderColor}`}
                                   />
                                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                              </div>

                              <div>
                                   <label className="block text-[14px] text-neutral-700 mb-2 font-medium">
                                        Phone Number
                                   </label>
                                   <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        className={`w-full h-10 border px-4 text-sm outline-none rounded-sm placeholder:text-neutral-400 transition-colors ${inputFocusColor} ${inputBgColor} ${errors.phone ? "border-red-400" : inputBorderColor}`}
                                   />
                                   {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                              </div>

                              <div>
                                   <label className="block text-[14px] text-neutral-700 mb-2 font-medium">
                                        Description (optional)
                                   </label>
                                   <textarea
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        className={`w-full border p-4 text-sm outline-none resize-none rounded-sm placeholder:text-neutral-400 ${inputBorderColor} ${inputFocusColor} ${inputBgColor}`}
                                   />
                              </div>

                              <Button
                                   type="submit"
                                   disabled={loading}
                                   variant="primary"
                                   size={buttonSize}
                                   className={`gap-2 ${loading ? "opacity-60 cursor-not-allowed bg-official/50 text-neutral-500" : ""}`}
                              >
                                   {loading ? (
                                        <>
                                             <div className="w-5 h-5 bg-official/20 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                             <span className="ml-2">Sending OTP...</span>
                                        </>
                                   ) : (
                                        <>
                                            Submit
                                             <span>↗</span>
                                        </>
                                   )}
                              </Button>
                         </>
                    ) : (
                         <>
                              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-neutral-800 text-sm">
                                   <p className="font-semibold text-neutral mb-1">
                                        ✓ OTP sent to <span className="text-official">{formData.email}</span>
                                   </p>
                                   <p className="text-xs text-neutral-600">Enter the 6-digit verification code sent to your email</p>
                              </div>

                              <div>
                                   <label className="block text-[14px] text-neutral-700 mb-2 font-medium">
                                        OTP Code <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        className={`w-full h-10 border px-4 text-sm outline-none rounded-sm placeholder:text-neutral-400 ${inputFocusColor} ${inputBgColor} ${errors.otp ? "border-red-400" : inputBorderColor}`}
                                   />
                                   {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                              </div>

                              <div className="flex justify-between items-center text-xs text-neutral-600">
                                   <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={resendTimer > 0 || loading}
                                        className={`${resendTimer > 0 || loading ? "text-neutral-400 cursor-not-allowed" : "text-official hover:underline cursor-pointer font-semibold"}`}
                                   >
                                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                                   </button>
                                   <button
                                        type="button"
                                        onClick={() => {
                                             setOtpStep(false);
                                             setFormData((prev) => ({ ...prev, otp: "" }));
                                             setErrors({});
                                             setStatus("idle");
                                             if (timerRef.current) clearInterval(timerRef.current);
                                        }}
                                        className="hover:text-official/80 cursor-pointer transition font-medium"
                                   >
                                        ← Edit Details
                                   </button>
                              </div>

                              <Button
                                   type="submit"
                                   disabled={loading || status === "loading"}
                                   variant="primary"
                                   size={buttonSize}
                                   className={`gap-2 ${loading || status === "loading" ? "opacity-60 cursor-not-allowed bg-official/50 text-neutral-500" : ""}`}
                              >
                                   {status === "loading" ? (
                                        <>
                                             <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                             <span className="ml-2">Verifying...</span>
                                        </>
                                   ) : status === "success" ? (
                                        <span>✓ Submitted</span>
                                   ) : (
                                        <>
                                             Verify & Submit
                                             <span>↗</span>
                                        </>
                                   )}
                              </Button>
                         </>
                    )}
               </form>
          </>
     );
};

export default Form;
