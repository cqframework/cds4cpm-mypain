import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import { ConfirmationPage } from './components/confirmation-page/ConfirmationPage'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorPage } from './components/error-page/ErrorPage';
import pathPrefix from './helpers/pathPrefix';

ReactDOM.render(
    <React.StrictMode >
        <BrowserRouter>
            <Switch>
                <Route exact path={`${pathPrefix}/`} component={App} />
                <Route exact path={`${pathPrefix}/confirmation`} component={ConfirmationPage} />
                <Route exact path={`${pathPrefix}/error`} component={ErrorPage} />
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
        {/* <App basename={process.env.PUBLIC_URL} /> */}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();