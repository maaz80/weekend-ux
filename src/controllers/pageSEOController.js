import PageSEO from "../models/PageSEO.js";
import connectDB from "../config/db.js";
import { NextResponse } from "next/server";

// Get SEO for a specific page
export const getPageSEO = async (req, { params }) => {
     try {
          await connectDB();
          const { pageId } = await params;

          const seo = await PageSEO.findOne({ pageSlug: pageId });

          if (!seo) {
               return NextResponse.json({ title: "", description: "", keywords: "" });
          }

          return NextResponse.json(seo);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};

// Create or Update SEO for a specific page
export const updatePageSEO = async (req, { params }) => {
     try {
          await connectDB();
          const { pageId } = await params;
          const { title, description, keywords } = await req.json();

          let seo = await PageSEO.findOne({ pageSlug: pageId });

          if (seo) {
               seo.title = title;
               seo.description = description;
               seo.keywords = keywords;
               await seo.save();
          } else {
               seo = await PageSEO.create({
                    pageSlug: pageId,
                    title,
                    description,
                    keywords
               });
          }

          return NextResponse.json(seo);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};