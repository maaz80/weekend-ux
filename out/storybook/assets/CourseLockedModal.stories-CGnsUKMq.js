import{i as e}from"./preload-helper-DID7B_--.js";import{I as t,P as n,R as r}from"./iframe-CwiEFrf6.js";import{M as i,n as a,t as o}from"./lucide-react-DOIPOHwj.js";function s({isOpen:e,onClose:t,course:n}){let o=r();if(!e)return null;let s=n?.title||n?.name||`this course`;return(0,c.jsx)(`div`,{className:`fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn`,children:(0,c.jsxs)(`div`,{className:`bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative border border-zinc-100 text-center space-y-5`,children:[(0,c.jsx)(`button`,{onClick:t,className:`absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition p-1 rounded-full hover:bg-zinc-100`,children:(0,c.jsx)(a,{size:20})}),(0,c.jsx)(`div`,{className:`w-16 h-16 bg-official/20 text-official rounded-full flex items-center justify-center mx-auto border border-official/30 shadow-inner`,children:(0,c.jsx)(i,{size:32})}),(0,c.jsxs)(`div`,{className:`space-y-2`,children:[(0,c.jsx)(`h3`,{className:`text-xl font-bold text-zinc-900`,children:`Course Locked`}),(0,c.jsx)(`p`,{className:`text-xs font-semibold text-zinc-900 bg-official/20 px-3 py-1 rounded-full inline-block border border-official/30`,children:s}),(0,c.jsx)(`p`,{className:`text-sm text-zinc-600 leading-relaxed pt-2`,children:`This course is locked for your account. To buy and unlock full access, please enquire with our team.`})]}),(0,c.jsx)(`div`,{className:`pt-2`,children:(0,c.jsx)(`button`,{onClick:()=>{t(),o.push(`/contact-us`)},className:`w-full py-3.5 bg-official hover:bg-official/90 text-zinc-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer`,children:`Enquire Now`})})]})})}var c,l=e((()=>{c=n(),o(),t(),s.__docgenInfo={description:``,methods:[],displayName:`CourseLockedModal`}})),u,d,f,p;e((()=>{l(),u={title:`Components/CourseLockedModal`,component:s,parameters:{layout:`fullscreen`},argTypes:{isOpen:{control:`boolean`}}},d={args:{isOpen:!0,course:{title:`UX Architecture & Systems`},onClose:()=>{}}},f={args:{isOpen:!1,course:{title:`UX Architecture & Systems`},onClose:()=>{}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    course: {
      title: "UX Architecture & Systems"
    },
    onClose: () => {}
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    course: {
      title: "UX Architecture & Systems"
    },
    onClose: () => {}
  }
}`,...f.parameters?.docs?.source}}},p=[`Open`,`Closed`]}))();export{f as Closed,d as Open,p as __namedExportsOrder,u as default};