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
                            this.props.onShelfChange({id: this.props.id, newShelf: event.target.value})
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
                <div className="book-authors">{this.props.authors[0]}</div>
            </div>
        );
    }
}

export default Book;
