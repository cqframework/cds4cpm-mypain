import React from 'react';
import { QuestionnaireItem } from '../../fhir-types/fhir-stu3';
import './QuestionnaireItemComponent.css';

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem }) {
  return (
    <div className="questionnaire-item">
      <div>{ props.QuestionnaireItem.linkId }. { props.QuestionnaireItem.prefix } { props.QuestionnaireItem.text }</div>
      <div>{ props.QuestionnaireItem.options?.reference }</div>
      <div>
        {
          props.QuestionnaireItem.type === "boolean" ?
            <div>
              <input type="radio" name={props.QuestionnaireItem.linkId} /> Yes
              <input type="radio" name={props.QuestionnaireItem.linkId} /> No
            </div>
          : props.QuestionnaireItem.type === "choice" ?
            <div>
              <select>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
            </div>
          : props.QuestionnaireItem.type === "quantity" ?
            <div>
              <input type="text" /> days
            </div>
          : <div>Unrecognized QuestionnaireItem type: { props.QuestionnaireItem.type }</div>
        }
      </div>
      {/* <div>{ JSON.stringify(props.QuestionnaireItem) }</div> */}
      <div>
        {
          props.QuestionnaireItem.item ? props.QuestionnaireItem.item.map((item, key) => 
            <QuestionnaireItemComponent QuestionnaireItem={item} key={key} />
          ) : null
        }
      </div>
    </div>
  );
}

export default QuestionnaireItemComponent;