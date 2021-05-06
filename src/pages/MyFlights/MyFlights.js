import React from 'react';
import './MyFlights.css';
import { Redirect } from "react-router-dom";

function MyFlights({activeUser}) {
    //when logout users will get out to the Home page
    if(!activeUser){
        return <Redirect to="/" />
    }

    return (
        <div>
            MyFlights
        </div>
    );
}

export default MyFlights;