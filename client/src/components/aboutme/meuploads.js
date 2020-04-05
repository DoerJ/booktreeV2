import React, { Component } from 'react';
import { render } from 'react-dom';

class MeUploads extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        console.log('component did mount')
    }

    render() {
        return (
            <div>
                <p>My Uploads</p>
            </div>
        );
    }
}

export default MeUploads;
