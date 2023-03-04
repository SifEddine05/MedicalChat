const TeamChannelPreview = ({channel}) => {
    return ( 
    <div className="w-full hover:bg-slate-400 hover:cursor-pointer p-1 rounded-md flex flex-col justify-start items-start bg-[#005FFF] ">
        <h3 className="text-white md:text-[16px]  text-left"> # {channel.data.name } </h3>
    </div> );
}
 
export default TeamChannelPreview;