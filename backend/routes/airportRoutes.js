import express from 'express';
import { create_airport, delete_airport, get_airports, get_pagination_airports, update_airport_data } from '../controller/airportController.js';

const router = express.Router();

router.post('/', create_airport);
router.get('/airports', get_airports);
router.get('/airports/pagination', get_pagination_airports);
router.delete('/:id', delete_airport);
router.put('/:id', update_airport_data);

export default router;