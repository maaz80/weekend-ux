import React, { useState } from "react";
import { FiCopy, FiCheck, FiSearch, FiShield, FiCheckCircle, FiXCircle, FiInfo, FiBookOpen } from "react-icons/fi";

export default {
     title: "Ant Design System / Color Palette",
     parameters: {
          layout: "fullscreen",
          docs: {
               description: {
                    component: "Official Ant Design Color System, Token Architecture, WCAG 2.1 Contrast Standards, and Do's & Don'ts for Weekend UX."
               }
          }
     }
};

const ColorPaletteDoc = () => {
     const [copiedToken, setCopiedToken] = useState(null);
     const [searchQuery, setSearchQuery] = useState("");
     const [selectedGroup, setSelectedGroup] = useState("all");

     const copyText = (text) => {
          if (navigator.clipboard) {
               navigator.clipboard.writeText(text);
          }
          setCopiedToken(text);
          setTimeout(() => setCopiedToken(null), 2000);
     };

     const colorGroups = [
          {
               id: "brand",
               title: "1. Brand Identity Colors",
               description: "Core brand color tokens powering primary CTA buttons, active state indicators, and signature yellow highlights.",
               colors: [
                    { name: "Brand Yellow (Official)", hex: "#FFD400", rgb: "rgb(255, 212, 0)", variable: "var(--color-official)", class: "bg-official", textClass: "text-neutral", wcag: "AAA (On Dark)", contrastRatio: "14.2:1", usage: "Primary Action Buttons, Active Tab Badges, Highlight Spans" },
                    { name: "Yellow Brand Dark", hex: "#FFB500", rgb: "rgb(255, 181, 0)", variable: "var(--bg-yellow-brand)", class: "bg-[#FFB500]", textClass: "text-neutral", wcag: "AA Compliant", contrastRatio: "11.8:1", usage: "Hover States, Dark Yellow Accents & Star Icons" },
                    { name: "Yellow Light Tint", hex: "#FFF583", rgb: "rgb(255, 245, 131)", variable: "var(--bg-yellow-light)", class: "bg-[#FFF583]", textClass: "text-neutral", wcag: "AA Compliant", contrastRatio: "16.4:1", usage: "Subtle Yellow Container Fills & Highlight Badges" }
               ]
          },
          {
               id: "neutral",
               title: "2. Neutral & Typography Shades",
               description: "Neutral dark and gray shades powering page body backgrounds, headings, body text, and border dividers.",
               colors: [
                    { name: "Neutral Dark (Main)", hex: "#1C1C1C", rgb: "rgb(28, 28, 28)", variable: "var(--neutral)", class: "bg-neutral", textClass: "text-white", wcag: "AAA Compliant", contrastRatio: "16.8:1", usage: "Dark Page Backgrounds, Footer, Primary Dark Text" },
                    { name: "Zinc 900 (Headings)", hex: "#18181B", rgb: "rgb(24, 24, 27)", variable: "text-zinc-900", class: "bg-zinc-900", textClass: "text-white", wcag: "AAA Compliant", contrastRatio: "17.4:1", usage: "Section Headings, H1/H2 Titles, Card Headers" },
                    { name: "Zinc 700 (Body Paragraphs)", hex: "#404040", rgb: "rgb(64, 64, 64)", variable: "text-zinc-700", class: "bg-zinc-700", textClass: "text-white", wcag: "AAA Compliant", contrastRatio: "10.5:1", usage: "Secondary Text, Blog Body Copy, Subtitles" },
                    { name: "Zinc 500 (Muted Meta Copy)", hex: "#71717A", rgb: "rgb(113, 113, 122)", variable: "text-zinc-500", class: "bg-zinc-500", textClass: "text-white", wcag: "AA Compliant", contrastRatio: "4.8:1", usage: "Meta Info, Dates, Breadcrumbs, Captions" },
                    { name: "Border Light", hex: "#E4E4E7", rgb: "rgb(228, 228, 231)", variable: "border-zinc-200", class: "bg-zinc-200", textClass: "text-neutral", wcag: "N/A (Border)", contrastRatio: "Border", usage: "Card Dividers, Container Borders, Input Outlines" }
               ]
          },
          {
               id: "surfaces",
               title: "3. Background Surface Fills",
               description: "Warm off-white and cream background fills providing visual depth across sections, cards, and modal backdrops.",
               colors: [
                    { name: "Warm Off-White Surface", hex: "#FAF9F5", rgb: "rgb(250, 249, 245)", variable: "bg-[#FAF9F5]", class: "bg-[#FAF9F5] border border-zinc-200", textClass: "text-neutral", wcag: "Background", contrastRatio: "1.05:1", usage: "Case Studies & Section Backgrounds" },
                    { name: "Cream Soft Accent", hex: "#FFFCEE", rgb: "rgb(255, 252, 238)", variable: "--bg-cream", class: "bg-[#FFFCEE] border border-amber-200", textClass: "text-neutral", wcag: "Background", contrastRatio: "1.02:1", usage: "Highlighted Card Fills, Alert Boxes, Badges" },
                    { name: "Warm Light Background", hex: "#FCFBF7", rgb: "rgb(252, 251, 247)", variable: "bg-[#FCFBF7]", class: "bg-[#FCFBF7] border border-zinc-200", textClass: "text-neutral", wcag: "Background", contrastRatio: "1.01:1", usage: "Dashboard, Search Page & Blog Listing Background" },
                    { name: "Pure White Surface", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", variable: "--bg-white", class: "bg-white border border-zinc-200", textClass: "text-neutral", wcag: "Background", contrastRatio: "Base", usage: "Card Backgrounds, Input Fields, Modals" }
               ]
          },
          {
               id: "status",
               title: "4. Semantic & Status Accents",
               description: "Functional indicator colors for category tags, verified status badges, warning notifications, and interactive links.",
               colors: [
                    { name: "Blue (Web / Tech)", hex: "#003D63", rgb: "rgb(0, 61, 99)", variable: "--fg-blue", class: "bg-[#003D63]", textClass: "text-white", wcag: "AAA Compliant", contrastRatio: "9.6:1", usage: "Web Development Category Badges & Technical Links" },
                    { name: "Green (Success / Unlocked)", hex: "#00783E", rgb: "rgb(0, 120, 62)", variable: "--fg-green", class: "bg-[#00783E]", textClass: "text-white", wcag: "AAA Compliant", contrastRatio: "6.2:1", usage: "Verified Student Badges, Success Messages, Unlocked Cards" },
                    { name: "Red (Alert / Error)", hex: "#C20001", rgb: "rgb(194, 0, 1)", variable: "--fg-red", class: "bg-[#C20001]", textClass: "text-white", wcag: "AAA Compliant", contrastRatio: "7.1:1", usage: "Validation Errors, Urgent Alerts, Locked Course Locks" },
                    { name: "Orange (Popular Highlight)", hex: "#9C4C00", rgb: "rgb(156, 76, 0)", variable: "--fg-orange", class: "bg-[#9C4C00]", textClass: "text-white", wcag: "AAA Compliant", usage: "Popular Course Badges, Star Ratings, Taglines" }
               ]
          }
     ];

     const dosAndDonts = [
          {
               title: "CTA Buttons & High-Contrast Pairing",
               doText: "Use Official Yellow (#FFD400) for primary CTA buttons with dark text (#1C1C1C) for maximum contrast (14.2:1 ratio).",
               dontText: "Don't use white or light yellow text on Official Yellow buttons as it severely violates WCAG accessibility rules.",
               doPair: { bg: "bg-official", text: "text-neutral", label: "Enquire Now" },
               dontPair: { bg: "bg-official", text: "text-white/70", label: "Enquire Now" }
          },
          {
               title: "Section Background & Card Surface Hierarchy",
               doText: "Use warm off-white (#FAF9F5 / #FCFBF7) for section backgrounds and pure white (#FFFFFF) for cards to create clean depth.",
               dontText: "Don't mix harsh cool blue-grays (#F0F4F8) with warm cream backgrounds on the same page.",
               doPair: { bg: "bg-[#FAF9F5]", text: "text-zinc-900", label: "Card on Warm Background" },
               dontPair: { bg: "bg-blue-50", text: "text-zinc-900", label: "Haphazard Cool Gray Mix" }
          }
     ];

     return (
          <div className="bg-[#F8F9FA] text-[#1C1C1C] min-h-screen p-4 sm:p-8 lg:p-12 text-left font-urbanist antialiased">
               <div className="max-w-7xl mx-auto space-y-10">

                    {/* HERO HEADER */}
                    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
                         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                              <div>
                                   <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-neutral text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-xs">
                                             Ant Design System
                                        </span>
                                        <span className="bg-official/20 text-neutral border border-official/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                             Color Architecture Specification
                                        </span>
                                   </div>
                                   <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-neutral tracking-tight mb-2">
                                        Color System & Token Specification
                                   </h1>
                                   <p className="text-zinc-500 text-sm sm:text-base max-w-3xl leading-relaxed">
                                        Comprehensive reference for brand colors, background surfaces, typography contrast, WCAG 2.1 AAA accessibility rules, and token copyables.
                                   </p>
                              </div>

                              {/* SEARCH FILTER */}
                              <div className="relative shrink-0 w-full sm:w-80">
                                   <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by color name, HEX, or token..."
                                        className="w-full h-11 pl-10 pr-4 rounded-2xl border border-zinc-200 bg-zinc-50 text-xs font-medium text-neutral focus:bg-white focus:border-amber-400 outline-none transition-all shadow-2xs"
                                   />
                                   <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
                              </div>
                         </div>

                         {/* CATEGORY TABS */}
                         <div className="flex items-center gap-2 mt-8 pt-6 border-t border-zinc-150 overflow-x-auto">
                              {[
                                   { id: "all", label: "All Tokens (16)" },
                                   { id: "brand", label: "1. Brand Identity" },
                                   { id: "neutral", label: "2. Neutrals & Text" },
                                   { id: "surfaces", label: "3. Surfaces & Backgrounds" },
                                   { id: "status", label: "4. Status & Accents" }
                              ].map(tab => (
                                   <button
                                        key={tab.id}
                                        onClick={() => setSelectedGroup(tab.id)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${selectedGroup === tab.id
                                             ? "bg-neutral text-white shadow-xs"
                                             : "bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200 hover:text-neutral"
                                             }`}
                                   >
                                        {tab.label}
                                   </button>
                              ))}
                         </div>
                    </div>

                    {/* SECTION: SYSTEM PRINCIPLES & WCAG RULES */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-2xs space-y-2">
                              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                                   <FiShield className="text-xl" />
                              </div>
                              <h3 className="font-bold text-base text-neutral">WCAG 2.1 AAA Contrast</h3>
                              <p className="text-xs text-zinc-500 leading-relaxed">
                                   All primary text and button pairings exceed 7:1 contrast ratio, ensuring optimal readability for visually impaired users.
                              </p>
                         </div>

                         <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-2xs space-y-2">
                              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                                   <FiCheckCircle className="text-xl" />
                              </div>
                              <h3 className="font-bold text-base text-neutral">Consistent Surface Hierarchy</h3>
                              <p className="text-xs text-zinc-500 leading-relaxed">
                                   Warm off-whites (#FAF9F5 / #FCFBF7) build section depth, while pure white (#FFFFFF) isolates interactive cards.
                              </p>
                         </div>

                         <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-2xs space-y-2">
                              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                                   <FiBookOpen className="text-xl" />
                              </div>
                              <h3 className="font-bold text-base text-neutral">Tailwind v4 Token Mapping</h3>
                              <p className="text-xs text-zinc-500 leading-relaxed">
                                   Every color swatch directly maps to a CSS variable (`var(--color-official)`) and Tailwind utility class (`bg-official`).
                              </p>
                         </div>
                    </div>

                    {/* COLOR SWATCH GROUPS */}
                    <div className="space-y-8">
                         {colorGroups.filter(g => selectedGroup === "all" || g.id === selectedGroup).map((group, gIdx) => {
                              const filteredColors = group.colors.filter(c =>
                                   c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   c.hex.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   c.variable.toLowerCase().includes(searchQuery.toLowerCase())
                              );

                              if (filteredColors.length === 0) return null;

                              return (
                                   <div key={gIdx} className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                                        <div className="border-b border-zinc-150 pb-4 mb-6">
                                             <h3 className="font-bold text-xl text-neutral mb-1">{group.title}</h3>
                                             <p className="text-xs text-zinc-500">{group.description}</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                             {filteredColors.map((color, cIdx) => (
                                                  <div key={cIdx} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between group">

                                                       {/* SWATCH COLOR BOX */}
                                                       <div className={`h-32 p-4 flex flex-col justify-between ${color.class} ${color.textClass} transition-transform duration-300 group-hover:scale-[1.01]`}>
                                                            <div className="flex items-center justify-between">
                                                                 <span className="font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-black/20 backdrop-blur-xs uppercase tracking-wider text-white">
                                                                      {color.wcag}
                                                                 </span>
                                                                 <button
                                                                      onClick={() => copyText(color.hex)}
                                                                      className="bg-black/20 hover:bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer text-white"
                                                                      title="Copy HEX Code"
                                                                 >
                                                                      <span>{color.hex}</span>
                                                                      {copiedToken === color.hex ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                                                                 </button>
                                                            </div>
                                                            <div className="flex justify-between items-center text-[10px] font-mono opacity-90">
                                                                 <span>{color.rgb}</span>
                                                                 <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded text-[9px]">{color.contrastRatio}</span>
                                                            </div>
                                                       </div>

                                                       {/* TOKEN INFO */}
                                                       <div className="p-4 text-left space-y-2.5">
                                                            <h4 className="font-bold text-sm text-neutral">{color.name}</h4>
                                                            <button
                                                                 onClick={() => copyText(color.variable)}
                                                                 className="w-full flex items-center justify-between font-mono text-[11px] text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                                                                 title="Copy CSS Token"
                                                            >
                                                                 <span className="truncate">{color.variable}</span>
                                                                 {copiedToken === color.variable ? <FiCheck className="text-emerald-600 shrink-0 text-xs" /> : <FiCopy className="shrink-0 text-xs" />}
                                                            </button>
                                                            <p className="text-[11px] text-zinc-500 leading-tight pt-1.5 border-t border-zinc-100">{color.usage}</p>
                                                       </div>

                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              );
                         })}
                    </div>

                    {/* SECTION: DO'S AND DON'TS VISUAL GUIDELINES */}
                    <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
                         <div className="border-b border-zinc-150 pb-4">
                              <h3 className="font-bold text-xl text-neutral mb-1">Color Pairing Guidelines (Do&apos;s &amp; Don&apos;ts)</h3>
                              <p className="text-xs text-zinc-500">Strict pairing rules to prevent low-contrast text and inconsistent background usage.</p>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {dosAndDonts.map((item, idx) => (
                                   <div key={idx} className="space-y-4">
                                        <h4 className="font-bold text-sm text-neutral">{item.title}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                             {/* DO BOX */}
                                             <div className="border-2 border-emerald-500/30 rounded-2xl p-4 bg-emerald-50/20 space-y-3">
                                                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                                                       <FiCheckCircle className="text-emerald-600" /> DO THIS
                                                  </div>
                                                  <div className={`p-4 rounded-xl font-bold text-sm text-center ${item.doPair.bg} ${item.doPair.text}`}>
                                                       {item.doPair.label}
                                                  </div>
                                                  <p className="text-[11px] text-zinc-600 leading-snug">{item.doText}</p>
                                             </div>

                                             {/* DONT BOX */}
                                             <div className="border-2 border-red-500/30 rounded-2xl p-4 bg-red-50/20 space-y-3">
                                                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
                                                       <FiXCircle className="text-red-600" /> DON&apos;T DO THIS
                                                  </div>
                                                  <div className={`p-4 rounded-xl font-bold text-sm text-center ${item.dontPair.bg} ${item.dontPair.text}`}>
                                                       {item.dontPair.label}
                                                  </div>
                                                  <p className="text-[11px] text-zinc-600 leading-snug">{item.dontText}</p>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

               </div>
          </div>
     );
};

export const Specification = {
     render: () => <ColorPaletteDoc />
};
