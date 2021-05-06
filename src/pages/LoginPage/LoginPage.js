import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './LoginPage.css';
import Parse from 'parse';

function LoginPage(props) {
    const [username, setUsername] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();


    function login() {
        // Pass the username and password to logIn function
        Parse.User.logIn("newUserName", "#Password123").then((user) => {
            // Do stuff after successful login
            if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
            console.log('Logged in user', user);
        }).catch(error => {
            if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
            console.error('Error while logging in user', error);
        })
    }

    return (
        <Container>
            <h1>Login</h1>
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
                    <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={login}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default LoginPage;