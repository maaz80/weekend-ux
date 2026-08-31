import React, { useState } from "react";
import { FiCopy, FiCheck, FiSliders, FiSun, FiMoon, FiSmartphone, FiTablet, FiMonitor, FiType, FiCode } from "react-icons/fi";

export default {
     title: "Ant Design System / Typography",
     parameters: {
          layout: "fullscreen",
          docs: {
               description: {
                    component: "Ultra-precise Ant Design Specification & Interactive Design Tokens Portal for Weekend UX Typography."
               }
          }
     }
};

const TypographyDoc = () => {
     const [copiedToken, setCopiedToken] = useState(null);
     const [customText, setCustomText] = useState("Design Skills That Actually Get You Hired.");
     const [previewBg, setPreviewBg] = useState("light"); // light, dark, cream
     const [activeTab, setActiveTab] = useState("all"); // all, headings, body, badges

     const copyToClipboard = (text) => {
          navigator.clipboard.writeText(text);
          setCopiedToken(text);
          setTimeout(() => setCopiedToken(null), 2000);
     };

     const typographyData = [
          {
               id: "eyebrow",
               category: "badges",
               class: "eyebrow-tagline",
               tag: "SPAN",
               name: "Sub-Tagline Eyebrow",
               fontFamily: "Urbanist, sans-serif",
               mobileSize: "11px",
               desktopSize: "13px",
               weight: "700 (Bold)",
               letterSpacing: "0.45em (7.2px)",
               colorToken: "var(--color-official) / #FFD400",
               sample: "EXPLORE OUR COURSES & PROGRAMS",
               description: "Top category badge positioned directly above H1/H2 titles.",
               cssCode: `.eyebrow-tagline {\n  font-family: var(--font-urbanist), sans-serif;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.45em;\n  color: var(--color-official);\n  margin-bottom: 0.5rem;\n}`
          },
          {
               id: "h1-hero",
               category: "headings",
               class: "h1-hero-title",
               tag: "H1",
               name: "Primary Hero Title",
               fontFamily: "Playfair Display, serif",
               mobileSize: "22px (leading 40px)",
               desktopSize: "56px (leading 80px)",
               weight: "400 (Regular) / 700 (Bold)",
               letterSpacing: "Normal",
               colorToken: "#FFFFFF (Dark BG) / #1C1C1C (Light BG)",
               sample: customText || "Design Skills That Actually Get You Hired.",
               description: "Main top-level page Hero section H1 title across major landing pages.",
               cssCode: `.h1-hero-title {\n  font-family: var(--font-playfair), serif;\n  font-size: 22px;\n  line-height: 2.5rem;\n  color: #ffffff;\n  position: relative;\n  z-index: 50;\n}\n@media (min-width: 768px) { .h1-hero-title { font-size: 38px; line-height: 3.75rem; } }\n@media (min-width: 1536px) { .h1-hero-title { font-size: 56px; line-height: 5rem; } }`
          },
          {
               id: "h2-lg",
               category: "headings",
               class: "h2-section-title-lg",
               tag: "H2",
               name: "Large Section Display Title",
               fontFamily: "Playfair Display, serif",
               mobileSize: "38px (leading 1.05)",
               desktopSize: "72px (leading 1.05)",
               weight: "500 (Medium)",
               letterSpacing: "Tight (-0.02em)",
               colorToken: "var(--neutral) / #1C1C1C",
               sample: "All You Need To Know",
               description: "High-impact section headers for FAQ, Testimonials, and Related Blogs.",
               cssCode: `.h2-section-title-lg {\n  font-family: var(--font-playfair), serif;\n  font-size: 38px;\n  line-height: 1.05;\n  color: var(--neutral);\n  text-align: center;\n}\n@media (min-width: 768px) { .h2-section-title-lg { font-size: 58px; } }\n@media (min-width: 1024px) { .h2-section-title-lg { font-size: 72px; } }`
          },
          {
               id: "h2-std",
               category: "headings",
               class: "h2-section-title",
               tag: "H2",
               name: "Standard Section Title",
               fontFamily: "Playfair Display, serif",
               mobileSize: "32px (leading 1.2)",
               desktopSize: "42px (leading 1.2)",
               weight: "700 (Bold)",
               letterSpacing: "Tight",
               colorToken: "#18181B (text-zinc-900)",
               sample: "UX Case Studies by Our Students",
               description: "Standard page section headers used across Course Details, Case Studies, and Programs.",
               cssCode: `.h2-section-title {\n  font-family: var(--font-playfair), serif;\n  font-size: 32px;\n  line-height: 1.2;\n  font-weight: 700;\n  color: #18181b;\n}\n@media (min-width: 768px) { .h2-section-title { font-size: 42px; } }`
          },
          {
               id: "h3-card",
               category: "headings",
               class: "h3-card-title",
               tag: "H3",
               name: "Card & Sub-Section Title",
               fontFamily: "Urbanist, sans-serif",
               mobileSize: "18px (leading 1.35)",
               desktopSize: "24px (leading 1.35)",
               weight: "700 (Bold)",
               letterSpacing: "Normal",
               colorToken: "#18181B (text-zinc-900)",
               sample: "Advance Certificate in UI/UX Design",
               description: "Used for Course Cards, Blog Post titles, Feature headers, and Modal titles.",
               cssCode: `.h3-card-title {\n  font-family: var(--font-urbanist), sans-serif;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1.35;\n  color: #18181b;\n}\n@media (min-width: 768px) { .h3-card-title { font-size: 24px; } }`
          },
          {
               id: "body-lead",
               category: "body",
               class: "body-lead",
               tag: "P",
               name: "Section Subtitle / Lead Paragraph",
               fontFamily: "Urbanist, sans-serif",
               mobileSize: "15px (leading 22px)",
               desktopSize: "17px (leading 28px)",
               weight: "500 (Medium)",
               letterSpacing: "Normal",
               colorToken: "rgba(28, 28, 28, 0.8)",
               sample: "Our students have gone on to build successful careers with leading organizations across diverse industries.",
               description: "Positioned directly under section headings (H2) to provide introductory context.",
               cssCode: `.body-lead {\n  font-family: var(--font-urbanist), sans-serif;\n  font-size: 15px;\n  line-height: 1.375rem;\n  color: rgba(28, 28, 28, 0.8);\n}\n@media (min-width: 768px) {\n  .body-lead { font-size: 17px; line-height: 1.75rem; }\n}`
          },
          {
               id: "body-text",
               category: "body",
               class: "body-text",
               tag: "P",
               name: "Standard Body Text",
               fontFamily: "Urbanist, sans-serif",
               mobileSize: "14px (leading 26px)",
               desktopSize: "16px (leading 26px)",
               weight: "400 (Regular)",
               letterSpacing: "Normal",
               colorToken: "#71717A (text-zinc-500)",
               sample: "Learn industry-focused design skills through hands-on mentorship, real-world case studies, and live project reviews.",
               description: "Used for card descriptions, bullet lists, body copy, and standard paragraph text blocks.",
               cssCode: `.body-text {\n  font-family: var(--font-urbanist), sans-serif;\n  font-size: 14px;\n  line-height: 1.625;\n  color: #71717a;\n}\n@media (min-width: 768px) { .body-text { font-size: 16px; } }`
          }
     ];

     const filteredItems = typographyData.filter(item => activeTab === "all" || item.category === activeTab);

     return (
          <div className="bg-[#F8F9FA] text-[#1C1C1C] min-h-screen p-4 sm:p-8 lg:p-12 text-left font-urbanist antialiased">
               <div className="max-w-7xl mx-auto space-y-8">

                    {/* TOP BRAND HERO BANNER */}
                    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-yellow-200/30 via-amber-100/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                              <div>
                                   <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-neutral text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-xs">
                                             Ant Design Portal
                                        </span>
                                        <span className="bg-official/20 text-neutral border border-official/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                             Typography Specification
                                        </span>
                                   </div>
                                   <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-neutral tracking-tight mb-3">
                                        Global Typography Tokens
                                   </h1>
                                   <p className="text-zinc-500 text-sm sm:text-base max-w-2xl leading-relaxed">
                                        Official typography design specs, live interactive text playground, and copyable CSS declarations powering Weekend UX.
                                   </p>
                              </div>

                              {/* INTERACTIVE CONTROLS BAR */}
                              <div className="flex flex-col gap-3 bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200 shrink-0 min-w-72">
                                   <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                                             <FiSun /> Background Mode
                                        </span>
                                        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200">
                                             <button
                                                  onClick={() => setPreviewBg("light")}
                                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewBg === "light" ? "bg-neutral text-white" : "text-zinc-500 hover:text-neutral"}`}
                                             >
                                                  Light
                                             </button>
                                             <button
                                                  onClick={() => setPreviewBg("cream")}
                                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewBg === "cream" ? "bg-amber-400 text-neutral" : "text-zinc-500 hover:text-neutral"}`}
                                             >
                                                  Cream
                                             </button>
                                             <button
                                                  onClick={() => setPreviewBg("dark")}
                                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${previewBg === "dark" ? "bg-neutral text-white" : "text-zinc-500 hover:text-neutral"}`}
                                             >
                                                  Dark
                                             </button>
                                        </div>
                                   </div>

                                   {/* Live Custom Text Tester */}
                                   <div className="flex flex-col gap-1 mt-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Test Custom Text</span>
                                        <input
                                             type="text"
                                             value={customText}
                                             onChange={(e) => setCustomText(e.target.value)}
                                             placeholder="Type sample text..."
                                             className="w-full h-9 px-3 text-xs bg-white rounded-xl border border-zinc-200 text-neutral font-medium focus:border-amber-400 outline-none transition-all"
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* CATEGORY FILTER TABS */}
                         <div className="flex items-center gap-2 mt-8 pt-6 border-t border-zinc-150 overflow-x-auto">
                              {[
                                   { id: "all", label: "All Tokens (7)" },
                                   { id: "headings", label: "Headings (H1, H2, H3)" },
                                   { id: "body", label: "Body Copy & Paragraphs" },
                                   { id: "badges", label: "Sub-Taglines & Badges" }
                              ].map(tab => (
                                   <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${activeTab === tab.id
                                             ? "bg-neutral text-white shadow-xs"
                                             : "bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200 hover:text-neutral"
                                             }`}
                                   >
                                        {tab.label}
                                   </button>
                              ))}
                         </div>
                    </div>

                    {/* TYPOGRAPHY CARDS LIST */}
                    <div className="space-y-8">
                         {filteredItems.map((item) => (
                              <div key={item.id} className="bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-zinc-300 transition-all duration-300">

                                   {/* TOP SPEC HEADER BAR */}
                                   <div className="p-5 sm:p-6 bg-zinc-50/70 border-b border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                             <span className="w-9 h-9 rounded-xl bg-neutral text-white font-mono text-xs font-extrabold flex items-center justify-center shadow-xs">
                                                  {item.tag}
                                             </span>
                                             <div>
                                                  <div className="flex items-center gap-2.5">
                                                       <h3 className="font-bold text-neutral text-lg leading-tight">{item.name}</h3>
                                                       <button
                                                            onClick={() => copyToClipboard(`.${item.class}`)}
                                                            className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                                            title="Click to copy CSS class name"
                                                       >
                                                            <span>.{item.class}</span>
                                                            {copiedToken === `.${item.class}` ? <FiCheck className="text-emerald-600 text-xs" /> : <FiCopy className="text-xs" />}
                                                       </button>
                                                  </div>
                                                  <p className="text-xs text-zinc-500 mt-1">{item.description}</p>
                                             </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                             <span className="text-[11px] font-mono font-semibold text-zinc-600 bg-white px-3 py-1 rounded-xl border border-zinc-200 shadow-2xs">
                                                  Font: {item.fontFamily}
                                             </span>
                                        </div>
                                   </div>

                                   {/* LIVE CANVAS PREVIEW BOX WITH TOGGLEABLE BACKGROUND */}
                                   <div className={`p-6 sm:p-10 border-b border-zinc-150 transition-colors duration-300 ${previewBg === 'dark' ? 'bg-neutral text-white' : previewBg === 'cream' ? 'bg-[#FFFCEE] text-neutral' : 'bg-[#FCFBF7] text-neutral'}`}>
                                        <div className="flex items-center justify-between text-[10px] font-mono opacity-50 mb-4 border-b border-current/10 pb-1.5 uppercase tracking-wider">
                                             <span>Live Component Render</span>
                                             <span>Responsive: {item.mobileSize} → {item.desktopSize}</span>
                                        </div>

                                        <div className={item.class}>
                                             {item.class === "h1-hero-title" && customText ? customText : item.sample}
                                        </div>
                                   </div>

                                   {/* ANT DESIGN SPECIFICATION MATRIX TABLE */}
                                   <div className="p-6 bg-white grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">

                                        {/* Spec Grid Table */}
                                        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                             <div className="bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-150">
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Mobile Spec</span>
                                                  <span className="font-bold text-neutral text-sm">{item.mobileSize}</span>
                                             </div>
                                             <div className="bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-150">
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Desktop Spec</span>
                                                  <span className="font-bold text-neutral text-sm">{item.desktopSize}</span>
                                             </div>
                                             <div className="bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-150">
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Line Height</span>
                                                  <span className="font-semibold text-zinc-700">{item.lineHeight}</span>
                                             </div>
                                             <div className="bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-150">
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Font Weight</span>
                                                  <span className="font-semibold text-zinc-700">{item.weight}</span>
                                             </div>
                                             <div className="bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-150">
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Letter Spacing</span>
                                                  <span className="font-semibold text-zinc-700">{item.letterSpacing}</span>
                                             </div>
                                             <div className="bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-150">
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Color Token</span>
                                                  <span className="font-semibold text-zinc-700 truncate block">{item.colorToken}</span>
                                             </div>
                                        </div>

                                        {/* CSS Code Box */}
                                        <div className="lg:col-span-5 bg-zinc-950 text-zinc-200 rounded-2xl p-4 font-mono text-[11px] flex flex-col justify-between shadow-xs">
                                             <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-2 mb-2 uppercase tracking-wider">
                                                  <span className="flex items-center gap-1.5"><FiCode /> CSS Class Declaration</span>
                                                  <button
                                                       onClick={() => copyToClipboard(item.cssCode)}
                                                       className="hover:text-official transition-colors flex items-center gap-1 cursor-pointer"
                                                  >
                                                       {copiedToken === item.cssCode ? <span className="text-emerald-400 flex items-center gap-1"><FiCheck /> Copied</span> : <span>Copy CSS</span>}
                                                  </button>
                                             </div>
                                             <pre className="overflow-x-auto text-amber-300 leading-relaxed py-1">
                                                  <code>{item.cssCode}</code>
                                             </pre>
                                        </div>

                                   </div>

                              </div>
                         ))}
                    </div>

               </div>
          </div>
     );
};

export const Default = {
     render: () => <TypographyDoc />
};

export const TypographySpecification = {
     render: () => <TypographyDoc />
};

export const InteractiveSpecification = {
     render: () => <TypographyDoc />
};

export const LiveDocumentation = {
     render: () => <TypographyDoc />
};
