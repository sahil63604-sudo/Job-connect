const express = require('express')
const authMiddleware = require('../middelware/authMiddleware')
const jobseekerMiddleware = require('../middelware/jobseekerMiddleware')
const { applyController,getApplicants } = require('../controller/applyController')
const recruiterMiddleware = require('../middelware/recruiterMiddleware')

const applicationRouter = express.Router()

applicationRouter.post('/application/:jobId', authMiddleware, jobseekerMiddleware, applyController)
applicationRouter.get('/getapplicants', authMiddleware, recruiterMiddleware, getApplicants)

module.exports = applicationRouter