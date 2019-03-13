import React from 'react'

import { shelves } from '../shelves'
import { update } from '../BooksAPI'

class Book extends React.Component {
  handleShelfChange = event => {
    const toShelf = event.target.value
    update(this.props.book, toShelf).then(() => {
      if (this.props.onShelfChange) {
        this.props.onShelfChange()
      }
    })
  }

  render = () => {
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf || 'none'}
              onChange={this.handleShelfChange}
            >
              <option value="move" disabled>Move to...</option>
              {Object.entries(shelves).map(([key, title]) => (
                <option
                  key={key}
                  value={key}
                >{title}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          <div className="book-authors">{book.authors.join(' ')}</div>
        }
      </div>
    )
  }
}

export default Book