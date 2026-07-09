'use client';

import { useState, useEffect, useRef } from "react";
const loginImage = "/images/weekend-ux-login-decorative-image.webp";
import { Mail, User, X, KeyRound, Phone } from "lucide-react";
import { signupUser, loginUser, sendAuthOTP } from "@/utils/auth.js";
import Button from "@/components/ui/Button";
import { useHomeData } from "@/context/HomeDataContext";

const AuthModal = ({
     isOpen,
     onClose,
     onAuthSuccess,
     backdropBgColor = "bg-neutral/50 backdrop-blur-sm",
     modalBgColor = "bg-white",
     titleColor = "text-neutral",
     titleTextSize = "text-2xl",
     labelColor = "text-neutral-600",
     inputBgColor = "bg-white",
     inputTextColor = "text-neutral",
     inputBorderColor = "border-zinc-200",
     inputFocusColor = "focus:border-official focus:ring-1 focus:ring-official",
     submitButtonClass = "",
     toggleTextColor = "text-neutral-600",
     toggleLinkColor = "text-official hover:underline cursor-pointer font-bold",
     keepSignedColor = "accent-official cursor-pointer",
     agreeTermsColor = "accent-official cursor-pointer",
}) => {
     const { navbarData } = useHomeData();
     const authDecorativeImage = navbarData?.authDecorativeImage || loginImage;
     const [authMode, setAuthMode] = useState("login"); // "login", "signup"
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const [successMessage, setSuccessMessage] = useState("");

     const [otpSent, setOtpSent] = useState(false);
     const [otpSending, setOtpSending] = useState(false);
     const [resendTimer, setResendTimer] = useState(0);
     const timerRef = useRef(null);

     const [formData, setFormData] = useState({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          otp: "",
          agreeTerms: false,
          keepSigned: false,
     });

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

     useEffect(() => {
          return () => {
               if (timerRef.current) clearInterval(timerRef.current);
          };
     }, []);

     useEffect(() => {
          const html = document.documentElement;

          if (isOpen) {
               const scrollbarWidth = window.innerWidth - html.clientWidth;
               html.style.overflow = "hidden";
               html.style.paddingRight = `${scrollbarWidth}px`;
          } else {
               html.style.overflow = "";
               html.style.paddingRight = "";
               // Reset modal state when closed
               setAuthMode("login");
               setError("");
               setSuccessMessage("");
               setOtpSent(false);
               setOtpSending(false);
               setResendTimer(0);
               if (timerRef.current) clearInterval(timerRef.current);
               setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    otp: "",
                    agreeTerms: false,
                    keepSigned: false,
               });
          }

          return () => {
               html.style.overflow = "";
               html.style.paddingRight = "";
          };
     }, [isOpen]);

     const validateName = (name) => {
          const trimmed = name?.trim() || "";
          return trimmed.length >= 2 && /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(trimmed);
     };

     const validatePhone = (phone) => {
          const cleaned = (phone || "").replace(/\D/g, "");
          return /^[6-9]\d{9}$/.test(cleaned);
     };

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          let nextValue = type === "checkbox" ? checked : value;

          if (name === "phone") {
               nextValue = nextValue.replace(/\D/g, "").slice(0, 10);
          }

          setFormData(prev => ({
               ...prev,
               [name]: nextValue
          }));
          setError("");
          setSuccessMessage("");
     };

     const handleSendOTP = async (e) => {
          if (e) e.preventDefault();

          if (authMode === "signup") {
               if (!validateName(formData.name)) {
                    setError("Please enter a valid full name");
                    return;
               }

               if (!validatePhone(formData.phone)) {
                    setError("Please enter a valid 10-digit mobile number");
                    return;
               }
          }

          if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
               setError("Please provide a valid email address");
               return;
          }

          setOtpSending(true);
          setError("");
          setSuccessMessage("");

          try {
               await sendAuthOTP(formData.email);
               setOtpSent(true);
               setSuccessMessage("Verification OTP code has been sent to your email");
               startResendTimer();
          } catch (err) {
               setError(err.message || "Failed to send verification OTP");
          } finally {
               setOtpSending(false);
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError("");
          setSuccessMessage("");

          if (!otpSent) {
               await handleSendOTP();
               return;
          }

          setLoading(true);

          try {
               if (authMode === "signup") {
                    if (!validateName(formData.name)) {
                         setError("Please enter a valid full name");
                         setLoading(false);
                         return;
                    }

                    if (!validatePhone(formData.phone)) {
                         setError("Please enter a valid 10-digit mobile number");
                         setLoading(false);
                         return;
                    }

                    if (!formData.email || !formData.otp) {
                         setError("Please fill in all required fields");
                         setLoading(false);
                         return;
                    }
                    if (!formData.agreeTerms) {
                         setError("Please agree to Terms & Conditions");
                         setLoading(false);
                         return;
                    }

                    await signupUser(formData.name.trim(), formData.email.trim(), formData.phone.replace(/\D/g, ""), formData.otp);

                    // Success
                    setFormData({
                         name: "",
                         email: "",
                         phone: "",
                         password: "",
                         confirmPassword: "",
                         otp: "",
                         agreeTerms: false,
                         keepSigned: false,
                    });
                    onClose();
                    onAuthSuccess?.();
               } else if (authMode === "login") {
                    if (!formData.email || !formData.otp) {
                         setError("Please enter email and verification OTP");
                         setLoading(false);
                         return;
                    }

                    await loginUser(formData.email, formData.otp);

                    // Success
                    setFormData({
                         name: "",
                         email: "",
                         phone: "",
                         password: "",
                         confirmPassword: "",
                         otp: "",
                         agreeTerms: false,
                         keepSigned: false,
                    });
                    onClose();
                    onAuthSuccess?.();
               }
          } catch (err) {
               setError(err.message || "An error occurred");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className={`fixed open-sans inset-0 z-999999 flex items-center justify-center ${backdropBgColor} ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'} transition-all duration-500 ease-in-out`} role="dialog" aria-labelledby="auth-modal-title" aria-modal="true">
               <h2 id="auth-modal-title" className="sr-only hidden">
                    {authMode === "signup" ? "Sign Up" : authMode === "forgot" ? "Forgot Password" : authMode === "reset" ? "Reset Password" : "Sign In"}
               </h2>

               {/* Modal container */}
               <div className={`w-[90%] max-w-4xl ${modalBgColor} rounded-2xl shadow-2xl relative overflow-hidden p-6 md:p-10 text-neutral`}>
                    <div className="flex flex-col md:flex-row h-auto md:h-125">

                         {/* LEFT PANEL - ILLUSTRATION */}
                         <div className="w-full md:w-1/2 flex items-center justify-center rounded-xl md:rounded-none">
                              <img
                                   src={authDecorativeImage}
                                   alt="weekend-ux-login-decorative-image"
                                   width={363}
                                   height={1012}
                                   className="w-full h-auto object-cover"
                              />
                         </div>

                         {/* Divider */}
                         <div className="hidden md:block w-px bg-zinc-200"></div>

                         {/* RIGHT PANEL - FORM */}
                         <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 py-6 md:py-0">

                              <h3 className={`${titleTextSize} font-bold ${titleColor} mb-6`}>
                                   {authMode === "signup" ? "Create Account" : "Welcome Back"}
                              </h3>

                              <form className="space-y-4" onSubmit={handleSubmit}>

                                   {/* Error Message */}
                                   {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-[13px] text-left font-medium">
                                             {error}
                                        </div>
                                   )}

                                   {/* Success Message */}
                                   {successMessage && (
                                        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-[13px] text-left font-medium animate-fadeIn">
                                             {successMessage}
                                        </div>
                                   )}

                                   {/* Signup only: Full Name */}
                                   {authMode === "signup" && (
                                        <>
                                             <div className="relative text-left">
                                                  <label className={`text-[13px] font-semibold ${labelColor}`}>Full Name</label>
                                                  <div className="relative mt-1">
                                                       <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder="John Doe"
                                                            className={`w-full pl-10 pr-4 h-11 border ${inputBorderColor} rounded-lg text-sm outline-none ${inputFocusColor} ${inputBgColor} ${inputTextColor}`}
                                                            required
                                                       />
                                                       <User className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                                  </div>
                                             </div>

                                             <div className="relative text-left">
                                                  <label className={`text-[13px] font-semibold ${labelColor}`}>Mobile Number</label>
                                                  <div className="relative mt-1">
                                                       <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            placeholder="9876543210"
                                                            maxLength={10}
                                                            className={`w-full pl-10 pr-4 h-11 border ${inputBorderColor} rounded-lg text-sm outline-none ${inputFocusColor} ${inputBgColor} ${inputTextColor}`}
                                                            required
                                                       />
                                                       <Phone className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                                  </div>
                                             </div>
                                        </>
                                   )}

                                   {/* Email Input */}
                                   <div className="relative text-left">
                                        <label className={`text-[13px] font-semibold ${labelColor}`}>Email Address</label>
                                        <div className="relative mt-1">
                                             <input
                                                  type="email"
                                                  name="email"
                                                  value={formData.email}
                                                  onChange={handleChange}
                                                  placeholder="example@email.com"
                                                  className={`w-full pl-10 pr-4 h-11 border ${inputBorderColor} rounded-lg text-sm outline-none ${inputFocusColor} ${inputBgColor} ${inputTextColor}`}
                                                  required
                                             />
                                             <Mail className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                        </div>
                                   </div>

                                   {/* OTP Input (Rendered below Email once sent) */}
                                   {otpSent && (
                                        <div className="relative text-left animate-fadeIn">
                                             <label className={`text-[13px] font-semibold ${labelColor}`}>Verification OTP</label>
                                             <div className="relative mt-1">
                                                  <input
                                                       type="text"
                                                       name="otp"
                                                       value={formData.otp}
                                                       onChange={handleChange}
                                                       placeholder="Enter 6-digit OTP"
                                                       maxLength={6}
                                                       className={`w-full pl-10 pr-4 h-11 border ${inputBorderColor} rounded-lg text-sm outline-none ${inputFocusColor} ${inputBgColor} ${inputTextColor} font-semibold tracking-widest text-center`}
                                                       required
                                                  />
                                                  <KeyRound className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                             </div>
                                             {/* Resend OTP */}
                                             <div className="flex justify-end mt-1">
                                                  {resendTimer > 0 ? (
                                                       <span className="text-xs text-neutral-500">
                                                            Resend OTP in <span className="font-semibold text-neutral-700">{resendTimer}s</span>
                                                       </span>
                                                  ) : (
                                                       <button
                                                            type="button"
                                                            onClick={handleSendOTP}
                                                            disabled={otpSending}
                                                            className={`text-xs ${toggleLinkColor} bg-transparent border-none cursor-pointer p-0`}
                                                       >
                                                            {otpSending ? "Sending..." : "Resend OTP"}
                                                       </button>
                                                  )}
                                             </div>
                                        </div>
                                   )}

                                   {/* Signup Terms checkbox */}
                                   {authMode === "signup" && (
                                        <div className={`flex items-center text-[12px] ${toggleTextColor} py-1 text-left`}>
                                             <label className="flex items-center gap-2 cursor-pointer">
                                                  <input
                                                       type="checkbox"
                                                       name="agreeTerms"
                                                       checked={formData.agreeTerms}
                                                       onChange={handleChange}
                                                       className={`${agreeTermsColor}`}
                                                  />
                                                  I agree to the Terms & Conditions
                                             </label>
                                        </div>
                                   )}

                                    {/* Submit Button */}
                                    <Button
                                         type="submit"
                                         disabled={loading || otpSending || (otpSent && !formData.otp)}
                                         variant="primary"
                                         size="h11"
                                         className={`w-full text-sm font-bold ${submitButtonClass} ${loading || otpSending || (otpSent && !formData.otp) ? "opacity-70 cursor-not-allowed bg-official/50 text-neutral-500" : ""}`}
                                    >
                                         {loading || otpSending ? (
                                              <>
                                                   <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                   <span>{otpSending ? "Sending OTP..." : "Processing..."}</span>
                                              </>
                                         ) : (
                                              otpSent ? (authMode === "signup" ? "Verify & Sign Up" : "Verify & Login") : "Get OTP"
                                         )}
                                    </Button>

                                   {/* Keep Signed checkbox */}
                                   {authMode === "login" && (
                                        <div className={`flex items-center text-[12px] ${toggleTextColor} py-1 text-left`}>
                                             <label className="flex items-center gap-2 cursor-pointer">
                                                  <input
                                                       type="checkbox"
                                                       name="keepSigned"
                                                       checked={formData.keepSigned}
                                                       onChange={handleChange}
                                                       className={`${keepSignedColor}`}
                                                  />
                                                  Keep me signed in
                                             </label>
                                        </div>
                                   )}
                              </form>

                              {/* Toggle Mode */}
                              <p className={`text-sm text-center mt-6 ${toggleTextColor}`}>
                                   {authMode === "signup" ? "Already have an account?" : "Don't have an account?"}
                                   {authMode === "login" && (
                                        <span
                                             onClick={() => { setAuthMode("signup"); setError(""); setSuccessMessage(""); setOtpSent(false); }}
                                             className={`${toggleLinkColor} ml-1`}
                                        >
                                             Sign up
                                        </span>
                                    )}
                                   {authMode === "signup" && (
                                        <span
                                             onClick={() => { setAuthMode("login"); setError(""); setSuccessMessage(""); setOtpSent(false); }}
                                             className={`${toggleLinkColor} ml-1`}
                                        >
                                             Login
                                        </span>
                                    )}
                              </p>
                              {authMode === "signup" && (
                                   <p className="text-[11px] text-center mt-2 text-red-600">
                                        Name, email and phone number must be entered correctly to enroll in the course.
                                   </p>
                              )}

                         </div>
                    </div>

                    {/* Close Button */}
                    <button
                         onClick={onClose}
                         aria-label="Close authentication modal"
                         className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 cursor-pointer hover:rotate-90 transition-all duration-300"
                    >
                         <X size={24} />
                    </button>
               </div>
          </div>
     );
};

export default AuthModal;
