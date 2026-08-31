import{i as e}from"./preload-helper-DID7B_--.js";import{t}from"./react-BCzXYUIv.js";import{P as n}from"./iframe-D5N1RLyR.js";import{n as r,t as i}from"./Breadcrumb-CT0u_-Oo.js";var a,o,s,c,l,u;e((()=>{a=n(),t(),r(),o={title:`Components/Breadcrumb`,component:i,parameters:{layout:`fullscreen`},argTypes:{navBackground:{control:`select`,options:[`absolute left-0 w-full z-40 backdrop-blur-xl py-2.5 md:py-3 top-30 md:top-29 select-none`,`relative w-full z-40 bg-zinc-800 py-3 select-none border-b border-zinc-700`,`relative w-full z-40 bg-white py-3 select-none border-b border-zinc-200`,`relative w-full z-40 bg-official/10 py-3 select-none`],description:`Nav wrapper class and background`},textSize:{control:`select`,options:[`text-[11px] md:text-[12px]`,`text-[13px] md:text-[14px]`,`text-sm md:text-base`,`text-base md:text-lg`],description:`Text size configuration`},fontFamily:{control:`select`,options:[`font-urbanist`,`font-playfair`,`font-inter`,`font-sans`],description:`Font family configuration`},linkColor:{control:`select`,options:[`text-white/70 hover:text-white`,`text-zinc-400 hover:text-zinc-100`,`text-neutral/70 hover:text-neutral`,`text-official hover:text-official/80`,`text-blue-500 hover:text-blue-600`],description:`Link normal and hover state colors`},separatorColor:{control:`select`,options:[`text-white/40`,`text-zinc-500`,`text-neutral/30`,`text-official/50`],description:`Chevron separator color`},activeColor:{control:`select`,options:[`text-white`,`text-zinc-100`,`text-neutral font-bold`,`text-official font-semibold`,`text-yellow-400`],description:`Current/active page text color`}},decorators:[e=>(0,a.jsx)(`div`,{className:`relative w-full h-40 bg-neutral/90 flex items-center p-6 overflow-hidden`,children:(0,a.jsx)(e,{})})]},s={args:{navBackground:`relative w-full z-40 bg-zinc-800 py-3 select-none border-b border-zinc-700`,textSize:`text-[13px] md:text-[14px]`,fontFamily:`font-urbanist`,linkColor:`text-white/70 hover:text-white`,separatorColor:`text-white/40`,activeColor:`text-white`},parameters:{nextjs:{navigation:{pathname:`/courses`}}}},c={args:{navBackground:`relative w-full z-40 bg-white py-3 select-none border-b border-zinc-200`,textSize:`text-sm md:text-base`,fontFamily:`font-inter`,linkColor:`text-neutral/70 hover:text-neutral`,separatorColor:`text-neutral/30`,activeColor:`text-official font-semibold`},parameters:{nextjs:{navigation:{pathname:`/courses/ui-ux-design`}}}},l={args:{navBackground:`relative w-full z-40 bg-official/10 py-3 select-none`,textSize:`text-[13px] md:text-[14px]`,fontFamily:`font-urbanist`,linkColor:`text-neutral/70 hover:text-neutral`,separatorColor:`text-official/50`,activeColor:`text-neutral font-bold`},parameters:{nextjs:{navigation:{pathname:`/blogs`}}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    navBackground: "relative w-full z-40 bg-zinc-800 py-3 select-none border-b border-zinc-700",
    textSize: "text-[13px] md:text-[14px]",
    fontFamily: "font-urbanist",
    linkColor: "text-white/70 hover:text-white",
    separatorColor: "text-white/40",
    activeColor: "text-white"
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/courses"
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    navBackground: "relative w-full z-40 bg-white py-3 select-none border-b border-zinc-200",
    textSize: "text-sm md:text-base",
    fontFamily: "font-inter",
    linkColor: "text-neutral/70 hover:text-neutral",
    separatorColor: "text-neutral/30",
    activeColor: "text-official font-semibold"
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/courses/ui-ux-design"
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    navBackground: "relative w-full z-40 bg-official/10 py-3 select-none",
    textSize: "text-[13px] md:text-[14px]",
    fontFamily: "font-urbanist",
    linkColor: "text-neutral/70 hover:text-neutral",
    separatorColor: "text-official/50",
    activeColor: "text-neutral font-bold"
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/blogs"
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u=[`CoursesPage`,`CourseDetailsCustomStyle`,`BlogsPage`]}))();export{l as BlogsPage,c as CourseDetailsCustomStyle,s as CoursesPage,u as __namedExportsOrder,o as default};