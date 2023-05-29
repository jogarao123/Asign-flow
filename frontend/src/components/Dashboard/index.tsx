import {useLocalStorage} from "../../util/useLocalStorage.ts";
import {useEffect, useState} from "react";
import {Assignment, URL} from "../../types/types.ts";
import {Link} from "react-router-dom";


function Dashboard() {
   const [jwt] = useLocalStorage('jwt', '');
   const [assignments, setAssignments] = useState<Assignment[]>([]);

   const fetchAssignments = () => {
      fetch(`${URL}/api/assignments`, {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${jwt}`
         },
      })
        .then((response) => {
           console.log('response is ', response)
           if (response.status === 200) return response.json();
        })
        .then((assignments: any) => {
           setAssignments(assignments)
        })
   }
   useEffect(() => {
      fetchAssignments();
   }, []);

   const createAssignment = () => {
      fetch(`${URL}/api/assignments`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
         },
      })
        .then((response) => {
           if (response.status === 200) return response.json();
        })
        .then((assignment: Assignment) => {
           window.location.href = `/assignments/${assignment.id}`;
        })

   }

   return <div style={{margin: "2em"}}>
      <button onClick={createAssignment}>New Assignment</button>
      {
         assignments.map(assignment => {
            return <div>
               <Link to={`/assignments/${assignment.id}`}>
                  {assignment.id}-{assignment.assignedTo.username}
               </Link></div>
         })
      }
   </div>
}

export default Dashboard;