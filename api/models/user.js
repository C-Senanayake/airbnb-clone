import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: String,
    email:{type:String,unique:true},
    password:String,
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()},
});

const User = mongoose.model('User',userSchema);

export default User;



