"use client";

import { useState } from "react";
import {
     X,
     ExternalLink,
     Copy,
     Check,
     Radio,
     Key,
     Hash,
     Clock,
     FileText
} from "lucide-react";

export default function ZoomMeetingModal({ liveClass, courseTitle, onClose }) {
     const [copiedId, setCopiedId] = useState(false);
     const [copiedPass, setCopiedPass] = useState(false);
     const [notification, setNotification] = useState("");

     if (!liveClass) return null;

     const {
          meetUrl = "",
          zoomMeetingId = "",
          passcode = "",
          title = "Live Zoom Session",
          scheduledAt = "Live Now",
          instructions = "",
     } = liveClass;

     // Auto-extract Meeting ID and Passcode if missing from raw meetUrl
     let effectiveId = zoomMeetingId;
     let effectivePasscode = passcode;

     if (meetUrl) {
          if (!effectiveId) {
               const idMatch = meetUrl.match(/\/(?:j|wc\/join)\/(\d+)/);
               if (idMatch && idMatch[1]) effectiveId = idMatch[1];
          }
          if (!effectivePasscode) {
               const pwdMatch = meetUrl.match(/[?&]pwd=([^&]+)/);
               if (pwdMatch && pwdMatch[1]) effectivePasscode = pwdMatch[1];
          }
     }

     const triggerNotice = (msg) => {
          setNotification(msg);
          setTimeout(() => setNotification(""), 3000);
     };

     const handleCopy = (text, type) => {
          if (!text) return;
          navigator.clipboard.writeText(text);
          if (type === "id") {
               setCopiedId(true);
               setTimeout(() => setCopiedId(false), 2000);
               triggerNotice("Meeting ID copied to clipboard!");
          } else {
               setCopiedPass(true);
               setTimeout(() => setCopiedPass(false), 2000);
               triggerNotice("Passcode copied to clipboard!");
          }
     };

     const handleJoinMeeting = () => {
          if (meetUrl) {
               window.open(meetUrl, "_blank", "noopener,noreferrer");
          } else {
               triggerNotice("Zoom link unavailable.");
          }
     };

     return (
          <div className="fixed inset-0 z-999999 bg-black/65 backdrop-blur-md sm:backdrop-blur-xl flex items-center justify-center p-3 font-urbanist animate-fadeIn">

               <div className="bg-zinc-950 text-white border border-zinc-800 shadow-2xl rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[92dvh] overflow-y-auto flex flex-col relative p-4 sm:p-6 space-y-5">

                    {/* TOP HEADER */}
                    <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-4">
                         <div className="space-y-1.5 min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                   <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold bg-official/20 text-official border border-official/30 uppercase tracking-wider">
                                        <Radio size={12} className="animate-pulse text-official" />
                                        Live Zoom Class
                                   </span>
                                   <span className="text-xs font-semibold text-zinc-400 truncate">
                                        {courseTitle || "UI/UX Program"}
                                   </span>
                              </div>
                              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                                   {title}
                              </h2>
                         </div>

                         <button
                              onClick={onClose}
                              className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer shrink-0 border border-zinc-700/60"
                              aria-label="Close"
                         >
                              <X size={18} />
                         </button>
                    </div>

                    {/* NOTIFICATION TOAST */}
                    {notification && (
                         <div className="bg-official text-zinc-950 px-3.5 py-2 rounded-xl text-xs font-bold text-center border border-official/80 animate-bounce">
                              {notification}
                         </div>
                    )}

                    {/* DETAILS & CREDENTIALS CONTAINER */}
                    <div className="space-y-3.5 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-5">

                         {/* SCHEDULED TIME */}
                         <div className="flex items-center justify-between text-xs border-b border-zinc-800/80 pb-3">
                              <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                                   <Clock size={14} className="text-official" />
                                   Scheduled Time:
                              </span>
                              <span className="font-bold text-official text-xs sm:text-sm">
                                   {scheduledAt || "Live Now"}
                              </span>
                         </div>

                         {/* CREDENTIALS GRID */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                              {effectiveId && (
                                   <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/90 flex flex-col justify-between gap-1.5">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                             <Hash size={11} className="text-official" />
                                             Meeting ID
                                        </span>
                                        <div className="flex items-center justify-between gap-1">
                                             <span className="font-mono font-bold text-sm text-white">{effectiveId}</span>
                                             <button
                                                  onClick={() => handleCopy(effectiveId, "id")}
                                                  className="text-official hover:text-official/80 p-1 cursor-pointer"
                                                  title="Copy Meeting ID"
                                             >
                                                  {copiedId ? <Check size={14} /> : <Copy size={14} />}
                                             </button>
                                        </div>
                                   </div>
                              )}

                              {effectivePasscode && (
                                   <div className="bg-zinc-950 p-3 rounded-xl border border-official/30 flex flex-col justify-between gap-1.5">
                                        <span className="text-[10px] font-bold text-official uppercase tracking-wider flex items-center gap-1">
                                             <Key size={11} className="text-official" />
                                             Passcode
                                        </span>
                                        <div className="flex items-center justify-between gap-1">
                                             <span className="font-mono font-bold text-sm text-zinc-200">{effectivePasscode}</span>
                                             <button
                                                  onClick={() => handleCopy(effectivePasscode, "pass")}
                                                  className="text-official hover:text-official/80 p-1 cursor-pointer"
                                                  title="Copy Passcode"
                                             >
                                                  {copiedPass ? <Check size={14} /> : <Copy size={14} />}
                                             </button>
                                        </div>
                                   </div>
                              )}
                         </div>

                         {/* INSTRUCTOR INSTRUCTIONS */}
                         {instructions && (
                              <div className="pt-2 border-t border-zinc-800/80 space-y-1">
                                   <span className="text-[10px] font-bold text-official uppercase tracking-wider flex items-center gap-1">
                                        <FileText size={11} className="text-official" />
                                        Instructions
                                   </span>
                                   <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                                        {instructions}
                                   </p>
                              </div>
                         )}
                    </div>

                    {/* SINGLE PRIMARY JOIN BUTTON */}
                    <div className="pt-1 space-y-2">
                         <button
                              onClick={handleJoinMeeting}
                              className="w-full py-3.5 px-5 bg-official hover:bg-official/90 text-zinc-950 font-extrabold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                         >
                              <ExternalLink size={18} />
                              <span>Join Zoom Live Class</span>
                         </button>

                         <p className="text-[11px] text-center text-zinc-500 font-medium">
                              Clicking join will open the Zoom meeting link directly in your Zoom app or browser.
                         </p>
                    </div>

               </div>
          </div>
     );
}
