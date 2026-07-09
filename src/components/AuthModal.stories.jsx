import React from "react";
import AuthModal from "./AuthModal";
import { HomeDataContext } from "@/context/HomeDataContext";

export default {
     title: "Components/AuthModal",
     component: AuthModal,
     parameters: {
          layout: "centered",
     },
     argTypes: {
          isOpen: {
               control: "boolean",
               description: "Controls whether the modal is visible or hidden",
          },
          authDecorativeImage: {
               control: "text",
               description: "Image URL for the left panel illustration",
          },
          backdropBgColor: {
               control: "select",
               options: [
                    "bg-neutral/50 backdrop-blur-sm",
                    "bg-black/80 backdrop-blur-md",
                    "bg-zinc-900/30 backdrop-blur-none",
                    "bg-zinc-500/50"
               ],
               description: "Backdrop background styling"
          },
          modalBgColor: {
               control: "select",
               options: [
                    "bg-white",
                    "bg-zinc-50",
                    "bg-zinc-900",
                    "bg-yellow-50/90"
               ],
               description: "Modal box background"
          },
          titleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-red-600"
               ],
               description: "Modal heading text color"
          },
          titleTextSize: {
               control: "select",
               options: [
                    "text-xl",
                    "text-2xl",
                    "text-3xl",
                    "text-4xl"
               ],
               description: "Modal heading text size"
          },
          labelColor: {
               control: "select",
               options: [
                    "text-neutral-600",
                    "text-neutral-300",
                    "text-zinc-500",
                    "text-official"
               ],
               description: "Input label text color"
          },
          inputBgColor: {
               control: "select",
               options: [
                    "bg-white",
                    "bg-zinc-50",
                    "bg-zinc-800"
               ],
               description: "Input field background"
          },
          inputTextColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-zinc-600"
               ],
               description: "Input field text color"
          },
          inputBorderColor: {
               control: "select",
               options: [
                    "border-zinc-200",
                    "border-zinc-700",
                    "border-official",
                    "border-transparent"
               ],
               description: "Input field border color"
          },
          inputFocusColor: {
               control: "select",
               options: [
                    "focus:border-official focus:ring-1 focus:ring-official",
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500",
                    "focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
               ],
               description: "Input focus rings"
          },
          toggleTextColor: {
               control: "select",
               options: [
                    "text-neutral-600",
                    "text-zinc-400",
                    "text-white"
               ],
               description: "Secondary text color"
          },
          toggleLinkColor: {
               control: "select",
               options: [
                    "text-official hover:underline cursor-pointer font-bold",
                    "text-blue-500 hover:underline cursor-pointer font-bold",
                    "text-red-500 hover:underline cursor-pointer font-bold",
                    "text-white hover:underline cursor-pointer font-bold"
               ],
               description: "Interactive link color & style"
          },
          submitButtonClass: {
               control: "text",
               description: "Tailwind override classes for submit button"
          },
          onClose: { action: "onClose clicked" },
          onAuthSuccess: { action: "onAuthSuccess triggered" },
     },
     decorators: [
          (Story, context) => {
               // Intercept global fetch for authentication endpoints to make the story interactive
               if (typeof window !== "undefined" && !window.__authFetchMocked) {
                    window.__authFetchMocked = true;
                    const originalFetch = window.fetch;
                    window.fetch = async function (input, init) {
                         const url = typeof input === "string" ? input : input?.url || "";
                         
                         if (url.includes("/api/auth/send-otp")) {
                              console.log("Mocked API call: sendAuthOTP for", init?.body);
                              return new Response(JSON.stringify({ success: true, message: "Verification OTP code has been sent to your email" }), {
                                   status: 200,
                                   headers: { "Content-Type": "application/json" }
                              });
                         }
                         if (url.includes("/api/auth/login")) {
                              console.log("Mocked API call: loginUser for", init?.body);
                              return new Response(JSON.stringify({ success: true, token: "mocked-jwt-login-token" }), {
                                   status: 200,
                                   headers: { "Content-Type": "application/json" }
                              });
                         }
                         if (url.includes("/api/auth/signup")) {
                              console.log("Mocked API call: signupUser for", init?.body);
                              return new Response(JSON.stringify({ success: true, token: "mocked-jwt-signup-token" }), {
                                   status: 200,
                                   headers: { "Content-Type": "application/json" }
                              });
                         }
                         return originalFetch(input, init);
                    };
               }

               // Wrap story with mock HomeDataContext
               const mockContextValue = {
                    navbarData: {
                         authDecorativeImage: context.args.authDecorativeImage
                    },
                    loading: false
               };

               return (
                    <HomeDataContext.Provider value={mockContextValue}>
                         <div className="w-screen h-screen flex items-center justify-center bg-slate-900/10">
                              <Story />
                         </div>
                    </HomeDataContext.Provider>
               );
          }
     ]
};

export const OpenInLoginMode = {
     args: {
          isOpen: true,
          authDecorativeImage: "/images/weekend-ux-login-decorative-image.webp",
          backdropBgColor: "bg-neutral/50 backdrop-blur-sm",
          modalBgColor: "bg-white",
          titleColor: "text-neutral",
          titleTextSize: "text-2xl",
          labelColor: "text-neutral-600",
          inputBgColor: "bg-white",
          inputTextColor: "text-neutral",
          inputBorderColor: "border-zinc-200",
          inputFocusColor: "focus:border-official focus:ring-1 focus:ring-official",
          submitButtonClass: "",
          toggleTextColor: "text-neutral-600",
          toggleLinkColor: "text-official hover:underline cursor-pointer font-bold"
     }
};

export const CustomDarkTheme = {
     args: {
          isOpen: true,
          authDecorativeImage: "/images/weekend-ux-login-decorative-image.webp",
          backdropBgColor: "bg-black/80 backdrop-blur-md",
          modalBgColor: "bg-zinc-900",
          titleColor: "text-white",
          titleTextSize: "text-3xl",
          labelColor: "text-neutral-300",
          inputBgColor: "bg-zinc-800",
          inputTextColor: "text-white",
          inputBorderColor: "border-zinc-700",
          inputFocusColor: "focus:border-official focus:ring-1 focus:ring-official",
          submitButtonClass: "bg-official text-zinc-950 hover:bg-official/90",
          toggleTextColor: "text-zinc-400",
          toggleLinkColor: "text-official hover:underline cursor-pointer font-bold"
     }
};
