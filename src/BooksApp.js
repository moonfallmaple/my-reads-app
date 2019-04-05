import React from 'react'
import {Switch, Route} from 'react-router'

import './App.css'
import HomePage from './component/HomePage'
import SearchBooks from './component/SearchBooks'


class BooksApp extends React.Component {

  render() {
    return (
    <div className='app'>
      <Switch>
        <Route 
        exact 
        path='/'
        component={HomePage}
        /> 
     
        <Route exact 
        path='/search' 
        component={SearchBooks} 
        /> 
      </Switch>
    </div>
         
    )
  }
}

export default BooksApp
