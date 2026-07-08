import RelatedBlogs from "./RelatedBlogs";

export default {
     title: "Components/RelatedBlogs",
     component: RelatedBlogs,
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
                    "bg-official/25",
                    "bg-official/40",
                    "bg-black/40",
                    "bg-black/60",
                    "bg-[#0F5A47]/40",
                    "bg-transparent"
               ],
               description: "Color overlay on top of the background image"
          },
          taglineColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-official",
                    "text-neutral",
                    "text-fg-orange",
                    "text-[#fff8d6]"
               ],
               description: "Color of the tagline / category text"
          },
          titleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-neutral",
                    "text-fg-orange"
               ],
               description: "Color of the main heading text"
          },
          titleHighlightColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-official",
                    "text-[#1B1B1B]",
                    "text-fg-orange",
                    "text-fg-blue"
               ],
               description: "Color of the highlighted text (midheading)"
          },
          descriptionColor: {
               control: "select",
               options: [
                    "text-neutral/80",
                    "text-white/80",
                    "text-white/70",
                    "text-fg-gray",
                    "text-fg-neutral"
               ],
               description: "Color of the description text"
          },
          blogTitleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-neutral"
               ],
               description: "Color of individual blog titles in cards"
          },
          arrowColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-orange"
               ],
               description: "Color of the arrow icon on hover"
          }
     }
};

export const Default = {
     args: {
          bgImage: "/images/weekend-ux-related-blogs-bg.webp",
          overlayColor: "bg-official/25",
          taglineColor: "text-white",
          titleColor: "text-neutral",
          titleHighlightColor: "text-white",
          descriptionColor: "text-neutral/80",
          blogTitleColor: "text-neutral",
          arrowColor: "text-neutral",
          data: {
               title: "BLOGS",
               startheading: "All You",
               midheading: "Need",
               endheading: " To Know",
               description: "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs."
          }
     }
};

export const DarkTheme = {
     args: {
          bgImage: "/images/weekend-ux-related-blogs-bg.webp",
          overlayColor: "bg-black/75",
          taglineColor: "text-official",
          titleColor: "text-white",
          titleHighlightColor: "text-official",
          descriptionColor: "text-white/70",
          blogTitleColor: "text-white",
          arrowColor: "text-official",
          data: {
               title: "RECENT DISCUSSIONS",
               startheading: "Thoughts &",
               midheading: "Insights",
               endheading: " From Our Mentors",
               description: "Dive deep into modern design principles, tools, and updates from product industry leaders."
          }
     }
};
