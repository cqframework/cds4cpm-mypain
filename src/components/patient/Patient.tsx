import React from "react";
import "./Patient.css";
import { fhirclient } from "fhirclient/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

interface PatientProps {
  item?: fhirclient.FHIR.Patient;
  patient?: any;
  busy?: boolean;
  startQuestionnaire: Function;
}

interface PatientState {}

export default class Patient extends React.Component<
  PatientProps,
  PatientState
> {
  constructor(props: PatientProps) {
    super(props);
    this.state = {};
  }

  closeWindow = () => {
    window.close();
  };
  public render(): JSX.Element {
    return (
      // Internal content on start page
      <div className="pt-5 px-3">
        <div className="row justify-content-center pb-5">
          <div className="col-8 mb-3">
            <div
              className="card position-relative bg-lightgreen border-0 card-btn card-btn-continue"
              onClick={() => this.props.startQuestionnaire()}
            >
              <div className="card-body d-flex flex-column text-center text-light">
                <p className="fw-bold px-3">
                  Yes, I want to discuss pain at my next visit.
                </p>
                <p className="mb-0">CONTINUE TO SURVEY</p>
              </div>
              <div className="continue-icon-bg position-absolute top-50 start-100 translate-middle"></div>
              <FontAwesomeIcon
                className="continue-icon position-absolute top-50 start-100 translate-middle"
                icon={faCircleRight as IconProp}
                size={"4x" as SizeProp}
              />
            </div>
          </div>
          <div className="col-8">
            <div
              className="card position-relative bg-lightgray border-0 card-btn card-btn-exit"
              onClick={this.closeWindow}
            >
              <div className="card-body d-flex flex-column text-center text-light">
                <p className="fw-bold px-3">
                  No, my visit is about something else.
                </p>
                <p className="mb-0">EXIT SURVEY</p>
              </div>
              <div className="exit-icon-bg position-absolute top-50 start-0 translate-middle"></div>
              <FontAwesomeIcon
                className="exit-icon position-absolute top-50 start-0 translate-middle"
                icon={faTimesCircle as IconProp}
                size={"4x" as SizeProp}
              />
            </div>
          </div>
        </div>
        <div className="px-2">
          <p className="text-center">
          <strong>IF USING PUBLIC DEVICE:</strong> If you do not log off or close your browser after you complete the survey, your information may be available to other people that use this computer for up to 1 hour.
          </p>
        </div>
      </div>
    );
  }
}
