import React from 'react';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-r4';
import './QuestionnaireItemComponent.css';

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  let currentCardId: any;
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
              : props.QuestionnaireItem.type === "quantity" ?
                <div className="quantity-type">
                  <input type="text" onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueQuantity: { value: parseFloat(event.target.value) } }])} /> days
                </div>
                : props.QuestionnaireItem.type === "open-choice" ?
                  <div className="choice-type">
                    {populateMultipleChoice(props)}
                  </div>
                    : props.QuestionnaireItem.type === "text" ?
                      <div className="text-type">
                        <input type="text" onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueString: event.target.value }])} />
                      </div>
                      : <div>Unrecognized QuestionnaireItem type: {props.QuestionnaireItem.type}</div>
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
  return(
    <select onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueCoding: JSON.parse(event.target.value) }])}>
        {
            props.QuestionnaireItem.answerOption?.map((answerOption) => {
              return(<option key={JSON.stringify(answerOption.valueCoding)} value={JSON.stringify(answerOption.valueCoding)}>{answerOption.valueCoding?.display}</option>);
            })
        }
    </select>
  );
}

function populateMultipleChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  return (
    // fill with multiple choice buttons
    <div>
      {
        props.QuestionnaireItem.answerOption?.map((answerOption) => {

          return (<p key={JSON.stringify(answerOption.valueCoding)}>{answerOption.valueCoding?.display}</p>)
        })
      }
    </div>
  );
}

const makeClasses = (...classes: any[]) => classes.filter(i => Boolean(i)).join(' ');

export default QuestionnaireItemComponent;