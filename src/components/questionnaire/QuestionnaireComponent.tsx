import React from 'react';
import './QuestionnaireComponent.css';
import { Questionnaire } from '../../fhir-types/fhir-stu3';
import QuestionnaireItemComponent from '../questionnaire-item/QuestionnaireItemComponent';

function QuestionnaireComponent(props: { Questionnaire: Questionnaire }) {
  return (
    <div className="questionnaire">
      Questionnaire:
        {
          props.Questionnaire.item ? props.Questionnaire.item.map((item, key) => 
            <QuestionnaireItemComponent QuestionnaireItem={item} key={key} />
          ) : null
        }
    </div>
  );
}

export default QuestionnaireComponent;