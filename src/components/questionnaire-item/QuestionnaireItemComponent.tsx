// import React, { createRef } from 'react';
// import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-r4';
// import './QuestionnaireItemComponent.css';
// import { Card, ButtonGroup, Button } from 'react-bootstrap';
// import MultiSelectButtonComponent from '../multi-select-button/MultiSelectButton';
// import { faQuestionCircle, faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// function QuestionnaireItemComponent(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
//   let questionnaireItemRef: any = createRef();

//   function handleNextQuestionScroll(linkId: number) {
//     if (questionnaireItemRef.current.id === linkId) {
//       questionnaireItemRef.current.nextSibling.classList.add('active')
//       questionnaireItemRef.current.classList.remove('active')
//       questionnaireItemRef.current.nextSibling.scrollIntoView({
//         behavior: 'smooth',
//         block: 'nearest'
//       })
//     }
//   }
//   function handlePreviousQuestionScroll(linkId: number) {
//     if (questionnaireItemRef.current.id === linkId) {
//       questionnaireItemRef.current.previousSibling.classList.add('active')
//       questionnaireItemRef.current.classList.remove('active')
//       questionnaireItemRef.current.previousSibling.scrollIntoView({
//         behavior: 'smooth',
//         block: 'nearest'
//       })
//     }
//   }


//   return (
//     <Card ref={questionnaireItemRef} className={"questionnaire-item"} id={props.QuestionnaireItem.linkId}>

//       {props.QuestionnaireItem.linkId === '1' ? ('')
//         :
//         (
//           <Button className="btn-outline-secondary previous-button"
//             value={props.QuestionnaireItem.linkId}
//             onClick={(event: any) => handlePreviousQuestionScroll(event.target.value)}>
//             <FontAwesomeIcon icon={faArrowAltCircleLeft} />
//           </Button>
//         )}
//       {}
//       <div className="prefix-text">
//         {props.QuestionnaireItem.prefix}</div>
//       <div>
//         <p><FontAwesomeIcon icon={faQuestionCircle} />  {props.QuestionnaireItem.text}</p></div>
//       <div>
//         {
//           props.QuestionnaireItem.type === "boolean" ?
//             <div className="boolean-type">
//               <div className="radio-button">
//                 <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: true }])} /> <label htmlFor={props.QuestionnaireItem.linkId}> Yes</label>
//               </div>
//               <div className="radio-button">
//                 <input type="radio" name={props.QuestionnaireItem.linkId} onChange={() => props.onChange(props.QuestionnaireItem, [{ valueBoolean: false }])} /><label htmlFor={props.QuestionnaireItem.linkId}> No</label>
//               </div>
//             </div>
//             : props.QuestionnaireItem.type === "choice" ?
//               <div className="choice-type">
//                 {populateChoice(props)}
//               </div>
//               : props.QuestionnaireItem.type === "quantity" ?
//                 <div className="quantity-type">
//                   <input type="text" onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueQuantity: { value: parseFloat(event.target.value) } }])} /> days
//                 </div>
//                 // : props.QuestionnaireItem.type === "open-choice" ?
//                 //   <div className="open-choice-type">
//                 //     {populateMultipleChoice(props)}
//                 //   </div>
//                 : props.QuestionnaireItem.type === "group" ?
//                   <div className="open-choice-type">
//                     {populateGroupType(props)}
//                   </div>

//                   : props.QuestionnaireItem.type === "text" ?
//                     <div className="text-type">
//                       <input type="text"
//                         onChange={(event) => props.onChange(props.QuestionnaireItem, [{ valueString: event.target.value }])}
//                       />
//                     </div>
//                     : <div>Unrecognized QuestionnaireItem type: {props.QuestionnaireItem.type}</div>
//         }
//       </div>
//       {/* <div>{ JSON.stringify(props.QuestionnaireItem) }</div> */}
//       <div>
//         {
//           props.QuestionnaireItem.item ? props.QuestionnaireItem.item.map((item, key) =>
//             <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={props.onChange} />
//           ) : null
//         }
//       </div>
//       <Button variant="outline-secondary" size='lg' className="next-button" value={props.QuestionnaireItem.linkId} onClick={(event: any) => handleNextQuestionScroll(event.target.value)}>Next</Button>
//     </Card>
//   );
// }

// function populateChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
//   let activeButton: any = createRef();

//   const handleFocus = (event:any) => {
//     event.target.select()
//   }

//   function handleOnClick(event: any) {
//     props.onChange(props.QuestionnaireItem, [{ valueCoding: JSON.parse(event.target.value) }])
//     for (let child of activeButton.current.children) {
//       if (child.value === event.target.value) {
//         child.classList.add('selected');
//       } else {
//         child.classList.remove('selected');
//       }
//     }
//   }

//   return (
//     <ButtonGroup >
//       {
//         props.QuestionnaireItem.answerOption?.map((answerOption) => {
//           return (<Button key={JSON.stringify(answerOption.valueCoding)}
//             size="sm"
//             ref={activeButton}
//             aria-required="true"
//             variant="outline-secondary"
//             value={JSON.stringify(answerOption.valueCoding)}
//             onFocus={handleFocus}
//             onClick={(event: any) =>
//               handleOnClick(event)
//             }>
//             {answerOption.valueCoding?.display}
//           </Button>);
//         })
//       }
//     </ButtonGroup>
//   );
// }

// function populateGroupType(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
//   let activeButton: any = createRef();

//   function handleOnClick(event: any, item: any) {
//     console.log('event: ', event.target.value)
//     console.log('linkId: ', item.linkId)
//     // console.log('active children: ', activeButton.current.children)
//     console.log('active id: ', activeButton)
//     // props.onChange(item, [{ valueCoding: JSON.parse(event.target.value) }])
//     if (item.linkId === activeButton.current.id ) {

