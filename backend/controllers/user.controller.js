import Profile from "../models/profile.model.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import PDFDocument from "pdfkit"
import fs from "fs"

const convertUserDataTOPDF = async (userData)=>{
    const doc = new PDFDocument();
    const outputPath = crypto.randomBytes(32).toString("hex")+".pdf";
    const stream = fs.createWriteStream("uploads/"+outputPath);
    doc.pipe(stream);

    doc.image(`uploads/${userData.userId.profilePicture}`,{align : "center",width : 100});
    doc.fontSize(14).text(`Name : ${userData.userId.name}`);
    doc.fontSize(14).text(`Username : ${userData.userId.username}`);
    doc.fontSize(14).text(`Email : ${userData.userId.email}`);
    doc.fontSize(14).text(`Bio : ${userData.bio}`);
    doc.fontSize(14).text(`CurrentPosition : ${userData.currentPost}`);
    doc.fontSize(14).text("Past Work :")
    userData.pastWork.forEach((work,index)=>{
        doc.fontSize(14).text(`Company Name : ${work.company}`);
        doc.fontSize(14).text(`Position : ${work.position}`);
        doc.fontSize(14).text(`Years : ${work.years}`);
    })
    doc.end();
    return outputPath;

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
            await profile.save();
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
    const {token} = req.body; ////                      me be a errr
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
        Object.assign(user,newUserData);
        await user.save();
    }catch(err){
        return res.status(400).json({message : err.message});
    }
}



export const getUserAndProfile = async(req,res)=>{
    try{
        const {token} = req.body;
        const user = await User.findOne({token});
        if(!user){
            return res.status(400).json({message : "User not found!"});
        }
        const userProfile  = await Profile.findOne({userId : user._id}).populate('userId','name email username profilePicture');
        return res.json(userProfile)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}


export const updateProfileData = async (req,res)=>{
    try{
        const {token, ...newProfileData} = req.body;
        const userProfile = await User.findOne({token:token});
        if(!userProfile){
            res.status(404).json({message : "User not found"});
            return;
        }
        const profile_to_update = await Profile.findOne({userId : userProfile._id});
        Object.assign(profile_to_update,newProfileData);
        await profile_to_update.save();
        return res.status(200).json({message : "Profile Updated!"});
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const getAllUserProfile = async(req,res)=>{
    try{
        const profiles = await Profile.find().populate('userId','name username email profilePicture');
        return res.json({profiles})
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const downloadProfile = async(req,res)=>{

    const user_id = req.query.id;
    const userProfile = await Profile.findOne({userId : user_id}).populate('userId','name username email profilePicture');

    let outputPath = await convertUserDataTOPDF(userProfile);
    return res.json({"message" : outputPath})
}

export const sendConnectionRequest = async (req,res)=>{
    const {token, connectionId} = req.body;
    try{
        const user = await User.findOne({token});
        if(!user){
            res.status(404).json({message : "User not found!"});
            return;
        }
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}