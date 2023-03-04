import hospital from '../assets/hospital.png'
import logout1 from '../assets/logout.png'
import { ChannelList, useChatContext } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import TeamChannel from './TeamChannel';
import TeamChannelPreview from './TeamChannelPreview';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useState } from 'react';


const SideBar = () => {
    const client = StreamChat.getInstance("9m7fqeq4sq8h");
    const navigate = useNavigate()
    const cookies = new Cookies()

    const [Err , setErr] = useState(true)
    const [Msg ,setMsg]=useState('')

    const filters = { members: { $in: [client.userID] } };
    const teamChannel=(channels) => {
        return channels.filter((channel) => channel.type === 'team');
    }

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
            setErr(true)
            setMsg(err)
        })
    }
    
    return ( 
    <div className="w-[25%]  flex justify-start bg-">
        <div className=" bg-[#0022ff] w-[20%] pt-2 h-screen ">
            <img src={hospital} alt="" className='mx-auto w-[30px] rounded-xl bg-white p-1' />
            
            <div className='mx-auto w-full flex justify-center'>
                <button onClick={logout} ><img src={logout1} alt="" className='  w-[30px] rounded-xl bg-white p-1 mt-3 hover:bg-red-500' /></button>
            </div>
        </div>
       
        <div className='w-[80%] bg-[#005FFF] shadow-lg '>
            
            <h2 className='lg:text-[22px] text-[18px] font-bold text-white text-center w-full mt-2 border-b pb-2'>Medical Chat</h2>
            <div className='channel-list__list__wrapper'>
            <ChannelList 
                    filters={filters}
                    style={{ height: '500px' }}
                    channelRenderFilterFn={teamChannel}
                    List={(listProps)=>( <TeamChannel {...listProps} type="team" /> )}
                    Preview={(previewProps) => (<TeamChannelPreview {...previewProps} type="team" /> )}
                />   
            </div>
            {Err && <h3 className=' text-center md:text-[16px] sm:text-[14px] text-[11px] font-bold text-red-600'>{Msg}</h3>}
        </div>

    </div> );
}

//                    List={(listProps)=>( <TeamChannel {...listProps} type="team" /> )}

 
export default SideBar;