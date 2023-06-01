import {useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Assignment} from "../../types/types.ts";
import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useUpdateAssignment} from "../../hooks/useUpdateAssignment.ts";
import {Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";

function AssignmentView() {
   const params = useParams()
   const id = params?.id;
   const {data: fetchedAssignment} = useFetchAssignments(id);
   const [assignment, setAssignment] = useState<Assignment | undefined>(fetchedAssignment);
   const updateAssignment = useUpdateAssignment(id);

   useEffect(() => {
      setAssignment(fetchedAssignment)
   }, [fetchedAssignment])

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAssignment((prevAssignment: Assignment | undefined) => {
         if (prevAssignment)
            return {
               ...prevAssignment,
               [e.target.name]: e.target.value
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
         <Container className="mt-5">
            <Row className="d-flex align-items-center">
               <Col>
                  <h1>Assignment {assignment.id}</h1>
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
                    title="Assignment 1"
                    onSelect={(ek,)=>{
                       console.log(ek);
                    }}
                  >
                     {["1", "2", "3", "4", "5", "6"].map((assignmentNum) => (
                       <Dropdown.Item eventKey={assignmentNum}>
                          {assignmentNum}
                       </Dropdown.Item>
                     ))}
                  </DropdownButton>
               </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
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
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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
            <Button size="lg" onClick={handleSave}>Save Assignment</Button>

         </Container>


      </> : <h1>No Assignment</h1>
   }

   return <>
      {getAssignmentFormView()}
   </>
}

export default AssignmentView;
