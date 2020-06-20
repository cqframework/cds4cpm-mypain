import React from 'react';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-r4';
import './QuestionnaireItemComponent.css';
import { Card, ButtonGroup, Button } from 'react-bootstrap'


function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  let currentCardId: any;
  return (
    <Card className={makeClasses("questionnaire-item", props.QuestionnaireItem.linkId === currentCardId ? 'current-card' : '')} id={props.QuestionnaireItem.linkId}>
      <div>{props.QuestionnaireItem.prefix}</div>
      <div>
        <p><span>{props.QuestionnaireItem.linkId}. </span>{props.QuestionnaireItem.text}</p></div>
      <div>
        {
          props.QuestionnaireItem.type === "boolean" ?
            <div className="boolean-type">
              <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: true }])} /> Yes
              <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: false }])} /> No
            </div>
            : props.QuestionnaireItem.type === "choice" ?
              <div className="choice-type">
                {populateChoice(props)}
              </div>
              : props.QuestionnaireItem.type === "quantity" ?
                <div className="quantity-type">
                  <input type="text" onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueQuantity: { value: parseFloat(event.target.value) } }])} /> days
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
    </Card>
  );
}

function populateChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  return (
    <ButtonGroup>
      {
        props.QuestionnaireItem.answerOption?.map((answerOption) => {
          return (<Button key={JSON.stringify(answerOption.valueCoding)} size="sm" variant="outline-secondary" value={JSON.stringify(answerOption.valueCoding)} onClick={(event: any) => props.onChange(props.QuestionnaireItem, [{ valueCoding: JSON.parse(event.target.value) }])}>{answerOption.valueCoding?.display}</Button>);
        })
      }
    </ButtonGroup>
  );
}

const makeClasses = (...classes: any[]) => classes.filter(i => Boolean(i)).join(' ');

export default QuestionnaireItemComponent;