import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import multer from "multer";
const router = Router();

const storage = multer.diskStorage({
    destination : (req,File,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,File,cb)=>{
        cb(null,File.originalname)
    },
})
const upload = multer({storage : storage})
router.route("/register").post(register);
router.route("/login").post(login)

router.route("/upload_profile_picture").post(upload.single('profile_picture'),uploadProfilePicture)


export default router;
