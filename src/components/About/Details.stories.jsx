import Details from "./Details";

export default {
     title: "About/Details",
     component: Details,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          bgImage: {
               control: "text",
               description: "Background Image URL"
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
                    "text-official",
                    "text-[#1B1B1B]",
                    "text-white",
                    "text-fg-neutral",
                    "text-fg-blue"
               ],
               description: "Color of the main heading text"
          },
          titleHighlightColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-official",
                    "text-[#1B1B1B]",
                    "text-fg-neutral",
                    "text-fg-orange",
                    "text-fg-blue"
               ],
               description: "Color of the italicized highlighted text"
          },
          cardNumberColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-official",
                    "text-[#171717]",
                    "text-fg-neutral",
                    "text-fg-orange"
               ],
               description: "Color of numbers in stats cards"
          },
          cardTitleColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-official",
                    "text-[#171717]",
                    "text-fg-neutral"
               ],
               description: "Color of titles in stats cards"
          },
          cardDescriptionColor: {
               control: "select",
               options: [
                    "text-white/80",
                    "text-white/70",
                    "text-[#2A2A2A]/80",
                    "text-fg-gray",
                    "text-fg-neutral"
               ],
               description: "Color of descriptions in stats cards"
          },
          cardDividerColor: {
               control: "select",
               options: [
                    "bg-white/15",
                    "bg-white/30",
                    "bg-[#1B1B1B]/15",
                    "bg-[#1B1B1B]/30",
                    "bg-transparent"
               ],
               description: "Color of divider line in stats cards"
          }
     }
};

export const Default = {
     args: {
          bgImage: "/images/weekend-ux-about-properties-bg.webp",
          taglineColor: "text-[#fff8d6]",
          titleColor: "text-official",
          titleHighlightColor: "text-white",
          cardNumberColor: "text-white",
          cardTitleColor: "text-white",
          cardDescriptionColor: "text-white/80",
          cardDividerColor: "bg-white/15",
          data: {
               title: "Why Weekend UX",
               startheading: "The Numbers Behind Every",
               midheading: "Designer",
               endheading: " We've Trained.",
               card: [
                    {
                         value: "500+",
                         valueName: "Designers Trained",
                         description: "Across beginner, intermediate & advanced courses since 2019"
                    },
                    {
                         value: "8-10",
                         valueName: "Students per batch, always",
                         description: "We've been offered bigger. We've always said no. Small is big."
                    },
                    {
                         value: "5★",
                         valueName: "Average instructor rating",
                         description: "Rated by students post-batch. No anonymous reviews, no inflation."
                    }
               ]
          }
     }
};

export const LightTheme = {
     args: {
          bgImage: "",
          taglineColor: "text-official",
          titleColor: "text-[#1B1B1B]",
          titleHighlightColor: "text-fg-orange",
          cardNumberColor: "text-[#171717]",
          cardTitleColor: "text-[#171717]",
          cardDescriptionColor: "text-[#2A2A2A]/80",
          cardDividerColor: "bg-[#1B1B1B]/15",
          data: {
               title: "Our Milestone Statistics",
               startheading: "Our Growth & Student",
               midheading: "Impact",
               endheading: " Over The Years.",
               card: [
                    {
                         value: "1000+",
                         valueName: "Successful Placements",
                         description: "Working in top tech companies worldwide"
                    },
                    {
                         value: "50+",
                         valueName: "Hiring Partners",
                         description: "Consistent recruitment drives and internship pipeline"
                    },
                    {
                         value: "15+",
                         valueName: "Industry Projects",
                         description: "Real-world portfolio building during course timeline"
                    }
               ]
          }
     }
};
