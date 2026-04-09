import { Router } from "express";
import { activeCheck } from "../controllers/posts.controller.js";
import multer from "multer"
const router = Router();

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads/')
    },
    
})
router.route('/').get(activeCheck)

export default router;