import React, { useContext } from 'react';
import { render } from 'react-dom';
import { UserContext, userAPIs } from 'scripts.js';
import '../../assets/css/login.css';

export default function LogIn(props) {
    const [userInfo, setUserInfo] = useContext(UserContext);
    var loginCredentials = {
        email: '',
        password: ''
    }

    function onChangeLogInCredentials(e, key) {
        loginCredentials[key] = e.target.value;
    }

    function onLogInAccount(e){
        console.log('UserContext: ', userInfo);
        userAPIs.login({
            email: loginCredentials.email,
            password: loginCredentials.password
        }, (res) => {
            console.log('Response from login: ', res);
            setUserInfo(userInfo => ({
                ...userInfo,
                userId: res.userId
            }));
            props.history.push('/dashboard');
        }, (res) => {
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
