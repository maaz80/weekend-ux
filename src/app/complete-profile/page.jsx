"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronDown, ClipboardCheck, GraduationCap, Loader2, MapPin, UserRound } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { updateUserProfile } from "@/utils/auth";

const steps = [
     { title: "Personal", icon: UserRound },
     { title: "Professional", icon: GraduationCap },
     { title: "Terms", icon: ClipboardCheck },
     { title: "Review", icon: Check },
];

const emptyProfile = {
     title: "",
     firstName: "",
     lastName: "",
     gender: "",
     dateOfBirth: "",
     mobileNumber: "",
     country: "",
     streetAddress: "",
     city: "",
     postalCode: "",
     citizenship: "",
     workExperience: "",
     linkedinProfile: "",
     highestDegree: "",
     degreeInstitution: "",
     graduationMonthYear: "",
};

const inputClass = "mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-neutral outline-none transition placeholder:text-zinc-400 focus:border-official focus:ring-2 focus:ring-official/30";

function Field({ label, name, value, onChange, required = true, type = "text", placeholder, children, ...props }) {
     return (
          <label className="block text-sm font-semibold text-neutral">
               {label}{required && <span className="ml-1 text-[#f36600]">*</span>}
               {children || (
                    <input
                         className={inputClass}
                         name={name}
                         type={type}
                         value={value}
                         onChange={onChange}
                         required={required}
                         placeholder={placeholder}
                         {...props}
                    />
               )}
          </label>
     );
}

