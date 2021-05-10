import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import './DealsPage.css';
// import x fom 'react-router-do'

function DealsPage({activeUser}) {
    //when logout users will get out to the Home page
    if(!activeUser){
        return <Redirect to="/" />
    }

    let requestUrl = "https://ipinfo.io";
    axios.get(requestUrl).then(response =>
        {
            console.log("My country is: " + response);
        }).catch( err => console.error(err));


        //pictures of cities!!! important
        //https://www.esky.eu/_fe/img/city_GLA_horizontal_0.jpg
        //https://static1.eskypartners.com/deals/MAD_1_SquareSmall_290_290.jpg
    return (
        <div>
            Deals 
        </div>
    );
}

export default DealsPage;