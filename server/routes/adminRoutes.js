const express = require('express');
const AdminRouter = express.Router();
const AdminMiddleware = require('../middelware/adminMiddleware');
const authMiddleware = require('../middelware/authMiddleware');
const { getAllUsers, deleteUser,getAllJobs, admindeleteJob } = require('../controller/adminController');

AdminRouter.get("/users", authMiddleware, AdminMiddleware, getAllUsers);
AdminRouter.delete('/users/:id', authMiddleware, AdminMiddleware, deleteUser)
AdminRouter.get("/jobs",authMiddleware,AdminMiddleware,getAllJobs)
AdminRouter.delete("/jobs/:jobId",authMiddleware,AdminMiddleware,admindeleteJob)
module.exports = AdminRouter