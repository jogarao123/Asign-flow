import './App.css'
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./components/LoginPage";
import AssignmentView from "./components/AssignmentView";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();


function App() {
   return (
     <QueryClientProvider client={queryClient}>

        <Routes>
           <Route path="/" element={<HomePage/>}/>
           <Route path="/dashboard" element={
              <PrivateRoute>
                 <Dashboard/>
              </PrivateRoute>}/>

           <Route path="/login" element={<LoginPage/>}/>
           <Route path="/assignments/:id" element={
              <PrivateRoute>
                 <AssignmentView/>
              </PrivateRoute>
           }/>
        </Routes>
     </QueryClientProvider>
   )
}

export default App
