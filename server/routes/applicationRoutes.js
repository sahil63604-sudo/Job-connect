const express = require('express')
const authMiddleware = require('../middelware/authMiddleware')
const jobseekerMiddleware = require('../middelware/jobseekerMiddleware')
const { applyController,getApplicants, updateController, getApplications } = require('../controller/applicationController')
const recruiterMiddleware = require('../middelware/recruiterMiddleware')

const applicationRouter = express.Router()

applicationRouter.post('/application/:jobId', authMiddleware, jobseekerMiddleware, applyController)
applicationRouter.get('/getapplicants', authMiddleware, recruiterMiddleware, getApplicants)
applicationRouter.patch('/updateApplication/:applicationId',authMiddleware,recruiterMiddleware,updateController)
applicationRouter.get('/getApplication', authMiddleware, jobseekerMiddleware, getApplications)

module.exports = applicationRouter