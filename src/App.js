import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Component Imports
import SearchBooks from './components/SearchBooks';
import Header from './components/Header';
import BookShelf from './components/Bookshelf';



class App extends Component
{
    state = {
        books: [
            {
                id: "nggnmAEACAAJ",
                title: "The Linux Command Line",
                authors: ['William E. Shoots, Jr.'],
                shelf: "currentlyReading",
                subtitle: "A Complete Introduction",
                imageLinks: {
                    smallThumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    thumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                }
            },
            {
                id: "sJf1vQAACAAJ",
                title: "Learning Web Development with React and Bootstrap",
                authors: ["Harmeet Singh","Mehul Bhatt"],
                shelf: "currentlyReading",
                subtitle: "",
                imageLinks: {
                    smallThumbnail: "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    thumbnail: "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                }
            },
            {
                id: "evuwdDLfAyYC",
                title: "The Cuckoo's Calling",
                authors: ['Robert Galbraith'],
                shelf: "wantToRead",
                subtitle: "",
                imageLinks: {
                    smallThumbnail: "http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    thumbnail: "http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                }
            },
            {
                id: "jAUODAAAQBAJ",
                title: "Needful Things",
                authors: ["Stephen King"],
                shelf: "read",
                subtitle: "",
                imageLinks: {
                    smallThumbnail: "http://books.google.com/books/content?id=jAUODAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    thumbnail: "http://books.google.com/books/content?id=jAUODAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                }
            }

        ]
    };

    componentDidMount()
    {

    }

    render() {
        return (
          <div className="App">
              <Header/>
              <BookShelf shelfTitle="Currently Reading" books={this.state.books}/>
              <BookShelf shelfTitle="Want To Read" books={this.state.books}/>
              <BookShelf shelfTitle="Read" books={this.state.books}/>
          </div>
        );
    }
}

export default App;
