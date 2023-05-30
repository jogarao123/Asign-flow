import {useLocalStorage} from "../../util/useLocalStorage";
import {useState} from "react";
import {LoginCredentials, URL} from "../../types/types.ts";
import {Button, Col, Container, Form, Row} from "react-bootstrap";


function LoginPage() {
   const [credentials, setCredentials] = useState<LoginCredentials>({username: '', password: ''});
   const [, setJwt] = useLocalStorage('jwt', '');
   const handleLogin = () => {
      fetch(`${URL}/api/auth/login`,
        {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json'
           },
           body: JSON.stringify(credentials)
        })
        .then(res => {
           if (res.status === 200)
              return Promise.all([res.json(), res.headers]);
           else
              return Promise.reject("Invalid Login attempt");
        })
        .then(([, headers]) => {
           setJwt(headers.get('Authorization') || '')
           window.location.href = 'dashboard'
        })
        .catch((msg) => {
           alert(msg)
        })
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setCredentials((prevCreds) => ({
         ...prevCreds,
         [name]: value
      }))
   }
   return <>
      <Container className="mt-5">
         <Form>
            <Row className="justify-content-center">
               <Col md="8" lg="6">
                  <Form.Group className="mb-3" controlId="username">
                     <Form.Label className="fs-4">Username</Form.Label>
                     <Form.Control
                       type="text"
                       name="username"
                       size="lg"
                       value={credentials.username}
                       onChange={handleChange}
                       placeholder="Username"/>
                  </Form.Group>
               </Col>
            </Row>
            <Row className="justify-content-center">
               <Col md="8" lg="6">
                  <Form.Group className="mb-3" controlId="password">
                     <Form.Label className="fs-4">Password</Form.Label>
                     <Form.Control
                       type="password"
                       name="password"
                       size="lg"
                       value={credentials.password}
                       onChange={handleChange}
                       placeholder="Password"/>
                  </Form.Group>
               </Col>
            </Row>
            <Row className="justify-content-center">
               <Col
                 md="8"
                 lg="6"
                 className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
               >
                  <Button
                    id="submit"
                    type="button"
                    size="lg"
                    onClick={handleLogin}
                  >
                     Login
                  </Button>

                  <Button
                    id="exit"
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => window.location.href = "/"}
                  >
                     Exit
                  </Button>
               </Col>
            </Row>
         </Form>
      </Container>
   </>
}

export default LoginPage;