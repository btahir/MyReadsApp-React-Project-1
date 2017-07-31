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

		let searchResults = BooksAPI.search(p.query, 50);

		searchResults.then(function(v) {

			p.matches = v;

		});


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
	            <div className="search-books-results">
	              <ol className="books-grid">
	              	{this.state.matches.map(match => (
	              		<li className="search-book-result" key={match.id}>
	              			Hello
	              		</li>
	              	))}
	              </ol>
	            </div>
	          </div>
			</div>
			)


	}


}

export default Search

