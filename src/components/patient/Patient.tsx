import React from 'react';
import './Patient.css';
import { fhirclient } from 'fhirclient/lib/types';
import { Jumbotron, Button } from 'react-bootstrap';
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

interface PatientProps {
  item?: fhirclient.FHIR.Patient;
}

interface PatientState {
}

export default class Patient extends React.Component<PatientProps, PatientState> {

  constructor(props: PatientProps) {
    super(props);

    this.state =
    {
    };
  }

  public render(): JSX.Element {
    return (
      <div className="patient-view">
        <Jumbotron className="welcome">
          <h4>Welcome to MyPain, {this.props.item?.name[0].given[0]}.</h4>
          <p className="intro-text mb-5">Run it up the flagpole my capacity is full and incentivization. Bottleneck mice not enough bandwidth. Digital literacy herding cats, and lean into that problem and drill down, so rock Star/Ninja.</p>
          <h4><FontAwesomeIcon icon={faCalendar} /> Appointment</h4>
          <p className="appointment-text mb-5">You are scheduled for a visit with [Clinician Name] on [Appointment date and time]</p>
          <Button variant="outline-secondary" size='lg' className="next-button">Next</Button>
        </Jumbotron>
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
