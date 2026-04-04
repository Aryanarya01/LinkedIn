import Profile from "../models/profile.model.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import crypto from "crypto"


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

            res.status(200).json({message : "User Created Successfully!"})
        }catch(err){
            return res.status(500).json({message : err.message});
        }
}



export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({message : "All fields are required!"});
            return;
        }
        const existingUser = await User.findOne({email});
        if(!existingUser){
            res.status(404).json({message : "User does not exist"});
            return;
        }
        const isMatched = await bcrypt.compare(password,existingUser.password);
        if(!isMatched){
            res.status(400).json({message : "Invalid Credentials!"});
            return;
        }

        const token = crypto.randomBytes(32).toString("hex");
        await User.updateOne({_id : existingUser._id},{token});
        return res.json({token})
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

export const uploadProfilePicture = async (req,res)=>{
    const {token} = req.body; 
    try{
         const user = await User.findOne({token : token});
         if(!user){
            res.status(400).json({message : "User not found!"});
            return;
         }
         user.profilePicture = req.file.filename;
         await user.save();
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

export const updateUserProfile = async(req,res)=>{
    try{
        const {token, ...newUserData} = req.body;
        const user = await User.findOne({token});
        if(!user){
            res.status(400).json({message : "User not found!"});
            return;
        } 
        const existingUser = await User.findOne({$or : [{username},{email}]});
        if(existingUser){
            if(existingUser || String(existingUser._id) !== String(user._id)){
            res.status(400).json({message : "User Already exixt!"});
            return;
            }
        }
        Object.assign(user,newUserData)
    }catch(err){
        return res.status(400).json({message : err.message});
    }
}