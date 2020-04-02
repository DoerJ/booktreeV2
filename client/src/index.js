import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';

const Main = lazy(() => import ('./components/main/main'));
const SignUp = lazy(() => import ('./components/signup/signup'));
const LogIn = lazy(() => import ('./components/login/login'));
const NavigationBar = lazy(() => import ('./components/common/nav-bar.js'));

export const history = createBrowserHistory();

function App() {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/log-in" component={LogIn} />
                <Route exact path={["/dashboard", "/dashboard/*"]} component={NavigationBar} />
            </Switch>
        </div>
    );
}

ReactDOM.render(
    <Suspense fallback={<div className="loading-prompt">Loading...</div>}>
        <Router history={history}>
            <App />
        </Router>
    </Suspense>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
