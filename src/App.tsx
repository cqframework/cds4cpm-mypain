import React from 'react';
import './App.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { Questionnaire, QuestionnaireResponse, QuestionnaireItem, QuestionnaireResponseItemAnswer } from './fhir-types/fhir-r4';
import ContentMyPain from './content/mypain-opioid.json';
import returnResponse from "./utils/returnResponse";

interface AppProps {

}

interface AppState {
  SelectedQuestionnaire: Questionnaire,
  QuestionnaireResponse: QuestionnaireResponse
}

export default class App extends React.Component<AppProps, AppState> {
  
  private options: { "value": Questionnaire, "text": string }[] = [
      { "value": ContentMyPain, "text": ContentMyPain.title }
  ];

  constructor(props: AppProps) {
      super(props);
      this.state =
        {   
          SelectedQuestionnaire: this.options[0].value,
          QuestionnaireResponse: {
            resourceType: "QuestionnaireResponse",
            status: "in-progress",
//            questionnaire: { id: this.options[0].value.id },
            questionnaire: this.options[0].value.id ,
            item: []
          }
        };

      this.handleChange = this.handleChange.bind(this);
      this.submitAnswers = this.submitAnswers.bind(this);
  }

  selectQuestionnaire(selected: Questionnaire): void {
    this.setState({ 
      SelectedQuestionnaire: selected,
      QuestionnaireResponse: {
        resourceType: "QuestionnaireResponse",
        status: "in-progress",
//        questionnaire: { id: selected.id },
        questionnaire: selected.id,
        item: []
      }
    });

  }

  handleChange(item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]): void {
     //alert(JSON.stringify(item));
    // alert(answer);
    var newQuestionnaireResponse = this.state.QuestionnaireResponse;
    if (!newQuestionnaireResponse.item)
    {
      newQuestionnaireResponse.item = [];
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
        text:item.text

      });
    }

    this.setState({
      QuestionnaireResponse: newQuestionnaireResponse
    });
  }

  submitAnswers(){
      returnResponse(this.state.QuestionnaireResponse);
      window.location.reload();
  }

  public render(): JSX.Element {
  return (
      <div className="app">
        <header className="app-header">
          <p>
            MyPain Development Branch v2
          </p>
        </header>
        <div className="options">
          {
            this.options.map((option, key) => 
              <div key={key}>
                <button onClick={() => this.selectQuestionnaire(option.value)}>{option.text}</button>
              </div>
            )
          }
        </div>
          <div className="options">
              <button className="submit-button" onClick={() => this.submitAnswers()}>Submit</button>
          </div>
        <hr/>
        <div>
            <QuestionnaireComponent questionnaire={this.state.SelectedQuestionnaire} questionnaireResponse={this.state.QuestionnaireResponse} onChange={this.handleChange} />
        </div>
        <hr/>
        <div>QuestionnaireResponse: { JSON.stringify(this.state.QuestionnaireResponse) }</div>
      </div>
    );
  }
}
