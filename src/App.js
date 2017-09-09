import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import BookShelf from './BookShelf';
import './App.css';
import * as BooksAPI from './BooksAPI';

class App extends Component {
    state = {
        books: []
    };
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            console.log(books);
            this.setState({
                books
            });
        });
    }
    render() {
        const { books } = this.state;
        const booksCurrentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
        const booksWantToRead = books.filter((book) => book.shelf === 'wantToRead');
        const booksRead = books.filter((book) => book.shelf === 'read');
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
                                    <BookShelf
                                        title='Currently Reading'
                                        books={booksCurrentlyReading}
                                    />
                                    <BookShelf
                                        title='Want to Read'
                                        books={booksWantToRead}
                                    />
                                    <BookShelf
                                        title='Read'
                                        books={booksRead}
                                    />
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
