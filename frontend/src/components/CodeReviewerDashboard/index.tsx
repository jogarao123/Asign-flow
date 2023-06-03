import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {Assignment} from "../../types/types.ts";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../util/useLocalStorage.ts";


function CodeReviewerDashboard() {
   const [, setJwt] = useLocalStorage('jwt', '');
   const navigate = useNavigate();
   const {data: assignments} = useFetchAssignments();

   const handleLogout = () => {
      setJwt('')
      window.location.href = '/login'
   }

   return (<Container>
      <Row>
         <Col>
            <div className="d-flex justify-content-end">
               <button onClick={handleLogout}>Logout</button>
            </div>
         </Col>
      </Row>
      <Row>
         <Col>
            <div className="h1">Code Reviewer Dashboard</div>
         </Col>
      </Row>
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
                           <Badge pill={true} style={{fontSize: "1em"}}>
                              {assignment.status}
                           </Badge>
                        </div>

                        <Card.Text style={{marginTop: '1em'}}>
                           <b>GitHub URL</b> : {assignment.githubUrl}<br/>
                           <b>Branch</b> : {assignment.branch}
                        </Card.Text>
                        <Button variant="secondary"
                                onClick={() => navigate(`/assignments/${assignment.id}`)}>Edit</Button>
                     </Card.Body>
                  </Card>)
            })
         }
      </div>
   </Container>)
}

export default CodeReviewerDashboard;