import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RegisterForm from "./pages/SigninPage";
import LoginPage from "./pages/LoginPage";




function App() {

  return (
    <div>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginPage/>} />
    </Routes>
</div>
  )
}

export default App
