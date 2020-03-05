import React, { Component } from 'react';
import { render } from 'react-dom';
import { userAPIs } from '../../services/apis/user-apis.js';
import '../../assets/css/signup.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            retypedPassword: ''
        }
    }

    onChangeSignUpCredentials = (e, key) => {
        this.setState({[key]: e.target.value});
    }

    onCreateAccount = (e) => {
        e.preventDefault();
        if(this.state.password !== this.state.retypedPassword) {
            alert('Please confirm your password'); return;
        }
        userAPIs.signup({
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }, (res) => {
            console.log(res);
            if(res.statusCode === 200) {
                alert('The account has been successfully created!');
                this.props.history.push('/log-in');
            }
        }, (res) => {
            throw new Error(res.resDescription);
        });
    }

    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <div className="signup-input-form">
                    <div id="signup-email-field">
                        <label>Email</label>
                        <input
                            type="text"
                            onChange={e => this.onChangeSignUpCredentials(e, 'email')}
                            placeholder="email"
                        />
                    </div>
                    <div id="signup-username-field">
                        <label>Username</label>
                        <input
                            type="text"
                            onChange={e => this.onChangeSignUpCredentials(e, 'username')}
                            placeholder="username"
                        />
                    </div>
                    <div id="signup-password-field">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={e => this.onChangeSignUpCredentials(e, 'password')}
                            placeholder="password"
                        />
                    </div>
                    <div id="signup-password-retype-field">
                        <label>Confirm password</label>
                        <input
                            type="password"
                            onChange={e => this.onChangeSignUpCredentials(e, 'retypedPassword')}
                            placeholder="confirm password"
                        />
                    </div>
                    <div id="signup-create-btn" onClick={this.onCreateAccount}>Create</div>
                </div>
            </div>
        )
    }
}

export default SignUp;
