const { NotFound } = require('../errors');
const JobModel = require('../models/Job');

const getAllJobs = async (req, res) => {
  const allJobs = await JobModel.find({ createdBy: req.user.userId });

  res.status(200).json(allJobs);
};

const getJob = async (req, res) => {
  const { user, params } = req;
  const job = await JobModel.findOne({
    _id: params.id,
    createdBy: user.userId,
  });

  if (!job) {
    throw new NotFound(`Job with id: ${params.id} was not found`);
  }
  res.status(200).json(job);
};

const createJob = async (req, res) => {
  const newJob = await JobModel.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  res.status(200).json(newJob);
};

const patchJob = async (req, res) => {
  const { user, params } = req;

  const patchedJob = await JobModel.findOneAndUpdate(
    {
      _id: params.id,
      createdBy: user.userId,
    },
    { ...req.body },
    { runValidators: true, new: true },
  );

  if (!patchedJob) {
    throw new NotFound(`Couldn't find job with id ${params.id} to update`);
  }
  res.status(200).json(patchedJob);
};

const deleteJob = async (req, res) => {
  const { user, params } = req;

  const deleted = await JobModel.deleteOne({
    _id: params.id,
    createdBy: user.userId,
  });

  if (!deleted.deletedCount) {
    throw new NotFound(`Couldn't delete job with id ${params.id}`);
  }

  res.status(200).json(deleted);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  patchJob,
  deleteJob,
};
