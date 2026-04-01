import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());


app.use(cors());

const port = 9080;
const start = async ()=>{
    const connectDB = await mongoose.connect("mongodb+srv://aryanarya01:aryan5555@linkedin.mdrgeum.mongodb.net/?appName=LinkedIn")
    app.listen(port,()=>{
        console.log(`App is listining to port ${port}`);
    })
}

start();