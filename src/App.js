import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import logo from './logo.svg';
import './App.css';

// Component Imports
import SearchBooks from './components/SearchBooks';
import Header from './components/Header';
import BookShelf from './components/Bookshelf';



class App extends Component
{
    state = {
        books: []
    };

    handleBookShelfChange = (bookData) => {
        // Moves a book into the correct shelf when the users changes the shelf property
        // It finds the chosen book in the State and updates it's shelf property coming from <Book />
        let bookToChange = this.state.books.find(book => book.id === bookData.id);
        bookToChange.shelf = bookData.newShelf;

        // Triggers a rerender with the new data in state
        this.setState(this.state);
    };

    componentDidMount()
    {
        BooksAPI.getAll().then( (books) => {
            this.setState({ books });
        })
    }


    render() {
        return (
          <div className="App">
              <Header/>
              <BookShelf shelfTitle="Currently Reading" books={this.state.books} onShelfChange={this.handleBookShelfChange}/>
              <BookShelf shelfTitle="Want To Read" books={this.state.books} onShelfChange={this.handleBookShelfChange}/>
              <BookShelf shelfTitle="Read" books={this.state.books} onShelfChange={this.handleBookShelfChange}/>
          </div>
        );
    }
}

export default App;
