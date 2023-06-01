import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useCreateAssignment} from "../../hooks/useCreateAssignment.ts";
import {Assignment} from "../../types/types.ts";
import {Button, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


function Dashboard() {
   const navigate = useNavigate();
   const {data: assignments} = useFetchAssignments();

   const createAssignmentMutation = useCreateAssignment();

   const createAssignment = async () => {
      await createAssignmentMutation.mutate(null);
   }

   return <div style={{margin: "2em"}}>
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
                      <Card.Title>Asssignment {assignment.name} #{assignment.id}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
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