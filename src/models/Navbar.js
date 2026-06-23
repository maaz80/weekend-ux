import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema({

     logo: {
          image: String,
          alt: String
     },

     searchPlaceholder: String,

     dropdownName: String, //more

     loginButtonName: String,

     moreItems: {
          title: String,
          items: [{
               title: String,
               link: String
          }]
     }


}, { timestamps: true });

const Navbar = mongoose.models.Navbar || mongoose.model("Navbar", navbarSchema);

export default Navbar;