'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button';
import { useHomeData } from "@/context/HomeDataContext";
import { CiYoutube } from "react-icons/ci";
import { RiTwitterXLine, RiTwitterXFill } from "react-icons/ri";
import { 
     FaInstagram, 
     FaFacebookF, 
     FaFacebook, 
     FaLinkedinIn, 
     FaLinkedin, 
     FaGithub, 
     FaTwitter, 
     FaYoutube, 
     FaWhatsapp, 
     FaTelegram, 
     FaPinterest, 
     FaTiktok, 
     FaDribbble, 
     FaBehance 
} from "react-icons/fa6";

const SOCIAL_ICON_MAP = {
     CiYoutube,
     RiTwitterXLine,
     RiTwitterXFill,
     FaInstagram,
     FaFacebookF,
     FaFacebook,
     FaLinkedinIn,
     FaLinkedin,
     FaGithub,
     FaTwitter,
     FaYoutube,
     FaWhatsapp,
     FaTelegram,
     FaPinterest,
     FaTiktok,
     FaDribbble,
     FaBehance
};

function getIconComponent(iconName) {
     if (!iconName) return null;
     const Icon = SOCIAL_ICON_MAP[iconName];
     if (Icon) return Icon;
     
     const matchedKey = Object.keys(SOCIAL_ICON_MAP).find(k => k.toLowerCase() === iconName.toLowerCase());
     if (matchedKey) return SOCIAL_ICON_MAP[matchedKey];
     
     return null;
}

const DEFAULT_SETTINGS = {
     buttontitle: "Follow us!",
     buttonname: "Refer & Earn",
     copyright: "© 2026 - Weekend UX All Rights Reserved.",
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
};

const DEFAULT_LOCATIONS = [
     {
          _id: "loc-1",
          title: "UI UX Design Course Locations",
          slug: "ui-ux-design-course-locations",
          items: [
               { _id: "l-1", title: "UI UX Design Course in Bangalore", slug: "ui-ux-design-course-in-bangalore", hero: { title: "UI UX Design Course in Bangalore" } },
               { _id: "l-2", title: "UI UX Design Course in Mumbai", slug: "ui-ux-design-course-in-mumbai", hero: { title: "UI UX Design Course in Mumbai" } },
               { _id: "l-3", title: "UI UX Design Course in Delhi", slug: "ui-ux-design-course-in-delhi", hero: { title: "UI UX Design Course in Delhi" } },
               { _id: "l-4", title: "UI UX Design Course in Pune", slug: "ui-ux-design-course-in-pune", hero: { title: "UI UX Design Course in Pune" } },
               { _id: "l-5", title: "UI UX Design Course in Hyderabad", slug: "ui-ux-design-course-in-hyderabad", hero: { title: "UI UX Design Course in Hyderabad" } }
          ]
     }
];

