import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import sortBy from 'sort-by';
import SearchBox from './SearchBox';
import BookShelf from './BookShelf';
import './App.css';
import * as BooksAPI from './BooksAPI';

class App extends Component {
    state = {
        booksInLibrary: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(booksInLibrary => {
            // console.log(books);
            this.setState({
                booksInLibrary
            });
        });
    }

    changeShelf = (book, newShelf) => {
        console.log(book.id);
        console.log(newShelf);
        this.setState((state) => {
            const bookPresentInLibrary = state.booksInLibrary
                .filter(b => b.id === book.id).length > 0;
            let booksInLibrary;
            if (bookPresentInLibrary) {
                booksInLibrary = state.booksInLibrary.map((b) => {
                    if (b.id === book.id) {
                        const newBook = b;
                        newBook.shelf = newShelf;
                        return newBook;
                    }
                    return b;
                });
            } else {
                const newBook = book;
                newBook.shelf = newShelf;
                booksInLibrary = [...state.booksInLibrary, newBook];
            }

            return {
                booksInLibrary
            };
        });
        BooksAPI.update(book, newShelf);
    };

    render() {
        const { booksInLibrary } = this.state;
        const booksCurrentlyReading = booksInLibrary
            .filter((book) => book.shelf === 'currentlyReading')
            .sort(sortBy('title'));
        const booksWantToRead = booksInLibrary.filter((book) => book.shelf === 'wantToRead')
            .sort(sortBy('title'));
        const booksRead = booksInLibrary.filter((book) => book.shelf === 'read')
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
                    render={() => (
                        <SearchBox
                            booksInLibrary={booksInLibrary}
                            onChangeShelf={this.changeShelf}
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;
