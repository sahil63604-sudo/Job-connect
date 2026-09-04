const express=require('express')
const recruiterRouter=express.Router();

const RecruiterController = require('../controller/recruiterController');

recruiterRouter.post('/CreateJob',RecruiterController)

module.exports=recruiterRouter