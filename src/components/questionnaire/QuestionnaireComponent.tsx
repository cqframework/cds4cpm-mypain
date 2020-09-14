import React from 'react';
import './QuestionnaireComponent.css';
import {
    QuestionnaireItem,
    QuestionnaireResponse
} from '../../fhir-types/fhir-r4';
import QuestionnaireItemComponent from '../questionnaire-item/QuestionnaireItemComponent';
import ReviewPageComponent from '../review-page/ReviewPageComponent';
import { Button } from 'react-bootstrap';

interface QuestionnaireState {
    showReviewInfo: boolean
}

export default class QuestionnaireComponent extends React.Component<any, QuestionnaireState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showReviewInfo: false,
        }
    }

    questionnaireResponse: QuestionnaireResponse = this.props.questionnaireResponse;
    receiveData = (showReview: boolean) => {
        if (showReview === true) {
            this.setState({
                showReviewInfo: true
            }, () => {
                console.log('show review: ', this.state.showReviewInfo)
            })
        }
    }

    render(): JSX.Element {
        // console.log('questionnaire: ', this.props.questionnaire);
        if (!this.state.showReviewInfo) {
            return <div className="questionnaire">
                <div>{this.props.questionnaire.title}</div>
                {this.props.questionnaire.item.map((item:QuestionnaireItem, key: any) => {
                    return <QuestionnaireItemComponent receivingCallback={this.receiveData} length={this.props.questionnaire.item?.length} QuestionnaireItem={item} key={key} onChange={this.props.onChange} />
                })}
            </div>
        } else {

            return <div className="questionnaire">
                {
                    <div>

                        <div>
                            <h4>Review and Submit</h4>
                            <ReviewPageComponent {...this.props.questionnaireResponse}></ReviewPageComponent>
                        </div>

                        <Button className="submit-button" type="button" onClick={this.props.onSubmit}>Submit</Button>
                    </div>
                }
            </div>
        }
    }

}


// function handleEnableWhen(item: QuestionnaireItem, key: number, propsOnChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void) {
//     let allLinkedQuestionsAnswered: boolean = false;
//     item.enableWhen?.map((enableWhen, key) => {
//         const question: string = enableWhen.question;
//         questionnaireResponse.item?.map((answer, key) => {
//             if (answer.linkId === question) {
//                 let linkedItem = selectedQuestionnaireItemsByLinkId.get(answer.linkId);
//                 if (linkedItem.type === 'boolean') {
//                     if (answer.answer) {
//                         if (answer.answer[0].valueBoolean === enableWhen.answerBoolean) {
//                             allLinkedQuestionsAnswered = true;
//                         } else {
//                             allLinkedQuestionsAnswered = false;
//                         }
//                     }
//                 }
//                 if (linkedItem.type === 'choice') {
//                     if (answer.answer) {
//                         if (answer.answer[0].valueString === enableWhen.answerString) {
//                             allLinkedQuestionsAnswered = true;
//                         } else {
//                             allLinkedQuestionsAnswered = false;
//                         }
//                     }
//                 }
//             }
//         })
//     })
//     if (allLinkedQuestionsAnswered) {
//         return <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={propsOnChange} />
//     } else {
//         if (questionnaireResponse.item?.find(i => i.linkId === item.linkId)?.answer?.length) {
//             propsOnChange(item, undefined);
//         }
//     }
// };
