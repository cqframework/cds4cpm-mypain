import React, { createRef } from "react";
import {
  QuestionnaireItem,
  QuestionnaireItemAnswerOption,
  QuestionnaireResponseItem,
  QuestionnaireResponseItemAnswer,
} from "../../fhir-types/fhir-r4";
import "./QuestionnaireItemComponent.css";
import MultiSelectButtonComponent from "../multi-select-button/MultiSelectButton";
import ChoiceButton from "../choice-button/ChoiceButton";
import parser from "html-react-parser";
import "react-circular-progressbar/dist/styles.css";

interface QuestionnaireItemState {
  showReview: boolean;
  questionnaireResponse: QuestionnaireResponseItem;
}
export default class QuestionnaireItemComponent extends React.Component<
  any,
  QuestionnaireItemState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showReview: false,
      questionnaireResponse: {
        linkId: props.QuestionnaireItem.linkId,
        text:
          props.QuestionnaireItem.prefix + ": " + props.QuestionnaireItem.text,
        item: [],
      },
    };
  }
  questionnaireItemRef: any = createRef();
  handleNextQuestionScroll(linkId: number) {
    if (this.questionnaireItemRef.current.id === linkId) {
      if (this.questionnaireItemRef.current.nextSibling) {
        this.questionnaireItemRef.current.nextSibling.classList.add("active");
        this.questionnaireItemRef.current.classList.remove("active");
        this.questionnaireItemRef.current.nextSibling.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        // console.log('current ref: ', this.questionnaireItemRef.current.children)
      }
    }
    if (
      !this.questionnaireItemRef.current.nextSibling.classList.contains(
        "questionnaire-item"
      )
    ) {
      this.setState({ showReview: true }, () => {
        this.props.receivingCallback(this.state.showReview);
      });
    }
  }
  handlePreviousQuestionScroll(linkId: number) {
    if (this.questionnaireItemRef.current.id === linkId) {
      this.questionnaireItemRef.current.previousSibling.classList.add("active");
      this.questionnaireItemRef.current.classList.remove("active");
      this.questionnaireItemRef.current.previousSibling.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }
  // confirm = () => {
  //   console.log("props:", this.props);
  //   this.props.onSubmit();
  // };

  public render(): JSX.Element {
    let text = "";
    if (!this.props.QuestionnaireItem.text) {
      text = "";
    } else {
      text = this.props.QuestionnaireItem.text;
    }

    let processTextResponse = (
      questionItem: QuestionnaireItem,
      answer: any
    ) => {
      let responseAnswer: QuestionnaireResponseItemAnswer = JSON.parse(answer);
      console.log(responseAnswer);
      let childResponse: QuestionnaireResponseItem = {
        linkId: questionItem.linkId,
        text: questionItem.text,
        answer: [responseAnswer],
      };

      this.props.onChange(childResponse);
    };

    return (
      <div
        ref={this.questionnaireItemRef}
        className={"questionnaire-item mb-5 p-3 border-0 card"}
        id={this.props.QuestionnaireItem.linkId}
      >
        <div className="questionnaire-section-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="prefix-text">
              <h3 className="m-0">{this.props.QuestionnaireItem.prefix}</h3>
            </div>
            <div className="">
              <p className="m-0 text-green">
                {this.props.QuestionnaireItem.linkId} of {this.props.length}
              </p>
            </div>
          </div>
        </div>
        <div className="description-text my-3">
          <p> {parser(text)}</p>
        </div>
        <div>
          {this.props.QuestionnaireItem.type === "boolean" ? (
            <div className="boolean-type">
              <div className="radio-button">
                <input
                  type="radio"
                  name={this.props.QuestionnaireItem.linkId}
                  onChange={() =>
                    this.props.onChange(this.props.QuestionnaireItem, [
                      { valueBoolean: true },
                    ])
                  }
                />
                <label htmlFor={this.props.QuestionnaireItem.linkId}>Yes</label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  name={this.props.QuestionnaireItem.linkId}
                  onChange={() =>
                    this.props.onChange(this.props.QuestionnaireItem, [
                      { valueBoolean: false },
                    ])
                  }
                />
                <label htmlFor={this.props.QuestionnaireItem.linkId}>No</label>
              </div>
            </div>
          ) : this.props.QuestionnaireItem.type === "choice" ? (
            <div className="choice-type">{this.populateChoice(this.props)}</div>
          ) : this.props.QuestionnaireItem.type === "quantity" ? (
            <div className="quantity-type">
              <input
                type="text"
                onChange={(event) =>
                  this.props.onChange(this.props.QuestionnaireItem, [
                    {
                      valueQuantity: { value: parseFloat(event.target.value) },
                    },
                  ])
                }
              />
              days
            </div>
          ) : this.props.QuestionnaireItem.type === "group" ? (
            <div className="open-choice-type">
              {this.populateGroupType(this.props)}
            </div>
          ) : this.props.QuestionnaireItem.type === "text" ? (
            <div className="text-type">
              <div className="">
                <textarea
                  className="form-control"
                  placeholder="Type your answer here..."
                  id="floatingTextarea"
                  onChange={(event) => {
                    processTextResponse(
                      this.props.QuestionnaireItem,
                      JSON.stringify({ valueString: event.target.value })
                    );
                  }}
                  rows={4}
                ></textarea>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {this.props.QuestionnaireItem.item
            ? this.props.QuestionnaireItem.item.map((item: any, key: any) => (
                <QuestionnaireItemComponent
                  QuestionnaireItem={item}
                  key={key}
                  onChange={this.props.onChange}
                />
              ))
            : null}
        </div>

        <div className="d-grid gap-2 d-flex mt-3">
          {this.props.QuestionnaireItem.linkId === "1" ? (
            ""
          ) : (
            <button
              className="btn btn-secondary-custom"
              style={{ width: "50%" }}
              value={this.props.QuestionnaireItem.linkId}
              onClick={(event: any) =>
                this.handlePreviousQuestionScroll(event.target.value)
              }
            >
              Back
            </button>
          )}

          {this.props.QuestionnaireItem.linkId !== "12" ? (
            <button
              className="btn btn-primary-custom ms-auto"
              style={{ width: "50%" }}
              type="button"
              value={this.props.QuestionnaireItem.linkId}
              onClick={(event: any) =>
                this.handleNextQuestionScroll(event.target.value)
              }
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-primary-custom ms-auto"
              style={{ width: "50%" }}
              type="button"
              value={this.props.QuestionnaireItem.linkId}
              onClick={() => this.props.submitAnswers()}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  }

  // public populateChoice(props: { QuestionnaireItem: QuestionnaireItem, onChange: (item: QuestionnaireItem, answer?: QuestionnaireResponseItemAnswer[]) => void }) {
  public populateChoice(props: any) {
    let receiveData = (childData: QuestionnaireItem, answer: string) => {
      let responseAnswer: QuestionnaireResponseItemAnswer = JSON.parse(answer);
      let childResponse: QuestionnaireResponseItem = {
        linkId: childData.linkId,
        text: childData.text,
        answer: [responseAnswer],
      };

      let joined = this.state.questionnaireResponse.item;
      // const updateItem = (array: any, response: any) => {

      // }
      const addItem = (response: any) => {
        this.setState(
          (state) => {
            const questionnaireResponse = {
              linkId: state.questionnaireResponse.linkId,
              text: state.questionnaireResponse.text,
              item: state.questionnaireResponse.item!.concat(response),
            };

            return {
              showReview: this.state.showReview,
              questionnaireResponse,
            };
          },
          () => {
            props.onChange(this.state.questionnaireResponse);
          }
        );
      };

      if (joined!.length > 0) {
        for (let i = 0; i < joined!.length; i++) {}
      } else {
        addItem(childResponse);
      }
    };

    return (
      <ChoiceButton
        parentCallback={receiveData}
        key={JSON.stringify(props.QuestionnaireItem)}
        {...props.QuestionnaireItem}
      ></ChoiceButton>
    );
  }

  public populateGroupType(props: any) {
    let receiveData = (childData: QuestionnaireResponseItem, answer: any) => {
      let childResponse: QuestionnaireResponseItem = {
        linkId: childData.linkId,
        text: childData.text,
        answer: [JSON.parse(answer)],
      };

      const checkResponseArray = (obj: QuestionnaireResponseItem) =>
        obj.linkId === childResponse.linkId;
      const stateQuestionnaireResponse = this.state.questionnaireResponse;

      if (!stateQuestionnaireResponse.item!.some(checkResponseArray)) {
        this.setState(
          (state) => {
            const questionnaireResponse = {
              linkId: state.questionnaireResponse.linkId,
              text: state.questionnaireResponse.text,
              item: state.questionnaireResponse.item!.concat([childResponse]),
            };
            return {
              showReview: this.state.showReview,
              questionnaireResponse,
            };
          },
          () => {
            props.onChange(this.state.questionnaireResponse);
          }
        );
      } else if (stateQuestionnaireResponse.item!.some(checkResponseArray)) {
        this.setState(
          (state) => {
            for (let i in stateQuestionnaireResponse.item!) {
              if (
                stateQuestionnaireResponse.item[i].linkId ===
                childResponse.linkId
              ) {
                stateQuestionnaireResponse.item[i].answer =
                  childResponse.answer;
              }
            }
          },
          () => {
            props.onChange(this.state.questionnaireResponse);
          }
        );
      }
    };

    if (
      props.QuestionnaireItem.code![0].code === "pain-location" ||
      props.QuestionnaireItem.code![0].code === "about-my-treatments"
    ) {
      return (
        <div className="position-relative">
          {/* <div className="accordion" id="questionnairePanels"> */}
          {props.QuestionnaireItem.item?.map((item: any) => {
            return (
              <MultiSelectButtonComponent
                sectionCode={props.QuestionnaireItem.code![0].code}
                parentCallback={receiveData}
                key={JSON.stringify(item)}
                {...item}
              >
                {item.answerOption}
              </MultiSelectButtonComponent>
            );
          })}
          {/* </div> */}
          {props.QuestionnaireItem.code![0].code === "pain-location" && (
            <div className="position-absolute top-50 start-100 translate-middle d-none d-md-block">
              {/* add body here and update position with custom style */}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          {props.QuestionnaireItem.item?.map(
            (item: QuestionnaireItemAnswerOption) => {
              return (
                <ChoiceButton
                  parentCallback={receiveData}
                  key={JSON.stringify(item)}
                  {...item}
                ></ChoiceButton>
              );
            }
          )}
        </div>
      );
    }
  }
}
