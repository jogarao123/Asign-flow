import {useLocalStorage} from "../../util/useLocalStorage.ts";
import {Link} from "react-router-dom";

function Dashboard() {
   const [jwt] = useLocalStorage('jwt', '');

   const createAssignment = () => {
      fetch("http://localhost:8080/api/assignments", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authentication:`Bearer ${jwt}`
         },

      })
   }

   return <div style={{margin: "2em"}}>
      <button onClick={createAssignment}>New Assignment</button>
   </div>
}

export default Dashboard;