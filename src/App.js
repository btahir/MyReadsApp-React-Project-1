import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';
import Book from './Book';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
  }

  // retrieve all books on our shelves
  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ allBooks });
    });
  }

  // update book shelf
  updateShelf = (book, newshelf) => {
    this.setState((p) => {
      const bookUpdate = p.allBooks.filter(ourBook => ourBook.id === book.id);
      bookUpdate[0].shelf = newshelf;
    });
    BooksAPI.update(book, newshelf);
  }

  // Add new books from search
  addShelf = (book, newshelf) => {
    this.setState((p) => {
      book.shelf = newshelf;
      p.allBooks.push(book);
    });
    BooksAPI.update(book, newshelf);
  }


  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              ourBooks={this.state.allBooks}
              onAddShelf={this.addShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.allBooks.map(book => (
                          book.shelf === 'currentlyReading' && (
                            <li key={book.id}>
                              <Book
                                selectedBook={book}
                                updateShelf={this.updateShelf}
                              />
                            </li>
                          )
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.allBooks.map(book => (
                          book.shelf === 'wantToRead' && (
                            <li key={book.id}>
                              <Book
                                selectedBook={book}
                                updateShelf={this.updateShelf}
                              />
                            </li>
                          )
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.allBooks.map(book => (
                          book.shelf === 'read' && (
                            <li key={book.id}>
                              <Book
                                selectedBook={book}
                                updateShelf={this.updateShelf}
                              />
                            </li>
                          )
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
