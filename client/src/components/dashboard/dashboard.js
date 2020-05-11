import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { bookAPIs, localStorageModel, dateDiff, debounce } from 'scripts';
import '../../assets/css/dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            pageBottomTouched: false,
            list: {},
            limit: 7,
            startIndexOfNextPage: null
        }
    }

    componentDidMount = () => {
        console.log('initialization')
        var self = this;
        this.fetchPageByDates();
        window.addEventListener('scroll', debounce(() => {
            if(window.scrollY + window.innerHeight === document.documentElement.scrollHeight) {
                self.setState({
                    pageBottomTouched: true
                }, self.fetchPageByDates());
            }
        }, 500));
    }

    fetchPageByDates = () => {  // Initial loading of the page
        const params = {
            startref: this.state.startIndexOfNextPage,
            limit: this.state.limit
        }
        bookAPIs.get_booksbydate(params, res => {
            const data = res.resData;
            this.setState({
                loaded: true,
                pageBottomTouched: false,
                list: {...this.state.list, ...data.list},
                startIndexOfNextPage: new Date(data.startref).toString()
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
                {this.state.pageBottomTouched ? (<div>Loading...</div>) : (<div></div>)}
            </div>
        );
    }
}

export default Dashboard;
