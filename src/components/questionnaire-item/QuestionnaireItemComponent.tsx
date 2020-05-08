import React from 'react';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-r4';
import './QuestionnaireItemComponent.css';

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  return (
    <div className="questionnaire-item">
        <div>{ props.QuestionnaireItem.prefix }</div>
          <div>{ props.QuestionnaireItem.linkId }. { props.QuestionnaireItem.text }</div>
      <div>
        {
          props.QuestionnaireItem.type === "boolean" ?
            <div>
              <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: true }])} /> Yes
              <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: false }])} /> No
            </div>
          : props.QuestionnaireItem.type === "choice" ?
            <div>
                {populateChoice(props)}
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

function populateChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }){
    if(props.QuestionnaireItem.answerValueSet === 'http://rti.com/fhir/rti/ValueSet/pain-assessments-intensity'){
        return(
            <select onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueString: event.target.value }])}>
                <option></option>
                <option>no pain</option>
                <option>mild pain</option>
                <option>moderate pain</option>
                <option>severe pain</option>
                <option>very severe pain</option>
            </select>
        );
    }
    if(props.QuestionnaireItem.answerValueSet === 'http://rti.com/fhir/rti/ValueSet/pain-assessments-interference'){
        return(
            <select onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueString: event.target.value }])}>
                <option></option>
                <option>Not at all</option>
                <option>A little bit</option>
                <option>Somewhat</option>
                <option>Quite a bit</option>
                <option>Very much</option>
            </select>
        );
    }
}

export default QuestionnaireItemComponent;