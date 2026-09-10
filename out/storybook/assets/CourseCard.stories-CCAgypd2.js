import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./CourseCard-zgBbtr53.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Courses/CourseCard`,component:n,parameters:{layout:`padded`,viewport:{defaultViewport:`mobile1`}},argTypes:{cardBgColor:{control:`select`,options:[`bg-white`,`bg-bg-neutral`,`bg-bg-gray-soft`,`bg-bg-cream`,`bg-zinc-50`],description:`Background color of the card container`},cardBorderColor:{control:`select`,options:[`border-[#DCD7CC]`,`border-neutral-300`,`border-zinc-200`,`border-transparent`],description:`Border color of the card container`},cardTitleColor:{control:`select`,options:[`text-zinc-900`,`text-neutral`,`text-white`,`text-official`,`text-fg-orange`],description:`Color of the course title and heading elements`},cardSubTitleColor:{control:`select`,options:[`text-zinc-500`,`text-zinc-400`,`text-white/60`,`text-fg-gray`],description:`Color of the course author/instructor text`},statIconColor:{control:`select`,options:[`text-[#F4C430]`,`text-official`,`text-white`,`text-fg-green`,`text-fg-blue`],description:`Color of stats icons (duration, students, level, lessons)`},statTextColor:{control:`select`,options:[`text-zinc-700`,`text-zinc-500`,`text-white/80`,`text-fg-gray`],description:`Color of stat label texts`},dividerColor:{control:`select`,options:[`border-zinc-100`,`border-[#DCD7CC]`,`border-white/10`,`border-transparent`],description:`Color of the bottom section separator divider`},buttonBgColor:{control:`select`,options:[`bg-white`,`bg-bg-neutral`,`bg-official`,`bg-transparent`],description:`Background color of Syllabus button`},buttonTextColor:{control:`select`,options:[`text-zinc-700`,`text-white`,`text-neutral`,`text-official`],description:`Text color of Syllabus button`},buttonBorderColor:{control:`select`,options:[`border-zinc-300`,`border-zinc-200`,`border-white/20`,`border-transparent`],description:`Border color of Syllabus button`}}},c={args:{cardBgColor:`bg-white`,cardBorderColor:`border-[#DCD7CC]`,cardTitleColor:`text-zinc-900`,cardSubTitleColor:`text-zinc-500`,statIconColor:`text-[#F4C430]`,statTextColor:`text-zinc-700`,dividerColor:`border-zinc-100`,buttonBgColor:`bg-white`,buttonTextColor:`text-zinc-700`,buttonBorderColor:`border-zinc-300`,course:{id:`course-1`,title:`UI/UX Design Masterclass`,instructor:`Determined-Polliras`,duration:`2 Weeks`,totalstudents:`156 Students`,levels:`All Levels`,totallessons:`20 Lessons`,startdate:`10th Dec, 26`,courselength:`6 Months`,slug:`ui-ux-design-masterclass`,image:`/images/weekend-ux-program-image-template.webp`}}},l={args:{cardBgColor:`bg-bg-black`,cardBorderColor:`border-white/10`,cardTitleColor:`text-white`,cardSubTitleColor:`text-white/60`,statIconColor:`text-official`,statTextColor:`text-white/80`,dividerColor:`border-white/10`,buttonBgColor:`bg-bg-neutral`,buttonTextColor:`text-white`,buttonBorderColor:`border-white/10`,course:{id:`course-2`,title:`Advanced Interaction Design`,instructor:`Determined-Polliras`,duration:`4 Weeks`,totalstudents:`98 Students`,levels:`Advanced`,totallessons:`32 Lessons`,startdate:`15th Jan, 27`,courselength:`3 Months`,slug:`advanced-interaction-design`,image:`/images/weekend-ux-program-image-template.webp`}}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    cardBgColor: "bg-white",
    cardBorderColor: "border-[#DCD7CC]",
    cardTitleColor: "text-zinc-900",
    cardSubTitleColor: "text-zinc-500",
    statIconColor: "text-[#F4C430]",
    statTextColor: "text-zinc-700",
    dividerColor: "border-zinc-100",
    buttonBgColor: "bg-white",
    buttonTextColor: "text-zinc-700",
    buttonBorderColor: "border-zinc-300",
    course: {
      id: "course-1",
      title: "UI/UX Design Masterclass",
      instructor: "Determined-Polliras",
      duration: "2 Weeks",
      totalstudents: "156 Students",
      levels: "All Levels",
      totallessons: "20 Lessons",
      startdate: "10th Dec, 26",
      courselength: "6 Months",
      slug: "ui-ux-design-masterclass",
      image: "/images/weekend-ux-program-image-template.webp"
    }
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    cardBgColor: "bg-bg-black",
    cardBorderColor: "border-white/10",
    cardTitleColor: "text-white",
    cardSubTitleColor: "text-white/60",
    statIconColor: "text-official",
    statTextColor: "text-white/80",
    dividerColor: "border-white/10",
    buttonBgColor: "bg-bg-neutral",
    buttonTextColor: "text-white",
    buttonBorderColor: "border-white/10",
    course: {
      id: "course-2",
      title: "Advanced Interaction Design",
      instructor: "Determined-Polliras",
      duration: "4 Weeks",
      totalstudents: "98 Students",
      levels: "Advanced",
      totallessons: "32 Lessons",
      startdate: "15th Jan, 27",
      courselength: "3 Months",
      slug: "advanced-interaction-design",
      image: "/images/weekend-ux-program-image-template.webp"
    }
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`DarkTheme`]}))();export{l as DarkTheme,c as Default,u as __namedExportsOrder,s as default};