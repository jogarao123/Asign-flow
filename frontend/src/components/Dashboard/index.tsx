import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useCreateAssignment} from "../../hooks/useCreateAssignment.ts";
import {Assignment} from "../../types/types.ts";
import {Button, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../util/useLocalStorage.ts";
import StatusBadge from "../StatusBadge";


function Dashboard() {
   const [, setJwt] = useLocalStorage('jwt', '');
   const navigate = useNavigate();
   const {data: assignments} = useFetchAssignments();

   const {mutateAsync: mutateCreateAssignment} = useCreateAssignment();

   const createAssignment = async () => {
      const createdAssignment: Assignment = await mutateCreateAssignment(null);
      navigate(`/assignments/${createdAssignment.id}`);
   }
   const handleLogout = () => {
      setJwt('')
      window.location.href = '/login'
   }

   return <div style={{margin: "2em"}}>
      <div className="d-flex justify-content-end">
         <button onClick={handleLogout}>Logout</button>
      </div>
      <Button size="lg" onClick={createAssignment}>New Assignment</Button>
      <div
         className="d-grid flex-column gap-5"
         style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}
      >
         {
            assignments && assignments.map((assignment: Assignment) => {
               return (
                  <Card
                     key={assignment.id}
                     style={{
                        width: '18rem',
                        height: '18rem'
                     }}>
                     <Card.Body className="d-flex flex-column justify-content-around">
                        <Card.Title>Asssignment #{assignment?.number} </Card.Title>
                        <div className="d-flex align-items-start">
                           <StatusBadge status={assignment?.status}/>
                        </div>

                        <Card.Text style={{marginTop: '1em'}}>
                           <b>GitHub URL</b> : {assignment.githubUrl}<br/>
                           <b>Branch</b> : {assignment.branch}
                        </Card.Text>
                        <Button variant="secondary" onClick={() => navigate(`/assignments/${assignment.id}`)}>Edit</Button>
                     </Card.Body>
                  </Card>)
            })
         }
      </div>
   </div>
}

export default Dashboard;