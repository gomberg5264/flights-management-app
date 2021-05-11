import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './HomePage.css'
import {Link, Redirect} from 'react-router-dom';
import CustomCard from '../../components/CustomCardTopic/CustomCardTopic';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

function HomePage({ activeUser }) {
    const [redirect, setRedirect] = useState(null);

    if(redirect){
        return <Redirect to={redirect} />;
    }

    //when card clicked change the redirect value
    function onCardClick(path) {
        setRedirect(path);
    }

    const userName = activeUser ? activeUser.username.charAt(0).toUpperCase() + activeUser.username.slice(1): "";

    return (
        <div className="p-home-page">
            <CustomHeader textLocation="center" title={userName+"Welcome to Sky Flight"} text="Get inspiration, and plan and book your whole trip – we're here to make it all super easy,
                    wherever you are. find the best flight prices and amazing discounts.
                    Here, you can explore everything the travel industry has to offer. And there are no booking fees or hidden charges – just the best prices.
                    Let the journey begin"/>
            <Row>
                <CustomCard onCardClick={() => onCardClick(activeUser?"/deals":"/login")}  title="Top Deals" text="See where you can travel to right now and find the best deals across thousands of flights"/>
                <CustomCard onCardClick={() => onCardClick("/search-flight")}  title="Search Flight" text="Search and compare hundreds of flights all in one place to find the great prices available"/>
                <CustomCard onCardClick={() => onCardClick(activeUser?"/my-fav-flights":"/login")}  title="My Flights" text="Want to look but not ready to book? No problem. We have a 'saved flights' setting where you can 'star' a flight you like"/>
            </Row>
        </div>
    );
}

export default HomePage;