function CustomSelectField({ label, name, value, onChange, options, placeholder = "Select an option", required = true }) {
     const [isOpen, setIsOpen] = useState(false);
     const containerRef = useRef(null);

     useEffect(() => {
          if (!isOpen) return;
          const handlePointerDown = (event) => {
               if (containerRef.current && !containerRef.current.contains(event.target)) {
                    setIsOpen(false);
               }
          };
          const handleKeyDown = (event) => {
               if (event.key === "Escape") setIsOpen(false);
          };
          document.addEventListener("pointerdown", handlePointerDown);
          document.addEventListener("keydown", handleKeyDown);
          return () => {
               document.removeEventListener("pointerdown", handlePointerDown);
               document.removeEventListener("keydown", handleKeyDown);
          };
     }, [isOpen]);

     const handleSelect = (option) => {
          onChange({ target: { name, value: option } });
          setIsOpen(false);
     };

     return (
          <div ref={containerRef} className="relative block text-sm font-semibold text-neutral">
               <span>
                    {label}{required && <span className="ml-1 text-[#f36600]">*</span>}
               </span>
               <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={`mt-2 flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm transition outline-none cursor-pointer ${
                         isOpen
                              ? "border-official ring-2 ring-official/30 shadow-sm"
                              : "border-zinc-200 hover:border-zinc-300"
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
               >
                    <span className={!value ? "text-zinc-400 font-normal" : "text-neutral font-medium"}>
                         {value || placeholder}
                    </span>
                    <ChevronDown
                         size={17}
                         className={`text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-black" : ""}`}
                    />
               </button>

               {isOpen && (
                    <div
                         role="listbox"
                         className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-60 overflow-y-auto rounded-2xl border border-zinc-200/80 bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-150"
                         style={{ scrollbarWidth: "thin" }}
                    >
                         {options.map((option) => {
                              const isSelected = value === option;
                              return (
                                   <div
                                        key={option}
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => handleSelect(option)}
                                        className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer select-none ${
                                             isSelected
                                                  ? "bg-official text-black font-bold"
                                                  : "text-neutral hover:bg-official/20 hover:text-black"
                                        }`}
                                   >
                                        <span>{option}</span>
                                        {isSelected && <Check size={16} className="text-black" />}
                                   </div>
                              );
                         })}
                    </div>
               )}
          </div>
     );
}

function DateField({ label, name, value, onChange, required = true, type = "date", placeholder, max, min }) {
     const inputRef = useRef(null);

     const handleTrigger = () => {
          if (inputRef.current) {
               try {
                    if (typeof inputRef.current.showPicker === "function") {
                         inputRef.current.showPicker();
                    } else {
                         inputRef.current.focus();
                    }
               } catch (e) {
                    inputRef.current.focus();
               }
          }
     };

     return (
          <label className="block text-sm font-semibold text-neutral">
               {label}{required && <span className="ml-1 text-[#f36600]">*</span>}
               <div
                    onClick={handleTrigger}
                    className="relative mt-2 cursor-pointer group"
               >
                    <input
                         ref={inputRef}
                         type={type}
                         name={name}
                         value={value}
                         onChange={onChange}
                         required={required}
                         max={max}
                         min={min}
                         onClick={handleTrigger}
                         placeholder={placeholder}
                         className={`${inputClass} date-full-clickable cursor-pointer pr-11 font-medium ${!value ? "text-zinc-400" : "text-neutral"}`}
                    />
                    <div
                         onClick={(e) => {
                              e.stopPropagation();
                              handleTrigger();
                         }}
                         className="pointer-events-auto absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-hover:text-black cursor-pointer"
                    >
                         <Calendar size={18} />
                    </div>
               </div>
          </label>
     );
}

export default function CompleteProfilePage() {
     const { user, refreshUser } = useUserAuth();
     const [profile, setProfile] = useState(emptyProfile);
     const [termsAccepted, setTermsAccepted] = useState(false);
     const [step, setStep] = useState(0);
     const [error, setError] = useState("");
     const [saving, setSaving] = useState(false);
     const [stepLoading, setStepLoading] = useState(false);

     useEffect(() => {
          if (!user) return;
          const existing = user.profileDetails || {};
          const nameParts = (user.name || "").trim().split(/\s+/);
          setProfile((current) => ({
               ...current,
               ...existing,
               firstName: existing.firstName || nameParts.shift() || "",
               lastName: existing.lastName || nameParts.join(" "),
               mobileNumber: existing.mobileNumber || user.phone || "",
          }));
     }, [user]);

     // Smooth scroll to top whenever step changes
     useEffect(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
     }, [step]);

     const handleChange = (event) => {
          const { name, value } = event.target;
          setProfile((current) => ({ ...current, [name]: value }));
          setError("");
     };

     const validateStep = () => {
          const fieldsByStep = [
               ["firstName", "lastName", "gender", "dateOfBirth", "mobileNumber", "country", "streetAddress", "city", "postalCode", "citizenship"],
               ["workExperience", "highestDegree", "degreeInstitution", "graduationMonthYear"],
          ];

          if (step < 2) {
               const incomplete = fieldsByStep[step].find((field) => !profile[field]?.trim());
               if (incomplete) {
                    setError("Please complete all required fields before continuing.");
                    return false;
               }
          }

          if (step === 0 && !/^\d{10}$/.test(profile.mobileNumber)) {
               setError("Enter a valid 10-digit mobile number.");
               return false;
          }

          if (step === 1 && profile.linkedinProfile) {
               try {
                    const linkedinUrl = new URL(profile.linkedinProfile);
                    if (!["http:", "https:"].includes(linkedinUrl.protocol)) throw new Error("Invalid URL");
               } catch {
                    setError("Enter a valid LinkedIn profile URL or leave it blank.");
                    return false;
               }
          }

          if (step === 2 && !termsAccepted) {
               setError("Please accept the applicant terms to continue.");
               return false;
          }

          setError("");
          return true;
     };

     const handleNext = async () => {
          if (!validateStep()) return;
          setError("");
          setStepLoading(true);
          try {
               await new Promise((resolve) => setTimeout(resolve, 300));
               setStep((current) => Math.min(current + 1, steps.length - 1));
          } finally {
               setStepLoading(false);
          }
     };

     const handleSubmit = async (event) => {
          event.preventDefault();
          setError("");
          setSaving(true);
          try {
               await updateUserProfile(profile, termsAccepted);
               await refreshUser();
          } catch (submitError) {
               setError(submitError.message || "We couldn't save your information. Please try again.");
          } finally {
               setSaving(false);
          }
     };

     const renderReview = () => {
          const sections = [
               {
                    title: "Personal information",
                    fields: [
                         ["Name", `${profile.title ? `${profile.title} ` : ""}${profile.firstName} ${profile.lastName}`],
                         ["Gender", profile.gender],
                         ["Date of birth", profile.dateOfBirth],
                         ["Mobile number", profile.mobileNumber],
                         ["Country / region", profile.country],
                         ["Street address", profile.streetAddress],
                         ["City", profile.city],
                         ["Postal code", profile.postalCode],
                         ["Citizenship", profile.citizenship],
                    ],
               },
               {
                    title: "Professional information",
                    fields: [
                         ["Work experience", profile.workExperience],
                         ["LinkedIn profile", profile.linkedinProfile || "Not provided"],
                         ["Highest degree", profile.highestDegree],
                         ["Degree-granting institution", profile.degreeInstitution],
                         ["Graduation month / year", profile.graduationMonthYear],
                    ],
               },
          ];

          return (
               <div className="space-y-5">
                    {sections.map((section) => (
                         <section key={section.title} className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                              <h2 className="mb-4 text-lg font-bold text-neutral">{section.title}</h2>
                              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                                   {section.fields.map(([label, value]) => (
                                        <div key={label}>
                                             <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</dt>
                                             <dd className="mt-1 break-words text-sm font-medium text-neutral">{value || "—"}</dd>
                                        </div>
                                   ))}
                              </dl>
                         </section>
                    ))}
                    <p className="rounded-xl bg-[#fff4df] p-4 text-sm text-neutral-700">
                         By submitting, you confirm that the information above is accurate and agree that Weekend UX may use it to process your application and contact you about it.
                    </p>
               </div>
          );
     };

     const activeStep = steps[step];
     const ActiveIcon = activeStep.icon;

     return (
          <>
               <style dangerouslySetInnerHTML={{
                    __html: `
                    .date-full-clickable {
                         position: relative;
                    }
                    .date-full-clickable::-webkit-calendar-picker-indicator {
                         position: absolute;
                         top: 0;
                         left: 0;
                         right: 0;
                         bottom: 0;
                         width: 100%;
                         height: 100%;
                         opacity: 0;
                         cursor: pointer;
                    }
               `}} />

               <main className="min-h-screen bg-[#fffaf0] px-4 py-8 sm:px-6 sm:py-12">
                    <div className="mx-auto custom-width">
                         <header className="mb-8 text-start md:text-center mt-12 md:mt-20">
                              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral sm:text-4xl">Complete your application</h1>
                              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600">
                                   Add a few details so our team can understand your background and support your application.
                              </p>
                         </header>

                         <nav aria-label="Application progress" className="mb-6 grid grid-cols-4 gap-2 sm:gap-4">
                              {steps.map((item, index) => {
                                   const StepIcon = item.icon;
                                   return (
                                        <div key={item.title} className={`flex items-center justify-center sm:justify-start gap-2 border-b-2 pb-3 ${index <= step ? "border-official text-neutral font-bold" : "border-zinc-200 text-zinc-400"}`}>
                                             <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${index <= step ? "bg-official text-black" : "bg-zinc-200 text-zinc-500"}`}>
                                                  <StepIcon size={15} className={index <= step ? "text-black" : "text-zinc-500"} />
                                             </span>
                                             <span className="hidden text-xs font-bold sm:block sm:text-sm">{item.title}</span>
                                             <span className="sr-only sm:hidden">{item.title}</span>
                                        </div>
                                   );
                              })}
                         </nav>

                         <form
                              onSubmit={step === steps.length - 1 ? handleSubmit : (event) => { event.preventDefault(); handleNext(); }}
                              className="rounded-3xl border border-[#f0e5d1] bg-white p-5 shadow-[0_20px_70px_rgba(87,58,18,0.08)] sm:p-8"
                         >
                              <div className="mb-6 flex items-start gap-3 border-b border-zinc-100 pb-5">
                                   <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-official text-black">
                                        <ActiveIcon size={21} className="text-black" />
                                   </span>
                                   <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#f36600]">Step {step + 1} of {steps.length}</p>
                                        <h2 className="mt-1 text-xl font-bold text-neutral sm:text-2xl">{activeStep.title}</h2>
                                   </div>
                              </div>

                              {step === 0 && (
                                   <div className="space-y-7">
                                        <section>
                                             <h3 className="mb-4 flex items-center gap-2 font-bold text-neutral"><UserRound size={17} className="text-[#f36600]" /> About you</h3>
                                             <div className="grid gap-4 sm:grid-cols-2">
                                                  <Field label="Title (optional)" name="title" value={profile.title} onChange={handleChange} required={false} placeholder="e.g. Mr., Ms., Dr." />
                                                  <Field label="First name" name="firstName" value={profile.firstName} onChange={handleChange} autoComplete="given-name" placeholder="Enter your first name (e.g. Rahul)" />
                                                  <Field label="Last name" name="lastName" value={profile.lastName} onChange={handleChange} autoComplete="family-name" placeholder="Enter your last name (e.g. Sharma)" />
                                                  <CustomSelectField label="Gender" name="gender" value={profile.gender} onChange={handleChange} placeholder="Select your gender" options={["Female", "Male", "Non-binary", "Prefer not to say", "Other"]} />
                                                  <DateField label="Date of birth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} max={new Date().toISOString().split("T")[0]} placeholder="DD/MM/YYYY" />
                                                  <Field label="Mobile number" name="mobileNumber" value={profile.mobileNumber} onChange={handleChange} type="tel" inputMode="numeric" maxLength={10} autoComplete="tel" placeholder="Enter 10-digit mobile number (e.g. 9876543210)" />
                                             </div>
                                        </section>
                                        <section>
                                             <h3 className="mb-4 flex items-center gap-2 font-bold text-neutral"><MapPin size={17} className="text-[#f36600]" /> Address and citizenship</h3>
                                             <div className="grid gap-4 sm:grid-cols-2">
                                                  <Field label="Country / region" name="country" value={profile.country} onChange={handleChange} autoComplete="country-name" placeholder="e.g. India" />
                                                  <Field label="Street address" name="streetAddress" value={profile.streetAddress} onChange={handleChange} autoComplete="street-address" placeholder="Flat / House no., street, locality" />
                                                  <Field label="City" name="city" value={profile.city} onChange={handleChange} autoComplete="address-level2" placeholder="e.g. New Delhi" />
                                                  <Field label="Postal code" name="postalCode" value={profile.postalCode} onChange={handleChange} autoComplete="postal-code" placeholder="e.g. 110001" />
                                                  <CustomSelectField label="Are you a citizen of this country/region?" name="citizenship" value={profile.citizenship} onChange={handleChange} placeholder="Select Yes or No" options={["Yes", "No"]} />
                                             </div>
                                        </section>
                                   </div>
                              )}

                              {step === 1 && (
                                   <div className="space-y-6">
                                        <section>
                                             <h3 className="mb-4 font-bold text-neutral">Professional background</h3>
                                             <div className="grid gap-4 sm:grid-cols-2">
                                                  <CustomSelectField label="Do you have work experience?" name="workExperience" value={profile.workExperience} onChange={handleChange} placeholder="Select Yes or No" options={["Yes", "No"]} />
                                                  <Field label="LinkedIn profile (optional)" name="linkedinProfile" value={profile.linkedinProfile} onChange={handleChange} required={false} type="url" placeholder="https://www.linkedin.com/in/username" />
                                             </div>
                                        </section>
                                        <section>
                                             <h3 className="mb-4 font-bold text-neutral">Education</h3>
                                             <div className="grid gap-4 sm:grid-cols-2">
                                                  <Field label="Highest degree received" name="highestDegree" value={profile.highestDegree} onChange={handleChange} placeholder="e.g. Bachelor's in Design, B.Tech, BCA" />
                                                  <Field label="Degree-granting institution" name="degreeInstitution" value={profile.degreeInstitution} onChange={handleChange} placeholder="e.g. Delhi University, NIFT, IIT" />
                                                  <DateField label="Graduation month and year" name="graduationMonthYear" value={profile.graduationMonthYear} onChange={handleChange} type="month" placeholder="Select graduation month and year" />
                                             </div>
                                        </section>
                                   </div>
                              )}

                              {step === 2 && (
                                   <div className="space-y-5 text-sm leading-7 text-zinc-700">
                                        <h3 className="text-lg font-bold text-neutral">Applicant terms</h3>
                                        <p>Please review these terms before submitting your application:</p>
                                        <ul className="list-disc space-y-3 pl-5">
                                             <li>You confirm that the information you provide is accurate and complete to the best of your knowledge.</li>
                                             <li>Weekend UX may contact you using the details in this application to discuss your background, application, or relevant learning opportunities.</li>
                                             <li>Your application details will be accessible to authorized Weekend UX team members for application and support purposes.</li>
                                             <li>You may contact Weekend UX if any submitted information needs to be corrected.</li>
                                        </ul>
                                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#f0e5d1] bg-[#fffaf0] p-4 font-semibold text-neutral">
                                             <input
                                                  type="checkbox"
                                                  checked={termsAccepted}
                                                  onChange={(event) => { setTermsAccepted(event.target.checked); setError(""); }}
                                                  className="mt-1 h-4 w-4 accent-official cursor-pointer"
                                             />
                                             <span className="cursor-pointer">I have read and agree to the applicant terms above.</span>
                                        </label>
                                   </div>
                              )}

                              {step === 3 && renderReview()}

                              {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

                              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                   <button
                                        type="button"
                                        onClick={() => {
                                             setError("");
                                             setStep((current) => Math.max(current - 1, 0));
                                        }}
                                        disabled={step === 0 || saving || stepLoading}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer active:scale-95"
                                   >
                                        <ArrowLeft size={16} /> Back
                                   </button>
                                   {step < steps.length - 1 ? (
                                        <button
                                             type="submit"
                                             disabled={stepLoading || saving}
                                             className="inline-flex items-center justify-center gap-2 rounded-xl bg-official px-6 py-3 text-sm font-bold text-black shadow-md shadow-amber-200/50 transition hover:bg-[#ffe033] hover:shadow-lg disabled:cursor-wait disabled:opacity-80 cursor-pointer active:scale-95 min-w-32"
                                        >
                                             {stepLoading ? (
                                                  <>
                                                       <Loader2 size={16} className="animate-spin text-black" />
                                                       <span className="text-black">Continuing…</span>
                                                  </>
                                             ) : (
                                                  <>
                                                       <span className="text-black">Continue</span>
                                                       <ArrowRight size={16} className="text-black" />
                                                  </>
                                             )}
                                        </button>
                                   ) : (
                                        <button
                                             type="submit"
                                             disabled={saving || stepLoading}
                                             className="inline-flex items-center justify-center gap-2 rounded-xl bg-official px-6 py-3 text-sm font-bold text-black shadow-md shadow-amber-200/50 transition hover:bg-[#ffe033] hover:shadow-lg disabled:cursor-wait disabled:opacity-80 cursor-pointer active:scale-95 min-w-44"
                                        >
                                             {saving ? (
                                                  <>
                                                       <Loader2 size={16} className="animate-spin text-black" />
                                                       <span className="text-black">Submitting application…</span>
                                                  </>
                                             ) : (
                                                  <>
                                                       <span className="text-black">Submit application</span>
                                                       <Check size={16} className="text-black" />
                                                  </>
                                             )}
                                        </button>
                                   )}
                              </div>
                         </form>
                         <p className="mt-5 text-center text-xs text-zinc-500">Your information is securely associated with your Weekend UX account.</p>
                    </div>
               </main>
          </>
     );
}