export default function Footer() {
     const { footerGlobalData, footerColumnsData } = useHomeData();
     const [locations, setLocations] = useState(DEFAULT_LOCATIONS);

     useEffect(() => {
          async function fetchLocations() {
               try {
                    const res = await fetch("/api/locations");
                    if (res.ok) {
                         const data = await res.json();
                         if (Array.isArray(data) && data.length > 0) {
                              setLocations(data);
                         }
                    }
               } catch (error) {
                    console.error("Failed to fetch locations for footer:", error);
               }
          }
          fetchLocations();
     }, []);
     const defaultColumns = [
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
                    { label: "About us", path: "/about-us" },
                    { label: "Careers", path: "/careers" },
               ]
          },
          {
               title: "Popular Courses",
               links: [
                    { label: "UI UX Design Course", path: "/" },
                    { label: "AI Design Tool Course", path: "/" },
               ]
          },
          {
               title: "Trending Courses",
               links: [
                    { label: "Video Editing Course", path: "/" },
                    { label: "Product Design Course", path: "/" },
                    { label: "Full Stack Development Course", path: "/" },
               ]
          }
     ];

     const settings = footerGlobalData || DEFAULT_SETTINGS;
     const footerColumns = (footerColumnsData && footerColumnsData.length > 0)
          ? footerColumnsData
          : defaultColumns;

     const cardTitle = settings?.card?.title && settings.card.title.trim()
          ? settings.card.title.trim()
          : "Start Your Growth Journey Today!";

     const cardButtonName = settings?.card?.buttonName && settings.card.buttonName.trim()
          ? settings.card.buttonName.trim()
          : "Explore Programs";

     return (
          <footer className="bg-[#1C1C1C] text-white w-full -mt-10 relative z-1000 pb-16">
               <div className="absolute -top-22.5 md:-top-45 left-0 right-0 mx-auto w-[90%] md:w-[80%] max-w-[80%] h-45 md:h-90 z-20 flex flex-col items-start justify-center px-2 md:px-10 lg:px-30">
                    <Image src='/images/weekend-ux-footer-decorative-bg.webp' alt="weekend-ux-footer-decorative-bg" fill className="bg-center object-contain " />
                    <div className="font-playfair text-[17px] md:text-[28px] lg:text-[56px] text-neutral-900 max-w-150 relative z-50 leading-9 md:leading-12 lg:leading-16" >
                         {cardTitle}
                    </div>
                    <Link href="/courses">
                         <Button variant="dark" className="mt-0 md:mt-4 lg:mt-10 hover:scale-105 relative z-50">
                              {cardButtonName}
                         </Button>
                    </Link>
               </div>
               <div className="mx-auto max-w-330 px-6 md:px-9 2xl:px-10 pt-32 md:pt-44 2xl:pt-56 pb-5">

                    {/* TOP GRID */}
                    <div className="
          grid gap-y-10 gap-x-8
          grid-cols-1
          md:grid-cols-3
          2xl:grid-cols-5
        ">

                         {/* Follow us */}
                         <div className="order-1 md:order-3 2xl:order-1">
                              <h3 className="text-[20px] mb-5">{settings?.buttontitle || "Follow us!"}</h3>

                              {(settings?.buttonname || !settings) && (
                                   <button className="w-43 h-11 border border-white/70 rounded-md text-[12px] text-[#8FA1B2] mb-5 hover:bg-white/5 transition">
                                        {settings?.buttonname || "Refer & Earn"}
                                   </button>
                              )}

                              <div className="flex gap-3">
                                   {settings && settings.socials && settings.socials.length > 0 ? (
                                        settings.socials.map((social, i) => {
                                             const IconComponent = getIconComponent(social.icon);
                                             if (!IconComponent) return null;
                                             return (
                                                  <a
                                                       href={social.path}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       key={i}
                                                       aria-label={social.icon ? social.icon.replace(/^(Fa|Ri|Ci|Fi)/, "").replace(/([A-Z])/g, " $1").trim() : "Social media"}
                                                       className="min-w-9 h-9 rounded-full bg-official flex items-center justify-center cursor-pointer text-white hover:bg-official/80 transition-colors duration-200"
                                                  >
                                                       <IconComponent size={18} />
                                                  </a>
                                             );
                                        })
                                   ) : (
                                        [FaFacebookF, RiTwitterXLine, FaInstagram, FaLinkedinIn, CiYoutube].map((Icon, i) => (
                                             <div
                                                  key={i}
                                                  className="min-w-9 h-9 rounded-full bg-official flex items-center justify-center cursor-pointer text-white hover:bg-official/80 transition-colors duration-200"
                                             >
                                                  <Icon size={18} strokeWidth={1.2} />
                                             </div>
                                        ))
                                   )}
                              </div>
                         </div>

                         {/* Dynamic Footer Columns */}
                         {footerColumns.map((col, idx) => {
                              const orderClasses = [
                                   "order-3 md:order-1 2xl:order-2",
                                   "order-4 md:order-2 2xl:order-3",
                                   "order-5 md:order-4 2xl:order-4",
                                   "order-6 md:order-5 2xl:order-5",
                              ];
                              const orderClass = orderClasses[idx] || `order-${idx + 3}`;
                              return (
                                   <div key={col._id || idx} className={orderClass}>
                                        <FooterColumn
                                             title={col.title}
                                             links={col.links.map(link => ({ key: link.path, value: link.label }))}
                                        />
                                   </div>
                              );
                         })}

                         {/* App Buttons */}
                         {/* <div className="order-2 md:order-6 2xl:order-6">
                              <h3 className="text-[20px] mb-5">Learn On the Go!</h3>

                              <div className="space-y-3">
                                   <AppButton icon="android" text="Get Android App" />
                                   <AppButton icon="apple" text="Get ios App" />
                              </div>
                         </div> */}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/45 mt-12 pt-12">

                         {/* Dynamic Footer Blocks */}
                         {locations?.length > 0 &&
                              locations.map((block) => (
                                   <FooterTextBlock
                                        key={block.slug || block._id}
                                        title={block.title}
                                        slug={block.slug}
                                        items={block.items}
                                   />
                              ))
                         }

                    </div>

                    {/* Bottom Divider */}
                    <div className="border-t border-white/45 mt-10 pt-8 text-center flex flex-col items-center justify-center">
                         <FooterNav
                              title="Explore"
                              items={
                                   settings && settings.navigation && settings.navigation.length > 0
                                        ? settings.navigation.map(nav => ({ title: nav.itemname, to: nav.itempath }))
                                        : [
                                             { title: "Home", to: "/" },
                                             { title: "Blogs", to: "/category/blogs" },
                                             { title: "Courses", to: "/courses" },
                                             { to: '/about-us', title: 'About us' },
                                             { to: '/disclaimer', title: 'Disclaimer' },
                                             { to: '/privacy-policy', title: 'Privacy Policy' },
                                             { to: '/contact-us', title: 'Contact us' }
                                        ]
                              }
                         />


                         <p className="mt-1 text-[13px] text-white/70">{settings?.copyright || "© 2026 - Weekend UX All Rights Reserved."}</p>
                    </div>
               </div>
          </footer>
     );
}

