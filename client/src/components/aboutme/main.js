import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/css/about-me/main.css';

class AboutMe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section id="myinfo-presentation-section">User presentation</section>
                <div id="myinfo-content-container">
                    <section id="myinfo-nav-section">
                        <Navbar id="nav-bar" bg="light">
                            <ul id="myinfo-nav-list">
                                <li id="myinfo-nav-upload">
                                    <Link to="/dashboard/me-info/uploads">My uploads</Link>
                                </li>
                            </ul>
                        </Navbar>
                    </section>
                    <section id="myinfo-stats-section">stats
                    </section>
                </div>
            </div>
        );
    }
}

export default AboutMe;
