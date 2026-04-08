import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoute from "./routes/posts.routes.js"
import userRoute from "./routes/user.route.js"
dotenv.config();
const port = 9080;
const app = express();
app.use(express.json());
app.use(express.static("uploads"))

app.use(cors());
app.use(postRoute);
app.use(userRoute)
 
const start = async ()=>{
    const connectDB = await mongoose.connect("mongodb+srv://aryanarya01:aryan5555@linkedin.mdrgeum.mongodb.net/?appName=LinkedIn")
    app.listen(port,()=>{
        console.log(`App is listining to port ${port}`);
    })
}

start();