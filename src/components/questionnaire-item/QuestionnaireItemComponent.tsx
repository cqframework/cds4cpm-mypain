import React, { createRef } from 'react';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-r4';
import './QuestionnaireItemComponent.css';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import MultiSelectButtonComponent from '../multi-select-button/MultiSelectButton';
import { faQuestionCircle, faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  let questionnaireItemRef: any = createRef();
  // let activeButtonRef: any = createRef();

  function handleNextQuestionScroll(linkId: number) {
    if (questionnaireItemRef.current.id === linkId) {
      questionnaireItemRef.current.nextSibling.classList.add('active')
      questionnaireItemRef.current.classList.remove('active')
      questionnaireItemRef.current.nextSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }
  function handlePreviousQuestionScroll(linkId: number) {
    if (questionnaireItemRef.current.id === linkId) {
      questionnaireItemRef.current.previousSibling.classList.add('active')
      questionnaireItemRef.current.classList.remove('active')
      questionnaireItemRef.current.previousSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }


  return (
    <Card ref={questionnaireItemRef} className={"questionnaire-item"} id={props.QuestionnaireItem.linkId}>

      {props.QuestionnaireItem.linkId === '1' ? ('')
        :
        (
          <Button className="btn-outline-secondary previous-button"
            value={props.QuestionnaireItem.linkId}
            onClick={(event: any) => handlePreviousQuestionScroll(event.target.value)}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </Button>
        )}
      {}
      <div className="prefix-text">
        {props.QuestionnaireItem.prefix}</div>
      <div>
        <p><FontAwesomeIcon icon={faQuestionCircle} />  {props.QuestionnaireItem.text}</p></div>
      <div>
        {
          props.QuestionnaireItem.type === "boolean" ?
            <div className="boolean-type">
              <div className="radio-button">
                <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: true }])} /> <label htmlFor={props.QuestionnaireItem.linkId}> Yes</label>
              </div>
              <div className="radio-button">
                <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: false }])} /><label htmlFor={props.QuestionnaireItem.linkId}> No</label>
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
                : props.QuestionnaireItem.type === "group" ?
                  <div className="open-choice-type">
                    {populateMultipleChoice(props)}
                  </div>
                  : props.QuestionnaireItem.type === "text" ?
                    <div className="text-type">
                      <input type="text"
                        onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueString: event.target.value }])}
                      />
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
  let activeButton: any = createRef();

  function handleOnClick(event: any) {
    props.onChange(props.QuestionnaireItem, [{ valueCoding: JSON.parse(event.target.value) }])
    for (let child of activeButton.current.children) {
      if (child.value === event.target.value) {
        child.classList.add('selected');
      } else {
        child.classList.remove('selected');
      }
    }
  }

  return (
    <ButtonGroup ref={activeButton}>
      {
        props.QuestionnaireItem.answerOption?.map((answerOption) => {
          return (<Button key={JSON.stringify(answerOption.valueCoding)}
            size="sm"
            aria-required="true"
            variant="outline-secondary"
            value={JSON.stringify(answerOption.valueCoding)}
            onClick={(event: any) =>
              handleOnClick(event)
            }>
            {answerOption.valueCoding?.display}
          </Button>);
        })
      }
    </ButtonGroup>
  );
}

function populateMultipleChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  // let checked: boolean = false;
  return (
    <div>
      {
        props.QuestionnaireItem.item?.map((item) => {
          return (
            <MultiSelectButtonComponent key={JSON.stringify(item)}  {...item}>{item.answerOption}</MultiSelectButtonComponent>
          )
        })
      }
    </div>
  );
}



export default QuestionnaireItemComponent;