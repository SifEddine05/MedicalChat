import { ChannelHeader, Chat, MessageInput, MessageList, Thread, useChannelActionContext, Window } from 'stream-chat-react';
import SideBar from '../components/SideBar';
import { StreamChat } from 'stream-chat';
import { Channel } from 'stream-chat-react';
import Cookies from 'universal-cookie'
import 'stream-chat-react/dist/css/index.css';
import HeadChannel from '../components/HeadChannel';

const EmptyState = () => (
    <div className="flex-col flex justify-center items-center mt-[300px]">
        <p className="text-[16px] text-[#005FFF] font-semibold">This is the beginning of your chat history.</p>
        <p className="text-[16px] text-[#005FFF] font-semibold">Send messages, attachments, links, emojis, and more!</p>
    </div>
)

const ChatAPP = () => {
    const cookies = new Cookies()

    /***To connect the user  */
    const client = StreamChat.getInstance("9m7fqeq4sq8h");
    client.connectUser({id:cookies.get('userID') } ,cookies.get('token'))        
        
    
    const { sendMessage } = useChannelActionContext();

    const submitt= async (message)=>{
        await sendMessage(message)

    }
    return ( 
    <div>
        <Chat client={client} theme="team light">
            <div className='flex '>
                <SideBar />
                <div className='w-[75%]  '>
                    <Channel 
                    EmptyStateIndicator={EmptyState}
                    >
                     <Window>
                        {/* <HeadChannel /> */}
                    <ChannelHeader>
                        <ChannelHeader.Right>
                            <button className="menu-button" onClick={() => client.channelList.toggleMobile()}>
                            </button>
                        </ChannelHeader.Right>
                    </ChannelHeader>
                        <MessageList  />
                        <MessageInput onSendMessage={submitt} />
                    </Window>
                    <Thread /> 
                    </Channel>
                </div>
            </div>
        </Chat>
    </div>
    );
}
 
export default ChatAPP;