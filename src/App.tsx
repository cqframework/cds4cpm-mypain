import React, { createRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { QuestionnaireResponse, QuestionnaireItem, QuestionnaireResponseItemAnswer } from './fhir-types/fhir-r4';
import ContentMyPain from './content/mypain-opioid-group.json';  //mypain-opioid.json';
import { submitQuestionnaireResponse } from './utils/fhirFacadeHelper';
// TODO: add import of  getQuestionnaire 
import PatientContainer from './components/patient/PatientContainer';
import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";
import { Button } from 'react-bootstrap';

interface AppProps {

}

// TODO: remember to assure that it is a proper questionnaire type
interface AppState {
  SelectedQuestionnaire?: any,
  QuestionnaireResponse: QuestionnaireResponse
}

export default class App extends React.Component<AppProps, AppState> {

  questionnaireContainer: any = createRef();
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
    // TODO: re-enable getQuestionnaire 
    // getQuestionnaire()
    // .then(questionnaire => {
    FHIR.oauth2.ready()
      .then((client: Client) => client.patient.read())
      .then((patient) => {
        patient.id ? ptRef = patient.id : ptRef = " ";
        ptDisplay = patient.name[0].given[0] + ' ' + patient.name[0].family;
        return this.selectQuestionnaire(ContentMyPain, ptRef, ptDisplay);
      });
    // })
  }

  selectQuestionnaire(selectedQuestionnaire: any, ptRef: string, ptDisplay: string): void {
    this.setState({
      SelectedQuestionnaire: ContentMyPain,
      QuestionnaireResponse: {
        ...this.state.QuestionnaireResponse,
        questionnaire: ContentMyPain.id,
        subject: {
          reference: 'Patient/' + ptRef,
          display: ptDisplay
        },
        item: []
      }
    });
  }

  handleChange(item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]): void {
    var newQuestionnaireResponse = this.state.QuestionnaireResponse;
    if (!newQuestionnaireResponse.item) {
      newQuestionnaireResponse.item = [];
    }
    var existingResponseIndex = newQuestionnaireResponse.item.findIndex((responseItem) => responseItem.linkId === item.linkId);
    if (existingResponseIndex >= 0) {
      newQuestionnaireResponse.item[existingResponseIndex].answer = answer;
      newQuestionnaireResponse.item[existingResponseIndex].text = item.text;
      if (newQuestionnaireResponse.item[existingResponseIndex].answer) {
        // @ts-ignore
        if (newQuestionnaireResponse.item[existingResponseIndex].answer[0].type === 'valueCoding') {
          // @ts-ignore
          newQuestionnaireResponse.item[existingResponseIndex].answer[0].coding.code.system = answer.coding.code.system;
        }
      }
    }
    else {
      newQuestionnaireResponse.item.push({
        linkId: item.linkId,
        answer: answer,
        text: item.text,
      });
    }

    this.setState({
      QuestionnaireResponse: newQuestionnaireResponse
    });
  }

  formatDateItem(dateItem: number) {
    let returnDateItem: string;
    dateItem < 10 ? returnDateItem = '0' + dateItem : returnDateItem = dateItem.toString();
    return returnDateItem;
  }
  getCurrentDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let zone = date.getTimezoneOffset() / 60;
    //      "2020-06-19T12:05:43-06:00"
    return year + '-' + this.formatDateItem(month) + '-' + this.formatDateItem(day) + 'T' + this.formatDateItem(hours) + ':' + this.formatDateItem(min) + ':' + this.formatDateItem(sec) + '-' + this.formatDateItem(zone) + ':00';
  }

  startQuestionnaire = () => {
    console.log('questionnaire container: ', this.questionnaireContainer);
    if (this.questionnaireContainer.current) {
      this.questionnaireContainer.current.firstChild.firstChild.nextSibling.classList.add('active');
      this.questionnaireContainer.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }

  submitAnswers(): void {
    let returnQuestionnaireResponse = this.state.QuestionnaireResponse;
    returnQuestionnaireResponse.authored = this.getCurrentDate();
    returnQuestionnaireResponse.status = "completed";
    submitQuestionnaireResponse(returnQuestionnaireResponse);
    //window.location.reload();
  }

  setTheme(color: string) {
    document.documentElement.style.setProperty('--color-dark', color);
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
          {/* Testing out themes. // TODO: implement them being passed in via the URL */}
          {/* <Button variant="outline-secondary" size='sm' className="next-button" onClick={() => {this.setTheme('0, 0, 255')}}>blue theme</Button>
          <Button variant="outline-secondary" size='sm' className="next-button" onClick={() => {this.setTheme('0,0,0')}}>black theme</Button>
          <Button variant="outline-secondary" size='sm' className="next-button" onClick={() => {this.setTheme('24,128,56')}}>green theme</Button>
          <Button variant="outline-secondary" size='sm' className="next-button" onClick={() => {this.setTheme('128,0,128')}}>purple theme</Button> */}
          <PatientContainer />
          <Button variant="outline-secondary" size='lg' className="next-button" onClick={this.startQuestionnaire}>Next</Button>
          <hr />
          <div ref={this.questionnaireContainer}>
            <QuestionnaireComponent questionnaire={this.state.SelectedQuestionnaire}
              questionnaireResponse={this.state.QuestionnaireResponse}
              onChange={this.handleChange} onSubmit={this.submitAnswers} />
          </div>
          <hr />
          <div className="response-container">QuestionnaireResponse: {JSON.stringify(this.state.QuestionnaireResponse)}</div>
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
          <div className="response-container">QuestionnaireResponse: {JSON.stringify(this.state.QuestionnaireResponse)}</div>
        </div>
      );
    }
  }
}
