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

    return (
        <div>
            Deals 
        </div>
    );
}

export default DealsPage;