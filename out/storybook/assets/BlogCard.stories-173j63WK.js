import{i as e}from"./preload-helper-DID7B_--.js";import{n as t,t as n}from"./BlogCard-CnNs_raZ.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Blogs/BlogCard`,component:n,parameters:{layout:`padded`,viewport:{defaultViewport:`mobile1`}},argTypes:{height:{control:`select`,options:[`h-62.5 md:h-95`,`h-42.5 md:h-61`,`h-50 md:h-72`,`h-40 md:h-56`],description:`Height class for the blog card image`},titleColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-blue`,`text-fg-neutral`,`text-fg-orange`],description:`Color of the blog title text`},arrowColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-orange`],description:`Color of the arrow icon on hover`},imgBgColor:{control:`select`,options:[`bg-zinc-100`,`bg-zinc-800`,`bg-bg-cream`,`bg-bg-yellow-brand`,`bg-transparent`],description:`Fallback background color of the image container`}}},c={args:{height:`h-62.5 md:h-95`,titleColor:`text-neutral`,arrowColor:`text-neutral`,imgBgColor:`bg-zinc-100`,blog:{id:`blog-1`,title:`The Future of AI in Product Design and User Experience`,image:`/images/hero-bg.webp`,slug:`the-future-of-ai-in-product-design`,alt:`AI in design`}}},l={args:{height:`h-42.5 md:h-61`,titleColor:`text-[#8F6A00]`,arrowColor:`text-official`,imgBgColor:`bg-bg-cream`,blog:{id:`blog-2`,title:`How Modern UX Designers Create Experiences That Convert`,image:`/images/hero-bg.webp`,slug:`how-modern-ux-designers-create-experiences`,alt:`UX design that converts`}}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    height: "h-62.5 md:h-95",
    titleColor: "text-neutral",
    arrowColor: "text-neutral",
    imgBgColor: "bg-zinc-100",
    blog: {
      id: "blog-1",
      title: "The Future of AI in Product Design and User Experience",
      image: "/images/hero-bg.webp",
      slug: "the-future-of-ai-in-product-design",
      alt: "AI in design"
    }
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    height: "h-42.5 md:h-61",
    titleColor: "text-[#8F6A00]",
    arrowColor: "text-official",
    imgBgColor: "bg-bg-cream",
    blog: {
      id: "blog-2",
      title: "How Modern UX Designers Create Experiences That Convert",
      image: "/images/hero-bg.webp",
      slug: "how-modern-ux-designers-create-experiences",
      alt: "UX design that converts"
    }
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`LightThemeCard`]}))();export{c as Default,l as LightThemeCard,u as __namedExportsOrder,s as default};