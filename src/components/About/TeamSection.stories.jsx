import TeamSection from "./TeamSection";

export default {
     title: "About/Team Section",
     component: TeamSection,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          bgColor: {
               control: "select",
               options: [
                    "bg-[#F8F6EE]",
                    "bg-bg-neutral",
                    "bg-bg-white",
                    "bg-bg-yellow-light",
                    "bg-bg-gray-light",
                    "bg-bg-cream",
                    "bg-bg-green",
                    "bg-bg-black",
                    "bg-bg-green-light",
                    "bg-bg-yellow-brand",
                    "bg-bg-cream-brand"
               ],
               description: "Background color of the section"
          },
          tagColor: {
               control: "select",
               options: [
                    "text-[#8F6A00]",
                    "text-official",
                    "text-white",
                    "text-fg-orange",
                    "text-fg-neutral",
                    "text-fg-blue"
               ],
               description: "Color of the subtitle/tagline"
          },
          headingColor: {
               control: "select",
               options: [
                    "text-[#2C2A28]",
                    "text-white",
                    "text-official",
                    "text-fg-neutral",
                    "text-fg-blue"
               ],
               description: "Color of the main heading text"
          },
          midHeadingColor: {
               control: "select",
               options: [
                    "text-[#8F6A00]",
                    "text-white",
                    "text-official",
                    "text-fg-neutral",
                    "text-fg-orange"
               ],
               description: "Color of the highlighted text (midheading)"
          },
          descriptionColor: {
               control: "select",
               options: [
                    "text-[#5A5652]",
                    "text-white/80",
                    "text-white/70",
                    "text-fg-gray",
                    "text-fg-neutral"
               ],
               description: "Color of the description paragraph text"
          },
          cardNameColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-official",
                    "text-[#171717]",
                    "text-fg-neutral"
               ],
               description: "Color of member names in cards"
          },
          cardRoleColor: {
               control: "select",
               options: [
                    "text-official",
                    "text-white",
                    "text-[#1B1B1B]",
                    "text-fg-neutral"
               ],
               description: "Color of member roles in cards"
          }
     }
};

export const Default = {
     args: {
          bgColor: "bg-[#F8F6EE]",
          tagColor: "text-[#8F6A00]",
          headingColor: "text-[#2C2A28]",
          midHeadingColor: "text-[#8F6A00]",
          descriptionColor: "text-[#5A5652]",
          cardNameColor: "text-white",
          cardRoleColor: "text-official",
          data: {
               title: "Team",
               startheading: "The Minds You",
               midheading: "Learn",
               endheading: " From",
               description: "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.",
               imageCard: [
                    {
                         name: "Marcus Thorne",
                         role: "Founder & Creative Lead",
                         image: "/images/weekend-ux-about-team-member-1.webp"
                    },
                    {
                         name: "Elena Voss",
                         role: "Design Strategy",
                         image: "/images/weekend-ux-about-team-member-2.webp"
                    }
               ]
          }
     }
};

export const DarkTheme = {
     args: {
          bgColor: "bg-bg-black",
          tagColor: "text-official",
          headingColor: "text-white",
          midHeadingColor: "text-official",
          descriptionColor: "text-white/70",
          cardNameColor: "text-white",
          cardRoleColor: "text-official",
          data: {
               title: "Meet Our Team",
               startheading: "Crafting Futures",
               midheading: "Together",
               endheading: " As One.",
               description: "An elite group of instructors, creators, and consultants working round the clock to reshape UI/UX education.",
               imageCard: [
                    {
                         name: "Marcus Thorne",
                         role: "Founder & Creative Lead",
                         image: "/images/weekend-ux-about-team-member-1.webp"
                    },
                    {
                         name: "Elena Voss",
                         role: "Design Strategy",
                         image: "/images/weekend-ux-about-team-member-2.webp"
                    }
               ]
          }
     }
};
