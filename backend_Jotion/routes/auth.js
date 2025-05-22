import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcrypt"
const router = express.Router()

router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400).json({message:"Please enter the Email and password"})
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"Email does not exist"})

        }
        const validateUser = await bcrypt.compare(password,user.password)
        if(!validateUser){
            res.status(400).json({message:"Password Doesn't match"})
        }

        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{
            expiresIn:'24h'
        })
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({message:'Server error'})
        
    }
})

router.post("/register",async(req,res)=>{
    
    try{
        const {name,email,password} = req.body;
        const isAlreadyUser = User.findOne(email)
        if(!name || !email || !password){
            res.status(400).send("Fill the necessary Details")
        }else{
            if(!isAlreadyUser){
                res.status(400).send("User Already Exist")
            }
            else{
                const newUser = new User({
                    name:name,email:email
                })
                bcrypt.hash(password,10,(err,hashedpassword)=>{
                    newUser.set('password',hashedpassword)
                    newUser.save()
                })
                return res.status(200).send("User saved successfully")
                
    
            }
        }

    }
    catch(err){
        res.status(500).send(`Error while registering:${err}`)

    }
})

export default router;
