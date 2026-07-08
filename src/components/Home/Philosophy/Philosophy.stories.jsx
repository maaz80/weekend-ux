import Philosophy from "./Philosophy";

export default {
     title: "Home/Philosophy",
     component: Philosophy,
     argTypes: {
          titleColor: {
               control: "select",
               options: [
                    "text-official",
                    "text-fg-blue",
                    "text-fg-neutral",
                    "text-fg-green",
                    "text-fg-gray",
                    "text-fg-orange",
                    "text-fg-red",
                    "text-white"
               ]
          },
          textColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-fg-blue",
                    "text-fg-neutral",
                    "text-fg-green",
                    "text-fg-gray",
                    "text-fg-orange",
                    "text-fg-red",
                    "text-official"
               ]
          },
          bgColor: {
               control: "select",
               options: [
                    "bg-bg-neutral",
                    "bg-bg-white",
                    "bg-bg-yellow-light",
                    "bg-bg-gray-light",
                    "bg-bg-cream",
                    "bg-bg-green",
                    "bg-bg-black",
                    "bg-bg-green-light",
                    "bg-bg-yellow-brand",
                    "bg-bg-cream-brand",
                    "bg-bg-red",
                    "bg-bg-gray",
                    "bg-bg-red-light",
                    "bg-bg-gray-soft",
                    "bg-transparent"
               ]
          },
          borderColor: {
               control: "select",
               options: [
                    "border-transparent",
                    "border-bd-neutral",
                    "border-bd-neutral-muted",
                    "border-bd-green",
                    "border-bd-neutral-light",
                    "border-bd-green-light",
                    "border-bd-orange",
                    "border-bd-orange-light",
                    "border-bd-red",
                    "border-bd-red-light"
               ]
          },
          bgImage: {
               control: "text",
          }
     }
};

export const Default = {
     args: {
          titleColor: "text-official",
          textColor: "text-white",
          bgColor: "bg-bg-neutral",
          borderColor: "border-transparent",
          bgImage: "/images/weekend-ux-philosophy-bg.webp"
     }
};

export const WithoutBackgroundImage = {
     args: {
          titleColor: "text-fg-orange",
          textColor: "text-fg-neutral",
          bgColor: "bg-bg-cream",
          borderColor: "border-bd-orange",
          bgImage: ""
     }
};
