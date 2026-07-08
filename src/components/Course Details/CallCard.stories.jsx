import CallCard from "./CallCard";

export default {
     title: "Course Details/CallCard",
     component: CallCard,
     parameters: {
          layout: "padded",
          viewport: {
               defaultViewport: "mobile1",
          },
     },
     argTypes: {
          title: {
               control: "text",
               description: "Card main heading text"
          },
          subtitle: {
               control: "text",
               description: "Card sub-headline text"
          },
          buttonText: {
               control: "text",
               description: "Button text label"
          },
          bgImage: {
               control: "text",
               description: "Card background image source"
          },
          titleColor: {
               control: "select",
               options: [
                    "text-white",
                    "text-neutral",
                    "text-official",
                    "text-fg-orange"
               ],
               description: "Color of the main heading"
          },
          subtitleColor: {
               control: "select",
               options: [
                    "text-white/90",
                    "text-white/70",
                    "text-neutral-600",
                    "text-[#fff8d6]"
               ],
               description: "Color of the subtitle text"
          },
          overlayOpacity: {
               control: "select",
               options: [
                    "bg-neutral/25",
                    "bg-neutral/50",
                    "bg-black/40",
                    "bg-black/60",
                    "bg-transparent"
               ],
               description: "Overlay color and opacity on background image"
          }
     }
};

export const Default = {
     args: {
          title: "Design is more than just being creative!",
          subtitle: "Learn how to make design that sells",
          buttonText: "Book a Call",
          titleColor: "text-white",
          subtitleColor: "text-white/90",
          overlayOpacity: "bg-neutral/25"
     }
};

export const AlternateStyle = {
     args: {
          title: "Want to launch your career in UI/UX?",
          subtitle: "Schedule a 1-on-1 advisor counseling session.",
          buttonText: "Talk to Advisor",
          titleColor: "text-white",
          subtitleColor: "text-[#fff8d6]",
          overlayOpacity: "bg-black/50"
     }
};
