import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./FeatureStrip-D5jAAXTk.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`About/Feature Strip`,component:n,parameters:{layout:`fullscreen`},argTypes:{bgColor:{control:`select`,options:[`bg-official`,`bg-bg-neutral`,`bg-bg-white`,`bg-bg-yellow-light`,`bg-bg-gray-light`,`bg-bg-cream`,`bg-bg-green`,`bg-bg-black`,`bg-bg-green-light`,`bg-bg-yellow-brand`,`bg-bg-cream-brand`,`bg-bg-red`,`bg-bg-gray`,`bg-bg-red-light`,`bg-bg-gray-soft`],description:`Background color of the section wrapper`},textColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-blue`,`text-fg-neutral`,`text-fg-green`,`text-fg-gray`,`text-fg-orange`,`text-fg-red`],description:`Text and icon color inside the feature strip`},borderColor:{control:`select`,options:[`bg-neutral`,`bg-white`,`bg-white/20`,`bg-official`,`bg-bd-neutral`,`bg-bd-green`,`bg-transparent`],description:`Color of the vertical separator dividers`}}},c={args:{bgColor:`bg-official`,textColor:`text-neutral`,borderColor:`bg-neutral`,data:{description:`Weekend UX is a hands-on design institute, in-person classes and structured recordings built for people who learn by doing, not watching.`,points:[{icon:`HiLightBulb`,text:`Experience World
Class Learning`},{icon:`MdOutlineMapsHomeWork `,text:`100% Placement
Assistance`},{icon:`BsPersonWorkspace`,text:`Study On-Campus
or Online`}]}}},l={args:{bgColor:`bg-bg-black`,textColor:`text-white`,borderColor:`bg-white/20`,data:{description:`An immersive platform for modern designers. We teach actual skills that companies value.`,points:[{icon:`FaBolt`,text:`Rapid Mentorship
Sessions`},{icon:`FaStar`,text:`Hands-on UI/UX
Workshops`},{icon:`FaRegLightbulb`,text:`Real Projects
& Live Briefs`}]}}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-official",
    textColor: "text-neutral",
    borderColor: "bg-neutral",
    data: {
      description: "Weekend UX is a hands-on design institute, in-person classes and structured recordings built for people who learn by doing, not watching.",
      points: [{
        icon: "HiLightBulb",
        text: "Experience World\\nClass Learning"
      }, {
        icon: "MdOutlineMapsHomeWork ",
        text: "100% Placement\\nAssistance"
      }, {
        icon: "BsPersonWorkspace",
        text: "Study On-Campus\\nor Online"
      }]
    }
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgColor: "bg-bg-black",
    textColor: "text-white",
    borderColor: "bg-white/20",
    data: {
      description: "An immersive platform for modern designers. We teach actual skills that companies value.",
      points: [{
        icon: "FaBolt",
        text: "Rapid Mentorship\\nSessions"
      }, {
        icon: "FaStar",
        text: "Hands-on UI/UX\\nWorkshops"
      }, {
        icon: "FaRegLightbulb",
        text: "Real Projects\\n& Live Briefs"
      }]
    }
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`DarkTheme`]}))();export{l as DarkTheme,c as Default,u as __namedExportsOrder,s as default};