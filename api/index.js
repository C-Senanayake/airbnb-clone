import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

//Import routes
import userRoutes from './routes/users.js';

const app = express();


app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin:'http://127.0.0.1:5173'
}));
const CONNECTION_URL = process.env.MONGO_URL;

const PORT = process.env.PORT || 5000


//Routes
app.use('/users',userRoutes);



mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));