 import User from "../models/user.model.js"
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
    }catch(err){
        return res.status(500).json({message : err.message});
    }

 }