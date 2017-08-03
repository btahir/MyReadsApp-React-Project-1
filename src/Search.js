import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends React.Component {
  state = {
    matches: [],
    query: '',
    myBooks: [],
  }

  // search function and setting state for query and matches
  searchQuery = (query) => {
    query = query.trim();
    const searchResults = BooksAPI.search(query, 20);
    searchResults.then(function(response) {
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
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${match.imageLinks.thumbnail})` }} />
                        <div className="book-shelf-changer">
                          <select
                            value={match.shelf}
                            onChange={event => onAddShelf(match, event.target.value)}
                          >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{match.title}</div>
                      <div className="book-authors">{match.authors}</div>
                    </div>
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
