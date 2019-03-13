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
      this.setState(currentState => ({
        ...currentState,
        myBooks,
      }))
    })
  }

  handleQueryChange = event => {
    const query = event.target.value
    this.setState(currentState => ({
      ...currentState,
      query
    }))
    if (query.length > 0) {
      search(query).then(books => {
        this.setState(currentState => ({
          ...currentState,
          books: books.length ? books : [],
        }))
      })
    }
  }

  render = () => {
    const { query, books, myBooks } = this.state
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