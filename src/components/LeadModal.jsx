"use client";

import { useState, useEffect } from "react";
import { X, Lock, CheckCircle2 } from "lucide-react";

export default function LeadModal() {
     const [isOpen, setIsOpen] = useState(false);
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [courseId, setCourseId] = useState("");
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);

     useEffect(() => {
          if (typeof window === "undefined") return;

          // 1. Check if already submitted
          const isSubmitted = localStorage.getItem("leadSubmitted") === "true";
          if (isSubmitted) return;

          // 2. Set up event listener for manual trigger (clicked blurred lesson)
          const handleOpen = (e) => {
               setError("");
               setSuccess(false);
               setIsOpen(true);
               const cId = e?.detail?.courseId || window.__currentCourseId || "";
               setCourseId(cId);
          };

          window.addEventListener("openLeadModal", handleOpen);

          // 3. Set up auto popup (10 seconds delay) if not shown today
          const lastShown = localStorage.getItem("leadModalLastShown");
          const now = Date.now();
          const oneDayMs = 24 * 60 * 60 * 1000;

          if (!lastShown || now - Number(lastShown) > oneDayMs) {
               const timer = setTimeout(() => {
                    // Double check submission state before opening automatically
                    if (localStorage.getItem("leadSubmitted") !== "true") {
                         setIsOpen(true);
                         const cId = window.__currentCourseId || "";
                         setCourseId(cId);
                         localStorage.setItem("leadModalLastShown", now.toString());
                    }
               }, 10000); // 10 seconds

               return () => {
                    clearTimeout(timer);
                    window.removeEventListener("openLeadModal", handleOpen);
               };
          }

          return () => {
               window.removeEventListener("openLeadModal", handleOpen);
          };
     }, []);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError("");

          if (!name.trim()) {
               setError("Please enter your name.");
               return;
          }

          if (!email.trim()) {
               setError("Please enter your email.");
               return;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
               setError("Please enter a valid email address.");
               return;
          }

          setLoading(true);
          try {
               const response = await fetch("/api/leads", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, courseId })
               });

               const data = await response.json();

               if (!response.ok) {
                    throw new Error(data.error || "Something went wrong. Please try again.");
               }

               localStorage.setItem("leadSubmitted", "true");
               setSuccess(true);
               setLoading(false);

               // Let other components know the lead has been submitted successfully
               window.dispatchEvent(new CustomEvent("leadSubmitted"));

               // Close modal after 1.5 seconds success state
               setTimeout(() => {
                    setIsOpen(false);
                    setName("");
                    setEmail("");
                    setCourseId("");
               }, 1500);

          } catch (err) {
               setError(err.message);
               setLoading(false);
          }
     };

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-zinc-950/70 backdrop-blur-md p-2 md:p-4 transition-all duration-300">
               <div className="w-full max-w-md bg-white rounded-3xl p-5 md:p-8 shadow-2xl relative border border-zinc-150 text-neutral text-center transform scale-100 transition-all duration-300 animate-in fade-in zoom-in-95 ">
                    
                    {/* Close Button */}
                    <button
                         onClick={() => setIsOpen(false)}
                         className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 transition cursor-pointer"
                         aria-label="Close"
                    >
                         <X size={20} />
                    </button>

                    {success ? (
                         <div className="py-6 flex flex-col items-center">
                              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5 border border-emerald-200 animate-bounce">
                                   <CheckCircle2 size={32} />
                              </div>
                              <h3 className="text-2xl font-bold font-playfair text-zinc-900 mb-2">Syllabus Sent to Email!</h3>
                              <p className="text-sm text-zinc-500 font-urbanist leading-relaxed">
                                   Thank you for sharing your details. The complete course syllabus and curriculum details have been sent to your email address.
                              </p>
                         </div>
                    ) : (
                         <>
                              {/* Lock Icon */}
                              <div className="w-14 h-14 bg-official/10 text-official rounded-full flex items-center justify-center mx-auto mb-1 md:mb-6 border border-official/20">
                                   <Lock size={24} />
                              </div>

                              <h3 className="text-2xl font-bold font-playfair text-zinc-900 mb-2">
                                   Unlock Curriculum
                              </h3>
                              
                              <p className="text-sm text-zinc-500 font-urbanist mb-6 leading-relaxed">
                                   Enter your details below to instantly unlock all chapters, lessons, and topics for our courses.
                              </p>

                              <form onSubmit={handleSubmit} className="text-left space-y-4">
                                   <div className="space-y-1">
                                        <label className="text-xs font-semibold text-zinc-600 font-urbanist">Name</label>
                                        <input
                                             type="text"
                                             value={name}
                                             onChange={(e) => setName(e.target.value)}
                                             placeholder="Your full name"
                                             className="w-full h-11 px-4 rounded-xl border border-zinc-200 focus:border-official focus:outline-none text-sm transition font-urbanist bg-zinc-50/50"
                                        />
                                   </div>

                                   <div className="space-y-1">
                                        <label className="text-xs font-semibold text-zinc-600 font-urbanist">Email Address</label>
                                        <input
                                             type="email"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                             placeholder="name@example.com"
                                             className="w-full h-11 px-4 rounded-xl border border-zinc-200 focus:border-official focus:outline-none text-sm transition font-urbanist bg-zinc-50/50"
                                        />
                                   </div>

                                   {error && (
                                        <p className="text-xs font-medium text-red-500 mt-1 bg-red-50 p-2 rounded-lg border border-red-100 font-urbanist">
                                             {error}
                                        </p>
                                   )}

                                   <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 bg-official text-black rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 font-urbanist mt-6 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                                   >
                                        {loading ? "Unlocking..." : "Submit & Unlock"}
                                   </button>
                              </form>
                         </>
                    )}
               </div>
          </div>
     );
}
