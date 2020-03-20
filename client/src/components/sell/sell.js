import React, { Component } from 'react';
import { render } from 'react-dom';
import { fileManager, userAPIs } from 'scripts.js';
import '../../assets/css/sell.css';

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'textbook',
            title: '',
            author: '',
            edition: '',
            school: '',
            course: '',
            file: {},
            summary: ''
        };
        this.textbookInfo = { type: 'textbook' };
        this.required = ['title', 'author', 'edition', 'summary', 'file'];
    }

    onUpdateTextbookInfo = (e, key) => {
        var self = this;
        var val = (key === 'file') ? e.target.files[0] : e.target.value;
        this.setState({[key]: val}, () => {
            if(val === '') {
                delete this.textbookInfo[key];
            } else {
                self.textbookInfo[key] = val;
            }
        });
    }

    onSubmitTextbookInfo = e => {
        console.log('textbookInfo: ', this.textbookInfo);
        for(let rq of this.required) {
            if(typeof this.textbookInfo[rq] === 'undefined') {
                alert(`${rq.toUpperCase()} field is required`);
                return;
            }
        }
        fileManager.uploadImage(this.state.file, () => {

        });
    }

    render() {
        return (
            <div>
                <h2>Sell</h2>
                <div id="textbook-sell">
                    <form id="textbook-sell-form">
                        <div className="form-group">
                            <label>Book title</label>
                            <input className="form-control" type="text" placeholder="Book name"
                            onChange={e => this.onUpdateTextbookInfo(e, 'title')} />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-9">
                                <label>Author</label>
                                <input className="form-control" type="text" placeholder="Author"
                                onChange={e => this.onUpdateTextbookInfo(e, 'author')} />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Edition</label>
                                <input className="form-control" type="text" placeholder="e.g: 2"
                                onChange={e => this.onUpdateTextbookInfo(e, 'edition')} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>School</label>
                                <input className="form-control" type="text" placeholder="e.g: UBC"
                                onChange={e => this.onUpdateTextbookInfo(e, 'school')} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Course</label>
                                <input className="form-control" type="text" placeholder="e.g: CMPT 365"
                                onChange={e => this.onUpdateTextbookInfo(e, 'course')} />
                            </div>
                        </div>
                        <div className="form-row">
                            <label>Pictures</label>
                            <input type="file" className="form-control-file" accept="image/*"
                            onChange={e => this.onUpdateTextbookInfo(e, 'file')} />
                        </div>
                        <div className="form-row">
                            <label>Summary</label>
                            <textarea className="form-control" id="sell-summary" placeholder="e.g: The book is pretty new..."
                            onChange={e => this.onUpdateTextbookInfo(e, 'summary')} />
                        </div>
                        <div className="form-row">
                            <div className="btn btn-primary" id="sell-submit-btn" onClick={this.onSubmitTextbookInfo}>Upload</div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Sell;
