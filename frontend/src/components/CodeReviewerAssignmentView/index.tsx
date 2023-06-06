import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Assignment, COMPLETED, IN_REVIEW, NEEDS_UPDATE, Status} from "../../types/types.ts";
import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useUpdateAssignment} from "../../hooks/useUpdateAssignment.ts";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {UseQueryResult} from "react-query";
import StatusBadge from "../StatusBadge";
import CommentsView from "../Comments/CommentsView.tsx";

function CodeReviewerAssignmentView() {
   const navigate = useNavigate();
   const params = useParams();
   const id = params?.id;
   const {data: fetchedAssignment}: UseQueryResult<Assignment, unknown> = useFetchAssignments(id);
   const [assignment, setAssignment] = useState<Assignment | undefined>(fetchedAssignment);
   const updateAssignment = useUpdateAssignment();
   useEffect(() => {
      setAssignment(fetchedAssignment);
   }, [fetchedAssignment])

   const updateAssignmentState = (col: string, value: any) => {
      setAssignment((prevAssignment: Assignment | undefined) => {
         if (prevAssignment)
            return {
               ...prevAssignment,
               [col]: value
            }
         else
            return prevAssignment
      })
   }
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateAssignmentState(e.target.name, e.target.value);
   }
   const handleSave = async (nxtStatus: Status) => {
      if (assignment) {
         const newAssignment: Assignment = {...assignment};
         newAssignment.status = nxtStatus;
         await updateAssignment.mutate(newAssignment)
         setAssignment(newAssignment)
      }
   }


   const getAssignmentFormView = () => {
      return (assignment?.id) ? <>
         <Container className="mt-5">
            <Row className="d-flex align-items-center">
               <Col>
                  {assignment.number && <h1>Assignment {assignment.number}</h1>}
               </Col>
               <Col>
                  <StatusBadge status={assignment.status}/>
               </Col>
            </Row>
            <Form.Group as={Row} className="my-3" controlId="githubUrl">
               <Form.Label column sm="3" md="2">
                  Github Url
               </Form.Label>
               <Col sm="9" md="8" lg="6">
                  <Form.Control
                     name="githubUrl"
                     type="url"
                     readOnly={true}
                     onChange={handleChange}
                     value={assignment.githubUrl || ''}
                     placeholder="https://github.com/username/repo-name"
                  >
                  </Form.Control>
               </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="branch">
               <Form.Label column sm="3" md="2">
                  Branch:
               </Form.Label>
               <Col sm="9" md="8" lg="6">
                  <Form.Control
                     name="branch"
                     type="text"
                     readOnly={true}
                     placeholder="example_branch_name"
                     onChange={handleChange}
                     value={assignment.branch || ''}
                  />
               </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="codeReviewVideoUrl">
               <Form.Label column sm="3" md="2">
                  Code Review VideoUrl
               </Form.Label>
               <Col sm="9" md="8" lg="6">
                  <Form.Control
                     name="codeReviewVideoUrl"
                     type="text"
                     placeholder="https://screencast-o-matic.com/something"
                     onChange={handleChange}
                     value={assignment.codeReviewVideoUrl || ''}
                  />
               </Col>
            </Form.Group>

            <div className="d-flex gap-5 mt-1">

               {assignment.status === "Completed" ? (
                  <Button
                     size="lg"
                     variant="secondary"
                     onClick={() => handleSave(IN_REVIEW)}
                  >
                     Re-Claim
                  </Button>
               ) : (
                  <Button
                     size="lg"
                     onClick={() => handleSave(COMPLETED)}
                  >
                     Complete Review
                  </Button>
               )}

               {assignment.status === "Needs Update" ? (
                  <Button
                     size="lg"
                     variant="secondary"
                     onClick={() => handleSave(IN_REVIEW)}
                  >
                     Re-Claim
                  </Button>
               ) : (
                  <Button
                     size="lg"
                     variant="danger"
                     onClick={() => handleSave(NEEDS_UPDATE)}
                  >
                     Reject Assignment
                  </Button>
               )}

               <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
                  Back
               </Button>
            </div>
            <CommentsView
               assignmentId={id}
            />
         </Container>


      </> : <h1>No Assignment</h1>
   }

   return <>
      {getAssignmentFormView()}
   </>
}

export default CodeReviewerAssignmentView;
