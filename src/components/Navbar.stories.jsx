import Navbar from "./Navbar";

const meta = {
     title: "Components/Navbar",
     component: Navbar,
     parameters: {
          layout: "fullscreen",
     },
};

export default meta;


// 2. Mobile Viewport (Closed)
export const MobileClosed = {
     globals: {
          viewport: {
               value: "mobile5",
          },
     },
     parameters: {
          viewport: {
               defaultViewport: "mobile5",
          },
     },
     args: {},
};

// 3. Mobile Viewport with Menu Open
export const MobileMenuOpen = {

     args: {
          initialMenuOpen: true,
     },
};

// 4. Mobile Viewport with Search Open
export const MobileSearchOpen = {
     globals: {
          viewport: {
               value: "mobile5",
          },
     },
     parameters: {
          viewport: {
               defaultViewport: "mobile5",
          },
     },
     args: {
          initialSearchOpen: true,
     },
};

// 5. Tablet Viewport
export const Tablet = {
     globals: {
          viewport: {
               value: "tablet",
          },
     },
     parameters: {
          viewport: {
               defaultViewport: "tablet",
          },
     },
     args: {},
};

// 1. Desktop Viewport (Default view)
export const Desktop = {
     globals: {
          viewport: {
               value: "desktop",
          },
     },
     parameters: {
          viewport: {
               defaultViewport: "desktop",
          },
     },
     args: {},
};
