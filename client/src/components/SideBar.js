import hospital from '../assets/hospital.png'
import logout from '../assets/logout.png'
import { ChannelList, useChatContext } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import TeamChannel from './TeamChannel';
import TeamChannelPreview from './TeamChannelPreview';


const SideBar = () => {
    const client = StreamChat.getInstance("9m7fqeq4sq8h");

    const filters = { members: { $in: [client.userID] } };
    const teamChannel=(channels) => {
        return channels.filter((channel) => channel.type === 'team');
    }
    
    return ( 
    <div className="w-[25%]  flex justify-start">
        <div className=" bg-[#0022ff] w-[20%] pt-2 h-screen ">
            <img src={hospital} alt="" className='mx-auto w-[30px] rounded-xl bg-white p-1' />
            
            <div className='mx-auto w-full flex justify-center'>
                <button><img src={logout} alt="" className='  w-[30px] rounded-xl bg-white p-1 mt-3 hover:bg-red-500' /></button>
            </div>
        </div>
        <div className='w-[80%] bg-[#005FFF] shadow-lg '>
            <h2 className='lg:text-[22px] text-[18px] font-bold text-white text-center w-full mt-2 border-b pb-2'>Medical Chat</h2>
            <ChannelList 
                filters={filters}
                channelRenderFilterFn={teamChannel}
                List={(listProps)=>( <TeamChannel {...listProps} type="team" /> )}
                Preview={(previewProps) => (<TeamChannelPreview {...previewProps} type="team" /> )}
            />
        </div>
    </div> );
}
 
export default SideBar;