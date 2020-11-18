import React from 'react';
import './QuestionnaireComponent.css';
import {
    QuestionnaireItem,
    QuestionnaireResponse
} from '../../fhir-types/fhir-r4';
import QuestionnaireItemComponent from '../questionnaire-item/QuestionnaireItemComponent';
import ReviewPageComponent from '../review-page/ReviewPageComponent';
import { Button } from 'react-bootstrap';
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ConfirmationPage } from '../confirmation-page/ConfirmationPage';

interface QuestionnaireState {
    showConfirmation: boolean,
    showReviewInfo: boolean,
    showModal: boolean
}

export default class QuestionnaireComponent extends React.Component<any, QuestionnaireState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showConfirmation: false,
            showReviewInfo: false,
            showModal: false
        }
    }

    questionnaireResponse: QuestionnaireResponse = this.props.questionnaireResponse;
    receiveData = (showReview: boolean) => {
        if (showReview === true) {
            this.setState({
                showReviewInfo: true,
                showConfirmation: false
            }, () => {
                console.log('show review: ', this.state.showReviewInfo)
            })
        }
    }

    render(): JSX.Element {
        // console.log('questionnaire: ', this.props.questionnaire);
        if (this.state.showConfirmation) {
            // return <ConfirmationPage></ConfirmationPage>
            return <div></div>
        }
        else if (this.state.showReviewInfo) {
            return <div className="questionnaire">
                {
                    <div>
                        <Button className="btn-outline-secondary previous-button"
                            // value={this.props.QuestionnaireItem.linkId}
                            onClick={(event: any) => this.setState({showReviewInfo: false})}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                        </Button>
                        <div>
                            <h4>Review and Submit</h4>
                            <ReviewPageComponent {...this.props.questionnaireResponse}></ReviewPageComponent>
                        </div>

                        <Button className="submit-button" type="button" onClick={this.props.onSubmit}>Submit</Button>
                    </div>
                }
            </div>
        } else {
            return <div className="questionnaire">
                <div>{this.props.questionnaire.title}</div>
                {this.props.questionnaire.item.map((item: QuestionnaireItem, key: any) => {
                    return <QuestionnaireItemComponent receivingCallback={this.receiveData} length={this.props.questionnaire.item?.length} QuestionnaireItem={item} key={key} onChange={this.props.onChange} />
                })}
            </div>


        }

    }

}
