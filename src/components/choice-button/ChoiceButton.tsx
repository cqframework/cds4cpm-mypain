import React, { createRef } from "react";
import "./ChoiceButton.css";
import parser from "html-react-parser";
import { QuestionnaireItem } from "../../fhir-types/fhir-r4";

// push/receive STATE on parent component

export default class ChoiceButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeButton: false,
      value: "",
    };
  }

  public render(): JSX.Element {
    let activeChoiceButton: any = createRef();
    let questionnaireItem: QuestionnaireItem = {
      linkId: this.props.linkId,
      type: this.props.type,
      prefix: this.props.prefix,
      answerOption: this.props.answerOption,
      text: this.props.text,
    };

    const handleClick = (event: any) => {
      if (questionnaireItem.prefix && questionnaireItem.text) {
        questionnaireItem.text =
          questionnaireItem.prefix + ": " + questionnaireItem.text;
      }
      collectAnswer(questionnaireItem, event.target.value);
      for (let child of activeChoiceButton.current.children) {
        if (child.value === event.target.value) {
          child.classList.add("selected");
        } else {
          child.classList.remove("selected");
        }
      }
    };

    const collectAnswer = (QuestionnaireItem: any, answer: string) => {
      this.props.parentCallback(QuestionnaireItem, answer);
    };

    return (
      <div className="card mb-2 shadow-sm border-0">
        <div className="card-body">
          <p>{parser(questionnaireItem.text)}</p>
          <div className="choice-button-group mt-3">
            <div ref={activeChoiceButton} className="btn-group d-flex">
              {questionnaireItem.answerOption?.map((answerOption: any) => {
                return (
                  <button
                    key={JSON.stringify(answerOption)}
                    className="btn-sm btn btn-outline-secondary-custom "
                    value={JSON.stringify(answerOption)}
                    onClick={(event: any) => handleClick(event)}
                  >
                    {answerOption.valueCoding?.display}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
