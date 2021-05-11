import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import './DealsPage.css';
// import x fom 'react-router-do'

function DealsPage({activeUser}) {
    //when logout users will get out to the Home page
    if(!activeUser){
        return <Redirect to="/" />
    }

        //pictures of cities!!! important
        //https://www.esky.eu/_fe/img/city_GLA_horizontal_0.jpg
        //https://static1.eskypartners.com/deals/MAD_1_SquareSmall_290_290.jpg
    return (
        <div className="p-deals">
            <CustomHeader  textLocation="flex-start" title="Plan and grab the best deals" text="See where you can travel to right now and find the best deals across thousands of flights" />
            <CustomCarousel />
        </div>
    );
}

export default DealsPage;