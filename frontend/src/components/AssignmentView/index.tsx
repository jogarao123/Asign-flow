import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Assignment, AssignmentEnum, AssignmentMetadata} from "../../types/types.ts";
import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useUpdateAssignment} from "../../hooks/useUpdateAssignment.ts";
import {Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import {useAssignmentMetadata} from "../../hooks/useAssignmentMetadata.ts";
import {UseQueryResult} from "react-query";

function AssignmentView() {
   const navigate = useNavigate();
   const params = useParams();
   const id = params?.id;
   const {data: assignmentMetadata}: UseQueryResult<AssignmentMetadata, unknown> = useAssignmentMetadata();
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
   const handleSubmit = async () => {
      if (assignment && assignmentMetadata) {
         const newAssignment: Assignment = {...assignment};
         if (assignment.status === assignmentMetadata.assignmentStatusEnums[0].status)
            newAssignment.status = assignmentMetadata.assignmentStatusEnums[1].status;

         await updateAssignment.mutate(newAssignment)
      }
   }

   const handleSelect = (eventKey: any) => {
      updateAssignmentState('number', eventKey)
   }

   const getAssignmentFormView = () => {
      return (assignment?.id && assignmentMetadata) ? <>
         <Container className="mt-5">
            <Row className="d-flex align-items-center">
               <Col>
                  {assignment.number && <h1>Assignment {assignment.number}</h1>}
               </Col>
               <Col>
                  <Badge pill={true} style={{fontSize: "1em"}}>
                     {assignment.status}
                  </Badge>
               </Col>
            </Row>

            <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
               <Form.Label column sm="3" md="2">
                  Assignment Number:
               </Form.Label>
               <Col sm="9" md="8" lg="6">
                  <DropdownButton
                     as={ButtonGroup}
                     id="assignmentName"
                     variant={"info"}
                     title={assignment.number ? `Assignment ${assignment.number}` : 'Select an Assignment'}
                     onSelect={handleSelect}
                  >
                     {assignmentMetadata && assignmentMetadata.assignmentEnums.map((assignmentEnum: AssignmentEnum) => (
                        <Dropdown.Item
                           key={assignmentEnum.assignmentNum}
                           eventKey={assignmentEnum.assignmentNum}>
                           {assignmentEnum.assignmentNum}
                        </Dropdown.Item>
                     ))}
                  </DropdownButton>
               </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-3" controlId="githubUrl">
               <Form.Label column sm="3" md="2">
                  Github Url
               </Form.Label>
               <Col sm="9" md="8" lg="6">
                  <Form.Control
                     name="githubUrl"
                     type="url"
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
                     placeholder="example_branch_name"
                     onChange={handleChange}
                     value={assignment.branch || ''}
                  />
               </Col>
            </Form.Group>
            <div className="d-flex gap-5 mt-1">

               <Button size="lg" onClick={handleSubmit}>Submit Assignment</Button>
               <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
                  Back
               </Button>
            </div>
         </Container>


      </> : <h1>No Assignment</h1>
   }

   return <>
      {getAssignmentFormView()}
   </>
}

export default AssignmentView;
