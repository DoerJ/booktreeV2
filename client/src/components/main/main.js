import React, { Component } from 'react';
import { render } from 'react-dom';
import { sessionAPIs } from '../../services/apis/session-apis.js';
import '../../assets/css/main.css';

/* global location */
/* eslint no-restricted-globals: ["off", "location"] */

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        console.log('Checking session key');
        sessionAPIs.main((res) => {}, (res) => {});
    }

    redirectToLogIn = () => {
        this.props.history.push('/log-in');
    }

    redirectToSignUp = () => {
        this.props.history.push('/sign-up');
    }

    render() {
        return (
            <div className="btn-container">
                <div id="login-btn" onClick={() => this.redirectToLogIn()}>
                    <a>Log In</a>
                </div>
                <div id="signup-btn" onClick={() => this.redirectToSignUp()}>
                    <a>Sign Up</a>
                </div>
            </div>
        )
    }
}

export default Main;
