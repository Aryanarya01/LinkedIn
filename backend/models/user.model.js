import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
           type : String,
        required : true,
        unique : true,
    },
    active : {
        type : Boolean,
        default : true,
    },
    Password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
         default : "default.jpg"
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    token : {
        type : String,
        default : '',
    }
})