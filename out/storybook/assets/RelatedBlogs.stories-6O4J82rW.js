import{i as e}from"./preload-helper-DID7B_--.js";import{r as t,t as n}from"./RelatedBlogs-gyFAexdw.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Components/RelatedBlogs`,component:n,parameters:{layout:`fullscreen`},argTypes:{bgImage:{control:`text`,description:`Background Image URL`},overlayColor:{control:`select`,options:[`bg-official/25`,`bg-official/40`,`bg-black/40`,`bg-black/60`,`bg-[#0F5A47]/40`,`bg-transparent`],description:`Color overlay on top of the background image`},taglineColor:{control:`select`,options:[`text-white`,`text-official`,`text-neutral`,`text-fg-orange`,`text-[#fff8d6]`],description:`Color of the tagline / category text`},titleColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-neutral`,`text-fg-orange`],description:`Color of the main heading text`},titleHighlightColor:{control:`select`,options:[`text-white`,`text-official`,`text-[#1B1B1B]`,`text-fg-orange`,`text-fg-blue`],description:`Color of the highlighted text (midheading)`},descriptionColor:{control:`select`,options:[`text-neutral/80`,`text-white/80`,`text-white/70`,`text-fg-gray`,`text-fg-neutral`],description:`Color of the description text`},blogTitleColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-neutral`],description:`Color of individual blog titles in cards`},arrowColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-orange`],description:`Color of the arrow icon on hover`}}},c={args:{bgImage:`/images/weekend-ux-related-blogs-bg.webp`,overlayColor:`bg-official/25`,taglineColor:`text-white`,titleColor:`text-neutral`,titleHighlightColor:`text-white`,descriptionColor:`text-neutral/80`,blogTitleColor:`text-neutral`,arrowColor:`text-neutral`,data:{title:`BLOGS`,startheading:`All You`,midheading:`Need`,endheading:` To Know`,description:`Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.`}}},l={args:{bgImage:`/images/weekend-ux-related-blogs-bg.webp`,overlayColor:`bg-black/75`,taglineColor:`text-official`,titleColor:`text-white`,titleHighlightColor:`text-official`,descriptionColor:`text-white/70`,blogTitleColor:`text-white`,arrowColor:`text-official`,data:{title:`RECENT DISCUSSIONS`,startheading:`Thoughts &`,midheading:`Insights`,endheading:` From Our Mentors`,description:`Dive deep into modern design principles, tools, and updates from product industry leaders.`}}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgImage: "/images/weekend-ux-related-blogs-bg.webp",
    overlayColor: "bg-official/25",
    taglineColor: "text-white",
    titleColor: "text-neutral",
    titleHighlightColor: "text-white",
    descriptionColor: "text-neutral/80",
    blogTitleColor: "text-neutral",
    arrowColor: "text-neutral",
    data: {
      title: "BLOGS",
      startheading: "All You",
      midheading: "Need",
      endheading: " To Know",
      description: "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs."
    }
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgImage: "/images/weekend-ux-related-blogs-bg.webp",
    overlayColor: "bg-black/75",
    taglineColor: "text-official",
    titleColor: "text-white",
    titleHighlightColor: "text-official",
    descriptionColor: "text-white/70",
    blogTitleColor: "text-white",
    arrowColor: "text-official",
    data: {
      title: "RECENT DISCUSSIONS",
      startheading: "Thoughts &",
      midheading: "Insights",
      endheading: " From Our Mentors",
      description: "Dive deep into modern design principles, tools, and updates from product industry leaders."
    }
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`DarkTheme`]}))();export{l as DarkTheme,c as Default,u as __namedExportsOrder,s as default};