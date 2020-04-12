import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    bookAPIs,
    dateDiff,
    cacheRepository,
    cacheManager,
    localStorageModel
 } from 'scripts';
import '../../assets/css/about-me/meuploads.css';

class MeUploads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cache_id: 'fetching-uploads',
            loaded: false,
            list: {},
        };
    }

    componentDidMount = () => {
        bookAPIs.get_meuploads({ uid: this.props.uid, cache_id: this.state.cache_id }, res => {
            this.setState({
                loaded: true,
                list: res.resData
            });
        }, res => {
            throw new Error(res.resDescription);
        })
    }

    onHandleDeleteUploadItem = (e, key) => {
        if(window.confirm('Are you sure to delete this item?')) {
            const userContext = JSON.parse(localStorageModel.getItem('currentUser'));
            cacheManager.cleanCaches(cacheRepository.delete_uploads).then(done => {
                if(done) {
                    const data = {
                        uid: userContext.userId,
                        book_id: key,
                        upload_date: this.state.list.textbook[key].uploadDate,
                        type: 'textbook'
                    }
                    bookAPIs.delete_meuploads(data, res => {
                        alert(res.resDescription);
                        delete this.state.list.textbook[key];
                        this.setState(this.state);
                    }, res => {})
                } else {
                    alert('Cache not cleaned');
                }
            })
        }
    }

    getMeUploadsItems = () => {
        // TO DO: Add other types of uploads
        const textbookUploadsList = this.state.list.textbook;
        return Object.keys(textbookUploadsList).map((val, index) => {
            const textbookUploadsItem = textbookUploadsList[val];
            return (
                <li className="meuploads-list-item" key={val}>
                    <span className="meuploads-list-item-title">{textbookUploadsItem.title}</span>
                    <span className="meuploads-list-item-date">{dateDiff(textbookUploadsItem.uploadDate)}</span>
                    <button className="meuploads-list-item-delete" onClick={e => this.onHandleDeleteUploadItem(e, val)}>Delete</button>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <p>My Uploads</p>
                {this.state.loaded ? (<ul id="meuploads-list">{this.getMeUploadsItems()}</ul>) : (<p>Loading ...</p>)}
            </div>
        );
    }
}

export default MeUploads;
