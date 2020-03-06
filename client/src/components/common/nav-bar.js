import React, { Component } from 'react';
import { render } from 'react-dom';
import { userAPIs } from '../../services/apis/user-apis.js';
import '../../assets/css/nav-bar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    onLogOutAccount = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div id="logout-btn" onClick={this.onLogOutAccount}>Log Out</div>
            </div>
        );
    }
}

export default NavigationBar;
