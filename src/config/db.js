import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
     cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
     if (!MONGO_URI) {
          console.warn("MONGO_URI is not configured; skipping database connection for this build.");
          return null;
     }

     if (cached.conn) {
          return cached.conn;
     }

     if (!cached.promise) {
          const opts = {
               bufferCommands: false,
          };

          cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
               console.log("MongoDB Connected");
               return mongooseInstance;
          }).catch((err) => {
               console.error("MongoDB connection error:", err);
               cached.promise = null;
               throw err;
          });
     }

     try {
          cached.conn = await cached.promise;
     } catch (error) {
          cached.conn = null;
          throw new Error("Database connection failed");
     }

     return cached.conn;
};

export default connectDB;