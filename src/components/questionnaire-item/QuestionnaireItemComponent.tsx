import React from 'react';
import { QuestionnaireItem } from '../../fhir-types/fhir-stu3';
import './QuestionnaireItemComponent.css';

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem }) {
  return (
    <div className="questionnaire-item">
      { props.QuestionnaireItem.text }
    </div>
  );
}

export default QuestionnaireItemComponent;