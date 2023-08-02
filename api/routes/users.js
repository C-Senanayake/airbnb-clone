import express from 'express';


import {login,logout,profile,register } from '../controllers/users.js'
const router = express.Router();

//http://localhost:5000/users
router.post('/',login);
router.post('/register',register);
router.get('/profile',profile);
router.get('/logout',logout);

export default router;