import React from 'react';
import { generateToken, fileManager, uploadAPIs, localStorageModel } from 'scripts.js';
import { withRouter } from 'react-router-dom';
import '../../assets/css/upload-textbook.css';

function UploadTextbook(props) {
    // var required = ['type', 'title', 'author', 'edition', 'price', 'image'];
    var required = ['type', 'title', 'image'];
    var textbookInfo = {
        type: 'textbook',
        book_id: '',
        title: '',
        author: '',
        edition: '',
        school: '',
        course: '',
        price: '',
        image: null,
        summary: '',
        status: 'AVAILABLE'
    }

    function onUpdateTextbookInfo(e, key) {
        var val = (key === 'image') ? e.target.files[0] : e.target.value;
        textbookInfo[key] = val;
    }

    function onSubmitTextbookInfo(e) {
        const userContext = JSON.parse(localStorageModel.getItem('currentUser'));
        console.log('UserContext: ', userContext);
        for(let rq of required) {
            if(textbookInfo[rq] == '' || textbookInfo[rq] === null) {
                alert(`${rq.toUpperCase()} field is required`);
                return;
            }
        }
        fileManager.uploadImage(textbookInfo.image, downloadUrl => {
            textbookInfo.image = downloadUrl;
            textbookInfo.book_id = generateToken(16);
            uploadAPIs.upload_book({
                info: textbookInfo,
                uid: userContext.userId
            }, res => {
                console.log('Response from upload: ', res);
                if(res.statusCode === 200) {
                    alert('Your book has been successfully uploaded');
                    props.history.push('/dashboard');
                    props.navHandler('dashboard');
                }
            }, res => {
                throw new Error(res.resDescription);
            });
        });
    }

    return (
        <div>
            <h2>Sell</h2>
            <section id="textbook-upload-section">
                <form id="textbook-upload-form">
                    <div className="form-group">
                        <label>Book title</label>
                        <input className="form-control" type="text" placeholder="Book name"
                        onChange={e => onUpdateTextbookInfo(e, 'title')} />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-9">
                            <label>Author</label>
                            <input className="form-control" type="text" placeholder="Author"
                            onChange={e => onUpdateTextbookInfo(e, 'author')} />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Edition</label>
                            <input className="form-control" type="text" placeholder="e.g: 2"
                            onChange={e => onUpdateTextbookInfo(e, 'edition')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>School</label>
                            <input className="form-control" type="text" placeholder="e.g: UBC"
                            onChange={e => onUpdateTextbookInfo(e, 'school')} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Course</label>
                            <input className="form-control" type="text" placeholder="e.g: CMPT 365"
                            onChange={e => onUpdateTextbookInfo(e, 'course')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Price</label>
                            <input className="form-control" text="text" placeholder="CAD $"
                            onChange={e => onUpdateTextbookInfo(e, 'price')} />
                        </div>
                    </div>
                    <div className="form-row">
                        <label>Pictures</label>
                        <input type="file" className="form-control-file" accept="image/*"
                        onChange={e => onUpdateTextbookInfo(e, 'image')} />
                    </div>
                    <div className="form-row">
                        <label>Summary</label>
                        <textarea className="form-control" id="sell-summary" placeholder="e.g: The book is pretty new..."
                        onChange={e => onUpdateTextbookInfo(e, 'summary')} />
                    </div>
                    <div className="form-row">
                        <div className="btn btn-primary" id="sell-submit-btn" onClick={e => onSubmitTextbookInfo(e)}>Upload</div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default withRouter(UploadTextbook);
