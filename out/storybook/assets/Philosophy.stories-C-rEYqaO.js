import{i as e}from"./preload-helper-DID7B_--.js";import{r as t,t as n}from"./Philosophy-D3J1OSMT.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Home/Philosophy`,component:n,argTypes:{titleColor:{control:`select`,options:[`text-official`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`,`text-white`]},textColor:{control:`select`,options:[`text-white`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`,`text-official`]},bgColor:{control:`select`,options:[`bg-bg-neutral`,`bg-bg-white`,`bg-bg-yellow-light`,`bg-bg-gray-light`,`bg-bg-cream`,`bg-bg-green`,`bg-bg-black`,`bg-bg-green-light`,`bg-bg-yellow-brand`,`bg-bg-cream-brand`,`bg-bg-red`,`bg-bg-gray`,`bg-bg-red-light`,`bg-bg-gray-soft`,`bg-transparent`]},borderColor:{control:`select`,options:[`border-transparent`,`border-bd-neutral`,`border-bd-neutral-muted`,`border-bd-green`,`border-bd-neutral-light`,`border-bd-green-light`,`border-bd-orange`,`border-bd-orange-light`,`border-bd-red`,`border-bd-red-light`]},bgImage:{control:`text`}}},c={args:{titleColor:`text-official`,textColor:`text-white`,bgColor:`bg-bg-neutral`,borderColor:`border-transparent`,bgImage:`/images/weekend-ux-philosophy-bg.webp`}},l={args:{titleColor:`text-fg-orange`,textColor:`text-fg-neutral`,bgColor:`bg-bg-cream`,borderColor:`border-bd-orange`,bgImage:``}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    titleColor: "text-official",
    textColor: "text-white",
    bgColor: "bg-bg-neutral",
    borderColor: "border-transparent",
    bgImage: "/images/weekend-ux-philosophy-bg.webp"
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    titleColor: "text-fg-orange",
    textColor: "text-fg-neutral",
    bgColor: "bg-bg-cream",
    borderColor: "border-bd-orange",
    bgImage: ""
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`WithoutBackgroundImage`]}))();export{c as Default,l as WithoutBackgroundImage,u as __namedExportsOrder,s as default};