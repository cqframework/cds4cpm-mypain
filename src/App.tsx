import React from 'react';
import './App.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { Questionnaire } from './fhir-types/fhir-stu3';
import ContentNaive from './content/example-naive.json';
import ContentGeneral from './content/example-general.json';
import ContentZika from './content/example-zika.json';

interface AppProps {

}

interface AppState {
  SelectedQuestionnaire: Questionnaire
}

export default class App extends React.Component<AppProps, AppState> {
  
  private options: { "value": Questionnaire, "text": string }[] = [
    { "value": ContentNaive, "text": ContentNaive.title },
    { "value": ContentGeneral, "text": ContentGeneral.title },
    { "value": ContentZika, "text": ContentZika.title }
  ];

  constructor(props: AppProps) {
      super(props);

      this.state = 
        {   
          SelectedQuestionnaire: this.options[0].value
        };
  }

  selectQuestionnaire(selected: Questionnaire): void {
    this.setState({ SelectedQuestionnaire: selected });
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
            this.options.map((option, value) => 
              <div>
                <button onClick={() => this.selectQuestionnaire(option.value)}>{option.text}</button>
              </div>
            )
          }
        </div>
        <hr/>
        <div>
          <QuestionnaireComponent Questionnaire={this.state.SelectedQuestionnaire} />
        </div>
      </div>
    );
  }
}
