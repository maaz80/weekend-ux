import FeatureStrip from "./FeatureStrip";

export default {
     title: "About/Feature Strip",
     component: FeatureStrip,
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
          }
     }
};

export const Default = {
     args: {
          bgColor: "bg-official",
          textColor: "text-neutral",
          borderColor: "bg-neutral",
          data: {
               description: "Weekend UX is a hands-on design institute, in-person classes and structured recordings built for people who learn by doing, not watching.",
               points: [
                    {
                         icon: "HiLightBulb",
                         text: "Experience World\nClass Learning"
                    },
                    {
                         icon: "BsThreeDots",
                         text: "100% Placement\nAssistance"
                    },
                    {
                         icon: "BsThreeDots",
                         text: "Study On-Campus\nor Online"
                    }
               ]
          }
     }
};

export const DarkTheme = {
     args: {
          bgColor: "bg-bg-black",
          textColor: "text-white",
          borderColor: "bg-white/20",
          data: {
               description: "An immersive platform for modern designers. We teach actual skills that companies value.",
               points: [
                    {
                         icon: "FaBolt",
                         text: "Rapid Mentorship\nSessions"
                    },
                    {
                         icon: "FaStar",
                         text: "Hands-on UI/UX\nWorkshops"
                    },
                    {
                         icon: "FaRegLightbulb",
                         text: "Real Projects\n& Live Briefs"
                    }
               ]
          }
     }
};
