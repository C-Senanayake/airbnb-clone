import mongoose from "mongoose";

const placeSchema = mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()},
});

const Place = mongoose.model('Place',placeSchema);

export default Place;