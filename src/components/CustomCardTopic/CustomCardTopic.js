import React from 'react';
import { Col } from 'react-bootstrap';
import './CustomCardTopic.css'

function CustomCard({onCardClick, title, text}) {
    return (
        <Col md={12} lg={4}>
            <div className="article-container container" onClick={() => onCardClick()}>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </Col>
    );
}

export default CustomCard;