import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/employe";
import Login from "./components/login";
import GeetEmploye from "./components/getEmploye";
import Signup from "./components/signup";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/add-employee" element={<EmployeeForm/>}/>
      <Route path="/get-employee" element={<GeetEmploye/>}/>
    </Routes>
    </BrowserRouter>
    {/* <div>api</div> */}
    </>
  )
}

export default App;
