import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import { ConfirmationPage } from "./components/confirmation-page/ConfirmationPage";
import { PainResourcePage } from "./components/pain-resource-page/PainResourcePage";
import PainResponsePage from "./components/pain-response-page/PainResponsePage";
import * as serviceWorker from "./serviceWorker";
import { ErrorPage } from "./components/error-page/ErrorPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/confirmation" component={ConfirmationPage} />
        <Route exact path="/pain-resource" component={PainResourcePage} />
        <Route exact path="/pain-response" component={PainResponsePage} />
        <Route exact path="/error" component={ErrorPage} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
    {/* <App basename={process.env.PUBLIC_URL} /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
