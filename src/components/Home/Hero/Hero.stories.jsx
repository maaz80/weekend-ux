import Hero from "./Hero";

export default {
     title: "Home/Hero",
     component: Hero,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
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
                    "bg-bg-gray-soft"
               ]
          },
          taglineColor: {
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
          titleColor: {
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
          pointsColor: {
               control: "select",
               options: [
                    "text-white/70",
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
          activeDotColor: {
               control: "select",
               options: [
                    "bg-official",
                    "bg-bg-yellow-brand",
                    "bg-bg-white",
                    "bg-bg-green",
                    "bg-bg-red",
                    "bg-bg-gray",
                    "bg-bg-neutral"
               ]
          }
     }
};

export const Default = {
     args: {
          bgColor: "bg-bg-neutral",
          taglineColor: "text-official",
          titleColor: "text-white",
          pointsColor: "text-white/70",
          activeDotColor: "bg-official"
     }
};

export const CustomColors = {
     args: {
          bgColor: "bg-bg-cream",
          taglineColor: "text-fg-orange",
          titleColor: "text-fg-neutral",
          pointsColor: "text-fg-gray",
          activeDotColor: "bg-bg-yellow-brand"
     }
};