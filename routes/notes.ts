/*TODO: ADD: /notes/stats
Get aggregated data statistics. You don’t have to mock this data. You need to calculate it based on notes objects you have.*/

import express from 'express';
import {
  getAllData,
  getSingleNote,
  deleteNote,
  addNote,
  editNote,
} from '../controllers/notes';
// import { validate, schema } from '../services/validation';

const router = express.Router();

// get all data
router.get('/notes', getAllData);

// get single note
router.get('/notes/:id', getSingleNote);

// delete note
router.delete('/notes/:id', deleteNote);

// add note
router.post('/notes', addNote);

// edit note
router.put('/notes/:id', editNote);

export default router;
