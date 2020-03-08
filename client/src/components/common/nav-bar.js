import React, { Component } from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
import { userAPIs } from '../../services/apis/user-apis.js';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../../assets/css/nav-bar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    onLogOutAccount = (e) => {
        e.preventDefault();
        userAPIs.logout({}, (res) => {
            console.log(res);
            this.props.history.push('/log-in');
        }, (res) => {
            if(res.statusCode === 403) alert(res.resDescription);
            else throw new Error(res.resDescription);
        })
    }

    render() {
        return (
            <div>
                <Navbar className="nav-bar" bg="light">
                    <Navbar.Brand href="/dashboard">Booktree</Navbar.Brand>
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                    <Nav.Link href="/dashboard">Sell</Nav.Link>
                    <Button variant="outline-success" onClick={e => this.onLogOutAccount(e)}>Log Out</Button>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavigationBar);
