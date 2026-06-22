import Courses from "../models/Courses.js";
import connectDB from "../config/db.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import { NextResponse } from "next/server";

const createSlug = (title) => {
     return title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "") // Keep alphanumeric, spaces, and existing hyphens
          .replace(/\s+/g, "-");
};

// GET COURSES PAGE CONFIGURATION
export const getCourses = async (req) => {
     try {
          await connectDB();
          let courses = await Courses.findOne();
          if (!courses) {
               courses = new Courses({
                    hero: [{
                         startheading: "Explore Our",
                         endheading: "Courses",
                    }],
                    course: [
                         {
                              image: "",
                              alt: "Figma UI/UX Masterclass",
                              title: "Figma UI/UX Masterclass",
                              seotitle: "Figma UI/UX Masterclass | Weekend UX",
                              seodescription: "Learn modern UI/UX design practices using Figma. This course covers everything from wireframing to high-fidelity prototyping and design systems.",
                              slug: "figma-ui-ux-masterclass",
                              author: "Jane Doe",
                              courselength: "12 Weeks",
                              totalstudents: "1,200",
                              levels: "All Levels",
                              totallessons: "45",
                              startdate: "July 1, 2026",
                              duration: "30h 45m",
                              category: "Design",
                              overview: "Learn modern UI/UX design practices using Figma. This course covers everything from wireframing to high-fidelity prototyping and design systems.",
                              chapter: {
                                   chaptername: "Introduction to Figma",
                                   totallessons: "5",
                                   lessons: [
                                        {
                                             lessonname: "Figma Interface Tour",
                                             video: {
                                                  videourl: "",
                                                  duration: "10:15"
                                             }
                                        }
                                   ]
                              }
                         }
                    ],
                    card: {
                         title: "Join Our Learning Platform",
                         description: "Start learning from industry experts and build your career in design.",
                         buttonname: "Get Started"
                    },
                    relatedBlogs: {
                         title: "Related Blogs",
                         startheading: "Our",
                         midheading: "Latest",
                         endheading: "Articles",
                         description: "Read the latest blogs and articles from our industry leaders."
                    }
               });
               await courses.save();
          }
          return NextResponse.json(courses);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};

// UPDATE COURSES PAGE CONFIGURATION
export const updateCourses = async (req) => {
     try {
          await connectDB();
          const contentType = req.headers.get("content-type") || "";
          
          let updateData = {};

          if (contentType.includes("multipart/form-data")) {
               const formData = await req.formData();
               const dataStr = formData.get("data");
               updateData = dataStr ? JSON.parse(dataStr) : {};
               
               // Handle course images and videos
               if (updateData.course && Array.isArray(updateData.course)) {
                    for (let i = 0; i < updateData.course.length; i++) {
                         // Course Image
                         const imageFile = formData.get(`courseImage_${i}`);
                         if (imageFile) {
                              updateData.course[i].image = await uploadToCloudinary(imageFile, "courses/images");
                         }
                         
                         // Lesson Videos
                         if (updateData.course[i].chapter && updateData.course[i].chapter.lessons) {
                              for (let j = 0; j < updateData.course[i].chapter.lessons.length; j++) {
                                   const videoFile = formData.get(`courseVideo_${i}_${j}`);
                                   if (videoFile) {
                                        updateData.course[i].chapter.lessons[j].video = updateData.course[i].chapter.lessons[j].video || {};
                                        updateData.course[i].chapter.lessons[j].video.videourl = await uploadToCloudinary(videoFile, "courses/videos");
                                   }
                              }
                         }
                    }
               }
          } else {
               updateData = await req.json();
          }

          // Auto-generate missing slugs in updateData.course
          if (updateData.course && Array.isArray(updateData.course)) {
               updateData.course = updateData.course.map(c => {
                    if (c.title && !c.slug) {
                         c.slug = createSlug(c.title);
                    } else if (c.slug) {
                         c.slug = createSlug(c.slug);
                    }
                    return c;
               });
          }

          let courses = await Courses.findOne();
          if (!courses) {
               courses = new Courses();
          }

          if (updateData.hero !== undefined) courses.hero = updateData.hero;
          if (updateData.course !== undefined) courses.course = updateData.course;
          if (updateData.card !== undefined) courses.card = updateData.card;
          if (updateData.relatedBlogs !== undefined) courses.relatedBlogs = updateData.relatedBlogs;

          await courses.save();
          return NextResponse.json(courses);
     } catch (err) {
          return NextResponse.json({ error: err.message }, { status: 500 });
     }
};

// GET SINGLE COURSE BY SLUG / ID (from the list of courses)
export const getCourseBySlug = async (req, { params }) => {
     try {
          await connectDB();
          const { idOrSlug } = await params;
          const coursesPage = await Courses.findOne();
          
          if (!coursesPage) {
               return NextResponse.json({ error: "No courses configured" }, { status: 404 });
          }

          // Search in course array by slug or _id
          const courseItem = coursesPage.course.find(c => c.slug === idOrSlug || (c._id && c._id.toString() === idOrSlug));

          if (!courseItem) {
               return NextResponse.json({ error: "Course not found" }, { status: 404 });
          }

          return NextResponse.json(courseItem);
     } catch (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
     }
};
