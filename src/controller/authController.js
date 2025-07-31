const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const register = async (req,res) => {
    const {username , password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({username});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exits"
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password,10)
    })

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET
     )
     res.cookie('token',token);

    return res.status(201).json({
        message: "User registerd sucessfully"
    })
}

const login = async (req,res) => {
    const {username , password} = req.body;

    const user = await userModel.findOne({username});

    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    
     if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Password"
        })
     }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET
     )
     res.cookie('token',token);

    return res.status(200).json({
        message: "User login sucessfully",
        user:{
            username: user.username,
            id: user._id
        }
    })
}

module.exports = {
    register,
    login
}

