import CourseLockedModal from "./CourseLockedModal";

export default {
     title: "Components/CourseLockedModal",
     component: CourseLockedModal,
     parameters: {
          layout: "fullscreen",
     },
     argTypes: {
          isOpen: { control: "boolean" },
     },
};

export const Open = {
     args: {
          isOpen: true,
          course: { title: "UX Architecture & Systems" },
          onClose: () => {},
     },
};

export const Closed = {
     args: {
          isOpen: false,
          course: { title: "UX Architecture & Systems" },
          onClose: () => {},
     },
};