//       for (let child of activeButton.current.children) {
//         console.log('child: ', child)
//         console.log('child value: ', child.value)
//         if (child.value === event.target.value) {
//           child.classList.add('selected');
//         } else {
//           child.classList.remove('selected');
//         }
//       }
//     }
//   }

//   let receiveData = (childData: any, answer: string) => {
//     props.onChange(childData, [{ valueCoding: JSON.parse(answer) }])
//   }

//   if (props.QuestionnaireItem.code![0].code === 'pain-location') {
//     return (
//       <div>
//         {
//           props.QuestionnaireItem.item?.map((item) => {
//             return (
//               <MultiSelectButtonComponent parentCallback={receiveData} key={JSON.stringify(item)}  {...item}>{item.answerOption}</MultiSelectButtonComponent>

//             )
//           })
//         }
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         {
//           props.QuestionnaireItem.item?.map((item) => {
//             return (
//               <div key={JSON.stringify(item)} id={item.linkId} ref={activeButton}>
//                 <p>{item.text}</p>
//                 <ButtonGroup >
//                   {
//                     item.answerOption?.map((answerOption) => {
//                       return (<Button key={JSON.stringify(answerOption.valueCoding)}
//                         size="sm"
//                         aria-required="true"
//                         variant="outline-secondary"
//                         value={JSON.stringify(answerOption.valueCoding?.display)}
//                         onClick={(event: any) =>
//                           handleOnClick(event, item)
//                         }>
//                         {answerOption.valueCoding?.display}
//                       </Button>);
//                     })
//                   }
//                 </ButtonGroup>
//               </div>
//             )
//           })

//         }
//       </div>
//     )
//   }
// }



// export default QuestionnaireItemComponent;

import React, { createRef } from 'react';
// import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../fhir-types/fhir-r4';
import './QuestionnaireItemComponent.css';
import { Card, Button } from 'react-bootstrap';
import MultiSelectButtonComponent from '../multi-select-button/MultiSelectButton';
import { faQuestionCircle, faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ChoiceButton from '../choice-button/ChoiceButton';

export default class QuestionnaireTestComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeId: null
    }
  }
  questionnaireItemRef: any = createRef();

  handleNextQuestionScroll(linkId: number) {
    if (this.questionnaireItemRef.current.id === linkId) {
      this.questionnaireItemRef.current.nextSibling.classList.add('active')
      this.questionnaireItemRef.current.classList.remove('active')
      this.questionnaireItemRef.current.nextSibling.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
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

  public render(): any {

    return (
      <Card ref={this.questionnaireItemRef} className={"questionnaire-item"} id={this.props.QuestionnaireItem.linkId}>

        {this.props.QuestionnaireItem.linkId === '1' ? ('')
          :
          (
            <Button className="btn-outline-secondary previous-button"
              value={this.props.QuestionnaireItem.linkId}
              onClick={(event: any) => this.handlePreviousQuestionScroll(event.target.value)}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </Button>
          )}
        {}
        <div className="prefix-text">
          {this.props.QuestionnaireItem.prefix}</div>
        <div>
          <p><FontAwesomeIcon icon={faQuestionCircle} />  {this.props.QuestionnaireItem.text}</p></div>
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
                  // : props.QuestionnaireItem.type === "open-choice" ?
                  //   <div className="open-choice-type">
                  //     {populateMultipleChoice(props)}
                  //   </div>
                  : this.props.QuestionnaireItem.type === "group" ?
                    <div className="open-choice-type">
                      {this.populateGroupType(this.props)}
                    </div>

                    : this.props.QuestionnaireItem.type === "text" ?
                      <div className="text-type">
                        <input type="text"
                          onChange={(event) => this.props.onChange(this.props.QuestionnaireItem, [{ valueString: event.target.value }])}
                        />
                      </div>
                      : <div>Unrecognized QuestionnaireItem type: {this.props.QuestionnaireItem.type}</div>
          }
        </div>
        {/* <div>{ JSON.stringify(props.QuestionnaireItem) }</div> */}
        <div>
          {
            this.props.QuestionnaireItem.item ? this.props.QuestionnaireItem.item.map((item: any, key: any) =>
              <QuestionnaireTestComponent QuestionnaireItem={item} key={key} onChange={this.props.onChange} />
            ) : null
          }
        </div>
        <Button variant="outline-secondary" size='lg' className="next-button" value={this.props.QuestionnaireItem.linkId} onClick={(event: any) => this.handleNextQuestionScroll(event.target.value)}>Next</Button>
      </Card>
    );
  }


  // public populateChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  public populateChoice(props: any) {


    let receiveData = (childData: any, answer: string) => {
      props.onChange(childData, [{ valueCoding: JSON.parse(answer) }])
    }

    return (
      <ChoiceButton parentCallback={receiveData} key={JSON.stringify(props.QuestionnaireItem)} {...props.QuestionnaireItem}></ChoiceButton>

    );
  }

  // public populateGroupType(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  public populateGroupType(props: any) {


    let receiveData = (childData: any, answer: string) => {
      props.onChange(childData, [{ valueCoding: JSON.parse(answer) }])
    }

    if (props.QuestionnaireItem.code![0].code === 'pain-location') {
      return (
        <div>
          {
            props.QuestionnaireItem.item?.map((item: any) => {
              return (
                <MultiSelectButtonComponent parentCallback={receiveData} key={JSON.stringify(item)}  {...item}>{item.answerOption}</MultiSelectButtonComponent>

              )
            })
          }
        </div>
      );
    } else {
      return (
        <div>
          {
            props.QuestionnaireItem.item?.map((item: any) => {

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
