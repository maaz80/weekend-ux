import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./CallCard-2V85PAR2.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Course Details/CallCard`,component:n,parameters:{layout:`padded`,viewport:{defaultViewport:`mobile1`}},argTypes:{title:{control:`text`,description:`Card main heading text`},subtitle:{control:`text`,description:`Card sub-headline text`},buttonText:{control:`text`,description:`Button text label`},bgImage:{control:`text`,description:`Card background image source`},titleColor:{control:`select`,options:[`text-white`,`text-neutral`,`text-official`,`text-fg-orange`],description:`Color of the main heading`},subtitleColor:{control:`select`,options:[`text-white/90`,`text-white/70`,`text-neutral-600`,`text-[#fff8d6]`],description:`Color of the subtitle text`},overlayOpacity:{control:`select`,options:[`bg-neutral/25`,`bg-neutral/50`,`bg-black/40`,`bg-black/60`,`bg-transparent`],description:`Overlay color and opacity on background image`}}},c={args:{title:`Design is more than just being creative!`,subtitle:`Learn how to make design that sells`,buttonText:`Enquire Now`,titleColor:`text-white`,subtitleColor:`text-white/90`,overlayOpacity:`bg-neutral/25`}},l={args:{title:`Want to launch your career in UI/UX?`,subtitle:`Schedule a 1-on-1 advisor counseling session.`,buttonText:`Talk to Advisor`,titleColor:`text-white`,subtitleColor:`text-[#fff8d6]`,overlayOpacity:`bg-black/50`}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    title: "Design is more than just being creative!",
    subtitle: "Learn how to make design that sells",
    buttonText: "Enquire Now",
    titleColor: "text-white",
    subtitleColor: "text-white/90",
    overlayOpacity: "bg-neutral/25"
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    title: "Want to launch your career in UI/UX?",
    subtitle: "Schedule a 1-on-1 advisor counseling session.",
    buttonText: "Talk to Advisor",
    titleColor: "text-white",
    subtitleColor: "text-[#fff8d6]",
    overlayOpacity: "bg-black/50"
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`AlternateStyle`]}))();export{l as AlternateStyle,c as Default,u as __namedExportsOrder,s as default};