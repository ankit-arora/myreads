import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import BookShelf from './BookShelf';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Route
                    exact
                    path='/'
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    <BookShelf />
                                    <BookShelf />
                                    <BookShelf />
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to='/search'>Add a book</Link>
                            </div>
                        </div>
                    )}
                />
                <Route
                    path='/search'
                    component={SearchBox}
                />
            </div>
        );
    }
}

export default App;
