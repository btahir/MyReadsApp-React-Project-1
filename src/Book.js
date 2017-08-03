import React from 'react';
import PropTypes from 'prop-types';

const Book = props => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.selectedBook.imageLinks.thumbnail})` }} />
      <div className="book-shelf-changer">
        <select
          value={props.selectedBook.shelf}
          onChange={event =>
            props.updateShelf(props.selectedBook, event.target.value)}
        >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.selectedBook.title}</div>
    <div className="book-authors">{props.selectedBook.authors}</div>
  </div>


);

Book.propTypes = {
  selectedBook: PropTypes.array.isRequired,
};

export default Book;
