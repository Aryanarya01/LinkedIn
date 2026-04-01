import User from "../models/user.model.js"

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
            
        }catch(err){
            return res.status(500).json({message : err.message});
        }
}