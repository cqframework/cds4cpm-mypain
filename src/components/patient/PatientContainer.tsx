import React from 'react';
import FHIR from 'fhirclient';
import Patient from './Patient';
import BusySpinner from '../busy-spinner/BusySpinner';
import BusyGroup from '../busy-spinner/BusyGroup';
import Client from 'fhirclient/lib/Client';
import { fhirclient } from 'fhirclient/lib/types';

interface PatientContainerProps {
}

interface PatientContainerState {
  item?: fhirclient.FHIR.Patient;
  busy: boolean;
}

export default class PatientContainer extends React.Component<PatientContainerProps, PatientContainerState> {
  constructor(props: PatientContainerProps) {
    super(props);

    this.state = 
      {   
        busy: true,
        item: undefined
      };
  }
  
  componentDidMount() {
    this.setState({busy: true});
    // First get our authorized client and send the FHIR release to the next step
    //let client: Client, release: number, library: Library;
    FHIR.oauth2.ready()
        // TODO: support multiple library versions?
        /*
        .then((clientArg: Client) => {
          client = clientArg;
          return client.getFhirRelease();
        })
        // then remember the release for later and get the release-specific library
        .then((releaseNum) => {
          release = releaseNum;
          library = getLibrary(release);
        })
        */
        // then query the FHIR server for the patient, sending it to the next step
        .then((client: Client) => client.patient.read())
        // then gather all the patient's relevant resource instances and send them in a bundle to the next step
        .then((patient) => {
            this.setState({ item: patient, busy: false });
        });
  }
  
  public render(): JSX.Element {
    return (
        <BusyGroup>
          <BusySpinner busy={this.state.busy} />
          <Patient { ...this.state } ></Patient>
        </BusyGroup>
    );
  }
}
