import Content from "./Content";

export default {
     title: "About/Content",
     component: Content,
     argTypes: {
          data: {
               control: "text",
               description: "Quote text content"
          },
          textColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-blue",
                    "text-fg-neutral",
                    "text-fg-green",
                    "text-fg-gray",
                    "text-fg-orange",
                    "text-fg-red"
               ],
               description: "Color of the quote text"
          },
          fontSize: {
               control: "select",
               options: [
                    "text-[32px] md:text-[40px]",
                    "text-[24px] md:text-[32px]",
                    "text-[20px] md:text-[28px]",
                    "text-[18px] md:text-[24px]",
                    "text-[40px] md:text-[48px]"
               ],
               description: "Font size classes"
          },
          showDiamond: {
               control: "boolean",
               description: "Whether to show the decorative diamond image"
          },
          diamondOpacity: {
               control: "select",
               options: [
                    "opacity-50",
                    "opacity-10",
                    "opacity-20",
                    "opacity-30",
                    "opacity-75",
                    "opacity-100"
               ],
               description: "Opacity of the decorative diamond"
          }
     }
};

export const Default = {
     args: {
          data: "“Design can't be learned by watching someone else design. Weekend UX exists because the only way to get better is to sit down, make something, and get honest feedback on it.”",
          textColor: "text-neutral",
          fontSize: "text-[32px] md:text-[40px]",
          showDiamond: true,
          diamondOpacity: "opacity-50"
     }
};

export const AlternateStyle = {
     args: {
          data: "“Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects.”",
          textColor: "text-fg-orange",
          fontSize: "text-[24px] md:text-[32px]",
          showDiamond: true,
          diamondOpacity: "opacity-20"
     }
};
