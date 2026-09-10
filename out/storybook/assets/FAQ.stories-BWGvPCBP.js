import{i as e}from"./preload-helper-DID7B_--.js";import{r as t,t as n}from"./FAQ-D99Er8Wk.js";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t],i=Object.keys(n);typeof Object.getOwnPropertySymbols==`function`&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function o(e,t){return t??={},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var s,c,l,u;e((()=>{t(),s={title:`Components/FAQ`,component:n,parameters:{layout:`fullscreen`},argTypes:{bgImage:{control:`text`,description:`Background Image URL`},bgColor:{control:`select`,options:[`bg-white`,`bg-bg-neutral`,`bg-bg-yellow-light`,`bg-bg-gray-light`,`bg-bg-cream`,`bg-bg-green`,`bg-bg-black`],description:`Background color of the section`},taglineColor:{control:`select`,options:[`text-official`,`text-white`,`text-neutral`,`text-fg-orange`,`text-fg-blue`],description:`Color of the subtitle/tagline`},titleColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-neutral`,`text-fg-blue`],description:`Color of the main heading text`},titleHighlightColor:{control:`select`,options:[`text-official`,`text-white`,`text-[#1B1B1B]`,`text-fg-orange`,`text-fg-blue`],description:`Color of the highlighted text (midheading)`},descriptionColor:{control:`select`,options:[`text-neutral/80`,`text-white/80`,`text-white/70`,`text-fg-gray`,`text-fg-neutral`],description:`Color of the description paragraph text`},questionClosedColor:{control:`select`,options:[`text-neutral`,`text-white`,`text-official`,`text-fg-blue`],description:`Color of the question when collapsed/closed`},questionOpenColor:{control:`select`,options:[`text-official`,`text-white`,`text-neutral`,`text-fg-orange`,`text-fg-blue`],description:`Color of the question when expanded/opened`},answerColor:{control:`select`,options:[`text-neutral`,`text-white/80`,`text-white/75`,`text-fg-gray`,`text-fg-neutral`],description:`Color of the answer paragraph text`},dividerColor:{control:`select`,options:[`border-gray-300`,`border-white/10`,`border-white/20`,`border-[#1B1B1B]/15`,`border-transparent`],description:`Border color of individual FAQ dividers`}}},c={args:{bgImage:`/images/weekend-ux-faq-bg.webp`,bgColor:`bg-white`,taglineColor:`text-official`,titleColor:`text-neutral`,titleHighlightColor:`text-official`,descriptionColor:`text-neutral/80`,questionClosedColor:`text-neutral`,questionOpenColor:`text-official`,answerColor:`text-neutral`,dividerColor:`border-gray-300`,paddings:`py-10`,faqData:{title:`FAQ`,startheading:`All You`,midheading:`Need`,endheading:`To Know`,description:`Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.`,faq:[{question:`What services do UI UX design agencies offer?`,answer:`User research, UX strategy, wireframing, UI design, prototyping, and usability testing are all provided by UI/UX design firms to produce user-friendly, conversion-focused digital products for the web and mobile platforms.`},{question:`Why do I need a UI UX design company for my business?`,answer:`By matching design with business objectives, a UI/UX design firm assists you in creating aesthetically pleasing, user-friendly solutions that enhance customer happiness, boost conversions, and minimize expensive usability problems.`},{question:`How long does it take to complete a UI UX design project?`,answer:`Depending on scope, research depth, number of screens, and iterations, a UI/UX design project usually takes four to eight weeks to complete; simpler projects are completed more quickly, whereas complicated products take longer.`}]}}},l={args:{bgImage:`/images/weekend-ux-faq-bg.webp`,bgColor:`bg-bg-black`,taglineColor:`text-official`,titleColor:`text-white`,titleHighlightColor:`text-official`,descriptionColor:`text-white/70`,questionClosedColor:`text-white`,questionOpenColor:`text-official`,answerColor:`text-white/80`,dividerColor:`border-white/10`,paddings:`py-10`,faqData:{title:`GET ANSWERS`,startheading:`Frequently Asked`,midheading:`Queries`,endheading:``,description:`Can't find what you are looking for? Reach out to our program coordinator.`,faq:[{question:`Is there placements assistance?`,answer:`Yes, we provide 100% placement assistance including resume building, mock interviews, and direct referrals to hiring partners.`},{question:`Can I join online?`,answer:`Absolutely! We offer hybrid learning options allowing you to study on-campus or join live interactive classes online.`}]}}},c.parameters=o(i({},c.parameters),{docs:o(i({},c.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgImage: "/images/weekend-ux-faq-bg.webp",
    bgColor: "bg-white",
    taglineColor: "text-official",
    titleColor: "text-neutral",
    titleHighlightColor: "text-official",
    descriptionColor: "text-neutral/80",
    questionClosedColor: "text-neutral",
    questionOpenColor: "text-official",
    answerColor: "text-neutral",
    dividerColor: "border-gray-300",
    paddings: "py-10",
    faqData: {
      title: "FAQ",
      startheading: "All You",
      midheading: "Need",
      endheading: "To Know",
      description: "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.",
      faq: [{
        question: "What services do UI UX design agencies offer?",
        answer: "User research, UX strategy, wireframing, UI design, prototyping, and usability testing are all provided by UI/UX design firms to produce user-friendly, conversion-focused digital products for the web and mobile platforms."
      }, {
        question: "Why do I need a UI UX design company for my business?",
        answer: "By matching design with business objectives, a UI/UX design firm assists you in creating aesthetically pleasing, user-friendly solutions that enhance customer happiness, boost conversions, and minimize expensive usability problems."
      }, {
        question: "How long does it take to complete a UI UX design project?",
        answer: "Depending on scope, research depth, number of screens, and iterations, a UI/UX design project usually takes four to eight weeks to complete; simpler projects are completed more quickly, whereas complicated products take longer."
      }]
    }
  }
}`},c.parameters?.docs?.source)})}),l.parameters=o(i({},l.parameters),{docs:o(i({},l.parameters?.docs),{source:i({originalSource:`{
  args: {
    bgImage: "/images/weekend-ux-faq-bg.webp",
    bgColor: "bg-bg-black",
    taglineColor: "text-official",
    titleColor: "text-white",
    titleHighlightColor: "text-official",
    descriptionColor: "text-white/70",
    questionClosedColor: "text-white",
    questionOpenColor: "text-official",
    answerColor: "text-white/80",
    dividerColor: "border-white/10",
    paddings: "py-10",
    faqData: {
      title: "GET ANSWERS",
      startheading: "Frequently Asked",
      midheading: "Queries",
      endheading: "",
      description: "Can't find what you are looking for? Reach out to our program coordinator.",
      faq: [{
        question: "Is there placements assistance?",
        answer: "Yes, we provide 100% placement assistance including resume building, mock interviews, and direct referrals to hiring partners."
      }, {
        question: "Can I join online?",
        answer: "Absolutely! We offer hybrid learning options allowing you to study on-campus or join live interactive classes online."
      }]
    }
  }
}`},l.parameters?.docs?.source)})}),u=[`Default`,`DarkTheme`]}))();export{l as DarkTheme,c as Default,u as __namedExportsOrder,s as default};