 import User from "../models/user.model.js"
 import Post from "../models/posts.model.js"
export const activeCheck = async(req,res)=>{
    res.status(200).json({message : "Running!"});
}

 export const createPost = async (req,res)=>{
    const {token} = req.body;
    try{
        const user = await User.findOne({token});
        if(!user){
            res.status(404).json({message : "User not found!"});
            return;
        }

        const post = new Post({
            userId : user._id,
            body : req.body.body,
            media : req.file != undefined ? req.file.filename : "",
            fileType : req.file != undefined ? req.file.mimetype.split("/")[1] : "",
        })
        await post.save();
        return res.status(200).json({message : "Post Created!"});
    }catch(err){
        return res.status(500).json({message : err.message});
    }

 }

 export const getAllPosts = async (req,res)=>{
    try{
        
    }
 }