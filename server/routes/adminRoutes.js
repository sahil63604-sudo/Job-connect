const express=require('express');
const AdminRouter=express.Router();
const AdminMiddleware = require('../middelware/adminMiddleware');
const authMiddleware = require('../middelware/authMiddleware');
const { getAllUsers, deleteUser } = require('../controller/adminController');
AdminRouter.get(
    "/users",
    authMiddleware,
    AdminMiddleware,
    getAllUsers
);
AdminRouter.delete('/users/:id',authMiddleware,AdminMiddleware,deleteUser)
module.exports=AdminRouter