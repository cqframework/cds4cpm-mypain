import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { Questionnaire, QuestionnaireResponse, QuestionnaireItem, QuestionnaireResponseItemAnswer } from './fhir-types/fhir-r4';
// import ContentMyPain from './content/mypain-opioid.json';  //mypain-opioid.json';
import { submitQuestionnaireResponse, getQuestionnaire } from './utils/fhirFacadeHelper';
import PatientContainer from './components/patient/PatientContainer';
import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";

interface AppProps {

}

interface AppState {
  SelectedQuestionnaire?: Questionnaire,
  QuestionnaireResponse: QuestionnaireResponse
}

export default class App extends React.Component<AppProps, AppState> {

  // private options: { "value": Questionnaire, "text": string }[] = [
  //   { "value": ContentMyPain, "text": ContentMyPain.title }
  // ];

  constructor(props: AppProps) {
    super(props);
    this.state =
    {
      SelectedQuestionnaire: undefined,
      QuestionnaireResponse: {
        resourceType: "QuestionnaireResponse",
        status: "in-progress",
        item: []
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
  }

  componentDidMount() {
    let ptRef: string;
    let ptDisplay;
    getQuestionnaire()
      .then(questionnaire => {
        FHIR.oauth2.ready()
          .then((client: Client) => client.patient.read())
          .then((patient) => {
            patient.id ? ptRef = patient.id : ptRef = " ";
            ptDisplay = patient.name[0].given[0] + ' ' + patient.name[0].family;
            return this.selectQuestionnaire(questionnaire, ptRef, ptDisplay);
          });
      })
  }

  selectQuestionnaire(selectedQuestionnaire: Questionnaire, ptRef: string, ptDisplay: string): void {
    this.setState({
      SelectedQuestionnaire: selectedQuestionnaire,
      QuestionnaireResponse: {
        ...this.state.QuestionnaireResponse,
        questionnaire: selectedQuestionnaire.id,
        subject: {
          reference: ptRef,
          display: ptDisplay
        },
        item: []
      }
    });
  }

  handleChange(item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]): void {
    console.log('item: ', item);
    console.log('answer: ', answer)
    var newQuestionnaireResponse = this.state.QuestionnaireResponse;
    if (!newQuestionnaireResponse.item) {
      newQuestionnaireResponse.item = [];
      console.log('hit here!')
    }
    var existingResponseIndex = newQuestionnaireResponse.item.findIndex((responseItem) => responseItem.linkId === item.linkId);
    if (existingResponseIndex >= 0) {
      newQuestionnaireResponse.item[existingResponseIndex].answer = answer;
      newQuestionnaireResponse.item[existingResponseIndex].text = item.text;
    }
    else {
      newQuestionnaireResponse.item.push({
        linkId: item.linkId,
        answer: answer,
        text: item.text
      });
    }

    this.setState({
      QuestionnaireResponse: newQuestionnaireResponse
    });
    console.log('newQuestionnaireResponse:', newQuestionnaireResponse)
  }

  submitAnswers(): void {
    submitQuestionnaireResponse(this.state.QuestionnaireResponse);
    //window.location.reload();
  }

  public render(): JSX.Element {
    if (this.state.SelectedQuestionnaire) {
      return (
        <div className="app">
          <header className="app-header">
            <p>
              MyPain Development Branch v2
                      </p>
          </header>
          <PatientContainer />
          <hr />
          <div>
            <QuestionnaireComponent questionnaire={this.state.SelectedQuestionnaire}
              questionnaireResponse={this.state.QuestionnaireResponse}
              onChange={this.handleChange} onSubmit={this.submitAnswers} />
          </div>
          <hr />
          <div>QuestionnaireResponse: {JSON.stringify(this.state.QuestionnaireResponse)}</div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <header className="app-header">
            <p>
              MyPain Development Branch v2
                      </p>
          </header>
          <PatientContainer />
          <hr />
          <div>
          </div>
          <hr />
          <div>QuestionnaireResponse: {JSON.stringify(this.state.QuestionnaireResponse)}</div>
        </div>
      );
    }
  }
}
