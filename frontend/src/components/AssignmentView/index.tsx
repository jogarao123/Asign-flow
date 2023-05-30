import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Assignment} from "../../types/types.ts";
import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useUpdateAssignment} from "../../hooks/useUpdateAssignment.ts";

function AssignmentView() {
   const params = useParams()
   const id = params?.id;
   const {data: fetchedAssignment} = useFetchAssignments(id);
   const [assignment, setAssignment] = useState<Assignment | undefined>(fetchedAssignment);
   const updateAssignment = useUpdateAssignment(id);

   useEffect(()=>{
      setAssignment(fetchedAssignment)
   },[fetchedAssignment])

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAssignment((prevAssignment: Assignment | undefined) => {
         if (prevAssignment)
            return {
               ...prevAssignment,
               [e.target.id]: e.target.value
            }
         else
            return prevAssignment
      })
   }
   const handleSave = async () => {
      if (assignment)
         await updateAssignment.mutate(assignment)
   }


   const getAssignmentFormView = () => {
      return assignment?.id ? <>
         <h1>Assignment {assignment.id}</h1>
         <h2>Status: {assignment.status}</h2>
         <h3>
            GitHub URL: <input type="url" id="githubUrl" value={assignment?.githubUrl || ''} onChange={handleChange}/>
         </h3>
         <h3>
            Branch: <input type="text" id="branch" value={assignment?.branch || ''} onChange={handleChange}/>
         </h3>
         <button onClick={handleSave}>Save Assignment</button>
      </> : <h1>No Assignment</h1>
   }

   return <>
      {getAssignmentFormView()}
   </>
}

export default AssignmentView;
