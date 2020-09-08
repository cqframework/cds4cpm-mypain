import React from 'react';
import './QuestionnaireComponent.css';
import {
    Questionnaire,
    QuestionnaireItem,
    QuestionnaireResponse,
    QuestionnaireResponseItemAnswer
} from '../../fhir-types/fhir-r4';
// import QuestionnaireItemComponent from '../questionnaire-item/QuestionnaireItemComponent';
import QuestionnaireItemComponent from '../questionnaire-item/QuestionnaireItemComponent';
import ReviewPageComponent from '../review-page/ReviewPageComponent';
import { Button } from 'react-bootstrap';

let questionnaireResponse: QuestionnaireResponse;
let selectedQuestionnaireItemsByLinkId = new Map();


export default class QuestionnaireComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showReviewInfo: null,
        }
        this.fillSelectedQuestionnaireItems(this.props.questionnaire);
    }
    showReviewInfo: boolean = false;
    public fillSelectedQuestionnaireItems(selectedQuestionnaire: Questionnaire) {
        selectedQuestionnaire.item?.forEach((item, key) => {
            selectedQuestionnaireItemsByLinkId.set(item.linkId, item);
        })
    }

    // fillSelectedQuestionnaireItems(this.props.questionnaire);
    questionnaireResponse = this.props.questionnaireResponse;
    receiveData = (showReview: boolean) => {
        console.log('questionnaire done: ', showReview)
        if (showReview === true) {
            this.setState({
                showReviewInfo: true
            })
        }
        // showReviewInfo = showReview;
        console.log('show review: ', this.state.showReviewInfo)
    }

    render(): JSX.Element {
        if (!this.state.showReviewInfo) {
            return <div className="questionnaire">
                <div>{this.props.questionnaire.title}</div>
                {this.props.questionnaire.item ? this.props.questionnaire.item.map((item: any, key: any) => {
                    return item.enableWhen ? handleEnableWhen(item, key, this.props.onChange) : <QuestionnaireItemComponent receivingCallback={this.receiveData} length={this.props.questionnaire.item?.length} QuestionnaireItem={item} key={key} onChange={this.props.onChange} />;
                }) : null}
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


function handleEnableWhen(item: QuestionnaireItem, key: number, propsOnChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void) {
    let allLinkedQuestionsAnswered: boolean = false;
    item.enableWhen?.map((enableWhen, key) => {
        const question: string = enableWhen.question;
        questionnaireResponse.item?.map((answer, key) => {
            if (answer.linkId === question) {
                let linkedItem = selectedQuestionnaireItemsByLinkId.get(answer.linkId);
                if (linkedItem.type === 'boolean') {
                    if (answer.answer) {
                        if (answer.answer[0].valueBoolean === enableWhen.answerBoolean) {
                            allLinkedQuestionsAnswered = true;
                        } else {
                            allLinkedQuestionsAnswered = false;
                        }
                    }
                }
                if (linkedItem.type === 'choice') {
                    if (answer.answer) {
                        if (answer.answer[0].valueString === enableWhen.answerString) {
                            allLinkedQuestionsAnswered = true;
                        } else {
                            allLinkedQuestionsAnswered = false;
                        }
                    }
                }
            }
        })
    })
    if (allLinkedQuestionsAnswered) {
        return <QuestionnaireItemComponent QuestionnaireItem={item} key={key} onChange={propsOnChange} />
    } else {
        if (questionnaireResponse.item?.find(i => i.linkId === item.linkId)?.answer?.length) {
            propsOnChange(item, undefined);
        }
    }
};
