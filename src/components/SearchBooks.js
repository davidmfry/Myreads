import React, {Component} from 'react';
import Book from "./Book";

class SearchBooks extends Component
{
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search"></a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"/>
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map( (book) => (
                            <li>
                                <Book
                                    title={book.title}
                                    authors={book.authors}
                                    image={book.imageLinks.thumbnail}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;
