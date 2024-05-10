import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RegisterForm from "./pages/SigninPage";
import LoginPage from "./pages/LoginPage";
import TeacherDashBoard from "./pages/teachersPages/TeacherDashBoard"
import StudentDashBoard from "./pages/studentPages/studentDashBoard";




function App() {

  return (
    <div>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/teacherdashboard" element={<TeacherDashBoard/>} />
        <Route path="/studentdashboard" element={<StudentDashBoard/>} />
    </Routes>
</div>
  )
}

export default App
