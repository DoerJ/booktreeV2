import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { bookAPIs, localStorageModel, dateDiff } from 'scripts';
import '../../assets/css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            list: {},
            limit: 5
        }
    }

    componentDidMount = () => {
        var startRef = localStorageModel.getItem('startDocForNextpage');
        const params = {
            startref: startRef ? Date.parse(startRef) : null,
            limit: this.state.limit
        }
        bookAPIs.get_booksbydate(params, res => {
            const data = res.resData;
            localStorageModel.addItem('startRefForNextpage', new Date(data.start_ref).toString());
            this.setState({
                loaded: true,
                list: Object.assign(this.state.list, data.list)
            });
        }, res => {
            throw new Error(res.resDescription);
        })
    }

    getDatedBookItems = () => {
        const datedBookList = this.state.list;
        return Object.keys(datedBookList).map((val, index) => {
            const datedBookListItem = datedBookList[val];
            return (
                <li className="datedbook-item" key={val}>
                    <Link to={`/dashboard/${datedBookListItem.book_id}`} className="datedbook-item-link">
                        <span className="datedbook-item-title">{datedBookListItem.title}</span>
                        <span className="datedbook-item-date">{dateDiff(datedBookListItem.uploadDate)}</span>
                    </Link>
                </li>
            );
        })
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                {this.state.loaded ? (<ul id="datedbook-list">{this.getDatedBookItems()}</ul>) : (<p>Loading ...</p>)}
            </div>
        );
    }
}

export default Dashboard;
