import React from "react";
import './ConfirmationPage.css';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {IconProp} from "@fortawesome/fontawesome-svg-core";



export const ConfirmationPage = () => {

    return <div className="confirmation-page">
        <div className="confirmation-container">
            <h1> <FontAwesomeIcon icon={faCheckCircle as IconProp} /></h1>
            <h2>Congratulations!</h2>
            <p>Your responses have been successfully recorded. You may now close your browser window.</p>
        </div>

    </div>
}