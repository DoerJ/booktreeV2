import React, { Component } from 'react';
import { render } from 'react-dom';
import { userAPIs } from '../../services/apis/user-apis.js';
import '../../assets/css/login.css';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onChangeLogInCredentials = (e, key) => {
        this.setState({[key]: e.target.value});
    }

    onLogInAccount = (e) => {
        e.preventDefault();
        userAPIs.login({
            email: this.state.email,
            password: this.state.password
        }, (res) => {
            console.log(res);
            if(res.statusCode === 200) this.props.history.push('/dashboard');
        }, (res) => {
            throw new Error(res.resDescription);
        })
    }

    render() {
        return (
            <div>
                <h2>Log In</h2>
                <div className="login-input-form">
                    <div id="login-email-field">
                        <label>Email</label>
                        <input
                            type="text"
                            onChange={e => this.onChangeLogInCredentials(e, 'email')}
                            placeholder="email"
                        />
                    </div>
                    <div id="login-password-field">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={e => this.onChangeLogInCredentials(e, 'password')}
                            placeholder="password"
                        />
                    </div>
                    <div id="login-btn" onClick={this.onLogInAccount}>Log In</div>
                </div>
            </div>
        )
    }
}

export default LogIn;
