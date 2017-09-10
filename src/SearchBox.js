import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBox extends Component {
    state = {
        query: '',
        searchedBooks: []
    };

    onQueryChange = (query) => {
        this.setState({
            query
        });

        if (query) {
            BooksAPI.search(query, '10').then(books => {
                let searchedBooks = books;
                console.log(searchedBooks);
                if (Object.prototype.toString.call(searchedBooks) !== '[object Array]') {
                    searchedBooks = [];
                }
                this.setState({
                    searchedBooks
                });
            });
        } else {
            this.setState({
                searchedBooks: []
            });
        }
    };

    render() {
        const { query, searchedBooks } = this.state;
        const { onChangeShelf, booksInLibrary } = this.props;
        const filteredBooks = searchedBooks.map((sb) => {
            const commonBooks = booksInLibrary.filter((bIL) => bIL.id === sb.id);
            if (commonBooks.length > 0) {
                return commonBooks[0];
            }
            return sb;
        });
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited
                  to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author.
                  So, don't worry if
                  you don't find a specific author or title. Every search is limited by search
                  terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e) => this.onQueryChange(e.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol
                        className="books-grid"
                    >
                        {filteredBooks.map(book => (
                            <li key={book.id}>
                                <Book book={book} onChangeShelf={onChangeShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBox;
