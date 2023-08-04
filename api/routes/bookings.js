import express from 'express';
import { addBooking, getAllBookings } from '../controllers/bookings.js';

const router = express.Router();

router.post('/',addBooking);
router.get('/',getAllBookings);

export default router;