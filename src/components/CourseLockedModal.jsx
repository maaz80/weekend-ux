"use client";

import { Lock, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseLockedModal({ isOpen, onClose, course }) {
     const router = useRouter();

     if (!isOpen) return null;

     const courseTitle = course?.title || course?.name || "this course";

     const handleEnquire = () => {
          onClose();
          router.push("/contact-us");
     };

     return (
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
               <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative border border-zinc-100 text-center space-y-5">
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition p-1 rounded-full hover:bg-zinc-100"
                    >
                         <X size={20} />
                    </button>

                    <div className="w-16 h-16 bg-official/20 text-official rounded-full flex items-center justify-center mx-auto border border-official/30 shadow-inner">
                         <Lock size={32} />
                    </div>

                    <div className="space-y-2">
                         <h3 className="text-xl font-bold text-zinc-900">
                              Course Locked
                         </h3>
                         <p className="text-xs font-semibold text-zinc-900 bg-official/20 px-3 py-1 rounded-full inline-block border border-official/30">
                              {courseTitle}
                         </p>
                         <p className="text-sm text-zinc-600 leading-relaxed pt-2">
                              This course is locked for your account. To buy and unlock full access, please enquire with our team.
                         </p>
                    </div>

                    <div className="pt-2">
                         <button
                              onClick={handleEnquire}
                              className="w-full py-3.5 bg-official hover:bg-official/90 text-zinc-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                         >
                              Enquire Now
                         </button>
                    </div>
               </div>
          </div>
     );
}
