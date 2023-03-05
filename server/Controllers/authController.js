
const dotenv = require('dotenv')
dotenv.config()

const crypto = require('crypto')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat').StreamChat
const {connect} = require('getstream')



module.exports.signup = async (req,res)=>{

    try{
    const serverClient = connect(process.env.API_KEY,process.env.API_SECRET,process.env.GET_STREAM_APP_ID)
    const client = StreamChat.getInstance(process.env.API_KEY , process.env.API_SECRET)
    const users = await client.queryUsers({})


    const exist = users.users.some(obj => obj.userName === req.body.userName );

  if(exist)
    {
        res.status(200).json({success :false  , message : "This user Name exist please select another user Name " })
    }
    else{
        const password = req.body.password 
        const hasedpassword = await bcrypt.hash(password,10)
        const userId = crypto.randomBytes(16).toString('hex');
        const token = serverClient.createUserToken(userId)
        const user = {
                userName : req.body.userName ,
                fullName :req.body.fullName ,
                password : hasedpassword ,
                avatar : req.body.avatar,
                phoneNumber : req.body.phoneNumber ,
                id:userId ,
                token : token 
            
        }
        const user1 = await client.connectUser(user,token)
        res.status(200).json({success : true , user})
    }
    }
    catch(err) {
        res.status(400).json({error : err.message })
    }

}



module.exports.login = async (req,res)=>{

    try{
            const serverClient = connect(process.env.API_KEY,process.env.API_SECRET,process.env.GET_STREAM_APP_ID)
            const client = StreamChat.getInstance(process.env.API_KEY , process.env.API_SECRET)
            const users = await (await client.queryUsers({userName:req.body.userName})).users
            console.log("ss");
            if(users.length===0)
            {
                res.status(200).json({success :false  , message : "This user Name dosn't exist please select a valid user Name " })
    
            }
            else{
                const confirm = await bcrypt.compare(req.body.password , users[0].password)
                if (!confirm)
                {
                    res.status(200).json({success :false  , message : "Error in the password  " })
                }
                else{
                    const token = serverClient.createUserToken(users[0].id)
                    const user1 = await client.connectUser({userName : users[0].userName  , id:users[0].id },token)
                    res.status(200).json({success :true , token : token , user:users[0] })
                }
            }
    }
    catch(err){
        res.status(400).json({success :false ,message :err })
    }
 }



 module.exports.logout =async (req,res)=>{
    try{
        const client = StreamChat.getInstance(process.env.API_KEY , process.env.API_SECRET)
        const user1 = await client.disconnectUser()
        res.status(200).json({success :true })
    }
    catch(err)
    {
        res.status(400).json({success :false ,error : err })
    }
   


 }


 