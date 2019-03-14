import React from 'react'

import Book from './Book'
import { search, getAll } from '../BooksAPI'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: [],
    myBooks: {}
  }

  componentDidMount() {
    getAll().then(books => {
      const myBooks = new Map(
        books.length
          ? books.map(book => [book.id, book])
          : []
      )
      this.setState({
        myBooks:myBooks
      })
    })
  }

  handleQueryChange = event => {
    const query = event.target.value
    this.setState(
      { query:query}
    )
    if (query.length > 0) {
      search(query).then(books => {
        this.setState({
          books: books.length ? books : [],
        })
      })
    }
    if (query.length === 0) {
        this.setState({
          books: [],
        })
    
    }
  }

  render = () => {
    const { query, books, myBooks } = this.state
    console.log(myBooks)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => { this.props.history.push('/') }}>Close</button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleQueryChange}
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
  
          <ol className="books-grid">
            {books.map((book, index) => {
              const myBook = myBooks.get(book.id) || {}
              return (
                <Book
                  key={index}
                  book={{
                    ...book,
                    shelf: myBook.shelf || 'none',
                  }}
                />
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks