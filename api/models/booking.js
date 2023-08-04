import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Place'},
    user:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    numberOfGuests:{type:Number,required:true},
    name:{type:String,required:true},
    phone:{type:String,required:true},
    price:{type:Number,required:true},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()},
});

const Booking = mongoose.model('Booking',bookingSchema);

export default Booking;