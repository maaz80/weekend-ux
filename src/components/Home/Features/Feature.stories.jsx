import Feature from "./Feature";

const meta = {
     title: "Home/Features/Feature Strip",
     component: Feature,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          bgColor: {
               control: "select",
               options: [
                    "bg-official",
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
                    "bg-bg-gray-soft"
               ],
               description: "Background color of the section wrapper"
          },
          textColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-blue",
                    "text-fg-neutral",
                    "text-fg-green",
                    "text-fg-gray",
                    "text-fg-orange",
                    "text-fg-red"
               ],
               description: "Text and icon color inside the feature strip"
          },
          borderColor: {
               control: "select",
               options: [
                    "bg-neutral",
                    "bg-white",
                    "bg-white/20",
                    "bg-official",
                    "bg-bd-neutral",
                    "bg-bd-green",
                    "bg-transparent"
               ],
               description: "Color of the vertical separator dividers"
          },
          showDiamond: {
               control: "boolean",
               description: "Whether to show the decorative diamond image"
          },
          diamondImage: {
               control: "text",
               description: "Source URL of the decorative diamond image"
          }
     }
};

export default meta;

export const Default = {
     args: {
          bgColor: "bg-official",
          textColor: "text-neutral",
          borderColor: "bg-neutral",
          showDiamond: true,
          diamondImage: '/images/weekend-ux-decorative-diamond.webp'
     }
};

export const DarkTheme = {
     args: {
          bgColor: "bg-bg-black",
          textColor: "text-white",
          borderColor: "bg-white/20",
          showDiamond: true,
          diamondImage: '/images/weekend-ux-decorative-diamond.webp'
     }
};

export const GreenTheme = {
     args: {
          bgColor: "bg-bg-green",
          textColor: "text-bg-yellow-brand",
          borderColor: "bg-bg-yellow-brand/30",
          showDiamond: true,
          diamondImage: '/images/weekend-ux-decorative-diamond.webp'
     }
};