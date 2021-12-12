const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  patchJob,
  deleteJob,
} = require('../controllers/jobs');

router.get('/', getAllJobs);
router.get('/:id', getJob);
router.post('/', createJob);
router.patch('/:id', patchJob);
router.delete('/:id', deleteJob);

module.exports = router;
