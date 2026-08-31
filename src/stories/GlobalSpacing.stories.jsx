import React, { useState } from "react";
import { FiCopy, FiCheck, FiMaximize2, FiGrid, FiSmartphone, FiTablet, FiMonitor } from "react-icons/fi";

export default {
     title: "Ant Design System / Spacing & Layout",
     parameters: {
          layout: "fullscreen",
          docs: {
               description: {
                    component: "Ant Design Portal Spacing, Padding & Layout Specification for Weekend UX."
               }
          }
     }
};

const SpacingLayoutDoc = () => {
     const [copiedToken, setCopiedToken] = useState(null);
     const [simulatedDevice, setSimulatedDevice] = useState("desktop");

     const copyText = (text) => {
          navigator.clipboard.writeText(text);
          setCopiedToken(text);
          setTimeout(() => setCopiedToken(null), 2000);
     };

     const layoutTokens = [
          {
               name: "custom-width",
               type: "Responsive Screen Container",
               specs: "Mobile: 360px max • Tablet: 900px max • Desktop: 1280px max",
               description: "Centralized responsive container utility ensuring pixel-perfect screen margins and alignment across all devices.",
               cssSnippet: `.custom-width {\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 8px; padding-right: 8px;\n  max-width: 360px; /* Mobile */\n}\n@media (min-width: 768px) {\n  .custom-width { max-width: 900px; padding: 0 16px; }\n}\n@media (min-width: 1280px) {\n  .custom-width { max-width: 1280px; padding: 0 46px; }\n}`
          },
          {
               name: "section-padding",
               type: "Main Section Vertical Padding",
               specs: "Mobile: py-10 (40px) • Desktop: md:py-24 (96px)",
               description: "Standard vertical padding applied to high-impact content sections like FAQ, Testimonials, Course Details, and Features.",
               cssSnippet: `.section-padding {\n  padding-top: 2.5rem;\n  padding-bottom: 2.5rem;\n}\n@media (min-width: 768px) {\n  .section-padding {\n    padding-top: 6rem;\n    padding-bottom: 6rem;\n  }\n}`
          },
          {
               name: "section-padding-sm",
               type: "Compact Section Vertical Padding",
               specs: "Mobile: py-8 (32px) • Desktop: md:py-16 (64px)",
               description: "Used for secondary content sections, banner strips, form wrappers, and compact card sections.",
               cssSnippet: `.section-padding-sm {\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n@media (min-width: 768px) {\n  .section-padding-sm {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n  }\n}`
          }
     ];

     const spacingScale = [
          { token: "xs", px: "4px", rem: "0.25rem", width: "12px", usage: "Icon gaps, small badge paddings, tag margins" },
          { token: "sm", px: "8px", rem: "0.5rem", width: "24px", usage: "Button vertical padding, tight item gaps" },
          { token: "md", px: "16px", rem: "1rem", width: "48px", usage: "Card inner padding, standard form element gaps" },
          { token: "lg", px: "24px", rem: "1.5rem", width: "72px", usage: "Modal inner padding, card grid gaps" },
          { token: "xl", px: "32px", rem: "2rem", width: "96px", usage: "Section header bottom margins, content offsets" },
          { token: "2xl", px: "48px", rem: "3rem", width: "140px", usage: "Desktop section header gaps, major card offsets" },
          { token: "3xl", px: "64px - 96px", rem: "4rem - 6rem", width: "200px", usage: "Major page section dividers and hero spacing" }
     ];

     return (
          <div className="bg-[#F8F9FA] text-[#1C1C1C] min-h-screen p-4 sm:p-8 lg:p-12 text-left font-urbanist antialiased">
               <div className="max-w-7xl mx-auto space-y-8">

                    {/* HERO HEADER */}
                    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
                         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                              <div>
                                   <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-neutral text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-xs">
                                             Ant Design Portal
                                        </span>
                                        <span className="bg-official/20 text-neutral border border-official/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                             Layout & Spacing Specs
                                        </span>
                                   </div>
                                   <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-neutral tracking-tight mb-2">
                                        Spacing & Layout Guidelines
                                   </h1>
                                   <p className="text-zinc-500 text-sm sm:text-base max-w-2xl leading-relaxed">
                                        Standardized responsive screen container rules, section padding tokens, and grid spacing scales.
                                   </p>
                              </div>

                              {/* DEVICE CONTAINER SIMULATOR TOGGLE */}
                              <div className="flex flex-col gap-2 shrink-0 bg-zinc-50 p-3 rounded-2xl border border-zinc-200">
                                   <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Container Visualizer</span>
                                   <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200">
                                        <button
                                             onClick={() => setSimulatedDevice("mobile")}
                                             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${simulatedDevice === "mobile" ? "bg-neutral text-white shadow-sm" : "text-zinc-500 hover:text-neutral"}`}
                                        >
                                             <FiSmartphone /> Mobile (360px)
                                        </button>
                                        <button
                                             onClick={() => setSimulatedDevice("tablet")}
                                             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${simulatedDevice === "tablet" ? "bg-neutral text-white shadow-sm" : "text-zinc-500 hover:text-neutral"}`}
                                        >
                                             <FiTablet /> Tablet (900px)
                                        </button>
                                        <button
                                             onClick={() => setSimulatedDevice("desktop")}
                                             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${simulatedDevice === "desktop" ? "bg-neutral text-white shadow-sm" : "text-zinc-500 hover:text-neutral"}`}
                                        >
                                             <FiMonitor /> Desktop (1280px)
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* SECTION 1: LAYOUT CONTAINER UTILITIES */}
                    <div className="space-y-6">
                         <h3 className="font-bold text-xl text-neutral flex items-center gap-2">
                              <FiMaximize2 className="text-amber-600" /> Global Layout Utility Classes
                         </h3>

                         <div className="grid grid-cols-1 gap-6">
                              {layoutTokens.map((item, idx) => (
                                   <div key={idx} className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-150 pb-4 mb-4">
                                             <div className="flex items-center gap-3">
                                                  <button
                                                       onClick={() => copyText(`.${item.name}`)}
                                                       className="font-mono text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                                                       title="Click to copy CSS class name"
                                                  >
                                                       <span>.{item.name}</span>
                                                       {copiedToken === `.${item.name}` ? <FiCheck className="text-emerald-600" /> : <FiCopy />}
                                                  </button>
                                                  <h4 className="font-bold text-neutral text-base">{item.type}</h4>
                                             </div>
                                             <span className="text-xs font-mono text-zinc-600 bg-zinc-100 px-3 py-1 rounded-xl border border-zinc-200">
                                                  {item.specs}
                                             </span>
                                        </div>

                                        <p className="text-xs text-zinc-600 mb-4">{item.description}</p>

                                        {/* CSS Snippet */}
                                        <div className="bg-zinc-950 text-amber-300 rounded-2xl p-4 font-mono text-xs overflow-x-auto relative shadow-xs">
                                             <div className="flex justify-between items-center text-[10px] text-zinc-400 border-b border-zinc-800 pb-2 mb-2 uppercase tracking-wider">
                                                  <span>CSS Declaration</span>
                                                  <button
                                                       onClick={() => copyText(item.cssSnippet)}
                                                       className="hover:text-official transition-colors flex items-center gap-1 cursor-pointer"
                                                  >
                                                       {copiedToken === item.cssSnippet ? <span className="text-emerald-400 flex items-center gap-1"><FiCheck /> Copied</span> : <span>Copy CSS</span>}
                                                  </button>
                                             </div>
                                             <pre><code>{item.cssSnippet}</code></pre>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* SECTION 2: SPACING SCALE TABLE */}
                    <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                         <div className="border-b border-zinc-150 pb-4 mb-6">
                              <h3 className="font-bold text-xl text-neutral flex items-center gap-2 mb-1">
                                   <FiGrid className="text-amber-600" /> Spacing & Padding Scale
                              </h3>
                              <p className="text-xs text-zinc-500">Standard spacing units used for margins, paddings, and flex/grid gaps.</p>
                         </div>

                         <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs">
                                   <thead className="bg-zinc-50 text-zinc-700 font-bold border-b border-zinc-200 uppercase tracking-wider text-[10px]">
                                        <tr>
                                             <th className="p-4">Token Name</th>
                                             <th className="p-4">Pixel Size</th>
                                             <th className="p-4">REM Equivalent</th>
                                             <th className="p-4">Visual Scale Bar</th>
                                             <th className="p-4">Recommended Usage</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-zinc-150">
                                        {spacingScale.map((row, rIdx) => (
                                             <tr key={rIdx} className="hover:bg-zinc-50/80 transition-colors">
                                                  <td className="p-4 font-bold font-mono text-amber-700">{row.token}</td>
                                                  <td className="p-4 font-semibold text-neutral">{row.px}</td>
                                                  <td className="p-4 text-zinc-500 font-mono">{row.rem}</td>
                                                  <td className="p-4">
                                                       <div className="h-4 bg-official rounded-md transition-all shadow-2xs" style={{ width: row.width }} />
                                                  </td>
                                                  <td className="p-4 text-zinc-600">{row.usage}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export const Default = {
     render: () => <SpacingLayoutDoc />
};

export const SpacingSpecification = {
     render: () => <SpacingLayoutDoc />
};

export const LayoutSpecification = {
     render: () => <SpacingLayoutDoc />
};

export const LayoutDocumentation = {
     render: () => <SpacingLayoutDoc />
};
