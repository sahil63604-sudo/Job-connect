const express=require('express')
const recruiterRouter=express.Router();

const RecruiterController = require('../controller/recruiterController');

const authMiddleware=require('../middelware/authMiddleware');
const recruiterMiddleware = require('../middelware/recruiterMiddleware');
const { getMyJobs, updateJob, deleteJob } = require('../controller/MyjobsController');
recruiterRouter.post('/CreateJob',authMiddleware,recruiterMiddleware,RecruiterController)
recruiterRouter.get('/getJObs',authMiddleware,recruiterMiddleware,getMyJobs)
recruiterRouter.put('/updateJob/:Id',authMiddleware,recruiterMiddleware,updateJob)
recruiterRouter.delete('/deleteJob/:Id',authMiddleware,recruiterMiddleware,deleteJob)
module.exports=recruiterRouter