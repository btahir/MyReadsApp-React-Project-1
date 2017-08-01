import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link} from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    allBooks: []
  }

  // retrieve all books on our shelves
  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks});
    });
  }

  // update book shelf
  updateShelf = (book, newshelf) => {
    this.setState( (p) => {
      let bookUpdate = p.allBooks.filter( ourBook => ourBook.id === book.id);
      bookUpdate[0].shelf = newshelf;
    });
    BooksAPI.update(book, newshelf);
  }

  // Add new books from search
  addShelf = (book, newshelf) => {
    this.setState( (p) => {
      book.shelf = newshelf;
      p.allBooks.push(book);
    });
    BooksAPI.update(book, newshelf);
  }


  render() {
    return (
      <div className="app">
        <Route path="/search" render={ () => (
          <Search
            ourBooks={this.state.allBooks}
            onAddShelf={this.addShelf}
          />
        )} />
        <Route exact path="/" render={ () => (
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
                        {this.state.allBooks.map( book => (
                          book.shelf === 'currentlyReading' && (
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={ (event) => this.updateShelf( book, event.target.value )}>
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
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
                        {this.state.allBooks.map( book => (
                          book.shelf === 'wantToRead' && (
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={ (event) => this.updateShelf( book, event.target.value )}>
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
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
                        {this.state.allBooks.map( book => (
                          book.shelf === 'read' && (
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={ (event) => this.updateShelf( book, event.target.value )}>
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
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
        )} />
      </div>
    )
  }
}

export default BooksApp
