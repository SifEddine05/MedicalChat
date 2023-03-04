import { useState } from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import {AddChannel} from '../assets/AddChannel'
import { CloseCreateChannel } from '../assets';
import Cookies from 'universal-cookie';

const TeamChannel = ({children}) => {

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
    const [Err , setErr] =useState(false)
    const [Msg ,setMSg]=useState('')
    const [Creating ,setCreating]=useState(false)
    const cookies = new Cookies()
    const submit =async ()=>{
        setErr(false)
        if(checkedValues.length===0 ||ChannelName==='' )
        {
            setMSg('Please Fill all the fields')
            setErr(true)
        }
        else {
            checkedValues.push(cookies.get('userID'))
            console.log(checkedValues);
            const newChannel = await client.channel('team',ChannelName ,{
                name:ChannelName , members : checkedValues
            })
            await  newChannel.watch
            setActiveChannel(newChannel)
            setCreating(false)
        }
    }
    const Cancel =()=>{
        setCreating(false)
    }
    return ( 
    <div className='w-full flex flex-col justify-center items-center bg-[#005FFF]'>
        <div className="w-full flex justify-between p-2 px-6  items-center mt-4">
            <h3 className="text-[16px] text-white opacity-75">Channels</h3>
            <button onClick={addChannel}><AddChannel   /></button>
        </div> 
       {Creating &&  <div className='flex flex-col justify-center items-start w-full pl-6 border-t border-b pb-2'>
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
                        <input  type="checkbox" id="selectMembers"   name="selectMembers" value={e.id}   
                        onChange={(event) => {
                            if (event.target.checked) {
                                setCheckedValues([...checkedValues, e.id]);
                            } else {
                                setCheckedValues(checkedValues.filter(id => id !== e.id));
                            }
                        }}
                        checked={checkedValues.includes(e.id)}  className='w-4'/> 
                        <label Htmlfor='selectMembers' className='text-[14px] ml-2 font-normal'>{e.userName}</label>
                   </div> )
                 
            })}
            </div>  
            {Err && <h3 className=' text-center md:text-[16px] sm:text-[14px] text-[11px] font-bold text-red-600'>{Msg}</h3>}

            <button onClick={submit} className='bg-white shadow-lg rounded-lg p-1 self-center text-[#005FFF] hover:bg-[#0088ff] hover:text-white font-semibold md:text-[16px] sm:text-[14px] text-[11px] mt-2'>Create</button>
            
        </div> }
        <div className='  text-[10px] text-center w-[90%] flex p-2 px-4 flex-col items-center text-white justify-center '>
            {children}
        </div>
    </div>
   );
}
 
export default TeamChannel;