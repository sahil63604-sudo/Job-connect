const express = require('express')
const recruiterRouter = express.Router();


const authMiddleware = require('../middelware/authMiddleware');
const recruiterMiddleware = require('../middelware/recruiterMiddleware');
const { getMyJobs, updateJob, deleteJob, CreateJob } = require('../controller/jobsController');
recruiterRouter.post('/CreateJob', authMiddleware, recruiterMiddleware, CreateJob)
recruiterRouter.get('/getJObs', authMiddleware, recruiterMiddleware, getMyJobs)
recruiterRouter.put('/updateJob/:Id', authMiddleware, recruiterMiddleware, updateJob)
recruiterRouter.delete('/deleteJob/:Id', authMiddleware, recruiterMiddleware, deleteJob)
module.exports = recruiterRouter