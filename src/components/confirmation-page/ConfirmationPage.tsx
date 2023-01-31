import React from "react";
import "./ConfirmationPage.css";
import { faUserDoctor, faAt } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

export const ConfirmationPage = () => {
  return (
    <div className="app container confirmation-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5 p-0">
          <header className="app-header">
            <img
              className="mypain-header-logo"
              src={`${process.env.PUBLIC_URL}/assets/images/My_Pain_LOGO_FINAL.jpg`}
              alt="MyPain Logo"
            />
          </header>
          <div className="pt-5 px-3">
            <p className="text-center fs-5 fw-bold">Thank You!</p>
            <div className="d-flex pt-3">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minWidth: "64px" }}
              >
                <FontAwesomeIcon
                  className=""
                  icon={faPaperPlane as IconProp}
                  size={"2x" as SizeProp}
                />
              </div>
              <div className="py-3 flex-grow-1">
                <p className="m-0">
                  Your responses have been sent to your doctor.
                </p>
              </div>
            </div>

            <div className="d-flex pt-2">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minWidth: "64px" }}
              >
                <FontAwesomeIcon
                  className=""
                  icon={faUserDoctor as IconProp}
                  size={"2x" as SizeProp}
                />
              </div>
              <div className="py-3 flex-grow-1">
                <p className="m-0">
                  Remind your doctor to review the information during your
                  visit.
                </p>
              </div>
            </div>

            <div className="d-flex pt-2">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minWidth: "64px" }}
              >
                <FontAwesomeIcon
                  icon={faAt as IconProp}
                  size={"2x" as SizeProp}
                />
              </div>
              <div className="py-3 flex-grow-1">
                <p className="m-0">
                  Lookout for a MyUFHealth message with{" "}
                  <Link to="/pain-resource">pain resources</Link> and a{" "}
                  <Link to="/pain-response">copy of your responses</Link>.
                </p>
              </div>
            </div>
            <p className="text-center pt-5">
              You may close this browser window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
