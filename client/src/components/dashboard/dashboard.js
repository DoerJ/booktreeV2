import React, { Component } from 'react';
import { render } from 'react-dom';
import NavigationBar from '../common/nav-bar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <h2>Dashboard</h2>
            </div>
        );
    }
}

export default Dashboard;
