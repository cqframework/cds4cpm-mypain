import React from 'react';
import { QuestionnaireItem } from '../../fhir-types/fhir-stu3';
import './QuestionnaireItemComponent.css';

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem }) {
  return (
    <div className="questionnaire-item">
      { props.QuestionnaireItem.text }
      { JSON.stringify(props.QuestionnaireItem) }
    </div>
  );
}

export default QuestionnaireItemComponent;