'use client';

import React, { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";
import Image from "next/image";
import Logo from "@/app/assets/weekend-ux-logo.webp";
import { useHomeData } from "@/context/HomeDataContext";

const CUSTOM_QUESTIONS = [
     {
          q: "What courses do you offer?",
          a: "We offer courses in UI/UX Design, Interaction Design, and Frontend Development. All of our courses are self-paced and include industry projects."
     },
     {
          q: "How can I enroll in a course?",
          a: "You can click on the 'Courses' tab in the navbar, select the course you are interested in, and click 'Enroll Now'. You'll need to verify your email via OTP to sign up."
     },
     {
          q: "Do you provide placement assistance?",
          a: "Yes! We offer extensive career mentorship, portfolio reviews, and mock interviews to help you land your dream UX design job."
     },
     {
          q: "What is Weekend UX?",
          a: "Weekend UX is our parent design agency where we build intelligent design solutions for global brands. Our students often get opportunities to work on real agency projects."
     },
     {
          q: "How can I contact support?",
          a: "You can request a callback using the button in the bottom bar, or write to us at support@weekendux.com."
     }
];

const Chatbot = () => {
     const { isChatbotOpen, setIsChatbotOpen, navbarData } = useHomeData();
     const [messages, setMessages] = useState([
          {
               id: "initial",
               text: "Hi there! Welcome to Weekend UX. How can we help you today?",
               isBot: true,
               senderName: "Weekend UX Bot",
               timestamp: "Just now"
          }
     ]);
     const [isTyping, setIsTyping] = useState(false);
     const [inputValue, setInputValue] = useState("");
     const chatEndRef = useRef(null);

     const hasLogoImage = navbarData?.logo?.image && navbarData.logo.image.trim();

     // Scroll to bottom whenever messages or typing state changes
     const scrollToBottom = () => {
          chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
     };

     useEffect(() => {
          scrollToBottom();
     }, [messages, isTyping]);

     // Handle sending a message
     const handleSendMessage = (text) => {
          if (!text.trim() || isTyping) return;

          // Add user message
          const userMsg = {
               id: Date.now().toString(),
               text: text,
               isBot: false,
               senderName: "You",
               timestamp: "Just now"
          };

          setMessages((prev) => [...prev, userMsg]);
          setInputValue("");
          setIsTyping(true);

          // Find if there's a custom reply
          const foundQA = CUSTOM_QUESTIONS.find(qa => qa.q.toLowerCase() === text.trim().toLowerCase());
          const replyText = foundQA 
               ? foundQA.a 
               : "Thank you for reaching out! One of our team members will get back to you shortly. You can also contact us directly at support@weekendux.com or call us at +91 95992 72764.";

          // Bot reply after 2 seconds
          setTimeout(() => {
               const botMsg = {
                    id: (Date.now() + 1).toString(),
                    text: replyText,
                    isBot: true,
                    senderName: "Weekend UX Bot",
                    timestamp: "Just now"
               };
               setMessages((prev) => [...prev, botMsg]);
               setIsTyping(false);
          }, 2000);
     };

     const handleFormSubmit = (e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
     };

     return (
          <div 
               className={`fixed right-4 md:right-10 z-99998 w-[calc(100%-2rem)] sm:w-95 h-130 max-h-[calc(100vh-120px)] bg-white rounded-md shadow-2xl  flex flex-col overflow-hidden transition-all duration-500 ease-in-out select-none ${
                    isChatbotOpen 
                         ? "bottom-14 translate-y-0 opacity-100 pointer-events-auto" 
                         : "bottom-0 translate-y-[calc(100%+56px)] opacity-0 pointer-events-none"
               }`}
          >
               {/* HEADER */}
               <div className="bg-official px-5 py-4 flex items-center justify-between border-b border-official/20">
                    <div className="flex items-center gap-3">
                         {/* Circle Icon Logo */}
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-md border border-zinc-100">
                              {hasLogoImage ? (
                                   <img
                                        src={navbarData.logo.image.trim()}
                                        alt="Logo"
                                        className="w-full h-full object-contain"
                                   />
                              ) : (
                                   <Image
                                        src={Logo}
                                        alt="Logo"
                                        className="w-full h-full object-contain"
                                   />
                              )}
                         </div>
                         <div className="flex flex-col text-left">
                              <span className="text-zinc-950 text-xl tracking-wide leading-tight font-semibold">Hi there!</span>
                              <span className="text-zinc-800 text-[11px] leading-tight mt-0.5 font-medium">Welcome to Weekend UX. How can we help?</span>
                         </div>
                    </div>
                    <button 
                         onClick={() => setIsChatbotOpen(false)}
                         className="text-zinc-950 hover:text-zinc-700 transition-all duration-300 hover:rotate-90 p-1 rounded-full cursor-pointer"
                         aria-label="Close chat"
                    >
                         <X size={20} strokeWidth={3 }/>
                    </button>
               </div>

               {/* CHAT BODY */}
               <div className="flex-1 overflow-y-auto p-4 bg-zinc-50/50 flex flex-col gap-4 scrollbar-thin">
                    {messages.map((msg) => (
                         <div key={msg.id} className="w-full flex">
                              {msg.isBot ? (
                                   <div className="flex items-start gap-2.5 w-full max-w-[85%] self-start mr-auto">
                                        {/* Bot Avatar Logo */}
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shrink-0 shadow-sm border border-neutral-200 overflow-hidden">
                                             {hasLogoImage ? (
                                                  <img
                                                       src={navbarData.logo.image.trim()}
                                                       alt="Logo"
                                                       className="w-full h-full object-contain"
                                                  />
                                             ) : (
                                                  <Image
                                                       src={Logo}
                                                       alt="Logo"
                                                       className="w-full h-full object-contain"
                                                  />
                                             )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                             {/* Sender info */}
                                             <div className="flex flex-col text-left">
                                                  <span className="text-[12px] font-bold text-neutral-800 leading-none mb-0.5">{msg.senderName}</span>
                                                  <span className="text-[9px] text-neutral-400 leading-none">{msg.timestamp}</span>
                                             </div>
                                             {/* Message Bubble */}
                                             <div className="bg-white text-neutral-900 p-3 rounded-md text-[13px] leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.05)] mt-0.5 text-left border border-zinc-100">
                                                  {msg.text}
                                             </div>
                                        </div>
                                   </div>
                              ) : (
                                   /* User Message Bubble */
                                   <div className="bg-official text-neutral-900 p-3 rounded-md text-[13px] leading-relaxed max-w-[80%] self-end ml-auto shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-left font-medium">
                                        {msg.text}
                                   </div>
                              )}
                         </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                         <div className="flex items-start gap-2.5 w-full max-w-[85%] self-start mr-auto">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shrink-0 shadow-sm border border-neutral-200 overflow-hidden">
                                   {hasLogoImage ? (
                                        <img
                                             src={navbarData.logo.image.trim()}
                                             alt="Logo"
                                             className="w-full h-full object-contain"
                                        />
                                   ) : (
                                        <Image
                                             src={Logo}
                                             alt="Logo"
                                             className="w-full h-full object-contain"
                                        />
                                   )}
                              </div>
                              <div className="flex flex-col gap-1">
                                   <div className="flex flex-col text-left">
                                        <span className="text-[12px] font-bold text-neutral-800 leading-none mb-0.5">Weekend UX Bot</span>
                                        <span className="text-[9px] text-neutral-400 leading-none">Typing...</span>
                                   </div>
                                   <div className="bg-white p-3 rounded-md mt-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center space-x-1 justify-center w-14 h-9 border border-zinc-100">
                                        <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }}></div>
                                   </div>
                              </div>
                         </div>
                    )}

                    <div ref={chatEndRef} />
               </div>

               {/* QUICK QUESTIONS PILLS */}
               {!isTyping && (
                    <div className="px-4 py-2 bg-zinc-50 border-t border-zinc-100 flex flex-wrap gap-1.5 max-h-33.25 md:max-h-27.5 overflow-y-auto scrollbar-none">
                         {CUSTOM_QUESTIONS.map((qa, index) => (
                              <button
                                   key={index}
                                   type="button"
                                   onClick={() => handleSendMessage(qa.q)}
                                   className="border border-official text-neutral-800 bg-white hover:bg-official hover:text-neutral-900 transition-all duration-200 text-[11px] font-semibold px-2.5 py-1 rounded-md text-left cursor-pointer shadow-sm shrink-0"
                              >
                                   {qa.q}
                              </button>
                         ))}
                    </div>
               )}

               {/* FOOTER INPUT */}
               <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-zinc-100 flex gap-2 items-center">
                    <div className="relative flex-1 flex items-center bg-zinc-50 border border-zinc-200 rounded-md focus-within:border-official transition-all duration-300">
                         <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Write your query..."
                              disabled={isTyping}
                              className="w-full pl-3 pr-10 py-2.5 bg-transparent text-sm text-neutral-900 outline-none placeholder-zinc-400 disabled:opacity-50"
                         />
                         <button
                              type="submit"
                              disabled={!inputValue.trim() || isTyping}
                              className="absolute right-2 text-zinc-400 hover:text-official disabled:opacity-30 transition-all duration-300 cursor-pointer p-1"
                              aria-label="Send query"
                         >
                              <Send size={16} />
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default Chatbot;
