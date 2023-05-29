import {useLocalStorage} from "../../util/useLocalStorage.ts";

function Dashboard() {
   const [jwt] = useLocalStorage('jwt', '');

   const createAssignment = () => {
      fetch("http://localhost:8080/api/assignments", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
         },
      })
        .then((response) => {
           if (response.status === 200) return response.json();
        })
        .then((assignment) => {
            window.location.href=`/assignments/${assignment.id}`;
        })

   }

   return <div style={{margin: "2em"}}>
      <button onClick={createAssignment}>New Assignment</button>
   </div>
}

export default Dashboard;