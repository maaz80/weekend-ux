'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button';
import { useHomeData } from "@/context/HomeDataContext";
import Logo from "@/app/assets/weekend-ux-logo.webp";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { CiYoutube } from "react-icons/ci";
import { RiTwitterXLine, RiTwitterXFill } from "react-icons/ri";
import { SiFacebook, SiYoutube } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
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
     SiFacebook,
     SiYoutube,
     FaXTwitter,
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

function getIconComponent(iconName, path = "") {
     const name = (iconName || "").toLowerCase().trim();
     const url = (path || "").toLowerCase().trim();

     if (iconName && SOCIAL_ICON_MAP[iconName]) {
          return SOCIAL_ICON_MAP[iconName];
     }

     if (name) {
          const matchedKey = Object.keys(SOCIAL_ICON_MAP).find(k => k.toLowerCase() === name);
          if (matchedKey) return SOCIAL_ICON_MAP[matchedKey];
     }

     if (name.includes("facebook") || name.includes("fb")) return SiFacebook;
     if (name.includes("instagram") || name.includes("insta")) return FaInstagram;
     if (name.includes("linkedin")) return FaLinkedinIn;
     if (name.includes("youtube") || name.includes("yt")) return SiYoutube;
     if (name.includes("twitter") || name.includes("x")) return FaXTwitter;
     if (name.includes("github")) return FaGithub;
     if (name.includes("whatsapp")) return FaWhatsapp;
     if (name.includes("telegram")) return FaTelegram;
     if (name.includes("pinterest")) return FaPinterest;
     if (name.includes("tiktok")) return FaTiktok;
     if (name.includes("dribbble")) return FaDribbble;
     if (name.includes("behance")) return FaBehance;

     if (url.includes("facebook.com")) return SiFacebook;
     if (url.includes("instagram.com")) return FaInstagram;
     if (url.includes("linkedin.com")) return FaLinkedinIn;
     if (url.includes("youtube.com") || url.includes("youtu.be")) return SiYoutube;
     if (url.includes("twitter.com") || url.includes("x.com")) return FaXTwitter;
     if (url.includes("github.com")) return FaGithub;
     if (url.includes("wa.me") || url.includes("whatsapp.com")) return FaWhatsapp;
     if (url.includes("t.me") || url.includes("telegram.org")) return FaTelegram;

     return FaInstagram;
}

