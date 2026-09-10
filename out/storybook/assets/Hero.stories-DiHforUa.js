import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./Hero-DPfBuKl8.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`About/Hero`,component:n,argTypes:{bgColor:{control:`select`,options:[`bg-zinc-950`,`bg-bg-neutral`,`bg-bg-white`,`bg-bg-yellow-light`,`bg-bg-gray-light`,`bg-bg-cream`,`bg-bg-green`,`bg-bg-black`,`bg-bg-green-light`,`bg-bg-yellow-brand`,`bg-bg-cream-brand`,`bg-bg-red`,`bg-bg-gray`,`bg-bg-red-light`,`bg-bg-gray-soft`]},titleColor:{control:`select`,options:[`text-official`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`,`text-white`]},headingColor:{control:`select`,options:[`text-white`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`,`text-official`]}}},c={args:{bgColor:`bg-zinc-950`,titleColor:`text-official`,headingColor:`text-white`,data:{title:`Learn as you desire`,heading:`Best Design Academy in Delhi that teaches you actual skills in person`,buttonName:`Explore Programs`,bgImage:`/images/weekend-ux-location-hero-bg.webp`}}},l={args:{bgColor:`bg-bg-gray-light`,titleColor:`text-fg-blue`,headingColor:`text-fg-neutral`,data:{title:`About Our Academy`,heading:`Learn UI/UX Design from Industry Mentors`,buttonName:`Join Now`,bgImage:``}}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-zinc-950",
    titleColor: "text-official",
    headingColor: "text-white",
    data: {
      title: "Learn as you desire",
      heading: "Best Design Academy in Delhi that teaches you actual skills in person",
      buttonName: "Explore Programs",
      bgImage: "/images/weekend-ux-location-hero-bg.webp"
    }
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-bg-gray-light",
    titleColor: "text-fg-blue",
    headingColor: "text-fg-neutral",
    data: {
      title: "About Our Academy",
      heading: "Learn UI/UX Design from Industry Mentors",
      buttonName: "Join Now",
      bgImage: ""
    }
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`LightThemeMock`]}))();export{c as Default,l as LightThemeMock,u as __namedExportsOrder,s as default};