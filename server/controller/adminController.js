const UserSchema = require('../models/userSchema')

async function getAllUsers(req, res) {
    let users = await UserSchema.find().select("name email roles createdAt")
    res.json({
        users
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await UserSchema.findById(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if (user.roles === "admin") {
            return res.status(403).json({
                message: "Admin account cannot be deleted"
            })
        }
        const deletedUser = await UserSchema.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        res.status(200).json({
            message: 'user deleted successfully'
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'server error'
        })
    }
}
module.exports = { getAllUsers, deleteUser }