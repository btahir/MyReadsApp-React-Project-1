import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {
  state = {
    matches: [],
    query: '',
    myBooks: [],
  }

  // search function and setting state for query and matches
  searchQuery = (query) => {
    query = query.trim();
    BooksAPI.search(query, 20).then(function(response) {
      if (typeof response !== 'undefined' && typeof response.length !== 'undefined') {
      // syncing shelf of search results to our bookshelf
        response.map((items) => {
          this.props.ourBooks.map((book) => {
            if (book.id === items.id) {
              items.shelf = book.shelf;
            }
          });
        });
        // set state when we get search result
        this.setState((state) => {
          state.matches = response;
          state.query = query;
        });
      } else {
        // set state when we do not get search result
        this.setState((state) => {
          state.matches = [];
          state.query = query;
        });
      }
    }.bind(this));
  }

  render() {
    const { onAddShelf } = this.props;
    const { matches, query } = this.state;

    return (
      <div className='search-results'>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={event => this.searchQuery(event.target.value)}
              />
            </div>
          </div>
          {matches.length > 0 ? (
            <div className="search-books-results">
              <ol className="books-grid">
                {matches.map(match => (
                  <li className="search-book-result" key={match.id}>
                    <Book
                      selectedBook={match}
                      updateShelf={onAddShelf}
                    />
                  </li>
                ))}
              </ol>
            </div>
          ) : (<div className="search-books-results">No Search Results</div>)}
        </div>
      </div>
    );
  }
}

export default Search;

