import Footer from "./Footer";

export default {
     title: "Components/Footer",
     component: Footer,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          bgColor: {
               control: "select",
               options: [
                    "bg-[#1C1C1C]",
                    "bg-bg-black",
                    "bg-bg-neutral",
                    "bg-[#0F5A47]",
                    "bg-zinc-800",
                    "bg-zinc-950"
               ],
               description: "Background color of the main footer section"
          },
          textColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-[#8FA1B2]",
                    "text-zinc-300",
                    "text-official"
               ],
               description: "Base text color of the footer content"
          },
          bannerBgImage: {
               control: "text",
               description: "Background Image URL for the call-to-action banner"
          },
          bannerTitleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-orange",
                    "text-fg-blue"
               ],
               description: "Color of the title in the call-to-action banner"
          }
     }
};

export const Default = {
     args: {
          bgColor: "bg-[#1C1C1C]",
          textColor: "text-white",
          bannerBgImage: "/images/weekend-ux-footer-decorative-bg.webp",
          bannerTitleColor: "text-neutral",
          footerGlobalData: {
               buttontitle: "Follow us!",
               buttonname: "Refer & Earn",
               copyright: "© 2026 - Weekend UX All Rights Reserved.",
               card: {
                    title: "Start Your Growth Journey Today!",
                    buttonName: "Explore Programs"
               },
               socials: [
                    { icon: "FaFacebookF", path: "https://www.facebook.com/weekendux/" },
                    { icon: "RiTwitterXLine", path: "https://twitter.com" },
                    { icon: "FaInstagram", path: "https://www.instagram.com/weekendux1/" },
                    { icon: "FaLinkedinIn", path: "https://www.linkedin.com/in/weekend-ux-7b03212a8/" },
                    { icon: "CiYoutube", path: "https://youtube.com" }
               ],
               navigation: [
                    { itemname: "Home", itempath: "/" },
                    { itemname: "Blogs", itempath: "/category/blogs" },
                    { itemname: "Courses", itempath: "/courses" },
                    { itemname: "About us", itempath: "/about-us" },
                    { itemname: "Disclaimer", itempath: "/disclaimer" },
                    { itemname: "Privacy Policy", itempath: "/privacy-policy" },
                    { itemname: "Contact us", itempath: "/contact-us" }
               ]
          },
          footerColumnsData: [
               {
                    title: "Company",
                    links: [
                         { label: "About us", path: "/about-us" },
                         { label: "Courses", path: "/courses" },
                         { label: "Disclaimer", path: "/disclaimer" },
                         { label: "Privacy Policy", path: "/privacy-policy" },
                         { label: "Contact us", path: "/contact-us" },
                         { label: "Blogs", path: "/category/blogs" },
                    ]
               },
               {
                    title: "For Business",
                    links: [
                         { label: "About us", path: "/about-us" }
                    ]
               },
               {
                    title: "Popular Courses",
                    links: [
                         { label: "UI UX Design Course", path: "/" },
                         { label: "AI Design Tool Course", path: "/" }
                    ]
               },
               {
                    title: "Trending Courses",
                    links: [
                         { label: "Video Editing Course", path: "/" },
                         { label: "Product Design Course", path: "/" },
                         { label: "Full Stack Development Course", path: "/" }
                    ]
               }
          ]
     }
};

export const AlternateTheme = {
     args: {
          bgColor: "bg-[#0F5A47]",
          textColor: "text-[#FFFCEE]",
          bannerBgImage: "/images/weekend-ux-footer-decorative-bg.webp",
          bannerTitleColor: "text-neutral",
          footerGlobalData: {
               buttontitle: "Stay Connected",
               buttonname: "Get Coupon",
               copyright: "© 2026 Weekend UX Design Studio.",
               card: {
                    title: "Ready to Transform Your Skills?",
                    buttonName: "Register Now"
               },
               socials: [
                    { icon: "FaInstagram", path: "https://www.instagram.com/weekendux1/" },
                    { icon: "FaLinkedinIn", path: "https://www.linkedin.com/in/weekend-ux-7b03212a8/" }
               ],
               navigation: [
                    { itemname: "Home", itempath: "/" },
                    { itemname: "Courses", itempath: "/courses" },
                    { itemname: "Contact us", itempath: "/contact-us" }
               ]
          },
          footerColumnsData: [
               {
                    title: "Company",
                    links: [
                         { label: "About us", path: "/about-us" },
                         { label: "Courses", path: "/courses" },
                         { label: "Contact us", path: "/contact-us" }
                    ]
               },
               {
                    title: "Quick Links",
                    links: [
                         { label: "Privacy Policy", path: "/privacy-policy" },
                         { label: "Disclaimer", path: "/disclaimer" }
                    ]
               }
          ]
     }
};
