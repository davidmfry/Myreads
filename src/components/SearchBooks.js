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
        event.preventDefault();
        BooksAPI.search(this.state.query, 20).then( (results) => {
            if (Array.isArray(results))
            {
                this.setState({ noResult:false, results:results });
            }
            else
                this.setState({noResult: true, query: ''});
        })
    }

    render() {

        let searchResults = null;

        if (this.state.noResult)
        {
            searchResults = <div>
                <h3>Did not find any results. Please try again.</h3>
            </div>
        }
        else
        {
            searchResults = <ol className="books-grid">
                {this.state.results.map( (book, index) => (
                    <li key={index}>
                        <Book
                            onShelfChange={this.props.onShelfChange}
                            id={book.id}
                            title={book.title}
                            authors={book.authors}
                            image={book.imageLinks.thumbnail}
                        />
                    </li>
                ))}
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
