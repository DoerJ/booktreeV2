import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userAPIs, localStorageModel } from 'scripts.js';
import '../../assets/css/about-me/main.css';

class AboutMe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mestats: {},
            meinfo: {}
        }
        this.userContext = JSON.parse(localStorageModel.getItem('currentUser'));
    }

    componentDidMount = () => {
        console.log('get my info');
        // Retrieve my info and stats
        var getMeInfo = new Promise((resolve, reject) => {
            userAPIs.get_meinfo({ uid: this.userContext.userId }, res => {
                console.log(res);
                resolve(['meinfo', res.resData]);
            }, res => {
                reject(res.resDescription);
            })
        });
        // TO DO: get stats
        Promise.all([getMeInfo])
            .then(values => {
                for(let [key, val] of values) {
                    this.setState({
                        [key]: val
                    });
                }
            })
    }

    render() {
        return (
            <div>
                <section id="myinfo-presentation-section">User presentation
                    <h1>{this.state.meinfo.username}</h1>
                </section>
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