const DEFAULT_SETTINGS = {
     buttontitle: "Follow us!",
     buttonname: "Refer & Earn",
     copyright: "© 2026 - Weekend UX All Rights Reserved.",
     socials: [
          { icon: "SiFacebook", path: "https://www.facebook.com/weekendux/" },
          { icon: "FaInstagram", path: "https://www.instagram.com/weekendux1/" },
          { icon: "FaLinkedinIn", path: "https://www.linkedin.com/in/weekend-ux-7b03212a8/" },
          { icon: "SiYoutube", path: "https://www.youtube.com/" },
          { icon: "FaXTwitter", path: "https://x.com/" }
     ],
     navigation: [
          { itemname: "Home", itempath: "/" },
          { itemname: "Blogs", itempath: "/blog" },
          { itemname: "Courses", itempath: "/courses" },
          { itemname: "About us", itempath: "/about-us" },
          { itemname: "Disclaimer", itempath: "/disclaimer" },
          { itemname: "Privacy Policy", itempath: "/privacy-policy" },
          { itemname: "Terms & Conditions", itempath: "/terms-and-conditions-enrolment" },
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

export default function Footer({
     footerGlobalData: initialGlobalData,
     footerColumnsData: initialColumnsData,
     bgColor = "bg-[#1C1C1C]",
     textColor = "text-white",
     bannerBgImage = "/images/weekend-ux-footer-decorative-bg.webp",
     bannerTitleColor = "text-neutral"
}) {
     const { footerGlobalData, footerColumnsData, navbarData, locationsData } = useHomeData();
     const hasLogoImage = navbarData?.logo?.image && navbarData.logo.image.trim();

     // locationsData is fetched at BUILD TIME via layout.js — no runtime API call needed
     const locations = (locationsData && locationsData.length > 0) ? locationsData : DEFAULT_LOCATIONS;
     const defaultColumns = [
          {
               title: "Company",
               links: [
                    { label: "About us", path: "/about-us" },
                    { label: "Courses", path: "/courses" },
                    { label: "Disclaimer", path: "/disclaimer" },
                    { label: "Privacy Policy", path: "/privacy-policy" },
                    { label: "Terms & Conditions", path: "/terms-and-conditions-enrolment" },
                    { label: "Contact us", path: "/contact-us" },
                    { label: "Blogs", path: "/blog" },
               ]
          },
          {
               title: "For Business",
               links: [
                    { label: "About us", path: "/about-us" },
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

     const settings = initialGlobalData || footerGlobalData || DEFAULT_SETTINGS;
     const footerColumns = (initialColumnsData && initialColumnsData.length > 0)
          ? initialColumnsData
          : (footerColumnsData && footerColumnsData.length > 0)
               ? footerColumnsData
               : defaultColumns;

     const cardTitle = settings?.card?.title && settings.card.title.trim()
          ? settings.card.title.trim()
          : "Start Your Growth Journey Today!";

     const cardButtonName = settings?.card?.buttonName && settings.card.buttonName.trim()
          ? settings.card.buttonName.trim()
          : "Explore Programs";

     return (
          <footer className={`w-full -mt-10 relative z-1000 pb-16 ${bgColor} ${textColor}`}>
               <div className="absolute -top-20 sm:-top-28 md:-top-36 lg:-top-44 left-0 right-0 mx-auto w-[92%] sm:w-[88%] md:w-[85%] lg:w-[80%] max-w-6xl h-44 sm:h-56 md:h-72 lg:h-80 xl:h-88 z-20 flex flex-col items-start justify-center px-6 sm:px-10 md:px-14 lg:px-20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
                    {/* Desktop Footer Decorative Background Image */}
                    <Image src={bannerBgImage} alt="weekend-ux-footer-decorative-bg" fill loading="lazy" sizes="(max-width: 1024px) 100vw, 1200px" className="hidden md:block object-fill rounded-2xl md:rounded-3xl" />
                    {/* Mobile Footer Decorative Background Image */}
                    <Image src="/images/weekend-ux-footer-decorative-bg-mobile.webp" alt="weekend-ux-footer-decorative-bg-mobile" fill loading="lazy" sizes="100vw" className="md:hidden object-cover rounded-2xl" />
                    <div className={`font-playfair text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-[46px] max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl relative z-50 leading-snug md:leading-tight lg:leading-tight font-medium ${bannerTitleColor}`} >
                         {cardTitle}
                    </div>
                    <Link href="/contact-us">
                         <Button variant="dark" className="mt-2 sm:mt-3 md:mt-5 lg:mt-7 hover:scale-105 relative z-50">
                              {cardButtonName}
                         </Button>
                    </Link>
               </div>
               <div className="mx-auto max-w-330 px-6 md:px-9 2xl:px-10 pt-28 sm:pt-36 md:pt-48 lg:pt-56 pb-5">

                    {/* TOP GRID */}
                    <div className="
          grid gap-y-10 gap-x-8
          grid-cols-1
          md:grid-cols-3
          2xl:grid-cols-5
        ">
                          {/* Brand Logo & Social Icons */}
                          <div className="order-1 md:order-3 2xl:order-1 flex flex-col items-start md:items-center gap-5">
                               <Link href="/" className="inline-block">
                                    {hasLogoImage ? (
                                         <OptimizedImage
                                              src={navbarData.logo.image.trim()}
                                              alt={navbarData?.logo?.alt && navbarData.logo.alt.trim() ? navbarData.logo.alt.trim() : "Logo"}
                                              className="w-auto h-10 md:h-18 object-contain"
                                              objectFit="contain"
                                              sizes="180px"
                                              width={180}
                                              height={72}
                                         />
                                    ) : (
                                         <Image
                                              src={Logo}
                                              alt="weekend-ux-logo"
                                              width={160}
                                              height={50}
                                              className="w-auto h-10 md:h-18 object-contain"
                                         />
                                    )}
                               </Link>

                               <div className="flex gap-3 items-center">
                                    {settings && settings.socials && settings.socials.length > 0 ? (
                                         settings.socials
                                              .filter(social => social.path && social.path.trim() && social.path !== "#")
                                              .map((social, i) => {
                                                   const IconComponent = getIconComponent(social.icon, social.path);
                                                   const iconName = social.icon ? social.icon.replace(/^(Fa|Ri|Ci|Fi|Si)/, "").replace(/([A-Z])/g, " $1").trim() : "Social media";
                                                   return (
                                                        <a
                                                             href={social.path}
                                                             target="_blank"
                                                             rel="noopener noreferrer"
                                                             key={i}
                                                             aria-label={`Weekend UX on ${iconName}`}
                                                             className="w-8 h-8 rounded-full bg-official flex items-center justify-center cursor-pointer text-neutral hover:bg-official/80 hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                                                        >
                                                             <IconComponent size={16} aria-hidden="true" />
                                                        </a>
                                                   );
                                              })
                                    ) : (
                                         [
                                              { Icon: SiFacebook, path: "https://www.facebook.com/weekendux/", label: "Weekend UX on Facebook" },
                                              { Icon: FaInstagram, path: "https://www.instagram.com/weekendux1/", label: "Weekend UX on Instagram" },
                                              { Icon: FaLinkedinIn, path: "https://www.linkedin.com/in/weekend-ux-7b03212a8/", label: "Weekend UX on LinkedIn" },
                                              { Icon: SiYoutube, path: "https://www.youtube.com/", label: "Weekend UX on YouTube" },
                                              { Icon: FaXTwitter, path: "https://x.com/", label: "Weekend UX on Twitter" }
                                         ].map(({ Icon, path, label }, i) => (
                                              <a
                                                   key={i}
                                                   href={path}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   aria-label={label}
                                                   className="w-8 h-8 rounded-full bg-official flex items-center justify-center cursor-pointer text-neutral hover:bg-official/80 hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                                              >
                                                   <Icon size={16} aria-hidden="true" />
                                              </a>
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
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/5 mt-6 md:mt-12 pt-6 md:pt-12">

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
                    <div className="border-t border-white/5 mt-6 md:mt-10 pt-6 md:pt-8 text-center flex flex-col items-center justify-center">
                         <FooterNav
                              title="Explore"
                              items={
                                   settings && settings.navigation && settings.navigation.length > 0
                                        ? settings.navigation.map(nav => ({ title: nav.itemname, to: nav.itempath }))
                                        : [
                                             { title: "Home", to: "/" },
                                             { title: "Blogs", to: "/blog" },
                                             { title: "Courses", to: "/courses" },
                                             { to: '/about-us', title: 'About us' },
                                             { to: '/disclaimer', title: 'Disclaimer' },
                                             { to: '/privacy-policy', title: 'Privacy Policy' },
                                             { to: '/terms-and-conditions-enrolment', title: 'Terms & Conditions' },
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.61-.74 1.02-1.77.91-2.8-.88.04-1.95.59-2.58 1.33-.56.65-.96 1.71-.83 2.73 1 .08 2-.51 2.5-1.26z" />
                    </svg>
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
                                        href={itemSlug ? `/location/${itemSlug}` : "#"}
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
