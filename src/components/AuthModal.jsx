'use client';

import { useState, useEffect } from "react";
const loginImage = "/images/weekend-ux-login-decorative-image.webp";
import { Lock, Mail, User, X, KeyRound } from "lucide-react";
import { signupUser, loginUser, forgotPassword, resetPassword } from "@/utils/auth.js";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
     const [authMode, setAuthMode] = useState("login"); // "login", "signup", "forgot", "reset"
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const [successMessage, setSuccessMessage] = useState("");
     const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          otp: "",
          agreeTerms: false,
          keepSigned: false,
     });

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
               setFormData({
                    name: "",
                    email: "",
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

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: type === "checkbox" ? checked : value
          }));
          setError("");
          setSuccessMessage("");
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          setSuccessMessage("");

          try {
               if (authMode === "signup") {
                    if (!formData.name || !formData.email || !formData.password) {
                         setError("Please fill in all fields");
                         setLoading(false);
                         return;
                    }
                    if (!formData.agreeTerms) {
                         setError("Please agree to Terms & Conditions");
                         setLoading(false);
                         return;
                    }

                    await signupUser(formData.name, formData.email, formData.password);

                    // Success
                    setFormData({
                         name: "",
                         email: "",
                         password: "",
                         confirmPassword: "",
                         otp: "",
                         agreeTerms: false,
                         keepSigned: false,
                    });
                    onClose();
                    onAuthSuccess?.();
               } else if (authMode === "login") {
                    if (!formData.email || !formData.password) {
                         setError("Please enter email and password");
                         setLoading(false);
                         return;
                    }

                    await loginUser(formData.email, formData.password);

                    // Success
                    setFormData({
                         name: "",
                         email: "",
                         password: "",
                         confirmPassword: "",
                         otp: "",
                         agreeTerms: false,
                         keepSigned: false,
                    });
                    onClose();
                    onAuthSuccess?.();
               } else if (authMode === "forgot") {
                    if (!formData.email) {
                         setError("Please enter your email");
                         setLoading(false);
                         return;
                    }

                    await forgotPassword(formData.email);
                    setSuccessMessage("OTP sent to your email successfully!");
                    setAuthMode("reset");
               } else if (authMode === "reset") {
                    if (!formData.otp || !formData.password || !formData.confirmPassword) {
                         setError("Please fill in all fields");
                         setLoading(false);
                         return;
                    }

                    if (formData.password !== formData.confirmPassword) {
                         setError("Passwords do not match");
                         setLoading(false);
                         return;
                    }

                    await resetPassword(formData.email, formData.otp, formData.password);
                    setSuccessMessage("Password reset successfully! Please log in.");
                    setAuthMode("login");
                    setFormData(prev => ({ ...prev, password: "", confirmPassword: "", otp: "" }));
               }
          } catch (err) {
               setError(err.message || "An error occurred");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className={`fixed open-sans inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-sm ${isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'} transition-all duration-500 ease-in-out`} role="dialog" aria-labelledby="auth-modal-title" aria-modal="true">
               <h2 id="auth-modal-title" className="sr-only hidden">
                    {authMode === "signup" ? "Sign Up" : authMode === "forgot" ? "Forgot Password" : authMode === "reset" ? "Reset Password" : "Sign In"}
               </h2>

               {/* Modal container */}
               <div className="w-[90%] max-w-4xl bg-white rounded-2xl shadow-2xl relative overflow-hidden p-6 md:p-10 text-neutral-900">
                    <div className="flex flex-col md:flex-row h-auto md:h-[500px]">

                         {/* LEFT PANEL - ILLUSTRATION */}
                         <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 rounded-xl md:rounded-none">
                              <img
                                   src={loginImage.src || loginImage}
                                   alt="illustration"
                                   width={363}
                                   height={512}
                                   className="w-full  h-auto object-contain rounded-lg"
                              />
                         </div>

                         {/* Divider */}
                         <div className="hidden md:block w-px bg-zinc-200"></div>

                         {/* RIGHT PANEL - FORM */}
                         <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 py-6 md:py-0">

                              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                                   {authMode === "signup" ? "Create Account" : authMode === "forgot" ? "Forgot Password" : authMode === "reset" ? "Reset Password" : "Welcome Back"}
                              </h3>

                              <form className="space-y-4" onSubmit={handleSubmit}>

                                   {/* Error Message */}
                                   {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-[13px]">
                                             {error}
                                        </div>
                                   )}

                                   {/* Success Message */}
                                   {successMessage && (
                                        <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-[13px]">
                                             {successMessage}
                                        </div>
                                   )}

                                   {/* Signup only */}
                                   {authMode === "signup" && (
                                        <div className="relative">
                                             <label className="text-[13px] font-semibold text-neutral-600">Full Name</label>
                                             <div className="relative mt-1">
                                                  <input
                                                       type="text"
                                                       name="name"
                                                       value={formData.name}
                                                       onChange={handleChange}
                                                       placeholder="John Doe"
                                                       className="w-full pl-10 pr-4 h-11 border border-zinc-200 rounded-lg text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                                                  />
                                                  <User className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                             </div>
                                        </div>
                                   )}

                                   {authMode !== "reset" && (
                                        <div className="relative">
                                             <label className="text-[13px] font-semibold text-neutral-600">Email</label>
                                             <div className="relative mt-1">
                                                  <input
                                                       type="email"
                                                       name="email"
                                                       value={formData.email}
                                                       onChange={handleChange}
                                                       placeholder="example@email.com"
                                                       className="w-full pl-10 pr-4 h-11 border border-zinc-200 rounded-lg text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                                                  />
                                                  <Mail className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                             </div>
                                        </div>
                                   )}

                                   {authMode === "reset" && (
                                        <div className="relative">
                                             <label className="text-[13px] font-semibold text-neutral-600">Verification OTP</label>
                                             <div className="relative mt-1">
                                                  <input
                                                       type="text"
                                                       name="otp"
                                                       value={formData.otp}
                                                       onChange={handleChange}
                                                       placeholder="Enter 6-digit OTP"
                                                       className="w-full pl-10 pr-4 h-11 border border-zinc-200 rounded-lg text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                                                  />
                                                  <KeyRound className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                             </div>
                                        </div>
                                   )}

                                   {authMode !== "forgot" && (
                                        <div className="relative">
                                             <label className="text-[13px] font-semibold text-neutral-600">
                                                  {authMode === "reset" ? "New Password" : "Password"}
                                             </label>
                                             <div className="relative mt-1">
                                                  <input
                                                       type="password"
                                                       name="password"
                                                       value={formData.password}
                                                       onChange={handleChange}
                                                       placeholder={authMode === "reset" ? "Enter new password" : "Enter password"}
                                                       className="w-full pl-10 pr-4 h-11 border border-zinc-200 rounded-lg text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                                                  />
                                                  <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                             </div>
                                        </div>
                                   )}

                                   {authMode === "reset" && (
                                        <div className="relative">
                                             <label className="text-[13px] font-semibold text-neutral-600">Confirm New Password</label>
                                             <div className="relative mt-1">
                                                  <input
                                                       type="password"
                                                       name="confirmPassword"
                                                       value={formData.confirmPassword}
                                                       onChange={handleChange}
                                                       placeholder="Confirm new password"
                                                       className="w-full pl-10 pr-4 h-11 border border-zinc-200 rounded-lg text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                                                  />
                                                  <Lock className="absolute top-1/2 -translate-y-1/2 left-3 text-zinc-400" size={18} />
                                             </div>
                                        </div>
                                   )}

                                   {authMode === "signup" && (
                                        <div className="flex items-center text-[12px] text-neutral-600 py-1">
                                             <label className="flex items-center gap-2 cursor-pointer">
                                                  <input
                                                       type="checkbox"
                                                       name="agreeTerms"
                                                       checked={formData.agreeTerms}
                                                       onChange={handleChange}
                                                       className="accent-yellow-500 cursor-pointer"
                                                  />
                                                  I agree to the Terms & Conditions
                                             </label>
                                        </div>
                                   )}

                                   {/* Button */}
                                   <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full bg-official hover:bg-official/80 text-white h-11 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                                   >
                                        {loading ? "Loading..." : (authMode === "signup" ? "Sign Up" : authMode === "forgot" ? "Send OTP" : authMode === "reset" ? "Reset Password" : "Sign In")}
                                   </button>

                                   {/* Bottom Row */}
                                   {authMode === "login" && (
                                        <div className="flex items-center justify-between text-[12px] text-neutral-600 bg-transparent">
                                             <label className="flex items-center gap-2 cursor-pointer">
                                                  <input
                                                       type="checkbox"
                                                       name="keepSigned"
                                                       checked={formData.keepSigned}
                                                       onChange={handleChange}
                                                       className="accent-yellow-500 cursor-pointer"
                                                  />
                                                  Keep me signed in
                                             </label>

                                             <span onClick={() => { setAuthMode("forgot"); setError(""); setSuccessMessage(""); }} className="cursor-pointer hover:underline text-official font-semibold">Forgot password?</span>
                                        </div>
                                   )}
                              </form>

                              {/* Toggle Mode */}
                              <p className="text-sm text-center mt-6 text-neutral-600">
                                   {authMode === "signup" ? "Already have an account?" : authMode === "login" ? "Don't have an account?" : ""}
                                   {authMode === "login" && (
                                        <span
                                             onClick={() => { setAuthMode("signup"); setError(""); setSuccessMessage(""); }}
                                             className="text-official hover:underline ml-1 cursor-pointer font-bold"
                                        >
                                             Sign up
                                        </span>
                                   )}
                                   {authMode === "signup" && (
                                        <span
                                             onClick={() => { setAuthMode("login"); setError(""); setSuccessMessage(""); }}
                                             className="text-official hover:underline ml-1 cursor-pointer font-bold"
                                        >
                                             Login
                                        </span>
                                   )}
                                   {(authMode === "forgot" || authMode === "reset") && (
                                        <span
                                             onClick={() => { setAuthMode("login"); setError(""); setSuccessMessage(""); }}
                                             className="text-official hover:underline cursor-pointer font-bold"
                                        >
                                             Back to Login
                                        </span>
                                   )}
                              </p>

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
