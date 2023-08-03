import express from 'express';

import {googleLogin, login,logout,profile,register,test } from '../controllers/users.js'
const router = express.Router();

//http://localhost:5000/users
router.get('/test',test);
router.post('/',login);
router.post('/google',googleLogin);
router.post('/register',register);
// router.post('/register/google',googleSignIn);
router.get('/profile',profile);
router.get('/logout',logout);

export default router;