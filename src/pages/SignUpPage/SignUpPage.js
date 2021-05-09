import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './SignUpPage.css';
import airplane from '../../assets/airplane-48.png';

function SignUpPage({ activeUser }) {

    const [username, setUsername] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [verifyPass, setVerifyPass] = useState();
    const [showInvalidLogin, setShowInvalidLogin] = useState(false);

    //when logout users will get out to the Home page
    if (activeUser) {
        return <Redirect to="/" />
    }

    function signup(e) {
        //for not reset the values
        e.preventDefault(e);

        // // Pass the username and password to logIn function
        // Parse.User.logIn(email, pass).then((parseUser) => {
        //     // Do stuff after successful login
        //     console.log('Logged in user', parseUser);
        //     const activeUser = new UserModel(parseUser);
        //     console.log('user of UserModel', activeUser);
        //     onLogin(activeUser);
        // }).catch(error => {
        //     setShowInvalidLogin(true);
        //     console.error('Error while logging in user', error);
        // })
    }

    return (
        <p className="p-signup">
            <Container>
                <h3><img width="25px" src={airplane} />  Sky Flight</h3>
                <h1>Signup to continue</h1>
                {showInvalidLogin ? <Alert variant="danger">Invalid Credentails!</Alert> : null}
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>user name</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={fname} onChange={(e) => setFname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lname} onChange={(e) => setLname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password again" value={verifyPass} onChange={(e) => setVerifyPass(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={signup} block>
                        Sign up
                </Button>
                </Form>
            </Container>
        </p>
    );
}

export default SignUpPage;