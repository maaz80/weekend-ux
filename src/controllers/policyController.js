import Policy from "../models/Policy.js";
import connectDB from "../config/db.js";
import { NextResponse } from "next/server";

// GET PRIVACY POLICY CONFIGURATION
export const getPolicy = async (req) => {
     try {
          await connectDB();
          let policy = await Policy.findOne();
          if (!policy) {
               policy = new Policy({
                    title: "Privacy Policy",
                    content: "Your privacy policy text goes here...",
                    relatedBlogs: {
                         title: "Related Blogs",
                         startheading: "Our",
                         midheading: "Latest",
                         endheading: "Articles",
                         description: "Stay updated with the latest trends and stories from our design blog."
                    }
               });
               await policy.save();
          }
          return NextResponse.json(policy);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};

// UPDATE PRIVACY POLICY CONFIGURATION
export const updatePolicy = async (req) => {
     try {
          await connectDB();
          const { title, content, relatedBlogs } = await req.json();
          const updated = await Policy.findOneAndUpdate(
               {},
               { title, content, relatedBlogs },
               { new: true, upsert: true }
          );
          return NextResponse.json(updated);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};
