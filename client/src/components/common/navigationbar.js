import React, { Component } from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dashboard, UploadTextbook, AboutMe, userAPIs, localStorageModel } from 'scripts.js';
import '../../assets/css/navigation-bar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navOnVisit: window.location.pathname.split('/')[2]
        }
    }

    onLogOutAccount = (e) => {
        e.preventDefault();
        userAPIs.logout({}, res => {
            console.log('Response from logout: ', res);
            localStorageModel.removeItem('currentUser');
            this.props.history.push('/log-in');
        }, res => {
            if(res.statusCode === 403) {
                alert(res.resDescription);
            } else {
                throw new Error(res.resDescription);
            }
        })
    }

    onHandleNavigation = nav_key => {
        this.setState({
            navOnVisit: nav_key
        });
    }

    getDashboardView = () => {
        switch (this.state.navOnVisit) {
            case 'dashboard':
                return <Dashboard />;
            case 'upload-textbook':
                return <UploadTextbook history={this.props.history} navHandler={this.onHandleNavigation} />;
            case 'me-info':
                return <AboutMe />;
        }
    }

    render() {
        return (
            <div>
                <Navbar id="nav-bar" bg="light">
                    <Navbar.Brand href="/dashboard">Booktree</Navbar.Brand>
                    <ul id="dashboard-nav-list">
                        <li id="dashboard-nav-home">
                            <Link to="/dashboard" onClick={e => this.onHandleNavigation('dashboard')}>Home</Link>
                        </li>
                        <li id="dashboard-nav-sell">
                            <Link to="/dashboard/upload-textbook" onClick={e => this.onHandleNavigation('upload-textbook')}>Upload Textbook</Link>
                        </li>
                        <li id="dashboard-nav-me-info">
                            <Link to="/dashboard/me-info" onClick={e => this.onHandleNavigation('me-info')}>Me</Link>
                        </li>
                    </ul>
                    <Button variant="outline-success" onClick={e => this.onLogOutAccount(e)}>Log Out</Button>
                </Navbar>
                <div id="dashboard-view-container">
                    {this.getDashboardView()}
                </div>
            </div>
        );
    }
}

export default withRouter(NavigationBar);
