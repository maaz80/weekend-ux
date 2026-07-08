import Button from "./Button";

export default {
     title: "Components/Button",
     component: Button,
     argTypes: {
          variant: {
               control: "select",
               options: ["primary", "secondary", "dark"],
          },
          size: {
               control: "select",
               options: ["sm", "md", "lg", "h10", "h11", "none"],
          },
     },
};

export const Primary = {
     args: {
          children: "Get Started",
          variant: "primary",
          size: "md",
     },
};

export const Secondary = {
     args: {
          children: "AI Courses",
          variant: "secondary",
          size: "md",
     },
};

export const Dark = {
     args: {
          children: "Dark Theme Button",
          variant: "dark",
          size: "md",
     },
};

export const Small = {
     args: {
          children: "Small Btn",
          variant: "primary",
          size: "sm",
     },
};

export const Large = {
     args: {
          children: "Large Btn",
          variant: "primary",
          size: "lg",
     },
};

export const CustomSize = {
     args: {
          children: "Custom Responsive Width Button",
          variant: "primary",
          size: "px-8 py-3 text-lg md:text-xl rounded-2xl w-full max-w-sm",
     },
};