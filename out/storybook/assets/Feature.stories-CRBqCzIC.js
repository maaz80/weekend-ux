import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./Feature-CGj9HpLh.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u,d;e((()=>{t(),s={title:`Home/Features/Feature Strip`,component:n,parameters:{layout:`fullscreen`},argTypes:{bgColor:{control:`select`,options:[`bg-official`,`bg-bg-neutral`,`bg-bg-white`,`bg-bg-yellow-light`,`bg-bg-gray-light`,`bg-bg-cream`,`bg-bg-green`,`bg-bg-black`,`bg-bg-green-light`,`bg-bg-yellow-brand`,`bg-bg-cream-brand`,`bg-bg-red`,`bg-bg-gray`,`bg-bg-red-light`,`bg-bg-gray-soft`],description:`Background color of the section wrapper`},textColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`],description:`Text and icon color inside the feature strip`},borderColor:{control:`select`,options:[`bg-neutral`,`bg-white`,`bg-white/20`,`bg-official`,`bg-bd-neutral`,`bg-bd-green`,`bg-transparent`],description:`Color of the vertical separator dividers`},showDiamond:{control:`boolean`,description:`Whether to show the decorative diamond image`},diamondImage:{control:`text`,description:`Source URL of the decorative diamond image`}}},c={args:{bgColor:`bg-official`,textColor:`text-neutral`,borderColor:`bg-neutral`,showDiamond:!0,diamondImage:`/images/weekend-ux-decorative-diamond.webp`}},l={args:{bgColor:`bg-bg-black`,textColor:`text-white`,borderColor:`bg-white/20`,showDiamond:!0,diamondImage:`/images/weekend-ux-decorative-diamond.webp`}},u={args:{bgColor:`bg-bg-green`,textColor:`text-bg-yellow-brand`,borderColor:`bg-bg-yellow-brand/30`,showDiamond:!0,diamondImage:`/images/weekend-ux-decorative-diamond.webp`}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-official",
    textColor: "text-neutral",
    borderColor: "bg-neutral",
    showDiamond: true,
    diamondImage: '/images/weekend-ux-decorative-diamond.webp'
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-bg-black",
    textColor: "text-white",
    borderColor: "bg-white/20",
    showDiamond: true,
    diamondImage: '/images/weekend-ux-decorative-diamond.webp'
  }
}`},l.parameters?.docs?.source)})}),u.parameters=o(i({},u.parameters),{docs:o(i({},u.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-bg-green",
    textColor: "text-bg-yellow-brand",
    borderColor: "bg-bg-yellow-brand/30",
    showDiamond: true,
    diamondImage: '/images/weekend-ux-decorative-diamond.webp'
  }
}`},u.parameters?.docs?.source)})}),d=[`Default`,`DarkTheme`,`GreenTheme`]}))();export{l as DarkTheme,c as Default,u as GreenTheme,d as __namedExportsOrder,s as default};