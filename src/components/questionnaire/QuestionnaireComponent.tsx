import React from 'react';
import './QuestionnaireComponent.css';
import {
    Questionnaire,
    QuestionnaireItem,
    QuestionnaireItemEnableWhen,
    QuestionnaireResponse,
    QuestionnaireResponseItemAnswer
} from '../../fhir-types/fhir-stu3';
import QuestionnaireItemComponent from '../questionnaire-item/QuestionnaireItemComponent';

let questionnaireResponse:QuestionnaireResponse;
let selectedQuestionnaireItemsByLinkId = new Map();

function QuestionnaireComponent(props: { questionnaire: Questionnaire, questionnaireResponse: QuestionnaireResponse, onChange: (item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer[]) => void }) {
    fillSelectedQuestionnaireItems(props.questionnaire);
    questionnaireResponse = props.questionnaireResponse;
  return (
    <div className="questionnaire">
      <div>{ props.questionnaire.title }</div>
        {
            props.questionnaire.item ? props.questionnaire.item.map((item, key) =>{
                return item.enableWhen ? handleEnableWhen(item, key, props.onChange) : handleNoEnableWhen(item, key, props.onChange)
            }) : null
       }
    </div>
  );
}

//for speed this might need to be done in App.selectQuestionnaire() so it is done once per questionnaire, instead of every time a change occurs
function fillSelectedQuestionnaireItems(selectedQuestionnaire:Questionnaire){
    selectedQuestionnaire.item?.forEach((item, key) => {selectedQuestionnaireItemsByLinkId.set(item.linkId,item);})
}

// write function that returns a specific questionnaire item based on linkedIn id
function handleEnableWhen(item: QuestionnaireItem, key: number, propsOnChange:(item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer[])=>void){
    let allQuestions:boolean = false;
    item.enableWhen?.map((enableWhen, key)=>{
        const question:string = enableWhen.question;
         questionnaireResponse.item?.map((answer, key)=>{
             if(answer.linkId === question){
                 let linkedItem = selectedQuestionnaireItemsByLinkId.get(answer.linkId);
                 if(linkedItem.type === 'boolean'){
                     if(answer.answer){
                         if(answer.answer[0].valueBoolean === enableWhen.answerBoolean){
                             allQuestions = true;
                         }else{
                             allQuestions = false;
                         }
                     };
                 }
             }
         })
    })
    if(allQuestions) {
        return <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={propsOnChange}/>
    }
}

function handleNoEnableWhen(item: QuestionnaireItem, key: number, propsOnChange:(item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer[])=>void){
   return <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={propsOnChange} />
}

export default QuestionnaireComponent;


/**
 * if there is a questionnare.item  map it
 *      if that item has !enableWhen
 *          display it;
 *      else
 *
 **/