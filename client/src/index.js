import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

const Main = lazy(() => import ('./components/main/main'));
const SignUp = lazy(() => import ('./components/signup/signup'));
const LogIn = lazy(() => import ('./components/login/login'));
const Dashboard = lazy(() => import ('./components/dashboard/dashboard'));

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/log-in" component={LogIn} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    );
}

ReactDOM.render(
    <Suspense fallback={<div className="loading-prompt">Loading...</div>}>
        <Router history={createBrowserHistory()}>
            <App />
        </Router>
    </Suspense>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
