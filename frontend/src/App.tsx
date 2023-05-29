import './App.css'
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/LoginPage";


function App() {
   return (
       <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dashboard" element={
             <PrivateRoute>
                <Dashboard/>
             </PrivateRoute>}/>
          <Route path="/login" element={<LoginPage/>}/>
       </Routes>
   )
}

export default App
