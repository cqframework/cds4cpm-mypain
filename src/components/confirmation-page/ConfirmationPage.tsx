import React from "react";
import { Button } from 'react-bootstrap';

type ConfPageProps = {
    title?: string,
    message?: string,
    returnButton?: Boolean
}


export const ConfirmationPage = ({title, message, returnButton}: ConfPageProps) => {
    console.log('props: ', title, message)
   return  <div className="confirmation-page">
        <h2>{title ? title : 'here is the title'}</h2>
        <p>{message ? message : 'here is the message'}</p>

        {returnButton ? (
            <Button type="button">Return to home</Button>
        ) : ('')}

    </div>
}