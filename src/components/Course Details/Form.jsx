import { useEffect, useRef, useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

const Form = () => {
     const [status, setStatus] = useState("idle");
     const [otpStep, setOtpStep] = useState(false);
     const [formData, setFormData] = useState({
          fullName: "",
          phone: "",
          email: "",
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
                         otp: formData.otp,
                         message: "Course Advisor Call Booking"
                    }),
                    signal: controller.signal
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setStatus("success");
                    setSuccessMessage("Admissions booking submitted successfully!");
                    setFormData({ fullName: "", phone: "", email: "", otp: "" });
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
                    <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg mb-4 text-xs font-semibold text-center" role="alert">
                         {successMessage}
                    </div>
               )}

               <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} className="space-y-4 text-neutral-900">
                    {!otpStep ? (
                         <>
                              <div>
                                   <label className="block text-sm text-neutral-900 mb-2">
                                        Full Name
                                   </label>

                                   <div className="relative">
                                        <FiUser className="absolute left-3 top-3 text-neutral-900 text-[16px]" />

                                        <input
                                             type="text"
                                             name="fullName"
                                             value={formData.fullName}
                                             onChange={handleChange}
                                             placeholder="John Doe"
                                             className={`w-full h-10 border rounded-lg pl-10 pr-4 outline-none focus:border-official text-neutral-900 placeholder:text-neutral-500 text-[14px] transition-colors ${errors.fullName ? "border-red-400 focus:border-red-400" : "border-neutral-200"}`}
                                        />
                                   </div>
                                   {errors.fullName && <p className="text-red-500 text-xs mt-1 pl-1">{errors.fullName}</p>}
                              </div>

                              <div>
                                   <label className="block text-sm text-neutral-900 mb-2">
                                        Email
                                   </label>

                                   <div className="relative">
                                        <FiMail className="absolute left-3 top-3.5 text-neutral-900 text-[16px]" />

                                        <input
                                             type="email"
                                             name="email"
                                             value={formData.email}
                                             onChange={handleChange}
                                             placeholder="example@email.com"
                                             className={`w-full h-10 border rounded-lg pl-10 pr-4 outline-none focus:border-official text-neutral-900 placeholder:text-neutral-500 text-[14px] transition-colors ${errors.email ? "border-red-400 focus:border-red-400" : "border-neutral-200"}`}
                                        />
                                   </div>
                                   {errors.email && <p className="text-red-500 text-xs mt-1 pl-1">{errors.email}</p>}
                              </div>

                              <div>
                                   <label className="block text-sm text-neutral-900 mb-2">
                                        Mobile Number
                                   </label>

                                   <div className="relative">
                                        <FiPhone className="absolute left-3 top-3.5 text-neutral-900 text-[16px]" />

                                        <input
                                             type="tel"
                                             name="phone"
                                             value={formData.phone}
                                             onChange={handleChange}
                                             placeholder="+91 Enter 10 digit mobile number"
                                             className={`w-full h-10 border rounded-lg pl-10 pr-4 outline-none focus:border-official text-neutral-900 placeholder:text-neutral-500 text-[14px] transition-colors ${errors.phone ? "border-red-400 focus:border-red-400" : "border-neutral-200"}`}
                                        />
                                   </div>
                                   {errors.phone && <p className="text-red-500 text-xs mt-1 pl-1">{errors.phone}</p>}
                              </div>

                              <label className="flex items-start gap-2 text-xs text-zinc-500 select-none">
                                   <input
                                        type="checkbox"
                                        defaultChecked
                                        className="mt-1 accent-official shrink-0"
                                   />
                                   <span>
                                        By providing your contact details, you agree
                                        to our Terms of Use & Privacy Policy.
                                   </span>
                              </label>

                              <button
                                   type="submit"
                                   disabled={loading}
                                   className={`w-full h-12  rounded-lg font-medium  transition-all cursor-pointer flex items-center justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed bg-official/50 text-neutral-500" : "bg-official text-neutral-900 hover:opacity-90"}`}
                              >
                                   {loading ? (
                                        <>
                                             <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                             <span className="ml-1">Booking Call...</span>
                                        </>
                                   ) : (
                                        "Talk to our advisor"
                                   )}
                              </button>
                         </>
                    ) : (
                         <>
                              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-xs text-neutral-800">
                                   <p className="font-semibold text-neutral-900 mb-1">
                                        ✓ OTP sent to <span className="text-official">{formData.email}</span>
                                   </p>
                                   <p className="text-neutral-600">Enter the 6-digit verification code sent to your email</p>
                              </div>

                              <div>
                                   <label className="block text-sm text-neutral-900 mb-2">
                                        OTP Code <span className="text-red-500">*</span>
                                   </label>

                                   <div className="relative">
                                        <FiLock className="absolute left-3 top-3.5 text-neutral-900 text-[16px]" />

                                        <input
                                             type="text"
                                             name="otp"
                                             value={formData.otp}
                                             onChange={handleChange}
                                             placeholder="Enter 6-digit OTP"
                                             maxLength={6}
                                             className={`w-full h-10 border rounded-lg pl-10 pr-4 outline-none focus:border-official text-neutral-900 placeholder:text-neutral-500 text-[14px] transition-colors ${errors.otp ? "border-red-400 focus:border-red-400" : "border-neutral-200"}`}
                                        />
                                   </div>
                                   {errors.otp && <p className="text-red-500 text-xs mt-1 pl-1">{errors.otp}</p>}
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
                                        className="hover:text-official cursor-pointer transition font-medium"
                                   >
                                        ← Edit Details
                                   </button>
                              </div>

                              <button
                                   type="submit"
                                   disabled={loading || status === "loading"}
                                   className={`w-full h-12 bg-official rounded-lg font-medium text-zinc-900 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 ${loading || status === "loading" ? "opacity-60 cursor-not-allowed" : ""}`}
                              >
                                   {status === "loading" ? (
                                        <>
                                             <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                                             <span className="ml-1">Verifying...</span>
                                        </>
                                   ) : status === "success" ? (
                                        <span>✓ Booking Submitted</span>
                                   ) : (
                                        "Verify & Submit"
                                   )}
                              </button>
                         </>
                    )}
               </form>
          </>
     );
};

export default Form;
