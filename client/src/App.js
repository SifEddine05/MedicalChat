import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import{BrowserRouter ,Navigate,Route ,Routes } from 'react-router-dom'
import ChatAPP from "./pages/Chat";
import Landing from "./pages/Landing";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/home' element={<RequireAuth><ChatAPP /></RequireAuth> } />
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<Navigate to='/'/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
