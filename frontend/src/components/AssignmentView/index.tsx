import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Assignment, URL} from "../../types/types.ts";
import {useLocalStorage} from "../../util/useLocalStorage.ts";

function AssignmentView() {
   const [jwt] = useLocalStorage('jwt', '');
   const params = useParams()
   const [assignment, setAssignment] = useState<Assignment | undefined>();
   const id = params?.id;

   const fetchAssignmentById = (id: string) => {
      fetch(`${URL}/api/assignments/${id}`, {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${jwt}`
         },
      })
        .then((response) => {
           if (response.status === 200) return response.json();
        })
        .then((assignments: any) => {
           setAssignment(assignments)
        })
   }

   useEffect(() => {
      if (id)
         fetchAssignmentById(id);
   }, [id])

   const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setAssignment((prevAssignment:Assignment|undefined)=>{
         if(prevAssignment)
            return {
               ...prevAssignment,
               [e.target.id]:e.target.value
            }
         else
            return prevAssignment
      })
   }
   const handleSave=()=>{
      fetch(`${URL}/api/assignments/${id}`, {
         method: 'PUT',
         headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
         },
         body:JSON.stringify(assignment)
      })
        .then((response) => {
           if (response.status === 200) return response.json();
        })
        .then((assignment: Assignment) => {
           setAssignment(assignment)
        })
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
