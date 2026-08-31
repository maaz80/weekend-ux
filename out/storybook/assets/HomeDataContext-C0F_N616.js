import{i as e,l as t}from"./preload-helper-DID7B_--.js";import{t as n}from"./react-BCzXYUIv.js";import{P as r}from"./iframe-D5N1RLyR.js";function i({children:e,initialData:t}){let[n,r]=(0,s.useState)(!1);return(0,o.jsx)(c.Provider,{value:{homeData:t?.homeData||null,faqData:t?.faqData||null,coursesData:t?.coursesData||null,navbarData:t?.navbarData||null,footerGlobalData:t?.footerGlobalData||null,footerColumnsData:t?.footerColumnsData||null,testimonialsData:t?.testimonialsData||null,blogsData:t?.blogsData||null,locationsData:t?.locationsData||null,loading:!1,isChatbotOpen:n,setIsChatbotOpen:r},children:e})}function a(){return(0,s.useContext)(c)}var o,s,c,l=e((()=>{o=r(),s=t(n()),c=(0,s.createContext)({homeData:null,faqData:null,coursesData:null,navbarData:null,footerGlobalData:null,footerColumnsData:null,testimonialsData:null,blogsData:null,locationsData:null,loading:!1}),i.__docgenInfo={description:`HomeDataProvider — purely static data distribution.

All content data is fetched at BUILD TIME by layout.js (server component)
and passed here as \`initialData\`. No client-side API calls are made.

Flow:
  Admin changes → GitHub Action triggered → Next.js build runs →
  layout.js fetches fresh DB data → baked into static HTML → FTP to Hostinger

After one page refresh the user sees new content. No caching issues.`,methods:[],displayName:`HomeDataProvider`}}));export{l as n,a as r,c as t};