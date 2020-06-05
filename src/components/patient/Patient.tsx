import React from 'react';
import { fhirclient } from 'fhirclient/lib/types';

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
            <div>
                Patient ID: { this.props.item?.id }
            </div>
            <div>
                Patient Name: { this.props.item?.name[0].given[0] } { this.props.item?.name[0].family }
            </div>
            <div>
                Patient Gender: { this.props.item?.gender }
            </div>
            <div>
                Patient Birth Date: { this.props.item?.birthDate }
            </div>
        </div>
      );
    }
  }
