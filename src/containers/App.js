import React, { Component } from 'react'
import Board from './Board'

export default class App extends Component {
  render() {
    return (
        <div id="app">
          <Board />
          <div className="wale"></div>
        </div>
    )
  }
}

