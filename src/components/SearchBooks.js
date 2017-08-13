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

    updateQuery = (query) =>
    {
        this.setState({ query: query })
    };



    handleSearchQuery = (event) =>
    {
        // Submits the finished user query and sends it to the BooksAPI Search.  It returns an array of book objects
        BooksAPI.search(this.state.query, 20).then( (results) => {
            // Handles if there are no results from the search query
            if (Array.isArray(results))
            {
                this.setState({ noResult:false, results:results });
            }
            else
                this.setState({noResult: true});
        })
    };

    onUpdateShelfData = (id, newShelf) =>
    {
        // Gets the correct book from the results array on this.state
        // Adds a shelf prop to the current book object and uses the updates API
        let bookToUpdate = this.state.results.find( book => book.id === id);
        bookToUpdate.shelf = newShelf;
        BooksAPI.update(bookToUpdate, newShelf);
    };
    checkShelfStatus = (id) =>
    {
        // Checks if any of the search books are in my Shelf. If the book is in the shelf it updates the searched book's
        // Shelf property to my shelf
        let bookToCheck = this.props.books.find((book) => book.id === id);
        if (bookToCheck !== undefined)
        {
            let searchBook = this.state.results.find((bookResult) => bookResult.id === bookToCheck.id);
            searchBook.shelf = bookToCheck.shelf;
        }
    };

    render()
    {
        let searchResults = null;
        // Renders a "did not find message" to the user
        if (this.state.noResult)
        {
            searchResults = <div>
                <h3>Did not find any results. Please try again.</h3>
            </div>
        }
        else
        {
            searchResults = <ol className="books-grid">
                {this.state.results.map( (book) => {
                    // Checks if the authors array is empty
                    // If it is it sends and empty array for the authors on the book component and stops a crash
                    // in the map function on the <Book/>
                    let coverImage = "";
                    if (book.authors === undefined)
                    {
                        book.authors = []
                    }

                    if (book.hasOwnProperty("imageLinks") )
                    {
                        coverImage = book.imageLinks.thumbnail;
                    }
                    else
                        coverImage = "http://www.gotechnologix.com/wp-content/uploads/2016/05/Solid-color-wallpapers-04-1920x1200.jpg";

                    this.checkShelfStatus(book.id);
                    return (
                        <li key={book.id}>
                            <Book
                                onShelfChange={this.props.onShelfChange}
                                onUpdateShelfData={this.onUpdateShelfData}
                                sentFrom="SearchBooks"
                                currentShelf={book.shelf}
                                id={book.id}
                                title={book.title}
                                authors={book.authors}
                                image={coverImage}
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
                        <form onSubmit={(event) => event.preventDefault()}>
                            <input type="text"
                                   placeholder="Search by title, author or category"
                                   value={this.state.query}
                                   onChange={ (event) => {
                                       this.updateQuery(event.target.value);
                                       this.handleSearchQuery(event);
                                   }}
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
