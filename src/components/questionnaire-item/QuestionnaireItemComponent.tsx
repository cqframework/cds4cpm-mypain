import React, { createRef } from 'react';
import { QuestionnaireItem, QuestionnaireItemAnswerOption, QuestionnaireResponseItem } from '../../fhir-types/fhir-r4';
import './QuestionnaireItemComponent.css';
import { Card, Button } from 'react-bootstrap';
import MultiSelectButtonComponent from '../multi-select-button/MultiSelectButton';
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChoiceButton from '../choice-button/ChoiceButton';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import parser from 'html-react-parser';

export default class QuestionnaireItemComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeId: null
    }
  }
  questionnaireItemRef: any = createRef();
  showReview: boolean = false;

  handleNextQuestionScroll(linkId: number) {
    if (this.questionnaireItemRef.current.id === linkId) {
      if (this.questionnaireItemRef.current.nextSibling) {
        this.questionnaireItemRef.current.nextSibling.classList.add('active')
        this.questionnaireItemRef.current.classList.remove('active')
        this.questionnaireItemRef.current.nextSibling.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }


    }
    if (this.questionnaireItemRef.current.nextSibling == null) {
      this.showReview = true;
      this.props.receivingCallback(this.showReview);
    }
  }
  handlePreviousQuestionScroll(linkId: number) {
    if (this.questionnaireItemRef.current.id === linkId) {
      this.questionnaireItemRef.current.previousSibling.classList.add('active')
      this.questionnaireItemRef.current.classList.remove('active')
      this.questionnaireItemRef.current.previousSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }

  }

  public render(): JSX.Element {
    let text = '';
    if (!this.props.QuestionnaireItem.text) {
      text = ''
    } else {
      text = this.props.QuestionnaireItem.text
    }
    const percentage = (item: number, length: number): number => {
      item = Number(item)
      if (!isNaN(item) && item !== null) {
        let percent = (item - 1) / length;
        if (!isNaN(percent)) {
          return Math.round(percent * 100);
        } else {
          return 0;
        }

      } else {
        return 0;
      }
    }


    return (
      <Card ref={this.questionnaireItemRef} className={"questionnaire-item"} id={this.props.QuestionnaireItem.linkId}>
        <div className="questionnaire-section-header">
          {this.props.QuestionnaireItem.linkId === '1' ? ('')
            :
            (
              <Button className="btn-outline-secondary previous-button"
                value={this.props.QuestionnaireItem.linkId}
                onClick={(event: any) => this.handlePreviousQuestionScroll(event.target.value)}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
              </Button>
            )}
          <div className="prefix-text">
            <h3>{this.props.QuestionnaireItem.prefix}</h3>
          </div>
          <div className="progress-circle">
            <CircularProgressbar value={percentage(this.props.QuestionnaireItem.linkId, this.props.length)} text={percentage(this.props.QuestionnaireItem.linkId, this.props.length) + '%'} />
          </div>
        </div>
        <div className="description-text">
          <p> {parser(text)}</p></div>
        <div>
          {
            this.props.QuestionnaireItem.type === "boolean" ?
              <div className="boolean-type">
                <div className="radio-button">
                  <input type="radio" name={this.props.QuestionnaireItem.linkId} onChange={() => this.props.onChange(this.props.QuestionnaireItem, [{ valueBoolean: true }])} /> <label htmlFor={this.props.QuestionnaireItem.linkId}> Yes</label>
                </div>
                <div className="radio-button">
                  <input type="radio" name={this.props.QuestionnaireItem.linkId} onChange={() => this.props.onChange(this.props.QuestionnaireItem, [{ valueBoolean: false }])} /><label htmlFor={this.props.QuestionnaireItem.linkId}> No</label>
                </div>
              </div>
              : this.props.QuestionnaireItem.type === "choice" ?
                <div className="choice-type">
                  {this.populateChoice(this.props)}
                </div>
                : this.props.QuestionnaireItem.type === "quantity" ?
                  <div className="quantity-type">
                    <input type="text" onChange={(event) => this.props.onChange(this.props.QuestionnaireItem, [{ valueQuantity: { value: parseFloat(event.target.value) } }])} /> days
                    </div>
                  : this.props.QuestionnaireItem.type === "group" ?
                    <div className="open-choice-type">
                      {this.populateGroupType(this.props)}
                    </div>

                    : this.props.QuestionnaireItem.type === "text" ?
                      <div className="text-type">
                        <textarea placeholder="Your most important activity goals..."
                          onChange={(event) => this.props.onChange(this.props.QuestionnaireItem, [{ valueString: event.target.value }])}
                        />
                      </div>
                      : <div></div>
          }
        </div>
        <div>
          {
            this.props.QuestionnaireItem.item ? this.props.QuestionnaireItem.item.map((item: any, key: any) =>
              <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={this.props.onChange} />
            ) : null
          }
        </div>
        <Button variant="outline-secondary" size='lg' className="next-button" value={this.props.QuestionnaireItem.linkId} onClick={(event: any) => this.handleNextQuestionScroll(event.target.value)}>Next</Button>
      </Card>
    );
  }


  // public populateChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  public populateChoice(props: any) {


    let receiveData = (childData: QuestionnaireItem, answer: string) => {
      props.onChange(childData, [{ valueCoding: JSON.parse(answer) }])
    }

    return (
      <ChoiceButton parentCallback={receiveData} key={JSON.stringify(props.QuestionnaireItem)} {...props.QuestionnaireItem}></ChoiceButton>

    );
  }

  // public populateGroupType(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  public populateGroupType(props: any) {

    let responseItem: QuestionnaireResponseItem = {
      definition: props.QuestionnaireItem.prefix,
      text: props.QuestionnaireItem.text,
      linkId: props.QuestionnaireItem.linkId,
      item: []
    }

    let receiveData = (childData: QuestionnaireResponseItem, answer: string) => {
      // if(responseItem.item.includes(childData)) {
        
      // }
      responseItem.item?.push(childData)
      console.log('childData: ', responseItem)
      // props.onChange(responseItem, [{ valueCoding: JSON.parse(answer) }])
      props.onChange(childData, [{ valueCoding: JSON.parse(answer) }])
    }

    if (props.QuestionnaireItem.code![0].code === 'pain-location' || props.QuestionnaireItem.code![0].code === 'about-my-treatments') {
      return (
        <div>
          {
            props.QuestionnaireItem.item?.map((item: any) => {
              return (
                <MultiSelectButtonComponent code={props.QuestionnaireItem.code![0].code} parentCallback={receiveData} key={JSON.stringify(item)}  {...item}>{item.answerOption}</MultiSelectButtonComponent>
              )
            })
          }
        </div>
      );
    } else {
      return (
        <div>
          {
            props.QuestionnaireItem.item?.map((item: QuestionnaireItemAnswerOption) => {
              return (
                <ChoiceButton parentCallback={receiveData} key={JSON.stringify(item)} {...item}></ChoiceButton>
              )
            })

          }
        </div>
      )
    }
  }

}
