import Hero from "./Hero";

export default {
     title: "About/Hero",
     component: Hero,
     argTypes: {
          bgColor: {
               control: "select",
               options: [
                    "bg-zinc-950",
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
          headingColor: {
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
          }
     }
};

export const Default = {
     args: {
          bgColor: "bg-zinc-950",
          titleColor: "text-official",
          headingColor: "text-white",
          data: {
               title: "Learn as you desire",
               heading: "Best Design Academy in Delhi that teaches you actual skills in person",
               buttonName: "Explore Programs",
               bgImage: "/images/weekend-ux-location-hero-bg.webp"
          }
     }
};

export const LightThemeMock = {
     args: {
          bgColor: "bg-bg-gray-light",
          titleColor: "text-fg-blue",
          headingColor: "text-fg-neutral",
          data: {
               title: "About Our Academy",
               heading: "Learn UI/UX Design from Industry Mentors",
               buttonName: "Join Now",
               bgImage: ""
          }
     }
};
