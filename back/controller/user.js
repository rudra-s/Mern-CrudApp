const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {check,validationResult} = require('express-validator')
const router = express.Router()


router.get("/",async(req,res)=>{
    const user = await User.find({}).select('-password')
    res.json(user)
})

router.get("/:_id",async(req,res)=>{
    const user = await User.findById(req.params._id).select('-password -_id -time -__v')
    res.json(user)
})

router.post('/',[
    check("name").isString().isLength({min:3,max:50}),
    check("email").isEmail().isLowercase().isLength({min:11,max:100}),
    check("phone").isMobilePhone().isLength({min:10,max:10}),
    check("password").isAlphanumeric().isLength({min:4,max:30}),
    check("work").isString().isString().isLength({min:3,max:30})
], async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.status(400).json(error)
    } else{
        try {
            const user = new User({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                work:req.body.work
            })
            const salt = await bcrypt.genSalt(12)
            user.password = await bcrypt.hash(user.password , salt)
            const result = await user.save()
            res.status(201).json(result)
        } catch (error) {
            res.status(422).json(error)
        }
    }
       
})

router.put('/:_id',[
    check("name").isString().isLength({min:3,max:50}),
    check("email").isEmail().isLowercase().isLength({min:11,max:100}),
    check("phone").isMobilePhone().isLength({min:10,max:10}),
    //check("password").isAlphanumeric().isLength({min:4,max:30}),
    check("work").isString().isString().isLength({min:3,max:30})
], async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.status(400).json(error)
    } else{
        try {
            const user = await User.findByIdAndUpdate(req.params._id,{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                //password:req.body.password,
                work:req.body.work
            },{new:true})
            const salt = await bcrypt.genSalt(12)
            user.password = await bcrypt.hash(user.password , salt)
            const result = await user.save()
           
            res.status(201).json(result)
        } catch (error) {
            res.status(422).json(error)
        }
    }
       
})

router.delete("/:_id",async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params._id)
    if(user){
        res.status(200).json("deleted")
    } else{
        res.json("not found")
    }
})
module.exports=router