import Form from "./Form";

export default {
     title: "Course Details/Form",
     component: Form,
     parameters: {
          layout: "padded",
          viewport: {
               defaultViewport: "mobile1",
          },
     },
     argTypes: {
          inputBgColor: {
               control: "select",
               options: [
                    "bg-transparent",
                    "bg-white",
                    "bg-zinc-50",
                    "bg-zinc-100"
               ],
               description: "Background color of the input fields"
          },
          inputBorderColor: {
               control: "select",
               options: [
                    "border-neutral-200",
                    "border-zinc-300",
                    "border-official",
                    "border-transparent"
               ],
               description: "Border color of the input fields"
          },
          inputFocusColor: {
               control: "select",
               options: [
                    "focus:border-official",
                    "focus:border-fg-blue",
                    "focus:border-fg-green",
                    "focus:border-zinc-900"
               ],
               description: "Focus border color of the input fields"
          },
          buttonSize: {
               control: "select",
               options: [
                    "w-full h-12 rounded-lg font-bold text-sm",
                    "w-full h-10 rounded-md font-semibold text-xs",
                    "w-full h-14 rounded-xl font-extrabold text-base"
               ],
               description: "Size and font styling of the submit button"
          }
     }
};

export const Default = {
     args: {
          inputBgColor: "bg-transparent",
          inputBorderColor: "border-neutral-200",
          inputFocusColor: "focus:border-official",
          buttonSize: "w-full h-12 rounded-lg font-bold text-sm"
     }
};

export const CustomStyle = {
     args: {
          inputBgColor: "bg-zinc-50",
          inputBorderColor: "border-zinc-300",
          inputFocusColor: "focus:border-fg-blue",
          buttonSize: "w-full h-14 rounded-xl font-extrabold text-base"
     }
};
