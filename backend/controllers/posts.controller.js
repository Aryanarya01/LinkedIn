

export const activeCheck = async(req,res)=>{
    res.status(200).json({message : "Running!"});
}


export const register = async (req,res)=>{
        try{

        }catch(err){
            return res.status(500).json({message : err.message});
        }
}