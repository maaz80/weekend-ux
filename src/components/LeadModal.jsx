"use client";

import { useState, useEffect } from "react";
import { X, Lock, CheckCircle2, Send } from "lucide-react";
import { trackMetaEvent } from "@/utils/metaCapi";
import { gtag_report_conversion } from "@/utils/googleAds";

export default function LeadModal() {
     const [isOpen, setIsOpen] = useState(false);
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [phone, setPhone] = useState("");
     const [courseId, setCourseId] = useState("");
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);
     const [toast, setToast] = useState(null);

     const showToastNotification = (msg, type = "success") => {
          setToast({ message: msg, type });
          setTimeout(() => {
               setToast(null);
          }, 4500);
     };

     useEffect(() => {
          if (typeof window === "undefined") return;

          // Event listener for manual trigger ("Get Brochure", "Book a Call", "Apply Now", blurred lesson click)
          const handleOpen = async (e) => {
               const cId = e?.detail?.courseId || window.__currentCourseId || "";

               // Check if user already filled form previously
               let savedUser = null;
               try {
                    const raw = localStorage.getItem("leadUser");
                    if (raw) savedUser = JSON.parse(raw);
               } catch (err) { }

               if (savedUser && savedUser.email) {
                    // DIRECT SEND TO EMAIL! User already filled form previously
                    showToastNotification(`Sending course details to ${savedUser.email}...`, "info");
                    try {
                         const response = await fetch("/api/leads", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                   name: savedUser.name || "Returning Student",
                                   email: savedUser.email,
                                   phone: savedUser.phone || "",
                                   courseId: cId,
                                   source: "Course Page Brochure Request"
                              })
                         });
                         if (response.ok) {
                              showToastNotification(`Syllabus email sent to ${savedUser.email}! Check your inbox.`, "success");
                              window.dispatchEvent(new CustomEvent("leadSubmitted"));
                         } else {
                              showToastNotification("Could not send email. Please try again.", "error");
                         }
                    } catch (fetchErr) {
                         showToastNotification("Error sending email. Please check connection.", "error");
                    }
                    return;
               }

               // First time user: open modal form
               setError("");
               setSuccess(false);
               setIsOpen(true);
               setCourseId(cId);
          };

          window.addEventListener("openLeadModal", handleOpen);

          // Auto popup (10 seconds delay) if not submitted & not shown today
          const lastShown = localStorage.getItem("leadModalLastShown");
          const now = Date.now();
          const oneDayMs = 24 * 60 * 60 * 1000;
          const isSubmitted = localStorage.getItem("leadSubmitted") === "true";

          let timer = null;
          if (!isSubmitted && (!lastShown || now - Number(lastShown) > oneDayMs)) {
               timer = setTimeout(() => {
                    if (localStorage.getItem("leadSubmitted") !== "true") {
                         setIsOpen(true);
                         const cId = window.__currentCourseId || "";
                         setCourseId(cId);
                         localStorage.setItem("leadModalLastShown", now.toString());
                    }
               }, 10000);
          }

          return () => {
               if (timer) clearTimeout(timer);
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

          const cleanPhone = phone.replace(/\D/g, "");
          if (!cleanPhone) {
               setError("Please enter your mobile number.");
               return;
          }

          if (!/^[0-9]{10}$/.test(cleanPhone)) {
               setError("Please enter a valid 10-digit mobile number.");
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
                    body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: cleanPhone, courseId, source: "Course Page Brochure Request" })
               });

               const data = await response.json();

               if (!response.ok) {
                    throw new Error(data.error || "Something went wrong. Please try again.");
               }

               // Save lead user for future direct sends!
               localStorage.setItem("leadSubmitted", "true");
               localStorage.setItem("leadUser", JSON.stringify({ name: name.trim(), email: email.trim(), phone: cleanPhone }));

               // Trigger Google Ads & Meta Lead Events
               gtag_report_conversion();
               trackMetaEvent(
                    "Lead",
                    { em: email.trim(), ph: cleanPhone, fn: name.trim() },
                    { content_name: courseId || "Brochure Request", source: "Course Page Brochure Request" }
               );

               setSuccess(true);
               setLoading(false);

               // Let other components know the lead has been submitted successfully
               window.dispatchEvent(new CustomEvent("leadSubmitted"));

               // Close modal after 1.5 seconds success state
               setTimeout(() => {
                    setIsOpen(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setCourseId("");
               }, 1500);

          } catch (err) {
               setError(err.message);
               setLoading(false);
          }
     };

     return (
          <>
               {/* Toast Notification */}
               {toast && (
                    <div className="fixed top-20 right-4 md:right-8 z-9999999 flex items-center gap-3 bg-zinc-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-zinc-700 animate-in fade-in slide-in-from-top-4 duration-300 font-urbanist text-xs md:text-sm font-semibold max-w-sm">
                         <Send className="w-5 h-5 text-official shrink-0 animate-pulse" />
                         <span>{toast.message}</span>
                         <button onClick={() => setToast(null)} className="text-zinc-400 hover:text-white ml-auto cursor-pointer">
                              <X size={16} />
                         </button>
                    </div>
               )}

               {/* Modal Popup */}
               {isOpen && (
                    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-zinc-950/70 backdrop-blur-md p-3 transition-all duration-300">
                         <div className="w-full max-w-97.5 sm:max-w-md max-h-[85vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative border border-zinc-150 text-neutral text-center transform scale-100 transition-all duration-300 animate-in fade-in zoom-in-95">

                              {/* Close Button */}
                              <button
                                   onClick={() => setIsOpen(false)}
                                   className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition cursor-pointer p-1 rounded-full hover:bg-zinc-100"
                                   aria-label="Close"
                              >
                                   <X size={18} />
                              </button>

                              {success ? (
                                   <div className="py-4 flex flex-col items-center">
                                        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-200 animate-bounce">
                                             <CheckCircle2 size={28} />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold font-playfair text-zinc-900 mb-2">Syllabus Sent to Email!</h3>
                                        <p className="text-xs sm:text-sm text-zinc-500 font-urbanist leading-relaxed">
                                             Thank you for sharing your details. The complete course syllabus and curriculum details have been sent to your email address.
                                        </p>
                                   </div>
                              ) : (
                                   <>
                                        {/* Lock Icon */}
                                        <div className="w-11 h-11 bg-official/10 text-official rounded-full flex items-center justify-center mx-auto mb-2 border border-official/20">
                                             <Lock size={20} />
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold font-playfair text-zinc-900 mb-1">
                                             Unlock Curriculum
                                        </h3>

                                        <p className="text-xs sm:text-sm text-zinc-500 font-urbanist mb-3 leading-snug">
                                             Enter your details below to instantly unlock all chapters, lessons, and topics.
                                        </p>

                                        <form onSubmit={handleSubmit} className="text-left space-y-2.5">
                                             <div className="space-y-1">
                                                  <label className="text-[11px] sm:text-xs font-semibold text-zinc-600 font-urbanist">Name</label>
                                                  <input
                                                       type="text"
                                                       value={name}
                                                       onChange={(e) => setName(e.target.value)}
                                                       placeholder="Enter your full name"
                                                       className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 focus:border-official focus:ring-1 focus:ring-official outline-none text-xs sm:text-sm transition font-urbanist bg-zinc-50/50"
                                                  />
                                             </div>

                                             <div className="space-y-1">
                                                  <label className="text-[11px] sm:text-xs font-semibold text-zinc-600 font-urbanist">Email Address</label>
                                                  <input
                                                       type="email"
                                                       value={email}
                                                       onChange={(e) => setEmail(e.target.value)}
                                                       placeholder="Enter your email address"
                                                       className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 focus:border-official focus:ring-1 focus:ring-official outline-none text-xs sm:text-sm transition font-urbanist bg-zinc-50/50"
                                                  />
                                             </div>

                                             <div className="space-y-1">
                                                  <label className="text-[11px] sm:text-xs font-semibold text-zinc-600 font-urbanist">Mobile Number</label>
                                                  <input
                                                       type="tel"
                                                       value={phone}
                                                       onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                       placeholder="Enter 10-digit mobile number"
                                                       maxLength={10}
                                                       className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 focus:border-official focus:ring-1 focus:ring-official outline-none text-xs sm:text-sm transition font-urbanist bg-zinc-50/50"
                                                  />
                                             </div>

                                             {error && (
                                                  <p className="text-xs font-medium text-red-500 mt-1 bg-red-50 p-2 rounded-lg border border-red-100 font-urbanist">
                                                       {error}
                                                  </p>
                                             )}

                                             <label className="flex items-start gap-2 text-[11px] sm:text-xs text-zinc-500 select-none font-urbanist pt-1">
                                                  <input
                                                       type="checkbox"
                                                       defaultChecked
                                                       className="mt-0.5 accent-official shrink-0"
                                                  />
                                                  <span>
                                                       You accept our Terms & Condition, Disclaimer & Privacy Policy by entering your contact information.
                                                  </span>
                                             </label>

                                             <button
                                                  type="submit"
                                                  disabled={loading}
                                                  className="w-full h-10.5 bg-official text-black rounded-xl text-sm font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 font-urbanist mt-3 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 shadow-xs"
                                             >
                                                  {loading ? "Enquiring..." : "Enquire Now"}
                                             </button>
                                        </form>
                                   </>
                              )}
                         </div>
                    </div>
               )}
          </>
     );
}
