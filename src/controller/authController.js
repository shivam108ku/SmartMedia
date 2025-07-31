const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const register = async () => {
    const {username , password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({username});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exits"
        })
    }

    const user = await userModel.create({
        username,
        password
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

module.exports = {
    register
}

