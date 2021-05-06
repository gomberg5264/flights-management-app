import React from 'react';
import { Redirect } from 'react-router-dom';
import './DealsPage.css';
// import x fom 'react-router-do'

function DealsPage({activeUser}) {
    //when logout users will get out to the Home page
    if(!activeUser){
        return <Redirect to="/" />
    }

    return (
        <div>
            Deals 
        </div>
    );
}

export default DealsPage;