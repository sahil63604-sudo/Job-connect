let UserSchema=require('../models/userSchema')
async function getAllUsers(req,res) {
    let users= await UserSchema.find().select("name email roles createdAt")
    res.json({
        users
    })
}
module.exports={getAllUsers}