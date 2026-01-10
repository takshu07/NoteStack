import { Routes, Route } from "react-router-dom";
// import Register from "../pages/register";
import Login from "../pages/login";
const AppRoutes=()=>{
return(
    <Routes>
      {/* <Route path="/" element={<Register />}/> */}
      <Route path="/" element={<Login/>}/>
    </Routes>
)
}
export default AppRoutes