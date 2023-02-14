import React from "react";
import "./ErrorPage.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ErrorPage = (props: any) => {
  return (
    <div className="d-flex justify-content-center align-items-center error-page px-4">
      <div className="text-center">
        {" "}
        <FontAwesomeIcon
          size="5x"
          icon={faTriangleExclamation}
          className="error-icon"
        />
        <h1 className="mt-3">Oops!</h1>
        <p>{props.location.state}</p>
        <Link to="/">
          <button className="btn btn-secondary-custom" type="button">
            Return to home
          </button>
          {/* <Button className="continue-button" type="button">
            Return to home
          </Button> */}
        </Link>
      </div>
    </div>
  );
};
