import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class Search extends React.Component {

	state = {
		matches: [],
		query: ''
	}

	searchQuery = (query) => {
		this.setState( (p) => {
			p.query = query.trim();
			if(query !== '') {
				let searchResults = BooksAPI.search(p.query, 20);
				searchResults.then(function(v) {
					console.log(v);
					p.matches = v;
				});
			}
		})


		// let searchResults = Promise.resolve(BooksAPI.search(query.trim(), 50) );
		// let resultArray = [];

		// searchResults.then(function(v) {

		//   	for (let i = 0; i < v.length; i++) {
		//   		resultArray.push(v[i]);
		// 	}

		// });

		// this.setState( {matches: resultArray } );
		// console.log(this.state.matches);


	// Pull search results. Limited to 50.
	// matches = BooksAPI.search(query, 50);

	}

	render() {

		const { onAddShelf } = this.props
		const { matches, query } = this.state;

		return (
			<div className='search-results'>
	          <div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search" to="/">Close</Link>
	              <div className="search-books-input-wrapper">
	                {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
	                <input type="text"
	                placeholder="Search by title or author"
					value={this.state.query}
					onChange={ (event) => this.searchQuery( event.target.value )}/>
	              </div>
	            </div>
					{matches.length > 0 ? (
					    <div className="search-books-results">
							<ol className="books-grid">
								{matches.map(match => (
									<li className="search-book-result" key={match.id}>
										<div className="book">
											<div className="book-top">
											  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${match.imageLinks.thumbnail})` }}></div>
												  <div className="book-shelf-changer">
												    <select value={match.shelf} onChange={ (event) => onAddShelf( match, event.target.value )}>
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
					) : (<div></div>)}
				</div>
			</div>
			)


	}


}

export default Search

