const express = require('express')
const router = express.Router()
const {userSignupValidator} = require("../validator")

const {signUp,signin,signout} = require('../controllers/userController')

router.post('/signup', userSignupValidator ,signUp)
router.post('/signin' ,signin)
router.get('/signout' ,signout)



module.exports = router 