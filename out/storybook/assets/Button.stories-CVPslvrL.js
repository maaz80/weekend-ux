import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./Button-CYHLBIzm.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u,d,f,p,m;e((()=>{t(),s={title:`Components/Button`,component:n,argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`dark`]},size:{control:`select`,options:[`sm`,`md`,`lg`,`h10`,`h11`,`none`]}}},c={args:{children:`Get Started`,variant:`primary`,size:`md`}},l={args:{children:`AI Courses`,variant:`secondary`,size:`md`}},u={args:{children:`Dark Theme Button`,variant:`dark`,size:`md`}},d={args:{children:`Small Btn`,variant:`primary`,size:`sm`}},f={args:{children:`Large Btn`,variant:`primary`,size:`lg`}},p={args:{children:`Custom Responsive Width Button`,variant:`primary`,size:`px-8 py-3 text-lg md:text-xl rounded-2xl w-full max-w-sm`}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    children: "Get Started",
    variant: "primary",
    size: "md"
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    children: "AI Courses",
    variant: "secondary",
    size: "md"
  }
}`},l.parameters?.docs?.source)})}),u.parameters=o(i({},u.parameters),{docs:o(i({},u.parameters?.docs),{source:i({originalSource:`{
  args: {
    children: "Dark Theme Button",
    variant: "dark",
    size: "md"
  }
}`},u.parameters?.docs?.source)})}),d.parameters=o(i({},d.parameters),{docs:o(i({},d.parameters?.docs),{source:i({originalSource:`{
  args: {
    children: "Small Btn",
    variant: "primary",
    size: "sm"
  }
}`},d.parameters?.docs?.source)})}),f.parameters=o(i({},f.parameters),{docs:o(i({},f.parameters?.docs),{source:i({originalSource:`{
  args: {
    children: "Large Btn",
    variant: "primary",
    size: "lg"
  }
}`},f.parameters?.docs?.source)})}),p.parameters=o(i({},p.parameters),{docs:o(i({},p.parameters?.docs),{source:i({originalSource:`{
  args: {
    children: "Custom Responsive Width Button",
    variant: "primary",
    size: "px-8 py-3 text-lg md:text-xl rounded-2xl w-full max-w-sm"
  }
}`},p.parameters?.docs?.source)})}),m=[`Primary`,`Secondary`,`Dark`,`Small`,`Large`,`CustomSize`]}))();export{p as CustomSize,u as Dark,f as Large,c as Primary,l as Secondary,d as Small,m as __namedExportsOrder,s as default};