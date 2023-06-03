import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {Assignment, DecodedToken, IN_REVIEW, NEEDS_UPDATE, SUBMITTED} from "../../types/types.ts";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import {useLocalStorage} from "../../util/useLocalStorage.ts";
import jwt_decode from 'jwt-decode';
import {useUpdateAssignment} from "../../hooks/useUpdateAssignment.ts";


function CodeReviewerDashboard() {
   const [token, setToken] = useLocalStorage('jwt', '');
   // const navigate = useNavigate();
   const updateAssignment = useUpdateAssignment();
   const {data: assignments} = useFetchAssignments();

   const handleLogout = () => {
      setToken('')

      window.location.href = '/login'
   }
   const handleClaim = async (assignment: Assignment) => {
      const json: DecodedToken = jwt_decode(token);
      const updatedAssignment: Assignment = {
         ...assignment,
         status: 'In Review',
         codeReviewer: {...assignment.codeReviewer, username: json.sub}
      };
      console.log('updated Ass', updatedAssignment);
      await updateAssignment.mutate(updatedAssignment);
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
      <div className="assignment-wrapper in-review">
         <div className="assignment-wrapper-title h3 px-2">
            In Review
         </div>
         {
            assignments &&
            assignments.filter((assignment: Assignment) => assignment.status === IN_REVIEW).length > 0
               ?
               (
                  <div
                     className="d-grid gap-5"
                     style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}
                  >
                     {(assignments
                        .filter((assignment: Assignment) => assignment.status === IN_REVIEW)
                        .map((assignment: Assignment) => {
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
                                            onClick={() => handleClaim(assignment)}>Claim</Button>
                                 </Card.Body>
                              </Card>)
                        }))}
                  </div>
               ) : <div>No Assignments found</div>
         }
      </div>
      <div className="assignment-wrapper submitted">
         <div className="assignment-wrapper-title h3 px-2">
            Awaiting Review
         </div>
         {
            assignments &&
            assignments.filter((assignment: Assignment) => assignment.status === SUBMITTED).length > 0
               ? (
                  <div
                     className="d-grid gap-5"
                     style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}
                  >
                     {(assignments.filter((assignment: Assignment) => assignment.status === SUBMITTED)
                        .map((assignment: Assignment) => {
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
                                            onClick={() => handleClaim(assignment)}>Claim</Button>
                                 </Card.Body>
                              </Card>)
                        }))}
                  </div>
               ) : <div>No Assignments found</div>
         }
      </div>
      <div className="assignment-wrapper needs-update">
         <div className="assignment-wrapper-title h3 px-2">
            Needs Update
         </div>
         {
            assignments &&
            assignments.filter((assignment: Assignment) => assignment.status === NEEDS_UPDATE).length > 0
               ? (
                  <div
                     className="d-grid gap-5"
                     style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}
                  >
                     {(assignments
                        .filter((assignment: Assignment) => assignment.status === NEEDS_UPDATE)
                        .map((assignment: Assignment) => {
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
                                            onClick={() => handleClaim(assignment)}>Claim</Button>
                                 </Card.Body>
                              </Card>)
                        }))}
                  </div>
               ) : <div>No Assignments found</div>
         }
      </div>
   </Container>)
}

export default CodeReviewerDashboard;