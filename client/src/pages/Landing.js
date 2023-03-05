import logo from '../assets/hospital.png'
import bg from '../assets/chat.jpg'
import { Link } from 'react-router-dom';
const Landing = () => {
    return ( 
    <div className="h-screen overflow-hidden bg-blue-100">
        <div className="flex w-full justify-center items-center p-4">
           <img src={logo} alt='logo' className='w-[40px]'/> 
           <h3 className='text-[24px] font-black ml-5'>Medical Chat </h3>
        </div>
        <div className='w-[90%] mx-auto flex flex-col md:flex-row justify-around items-center '>
            <div className='md:w-[45%] w-full'>
                <h3 className='text-[24px] font-bold '>Medical Chat </h3>
                <p className='text-[16px] md:leading-8 '><span className='font-bold'>Welcome to our medical chat service! </span><br/>Our mission is to make healthcare more accessible and convenient for everyone. We understand that it can be difficult to find the time to visit a doctor's office or hospital, especially when you have a busy schedule. That's why we created this web application – to provide a medical chat service that you can use from the comfort of your own home, at a time that works for you.</p>
                <div className='my-4 flex md:justify-center justify-end'>
                    <Link to='/home' className=' shadow-lg rounded-lg p-2 text-white  hover:bg-[#0088ff] bg-[#005FFF] hover:text-white  md:text-[16px] sm:text-[14px] text-[11px] font-bold'>GET STARTED</Link>
                </div>
                
            </div>
            <div className='md:w-[45%] w-full md:rounded-full '> 
                <img src={bg} alt='chat' className='md:rounded-full '/>
            </div>
        </div>
    </div> );
}
 
export default Landing;