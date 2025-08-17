import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Car from '../models/Car.js'

//generate jwt token
const generateToken = (userId)=> {
    const payload = {id: userId}
    return jwt.sign(payload, process.env.JWT_SECRET)
}


export const register = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password || password.length < 8) {
            return res.json({success:false, message: 'Fill all the fields correctly'})
        }

        const userExist = await User.findOne({email})
        if (userExist) {
            return res.json({success:false, message:'User already existed'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password:hashedPassword})
        const token = generateToken(user._id.toString())
        res.json({success:true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}


export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            res.json({success:false, message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.json({success:false, message:"Invalid Credential"})
        }
        const token = generateToken(user._id.toString())
        res.json({success:true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//get user data using jwt token
export const getUserData = async(req,res) => {
    try {
        const {user} = req;
        res.json({success:true, user})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//get all Cars for the frontend
export const getCars = async(req,res) => {
    try {
    const cars = await Car.find({isAvailable: true})
    res.json({success:true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}