import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import airplane from '../../assets/airplane-48.png';
import './CustomNavBar.css';

function CustomNavBar({activeUser, onLogOut}) {
    return (
        <div className="c-custom-nav">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#/"><img className="img" src={airplane}/></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#/">Home</Nav.Link>
                    <Nav.Link href="#/search-flight">Search Flight</Nav.Link>
                    {activeUser?
                            <>
                            <Nav.Link href="#/deals">Deals</Nav.Link>
                            <Nav.Link href="#/my-fav-flights">My Flights</Nav.Link>
                            </>
                            :
                            null
                    }
                </Nav>
                <Nav className="ml-auto">
                    {!activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null}
                    {!activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null}
                    {activeUser ? <Nav.Link href="#" onClick={() => onLogOut()}>Logout</Nav.Link> : null}
                </Nav>
            </Navbar>
        </div>
    );
}

export default CustomNavBar;