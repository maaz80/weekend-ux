import Form from "./Form";

export default {
     title: "Contact/Form",
     component: Form,
     parameters: {
          layout: "padded",
     },
     argTypes: {
          inputBgColor: {
               control: "select",
               options: [
                    "bg-transparent",
                    "bg-white",
                    "bg-bg-gray-soft",
                    "bg-bg-cream",
                    "bg-zinc-100"
               ],
               description: "Background color of input fields"
          },
          inputBorderColor: {
               control: "select",
               options: [
                    "border-[#E5E0D6]",
                    "border-neutral-300",
                    "border-neutral-400",
                    "border-official",
                    "border-transparent"
               ],
               description: "Border color of input fields (when active/no error)"
          },
          inputFocusColor: {
               control: "select",
               options: [
                    "focus:border-official",
                    "focus:border-fg-blue",
                    "focus:border-fg-green",
                    "focus:border-neutral",
                    "focus:border-zinc-800"
               ],
               description: "Border color of input fields when focused"
          },
          buttonSize: {
               control: "select",
               options: [
                    "w-full h-12 rounded-md font-bold text-sm",
                    "w-full h-10 rounded-sm font-medium text-xs",
                    "w-full h-14 rounded-xl font-black text-base"
               ],
               description: "Tailwind sizing and roundness classes for the submit button"
          }
     }
};

export const Default = {
     args: {
          inputBgColor: "bg-transparent",
          inputBorderColor: "border-[#E5E0D6]",
          inputFocusColor: "focus:border-official",
          buttonSize: "w-full h-12 rounded-md font-bold text-sm"
     }
};

export const CustomStyle = {
     args: {
          inputBgColor: "bg-bg-gray-soft",
          inputBorderColor: "border-transparent",
          inputFocusColor: "focus:border-fg-blue",
          buttonSize: "w-full h-14 rounded-xl font-black text-base"
     }
};
