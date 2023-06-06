import './App.css'
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/LoginPage";
import AssignmentView from "./components/AssignmentView";
import {QueryClient, QueryClientProvider} from "react-query";
import {useLocalStorage} from "./util/useLocalStorage.ts";
import {useEffect, useState} from "react";
import jwt_decode from 'jwt-decode';
import {DecodedToken, ROLE_CODE_REVIEWER} from "./types/types.ts";
import CodeReviewerDashboard from "./components/CodeReviewerDashboard";
import CodeReviewerAssignmentView from "./components/CodeReviewerAssignmentView";

const queryClient = new QueryClient();


function App() {
   const [token] = useLocalStorage('jwt', '');
   const [roles, setRoles] = useState<string[]>([]);
   useEffect(() => {
      if (token) {
         const json: DecodedToken = jwt_decode(token);
         setRoles(json?.authorities)
      } else {
         setRoles([]);
      }
   }, [token])
   return (
      <QueryClientProvider client={queryClient}>

         <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={
               <PrivateRoute>
                  {roles.find(role => role === ROLE_CODE_REVIEWER) ? <CodeReviewerDashboard/> : <Dashboard/>}
               </PrivateRoute>}/>

            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/assignments/:id" element={

               <PrivateRoute>
                  {roles.find(role => role === ROLE_CODE_REVIEWER) ? <CodeReviewerAssignmentView/> : <AssignmentView/>}
               </PrivateRoute>
            }/>
         </Routes>
      </QueryClientProvider>
   )
}

export default App
