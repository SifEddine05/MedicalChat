import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import{BrowserRouter ,Route ,Routes } from 'react-router-dom'
import ChatAPP from "./pages/Chat";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/home' element={<ChatAPP />} />
      <Route path='/' element={<Landing />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
