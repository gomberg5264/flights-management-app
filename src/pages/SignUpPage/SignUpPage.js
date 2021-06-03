import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './SignUpPage.css';
import airplane from '../../assets/airplane-48.png';
import Parse from 'parse';

function SignUpPage({ activeUser }) {

    const [username, setUsername] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [verifyPass, setVerifyPass] = useState();
    const [check, setCheck] = useState(false);
    const [showInvalidSignUp, setShowInvalidSignUp] = useState();

    //when logout users will get out to the Home page
    if (activeUser) {
        return <Redirect to="/" />
    }

    function signup(e) {
        //for not reset the values
        e.preventDefault(e);

        if(pass === verifyPass){
            const user = new Parse.User();
            user.set('username', username);
            user.set('email', email);
            user.set('fname', fname);
            user.set('lname', lname);
            user.set('password', pass);
    
            try {
                let userResult = user.signUp();
                console.log('User signed up', userResult);
            } catch (error) {
                console.error('Error while signing up user', error);
                setShowInvalidSignUp(error.message);
            }
        } else {

        }
    }

    let disable = true;
    if(username && fname && lname && email && pass && verifyPass && check){
        disable = false;
    }

    console.log(showInvalidSignUp);
    return (
        <p className="p-signup">
            <Container>
                <h3><img width="25px" src={airplane} />  Sky Flight</h3>
                <h1>Signup to continue</h1>
                {showInvalidSignUp ? <Alert variant="danger">{showInvalidSignUp}</Alert> : null}
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User name</Form.Label>
                        <Form.Control required  type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First name</Form.Label>
                        <Form.Control required  type="text" placeholder="Enter first name" value={fname} onChange={(e) => setFname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control required  type="text" placeholder="Enter last name" value={lname} onChange={(e) => setLname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required  type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required  type="password" placeholder="Enter Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control required  type="password" placeholder="Enter Password again" value={verifyPass} onChange={(e) => setVerifyPass(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Agree to terms and conditions" onChange={() => setCheck(!check)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={signup} block disabled={disable}>
                        Sign up
                    </Button>
                </Form>
            </Container>
        </p>
    );
}

export default SignUpPage;