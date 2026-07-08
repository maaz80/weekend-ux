import BlogCard from "./BlogCard";

export default {
     title: "Blogs/BlogCard",
     component: BlogCard,
     parameters: {
          layout: "padded",
          viewport: {
               defaultViewport: "mobile1",
          },
     },
     argTypes: {
          height: {
               control: "select",
               options: [
                    "h-62.5 md:h-95",
                    "h-42.5 md:h-61",
                    "h-50 md:h-72",
                    "h-40 md:h-56"
               ],
               description: "Height class for the blog card image"
          },
          titleColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-blue",
                    "text-fg-neutral",
                    "text-fg-orange"
               ],
               description: "Color of the blog title text"
          },
          arrowColor: {
               control: "select",
               options: [
                    "text-neutral",
                    "text-white",
                    "text-official",
                    "text-fg-orange"
               ],
               description: "Color of the arrow icon on hover"
          },
          imgBgColor: {
               control: "select",
               options: [
                    "bg-zinc-100",
                    "bg-zinc-800",
                    "bg-bg-cream",
                    "bg-bg-yellow-brand",
                    "bg-transparent"
               ],
               description: "Fallback background color of the image container"
          }
     }
};

export const Default = {
     args: {
          height: "h-62.5 md:h-95",
          titleColor: "text-neutral",
          arrowColor: "text-neutral",
          imgBgColor: "bg-zinc-100",
          blog: {
               id: "blog-1",
               title: "The Future of AI in Product Design and User Experience",
               image: "/images/hero-bg.webp",
               slug: "the-future-of-ai-in-product-design",
               alt: "AI in design"
          }
     }
};

export const LightThemeCard = {
     args: {
          height: "h-42.5 md:h-61",
          titleColor: "text-[#8F6A00]",
          arrowColor: "text-official",
          imgBgColor: "bg-bg-cream",
          blog: {
               id: "blog-2",
               title: "How Modern UX Designers Create Experiences That Convert",
               image: "/images/hero-bg.webp",
               slug: "how-modern-ux-designers-create-experiences",
               alt: "UX design that converts"
          }
     }
};