function FooterColumn({ title, links }) {
     return (
          <div>
               <h3 className="text-[20px] mb-5">{title}</h3>
               <div className="space-y-3 text-[14px] text-white/70 leading-none flex flex-col">
                    {links.map((link, index) => (
                         <Link href={link.key} key={index} className="hover:text-white transition cursor-pointer">
                              {link.value}
                         </Link>
                    ))}
               </div>
          </div>
     );
}

function AppButton({ icon, text }) {
     return (
          <button className="w-45 h-11 border border-white/70 rounded-lg flex items-center px-5 gap-3 text-white/70 text-[13px] hover:bg-white/5 transition">
               {icon === 'android' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M17.6 9.48l1.43-2.49-.83-.48-1.46 2.54A7.93 7.93 0 0012 7.5c-1.68 0-3.24.52-4.53 1.41L6 6.37l-.83.48 1.43 2.49A7.92 7.92 0 004 15v5h2v-5h1v5h2v-5h6v5h2v-5h1v5h2v-5c0-2.25-.94-4.28-2.4-5.52zM8.5 13A1.5 1.5 0 1110 11.5 1.5 1.5 0 018.5 13zm7 0a1.5 1.5 0 111.5-1.5A1.5 1.5 0 0115.5 13z" />
                    </svg>
               ) : (
                    <AirVent size={18} fill="currentColor" />
               )}
               {text}
          </button>
     );
}

function FooterTextBlock({ title, slug, items }) {
     return (
          <div className="mb-10 last:mb-0">

               <h3 className="text-[18px] mb-5">
                    {title}
               </h3>

               <div className="flex gap-2 flex-wrap">

                    {items?.map((item, index) => {
                         const itemSlug = item.hero?.[0]?.slug || item.slug || "";
                         const itemTitle = item.hero?.[0]?.title || item.title || "";
                         
                         return (
                              <div
                                   key={itemSlug || item._id}
                                   className="flex items-center gap-2"
                              >

                                   <Link
                                        href={itemSlug ? `/${itemSlug}` : "#"}
                                        className="text-[13px] text-white/70 leading-8 hover:text-white transition-colors"
                                   >
                                        {itemTitle}
                                   </Link>

                                   {index !== items.length - 1 && (
                                        <span className="text-white/70">|</span>
                                   )}

                              </div>
                         );
                    })}

               </div>

          </div>
     );
}

function FooterNav({ title, items }) {
     return (
          <div className="mb-6">

               <div className="flex justify-start items-center gap-3 text-[14px] text-white/70 flex-wrap">
                    {items?.map((item, index) => (
                         <div key={index} className="flex items-center gap-3">
                              <Link href={item.to} className="hover:text-white transition-all duration-300 ease-in-out">
                                   {item.title}
                              </Link>
                              {index !== items.length - 1 && (
                                   <span className="text-white/30">|</span>
                              )}
                         </div>
                    ))}
               </div>
          </div>
     );
}
