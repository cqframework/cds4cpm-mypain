import React from 'react';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-stu3';
import './QuestionnaireItemComponent.css';

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  return (
    <div className="questionnaire-item">
        <div>{ props.QuestionnaireItem.prefix }</div>
          <div>{ props.QuestionnaireItem.linkId }. { props.QuestionnaireItem.text }</div>
      <div>{ props.QuestionnaireItem.options?.reference }</div>
      <div>
        {
          props.QuestionnaireItem.type === "boolean" ?
            <div>
              <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: true }])} /> Yes
              <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: false }])} /> No
            </div>
          : props.QuestionnaireItem.type === "choice" ?
            <div>
              <select onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueString: event.target.value }])}>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
            </div>
          : props.QuestionnaireItem.type === "quantity" ?
            <div>
              <input type="text" onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueQuantity: { value: parseFloat(event.target.value) }}])}  /> days
            </div>
          : props.QuestionnaireItem.type === "text" ?
              <div>
                  <input type="text" onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueString:event.target.value}])}  />
              </div>
          : <div>Unrecognized QuestionnaireItem type: { props.QuestionnaireItem.type }</div>
        }
      </div>
      {/* <div>{ JSON.stringify(props.QuestionnaireItem) }</div> */}
      <div>
        {
          props.QuestionnaireItem.item ? props.QuestionnaireItem.item.map((item, key) => 
            <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={props.onChange} />
          ) : null
        }
      </div>
    </div>
  );
}

export default QuestionnaireItemComponent;