import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./Curriculum-mwqzBPUf.js";var r,i,a,o,s;e((()=>{t(),r={title:`Course Details/Curriculum`,component:n,parameters:{layout:`padded`,viewport:{defaultViewport:`mobile1`}},argTypes:{isLoggedIn:{control:`boolean`,description:`Toggles between logged in (unlocked) and guest (locked) lesson views`},themeColor:{control:`select`,options:[`text-official`,`text-fg-blue`,`text-fg-green`,`text-fg-orange`,`text-fg-red`],description:`Color of active play icon and texts`},borderColor:{control:`select`,options:[`border-[#E5E0D6]`,`border-zinc-300`,`border-official`,`border-transparent`],description:`Border color of chapter accordion panels`}}},i=[{id:1,title:`Introduction to Design Thinking`,lessons:3,items:[{lessonname:`What is User-Centered Design?`,video:{duration:15,videourl:``}},{lessonname:`The 5 Stages of Design Thinking`,video:{duration:25,videourl:``}},{lessonname:`Figma Fundamentals & Basics`,video:{duration:40,videourl:``}}]},{id:2,title:`User Research & Analysis`,lessons:2,items:[{lessonname:`Conducting User Interviews`,video:{duration:30,videourl:``}},{lessonname:`Creating User Personas`,video:{duration:20,videourl:``}}]}],a={args:{isLoggedIn:!1,themeColor:`text-official`,borderColor:`border-[#E5E0D6]`,curriculum:i}},o={args:{isLoggedIn:!0,themeColor:`text-official`,borderColor:`border-[#E5E0D6]`,curriculum:i}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isLoggedIn: false,
    themeColor: "text-official",
    borderColor: "border-[#E5E0D6]",
    curriculum: mockCurriculum
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isLoggedIn: true,
    themeColor: "text-official",
    borderColor: "border-[#E5E0D6]",
    curriculum: mockCurriculum
  }
}`,...o.parameters?.docs?.source}}},s=[`LockedView`,`UnlockedView`]}))();export{a as LockedView,o as UnlockedView,s as __namedExportsOrder,r as default};