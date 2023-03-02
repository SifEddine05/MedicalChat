const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const {signup , login, logout} =require('../Controllers/authController')


router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)





module.exports =router 

