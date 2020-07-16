import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { Questionnaire, QuestionnaireResponse, QuestionnaireItem, QuestionnaireResponseItemAnswer } from './fhir-types/fhir-r4';
import ContentMyPain from './content/mypain-opioid.json';  //mypain-opioid.json';
import { submitQuestionnaireResponse, getQuestionnaire } from './utils/fhirFacadeHelper';
import PatientContainer from './components/patient/PatientContainer';
import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";

interface AppProps {

}

interface AppState {
  SelectedQuestionnaire?: any,
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

  selectQuestionnaire(selectedQuestionnaire: any, ptRef: string, ptDisplay: string): void {
    console.log('selected:', ContentMyPain);
    this.setState({
      SelectedQuestionnaire: ContentMyPain,
      QuestionnaireResponse: {
        ...this.state.QuestionnaireResponse,
        questionnaire: ContentMyPain.id,
          subject:{
            reference:'Patient/' + ptRef,
            display:ptDisplay
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
        if(newQuestionnaireResponse.item[existingResponseIndex].answer){
            // @ts-ignore
            if(newQuestionnaireResponse.item[existingResponseIndex].answer[0].type === 'valueCoding'){
                // @ts-ignore
                newQuestionnaireResponse.item[existingResponseIndex].answer[0].coding.code.system = answer.coding.code.system;
            }
        }
    }
    else {
      newQuestionnaireResponse.item.push({
        linkId: item.linkId,
        answer: answer,
        text:item.text,
      });
    }

    this.setState({
      QuestionnaireResponse: newQuestionnaireResponse
    });
    console.log('newQuestionnaireResponse:', newQuestionnaireResponse)
  }

  formatDateItem(dateItem: number){
      let returnDateItem : string;
      dateItem < 10 ? returnDateItem = '0' + dateItem : returnDateItem = dateItem.toString();
      return returnDateItem;
  }
  getCurrentDate(){
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hours = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      let zone = date.getTimezoneOffset() / 60;
//      "2020-06-19T12:05:43-06:00"
      return year + '-' + this.formatDateItem(month) + '-' + this.formatDateItem(day) + 'T' +  this.formatDateItem(hours) + ':' + this.formatDateItem(min) + ':' + this.formatDateItem(sec) + '-' + this.formatDateItem(zone) + ':00';
  }

  submitAnswers(): void {
      let returnQuestionnaireResponse = this.state.QuestionnaireResponse;
      returnQuestionnaireResponse.authored = this.getCurrentDate();
      returnQuestionnaireResponse.status = "completed";
      submitQuestionnaireResponse(returnQuestionnaireResponse);
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
