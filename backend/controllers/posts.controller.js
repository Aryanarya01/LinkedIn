import Profile from "../models/profile.model.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
export const activeCheck = async(req,res)=>{
    res.status(200).json({message : "Running!"});
}


export const register = async (req,res)=>{
        try{
            const {name, username,email,password} = req.body;
            if(!name ||!username ||!email||!password){
                res.status(400).json({message : "All fields are required!"});
                return;
            }
            const user = await User.findOne({email});
            if(user){
                res.status(400).json({message : "User Already Exist!"});
                return;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name,
                username,
                email,
                password :hashedPassword,
            })
            const profile = new Profile({userId : newUser._id})

            res.status(200)
        }catch(err){
            return res.status(500).json({message : err.message});
        }
}