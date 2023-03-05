import { useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { ChannelInfo } from "../assets";
import { AiOutlineMenu } from "react-icons/ai";



const HeadChannel = () => {
    const {channel:activeChannel ,client} = useChatContext();
    const { watcher_count } = useChannelStateContext();
    const showList =()=>{
        const channelList = document.getElementsByClassName("str-chat-channel-list" );
        channelList[0].style.display ="block"
    
    }




    const editChannel =async ()=>{
        setErr(false)
        if(!Creating)
        {
            setCreating(true)
            setChannelName(activeChannel.data.name)
            const members1 = await Object.values(activeChannel.state.members).filter(({ user }) => user.id !== client.userID);
            const members = await client.queryUsers( { id: { $ne: client.userID } })
            const mm = members.users.filter((obj1) =>!members1.some((obj2) => obj1.id === obj2.user_id) )
            if(mm.length !== 0)
            {
                setUsers(mm.filter(e=>e.role!=="admin"))
    
            }
            else{
                setErr(true)
                setMSg('No users')
            }
        }
        else{
            setCreating(false)
        }
       
    }

    const submit =async ()=>{
        setErr(false)
        const change=ChannelName !== activeChannel.data.name 
        if(change)
        {
            await activeChannel.update({name :ChannelName} , {text : `Channel name changed to ${ChannelName}` })
            
        }
        if(checkedValues.length !==0)
        {
            await activeChannel.addMembers(checkedValues)
            
        }
        if(!change && checkedValues.length ===0){
            setMSg('Nothing Change')
            setErr(true)
        }
        else{
            setCheckedValues([])
            setCreating(false)
        }
       


    }
    const [users , setUsers]=useState([{}])

    const [checkedValues, setCheckedValues] = useState([]);
    const [ChannelName ,setChannelName]=useState('')
    const [Err , setErr] =useState(false)
    const [Msg ,setMSg]=useState('')
    const [Creating ,setCreating]=useState(false)
    return ( 
    <div className="flex flex-col justify-center w-full border-l">
        <div className="w-full flex justify-between items-center p-2 pb-[14px] border-b bg-[#005FFF]">
            <div className="flex justify-start items-center">
                <button className="w-[40px] menu" onClick={showList}><AiOutlineMenu  style={{ fontSize: '20px', color: 'white' }}/></button>
                <h3 className="text-[18px] font-bold text-white mr-2"># {activeChannel.data.name } </h3>
            <button onClick={editChannel}> <ChannelInfo /> </button>
            </div>
            <h3 className="text-[16px] opacity-75  text-white"> {watcher_count} users online </h3>
        </div> 
        {Creating &&  <div className='flex flex-col justify-center items-start w-full pl-6 border-t border-b pb-2'>
            <div className='flex justify-between items-center w-full px-1'>
                <h3 className='md:text-[16px] sm:text-[14px] text-[11px] font-bold text-left text-white '> Edit Channel</h3>
            </div>
             
            <label htmlFor='channelName'  className='md:text-[14px] sm:text-[14px] text-[11px] font-semibold sm:mt-3 mt-2 '>Change Channel Name</label>
            <input  type="text" id="channelName" max="15" value={ChannelName} onChange={(e)=>{setChannelName(e.target.value)}} name="channelName" placeholder=' emergency' className='w-[80%] border-2 sm:p-2 p-1 lg:text-[16px] md:text-[14px] sm:text-[12px]  text-[10px] rounded-md mt-1 md:mb-4 mb-2'/> 
            <h3 className='md:text-[14px] sm:text-[14px] text-[11px] font-semibold  '> Add Members</h3>

            
            <div className='flex flex-col mt-3 overflow-auto max-h-[250px] w-full'>
                
            {users.map((e)=>{
                   return( 
                   <div className='w-full flex' key={e.id}>
                        <input  type="checkbox" id="selectMembers"   name="selectMembers" value={e.id}   
                        onChange={(event) => {
                            if (event.target.checked) {
                                setCheckedValues([...checkedValues, e.id]);
                                console.log("checked ",e.id);
                            } else {
                                setCheckedValues(checkedValues.filter(id => id !== e.id));
                                console.log("dischecked ",e.id);
                                console.log(checkedValues);

                            }
                        }}
                        checked={checkedValues.includes(e.id)}  className='w-4'/> 
                        <label Htmlfor='selectMembers' className='text-[14px] ml-2 font-normal'>{e.userName}</label>
                   </div> )
                 
            })}
            </div>  
            {Err && <h3 className=' text-center md:text-[16px] sm:text-[14px] text-[11px] font-bold text-red-600'>{Msg}</h3>}

            <button onClick={submit} className='bg-white shadow-lg rounded-lg p-1 self-center text-[#005FFF] hover:bg-[#0088ff] hover:text-white font-semibold md:text-[16px] sm:text-[14px] text-[11px] mt-2'>Edit</button>
            
        </div> }

        {/* <div className="w-[50%] bg-[#005FFF] flex flex-col justify-center items-center mx-auto shadow-lg rounded-lg">
            <h3 className="text-center text-[16px] font-bold text-white">Channel Information</h3>
           <div className="flex justify-center w-[60%] mt-2 ">
                <h3 className="text-[18px] font-semibold ">Name :</h3>
                <h3 className="text-[16px] font-normal ml-4 text-white">{channel.data.name}</h3>
           </div>
           <div className="flex justify-center w-[60%] mt-2 ">
                <h3 className="text-[18px] font-semibold ">Type :</h3>
                <h3 className="text-[16px] font-normal ml-4 text-white">{channel.data.type}</h3>
           </div>
           <div className="flex  flex-col items-center justify-center w-[60%] mt-2 ">
                <h3 className="text-[18px] font-semibold ">Members :</h3>
            <div className="overoverflow-scroll	h-[200px]">
            {members.map((e)=>{
               return( 
               <div className="p-2 rounded-lg bg-slate-200 text-[16px] font-bold flex justify-between">
                   <h3>{e.user.userName}</h3>
 
                </div>)
                })}
            </div>
           
           </div>
            
        </div> */}
    </div>);
}
 
export default HeadChannel;