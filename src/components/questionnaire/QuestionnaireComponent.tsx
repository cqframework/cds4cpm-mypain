import React from "react";
import "./QuestionnaireComponent.css";
import {
  QuestionnaireItem,
  QuestionnaireResponse,
} from "../../fhir-types/fhir-r4";
import QuestionnaireItemComponent from "../questionnaire-item/QuestionnaireItemComponent";

interface QuestionnaireState {}

export default class QuestionnaireComponent extends React.Component<
  any,
  QuestionnaireState
> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  questionnaireResponse: QuestionnaireResponse =
    this.props.questionnaireResponse;

  receiveData = (showReview: boolean) => {
    if (showReview === true) {
      this.setState(
        {
          showReviewInfo: true,
          // showConfirmation: false,
        },
        () => {}
      );
    }
  };

  render(): JSX.Element {
    return (
      <div className="questionnaire">
        {this.props.questionnaire.item.map(
          (item: QuestionnaireItem, key: any) => {
            return (
              <QuestionnaireItemComponent
                receivingCallback={this.receiveData}
                length={this.props.questionnaire.item?.length}
                QuestionnaireItem={item}
                key={key}
                onChange={this.props.onChange}
                submitAnswers={this.props.submitAnswers}
              />
            );
          }
        )}
      </div>
    );
  }
}
