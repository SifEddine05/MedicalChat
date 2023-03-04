import { useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { ChannelInfo } from "../assets";




const HeadChannel = () => {
    const {channel:activeChannel   } = useChatContext();
    const { watcher_count } = useChannelStateContext();
   
   // const members = Object.values(channel.state.members)//.filter(({ user }) => user.id !== client.userID)

    return ( 
    <div className="flex flex-col justify-center">
        <div className="w-full flex justify-between items-center p-2 pb-[14px] border-b bg-[#e7e1e1]">
            <div className="flex justify-start items-center">
                <h3 className="text-[18px] font-bold text-[#005FFF] mr-2"># {activeChannel.data.name } </h3>
            <button> <ChannelInfo /> </button>
            </div>
            <h3 className="text-[16px] opacity-75  text-[#005FFF]"> {watcher_count} users online </h3>
        </div> 
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