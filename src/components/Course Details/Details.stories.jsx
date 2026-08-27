import Details from "./Details";

export default {
     title: "Course Details/Details",
     component: Details,
     parameters: {
          layout: "fullscreen",
     },
};

export const Default = {
     args: {
          data: {
               title: "UI/UX Design Masterclass",
               description: "Master user research, wireframing, component libraries, and interactive prototyping with industry mentors.",
               duration: "6 Months",
               tools: ["Figma", "Framer", "Protopie"],
          },
     },
};
