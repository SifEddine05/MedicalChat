const express  = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const {connect} = require('getstream')


const app = express()

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
dotenv.config()


app.post('/signup',async (req,res)=>{

    try{
    const serverClient = connect(process.API_KEY,process.API_SECRET,process.GET_STREAM_APP_ID)
    const client = StreamChat.getInstance(process.API_KEY , process.API_SECRET)
    const users = await client.queryUsers()
    const exist = myArray.some(obj => obj.userName.toLowerCase() === req.body.userName.toLowerCase());
    if(exist)
    {
        res.status(400).json({success :false  , message : "This user Name exist please select another user Name " })
    }
    else{
        const password = req.body.password 
        const hasedpassword = await bcrypt.hash(password,10)
        const userId = crypto.randomBytes(16).toString('hex');
        const token = serverClient.createUserToken(userId)
        res.status(200).json({success : true , token : token , userId:userId , hasedpassword :hasedpassword ,userName :req.body.userName ,fullName:req.body.fullName , })
    }
   
    }
    catch(err) {
        res.status(400).json({success :false  , message : err })
    }

})


app.get("/login" , async (req,res)=>{

try{
        const serverClient = connect(process.API_KEY,process.API_SECRET,process.GET_STREAM_APP_ID)
        const client = StreamChat.getInstance(process.API_KEY , process.API_SECRET)
        const users = await client.queryUsers({userName:req.body.userName})
        if(users.length===0)
        {
            res.status(400).json({success :false  , message : "This user Name dosn't exist please select a valid user Name " })

        }
        else{
            const confirm = bcrypt.compare(req.body.password , users[0].hasedpassword)
            if (!confirm)
            {
                res.status(400).json({success :false  , message : "Error in the password  " })
            }
            else{
                const token = serverClient.createUserToken(users[0].userId)
                res.status(200).json({success :true , token : token , user :users[0] })
            }
        }
}
catch(err){
    res.status(400).json({success :false ,message :err })
}
})