import React from 'react';
import './Patient.css';
import { fhirclient } from 'fhirclient/lib/types';
// import { Button } from 'react-bootstrap';

interface PatientProps {
  item?: fhirclient.FHIR.Patient;
}

interface PatientState {
}

export default class Patient extends React.Component<PatientProps, PatientState> {

  constructor(props: PatientProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className="patient-view">
        <div className="app-title-container">
          <h2>MyPAIN</h2>
          <p className='tagline-text'>Just what your doctor ordered, My Pain Assessment and Information Needs (MyPAIN).</p>
        </div>
        <div className="welcome">
          {/* , {this.props.item?.name[0].given[0]} */}
          <h4>Welcome to MyPain.</h4>
          <p className="intro-text mb-5">MyPAIN is a secure tool to help you are your provider make the best decisions about managing your pain.</p>
        </div>
        <div className="intro-container">
          <p>Your doctor and your care team see that your upcoming visit may be related to managing pain. We’d like to learn more about the pain you’re experiencing so we can work together to help you feel better. Please take a few minutes to share your health and care goals with us. </p>
        </div>
        {/* <div>
          Patient ID: {this.props.item?.id}
        </div>
        <div>
          Patient Name: {this.props.item?.name[0].given[0]} {this.props.item?.name[0].family}
        </div>
        <div>
          Patient Gender: {this.props.item?.gender}
        </div>
        <div>
          Patient Birth Date: {this.props.item?.birthDate}
        </div> */}
      </div>
    );
  }


}
