import AuthorAbout from "./AuthorAbout";

export default {
     title: "Blogs/AuthorAbout",
     component: AuthorAbout,
     parameters: {
          layout: "padded",
     },
};

export const Default = {
     args: {
          author: {
               name: "Maaz Shakeel",
               role: "Lead UI/UX Designer & Educator",
               bio: "Passionate about creating intuitive digital experiences and mentoring aspiring designers.",
               avatar: "/images/hero-bg.webp",
          },
     },
};
