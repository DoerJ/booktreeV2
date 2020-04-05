import React, { Component } from 'react';
import { render } from 'react-dom';
import { bookAPIs, dateDiff } from 'scripts';
import '../../assets/css/about-me/meuploads.css';

class MeUploads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            meUploadsList: {}
        };
    }

    componentDidMount = () => {
        bookAPIs.get_meuploads({ uid: this.props.uid }, res => {
            this.setState({
                loaded: true,
                meUploadsList: res.resData
            });
        }, res => {
            throw new Error(res.resDescription);
        })
    }

    getMeUploadsItem = () => {
        // TO DO: Add other types of uploads
        const textbookUploadsList = this.state.meUploadsList.textbook;
        return Object.keys(textbookUploadsList).map((val, index) => {
            const textbookUploadsItem = textbookUploadsList[val];
            return (
                <li className="meuploads-list-item" key={val}>
                    <span className="meuploads-list-item-title">{textbookUploadsItem.title}</span>
                    <span className="meuploads-list-item-date">{dateDiff(Date.parse(textbookUploadsItem.uploadDate))}</span>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <p>My Uploads</p>
                {this.state.loaded ? (<ul id="meuploads-list">{this.getMeUploadsItem()}</ul>) : (<p>Loading ...</p>)}
            </div>
        );
    }
}

export default MeUploads;
