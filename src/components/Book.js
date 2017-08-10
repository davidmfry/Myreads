import React, {Component} from 'react';

class Book extends Component
{

    render()
    {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.image})`}}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.currentShelf} onChange={(event) => {
                            this.props.onShelfChange({id: this.props.id, newShelf: event.target.value});

                            // Used when adding a new book from the search page.
                            if (this.props.sentFrom === "SearchBooks")
                                this.props.onUpdateShelfData(this.props.id, event.target.value);
                        }}>
                            <option value="none" disabled>Move to...</option>
                            <option value="none">none</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want To Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors"> {this.props.authors.map( (author, key) => (
                    // The Authors array is checked on the parent component. SEE <Bookshelf/> and <SearchBooks/>
                    <span key={key}>{author}<br/></span>
                ))}

                </div>
            </div>
        );
    }
}

export default Book;
