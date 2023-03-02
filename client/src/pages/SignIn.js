
import { useState } from 'react';
import '../App.css'
import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { StreamChat } from 'stream-chat';


//we must change the <a> </a> in the line 41  by link
const SignIn = () => {
    const client = StreamChat.getInstance("9m7fqeq4sq8h")

    const [userName ,setUserName]=useState('')
    const [password ,setPassword]=useState('')

    const [showPassword ,setShowPassword]=useState(false)
    const [Err , setErr]=useState(false)
    const [Msg , setMessage]=useState('Please fill all the fields')
    const [typePwd,setTypePwd]=useState('password')


    const showpass = ()=>{

        

        setShowPassword(!showPassword)

        if(showPassword) {
            setTypePwd('password')
        }
        else{
            setTypePwd('text')
        }
    }
    const submit =()=>{
    const cookies = new Cookies()
    setErr(false)
    if( userName==='' ||  password===''  )
    {
        setMessage('Please fill all the fields')
        setErr(true)
    }
     else {

        fetch('http://localhost:8000/login' , 
        { method : 'POST' , 
        headers : {"Content-Type" : "application/json" },  //type of data
        body : JSON.stringify({
            userName :userName ,
            password :password 
        }) 
        } )
        .then((res)=> {
           
                return res.json()
         })
    
        .then((data)=>{
            if(data.success)
            {
                console.log(data);
                cookies.set('token',data.token)
                cookies.set('userID',data.user.id)
                cookies.set('hasedpassword',data.user.password)
                cookies.set('userName',data.user.userName)
                cookies.set('fullName',data.user.fullName)

                // navigate to home 
            }
            else{
                setErr(true)
                setMessage(data.message)
            }
            
        })
        .catch(err=> {
            setErr(true)
            setMessage("error in loged in")
        } )

    }
    
    }


    return ( 
    <div id="signup" className='h-screen w-screen flex flex-col items-center justify-center'>
        <div className=' sm:w-[65%] md:w-[50%] w-[90%]  bg-[#005FFF] lg:p-4 md:p-3 p-2 rounded-lg shadow-xl '>
            <h3 className='lg:text-[24px] md:text-[22px]  sm:text-[20px] text-[18px] font-bold lg:mb-10 md:lg:mb-8 md:mb-6 sm:mb-4 mb-2 sm:mb-6 mb-4 text-center text-white mt-8'> Login </h3>
            <div className='flex flex-col justify-center items-start ml-[10%]'>
               
                
                <label htmlFor='userName'  className='md:text-[16px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2'>User Name</label>
                <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" id="userName" name="userName" placeholder='Sifou' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1'/>     
                
               
                <label htmlFor='password'  className='md:text-[16px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2'>Password</label>
                <div className='w-full relative flex items-center md:mb-4 mb-2'>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type={typePwd} id="password" name="password" min="6" placeholder='**********' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1'/>     
                   {showPassword && <AiFillEye className='relative right-6 mt-1 hover:cursor-pointer' onClick={showpass}/> }
                    {!showPassword && <AiFillEyeInvisible className='relative right-6 mt-1 hover:cursor-pointer'onClick={showpass} /> }
                </div>
                
                {Err && <h3 className=' text-center md:text-[16px] sm:text-[14px] text-[11px] font-bold text-red-600'>{Msg}</h3>}
                <div className='w-[80%] flex justify-end'>
                 <button onClick={submit} className='bg-white shadow-lg rounded-lg p-2 text-[#005FFF] hover:bg-[#0088ff] hover:text-white font-semibold md:text-[16px] sm:text-[14px] text-[11px]'>Login</button>
                </div>
                <p className='md:text-[16px] sm:text-[14px] text-[11px] lg:mb-8 md:mb-6 sm:mb-4 mb-2 '>Don't have an account? <Link to='/signup ' className='font-medium hover:text-white'>Sign up</Link></p> 
            </div>
        </div>
    </div> );
}
 
export default SignIn;