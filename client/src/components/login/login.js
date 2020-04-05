import React from 'react';
import { userAPIs, contextValues, localStorageModel } from 'scripts.js';
import '../../assets/css/login.css';

export default function LogIn(props) {
    var loginCredentials = {
        email: '',
        password: ''
    }

    function onChangeLogInCredentials(e, key) {
        loginCredentials[key] = e.target.value;
    }

    function onLogInAccount(e) {
        userAPIs.login({
            email: loginCredentials.email,
            password: loginCredentials.password
        }, res => {
            console.log('Response from login: ', res);
            let data = res.resData;
            localStorageModel.addItem('currentUser', JSON.stringify({
                ...contextValues.user,
                userId: data.userId,
                username: data.username,
                loginTime: data.loginTime
            }));
            props.history.push('/dashboard');
        }, res => {
            if(res.statusCode == 409 || res.statusCode == 401) {
                alert(res.resDescription);
            } else {
                throw new Error('Permission denied');
            }
        })
    }

    return (
        <div>
            <h2>Log In</h2>
            <div className="login-input-form">
                <div id="login-email-field">
                    <label>Email</label>
                    <input
                        type="text"
                        onChange={e => onChangeLogInCredentials(e, 'email')}
                        placeholder="email"
                    />
                </div>
                <div id="login-password-field">
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={e => onChangeLogInCredentials(e, 'password')}
                        placeholder="password"
                    />
                </div>
                <div id="login-btn" onClick={e => onLogInAccount(e)}>Log In</div>
            </div>
        </div>
    )
}
