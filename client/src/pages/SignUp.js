
import { useState } from 'react';
import '../App.css'
import { AiFillEye , AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'
import { StreamChat } from 'stream-chat';

//we must change the <a> </a> in the line 41  by link
const SignUp = () => {
    const cookies = new Cookies()


    const [fullName,setFullName]=useState('')
    const [userName ,setUserName]=useState('')
    const [phoneNumber ,setPhoneNumber]=useState('')
    const [avatar ,setAvatar]=useState('')
    const [password ,setPassword]=useState('')
    const [confirmpassword ,setConfirmPassword]=useState('')

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
    setErr(false)
    console.log(fullName,userName,avatar,phoneNumber,password,confirmpassword);
    if(fullName==='' || userName==='' || avatar==='' || phoneNumber==='' || password==='' || confirmpassword===''  )
    {
        setMessage('Please fill all the fields')
        setErr(true)
    }
    else if (password !== confirmpassword){
        setMessage('the password is not confirmed ')
        setErr(true)
    } else {
        fetch('http://localhost:8000/signup' , 
        { method : 'POST' , 
        headers : {"Content-Type" : "application/json" },  //type of data
        body : JSON.stringify({
            fullName :fullName ,
            userName :userName ,
            phoneNumber :phoneNumber ,
            avatar :avatar ,
            password :password 
        }) 
        } )
        .then((res)=> {
                return res.json()
            } )
    
        .then((data)=>{
            if(data.success)
            {
                cookies.set('token',data.user.token)
                cookies.set('userID',data.user.id)
                cookies.set('hasedpassword',data.user.password)
                cookies.set('userName',data.user.userName)
                cookies.set('fullName',data.user.fullName)
                            //navigate to chat page 

            }
            else{
                setMessage(data.message)
                setErr(true)
            }
 

        })
        .catch(err=> {
            setErr(true)
            setMessage("error in signup")
        } )

    }
    
    }


    return ( 
    <div id="signup" className='h-screen w-screen flex flex-col items-center justify-center'>
        <div className=' sm:w-[65%] md:w-[50%] w-[90%]  bg-[#005FFF] lg:p-4 md:p-3 p-2 rounded-lg shadow-xl'>
            <h3 className='lg:text-[24px] md:text-[22px]  sm:text-[20px] text-[18px] font-bold lg:mb-10 md:mb-8 sm:mb-6 mb-4 text-center text-white'> Sign Up</h3>
            <div className='flex flex-col justify-center items-start ml-[10%]'>
                <label htmlFor='fullName'  className=' md:md:text-[16px]  text-[11px] sm:text-[14px] font-semibold'>Full Name</label>
                <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" id="fullName" name="fullName" placeholder='Sellami SifEddine' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1'/>     
                
                <label htmlFor='userName'  className='md:text-[16px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2'>User Name</label>
                <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" id="userName" name="userName" placeholder='Sifou' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1'/>     
                
                <label htmlFor='PhoneNumber'  className='md:text-[16px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2'>Phone Number</label>
                <input value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} type="tel" id="PhoneNumber" name="PhoneNumber" placeholder='0568789845' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1'/>     
               
                <label htmlFor='avatar'  className='md:text-[16px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2'>Avatar Url</label>
                <input value={avatar} onChange={(e)=>{setAvatar(e.target.value)}} type="url" id="avatar" name="avatar" placeholder='https://avatarurl/image.png' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1'/>     
            
                <label htmlFor='password'  className='md:text-[16px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2'>Password</label>
                <div className='w-full relative flex items-center'>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type={typePwd} id="password" name="password" min="6" placeholder='**********' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1'/>     
                   {showPassword && <AiFillEye className='relative right-6 mt-1 hover:cursor-pointer' onClick={showpass}/> }
                    {!showPassword && <AiFillEyeInvisible className='relative right-6 mt-1 hover:cursor-pointer'onClick={showpass} /> }
                </div>
                
                <label htmlFor='confirmpassword'  className='md:text-[16px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2 '>Confirm Password</label>
                <input value={confirmpassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" id="confirmpassword" min="6"  name="confirmpassword" placeholder='**********' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1 md:mb-4 mb-2'/>     
                {Err && <h3 className=' text-center md:text-[16px] sm:text-[14px] text-[11px] font-bold text-red-600'>{Msg}</h3>}
                <div className='w-[80%] flex justify-end'>
                 <button onClick={submit} className='bg-white shadow-lg rounded-lg p-2 text-[#005FFF] hover:bg-[#0088ff] hover:text-white font-semibold md:text-[16px] sm:text-[14px] text-[11px]'>Sign Up</button>
                </div>
                <p className='md:text-[16px] sm:text-[14px] text-[11px]'>Already have an account? <Link to='/login' className='font-medium hover:text-white'>Sign in</Link></p> 
            </div>
        </div>
    </div> );
}
 
export default SignUp;