/** @type { import('@storybook/nextjs-vite').Preview } */
import { MdAddPhotoAlternate } from "react-icons/md";
import "../src/app/globals.css";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { withThemeByClassName } from "@storybook/addon-themes";

// const customViewports = {

//   tablet: {
//     name: "Tablet",
//     styles: {
//       width: "768px",
//       height: "1024px",
//     },
//     type: "tablet",
//   },
//   mobile5: {
//     name: "Mobile 5",
//     styles: {
//       width: "390px",
//       height: "844px",
//     },
//     type: "mobile",
//   },
//   desktop: {
//     name: "PC / Desktop",
//     styles: {
//       width: "1240px",
//       height: "900px",
//     },
//     type: "desktop",
//   }
// };

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;