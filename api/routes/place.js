import express from 'express';
import { photosMiddlewarer, upload, uploadByLink } from '../controllers/places.js';


const router = express.Router();

//http://localhost:5000/places
router.post('/upload-by-link',uploadByLink);
router.post('/upload',photosMiddlewarer,upload);

export default router;