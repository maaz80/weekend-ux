"use client";

import { useState, useEffect, useRef } from "react";
import { Users, BookOpen, ShieldCheck, GraduationCap, ArrowRight, Check, ChevronDown } from "lucide-react";
import { FiUser, FiMail, FiPhone, FiLock, FiBookOpen } from "react-icons/fi";

export default function DemoClass({ data }) {
     const [status, setStatus] = useState("idle");
     const [otpStep, setOtpStep] = useState(false);
     const [selectedCourse, setSelectedCourse] = useState(data?.title || "UI/UX Design Master Course");
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const dropdownRef = useRef(null);

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

     const [fetchedCourses, setFetchedCourses] = useState([]);

     const defaultCourseOptions = [
          "UI/UX Design Master Course",
          "Figma & Design Systems",
          "AI Tools for Product Designers",
          "User Research & Usability Testing",
          "Interaction Design & Prototyping",
          "Advanced Motion & Micro-interactions",
          "Web Design & Frontend for Designers",
          "UX Strategy & Product Design",
          "Portfolio Development & Interview Prep"
     ];

     const courseOptions = Array.from(new Set([
          ...(data?.title ? [data.title] : []),
          ...fetchedCourses,
          ...defaultCourseOptions
     ]));

     useEffect(() => {
          async function loadAllCourses() {
               try {
                    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";
                    const res = await fetch(`${API_BASE}/courses`);
                    if (res.ok) {
                         const resData = await res.json();
                         const list = Array.isArray(resData) ? resData : (resData?.data || resData?.courses || []);
                         const names = list.map(c => c.title || c.coursename || c.name).filter(Boolean);
                         if (names.length > 0) {
                              setFetchedCourses(names);
                         }
                    }
               } catch (e) {
                    // Fallback to defaults
               }
          }
          loadAllCourses();
     }, []);

     useEffect(() => {
          if (data?.title) {
               setSelectedCourse(data.title);
          }
     }, [data?.title]);

     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsDropdownOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

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
                         course: selectedCourse,
                         message: `Free Demo Class Booking for ${selectedCourse}`
                    }),
                    signal: controller.signal
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setStatus("success");
                    setSuccessMessage("Free Demo Class booked successfully!");
                    localStorage.setItem("leadSubmitted", "true");
                    localStorage.setItem("leadUser", JSON.stringify({ name: formData.fullName, email: formData.email, phone: formData.phone }));
                    window.dispatchEvent(new CustomEvent("leadSubmitted"));
                    setFormData({ fullName: "", phone: "", email: "", otp: "" });
                    setOtpStep(false);
                    setErrors({});
                    if (timerRef.current) clearInterval(timerRef.current);
                    setTimeout(() => setStatus("idle"), 4000);
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

     const features = [
          {
               icon: Users,
               title: "Expert Instructors",
               description: "Learn from top-tier industry professionals"
          },
          {
               icon: BookOpen,
               title: "Real-World Learning",
               description: "Practical knowledge with hands-on examples"
          },
          {
               icon: ShieldCheck,
               title: "No Commitment",
               description: "Explore freely, decide with complete confidence"
          }
     ];

     return (
          <section className="w-full bg-white py-12 sm:py-16 md:py-20 font-urbanist border-b border-zinc-200/80 relative z-1 overflow-hidden px-2">
               <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                         {/* Left Side Content */}
                         <div className="lg:col-span-7 space-y-6 text-left min-w-0">

                              {/* Badge Tag */}
                              <div>
                                   <span className="inline-block bg-official/20 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-md uppercase tracking-wider border border-official">
                                        FREE DEMO CLASS
                                   </span>
                              </div>

                              {/* Heading */}
                              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-official leading-tight">
                                   Try Before You Enroll
                              </h2>

                              {/* Description */}
                              <p className="font-urbanist text-sm sm:text-base text-zinc-600 font-medium leading-relaxed max-w-xl">
                                   Join our free demo class and experience our teaching style, content quality, and practical learning approach — absolutely free!
                              </p>

                              {/* Feature Cards Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 pt-6 border-t border-zinc-150">
                                   {features.map((feat, idx) => {
                                        const Icon = feat.icon;
                                        return (
                                             <div key={idx} className="space-y-2 text-left group min-w-0">
                                                  <div className="w-12 h-12 rounded-2xl bg-official/10 border border-official/20 text-zinc-900 flex items-center justify-center group-hover:bg-official transition-all duration-300 shadow-2xs">
                                                       <Icon size={22} className="text-zinc-900" />
                                                  </div>
                                                  <h3 className="font-urbanist font-extrabold text-zinc-900 text-sm sm:text-base leading-snug">
                                                       {feat.title}
                                                  </h3>
                                                  <p className="font-urbanist text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
                                                       {feat.description}
                                                  </p>
                                             </div>
                                        );
                                   })}
                              </div>

                         </div>

                         {/* Right Side Form Card */}
                         <div className="lg:col-span-5 w-full min-w-0">
                              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-zinc-200/90 transition-all duration-300">

                                   {/* Card Header Bar */}
                                   <div className="bg-official p-6 text-white flex items-center gap-3.5 shadow-sm">
                                        <div className="w-11 h-11 rounded-full bg-white/20 border border-white/60 flex items-center justify-center text-white shrink-0 shadow-inner">
                                             <GraduationCap size={24} />
                                        </div>
                                        <div>
                                             <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white leading-snug">
                                                  Book Your Free Demo Class
                                             </h3>
                                        </div>
                                   </div>

                                   {/* Card Form Body */}
                                   <div className="p-6 sm:p-7 space-y-4">
                                        {successMessage && (
                                             <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2" role="alert">
                                                  <Check size={16} />
                                                  <span>{successMessage}</span>
                                             </div>
                                        )}

                                        <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} className="space-y-4 text-left">
                                             {!otpStep ? (
                                                  <>
                                                       {/* Input 1: Full Name */}
                                                       <div>
                                                            <div className="relative w-full">
                                                                 <FiUser className="absolute left-3.5 top-3.5 text-zinc-400 text-base pointer-events-none" />
                                                                 <input
                                                                      type="text"
                                                                      name="fullName"
                                                                      value={formData.fullName}
                                                                      onChange={handleChange}
                                                                      placeholder="Full Name"
                                                                      className={`w-full h-11 border rounded-xl pl-10 pr-4 outline-none text-zinc-800 placeholder:text-zinc-400 text-sm transition-all focus:border-official  focus:ring-1 focus:ring-official ${errors.fullName ? "border-red-400 focus:border-red-400" : "border-zinc-200 bg-zinc-50/50"}`}
                                                                 />
                                                            </div>
                                                            {errors.fullName && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.fullName}</p>}
                                                       </div>

                                                       {/* Input 2: Email Address */}
                                                       <div>
                                                            <div className="relative w-full">
                                                                 <FiMail className="absolute left-3.5 top-3.5 text-zinc-400 text-base pointer-events-none" />
                                                                 <input
                                                                      type="email"
                                                                      name="email"
                                                                      value={formData.email}
                                                                      onChange={handleChange}
                                                                      placeholder="Email Address"
                                                                      className={`w-full h-11 border rounded-xl pl-10 pr-4 outline-none text-zinc-800 placeholder:text-zinc-400 text-sm transition-all focus:border-official focus:ring-1 focus:ring-official ${errors.email ? "border-red-400 focus:border-red-400" : "border-zinc-200 bg-zinc-50/50"}`}
                                                                 />
                                                            </div>
                                                            {errors.email && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.email}</p>}
                                                       </div>

                                                       {/* Input 3: Phone Number */}
                                                       <div>
                                                            <div className="relative w-full">
                                                                 <FiPhone className="absolute left-3.5 top-3.5 text-zinc-400 text-base pointer-events-none" />
                                                                 <input
                                                                      type="tel"
                                                                      name="phone"
                                                                      value={formData.phone}
                                                                      onChange={handleChange}
                                                                      placeholder="Phone Number"
                                                                      className={`w-full h-11 border rounded-xl pl-10 pr-4 outline-none text-zinc-800 placeholder:text-zinc-400 text-sm transition-all focus:border-official focus:ring-1 focus:ring-official ${errors.phone ? "border-red-400 focus:border-red-400" : "border-zinc-200 bg-zinc-50/50"}`}
                                                                 />
                                                            </div>
                                                            {errors.phone && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.phone}</p>}
                                                       </div>

                                                        {/* Input 4: 100% Custom Select Course Dropdown */}
                                                        <div className="relative w-full" ref={dropdownRef}>
                                                             {/* Left Icon */}
                                                             <FiBookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-base pointer-events-none z-10" />

                                                             {/* Custom Dropdown Trigger Button */}
                                                             <button
                                                                  type="button"
                                                                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                                                                  className={`w-full h-11 border rounded-xl pl-10 pr-3.5 outline-none text-zinc-800 text-sm bg-zinc-50/50 flex items-center justify-between text-left transition-all font-urbanist cursor-pointer select-none ${isDropdownOpen ? "border-official ring-1 ring-official bg-white" : "border-zinc-200 hover:border-zinc-300"}`}
                                                             >
                                                                  <span className="truncate font-medium text-zinc-800 flex-1 pr-2">
                                                                       {selectedCourse}
                                                                  </span>
                                                                  
                                                                  <ChevronDown
                                                                       size={18}
                                                                       className={`text-zinc-400 shrink-0 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-amber-600" : ""}`}
                                                                  />
                                                             </button>

                                                             {/* Custom Options List Popup */}
                                                             {isDropdownOpen && (
                                                                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-2xl z-50 overflow-y-auto max-h-64 sm:max-h-72 py-1.5 font-urbanist divide-y divide-zinc-100">
                                                                       {courseOptions.map((courseOption, i) => {
                                                                            const isSelected = selectedCourse === courseOption;
                                                                            return (
                                                                                 <button
                                                                                      key={i}
                                                                                      type="button"
                                                                                      onClick={() => {
                                                                                           setSelectedCourse(courseOption);
                                                                                           setIsDropdownOpen(false);
                                                                                      }}
                                                                                      className={`w-full px-4 py-2.5 text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer select-none ${isSelected ? "bg-amber-50/80 text-zinc-900 font-bold" : "text-zinc-700 font-medium hover:bg-zinc-50 hover:text-zinc-900"}`}
                                                                                 >
                                                                                      <span className="truncate pr-2">{courseOption}</span>
                                                                                      {isSelected && <Check size={16} className="text-amber-600 shrink-0" />}
                                                                                 </button>
                                                                            );
                                                                       })}
                                                                  </div>
                                                             )}
                                                        </div>

                                                       {/* Submit Button */}
                                                       <button
                                                            type="submit"
                                                            disabled={loading}
                                                            className={`w-full h-12 mt-2 bg-linear-to-r from-zinc-800 to-zinc-900 text-white font-bold rounded-xl shadow-md hover:from-zinc-900 hover:to-black transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                                                       >
                                                            {loading ? (
                                                                 <>
                                                                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                      <span>Booking...</span>
                                                                 </>
                                                            ) : (
                                                                 <>
                                                                      <span>Book My Free Demo Class</span>
                                                                      <ArrowRight size={18} />
                                                                 </>
                                                            )}
                                                       </button>
                                                  </>
                                             ) : (
                                                  <>
                                                       {/* OTP Verification Step */}
                                                       <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-zinc-800 space-y-1">
                                                            <p className="font-bold text-zinc-900">
                                                                 ✓ OTP sent to <span className="text-amber-700">{formData.email}</span>
                                                            </p>
                                                            <p className="text-zinc-600">Enter the 6-digit verification code</p>
                                                       </div>

                                                       <div>
                                                            <div className="relative w-full">
                                                                 <FiLock className="absolute left-3.5 top-3.5 text-zinc-400 text-base pointer-events-none" />
                                                                 <input
                                                                      type="text"
                                                                      name="otp"
                                                                      value={formData.otp}
                                                                      onChange={handleChange}
                                                                      placeholder="Enter 6-digit OTP"
                                                                      maxLength={6}
                                                                      className={`w-full h-11 border rounded-xl pl-10 pr-4 outline-none text-zinc-800 placeholder:text-zinc-400 text-sm transition-all focus:border-official focus:ring-1 focus:ring-official ${errors.otp ? "border-red-400 focus:border-red-400" : "border-zinc-200 bg-zinc-50/50"}`}
                                                                 />
                                                            </div>
                                                            {errors.otp && <p className="text-red-500 text-xs mt-1 pl-1 font-medium">{errors.otp}</p>}
                                                       </div>

                                                       <div className="flex justify-between items-center text-xs text-zinc-600 font-medium">
                                                            <button
                                                                 type="button"
                                                                 onClick={handleResendOTP}
                                                                 disabled={resendTimer > 0 || loading}
                                                                 className={`${resendTimer > 0 || loading ? "text-zinc-400 cursor-not-allowed" : "text-amber-700 hover:underline cursor-pointer font-bold"}`}
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
                                                                 className="hover:text-zinc-900 cursor-pointer transition font-bold"
                                                            >
                                                                 ← Edit Details
                                                            </button>
                                                       </div>

                                                       <button
                                                            type="submit"
                                                            disabled={loading || status === "loading"}
                                                            className={`w-full h-12 bg-linear-to-r from-zinc-800 to-zinc-900 text-white font-bold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer ${loading || status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
                                                       >
                                                            {status === "loading" ? (
                                                                 <>
                                                                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                      <span>Verifying...</span>
                                                                 </>
                                                            ) : status === "success" ? (
                                                                 <span>✓ Demo Booked</span>
                                                            ) : (
                                                                 <>
                                                                      <span>Confirm Demo Booking</span>
                                                                      <ArrowRight size={18} />
                                                                 </>
                                                            )}
                                                       </button>
                                                  </>
                                             )}
                                        </form>

                                   </div>

                                   {/* Card Footer Bar */}
                                   <div className="bg-zinc-50/80 border-t border-zinc-150 py-3.5 px-6 text-center text-xs font-bold text-zinc-500 flex items-center justify-center gap-2 select-none">
                                        <ShieldCheck size={16} className="text-green-600 shrink-0" />
                                        <span>100% Free • No Credit Card Required</span>
                                   </div>

                              </div>
                         </div>

                    </div>
               </div>
          </section>
     );
}
