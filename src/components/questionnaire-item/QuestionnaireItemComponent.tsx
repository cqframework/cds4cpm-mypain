import React, { createRef } from 'react';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-r4';
import './QuestionnaireItemComponent.css';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import MultiSelectButtonComponent from '../multi-select-button/MultiSelectButton';
import { faQuestionCircle, faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  let currentCardId: any;
  let questionnaireItemRef: any = createRef();

  function handleNextQuestionScroll(linkId: number) {
    console.log('linkId: ', linkId);
    console.log('questionnaire container: ', questionnaireItemRef);
    if (questionnaireItemRef.current.id === linkId) {
      questionnaireItemRef.current.nextSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }
  function handlePreviousQuestionScroll(linkId: number) {
    console.log('linkId: ', linkId);
    console.log('questionnaire container: ', questionnaireItemRef);
    if (questionnaireItemRef.current.id === linkId) {
      questionnaireItemRef.current.previousSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }

  return (
    <Card ref={questionnaireItemRef} className={makeClasses("questionnaire-item", props.QuestionnaireItem.linkId === currentCardId ? 'current-card' : '')} id={props.QuestionnaireItem.linkId}>
      <button value={props.QuestionnaireItem.linkId} onClick={(event: any) => handlePreviousQuestionScroll(event.target.value)}> <FontAwesomeIcon icon={faArrowAltCircleLeft} /> </button>
      <div className="prefix-text">{props.QuestionnaireItem.prefix}</div>
      <div>
        <p><FontAwesomeIcon icon={faQuestionCircle} />  {props.QuestionnaireItem.text}</p></div>
      <div>
        {
          props.QuestionnaireItem.type === "boolean" ?
            <div className="boolean-type">
              <div className="radio-button">
                <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: true }])} /> Yes
              </div>
              <div className="radio-button">
                <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: false }])} /> No
              </div>
            </div>
            : props.QuestionnaireItem.type === "choice" ?
              <div className="choice-type">
                {populateChoice(props)}
              </div>
              : props.QuestionnaireItem.type === "quantity" ?
                <div className="quantity-type">
                  <input type="text" onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueQuantity: { value: parseFloat(event.target.value) } }])} /> days
                </div>
                : props.QuestionnaireItem.type === "open-choice" ?
                  <div className="open-choice-type">
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
      <Button variant="outline-secondary" size='lg' className="next-button" value={props.QuestionnaireItem.linkId} onClick={(event: any) => handleNextQuestionScroll(event.target.value)}>Next</Button>
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

function populateMultipleChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  return (
    <div>
      {
        props.QuestionnaireItem.answerOption?.map((answerOption) => {
          return <MultiSelectButtonComponent key={JSON.stringify(answerOption.valueCoding)}  {...answerOption}>{answerOption.valueCoding?.display}</MultiSelectButtonComponent>
        })
      }
    </div>
  );
}

// function getMultiChoiceValue(valueData: any) {
//   console.log('multi choice data: ', valueData);
// }

const makeClasses = (...classes: any[]) => classes.filter(i => Boolean(i)).join(' ');

export default QuestionnaireItemComponent;