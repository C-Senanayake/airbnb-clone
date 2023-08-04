import Booking from "../models/booking.js"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const addBooking = async (req,res)=>{
    // console.log(req.body);
    const {id,checkIn,checkOut,guests,name,phoneNumber,price} = req.body;
    console.log(typeof(id));
    console.log(checkIn);
    console.log(checkOut);
    console.log(typeof(guests));
    console.log(name);
    console.log(price);
    console.log(phoneNumber);
    const {token} = req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,user)=>{
        if(err) throw err;
        try {
            const booking = await Booking.create({
                place:id,user:user.id,checkIn,checkOut,numberOfGuests:guests,
                name,phone:phoneNumber,price
            });
            res.status(200).json(booking);  
        } catch (error) {
            res.status(422).json(error);
        }
    })


}

export const getAllBookings = async (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,user)=>{
        if(err) throw err;
        try {
            const {id} = user;
            const bookings = await Booking.find({user:id}).populate('place');
            // console.log(bookings);
            res.status(201).json(bookings);
        } catch (error) {
            res.json("ERROR");
        }
    })
}