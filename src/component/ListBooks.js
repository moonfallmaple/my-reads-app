import React from 'react'

import { getAll } from '../BooksAPI'
import { shelves } from '../shelves'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.refreshBooks()
   
  }
  /*get all user's book,here books is an array */
  refreshBooks = () => {
    getAll().then(books => {
      this.setState(() => {
        return {books: books}
      })     
  })}

  onShelfChange = () => {
    this.refreshBooks()
  }

  render = () => {
    /*group books by bookshelf, here books is an object*/
    const books = this.state.books.reduce((books, book) => {
      if (book.shelf) {
        books[book.shelf] = (books[book.shelf] || []).concat([book])
      }
      return books
    }, {})
   
    /*pass the books object to BookShelf component */
    return (
      <div className="list-books">
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
         
          <div>
            {
                Object.entries(shelves).map(([key, title]) => (
                  <BookShelf
                    key={key}
                    title={title}
                    books={books[key] || []}
                    onShelfChange={this.onShelfChange}
                  />
                ))
            }
          </div>   

          <div className="open-search">
            <button onClick={() => { this.props.history.push('/search') }}>Add a book</button>
          </div>    
      </div> 
  ) 
}
}

export default ListBooks