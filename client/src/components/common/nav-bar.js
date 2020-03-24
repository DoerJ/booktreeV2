import React, { Component } from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dashboard, Sell, MeInfo, userAPIs, localStorageModel } from 'scripts.js';
import '../../assets/css/nav-bar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        var urlStrings = window.location.href.trim().split('/');
        var urlSubNav = urlStrings[urlStrings.length - 1];
        this.state = {
            navOnClick: urlSubNav
        }
    }

    onLogOutAccount = (e) => {
        e.preventDefault();
        userAPIs.logout({}, (res) => {
            console.log('Response from logout: ', res);
            localStorageModel.removeItem('currentUser');
            this.props.history.push('/log-in');
        }, (res) => {
            if(res.statusCode === 403) alert(res.resDescription);
            else throw new Error(res.resDescription);
        })
    }

    handleNavigation = navKey => {
        this.setState({
            navOnClick: navKey
        });
    }

    renderDashboardView = () => {
        switch (this.state.navOnClick) {
            case '':
                return <div><Dashboard /></div>;
            case 'sell':
                return <div><Sell history={this.props.history} navHandler={this.handleNavigation} /></div>;
            case 'me-info':
                return <div><MeInfo /></div>;
            default:
                return <div><Dashboard /></div>;
        }
    }

    render() {
        return (
            <div>
                <Navbar className="nav-bar" bg="light">
                    <Navbar.Brand href="/dashboard">Booktree</Navbar.Brand>
                    <ul id="dashboard-nav-bar">
                        <li id="dashboard-nav-home">
                            <Link to="/dashboard" onClick={e => this.handleNavigation('')}>Home</Link>
                        </li>
                        <li id="dashboard-nav-sell">
                            <Link to="/dashboard/sell" onClick={e => this.handleNavigation('sell')}>Sell</Link>
                        </li>
                        <li id="dashboard-nav-me-info">
                            <Link to="/dashboard/me-info" onClick={e => this.handleNavigation('me-info')}>Me</Link>
                        </li>
                    </ul>
                    <Button variant="outline-success" onClick={e => this.onLogOutAccount(e)}>Log Out</Button>
                </Navbar>
                <div className="dashboard-view-container">
                    {this.renderDashboardView()}
                </div>
            </div>
        );
    }
}

export default withRouter(NavigationBar);
