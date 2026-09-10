import{i as e}from"./preload-helper-DID7B_--.js";import{t}from"./react-BCzXYUIv.js";import{F as n}from"./iframe-D8RkbwoA.js";import{n as r,t as i}from"./Breadcrumb-CPLbqXci.js";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],r=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){a(e,t,n[t])})}return e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var l,u,d,f,p,m;e((()=>{l=n(),t(),r(),u={title:`Components/Breadcrumb`,component:i,parameters:{layout:`fullscreen`},argTypes:{navBackground:{control:`select`,options:[`absolute left-0 w-full z-40 backdrop-blur-xl py-2.5 md:py-3 top-30 md:top-29 select-none`,`relative w-full z-40 bg-zinc-800 py-3 select-none border-b border-zinc-700`,`relative w-full z-40 bg-white py-3 select-none border-b border-zinc-200`,`relative w-full z-40 bg-official/10 py-3 select-none`],description:`Nav wrapper class and background`},textSize:{control:`select`,options:[`text-[11px] md:text-[12px]`,`text-[13px] md:text-[14px]`,`text-sm md:text-base`,`text-base md:text-lg`],description:`Text size configuration`},fontFamily:{control:`select`,options:[`font-urbanist`,`font-playfair`,`font-inter`,`font-sans`],description:`Font family configuration`},linkColor:{control:`select`,options:[`text-white/70 hover:text-white`,`text-zinc-400 hover:text-zinc-100`,`text-neutral/70 hover:text-neutral`,`text-official hover:text-official/80`,`text-blue-500 hover:text-blue-600`],description:`Link normal and hover state colors`},separatorColor:{control:`select`,options:[`text-white/40`,`text-zinc-500`,`text-neutral/30`,`text-official/50`],description:`Chevron separator color`},activeColor:{control:`select`,options:[`text-white`,`text-zinc-100`,`text-neutral font-bold`,`text-official font-semibold`,`text-yellow-400`],description:`Current/active page text color`}},decorators:[e=>(0,l.jsx)(`div`,{className:`relative w-full h-40 bg-neutral/90 flex items-center p-6 overflow-hidden`,children:(0,l.jsx)(e,{})})]},d={args:{navBackground:`relative w-full z-40 bg-zinc-800 py-3 select-none border-b border-zinc-700`,textSize:`text-[13px] md:text-[14px]`,fontFamily:`font-urbanist`,linkColor:`text-white/70 hover:text-white`,separatorColor:`text-white/40`,activeColor:`text-white`},parameters:{nextjs:{navigation:{pathname:`/courses`}}}},f={args:{navBackground:`relative w-full z-40 bg-white py-3 select-none border-b border-zinc-200`,textSize:`text-sm md:text-base`,fontFamily:`font-inter`,linkColor:`text-neutral/70 hover:text-neutral`,separatorColor:`text-neutral/30`,activeColor:`text-official font-semibold`},parameters:{nextjs:{navigation:{pathname:`/courses/ui-ux-design`}}}},p={args:{navBackground:`relative w-full z-40 bg-official/10 py-3 select-none`,textSize:`text-[13px] md:text-[14px]`,fontFamily:`font-urbanist`,linkColor:`text-neutral/70 hover:text-neutral`,separatorColor:`text-official/50`,activeColor:`text-neutral font-bold`},parameters:{nextjs:{navigation:{pathname:`/blogs`}}}},d.parameters=c(o({},d.parameters),{docs:c(o({},d.parameters?.docs),{source:o({originalSource:`{
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
}`},d.parameters?.docs?.source)})}),f.parameters=c(o({},f.parameters),{docs:c(o({},f.parameters?.docs),{source:o({originalSource:`{
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
}`},f.parameters?.docs?.source)})}),p.parameters=c(o({},p.parameters),{docs:c(o({},p.parameters?.docs),{source:o({originalSource:`{
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
}`},p.parameters?.docs?.source)})}),m=[`CoursesPage`,`CourseDetailsCustomStyle`,`BlogsPage`]}))();export{p as BlogsPage,f as CourseDetailsCustomStyle,d as CoursesPage,m as __namedExportsOrder,u as default};