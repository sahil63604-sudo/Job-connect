const jwt = require('jsonwebtoken')
const UserSchema = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        console.log(name, email, password);

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "all feilds are required"
            })
        }

        const alreadyexist = await UserSchema.findOne({ email })

        if (alreadyexist) {
            return res.status(409).json({
                message: "this user already exists"
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const user = await UserSchema.create({
            name,
            email,
            password: hashedpassword,
            roles:req.body.roles
        })

        res.status(201).json({
            message: 'user created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                roles: user.roles
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "server error"
        })
    }

};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'email and password are required'
            })
        }
        const userExist = await UserSchema.findOne({ email });
        if (!userExist) {
            return res.status(401).json({
                message: 'user does not exist'
            })
        }
        const verify = await bcrypt.compare(password, userExist.password)
        if (!verify) {
            return res.status(401).json({
                message: "incorrect details"
            })
        }
        const token = jwt.sign(
            { 
                id: userExist._id, 
                roles: userExist.roles
             },
            process.env.SECRET_KEY,
            { expiresIn: '10m' }
        )
        res.json({
            message: 'login successfull',
            token
        })
    } catch (error) {
        res.json({
            message: "server error",
            
        })
        console.error(error)
    }
}
module.exports = { registerUser, login }