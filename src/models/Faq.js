import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
     pageSlug: {
          type: String,
          required: true,
          unique: true
     },
     title: String,
     startheading: String,
     midheading: String,
     endheading: String,
     description: String,
     faq: [
          {
               ques: String,
               ans: String,
          }
     ]
}, { timestamps: true });

const Faq = mongoose.model("FAQ", faqSchema);
export default Faq;