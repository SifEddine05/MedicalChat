const TeamChannelPreview = ({channel}) => {
    return ( 
    <div className="w-full px-4">
        <h3 className="text-white text-[16px] "> #{channel.data.name } </h3>
    </div> );
}
 
export default TeamChannelPreview;