import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import airplane from '../../assets/airplane-48.png';

function CustomNavBar(props) {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#/"><img src={airplane}/></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#/">Home</Nav.Link>
                    <Nav.Link href="#search-flight">Search Flight</Nav.Link>
                    <Nav.Link href="#deals">Deals</Nav.Link>
                    <Nav.Link href="#my-fav-flights">My Flights</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav.Link href="#login">Login</Nav.Link>
                </Form>
            </Navbar>
        </div>
    );
}

export default CustomNavBar;