import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import sortBy from 'sort-by';
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

    changeShelf = (book, newShelf) => {
        console.log(book.id);
        console.log(newShelf);
        this.setState((state) => {
            const books = state.books.map((b) => {
                if (b.id === book.id) {
                    const newBook = b;
                    newBook.shelf = newShelf;
                    return newBook;
                }
                return b;
            });
            return {
                books
            };
        });
        BooksAPI.update(book, newShelf);
    };

    render() {
        const { books } = this.state;
        const booksCurrentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
            .sort(sortBy('title'));
        const booksWantToRead = books.filter((book) => book.shelf === 'wantToRead')
            .sort(sortBy('title'));
        const booksRead = books.filter((book) => book.shelf === 'read')
            .sort(sortBy('title'));
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
                                        onChangeShelf={this.changeShelf}
                                    />
                                    <BookShelf
                                        title='Want to Read'
                                        books={booksWantToRead}
                                        onChangeShelf={this.changeShelf}
                                    />
                                    <BookShelf
                                        title='Read'
                                        books={booksRead}
                                        onChangeShelf={this.changeShelf}
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
