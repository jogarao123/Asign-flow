import {useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Assignment, AssignmentEnum, AssignmentStatus} from "../../types/types.ts";
import {useFetchAssignments} from "../../hooks/useFetchAssignment.ts";
import {useUpdateAssignment} from "../../hooks/useUpdateAssignment.ts";
import {Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";

function AssignmentView() {
   const params = useParams()
   const id = params?.id;
   const {data: fetchedAssignment} = useFetchAssignments(id);
   const [assignment, setAssignment] = useState<Assignment | undefined>(fetchedAssignment?.assignment);
   const [assignmentEnums, setAssignmentEnums] = useState<AssignmentEnum[] | undefined>(fetchedAssignment?.assignmentEnums);
   const [assignmentStatuses,setAssignmentStatuses]=useState<AssignmentStatus[]|undefined>(fetchedAssignment?.assignmentStatusEnums);
   const updateAssignment = useUpdateAssignment(id);

   useEffect(() => {
      setAssignment(fetchedAssignment?.assignment);
      setAssignmentEnums(fetchedAssignment?.assignmentEnums)
      setAssignmentStatuses(fetchedAssignment?.assignmentStatusEnums)
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
      if (assignment) {
         const newAssignment:Assignment={...assignment};
         if(assignment.status===assignmentStatuses?.[0].status)
            newAssignment.status=assignmentStatuses?.[1].status;

         await updateAssignment.mutate(newAssignment)
      }
   }

   const handleSelect = (eventKey: any) => {
      updateAssignmentState('number', eventKey)
   }

   const getAssignmentFormView = () => {
      return assignment?.id ? <>
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
                     title={assignment.number?`Assignment ${ assignment.number}` : 'Select an Assignment'}
                     onSelect={handleSelect}
                  >
                     {assignmentEnums && assignmentEnums.map((assignmentEnum: AssignmentEnum) => (
                        <Dropdown.Item eventKey={assignmentEnum.assignmentNum}>
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
            <Button size="lg" onClick={handleSubmit}>Submit Assignment</Button>

         </Container>


      </> : <h1>No Assignment</h1>
   }

   return <>
      {getAssignmentFormView()}
   </>
}

export default AssignmentView;
