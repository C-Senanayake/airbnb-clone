import express from 'express';


import {login,register } from '../controllers/users.js'
const router = express.Router();

//http://localhost:5000/users
router.post('/',login);
router.post('/register',register);

export default router;