import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
     hero: [{
          title: String,
          seotitle:String,
          seodescription:String,
          slug:String,
          heading: String,
          buttonName: String
     }],
     content: String,
     image: {
          imageurl: String,
          alt: String,
     },
  
     relatedBlogs: {
          title: String,
          startheading: String,
          midheading: String,
          endheading: String,
          description: String
     }

}, { timestamps: true });

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;
