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

   const getAssignmentFormView = () => {
      return assignment?.id ? <>
         <h1>Assignment {assignment.id}</h1>
         <h2>Status: {assignment.status}</h2>
         <h3>
            GitHub URL: <input type="url" id="gitHubUrl"/>
         </h3>
         <h3>
            Branch: <input type="text" id="branch"/>
         </h3>
         <button>Submit Assignment</button>
      </> : <h1>No Assignment</h1>
   }

   return <>

      {getAssignmentFormView()}
   </>
}

export default AssignmentView;
