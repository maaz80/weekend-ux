import Location from "../models/Location.js";
import connectDB from "../config/db.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import { NextResponse } from "next/server";

// GET LOCATION PAGE CONFIGURATION
export const getLocation = async (req) => {
     try {
          await connectDB();
          let location = await Location.findOne();
          if (!location) {
               location = new Location({
                    hero: [{
                         title: "Our Locations",
                         seotitle: "Our Locations | Weekend UX",
                         seodescription: "Find our offices and locations worldwide.",
                         slug: "our-locations",
                         heading: "Where Design Meets Excellence",
                         buttonName: "Contact Us"
                    }],
                    content: "We are headquartered in Delhi, with partner design studios across major tech hubs worldwide.",
                    image: {
                         imageurl: "",
                         alt: "Our Delhi Studio Office"
                    },
                    relatedBlogs: {
                         title: "Related Blogs",
                         startheading: "Our",
                         midheading: "Latest",
                         endheading: "Stories",
                         description: "Stay updated with the latest trends and stories from our design blog."
                    }
               });
               await location.save();
          }
          return NextResponse.json(location);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};

// UPDATE LOCATION PAGE CONFIGURATION
export const updateLocation = async (req) => {
     try {
          await connectDB();
          const contentType = req.headers.get("content-type") || "";
          
          let updateData = {};
          let locationImageFile = null;

          if (contentType.includes("multipart/form-data")) {
               const formData = await req.formData();
               const dataStr = formData.get("data");
               updateData = dataStr ? JSON.parse(dataStr) : {};
               
               locationImageFile = formData.get("image");
               if (locationImageFile) {
                    const url = await uploadToCloudinary(locationImageFile, "location");
                    updateData.image = updateData.image || {};
                    updateData.image.imageurl = url;
               }
          } else {
               updateData = await req.json();
          }

          let location = await Location.findOne();
          if (!location) {
               location = new Location();
          }

          if (updateData.hero !== undefined) location.hero = updateData.hero;
          if (updateData.content !== undefined) location.content = updateData.content;
          if (updateData.image !== undefined) location.image = updateData.image;
          if (updateData.relatedBlogs !== undefined) location.relatedBlogs = updateData.relatedBlogs;

          await location.save();
          return NextResponse.json(location);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};
