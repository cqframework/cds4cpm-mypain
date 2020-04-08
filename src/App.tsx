import React from 'react';
import './App.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { Questionnaire } from './fhir-types/fhir-stu3';

function App() {
  let questionnaire: Questionnaire = {
    resourceType: 'Questionnaire',
    status: 'completed',
    item: [
      {
        linkId: 'link',
        type: 'choice',
        text: 'item 1'
      },
      {
        linkId: 'link',
        type: 'choice',
        text: 'item 2'
      }
    ]
  };

  return (
    <div className="app">
      <header className="app-header">
        <p>
          MyPain Development Branch v2
        </p>
      </header>
      <div>
        <QuestionnaireComponent Questionnaire={questionnaire} />
      </div>
    </div>
  );
}

export default App;
