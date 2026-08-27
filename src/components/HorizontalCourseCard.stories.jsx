import HorizontalCourseCard from "./HorizontalCourseCard";

export default {
     title: "Components/HorizontalCourseCard",
     component: HorizontalCourseCard,
     parameters: {
          layout: "padded",
     },
     argTypes: {
          unlocked: {
               control: "boolean",
          },
     },
};

export const Locked = {
     args: {
          unlocked: false,
          course: {
               title: "UI/UX Advanced Product Design",
               category: "UI/UX Design",
               overview: "Learn complete product design lifecycle from research to high-fidelity prototypes.",
               duration: "6 Months",
               startdate: "Starts Next Monday",
               image: "/images/weekend-ux-program-image-template.webp",
          },
     },
};

export const Unlocked = {
     args: {
          unlocked: true,
          course: {
               title: "Fullstack Web & AI Masterclass",
               category: "Development",
               overview: "Master modern web development, Next.js, AI integrations, and real-world projects.",
               duration: "4 Months",
               startdate: "Enrolled",
               image: "/images/weekend-ux-program-image-template.webp",
          },
     },
};
