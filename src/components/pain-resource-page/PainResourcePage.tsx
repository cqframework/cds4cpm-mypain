import React from "react";
import "./PainResourcePage.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHistory } from "react-router-dom";

export const PainResourcePage = () => {
  const history = useHistory();
  //should i use a static link? what are the implications?

  return (
    <div className="app container pain-resource-page">
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
            <p className="text-center fs-5 fw-bold">HELPFUL PAIN RESOURCES</p>
            <p>
              The following websites may have information that could help you
              with your chronic pain.
            </p>
            <div className="card border-0 mb-2 resource-card">
              <div className="card-body">
                <div className="d-flex">
                  <div className="p-0 flex-grow-1">
                    <h6 className="card-title">
                      <a
                        href="https://pami.emergency.med.jax.ufl.edu/resources/pami-educational-pain-videos/"
                        className="stretched-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pain Resources from University of Florida
                      </a>
                    </h6>
                    <p className="mb-0">
                      Short videos with helpful tips for managing pain,
                      including alternative therapies.{" "}
                      <span>
                        {" "}
                        <FontAwesomeIcon
                          className=""
                          icon={faArrowUpRightFromSquare as IconProp}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-0 mb-2 resource-card">
              <div className="card-body">
                <div className="d-flex">
                  <div className="p-0 flex-grow-1">
                    <h6 className="card-title">
                      <a
                        href="https://painguide.com/"
                        className="stretched-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pain Guide from University of Michigan
                      </a>
                    </h6>
                    <p className="mb-0">
                      Comprehensive and up-to-date resource for evidence-based
                      approaches to chronic pain.{" "}
                      <span>
                        {" "}
                        <FontAwesomeIcon
                          className=""
                          icon={faArrowUpRightFromSquare as IconProp}
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-grid gap-1 mt-3 mb-5">
              <button
                className="btn btn-secondary-custom"
                // style={{ width: "50%" }}
                type="button"
                onClick={() => {
                  history.goBack();
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
