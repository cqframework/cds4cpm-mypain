import React from "react";
import "./PainResponsePage.css";
import ReviewPageComponent from "../review-page/ReviewPageComponent";

export default class PainResponsePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: JSON.parse(localStorage.getItem("userResponse") || "{}"),
    };
  }

  goBack = () => {
    this.props.history.push("/confirmation");
  };

  public render(): JSX.Element {
    return (
      <div className="app container confirmation-page">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5 p-0">
            <header className="app-header">
              <img
                className="mypain-header-logo"
                src={`${process.env.PUBLIC_URL}/assets/images/My_Pain_LOGO_FINAL.jpg`}
                alt="MyPain Logo"
              />
            </header>
            <div className="pt-5 px-3">
              <p className="text-center fs-5 fw-bold">YOUR MYPAIN RESPONSES</p>
              {this.state.response.length ? (
                <ReviewPageComponent
                  {...this.state.response}
                ></ReviewPageComponent>
              ) : (
                <div>
                  <p className="text-center mb-3">
                    Sorry, no responses were submitted!
                  </p>
                </div>
              )}

              <div className="d-grid gap-1 mt-3 mb-5">
                <button
                  className="btn btn-secondary-custom"
                  // style={{ width: "50%" }}
                  type="button"
                  onClick={this.goBack}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
