const express=require('express')
const router=express.Router();

const {registerUser,login}=require('../controller/authoController');
const authMiddleware = require('../middelware/authMiddleware');
// const testApplication=require('../controller/applications');
const recruiterMiddleware = require('../middelware/recruiterMiddleware');
const RecruiterController = require('../controller/recruiterController');

router.post("/register", registerUser);
router.post("/login",login)
router.post('/applications',authMiddleware,recruiterMiddleware,RecruiterController)

module.exports=router