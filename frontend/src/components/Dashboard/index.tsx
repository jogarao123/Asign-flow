import {Link} from "react-router-dom";
import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useCreateAssignment} from "../../hooks/useCreateAssignment.ts";
import {Assignment} from "../../types/types.ts";


function Dashboard() {
   const {data: assignments} = useFetchAssignments();

   const createAssignmentMutation = useCreateAssignment();

   const createAssignment = async () => {
      await createAssignmentMutation.mutate(null);
   }

   return <div style={{margin: "2em"}}>
      <button onClick={createAssignment}>New Assignment</button>
      {
        assignments &&  assignments.map((assignment: Assignment) => {
            return <div key={assignment.id}>
               <Link to={`/assignments/${assignment.id}`}>
                  {assignment.id}-{assignment.assignedTo.username}
               </Link></div>
         })
      }
   </div>
}

export default Dashboard;