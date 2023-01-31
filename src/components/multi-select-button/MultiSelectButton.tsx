import React, { createRef } from "react";
import "./MultiSelectButton.css";
import { QuestionnaireItem } from "../../fhir-types/fhir-r4";
import parser from "html-react-parser";

export default class MultiSelectButtonComponent extends React.Component<
  any,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
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

      for (let child of activeChoiceButton.current.children) {
        if (this.props.type === "open-choice") {
          if (child.value === event.target.value) {
            child.classList.add("selected");
          } else {
            child.classList.remove("selected");
          }
        } else if (child.value === event.target.value) {
          child.classList.toggle("selected");
        }
      }

      var selectedAnswers = [...activeChoiceButton.current.children]
        .filter((answer: any) => answer.classList.contains("selected"))
        .map((answerValue) => {
          return JSON.parse(answerValue.value);
        });

      collectAnswer(questionnaireItem, selectedAnswers);
    };

    // myFunc<T> () {}

    // const receiveTextAnswer = (text: string) => {
    //   if (text.length > 0) {
    //     // questionnaireItem.text =
    //     //   questionnaireItem.prefix + ": " + questionnaireItem.text;
    //     this.props.parentCallback(
    //       questionnaireItem,
    //       JSON.stringify({ valueString: text })
    //     );
    //   }
    // };

    // const receiveBooleanAnswer = (boolAns: boolean) => {
    //   // questionnaireItem.text =
    //   //   questionnaireItem.prefix + ": " + questionnaireItem.text;
    //   this.props.parentCallback(
    //     questionnaireItem,
    //     JSON.stringify({ valueBoolean: boolAns })
    //   );
    // };

    const collectAnswer = (QuestionnaireItem: any, answer: any[]) => {
      this.props.parentCallback(QuestionnaireItem, JSON.stringify(answer));
    };

    const collectResp = <T extends string | boolean>(arg: T): T => {
      if (typeof arg === "string") {
        this.props.parentCallback(
          questionnaireItem,
          JSON.stringify({ valueString: arg })
        );
      } else if (typeof arg === "boolean") {
        console.log("Input is a boolean");
        this.props.parentCallback(
          questionnaireItem,
          JSON.stringify({ valueBoolean: arg })
        );
      } else {
        console.log("Input is not a valid type");
      }
      return arg;
    };

    return (
      <div>
        <div className="accordion" id="questionnairePanels">
          <div className="card mb-2 shadow-sm border-0 rounded">
            <div
              className="card-header p-0 border-0 rounded"
              id={"heading" + questionnaireItem.linkId?.replace(".", "-")}
            >
              <h5 className="mb-0">
                <div
                  className={`multi-button ${
                    this.state.checked ? "selected" : ""
                  }`}
                >
                  {this.props.type !== "boolean" && (
                    <label
                      className="btn accordion-button collapsed rounded"
                      data-bs-toggle="collapse"
                      data-bs-target={
                        "#questionnairePanels-collapse" +
                        questionnaireItem.linkId?.replace(".", "-")
                      }
                      aria-expanded="false"
                      aria-controls={
                        "questionnairePanels-collapse" +
                        questionnaireItem.linkId?.replace(".", "-")
                      }
                    >
                      <input
                        value={questionnaireItem.prefix}
                        type="checkbox"
                        checked={this.state.checked}
                        onChange={(event) => {
                          let checked = event.target.checked;
                          this.setState({
                            checked: checked,
                            value: questionnaireItem.prefix,
                          });
                        }}
                      />
                      <span>{parser(questionnaireItem.prefix!)}</span>
                    </label>
                  )}
                </div>
              </h5>
            </div>

            <div
              id={
                "questionnairePanels-collapse" +
                questionnaireItem.linkId?.replace(".", "-")
              }
              className="collapse"
              aria-labelledby={
                "heading" + questionnaireItem.linkId?.replace(".", "-")
              }
              data-parent="#questionnairePanels"
            >
              <div className="card-body border-0">
                <div className="additional-info-box">
                  {this.props.sectionCode === "pain-location" ? (
                    <>
                      {this.props.type === "choice" ? (
                        <>
                          <p>{questionnaireItem.text}</p>
                          <div
                            className="button-box d-flex justify-content-evenly flex-wrap"
                            ref={activeChoiceButton}
                          >
                            {this.props.answerOption?.map(
                              (answerOption: any) => {
                                return (
                                  <button
                                    key={JSON.stringify(answerOption)}
                                    value={JSON.stringify(answerOption)}
                                    onClick={(event: any) => {
                                      handleClick(event);
                                    }}
                                    className="mt-3 btn btn-outline-secondary-custom btn-sm"
                                    // variant="outline-secondary"
                                  >
                                    {answerOption.valueCoding?.display}
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="other-textbox">
                          <input
                            type="text"
                            placeholder="Type here..."
                            className="form-control"
                            onChange={(event) =>
                              // receiveTextAnswer(event.target.value)
                              collectResp<string>(event.target.value)
                            }
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      {this.props.type === "open-choice" ? (
                        <>
                          <p className="follow-up-question">
                            {questionnaireItem.text}
                          </p>
                          <div className="button-box mt-3">
                            <div className="btn-group" ref={activeChoiceButton}>
                              {this.props.answerOption?.map(
                                (answerOption: any) => {
                                  return (
                                    <button
                                      className="btn-sm btn btn-outline-secondary-custom"
                                      key={JSON.stringify(answerOption)}
                                      value={JSON.stringify(answerOption)}
                                      onClick={(event: any) =>
                                        handleClick(event)
                                      }
                                    >
                                      {answerOption.valueCoding?.display}
                                    </button>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        this.props.type === "text" && (
                          <div className="other-textbox">
                            <input
                              type="text"
                              placeholder="Type here..."
                              className="form-control"
                              onChange={(event) =>
                                // receiveTextAnswer(event.target.value)
                                collectResp<string>(event.target.value)
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collect this answer */}
        {this.props.type === "boolean" && (
          <div className="card mb-2 shadow-sm border-0">
            <div className="card-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={questionnaireItem.prefix}
                  id="answerCheckbox"
                  onChange={
                    (event) => collectResp<boolean>(event.target.checked)
                    // receiveBooleanAnswer(event.target.checked)
                  }
                />
                <label className="form-check-label">
                  {questionnaireItem.prefix}
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
