import express from 'express';

import { getAllJobs, createJob, updateJob, deleteJob, getJobById, getJobByUniqueId } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/', getAllJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete("/:id", deleteJob);
router.get('/:id', getJobById); // Added route to fetch job by ID
router.get('/view/:uniqueId', getJobByUniqueId); // Added route to fetch job by unique identifier

export default router;