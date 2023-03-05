import { useState } from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import {AddChannel} from '../assets/AddChannel'
import { CloseCreateChannel } from '../assets';
import Cookies from 'universal-cookie';
import hospital from '../assets/hospital.png'
import logout1 from '../assets/logout.png'
import { useNavigate } from 'react-router-dom';
const AllMessages = ({children}) => {
    const navigate =useNavigate()
    const logout =()=>{
        setErr(false)
        fetch('http://localhost:8000/logout')
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            if(data.success===true)
            {
                cookies.remove('token')
                cookies.remove('userID')
                cookies.remove('hasedpassword')
                cookies.remove('userName')
                cookies.remove('fullName')
                navigate('/login')
            }
        })
        .catch(err=>{
            
        })
    }
    const { client, setActiveChannel } = useChatContext();
    const [users , setUsers]=useState([{}])
    const addChannel =async ()=>{
        setCreating(true)
        setErr(false)
        const members = await client.queryUsers( { id: { $ne: client.userID } })
        if(members.users.length !== 0)
        {
            setUsers(members.users.filter(e=>e.role!=="admin"))

        }
        else{
            setErr(true)
            setMSg('No users')
        }
    }
    const [checkedValues, setCheckedValues] = useState([]);
    const [ChannelName ,setChannelName]=useState('')
    const [ChannelType ,setChannelType] =useState('')
    const [Err , setErr] =useState(false)
    const [Msg ,setMSg]=useState('')
    const [Creating ,setCreating]=useState(false)
    const cookies = new Cookies()
    const submit =async ()=>{

        console.log(checkedValues,ChannelName,ChannelType,type);
        setErr(false)
        if((checkedValues.length===0 && selectedOption.length===0) ||ChannelName==='' || ChannelType==='')
        {
            setMSg('Please Fill all the fields')
            setErr(true)
        }
        else {
            if(type)
            {   
            checkedValues.push(cookies.get('userID'))
            console.log(checkedValues);
            const newChannel = await client.channel(ChannelType,ChannelName ,{
                name:ChannelName , members : checkedValues
            })
            await  newChannel.watch
            setActiveChannel(newChannel)
            setCreating(false)

            }
            else{
                const newChannel = await client.channel('messaging',ChannelName ,{
                    name:ChannelName , members : [selectedOption ,cookies.get('userID')]
                })
                await  newChannel.watch
                setActiveChannel(newChannel)
                setCreating(false)
            }
            
        }
    }
    const Cancel =()=>{
        setCreating(false)
    }
    const [type,setType] =useState(true)

    const showList =()=>{
        const channelList = document.getElementsByClassName("str-chat-channel-list" );
        channelList[0].style.display ="none"
    }

    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };
    return ( 
    <div className='w-full flex flex-col justify-center items-center bg-[#005FFF] bg-opacity-75'>
        <div className="w-full flex justify-between p-2 px-6  items-center mt-4 max-h-[50px]">
            <h3 className="text-[16px] text-white opacity-75">All Messages</h3>
            <button onClick={addChannel}><AddChannel   /></button>
        </div> 
       {Creating &&  <div className='flex flex-col justify-center items-start w-full pl-6 border-t border-b pb-2 max-h-[250px] overflow-auto'>
            <div className='flex justify-between items-center w-full px-1'>
                <h3 className='md:text-[16px] sm:text-[14px] text-[11px] font-bold text-left text-white '> Add Channel</h3>
                <button className='' onClick={Cancel}>
                  <CloseCreateChannel  />
                </button>
            </div>
             
            <label htmlFor='channelName'  className='md:text-[14px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2 '>Channel Name</label>
            <input  type="text" id="channelName" max="15" value={ChannelName} onChange={(e)=>{setChannelName(e.target.value)}} name="channelName" placeholder=' emergency' className='w-[80%] sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1 md:mb-4 mb-2'/> 
            <h3 className='md:text-[14px] sm:text-[14px] text-[11px] font-semibold  '> Select Members</h3>

            
            <div className='flex flex-col mt-3 overflow-auto max-h-[250px] w-full'>
                
            {users.map((e)=>{
                   return(
                     
                  <div className='w-full flex' key={e.id}>
                       {type && <input  type="checkbox" id="selectMembers"   name="selectMembers" value={e.id}   
                        onChange={(event) => {
                            if (event.target.checked) {
                                setCheckedValues([...checkedValues, e.id]);
                            } else {
                                setCheckedValues(checkedValues.filter(id => id !== e.id));
                            }
                        }}
                        checked={checkedValues.includes(e.id)}  className='w-4'/> }
                        {!type &&  <input  type="radio" id="selectMembers"   name="selectMembers" value={e.id}   
                        checked={selectedOption === e.id}
                        onChange={handleOptionChange}
                        className='w-4'/> 

                        }
                        <label Htmlfor='selectMembers' className='text-[14px] ml-2 font-normal'>{e.userName}</label> 
                   </div> )
                 
            })}
            <label htmlFor='Type'  className='md:text-[14px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2 '>Channel Type</label>
            <select name='Type' id='Type' className='rounded-lg w-[90%] p-2' value={ChannelType} onChange={(e)=>{setChannelType(e.target.value) ; 
                if(e.target.value==="team")setType(true)
                else setType(false)

                }}>
                <option value="team">Channel</option>
                <option value="messaging">Direct Message</option>
            </select>
            </div>  
            {Err && <h3 className=' text-center md:text-[16px] sm:text-[14px] text-[11px] font-bold text-red-600'>{Msg}</h3>}

            <button onClick={submit} className='bg-white shadow-lg rounded-lg p-1 self-center text-[#005FFF] hover:bg-[#0088ff] hover:text-white font-semibold md:text-[16px] sm:text-[14px] text-[11px] mt-2'>Create</button>
            
        </div> }
        <div className='text-[10px] text-center w-[90%] flex p-2 px-4 flex-col items-center text-white justify-center max-h-[300px]  overflow-auto'>
            {children}
        </div>
        <div className="  bg-opacity-75 w-[100%]  pt-2  pl-1 mx-auto flex flex-justify-center items-center flex-col mb-4"> 
            <button  onClick ={showList} className='flex justify-center items-center mb-10'>
                <CloseCreateChannel />
                <h3 className='text-white font-bold ml-2'>Cancel</h3>
            </button>
            <div className='w-full  flex justify-center items-center  '>
                <button onClick={logout} ><img src={logout1} alt="" className='  w-[30px] rounded-xl bg-white p-1 hover:bg-red-500' /></button>
                <h3 className='text-white font-bold ml-2'>Logout</h3>
            </div>
           
        </div>
    </div>
   );
}
 
export default AllMessages;