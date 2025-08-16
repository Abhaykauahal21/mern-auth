import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { AuthRoutes } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Remove the trailing slash
  credentials: true,
}))

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});




//routes

app.use("/api/auth", AuthRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
