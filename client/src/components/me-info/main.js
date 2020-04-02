import React, { Component } from 'react';
import { render } from 'react-dom';
import '../../assets/css/me/main.css';

class MeInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section id="myinfo-presentation-section">User presentation</section>
                <div id="myinfo-content-container">
                    <section id="myinfo-nav-section">User nav
                    </section>
                    <section id="myinfo-stats-section">User stats
                    </section>
                </div>
            </div>
        );
    }
}

export default MeInfo;
