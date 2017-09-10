import React, { Component } from 'react';

class Book extends Component {
    getAuthorsString = authors => (
        authors.reduce((authorsStr, author, index) => {
            if (index === 0) {
                return author;
            }
            return `${authorsStr}, ${author}`;
        }, ''));

    render() {
        const { book, onChangeShelf } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url("${book.imageLinks.thumbnail}")`
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select
                            value={book.shelf}
                            onChange={(e) => (
                                onChangeShelf(book, e.target.value)
                            )}
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">
                                Currently Reading
                            </option>
                            <option value="wantToRead">
                                Want to Read
                            </option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {this.getAuthorsString(book.authors)}
                </div>
            </div>
        );
    }
}

export default Book;
