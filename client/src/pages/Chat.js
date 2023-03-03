import { Chat } from 'stream-chat-react';
import SideBar from '../components/SideBar';
import { StreamChat } from 'stream-chat';



const ChatAPP = () => {
    const client = StreamChat.getInstance("9m7fqeq4sq8h");

    return ( 
    <div>
        <Chat client={client} theme="team light">
         <SideBar />
        </Chat>
    </div>
    );
}
 
export default ChatAPP;