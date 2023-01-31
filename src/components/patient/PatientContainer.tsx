import React from "react";
// import FHIR from 'fhirclient';
import Patient from "./Patient";
import BusySpinner from "../busy-spinner/BusySpinner";
import BusyGroup from "../busy-spinner/BusyGroup";

interface PatientContainerProps {}

interface PatientContainerState {
  patient?: any;
  busy?: boolean;
}

export default class PatientContainer extends React.Component<
  PatientContainerProps,
  PatientContainerState
> {
  constructor(props: PatientContainerProps) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(nextProps: any) {
    const { busy } = this.props;
    if (nextProps.busy !== busy) {
      this.setState({ busy: busy }, () => {});
    }
  }

  public render(): JSX.Element {
    return (
      <BusyGroup>
        <BusySpinner busy={this.state.busy} />
        <Patient
          {...this.state}
          startQuestionnaire={this.props.startQuestionnaire}
        >
          {this.state.patient}
        </Patient>
      </BusyGroup>
    );
  }
}
