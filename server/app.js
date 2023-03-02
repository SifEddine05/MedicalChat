const express  = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const {connect} = require('getstream')

const AuthRouters = require('./Routes/Auth')

const app = express()

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
dotenv.config()



app.use(AuthRouters)


app.listen( 8000,()=> console.log("Connected") )