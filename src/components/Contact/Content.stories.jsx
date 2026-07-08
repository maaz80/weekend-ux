import Content from "./Content";

export default {
     title: "Contact/Content",
     component: Content,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          bgColor: {
               control: "select",
               options: [
                    "bg-[#FFFCEE]",
                    "bg-bg-neutral",
                    "bg-bg-white",
                    "bg-bg-yellow-light",
                    "bg-bg-gray-light",
                    "bg-bg-cream",
                    "bg-bg-green",
                    "bg-bg-black"
               ],
               description: "Background color of the section"
          },
          infoTextColor: {
               control: "select",
               options: [
                    "text-neutral-600",
                    "text-neutral-500",
                    "text-white/80",
                    "text-white/60",
                    "text-fg-gray",
                    "text-fg-neutral"
               ],
               description: "Text color for enquiry details and links"
          },
          inquiriesTitleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-blue",
                    "text-fg-neutral"
               ],
               description: "Color of the inquiries title"
          },
          locationTitleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-blue",
                    "text-fg-neutral"
               ],
               description: "Color of the location title"
          },
          socialTitleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-blue",
                    "text-fg-neutral"
               ],
               description: "Color of the socials title"
          },
          mapRounded: {
               control: "select",
               options: [
                    "rounded-3xl",
                    "rounded-2xl",
                    "rounded-xl",
                    "rounded-none",
                    "rounded-full"
               ],
               description: "Rounded corners of the map image"
          },
          formBgColor: {
               control: "select",
               options: [
                    "bg-white",
                    "bg-bg-neutral",
                    "bg-bg-cream",
                    "bg-bg-yellow-brand",
                    "bg-bg-gray-soft"
               ],
               description: "Background color of the enquiry form card"
          },
          formHeadingColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-blue"
               ],
               description: "Color of the 'Enquire Here!' title in the form card"
          },
          formShadow: {
               control: "select",
               options: [
                    "shadow-[0_8px_24px_rgba(156,163,175,0.15)]",
                    "shadow-none",
                    "shadow-md",
                    "shadow-lg",
                    "shadow-xl",
                    "shadow-2xl"
               ],
               description: "Shadow styling for the enquiry form card"
          }
     }
};

export const Default = {
     args: {
          bgColor: "bg-[#FFFCEE]",
          infoTextColor: "text-neutral-600",
          inquiriesTitleColor: "text-neutral",
          locationTitleColor: "text-neutral",
          socialTitleColor: "text-neutral",
          mapRounded: "rounded-3xl",
          formBgColor: "bg-white",
          formHeadingColor: "text-neutral",
          formShadow: "shadow-[0_8px_24px_rgba(156,163,175,0.15)]",
          data: {
               leftsection: {
                    image: "/images/weekend-ux-contact-decorative-image.webp",
                    inquiries: {
                         title: "Inquiries",
                         email: "hello@weekendux.com",
                         phone: "+91 888 888 8888"
                    },
                    location: {
                         title: "Location",
                         address: "424 Madison Avenue\nNew Delhi, DL 10017"
                    },
                    social: {
                         title: "Socials",
                         platform: [
                              { label: "Instagram", url: "#" },
                              { label: "LinkedIn", url: "#" },
                              { label: "Dribbble", url: "#" }
                         ]
                    }
               },
               mapimage: "/images/weekend-ux-contact-map.webp"
          }
     }
};

export const DarkTheme = {
     args: {
          bgColor: "bg-bg-black",
          infoTextColor: "text-white/70",
          inquiriesTitleColor: "text-white",
          locationTitleColor: "text-white",
          socialTitleColor: "text-white",
          mapRounded: "rounded-xl",
          formBgColor: "bg-bg-neutral",
          formHeadingColor: "text-white",
          formShadow: "shadow-2xl",
          data: {
               leftsection: {
                    image: "/images/weekend-ux-contact-decorative-image.webp",
                    inquiries: {
                         title: "Contact Us",
                         email: "support@weekendux.com",
                         phone: "+91 999 999 9999"
                    },
                    location: {
                         title: "Headquarters",
                         address: "Cyber City, Phase 3\nGurugram, HR 122002"
                    },
                    social: {
                         title: "Follow Us",
                         platform: [
                              { label: "Twitter", url: "#" },
                              { label: "YouTube", url: "#" },
                              { label: "Medium", url: "#" }
                         ]
                    }
               },
               mapimage: "/images/weekend-ux-contact-map.webp"
          }
     }
};
