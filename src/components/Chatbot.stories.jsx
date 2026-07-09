import React, { useState, useEffect } from "react";
import Chatbot from "./Chatbot";
import { HomeDataContext } from "@/context/HomeDataContext";

export default {
     title: "Components/Chatbot",
     component: Chatbot,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          isChatbotOpen: {
               control: "boolean",
               description: "Controls whether the chatbot window is open and visible",
          },
          logoImage: {
               control: "text",
               description: "Mock logo image URL for the chatbot header and bot messages",
          },
          chatBgColor: {
               control: "select",
               options: [
                    "bg-white",
                    "bg-zinc-50",
                    "bg-zinc-900",
                    "bg-yellow-50/90"
               ],
               description: "Chatbot main background"
          },
          headerBgColor: {
               control: "select",
               options: [
                    "bg-official",
                    "bg-neutral",
                    "bg-zinc-800",
                    "bg-red-600"
               ],
               description: "Header background class"
          },
          headerTextColor: {
               control: "select",
               options: [
                    "text-zinc-950",
                    "text-white",
                    "text-official"
               ],
               description: "Header title text color"
          },
          headerSubtextColor: {
               control: "select",
               options: [
                    "text-zinc-800",
                    "text-zinc-400",
                    "text-white/80"
               ],
               description: "Header tagline text color"
          },
          closeButtonColor: {
               control: "select",
               options: [
                    "text-zinc-950 hover:text-zinc-700",
                    "text-white hover:text-zinc-300",
                    "text-official hover:text-official/80"
               ],
               description: "Close button hover and color styles"
          },
          botBubbleClass: {
               control: "select",
               options: [
                    "bg-white text-neutral border border-zinc-100",
                    "bg-zinc-800 text-white border border-zinc-700",
                    "bg-yellow-50 text-neutral border border-yellow-200"
               ],
               description: "Bot message bubble styling"
          },
          userBubbleClass: {
               control: "select",
               options: [
                    "bg-official text-neutral",
                    "bg-neutral text-white",
                    "bg-blue-600 text-white",
                    "bg-zinc-800 text-zinc-100"
               ],
               description: "User message bubble styling"
          },
          quickQuestionClass: {
               control: "select",
               options: [
                    "border-official text-neutral-800 bg-white hover:bg-official hover:text-neutral",
                    "border-neutral text-white bg-zinc-950 hover:bg-white hover:text-zinc-950",
                    "border-zinc-300 text-zinc-600 bg-zinc-50 hover:bg-zinc-200 hover:text-zinc-800"
               ],
               description: "Quick access questions button classes"
          },
          inputBgClass: {
               control: "select",
               options: [
                    "bg-zinc-50 border border-zinc-200 focus-within:border-official",
                    "bg-zinc-800 border border-zinc-700 focus-within:border-white",
                    "bg-white border border-zinc-300 focus-within:border-blue-500"
               ],
               description: "Footer text input field classes"
          },
          sendButtonColor: {
               control: "select",
               options: [
                    "text-zinc-400 hover:text-official",
                    "text-zinc-500 hover:text-white",
                    "text-blue-500 hover:text-blue-600"
               ],
               description: "Footer send button hover and normal colors"
          }
     }
};

const Template = (args) => {
     const [isOpen, setIsOpen] = useState(args.isChatbotOpen);

     useEffect(() => {
          setIsOpen(args.isChatbotOpen);
     }, [args.isChatbotOpen]);

     const mockContext = {
          isChatbotOpen: isOpen,
          setIsChatbotOpen: setIsOpen,
          navbarData: {
               logo: {
                    image: args.logoImage
               }
          }
     };

     return (
          <HomeDataContext.Provider value={mockContext}>
               <div className="relative w-full h-[600px] bg-slate-100 p-6 overflow-hidden">
                    <div className="absolute bottom-4 left-4 text-xs font-semibold text-zinc-500">
                         {isOpen ? "Chatbot is open (rendered relative to container)" : "Chatbot is closed (hidden)"}
                    </div>
                    {/* Render component */}
                    <Chatbot {...args} />
               </div>
          </HomeDataContext.Provider>
     );
};

export const OpenDefault = {
     render: (args) => <Template {...args} />,
     args: {
          isChatbotOpen: true,
          logoImage: "",
          chatBgColor: "bg-white",
          headerBgColor: "bg-official",
          headerTextColor: "text-zinc-950",
          headerSubtextColor: "text-zinc-800",
          closeButtonColor: "text-zinc-950 hover:text-zinc-700",
          botBubbleClass: "bg-white text-neutral border border-zinc-100",
          userBubbleClass: "bg-official text-neutral",
          quickQuestionClass: "border-official text-neutral-800 bg-white hover:bg-official hover:text-neutral",
          inputBgClass: "bg-zinc-50 border border-zinc-200 focus-within:border-official",
          sendButtonColor: "text-zinc-400 hover:text-official"
     }
};

export const CustomDarkTheme = {
     render: (args) => <Template {...args} />,
     args: {
          isChatbotOpen: true,
          logoImage: "",
          chatBgColor: "bg-zinc-900",
          headerBgColor: "bg-zinc-800",
          headerTextColor: "text-white",
          headerSubtextColor: "text-zinc-400",
          closeButtonColor: "text-white hover:text-zinc-300",
          botBubbleClass: "bg-zinc-800 text-white border border-zinc-700",
          userBubbleClass: "bg-official text-neutral",
          quickQuestionClass: "border-neutral text-white bg-zinc-950 hover:bg-white hover:text-zinc-950",
          inputBgClass: "bg-zinc-850 border border-zinc-700 focus-within:border-white",
          sendButtonColor: "text-zinc-500 hover:text-white"
     }
};
