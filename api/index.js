import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Import routes
import userRoutes from './routes/users.js';
import placeRoutes from './routes/place.js'
import bookingRoutes from './routes/bookings.js'

const app = express();


app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cookieParser());
app.use('/places/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    credentials: true,
    origin:'http://127.0.0.1:5173'
}));
const CONNECTION_URL = process.env.MONGO_URL;

const PORT = process.env.PORT || 5000


//Routes
app.use('/users',userRoutes);
app.use('/places',placeRoutes);
app.use('/bookings',bookingRoutes);



mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));