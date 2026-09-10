const express = require('express')
const jobRouter = express.Router();


const authMiddleware = require('../middelware/authMiddleware');
const recruiterMiddleware = require('../middelware/recruiterMiddleware');
const { getMyJobs, updateJob, deleteJob, CreateJob, searchJobs } = require('../controller/jobsController');
const jobseekerMiddleware = require('../middelware/jobseekerMiddleware');
jobRouter.post('/CreateJob', authMiddleware, recruiterMiddleware, CreateJob)
jobRouter.get('/getJObs', authMiddleware, recruiterMiddleware, getMyJobs)
jobRouter.put('/updateJob/:Id', authMiddleware, recruiterMiddleware, updateJob)
jobRouter.delete('/deleteJob/:Id', authMiddleware, recruiterMiddleware, deleteJob)

jobRouter.get('/getJob_Search',authMiddleware,jobseekerMiddleware,searchJobs)
module.exports = jobRouter