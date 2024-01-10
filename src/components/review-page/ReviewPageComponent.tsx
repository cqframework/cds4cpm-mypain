import React from "react";
import "./ReviewPageComponent.css";
import parser from "html-react-parser";
import {
  QuestionnaireResponseItem,
} from "../../fhir-types/fhir-r4";
import moment from "moment";

export default class ReviewPageComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: JSON.parse(localStorage.getItem("userResponse") || "{}"),
    };
  }

  prevText?: string = "";

  public render(): JSX.Element {
    let sortedList = this.state.response.sort((a: any, b: any) =>
      Number(a.linkId) > Number(b.linkId) ? 1 : -1
    );
    return (
      <div className="review-page-container">
        {sortedList.map(
          (question: QuestionnaireResponseItem, index: number, arr: any) => {
            let text = JSON.stringify(question.text);
            let prevLabel: QuestionnaireResponseItem;
            if (index === 0) {
              prevLabel = arr[index];
            } else {
              prevLabel = arr[index - 1];
            }
            if (question.answer) {
              return (
                <div
                  className="question-response-container"
                  key={question.linkId}
                >
                  {prevLabel.text?.split(":")[0] !==
                    question.text?.split(":")[0] || index === 0 ? (
                    <p className="mt-3 mb-2 fw-bold">
                      {question.text
                        ?.split(":")[0]
                        ?.replace(/<[^>]*>/g, "")
                        .replace(/^"/, "")}
                    </p>
                  ) : null}
                  <div className="card  mb-2 shadow-sm border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <span className="fw-bold">Question</span>
                          <p className="mb-2 mb-md-0">
                            {" "}
                            {parser(text, {
                              // eslint-disable-next-line
                              replace: ({ attribs }) =>
                                attribs &&
                                attribs.id === '\\"replace\\"' && (
                                  <React.Fragment />
                                ),
                            })}
                          </p>
                        </div>
                        <div className="col-12">
                          <span className="fw-bold mt-2">Answer</span>
                          <p className="mb-2">
                            {question.answer[0].valueString ||
                              moment(question.answer[0].valueDateTime).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="question-response-container"
                  key={question.linkId}
                >
                  {prevLabel.text?.split(":")[0] !==
                    question.text?.split(":")[0] || index === 0 ? (
                    <p className="fw-bold mt-3 mb-2">
                      {question.text?.split(":")[0]}
                    </p>
                  ) : null}
                  {question.item?.map((item: QuestionnaireResponseItem) => {
                    if (item.answer!.length > 0) {
                      const multiChoiceAnswer = Object.values(item.answer![0])
                        .map((answer) => {
                          if (answer.valueCoding) {
                            return answer.valueCoding?.display;
                          }
                          return ''
                        })
                        .filter(Boolean) // Remove any empty values from the array
                        .join(", ");
                      if (multiChoiceAnswer) {
                        return (
                          <div
                            key={item.linkId}
                            className="card  mb-2 shadow-sm border-0"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-8">
                                  <span className="fw-bold">Question</span>
                                  <p className="mb-2 mb-md-0">
                                    {parser(JSON.stringify(item.text))}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">Answer</span>
                                  <p className="mb-0 mb-md-0">
                                    {multiChoiceAnswer}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (item.answer![0].valueCoding) {
                        return (
                          <div
                            key={item.linkId}
                            className="card  mb-2 shadow-sm border-0"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-8">
                                  <span className="fw-bold">Question</span>
                                  <p className="mb-2 mb-md-0">
                                    {parser(JSON.stringify(item.text))}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">Answer</span>
                                  <p className="mb-0 mb-md-0">
                                    {item.answer![0].valueCoding?.display}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (item.answer![0].valueBoolean) {
                        return (
                          <div
                            key={item.linkId}
                            className="card  mb-2 shadow-sm border-0"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-8">
                                  <span className="fw-bold">Question</span>
                                  <p className="mb-2 mb-md-0">
                                    {parser(JSON.stringify(item.text))}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">Answer</span>
                                  <p className="mb-0 mb-md-0">
                                    {item.answer![0].valueBoolean.toString()}
                                  </p>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (item.answer![0].valueString) {
                        return (
                          <div
                            key={item.linkId}
                            className="card  mb-2 shadow-sm border-0"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-8">
                                  <span className="fw-bold">Question</span>
                                  <p className="mb-2 mb-md-0">
                                    {parser(JSON.stringify(item.text))}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">Answer</span>
                                  <p className="mb-0 mb-md-0">
                                    {item.answer![0].valueString}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      } 
                      else if (item.answer![0].valueDateTime!.length > 0) {
                        return (
                          <div
                            key={item.linkId}
                            className="card  mb-2 shadow-sm border-0"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-8">
                                  <span className="fw-bold">Question</span>
                                  <p className="mb-2 mb-md-0">
                                    {parser(JSON.stringify(item.text))}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">Answer</span>
                                  <p className="mb-0 mb-md-0">
                                    {item.answer![0].valueDateTime}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      } 
                      else {
                        return (
                          <div
                            key={item.linkId}
                            className="card  mb-2 shadow-sm border-0"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-8">
                                  <span className="fw-bold">Question</span>
                                  <p className="mb-2 mb-md-0">
                                    {parser(JSON.stringify(item.text))}
                                  </p>
                                </div>
                                <div className="col-md-4">
                                  <span className="fw-bold">Answer</span>
                                  <p className="mb-0 mb-md-0">
                                    Not answered
                                  </p>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                    return (
                      <div
                        key={item.linkId}
                        className="card  mb-2 shadow-sm border-0"
                      >
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12">
                              <p className="mb-0 mb-md-0">Not here!</p>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      // <tr>
                      //   <td>nothing here!</td>
                      // </tr>
                    );
                  })}
                </div>
              );
            }
          }
        )}
      </div>
    );
  }
}
