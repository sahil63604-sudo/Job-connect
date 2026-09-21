const express=require('express');
const AdminRouter=express.Router();
const AdminMiddleware = require('../middelware/adminMiddleware');
const authMiddleware = require('../middelware/authMiddleware');
const { getAllUsers } = require('../controller/adminController');
AdminRouter.get(
    "/users",
    authMiddleware,
    AdminMiddleware,
    getAllUsers
);
module.exports=AdminRouter