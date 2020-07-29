import React from 'react';
import './QuestionnaireComponent.css';
import {
    Questionnaire,
    QuestionnaireItem,
    QuestionnaireResponse,
    QuestionnaireResponseItemAnswer
} from '../../fhir-types/fhir-r4';
import QuestionnaireItemComponent from '../questionnaire-item/QuestionnaireItemComponent';
import { Button } from 'react-bootstrap';

let questionnaireResponse:QuestionnaireResponse;
let selectedQuestionnaireItemsByLinkId = new Map();

function QuestionnaireComponent(props: { questionnaire: Questionnaire, questionnaireResponse: QuestionnaireResponse, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void, onSubmit: () => void }) {
    fillSelectedQuestionnaireItems(props.questionnaire);
    questionnaireResponse = props.questionnaireResponse;
  return (
    <div className="questionnaire">
        <div>{ props.questionnaire.title }</div>
        {
            props.questionnaire.item ? props.questionnaire.item.map((item, key) =>{
                return item.enableWhen ? handleEnableWhen(item, key, props.onChange) : <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={props.onChange} />
            }) : null
        }
        <Button className="submit-button" type="button" onClick={props.onSubmit}>Submit</Button>
    </div>
  );
}

//for speed this might need to be done in App.selectQuestionnaire() so it is done once per questionnaire, instead of every time a change occurs
function fillSelectedQuestionnaireItems(selectedQuestionnaire:Questionnaire){
    selectedQuestionnaire.item?.forEach((item, key) => {
        selectedQuestionnaireItemsByLinkId.set(item.linkId,item);
    })
}

function handleEnableWhen(item: QuestionnaireItem, key: number, propsOnChange:(item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[])=>void){
    let allLinkedQuestionsAnswered:boolean = false;
    item.enableWhen?.map((enableWhen, key)=>{
        const question:string = enableWhen.question;
         questionnaireResponse.item?.map((answer, key)=>{
             if(answer.linkId === question){
                 let linkedItem = selectedQuestionnaireItemsByLinkId.get(answer.linkId);
                 console.log('linkedItem', linkedItem);
                 if(linkedItem.type === 'boolean'){
                     if(answer.answer){
                         if(answer.answer[0].valueBoolean === enableWhen.answerBoolean){
                             allLinkedQuestionsAnswered = true;
                         }else{
                             allLinkedQuestionsAnswered = false;
                         }
                     }
                 }
                 if(linkedItem.type === 'choice'){
                     if(answer.answer){
                         if(answer.answer[0].valueString === enableWhen.answerString){
                             allLinkedQuestionsAnswered = true;
                         }else{
                             allLinkedQuestionsAnswered = false;
                         }
                     }
                 }
                 /**
                  * {
        "linkId": "6",
        "type": "boolean",
        "text": "item 6",
        "enableWhen": [
          {
            "question": "3",
            "answerQuantity": 13
          }
        ]
      }
Does NOT work.  It causes the error:
                  Types of property 'enableWhen' are incompatible.
                  Type '{ question: string; answerQuantity: number; }[]' is not assignable to type 'QuestionnaireItemEnableWhen[]'.
                  Type '{ question: string; answerQuantity: number; }' is not assignable to type 'QuestionnaireItemEnableWhen'.
                  Types of property 'answerQuantity' are incompatible.
                  Type 'number' is not assignable to type 'Quantity | undefined'.  TS2322
                   */

/*
                 if(linkedItem.type === 'quantity'){
                     if(answer.answer){
                         if(answer.answer[0].valueQuantity === enableWhen.answerQuantity){
                             allLinkedQuestionsAnswered = true;
                         }else{
                             allLinkedQuestionsAnswered = false;
                         }
                     }
                 }
*/
             }
         })
    })
    if(allLinkedQuestionsAnswered) {
        return <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={propsOnChange}/>
    }else {
        if (questionnaireResponse.item?.find(i => i.linkId === item.linkId)?.answer?.length) {
            propsOnChange(item, undefined);
        }
    }
}

export default QuestionnaireComponent;