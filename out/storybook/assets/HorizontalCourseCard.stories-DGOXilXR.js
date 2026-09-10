import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./HorizontalCourseCard-4j9dPOwv.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Components/HorizontalCourseCard`,component:n,parameters:{layout:`padded`},argTypes:{unlocked:{control:`boolean`}}},c={args:{unlocked:!1,course:{title:`UI/UX Advanced Product Design`,category:`UI/UX Design`,overview:`Learn complete product design lifecycle from research to high-fidelity prototypes.`,duration:`6 Months`,startdate:`Starts Next Monday`,image:`/images/weekend-ux-program-image-template.webp`}}},l={args:{unlocked:!0,course:{title:`Fullstack Web & AI Masterclass`,category:`Development`,overview:`Master modern web development, Next.js, AI integrations, and real-world projects.`,duration:`4 Months`,startdate:`Enrolled`,image:`/images/weekend-ux-program-image-template.webp`}}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    unlocked: false,
    course: {
      title: "UI/UX Advanced Product Design",
      category: "UI/UX Design",
      overview: "Learn complete product design lifecycle from research to high-fidelity prototypes.",
      duration: "6 Months",
      startdate: "Starts Next Monday",
      image: "/images/weekend-ux-program-image-template.webp"
    }
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    unlocked: true,
    course: {
      title: "Fullstack Web & AI Masterclass",
      category: "Development",
      overview: "Master modern web development, Next.js, AI integrations, and real-world projects.",
      duration: "4 Months",
      startdate: "Enrolled",
      image: "/images/weekend-ux-program-image-template.webp"
    }
  }
}`},l.parameters?.docs?.source)})}),u=[`Locked`,`Unlocked`]}))();export{c as Locked,l as Unlocked,u as __namedExportsOrder,s as default};