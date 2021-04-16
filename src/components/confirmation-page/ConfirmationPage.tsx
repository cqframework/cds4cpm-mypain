import React from "react";
import './ConfirmationPage.css';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const ConfirmationPage = () => {

    return <div className="confirmation-page">
        <div className="confirmation-container">
            <h1> <FontAwesomeIcon icon={faCheckCircle} /></h1>
            <h2 tabIndex={0}>Congratulations!</h2>
            <p tabIndex={0}>Your responses have been successfully recorded. You may now close your browser window.</p>
        </div>

    </div>
}