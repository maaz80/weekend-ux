'use client';

import React, { useState, useEffect, useRef } from "react";
import { Send, X, RotateCcw, Check, Calendar, Phone, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/weekend-ux-logo.webp";
import { useHomeData } from "@/context/HomeDataContext";

// Classify primary welcome selection into core categories
const getPrimaryCategory = (serviceText) => {
     if (!serviceText) return "Courses";
     const text = serviceText.toLowerCase();
     if (text.includes("agency") || text.includes("website design") || text.includes("mobile app ui") || text.includes("brand")) {
          return "Agency Services";
     }
     if (text.includes("mentorship") || text.includes("portfolio") || text.includes("career")) {
          return "Mentorship & Career";
     }
     return "Courses";
};

// Compile dynamic question queue based on selected welcome service
const compileFullQueue = (currentAnswers) => {
     const category = getPrimaryCategory(currentAnswers.welcome_service);

     let fullQueue = [
          {
               id: "objective",
               question: "Step 1 — What is your primary objective?",
               type: "single",
               options: category === "Agency Services"
                    ? [
                         "Redesign Outdated Site/App",
                         "Build New Website / Web App",
                         "Create Mobile App (iOS/Android)",
                         "Improve Product UX & Conversion",
                         "Other"
                    ]
                    : category === "Mentorship & Career"
                         ? [
                              "Switch Career to UX Design",
                              "Get Portfolio Reviewed by Experts",
                              "1-on-1 Industry Mentorship",
                              "Prepare for Job Interviews"
                         ]
                         : [
                              "Learn UI/UX Design from Scratch",
                              "Switch Career to UX Design",
                              "Master AI Design Tools",
                              "Build an Industry Portfolio",
                              "Other"
                         ]
          },
          {
               id: "profile_type",
               question: "Step 2 — Tell us about yourself or your organization:",
               type: "single",
               options: [
                    "Student / Fresh Graduate",
                    "Working Professional / Designer",
                    "Startup Founder",
                    "Small / Medium Business",
                    "Enterprise / Corporate"
               ]
          },
          {
               id: "add_ons",
               question: "Step 3 — Select any add-on topics or services you are interested in: (Select all that apply)",
               type: "multi",
               options: [
                    "1-on-1 Mentorship",
                    "Placement Assistance",
                    "Figma & AI Masterclass",
                    "Design System Creation",
                    "Frontend Development (React/Next)",
                    "None"
               ]
          }
     ];

     // Dynamic Follow-ups based on Category
     if (category === "Agency Services") {
          fullQueue.push({
               id: "has_website",
               question: "Do you currently have an existing website or mobile app?",
               type: "single",
               options: ["Yes", "No", "Under Development"]
          });

          fullQueue.push({
               id: "project_budget",
               question: "What is your estimated project budget?",
               type: "single",
               options: ["Under ₹50,000", "₹50,000 – ₹1.5 Lakhs", "₹1.5 – ₹3 Lakhs", "₹3 Lakhs+"]
          });
     } else {
          fullQueue.push({
               id: "learning_mode",
               question: "What is your preferred mode of learning?",
               type: "single",
               options: ["Weekend Live Online Batches", "Self-Paced with Mentor Support", "Classroom / Offline Bootcamps"]
          });

          fullQueue.push({
               id: "start_timeline",
               question: "When do you plan to start your learning journey?",
               type: "single",
               options: ["Immediate Batch", "Next Month", "Within 3 Months", "Just Exploring"]
          });
     }

     // Contact Info Collection
     fullQueue.push({
          id: "contact_name",
          question: "What's your full name?",
          type: "text",
          placeholder: "Your Full Name"
     });

     fullQueue.push({
          id: "contact_email",
          question: "What's your email address?",
          type: "email",
          placeholder: "name@company.com"
     });

     fullQueue.push({
          id: "contact_phone",
          question: "What's your phone number?",
          type: "tel",
          placeholder: "10-digit mobile number"
     });

     // Free Consultation Call
     fullQueue.push({
          id: "consultation",
          question: "Would you like to schedule a FREE 1-on-1 consultation call with a UX Expert?",
          type: "single",
          options: ["Yes, Schedule Call", "No, Just Send Details"]
     });

     return fullQueue;
};

export default function Chatbot({
     chatBgColor = "bg-white",
     headerBgColor = "bg-official",
     headerTextColor = "text-zinc-950",
     headerSubtextColor = "text-zinc-800",
     closeButtonColor = "text-zinc-950 hover:text-zinc-700",
     botBubbleClass = "bg-white text-neutral border border-zinc-200",
     userBubbleClass = "bg-official text-neutral font-medium",
     quickQuestionClass = "border-zinc-200 text-neutral bg-white hover:bg-linear-to-r hover:from-zinc-800 hover:to-zinc-900 hover:text-white hover:border-zinc-800",
     inputBgClass = "bg-zinc-50 border border-zinc-200 focus-within:border-official",
     sendButtonColor = "text-zinc-400 hover:text-official",
}) {
     const { isChatbotOpen, setIsChatbotOpen, navbarData } = useHomeData();

     const [queue, setQueue] = useState([]);
     const [queueIndex, setQueueIndex] = useState(-1);
     const [answers, setAnswers] = useState({});
     const [tempSelections, setTempSelections] = useState([]);
     const [inputError, setInputError] = useState("");
     const [input, setInput] = useState("");
     const [isTyping, setIsTyping] = useState(false);

     const initialWelcomeMessage = {
          id: "welcome",
          text: "👋 Welcome to Weekend UX!\n\nWe offer industry-leading UI/UX Design Courses, Mentorship & Agency Design Solutions. How can we help you today?",
          isBot: true,
          senderName: "Weekend UX Bot",
          timestamp: "Just now",
          options: [
               "🎓 UI/UX Design Course",
               "💻 Product Design & AI",
               "🌐 Website Design & Dev",
               "📱 Mobile App Design & Dev",
               "✨ Brand Identity & Audit",
               "🎯 Career Mentorship",
               "🤝 Talk to UX Advisor"
          ],
          isWelcomeCard: true
     };

     const [messages, setMessages] = useState([initialWelcomeMessage]);
     const chatEndRef = useRef(null);

     const hasLogoImage = navbarData?.logo?.image && navbarData.logo.image.trim();

     const scrollToBottom = () => {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
     };

     useEffect(() => {
          scrollToBottom();
     }, [messages, isTyping]);

     const sendLeadData = async (leadAnswers) => {
          try {
               await fetch("/api/lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         name: leadAnswers.contact_name || "Chatbot Lead",
                         email: leadAnswers.contact_email || "no-email@provided.com",
                         answers: leadAnswers
                    })
               });
          } catch (error) {
               console.error("Error submitting chatbot lead:", error);
          }
     };

     const handleOptionClick = (questionId, optionValue, isWelcomeCard = false) => {
          setInputError("");
          const userMsg = {
               id: Date.now().toString(),
               text: optionValue,
               isBot: false,
               timestamp: "Just now"
          };

          setMessages(prev => [...prev, userMsg]);

          // Disable options on completed message
          setMessages(prev => prev.map(m => {
               if (m.questionId === questionId || (isWelcomeCard && m.isWelcomeCard)) {
                    return { ...m, options: null };
               }
               return m;
          }));

          setIsTyping(true);

          setTimeout(() => {
               setIsTyping(false);

               let updatedAnswers = isWelcomeCard
                    ? { ...answers, welcome_service: optionValue }
                    : { ...answers, [questionId]: optionValue };

               setAnswers(updatedAnswers);

               let nextIndex = queueIndex + 1;
               let nextQueue = [...queue];

               if (isWelcomeCard) {
                    nextQueue = compileFullQueue(updatedAnswers);
                    setQueue(nextQueue);
                    nextIndex = 0;
               }

               // Dynamic Injection: If website exists, prompt for website URL
               if (questionId === "has_website" && optionValue === "Yes") {
                    nextQueue.splice(nextIndex, 0, {
                         id: "website_url",
                         question: "What is your current website or app URL?",
                         type: "text",
                         placeholder: "e.g. https://mybrand.com"
                    });
                    setQueue(nextQueue);
               }

               // Dynamic Injection: If user requested consultation call, prompt for datetime
               if (questionId === "consultation" && optionValue === "Yes, Schedule Call") {
                    nextQueue.splice(nextIndex, 0, {
                         id: "consultation_datetime",
                         question: "Select your preferred Date & Time for the consultation call:",
                         type: "datetime-local"
                    });
                    setQueue(nextQueue);
               }

               setQueueIndex(nextIndex);

               if (nextIndex < nextQueue.length) {
                    const nextQuestion = nextQueue[nextIndex];
                    const botMsg = {
                         id: `bot_${nextQuestion.id}`,
                         questionId: nextQuestion.id,
                         text: nextQuestion.question,
                         isBot: true,
                         senderName: "Weekend UX Bot",
                         timestamp: "Just now",
                         options: nextQuestion.options,
                         multiSelect: nextQuestion.type === "multi",
                         inputType: ["text", "email", "tel", "url", "datetime-local"].includes(nextQuestion.type) ? nextQuestion.type : null,
                         placeholder: nextQuestion.placeholder || ""
                    };
                    setMessages(prev => [...prev, botMsg]);
               } else {
                    const exitMsg = {
                         id: "exit_card",
                         text: "🎉 Thank you! Based on your answers, a Weekend UX specialist will review your details and reach out to you shortly.",
                         isBot: true,
                         senderName: "Weekend UX Bot",
                         timestamp: "Just now",
                         isExitCard: true
                    };
                    setMessages(prev => [...prev, exitMsg]);
                    sendLeadData(updatedAnswers);
               }
          }, 600);
     };

     const handleMultiOptionToggle = (opt) => {
          setTempSelections(prev =>
               prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
          );
     };

     const handleMultiSubmit = (questionId, selectedValues) => {
          if (selectedValues.length === 0) return;
          setInputError("");

          const userText = selectedValues.join(", ");
          const userMsg = { id: Date.now().toString(), text: userText, isBot: false, timestamp: "Just now" };
          setMessages(prev => [...prev, userMsg]);

          setMessages(prev => prev.map(m => {
               if (m.questionId === questionId) {
                    return { ...m, options: null, multiSelect: false };
               }
               return m;
          }));

          setIsTyping(true);

          setTimeout(() => {
               setIsTyping(false);

               const updatedAnswers = { ...answers, [questionId]: selectedValues };
               setAnswers(updatedAnswers);

               let nextIndex = queueIndex + 1;
               let nextQueue = [...queue];

               setQueueIndex(nextIndex);

               if (nextIndex < nextQueue.length) {
                    const nextQuestion = nextQueue[nextIndex];
                    const botMsg = {
                         id: `bot_${nextQuestion.id}`,
                         questionId: nextQuestion.id,
                         text: nextQuestion.question,
                         isBot: true,
                         senderName: "Weekend UX Bot",
                         timestamp: "Just now",
                         options: nextQuestion.options,
                         multiSelect: nextQuestion.type === "multi",
                         inputType: ["text", "email", "tel", "url", "datetime-local"].includes(nextQuestion.type) ? nextQuestion.type : null,
                         placeholder: nextQuestion.placeholder || ""
                    };
                    setMessages(prev => [...prev, botMsg]);
               } else {
                    const exitMsg = {
                         id: "exit_card",
                         text: "🎉 Thank you! Based on your answers, a Weekend UX specialist will review your details and reach out to you shortly.",
                         isBot: true,
                         senderName: "Weekend UX Bot",
                         timestamp: "Just now",
                         isExitCard: true
                    };
                    setMessages(prev => [...prev, exitMsg]);
                    sendLeadData(updatedAnswers);
               }
          }, 600);
     };

     const handleInputSubmit = (questionId, inputValue) => {
          setInputError("");
          const userMsg = { id: Date.now().toString(), text: inputValue, isBot: false, timestamp: "Just now" };
          setMessages(prev => [...prev, userMsg]);

          setMessages(prev => prev.map(m => {
               if (m.questionId === questionId) {
                    return { ...m, inputType: null };
               }
               return m;
          }));

          setIsTyping(true);

          setTimeout(() => {
               setIsTyping(false);

               const updatedAnswers = { ...answers, [questionId]: inputValue };
               setAnswers(updatedAnswers);

               let nextIndex = queueIndex + 1;
               let nextQueue = [...queue];

               setQueueIndex(nextIndex);

               if (nextIndex < nextQueue.length) {
                    const nextQuestion = nextQueue[nextIndex];
                    const botMsg = {
                         id: `bot_${nextQuestion.id}`,
                         questionId: nextQuestion.id,
                         text: nextQuestion.question,
                         isBot: true,
                         senderName: "Weekend UX Bot",
                         timestamp: "Just now",
                         options: nextQuestion.options,
                         multiSelect: nextQuestion.type === "multi",
                         inputType: ["text", "email", "tel", "url", "datetime-local"].includes(nextQuestion.type) ? nextQuestion.type : null,
                         placeholder: nextQuestion.placeholder || ""
                    };
                    setMessages(prev => [...prev, botMsg]);
               } else {
                    const exitMsg = {
                         id: "exit_card",
                         text: "🎉 Thank you! Based on your answers, a Weekend UX specialist will review your details and reach out to you shortly.",
                         isBot: true,
                         senderName: "Weekend UX Bot",
                         timestamp: "Just now",
                         isExitCard: true
                    };
                    setMessages(prev => [...prev, exitMsg]);
                    sendLeadData(updatedAnswers);
               }
          }, 600);
     };

     const validateInputText = (type, val) => {
          if (!val.trim()) return "Input cannot be empty.";
          if (type === "email") {
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               if (!emailRegex.test(val)) return "Please enter a valid email address.";
          } else if (type === "url") {
               if (!val.includes(".")) return "Please enter a valid website URL.";
          } else if (type === "tel") {
               const cleanNum = val.replace(/[^0-9]/g, "");
               if (cleanNum.length < 10) return "Phone number must be at least 10 digits.";
          }
          return null;
     };

     const sendMessage = () => {
          if (!input.trim() || isTyping) return;

          const currentQuestion = queueIndex >= 0 && queueIndex < queue.length ? queue[queueIndex] : null;

          if (currentQuestion && ["text", "email", "tel", "url"].includes(currentQuestion.type)) {
               const errorMsg = validateInputText(currentQuestion.type, input);
               if (errorMsg) {
                    setInputError(errorMsg);
                    return;
               }
               setInputError("");
               handleInputSubmit(currentQuestion.id, input);
               setInput("");
          }
     };

     const resetChat = () => {
          setAnswers({});
          setQueue([]);
          setQueueIndex(-1);
          setTempSelections([]);
          setInputError("");
          setInput("");
          setMessages([initialWelcomeMessage]);
     };

     const currentQuestion = queueIndex >= 0 && queueIndex < queue.length ? queue[queueIndex] : null;
     const isInputDisabled = !currentQuestion || !["text", "email", "tel", "url"].includes(currentQuestion.type);

     let inputPlaceholder = "Write your reply...";
     if (currentQuestion) {
          if (currentQuestion.type === "text") inputPlaceholder = currentQuestion.placeholder || "Type your response...";
          else if (currentQuestion.type === "email") inputPlaceholder = "Enter your email address...";
          else if (currentQuestion.type === "tel") inputPlaceholder = "Enter 10-digit mobile number...";
          else if (currentQuestion.type === "url") inputPlaceholder = "Enter website URL...";
          else if (currentQuestion.type === "datetime-local") inputPlaceholder = "Select date & time below...";
          else if (currentQuestion.type === "single" || currentQuestion.type === "multi") inputPlaceholder = "Select an option above...";
     } else if (queueIndex === -1) {
          inputPlaceholder = "Select an option above...";
     } else {
          inputPlaceholder = "Chat completed.";
     }

     return (
          <div
               className={`fixed right-4 md:right-10 z-99998 w-[calc(100%-2rem)] sm:w-100 h-135 max-h-[calc(100vh-120px)] ${chatBgColor} rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out select-none border border-zinc-200/80 ${isChatbotOpen
                         ? "bottom-14 translate-y-0 opacity-100 pointer-events-auto"
                         : "bottom-0 translate-y-[calc(100%+56px)] opacity-0 pointer-events-none"
                    }`}
          >
               {/* HEADER */}
               <div className={`${headerBgColor} px-4 py-3 flex items-center justify-between border-b border-official/20`}>
                    <div className="flex items-center gap-3">
                         <div className="w-9 h-9 p-2 rounded-full bg-white flex items-center justify-center  shrink-0 overflow-hidden shadow-sm border border-zinc-200">
                              {hasLogoImage ? (
                                   <img
                                        src={navbarData.logo.image.trim()}
                                        alt="Logo"
                                        className="w-full h-full object-contain"
                                   />
                              ) : (
                                   <Image
                                        src={Logo}
                                        alt="Weekend UX Logo"
                                        className="w-full h-full object-contain"
                                   />
                              )}
                         </div>
                         <div className="flex flex-col text-left">
                              <span className={`${headerTextColor} text-lg leading-tight font-bold`}>Weekend UX Assistant</span>
                              <span className={`${headerSubtextColor} text-[11px] leading-tight mt-0.5 font-medium flex items-center gap-1.5`}>
                                   <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                                   Online • Typically replies instantly
                              </span>
                         </div>
                    </div>
                    <div className="flex items-center gap-1">
                         {messages.length > 1 && (
                              <button
                                   onClick={resetChat}
                                   className={`${closeButtonColor} p-1.5 rounded-full cursor-pointer transition-colors`}
                                   title="Reset Conversation"
                                   aria-label="Reset chat"
                              >
                                   <RotateCcw size={16} />
                              </button>
                         )}
                         <button
                              onClick={() => setIsChatbotOpen(false)}
                              className={`${closeButtonColor} transition-all duration-300 hover:rotate-90 p-1.5 rounded-full cursor-pointer`}
                              aria-label="Close chat"
                         >
                              <X size={18} strokeWidth={2.5} />
                         </button>
                    </div>
               </div>

               {/* CHAT BODY */}
               <div className="flex-1 overflow-y-auto p-4 bg-zinc-50/60 flex flex-col gap-3 scrollbar-thin">
                    {messages.map((m, i) => {
                         const showAvatar = m.isBot && (i === 0 || !messages[i - 1]?.isBot);

                         return (
                              <div key={m.id || i} className={`flex flex-col ${m.isBot ? "items-start" : "items-end"} w-full`}>
                                   {/* Avatar Header for Bot */}
                                   {showAvatar && (
                                        <div className="flex items-center gap-2 mb-1">
                                             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 shadow-xs border border-zinc-200 overflow-hidden">
                                                  {hasLogoImage ? (
                                                       <img src={navbarData.logo.image.trim()} alt="Logo" className="w-full h-full object-contain" />
                                                  ) : (
                                                       <Image src={Logo} alt="Logo" className="w-full h-full object-contain" />
                                                  )}
                                             </div>
                                             <span className="text-[11px] font-bold text-neutral-800">{m.senderName || "Weekend UX Bot"}</span>
                                        </div>
                                   )}

                                   {/* Exit Card Layout */}
                                   {m.isExitCard ? (
                                        <div className="w-full space-y-3 mt-1">
                                             <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3.5 text-xs text-neutral space-y-2.5 shadow-xs text-left">
                                                  <p className="font-bold text-neutral text-sm flex items-center gap-1.5">
                                                       🎉 Thank You!
                                                  </p>
                                                  <p className="text-zinc-700 leading-relaxed">
                                                       Based on your answers, a Weekend UX advisor will review your requirement and reach out shortly.
                                                  </p>
                                                  <div className="text-xs space-y-1.5 pt-2 border-t border-amber-200/60 text-zinc-800">
                                                       <div className="flex items-center gap-2">
                                                            <Phone size={13} className="text-neutral shrink-0" />
                                                            <span>Call: </span>
                                                            <a href="tel:+919599272764" className="font-semibold underline hover:text-official transition-colors">+91 95992 72764</a>
                                                       </div>
                                                       <div className="flex items-center gap-2">
                                                            <Mail size={13} className="text-neutral shrink-0" />
                                                            <span>Email: </span>
                                                            <a href="mailto:support@weekendux.in" className="font-semibold underline hover:text-official transition-colors">support@weekendux.in</a>
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className="w-full text-left">
                                                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Quick Actions:</p>
                                                  <div className="grid grid-cols-2 gap-1.5">
                                                       <button
                                                            onClick={resetChat}
                                                            className="bg-white hover:bg-linear-to-r hover:from-zinc-800 hover:to-zinc-900 hover:text-white text-neutral text-[11px] py-2 px-2.5 rounded-md font-semibold cursor-pointer transition-all border border-zinc-200 hover:border-zinc-800 text-center shadow-xs flex items-center justify-center gap-1.5"
                                                       >
                                                            <RotateCcw size={13} />
                                                            Restart Chat
                                                       </button>
                                                       <a
                                                            href="mailto:support@weekendux.in?subject=Inquiry from Chatbot"
                                                            className="bg-white hover:bg-linear-to-r hover:from-zinc-800 hover:to-zinc-900 hover:text-white text-neutral text-[11px] py-2 px-2.5 rounded-md font-semibold cursor-pointer transition-all border border-zinc-200 hover:border-zinc-800 text-center shadow-xs flex items-center justify-center gap-1.5"
                                                       >
                                                            <Calendar size={13} />
                                                            Book Call
                                                       </a>
                                                       <Link
                                                            href="/courses"
                                                            className="bg-white hover:bg-linear-to-r hover:from-zinc-800 hover:to-zinc-900 hover:text-white text-neutral text-[11px] py-2 px-2.5 rounded-md font-semibold cursor-pointer transition-all border border-zinc-200 hover:border-zinc-800 text-center shadow-xs flex items-center justify-center gap-1.5"
                                                       >
                                                            Explore Courses
                                                       </Link>
                                                       <a
                                                            href="https://wa.me/919599272764?text=Hi%20Weekend%20UX"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] py-2 px-2.5 rounded-md font-semibold cursor-pointer transition-all text-center shadow-xs flex items-center justify-center gap-1.5"
                                                       >
                                                            <MessageSquare size={13} />
                                                            WhatsApp Us
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   ) : (
                                        /* Regular Message Bubble */
                                        <div
                                             className={`p-3 rounded-lg text-[13px] leading-relaxed max-w-[85%] text-left ${m.isBot
                                                       ? `${botBubbleClass} shadow-xs`
                                                       : `${userBubbleClass} shadow-xs self-end ml-auto`
                                                  }`}
                                             style={{ whiteSpace: "pre-line" }}
                                        >
                                             {m.text}
                                        </div>
                                   )}

                                   {/* Single Choice Options */}
                                   {m.options && !m.multiSelect && (
                                        <div className="flex flex-wrap gap-1.5 mt-2 w-full max-w-[95%] items-start">
                                             {m.options.map((opt, oIdx) => (
                                                  <button
                                                       key={oIdx}
                                                       type="button"
                                                       onClick={() => handleOptionClick(m.questionId, opt, m.isWelcomeCard)}
                                                       className={`${quickQuestionClass} transition-all duration-200 text-[11px] font-semibold px-3 py-1.5 rounded-full text-left cursor-pointer shadow-xs border inline-flex items-center gap-1 hover:scale-[1.02] hover:bg-linear-to-r hover:from-zinc-800 hover:to-zinc-900 hover:text-white hover:border-zinc-800`}
                                                  >
                                                       <span>{opt}</span>
                                                  </button>
                                             ))}
                                        </div>
                                   )}

                                   {/* Multi-Select Options */}
                                   {m.options && m.multiSelect && (
                                        <div className="flex flex-wrap gap-1.5 mt-2 w-full max-w-[95%] items-start">
                                             {m.options.map((opt, oIdx) => {
                                                  const isSelected = tempSelections.includes(opt);
                                                  return (
                                                       <button
                                                            key={oIdx}
                                                            type="button"
                                                            onClick={() => handleMultiOptionToggle(opt)}
                                                            className={`transition-all duration-200 text-[11px] font-semibold px-3 py-1.5 rounded-full cursor-pointer shadow-xs border inline-flex items-center gap-1 hover:scale-[1.02] ${isSelected
                                                                      ? "bg-linear-to-r from-zinc-800 to-zinc-900 text-white border-zinc-800"
                                                                      : "bg-white text-neutral border-zinc-200 hover:bg-linear-to-r hover:from-zinc-800 hover:to-zinc-900 hover:text-white hover:border-zinc-800"
                                                                 }`}
                                                       >
                                                            <span>{opt}</span>
                                                            {isSelected && <Check size={12} className="text-neutral" />}
                                                       </button>
                                                  );
                                             })}
                                             <div className="w-full mt-1">
                                                  <button
                                                       type="button"
                                                       onClick={() => {
                                                            handleMultiSubmit(m.questionId, tempSelections);
                                                            setTempSelections([]);
                                                       }}
                                                       disabled={tempSelections.length === 0}
                                                       className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-sm cursor-pointer text-center ${tempSelections.length > 0
                                                                 ? "bg-official text-neutral hover:brightness-95"
                                                                 : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                                                            }`}
                                                  >
                                                       Confirm Selections ({tempSelections.length})
                                                  </button>
                                             </div>
                                        </div>
                                   )}

                                   {/* Inline Date-Time Picker */}
                                   {m.inputType === "datetime-local" && (
                                        <div className="mt-2 flex flex-col gap-2 w-full max-w-[88%]">
                                             <input
                                                  type="datetime-local"
                                                  id="chat-datetime-picker"
                                                  className="border border-zinc-300 rounded-md px-3 py-2 text-xs text-neutral outline-none focus:border-official bg-white"
                                                  onChange={(e) => {
                                                       const el = document.getElementById("chat-datetime-picker");
                                                       if (el) el.setAttribute("data-val", e.target.value);
                                                  }}
                                             />
                                             <button
                                                  type="button"
                                                  onClick={() => {
                                                       const el = document.getElementById("chat-datetime-picker");
                                                       const val = el ? el.getAttribute("data-val") : "";
                                                       if (val) {
                                                            const formatted = new Date(val).toLocaleString("en-IN", {
                                                                 dateStyle: "medium",
                                                                 timeStyle: "short"
                                                            });
                                                            handleInputSubmit(m.questionId, formatted);
                                                       }
                                                  }}
                                                  className="bg-official text-neutral px-4 py-2 rounded-md text-xs font-bold transition-all shadow-sm cursor-pointer text-center hover:brightness-95"
                                             >
                                                  Confirm Date & Time
                                             </button>
                                        </div>
                                   )}
                              </div>
                         );
                    })}

                    {/* Typing Indicator */}
                    {isTyping && (
                         <div className="flex items-start gap-2.5 w-full max-w-[85%] self-start mr-auto">
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs border border-zinc-200 overflow-hidden">
                                   {hasLogoImage ? (
                                        <img src={navbarData.logo.image.trim()} alt="Logo" className="w-full h-full object-contain" />
                                   ) : (
                                        <Image src={Logo} alt="Logo" className="w-full h-full object-contain" />
                                   )}
                              </div>
                              <div className="flex flex-col gap-1 text-left">
                                   <span className="text-[11px] font-bold text-neutral-800">Weekend UX Bot</span>
                                   <div className={`${botBubbleClass} p-2.5 rounded-md shadow-xs flex items-center space-x-1.5 w-14 h-8 justify-center`}>
                                        <div className="w-1.5 h-1.5 bg-neutral rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-neutral rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-neutral rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }}></div>
                                   </div>
                              </div>
                         </div>
                    )}

                    <div ref={chatEndRef} />
               </div>

               {/* ERROR NOTIFICATION */}
               {inputError && (
                    <div className="text-[11px] text-red-600 px-4 py-1.5 font-semibold bg-red-50 border-t border-red-100 text-left flex items-center gap-1.5">
                         <span>⚠️</span> {inputError}
                    </div>
               )}

               {/* INPUT FORM */}
               <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-3 bg-white border-t border-zinc-100 flex gap-2 items-center">
                    <div className={`relative flex-1 flex items-center rounded-md ${inputBgClass} transition-all duration-300 px-3 py-2`}>
                         <input
                              type="text"
                              value={input}
                              disabled={isInputDisabled}
                              onChange={(e) => {
                                   setInput(e.target.value);
                                   if (inputError) setInputError("");
                              }}
                              placeholder={inputPlaceholder}
                              className={`flex-1 outline-none text-xs ${isInputDisabled ? "text-zinc-400 bg-transparent cursor-not-allowed" : "text-neutral bg-transparent"
                                   }`}
                         />
                         <button
                              type="submit"
                              disabled={isInputDisabled || !input.trim()}
                              className={`ml-2 transition-all p-1 rounded-md ${isInputDisabled || !input.trim()
                                        ? "text-zinc-300 cursor-not-allowed"
                                        : `${sendButtonColor} cursor-pointer hover:scale-105`
                                   }`}
                              aria-label="Send Message"
                         >
                              <Send size={16} />
                         </button>
                    </div>
               </form>
          </div>
     );
}
