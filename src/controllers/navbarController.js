import Navbar from "../models/Navbar.js";
import connectDB from "../config/db.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import { NextResponse } from "next/server";

// GET NAVBAR SETTINGS
export const getNavbar = async (req) => {
     try {
          await connectDB();
          let navbar = await Navbar.findOne();
          if (!navbar) {
               navbar = new Navbar({
                    logo: {
                         image: "",
                         alt: "Kreeya Logo"
                    },
                    buttonText: "Refer & Earn",
                    searchPlaceholder: "Search courses...",
                    dropdownName: "Courses",
                    loginButtonName: "Sign In"
               });
               await navbar.save();
          }
          return NextResponse.json(navbar);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};

// UPDATE NAVBAR SETTINGS
export const updateNavbar = async (req) => {
     try {
          await connectDB();
          const formData = await req.formData();

          const buttonText = formData.get("buttonText");
          const searchPlaceholder = formData.get("searchPlaceholder");
          const dropdownName = formData.get("dropdownName");
          const loginButtonName = formData.get("loginButtonName");
          const logoAlt = formData.get("logoAlt") || formData.get("alt");
          const logoFile = formData.get("logoImage") || formData.get("image");

          let navbar = await Navbar.findOne();
          if (!navbar) {
               navbar = new Navbar();
          }

          if (buttonText !== null && buttonText !== undefined) navbar.buttonText = buttonText;
          if (searchPlaceholder !== null && searchPlaceholder !== undefined) navbar.searchPlaceholder = searchPlaceholder;
          if (dropdownName !== null && dropdownName !== undefined) navbar.dropdownName = dropdownName;
          if (loginButtonName !== null && loginButtonName !== undefined) navbar.loginButtonName = loginButtonName;

          if (!navbar.logo) {
               navbar.logo = { image: "", alt: "" };
          }
          if (logoAlt !== null && logoAlt !== undefined) navbar.logo.alt = logoAlt;

          if (logoFile) {
               navbar.logo.image = await uploadToCloudinary(logoFile, "navbar");
          }

          await navbar.save();
          return NextResponse.json(navbar);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};
