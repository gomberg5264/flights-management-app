import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './HomePage.css'
import {Link, Redirect} from 'react-router-dom';

function HomePage({ activeUser }) {
    const [redirect, setRedirect] = useState(null);

    if(redirect){
        return <Redirect to={redirect} />;
    }

    return (
        <div className="p-home-page">
            <div className="head-container">
                <div className="container">
                    <h1>{activeUser ? activeUser.username : ""} Welcome to Sky Flight</h1>
                    <p>Get inspiration, and plan and book your whole trip – we're here to make it all super easy,
                    wherever you are. find the best flight prices and amazing discounts.
                    Here, you can explore everything the travel industry has to offer. And there are no booking fees or hidden charges – just the best prices.
                    Let the journey begin</p>
                </div>
            </div>
            <Row>
                <Col md={12} lg={4}>
                    <div className="article-container container" onClick={() => setRedirect("/deals") }>
                        <h3>Top Deals</h3>
                        <p>See where you can travel to right now and find the best deals across thousands of flights</p>
                    </div>
                </Col>
                <Col md={12} lg={4}>
                    <div className="article-container container" onClick={() => setRedirect("/search-flight") }>
                        <h3>Search Flight</h3>
                        <p>Search and compare hundreds of flights all in one place to find
                         the great prices available</p>
                    </div>
                </Col>
                <Col md={12} lg={4}>
                    <div className="article-container container" onClick={() => setRedirect("/my-fav-flights") }>
                        <h3>My Flights</h3>
                        <p>Want to look but not ready to book? No problem.
                        We have a 'saved flights' setting where you can 'star' a flight you like</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default HomePage;