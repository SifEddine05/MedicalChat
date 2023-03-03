import {AddChannel} from '../assets/AddChannel'


const TeamChannel = ({children}) => {
    return ( 
    <div className='w-full flex flex-col justify-center items-center'>
        <div className="w-full flex justify-between p-2 px-6  items-center mt-4">
            <h3 className="text-[16px] text-white opacity-75">Channels</h3>
            <button><AddChannel   /></button>
        </div> 
        <div className='text-[10px] text-center w-[90%] flex p-2 px-6 flex-col items-center text-white justify-center mt-2'>
            {children}
        </div>
    </div>
   );
}
 
export default TeamChannel;