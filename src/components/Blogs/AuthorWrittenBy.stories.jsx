import AuthorWrittenBy from "./AuthorWrittenBy";

export default {
     title: "Blogs/AuthorWrittenBy",
     component: AuthorWrittenBy,
     parameters: {
          layout: "padded",
     },
};

export const Default = {
     args: {
          author: {
               name: "Maaz Shakeel",
               role: "Lead Designer",
               avatar: "/images/hero-bg.webp",
          },
          date: "July 24, 2026",
          readTime: "5 min read",
     },
};
