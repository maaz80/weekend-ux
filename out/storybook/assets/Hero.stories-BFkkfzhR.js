import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./Hero-BUwnqhXa.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Home/Hero`,component:n,parameters:{layout:`fullscreen`},argTypes:{bgColor:{control:`select`,options:[`bg-bg-neutral`,`bg-bg-white`,`bg-bg-yellow-light`,`bg-bg-gray-light`,`bg-bg-cream`,`bg-bg-green`,`bg-bg-black`,`bg-bg-green-light`,`bg-bg-yellow-brand`,`bg-bg-cream-brand`,`bg-bg-red`,`bg-bg-gray`,`bg-bg-red-light`,`bg-bg-gray-soft`]},taglineColor:{control:`select`,options:[`text-official`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`,`text-white`]},titleColor:{control:`select`,options:[`text-white`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`,`text-official`]},pointsColor:{control:`select`,options:[`text-white/70`,`text-white`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`,`text-official`]},activeDotColor:{control:`select`,options:[`bg-official`,`bg-bg-yellow-brand`,`bg-bg-white`,`bg-bg-green`,`bg-bg-red`,`bg-bg-gray`,`bg-bg-neutral`]}}},c={args:{bgColor:`bg-bg-neutral`,taglineColor:`text-official`,titleColor:`text-white`,pointsColor:`text-white/70`,activeDotColor:`bg-official`}},l={args:{bgColor:`bg-bg-cream`,taglineColor:`text-fg-orange`,titleColor:`text-fg-neutral`,pointsColor:`text-fg-gray`,activeDotColor:`bg-bg-yellow-brand`}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-bg-neutral",
    taglineColor: "text-official",
    titleColor: "text-white",
    pointsColor: "text-white/70",
    activeDotColor: "bg-official"
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-bg-cream",
    taglineColor: "text-fg-orange",
    titleColor: "text-fg-neutral",
    pointsColor: "text-fg-gray",
    activeDotColor: "bg-bg-yellow-brand"
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`CustomColors`]}))();export{l as CustomColors,c as Default,u as __namedExportsOrder,s as default};