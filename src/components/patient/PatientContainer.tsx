import React from 'react';
// import FHIR from 'fhirclient';
import Patient from './Patient';
import BusySpinner from '../busy-spinner/BusySpinner';
import BusyGroup from '../busy-spinner/BusyGroup';
// import Client from 'fhirclient/lib/Client';
// import { fhirclient } from 'fhirclient/lib/types';

interface PatientContainerProps {
}

interface PatientContainerState {
  patient?: any
  busy: boolean
}

export default class PatientContainer extends React.Component<any, PatientContainerState> {
  constructor(props: PatientContainerProps) {
    super(props);

    this.state =
    {
      busy: true,
      patient: undefined
    };
  }

  componentDidMount() {
    this.setState({busy: this.props.busy, patient: this.props.patient})
  }

  public render(): JSX.Element {
    return (
      <BusyGroup>
        <BusySpinner busy={this.state.busy} />
        <Patient {...this.state} >{this.state.patient}</Patient>
      </BusyGroup>
    );
  }
}
