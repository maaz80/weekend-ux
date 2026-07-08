import Details from "./Details";

export default {
     title: "Home/Details",
     component: Details,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          bgImage: {
               control: "text",
               description: "Background Image URL"
          },
          overlayColor: {
               control: "select",
               options: [
                    "bg-[#F4B400]/40",
                    "bg-[#F4B400]/20",
                    "bg-[#0F5A47]/40",
                    "bg-neutral/40",
                    "bg-black/40",
                    "bg-white/30",
                    "bg-[#FF5A5F]/40",
                    "bg-transparent"
               ],
               description: "Color overlay on top of background image"
          },
          taglineColor: {
               control: "select",
               options: [
                    "text-[#fff8d6]",
                    "text-official",
                    "text-white",
                    "text-fg-orange",
                    "text-fg-neutral",
                    "text-fg-blue"
               ],
               description: "Color of the tagline"
          },
          titleColor: {
               control: "select",
               options: [
                    "text-[#1B1B1B]",
                    "text-white",
                    "text-fg-neutral",
                    "text-fg-blue",
                    "text-official"
               ],
               description: "Color of the main heading text"
          },
          titleHighlightColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-[#1B1B1B]",
                    "text-official",
                    "text-fg-neutral",
                    "text-fg-orange",
                    "text-fg-blue"
               ],
               description: "Color of the italicized highlighted text"
          },
          cardNumberColor: {
               control: "select",
               options: [
                    "text-[#171717]",
                    "text-white",
                    "text-official",
                    "text-fg-neutral",
                    "text-fg-orange"
               ],
               description: "Color of numbers in stats cards"
          },
          cardTitleColor: {
               control: "select",
               options: [
                    "text-[#171717]",
                    "text-white",
                    "text-official",
                    "text-fg-neutral"
               ],
               description: "Color of titles in stats cards"
          },
          cardDescriptionColor: {
               control: "select",
               options: [
                    "text-[#2A2A2A]/80",
                    "text-white/80",
                    "text-white/70",
                    "text-fg-gray",
                    "text-fg-neutral"
               ],
               description: "Color of descriptions in stats cards"
          },
          cardDividerColor: {
               control: "select",
               options: [
                    "bg-[#1B1B1B]/15",
                    "bg-[#1B1B1B]/30",
                    "bg-white/20",
                    "bg-white/40",
                    "bg-transparent"
               ],
               description: "Color of divider line in stats cards"
          }
     }
};

export const Default = {
     args: {
          bgImage: "/images/weekend-ux-details-bg.webp",
          overlayColor: "bg-[#F4B400]/40",
          taglineColor: "text-[#fff8d6]",
          titleColor: "text-[#1B1B1B]",
          titleHighlightColor: "text-white",
          cardNumberColor: "text-[#171717]",
          cardTitleColor: "text-[#171717]",
          cardDescriptionColor: "text-[#2A2A2A]/80",
          cardDividerColor: "bg-[#1B1B1B]/15"
     }
};

export const DarkTheme = {
     args: {
          bgImage: "/images/weekend-ux-details-bg.webp",
          overlayColor: "bg-black/60",
          taglineColor: "text-official",
          titleColor: "text-white",
          titleHighlightColor: "text-official",
          cardNumberColor: "text-official",
          cardTitleColor: "text-white",
          cardDescriptionColor: "text-white/80",
          cardDividerColor: "bg-white/20"
     }
};

export const GreenTheme = {
     args: {
          bgImage: "/images/weekend-ux-details-bg.webp",
          overlayColor: "bg-[#0F5A47]/60",
          taglineColor: "text-[#fff8d6]",
          titleColor: "text-white",
          titleHighlightColor: "text-[#F4B400]",
          cardNumberColor: "text-[#F4B400]",
          cardTitleColor: "text-white",
          cardDescriptionColor: "text-white/80",
          cardDividerColor: "bg-white/20"
     }
};