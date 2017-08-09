import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//API
import * as BooksAPI from '../BooksAPI';

// Components
import Book from "./Book";

class SearchBooks extends Component
{
    state = {
        query: '',
        results: [],
        noResult: false
    };

    updateQuery(query)
    {
        this.setState({ query: query })
    }

    handleSubmit(event)
    {
        // Submits the finished user query and sends it to the BooksAPI Search.  It returns an array of book objects
        event.preventDefault();
        BooksAPI.search(this.state.query, 20).then( (results) => {
            // Handles if there are no results from the search query
            if (Array.isArray(results))
            {
                this.setState({ noResult:false, results:results });
            }
            else
                this.setState({noResult: true, query: ''});
        })
    }

    onUpdateShelfData = (id, newShelf) =>
    {
        // Gets the correct book from the results array on this.state
        // Adds a shelf prop to the current book object and uses the updates AP
        let bookToUpdate = this.state.results.find( book => book.id === id);
        bookToUpdate.shelf = newShelf;
        BooksAPI.update(bookToUpdate, newShelf);
    };

    render() {

        let searchResults = null;

        // Renders a did not find message to the user
        if (this.state.noResult)
        {
            searchResults = <div>
                <h3>Did not find any results. Please try again.</h3>
            </div>
        }
        else
        {
            searchResults = <ol className="books-grid">
                {this.state.results.map( (book, index) => {
                    // Checks if the authors array is empty
                    // If it is it sends and empty array for the authors on the book component and stops a crash
                    // in the map function on the <Book/>
                    if (book.authors === undefined)
                    {
                        book.authors = []
                    }
                    return (
                        <li key={index}>
                            <Book
                                onShelfChange={this.props.onShelfChange}
                                onUpdateShelfData={this.onUpdateShelfData}
                                sentFrom="SearchBooks"
                                currentShelf={book.shelf}
                                id={book.id}
                                title={book.title}
                                authors={book.authors}
                                image={book.imageLinks.thumbnail}
                            />
                        </li>)
                })}
            </ol>
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"></Link>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <input type="text"
                                   placeholder="Search by title, author or category"
                                   value={this.state.query}
                                   onChange={ (event) => this.updateQuery(event.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    {searchResults}
                </div>
            </div>
        );
    }
}

export default SearchBooks;
