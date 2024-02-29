import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, SendMoney, Signin, Signup } from "./components/pages";
import { useRecoilState } from "recoil"; 
import { AlertAtom } from './store/atoms/atoms';

function App() {
  const [alert] = useRecoilState(AlertAtom);
  
  return (
      <>
        { alert }
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/send" element={<SendMoney />}/>
          </Routes>
        </BrowserRouter>
      </> 
  )
}

export default App
