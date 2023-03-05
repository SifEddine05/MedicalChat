import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAuth = ({children}) => {
    const cookies = new Cookies()
    console.log(!cookies.get('token'));
    if(!cookies.get('token'))
    {
       return( <Navigate to='/login'/>)
    }
    return ( children );
}
 
export default RequireAuth;