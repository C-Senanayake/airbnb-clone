import express from 'express';
import { addNewPlace, getAllPlaces, getPlace, getPlaces, photosMiddlewarer, updatePlace, upload, uploadByLink } from '../controllers/places.js';


const router = express.Router();

//http://localhost:5000/places
router.post('/',addNewPlace);
router.put('/',updatePlace);
router.get('/',getPlaces);
router.get('/all',getAllPlaces);
router.get('/getplace/:id',getPlace);
router.post('/upload-by-link',uploadByLink);
router.post('/upload',photosMiddlewarer,upload);

export default router;