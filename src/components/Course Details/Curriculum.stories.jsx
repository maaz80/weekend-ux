import Curriculum from "./Curriculum";

export default {
     title: "Course Details/Curriculum",
     component: Curriculum,
     parameters: {
          layout: "padded",
          viewport: {
               defaultViewport: "mobile1",
          },
     },
     argTypes: {
          isLoggedIn: {
               control: "boolean",
               description: "Toggles between logged in (unlocked) and guest (locked) lesson views"
          },
          themeColor: {
               control: "select",
               options: [
                    "text-official",
                    "text-fg-blue",
                    "text-fg-green",
                    "text-fg-orange",
                    "text-fg-red"
               ],
               description: "Color of active play icon and texts"
          },
          borderColor: {
               control: "select",
               options: [
                    "border-[#E5E0D6]",
                    "border-zinc-300",
                    "border-official",
                    "border-transparent"
               ],
               description: "Border color of chapter accordion panels"
          }
     }
};

const mockCurriculum = [
     {
          id: 1,
          title: "Introduction to Design Thinking",
          lessons: 3,
          items: [
               {
                    lessonname: "What is User-Centered Design?",
                    video: { duration: 15, videourl: "" }
               },
               {
                    lessonname: "The 5 Stages of Design Thinking",
                    video: { duration: 25, videourl: "" }
               },
               {
                    lessonname: "Figma Fundamentals & Basics",
                    video: { duration: 40, videourl: "" }
               }
          ]
     },
     {
          id: 2,
          title: "User Research & Analysis",
          lessons: 2,
          items: [
               {
                    lessonname: "Conducting User Interviews",
                    video: { duration: 30, videourl: "" }
               },
               {
                    lessonname: "Creating User Personas",
                    video: { duration: 20, videourl: "" }
               }
          ]
     }
];

export const LockedView = {
     args: {
          isLoggedIn: false,
          themeColor: "text-official",
          borderColor: "border-[#E5E0D6]",
          curriculum: mockCurriculum
     }
};

export const UnlockedView = {
     args: {
          isLoggedIn: true,
          themeColor: "text-official",
          borderColor: "border-[#E5E0D6]",
          curriculum: mockCurriculum
     }
};
