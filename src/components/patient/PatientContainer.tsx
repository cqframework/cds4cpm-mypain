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
  busy?: boolean
}

export default class PatientContainer extends React.Component<any, PatientContainerState> {
  constructor(props: PatientContainerProps) {
    console.log('patient container props: ', props)
    super(props);

    this.state =
    {
      
    };
  }

  componentDidUpdate(nextProps: any) {
    const { busy } = this.props;
    console.log('patient busy: ', busy)
    if (nextProps.busy !== busy) {
        this.setState({busy: busy}, () => {
          console.log('patient container state', this.state);
        })
    }
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
