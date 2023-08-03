import express from 'express';
import { addNewPlace, getPlaces, photosMiddlewarer, upload, uploadByLink } from '../controllers/places.js';


const router = express.Router();

//http://localhost:5000/places
router.post('/',addNewPlace);
router.get('/',getPlaces);
router.post('/upload-by-link',uploadByLink);
router.post('/upload',photosMiddlewarer,upload);

export default router;