const User = require("../models/user")
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const {errorHandler} = require('../helpers/dbErorHanlders')

exports.signUp = (req,res) => {
    console.log(req.body)
    const user = new User(req.body)
    
    user.save((err, user)=>{
        if(err){
            return res.status(400).json({err: errorHandler(err)})
        }
        user.salt = undefined,
        user.hashed_password=undefined
        res.json({
            user
        })
    })
}

exports.signin = (req,res)=> {
    const {email,password} = req.body
    User.findOne({email}, (err, user) => {
        if(err||!user){
            return res.status(400).json({error:"User with that email does not exists"})
        }

        //si el usuario esta crear method de auth en el model de usuario
        if(!user.authenticate(password)){
            return res.status(401).json({error: "Email and password dont match"})
        }
        //generar signed token with userid and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //persistir cookie
        res.cookie("t", token, {expire: new Date() + 999999})
        //mandar la res al front
        const {_id, name, email, role} = user
        return res.json({_id, email, name, role})


    })
}

exports.signout = (req,res) => {
    res.clearCookie('t')
    res.json({message: "Loggedout"})
}