import React, { useState, useEffect } from "react";
import QuickAccessBar from "./QuickAccessBar";
import { HomeDataContext } from "@/context/HomeDataContext";

export default {
     title: "Components/QuickAccessBar",
     component: QuickAccessBar,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          isChatbotOpen: {
               control: "boolean",
               description: "Mock whether the live chat state is currently open",
          },
          barBackground: {
               control: "select",
               options: [
                    "fixed bottom-0 left-0 z-99999 w-full border-t border-zinc-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]",
                    "fixed bottom-0 left-0 z-99999 w-full bg-zinc-900 border-t border-zinc-800 text-white shadow-2xl",
                    "fixed bottom-0 left-0 z-99999 w-full bg-official text-neutral border-t border-official/20",
                    "fixed bottom-0 left-0 z-99999 w-full bg-yellow-50 border-t border-yellow-200 shadow-md"
               ],
               description: "Bar container background and shadow styles"
          },
          linkClass: {
               control: "select",
               options: [
                    "flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-medium text-neutral transition hover:bg-zinc-50",
                    "flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-semibold text-white transition hover:bg-zinc-800",
                    "flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-bold text-neutral-800 transition hover:bg-official/10"
               ],
               description: "Interactive button link classes"
          },
          iconColor: {
               control: "select",
               options: [
                    "text-base shrink-0",
                    "text-official shrink-0",
                    "text-blue-500 shrink-0",
                    "text-red-500 shrink-0"
               ],
               description: "Button icon coloring"
          },
          liveChatActive: {
               control: "select",
               options: [
                    "bg-neutral text-official",
                    "bg-white text-zinc-900",
                    "bg-zinc-800 text-white",
                    "bg-red-650 text-white"
               ],
               description: "Active chat state styles"
          },
          liveChatInactive: {
               control: "select",
               options: [
                    "bg-official text-neutral hover:bg-official/80",
                    "bg-zinc-850 text-white hover:bg-zinc-750",
                    "bg-neutral text-white hover:bg-neutral/80",
                    "bg-blue-600 text-white hover:bg-blue-700"
               ],
               description: "Inactive chat state styles"
          },
          onChatbotToggle: { action: "onChatbotToggle" }
     }
};

const Template = (args) => {
     const [isOpen, setIsOpen] = useState(args.isChatbotOpen);

     useEffect(() => {
          setIsOpen(args.isChatbotOpen);
     }, [args.isChatbotOpen]);

     const mockContext = {
          isChatbotOpen: isOpen,
          setIsChatbotOpen: (val) => {
               setIsOpen(val);
               args.onChatbotToggle(val);
          }
     };

     return (
          <HomeDataContext.Provider value={mockContext}>
               <div className="relative w-full h-40 bg-zinc-100 p-6 overflow-hidden">
                    <div className="absolute top-4 left-4 text-xs font-semibold text-zinc-500">
                         Chatbot Open State: <span className="font-bold">{isOpen ? "TRUE" : "FALSE"}</span>
                    </div>
                    {/* Render component */}
                    <QuickAccessBar {...args} />
               </div>
          </HomeDataContext.Provider>
     );
};

export const DefaultClosedChat = {
     render: (args) => <Template {...args} />,
     args: {
          isChatbotOpen: false,
          barBackground: "fixed bottom-0 left-0 z-99999 w-full border-t border-zinc-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]",
          linkClass: "flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-medium text-neutral transition hover:bg-zinc-50",
          iconColor: "text-base shrink-0",
          liveChatActive: "bg-neutral text-official",
          liveChatInactive: "bg-official text-neutral hover:bg-official/80"
     }
};

export const CustomDarkTheme = {
     render: (args) => <Template {...args} />,
     args: {
          isChatbotOpen: true,
          barBackground: "fixed bottom-0 left-0 z-99999 w-full bg-zinc-900 border-t border-zinc-800 text-white shadow-2xl",
          linkClass: "flex flex-1 items-center justify-center gap-2 text-[13px] md:text-sm font-semibold text-white transition hover:bg-zinc-800",
          iconColor: "text-official shrink-0",
          liveChatActive: "bg-white text-zinc-900",
          liveChatInactive: "bg-zinc-800 text-white hover:bg-zinc-700"
     }
};
