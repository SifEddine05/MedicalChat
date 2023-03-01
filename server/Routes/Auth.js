const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const {signup , login} =require('../Controllers/authController')



router.post('/signup',signup)
router.post('/login',login)





module.exports =router 

