import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
 dotenv.config();

const bcryptSalt = bcrypt.genSaltSync(10); 

export const login = async (req,res)=>{
    const {email,password}= req.body;
    const user =await User.findOne({email:email});
    if(user){
        const passOk = bcrypt.compareSync(password,user.password);
        if(passOk){
            jwt.sign({name:user.userName,email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn: '1h'}, (err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(token);
            });
        }else{
            res.status(422).json("Password is incorrect");
        }
    }else{
        res.status(404).json("No user found.");
    }
}

export const register = async (req,res)=>{
    console.log(req.body);
    const {userName,email,password} = req.body;
    console.log(userName);
    const user = await User.findOne({email:email});
    if(user){
        res.status(302).json("Email is already taken.");
        // res.json({ key: 'message', value: "Email is already taken." });
    }else{
        try{
            const user = await User.create({
                userName,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
            })
            res.status(200).json("User created successfully");
        }catch(error){
            // Handle the error
            res.status(422).json(error);
        };
    }
    // try {
    // } catch (error) {
        
    // }
}

export const profile = (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user);
        })
    }else{
        res.json(null);
    }
    // res.json({token});
}