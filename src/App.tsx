import React, { createRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { Questionnaire, QuestionnaireResponse, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from './fhir-types/fhir-r4';
// import ContentMyPain from './content/mypain-formtool-2.json';  //mypain-opioid.json';
import { submitQuestionnaireResponse, getQuestionnaire } from './utils/fhirFacadeHelper';
// TODO: add import of  getQuestionnaire 
import PatientContainer from './components/patient/PatientContainer';
import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";
import { fhirclient } from 'fhirclient/lib/types';
import { Button } from 'react-bootstrap';
import { InfoModal } from './components/info-modal/InfoModal';
import { Redirect } from 'react-router-dom';
import pkg from '../package.json'
import pathPrefix from './helpers/pathPrefix'

interface AppProps {

}

interface AppState {
  showModal: Boolean,
  busy: Boolean,
  Status: string,
  Patient?: fhirclient.FHIR.Patient,
  ErrorMessage?: string,
  SelectedQuestionnaire?: Questionnaire,
  QuestionnaireResponse: QuestionnaireResponse,
  ServerUrl: []
}

export default class App extends React.Component<AppProps, AppState> {
  appVersion = pkg.version;
  questionnaireContainer: any = createRef();
  handleModal: any = createRef();
  constructor(props: AppProps) {
    super(props);
    this.state =
    {
      showModal: false,
      Status: 'not-started',
      ErrorMessage: undefined,
      busy: true,
      Patient: undefined,
      SelectedQuestionnaire: undefined,
      QuestionnaireResponse: {
        resourceType: "QuestionnaireResponse",
        status: "in-progress",
        item: []
      },
      ServerUrl: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.startQuestionnaire = this.startQuestionnaire.bind(this);
  }
  ptRef: string | undefined;
  ptDisplay: any;

  componentDidMount() {
    getQuestionnaire(this.state.ServerUrl)
      .then(questionnaire => {
        const processQuestionnaire = (p: any) => {
          return (p as Questionnaire)
        }
        let updatedQuestionnaire = processQuestionnaire(questionnaire);

        FHIR.oauth2.ready()
          .then((client: Client) => client.patient.read())
          .then((patient) => {
            this.setState({ Patient: patient, busy: false })
            patient.id ? this.ptRef = patient.id : this.ptRef = " ";
            this.ptDisplay = patient.name[0].given[0] + ' ' + patient.name[0].family;
            return this.selectQuestionnaire(updatedQuestionnaire, this.ptRef, this.ptDisplay);;
          }).catch(error => {
            this.setState({ busy: false, Status: 'error', ErrorMessage: error.message }, () => {
              console.log('err: ', error.message)
            })
          });
      }).catch(error => {
        this.setState({ busy: false, Status: 'error', ErrorMessage: error.message }, () => {
          console.log('err: ', error.message)
        })
      })
  }

  selectQuestionnaire(selectedQuestionnaire: Questionnaire, ptRef: string, ptDisplay: string): void {
    this.setState({
      SelectedQuestionnaire: selectedQuestionnaire,
      QuestionnaireResponse: {
        ...this.state.QuestionnaireResponse,
        questionnaire: this.state.ServerUrl.pop(),
        subject: {
          reference: 'Patient/' + ptRef,
          display: ptDisplay
        },
        item: []
      }
    });
  }

  handleChange(item: QuestionnaireResponseItem, answer?: QuestionnaireResponseItemAnswer[]): void {
    this.setState(state => {
      for (let i = 0; i < state.QuestionnaireResponse.item!.length; i++) {
        if (item.linkId === state.QuestionnaireResponse.item![i].linkId) {
          state.QuestionnaireResponse.item![i] = item;
          state.QuestionnaireResponse.item!.splice(i, 1)
        }
      }
      const QuestionnaireResponse = {
        ...this.state.QuestionnaireResponse,
        resourceType: state.QuestionnaireResponse.resourceType,
        status: state.QuestionnaireResponse.status,
        item: state.QuestionnaireResponse.item!.concat(item)
      };
      return {

        QuestionnaireResponse
      }

    }, () => {
      // console.log('Questionnaire RESPONSE: ', this.state.QuestionnaireResponse);
    })
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
    this.setState({ Status: 'in-progress' }, () => {
      if (this.questionnaireContainer.current) {
        this.questionnaireContainer.current.firstChild.firstChild.classList.add('active');
        this.questionnaireContainer.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }
    });
  }

  // preparing to be able to go directly to the question to edit the response
  // this will go in the onEdit property of QuestionnaireComponent
  goToEditQuestionnaire = () => {
    this.setState({ Status: 'in-progress' }, () => {
      if (this.questionnaireContainer.current) {
        this.questionnaireContainer.current.firstElementChild.children[this.state.SelectedQuestionnaire?.item?.length || 0].classList.add('active');
        this.questionnaireContainer.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }

    });
  }

  handleOpenModal = () => {
    this.handleModal.current.handleShow();
  }


  submitAnswers(): void {
    this.setState(state => {
      const QuestionnaireResponse = {
        ...this.state.QuestionnaireResponse,
        resourceType: state.QuestionnaireResponse.resourceType,
        authored: this.getCurrentDate(),
        status: "completed",
        meta: this.state.SelectedQuestionnaire?.meta,
        item: state.QuestionnaireResponse.item
      };
      return {
        QuestionnaireResponse,
        busy: true
      }
    }, () => {
      submitQuestionnaireResponse(this.state.QuestionnaireResponse)
        .then(res => {
          this.setState({ Status: 'completed', busy: false })
          console.log("res: ", res);
        })
        .catch(error => {
          this.setState({ Status: 'error', busy: false, ErrorMessage: error.message })
          console.error(error);
        });
    })
  }

  setTheme(color: string) {
    document.documentElement.style.setProperty('--color-dark', color);
  }

  public render(): JSX.Element {
    // if (window.MSCompatibleInfo != null) {
    //   alert('IE is not allowed please use Chrome!')
    //   throw new Error('IE is not allowed please use Chrome!');
    // }
    if (this.state.Status === "completed") {
      return <Redirect push to={`${pathPrefix}/confirmation`} />;
    }
    if (this.state.Status === "error") {
      return <Redirect push to={
        {
          pathname: "/error/",
          state: this.state.ErrorMessage
        }
      } />;
    }
    if (this.state.SelectedQuestionnaire) {
      return (
        <div className="app">
          <header className="app-header">
            {/* <p>
              MyPain &emsp;&emsp;v {this.appVersion}
            </p> */}
            <img className="mypain-header-logo" src={`${process.env.PUBLIC_URL}/assets/images/My_Pain_LOGO_FINAL.jpg`} alt=""/><p>v{this.appVersion}</p>

          </header>
          {this.state.Status !== 'in-progress' ? (
            <div>
              <div className="patient-container">

                <PatientContainer patient={this.state.Patient} busy={this.state.busy} />
                <Button variant="outline-secondary" size='lg' className="next-button" onClick={this.startQuestionnaire}>Next</Button>
              </div>
            </div>
          ) : (
              <div ref={this.questionnaireContainer}>
                <QuestionnaireComponent questionnaire={this.state.SelectedQuestionnaire}
                  questionnaireResponse={this.state.QuestionnaireResponse} onEdit={this.goToEditQuestionnaire}
                  onChange={this.handleChange} onSubmit={(event: any) => { this.handleOpenModal() }} />
                <InfoModal ref={this.handleModal} show={this.state.showModal} onSubmit={this.submitAnswers}></InfoModal>
                {/* <hr /> */}
              </div>
            )}

          {/* <hr /> */}
          {/* <div className="response-container">QuestionnaireResponse: {JSON.stringify(this.state.QuestionnaireResponse)}</div> */}
        </div>
      );
    } else {
      return (
        <div className="app">
          <header className="app-header">
            <p>
              MyPain &emsp;&emsp;v {this.appVersion}
            </p>
          </header>
          <div className="patient-container">
            <PatientContainer patient={this.state.Patient} busy={this.state.busy} />
          </div>
          {/* <hr /> */}
          <div>
          </div>
          {/* <hr /> */}
          {/* <div className="response-container">QuestionnaireResponse: {JSON.stringify(this.state.QuestionnaireResponse)}</div> */}
        </div>
      );
    }
  }
}