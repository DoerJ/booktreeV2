import React, { Component } from 'react';
import { render } from 'react-dom';
import '../../assets/css/sell.css';

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            edition: '',
            school: '',
            course: '',
            file: {},
            summary: ''
        };
    }

    onSubmitTextbookInfo = e => {
        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <h2>Sell</h2>
                <div id="textbook-sell">
                    <form id="textbook-sell-form">
                        <div className="form-group">
                            <label>Book title</label>
                            <input className="form-control" type="text" placeholder="Book name" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-9">
                                <label>Author</label>
                                <input className="form-control" type="text" placeholder="Author" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Edition</label>
                                <input className="form-control" type="text" placeholder="e.g: 2" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>School</label>
                                <input className="form-control" type="text" placeholder="e.g: UBC" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Course</label>
                                <input className="form-control" type="text" placeholder="e.g: CMPT 365" />
                            </div>
                        </div>
                        <div className="form-row">
                            <label>Pictures</label>
                            <input type="file" className="form-control-file" />
                        </div>
                        <div className="form-row">
                            <label>Summary</label>
                            <textarea className="form-control" id="sell-summary" placeholder="e.g: The book is pretty new..." />
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
