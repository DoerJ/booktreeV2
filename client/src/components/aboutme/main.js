import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userAPIs, localStorageModel, MeUploads } from 'scripts.js';
import '../../assets/css/about-me/main.css';

class AboutMe extends Component {

    constructor(props) {
        super(props);

        const nav = window.location.pathname.split('/')[3];
        this.state = {
            mestats: {},
            navOnVisit: nav ? nav : 'uploads'
        }
        this.userContext = JSON.parse(localStorageModel.getItem('currentUser'));
    }

    componentDidMount = () => {
        // TO DO: Retrieve me-stats
    }

    onHandleNavigation = nav_key => {
        this.setState({
            navOnVisit: nav_key
        });
    }

    getMeinfoListView = () => {
        switch (this.state.navOnVisit) {
            case 'uploads':
                return <MeUploads uid={this.userContext.userId} />
                break;
            case 'shopping-cart':
                return <p>shopping cart</p>
                break;
        }
    }

    render() {
        return (
            <div>
                <section id="meinfo-presentation-section">User presentation
                    <h1>{this.userContext.username}</h1>
                </section>
                <div id="meinfo-content-container">
                    <section id="meinfo-nav-section">
                        <Navbar id="nav-bar" bg="light">
                            <ul id="meinfo-nav-list">
                                <li id="meinfo-nav-upload">
                                    <Link to="/dashboard/me-info" onClick={e => this.onHandleNavigation('uploads')}>My uploads</Link>
                                </li>
                                <li id="meinfo-nav-shopping-cart">
                                    <Link to="/dashboard/me-info/shopping-cart" onClick={e => this.onHandleNavigation('shopping-cart')}>Shopping cart</Link>
                                </li>
                            </ul>
                        </Navbar>
                        <div id="meinfo-list-container">
                            {this.getMeinfoListView()}
                        </div>
                    </section>
                    <section id="meinfo-stats-section">stats
                    </section>
                </div>
            </div>
        );
    }
}

export default AboutMe;
